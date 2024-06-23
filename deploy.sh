# Desplegar BFF en Google Cloud
echo "Desplegando Frontend en S3 Aws..."

# Autenticación en AWS
echo $GCLOUD_SERVICE_KEY | base64 --decode > /tmp/gcloud-service-key.json
gcloud auth activate-service-account --key-file=/tmp/gcloud-service-key.json
gcloud config set project $GCLOUD_PROJECT_ID

# Desplegar usando Terraform y kubectl
cd terraform
terraform init
terraform apply -auto-approve