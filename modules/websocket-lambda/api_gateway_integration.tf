variable description {
  type        = string
  description = "This integration's description"
}

variable route {
  type        = string
  description = "This integration's route"
}

variable gateway_id {
  type        = string
  description = "This integration's gateway id"
}

resource "aws_apigatewayv2_integration" "api_gateway_integration" {
  api_id           = var.gateway_id
  integration_type = "AWS_PROXY"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  description               = var.description
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.lambda_function.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "on_connect_route" {
  api_id    = var.gateway_id
  route_key = var.route

  target = "integrations/${aws_apigatewayv2_integration.api_gateway_integration.id}"
}
