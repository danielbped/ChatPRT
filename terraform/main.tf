provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_sql_database_instance" "mysql_instance" {
  name             = "mysql-instance"
  database_version = "MYSQL_5_7"
  region           = var.region
  project          = var.project_id

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "mysql_db" {
  name     = "chatprt-db"
  instance = google_sql_database_instance.mysql_instance.name
}

resource "google_cloud_run_service" "backend" {
  name     = "backend-service"
  location = var.region

  depends_on = [google_sql_database.mysql_db]

  template {
    spec {
      containers {
        image = var.backend_image
      }
    }
  }
}

resource "google_cloud_run_service" "frontend" {
  name     = "frontend-service"
  location = var.region

  template {
    spec {
      containers {
        image = var.frontend_image
      }
    }
  }
}