resource aws_lambda_function lambda {
  filename = 
  function_name = var.name
  description   = var.description

  publish = true
  handler = "index.handler"
  runtime = var.runtime
  role    = aws_iam_role.lambda_at_edge.arn
  tags    = var.tags

  lifecycle {
    ignore_changes = [
      last_modified,
    ]
  }
}