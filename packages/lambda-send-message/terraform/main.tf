terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# provider "aws" {
#   region = var.aws_region
# }

variable aws_region {
  type        = string
}

variable gateway_id {
  type        = string
  description = "Gateway id"
}

variable gateway_execution_arn {
  type        = string
  description = "Gateway execution ARN"
}


variable connection_table_name {
  type        = string
  description = "Connection table name"
}

variable stage_name {
  type = string
}

locals {
  lambda_zip_filename = "${path.module}/../dist/lambda.zip"
}

module "websocket_lambda" {
  source = "../../../modules/websocket-lambda"
  
  aws_region = var.aws_region

  route = "sendMessage"
  description = ""
  gateway_id = var.gateway_id
  gateway_execution_arn = var.gateway_execution_arn

  lambda_function_name = "lambda-send-message"
  lambda_zip_filename = local.lambda_zip_filename
  connection_table_name = var.connection_table_name
}

resource "aws_iam_role_policy" "dynamo_policy" {
  name = "lambda_send_message_allow_manage_connections"
  role = module.websocket_lambda.lambda_iam_id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "execute-api:ManageConnections",
        ]
        Effect   = "Allow"
        Resource = "${var.gateway_execution_arn}/${var.stage_name}/POST/@connections/{connectionId}"
      },
    ]
  })
}