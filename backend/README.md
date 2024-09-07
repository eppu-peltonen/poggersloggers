# Backend

This is a backend project for PoggersLoggers exercise service.

## Install

This is a multi-container application built with docker compose. Project can be ran with VS Code dev containers or just using docker compose. With dev containers you can develop inside the api container and live reload.

### Prerequisites

- Docker
- node
- VS Code and Dev containers extension (optional)

### With VS Code and Dev Containers

1. Run VS Code command `Dev Containers: Reopen in container`
2. From the container run the nestjs application with `npm run dev`

### With docker compose only

1. `docker-compose up --build`
