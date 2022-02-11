# AWS KMS Keys

data "aws_kms_key" "aws_managed_parameter_store_key" {
  key_id = "alias/aws/ssm"
}

