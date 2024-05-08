variable "project_id" {
  description = "ID do projeto no Google Cloud Platform"
}

variable "region" {
  description = "Região onde os serviços serão implantados"
}

variable "backend_image" {
  description = "URL da imagem Docker para o backend"
}

variable "frontend_image" {
  description = "URL da imagem Docker para o frontend"
}