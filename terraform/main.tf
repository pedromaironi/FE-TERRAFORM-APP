provider "aws" {
  region     = "us-east-1"
}

resource "aws_s3_bucket" "react_frontend_bucket" {
  bucket = "bucket-react-pedro"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "react_frontend_bucket_encryption" {
  bucket = aws_s3_bucket.react_frontend_bucket.bucket

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_policy" "react_frontend_bucket_policy" {
  bucket = aws_s3_bucket.react_frontend_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.react_frontend_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.react_frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Subir archivos de la carpeta build al bucket con el encabezado de contenido correcto
resource "aws_s3_bucket_object" "react_frontend_files" {
  for_each = fileset("${path.module}/build", "**/*")

  bucket = aws_s3_bucket.react_frontend_bucket.bucket
  key    = each.value
  source = "${path.module}/build/${each.value}"
  acl    = "public-read"

 content_type = lookup({
    "html" = "text/html"
    "css"  = "text/css"
    "js"   = "application/javascript"
    "json" = "application/json"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "svg"  = "image/svg+xml"
    "ico"  = "image/x-icon"
    "txt"  = "text/plain"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")
}

output "bucket_name" {
  value = aws_s3_bucket.react_frontend_bucket.bucket
}

output "bucket_url" {
  value = aws_s3_bucket.react_frontend_bucket.website_endpoint
}