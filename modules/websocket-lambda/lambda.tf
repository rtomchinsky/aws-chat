resource "aws_iam_role" "iam_for_lambda" {
  name = var.lambda_function_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action: "sts:AssumeRole",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Effect: "Allow",
        Sid: ""
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dynamo_lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamo_policy" {
  name = var.lambda_function_name
  role = aws_iam_role.iam_for_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:*",
        ]
        Effect   = "Allow"
        Resource = "arn:aws:dynamodb:*:*:table/${var.connection_table_name}"
      },
    ]
  })
}

resource "aws_lambda_function" "lambda_function" {
  filename      = var.lambda_zip_filename
  function_name = var.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"

  publish = true
  source_code_hash = filebase64sha256(var.lambda_zip_filename)

  runtime = "nodejs14.x"

  environment {
    variables = {
      CONNECTION_TABLE_NAME = var.connection_table_name
    }
  }
}

variable aws_region {
  type        = string
}

variable lambda_function_name {
  type        = string
  description = "Lambda function name"
}

variable lambda_zip_filename {
  type        = string
  description = "Lambda zip filename"
}

variable lambda_environment_variables {
  type        = map
  description = "Lambda zip filename"
  default     = {}
}

variable connection_table_name {
  type = string
}

output lambda_iam_id {
  value       = aws_iam_role.iam_for_lambda.id
  sensitive   = true
  description = "description"
}

output invoke_arn {
  value       = aws_lambda_function.lambda_function.invoke_arn
  sensitive   = true
  description = "description"
  depends_on  = []
}