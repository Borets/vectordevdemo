# Vector.dev Demo on Render.com

This project demonstrates the power of [Vector.dev](https://vector.dev) for log collection, processing, and visualization. The demo includes a Next.js application that generates logs, Vector for processing those logs, and PostgreSQL for storage.

## Architecture

- **Next.js Application**: Generates sample logs and provides a dashboard to visualize them
- **Vector**: Collects logs from the application, processes them, and forwards them to PostgreSQL
- **PostgreSQL**: Stores the processed logs for analysis

## Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   cd app
   npm install
   ```

3. Start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Visit http://localhost:3000 to see the dashboard

## Deployment on Render.com

1. Create a new PostgreSQL database on Render
2. Create a new Web Service for the Next.js application
3. Create a new Private Service for Vector
4. Configure the environment variables as specified in the docker-compose.yml

## Features

- Real-time log collection with Vector
- Log visualization using Tremor
- Sample log generation for testing
- PostgreSQL integration for log storage
- Docker Compose setup for local development

## Environment Variables

- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `NODE_ENV`: Application environment 