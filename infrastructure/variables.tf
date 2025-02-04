variable "aws_region" {
  type        = string
  description = "AWS region to deploy to"
  default     = "ap-northeast-1"
}

variable "ecs_cluster_name" {
  type        = string
  description = "Name of the ECS cluster"
  default     = "hackathon-202503"
}

variable "backend_image" {
  type        = string
  description = "Docker image for the backend"
  default     = "backend"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
  default     = "hackathon-202503-vpc"
}

variable "availability_zones" {
  description = "List of availability zones to create subnets in"
  type        = list(string)
  default     = ["ap-northeast-1a", "ap-northeast-1c"]
}

variable "public_subnet_bits" {
  description = "Subnet bits to use for public subnets (e.g. 8 for /24 subnets in a /16 VPC)"
  type        = number
  default     = 8
}
