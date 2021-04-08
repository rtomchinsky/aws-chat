resource "aws_dynamodb_table" "basic_dynamodb_table" {
  name           = "Connection"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }
}