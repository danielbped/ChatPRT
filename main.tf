terraform {
  required_version = ">= 1.3"

  required_providers {
    google = {
      source = "hashicorp/google"
      version = ">= 3.3"
    }
  }
}

provider "google" {
  project = "polar-surfer-422214-c5"
}

resource "google_cloud_run_service" "run_service" {
  name     = "ChatPRT"
  location = "us-west1"

  template {
    spec {
      containers {
        # image = "registry.com/path/to/your/app:1"
      }
    }
  }
}

resource "google_project_service" "run_api" {
  service            = "run.googleapis.com"
  disable_on_destroy = true
}