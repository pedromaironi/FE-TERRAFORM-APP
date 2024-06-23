# Desplegar BFF en Google Cloud
echo "Desplegando Frontend en S3 Aws..."

# Autenticación en AWS
gcloud auth activate-service-account --key-file <(echo "$GCLOUD_SERVICE_KEY")
gcloud config set project "$GCLOUD_PROJECT_ID"

# Desplegar usando Terraform y kubectl
cd terraform
terraform init
terraform apply -auto-approve