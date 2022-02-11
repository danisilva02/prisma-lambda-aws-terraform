locals {
  zip_file = "${path.module}/dist/lambda.zip"
}
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "dist"
  output_path = "lambda.zip"
}

# Lambda
resource "aws_lambda_function" "lambda_function" {
  filename = "lambda.zip"
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"

  function_name = var.function_name
  role          = aws_iam_role.lambda_iam.arn

  runtime     = "nodejs14.x"
  handler     = "main.handler"
  memory_size = 256
  timeout     = 10
  # vpc_config {
  #   subnet_ids = [
  #     "subnet-xxxxxxxx"
  #   ]
  #   security_group_ids = [
  #     "sg-xxxx"
  #   ]
  # }
  environment {
    variables = {
      SLS_STAGE     = "production",
      DATABASE_URL  = var.database_url,
      NODE_OPTIONS  = "--enable-source-maps" # This can sometimes cause performance issues, so can be removed to reduce execution time
    }
  }
}

resource "aws_lambda_permission" "api" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  function_name = aws_lambda_function.lambda_function.function_name
  source_arn    = "arn:aws:execute-api:${var.region}:${var.aws_account_id}:*/*"
  # source_arn    = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

# Cloudwatch Logs

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.function_name}"
  retention_in_days = var.log_retention_in_days
}

# IAM

resource "aws_iam_role" "lambda_iam" {
  name = "${var.function_name}-role"
  path = "/"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name = "${var.function_name}-lambda-policy"
  path = "/"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "kms:Decrypt"
        ],
        "Resource" : data.aws_kms_key.aws_managed_parameter_store_key.arn,
        "Effect" : "Allow"
      },
      {
        "Effect": "Allow",
        "Action": [
          "ec2:DescribeNetworkInterfaces",
          "ec2:CreateNetworkInterface",
          "ec2:DeleteNetworkInterface",
          "ec2:DescribeInstances",
          "ec2:AttachNetworkInterface"
        ],
        "Resource": "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.lambda_iam.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution_role_attachment" {
  role       = aws_iam_role.lambda_iam.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
