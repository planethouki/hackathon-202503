variable "aws_region" {
  type        = string
  description = "AWS region to deploy to"
  default     = "us-east-1"
}

variable "ecs_cluster_name" {
  type        = string
  description = "Name of the ECS cluster"
  default     = "my-ecs-cluster"
}

variable "backend_image" {
  type        = string
  description = "Docker image for the backend"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs for ECS tasks"
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group IDs for ECS tasks"
}
