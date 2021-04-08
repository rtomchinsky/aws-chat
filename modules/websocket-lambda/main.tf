variable gateway_execution_arn {
  type = string
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AlowApiGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "apigateway.amazonaws.com"

  # source_arn = "${var.gateway_execution_arn}/*/*/*"
}