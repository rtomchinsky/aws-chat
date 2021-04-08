terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data aws_region current {}

module "lambda_connect" {
  source = "../packages/lambda-connect/terraform"
  gateway_id = aws_apigatewayv2_api.websocket_gateway.id
  gateway_execution_arn = aws_apigatewayv2_api.websocket_gateway.execution_arn
  connection_table_name = aws_dynamodb_table.basic_dynamodb_table.name
  aws_region = data.aws_region.current.name
}

module "lambda_disconnect" {
  source = "../packages/lambda-disconnect/terraform"
  gateway_id = aws_apigatewayv2_api.websocket_gateway.id
  gateway_execution_arn = aws_apigatewayv2_api.websocket_gateway.execution_arn
  connection_table_name = aws_dynamodb_table.basic_dynamodb_table.name
  aws_region = data.aws_region.current.name
}

module "lambda_send_message" {
  source = "../packages/lambda-send-message/terraform"
  gateway_id = aws_apigatewayv2_api.websocket_gateway.id
  gateway_execution_arn = aws_apigatewayv2_api.websocket_gateway.execution_arn
  connection_table_name = aws_dynamodb_table.basic_dynamodb_table.name
  aws_region = data.aws_region.current.name
  stage_name = aws_apigatewayv2_stage.example.name
}

output websocket_url {
  value = aws_apigatewayv2_api.websocket_gateway.api_endpoint
}
