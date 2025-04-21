# Log Microservice

A **Log Microservice** built with **Node.js**, **Kafka**, **PostgreSQL**, and **Elasticsearch** to handle log ingestion, processing, and storage.

---

## Features
- Kafka Integration for log ingestion.
- PostgreSQL for structured log storage.
- Elasticsearch for full-text search and analytics.
- RESTful API for querying logs.
- Scalable architecture for high-throughput log processing.

---

## Technologies Used
- **Node.js**
- **Kafka**
- **PostgreSQL**
- **Elasticsearch**
- **KafkaJS**
- **Express**

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Docker and Docker Compose
- PostgreSQL, Elasticsearch, and Kafka (if not using Docker)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Log-Microservice```
2. Install dependencies:```npm install```
3. Configure environment variables in .env:
```KAFKA_BROKER=localhost:9092
DB_URL=postgresql://<username>:<password>@localhost:5432/logs_db
ELASTICSEARCH_URL=http://localhost:9200
```
4. Start services with Docker:
```docker-compose up -d```
5. Start by - ```npm start```

## API Endpoints
Base URL - http://localhost:3000/api
Endpoints
Get Logs - 

- GET /logs
- Query logs from PostgreSQL or Elasticsearch.
- Add Logs

POST- 
- /logs  
- Add a new log entry to Kafka.

## Project Structure
```
Log-Microservice/
├── config/                 # Configuration files
├── consumers/              # Kafka consumers
├── models/                 # Database models
├── routes/                 # Express routes
├── scripts/                # Initialization scripts
├── service/                # Business logic
├── .env                    # Environment variables
├── docker-compose.yml      # Docker Compose configuration
├── server.js               # Main server file
├── README.md               # Project documentation
```

## How It Works
- Logs are sent to Kafka topics via producers.
- Kafka consumers process logs and store them in PostgreSQL and Elasticsearch.
- Logs can be queried via RESTful APIs.

## Troubleshooting
- Kafka Issues: Ensure Kafka is running and accessible.
- PostgreSQL Issues: Verify the DB_URL in .env.
- Elasticsearch Issues: Check the ELASTICSEARCH_URL in .env.