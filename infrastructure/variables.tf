variable "aws_account_id" {
  type        = string
  description = "(optional) describe your variable"
  default     = "xxxxxxxxxx"
}

variable "region" {
  default = "us-east-1"
}

variable "database_url" {
  description = "The URL database"
  type        = string
  sensitive   = true
  default     = "postgresql://postgresql:postgresql@localhost:5432/my_company_development"
}

variable "function_name" {
  description = "The name of the lambda function"
  type        = string
  default     = "my-company-ticket-api"
}

variable "log_retention_in_days" {
  description = "The number of days to retain CloudWatch Logs for"
  type        = number
  default     = 7
}

