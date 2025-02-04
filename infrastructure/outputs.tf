output "ecs_cluster_id" {
  description = "The ECS cluster ID"
  value       = aws_ecs_cluster.this.id
}

output "ecs_service_name" {
  description = "The ECS service name"
  value       = aws_ecs_service.backend.name
}
