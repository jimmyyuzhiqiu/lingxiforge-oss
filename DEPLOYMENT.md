# Deployment guide

This repository contains the Vue/Nginx frontend and a FastAPI API prototype. It does not bundle a GPU inference service or Hunyuan3D weights.

## Required configuration

Copy .env.example to .env and set LINGXIFORGE_AUTH_SALT to a unique random value before starting the API. You can generate one with:

~~~bash
openssl rand -hex 32
~~~

Never commit .env or reuse a production secret across environments. The API refuses to start if the required salt is missing. For a non-local deployment, set LINGXIFORGE_CORS_ORIGINS to the exact comma-separated frontend origins.

## Start

~~~bash
docker compose up -d --build
~~~

- Web: http://localhost:8080
- API health: http://localhost:8080/lingxiforge/health

Stop:

~~~bash
docker compose down
~~~

## Security status

This is a development/demo prototype, not a production-ready authentication or multi-user authorization system. Read SECURITY.md before exposing it to the public internet.