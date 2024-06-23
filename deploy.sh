set -e

echo "Desplegando BFF en Google Cloud"

# Decodificar la variable de entorno GCLOUD_SERVICE_KEY de base64 a un archivo temporal
echo "$GCLOUD_SERVICE_KEY" | base64 --decode > /tmp/gcloud-service-key.json

# Autenticación en Google Cloud
gcloud auth activate-service-account --key-file=/tmp/gcloud-service-key.json

# Configurar el proyecto de Google Cloud
gcloud config set project "$GCLOUD_PROJECT_ID"

# Desplegar usando Terraform
cd terraform
terraform init
terraform apply -auto-approve