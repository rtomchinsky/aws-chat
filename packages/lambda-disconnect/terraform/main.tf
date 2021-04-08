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

locals {
  lambda_zip_filename = "${path.module}/../dist/lambda.zip"
}

module "websocket_lambda" {
  source = "../../../modules/websocket-lambda"
  
  aws_region = var.aws_region

  route = "$disconnect"
  description = ""
  gateway_id = var.gateway_id
  gateway_execution_arn = var.gateway_execution_arn

  lambda_function_name = "lambda-disconnect"
  lambda_zip_filename = local.lambda_zip_filename
  connection_table_name = var.connection_table_name
}