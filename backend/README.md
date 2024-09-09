# Backend

This is a backend project for PoggersLoggers exercise service.

Postgres database and adminer database management tool are running in containers using docker compose.

## Prerequisites

- Docker
- node

## Install

1. Add .env file to backend root directory with following template

        API_PORT=<port number for backend api>

        JWT_SECRET=<jwt secret>

        DB_PORT=<database container inbound and outbound port number>

        DB_USERNAME=<database username>

        DB_PASSWORD=<database password>

        DATABASE=<database name>

        ADMINER_PORT=<adminer container inbound and outbound port number>

2. Then run from the backend root directory:

    1. `docker-compose up` to build and start the containers

    2. `npm install` to install the dependencies

    3. `npm run dev` to start the nestjs server in development mode
