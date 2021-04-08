resource "aws_apigatewayv2_api" "websocket_gateway" {
  name                       = "chat-websocket-gateway"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_stage" "example" {
  api_id = aws_apigatewayv2_api.websocket_gateway.id
  name   = "example-stage"
  auto_deploy = true
}