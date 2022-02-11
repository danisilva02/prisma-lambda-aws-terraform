terraform {
  required_version = ">= 1.0"
}

provider "aws" {
  version = ">= 3.62.0"
  region  = var.region
}

provider "archive" {}