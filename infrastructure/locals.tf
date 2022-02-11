locals {
  namespaced_service_name = "daniel"
  lambda_path  = "${path.module}/dist" 
  layer_name   = "rds_connector.zip"

  common_tags = {
    Project   = "TODO Serverless App"
    CreatedAt = "2020-03-16"
    ManagedBy = "Terraform"
    Owner     = "Karv Tech"
    Service   = var.function_name
  }
}