resource "aws_apigatewayv2_api" "this" {
  name          = "${local.namespaced_service_name}-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "api_apigateway" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.lambda_function.invoke_arn
}

resource "aws_apigatewayv2_route" "ticket" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.api_apigateway.id}"
}