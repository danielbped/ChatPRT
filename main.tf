terraform {
  required_version = ">= 1.3"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 3.3"
    }
  }
}

variable "gcp_credentials" {
  type = string
  sensitive = true
  default=""
  description = "Google Cloud service account credentials"
}

provider "google" {
  project     = "polar-surfer-422214-c5"
  credentials = jsondecode(var.gcp_credentials)
}

resource "google_cloud_run_service" "backend_service" {
  name     = "backend-service"
  location = "us-west1"

  template {
    spec {
      containers {
        image = "docker.io/danielbped1/chatprt-backend:latest"
      }
    }
  }
}

resource "google_cloud_run_service" "frontend_service" {
  name     = "frontend-service"
  location = "us-west1"

  template {
    spec {
      containers {
        image = "docker.io/danielbped1/chatprt-frontend:latest"
      }
    }
  }
}

resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = true
}