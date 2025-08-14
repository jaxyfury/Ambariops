# Standalone Backend API Service (Node.js/Express)

This directory contains the primary backend API service for the AmberOps Console, built with Node.js, Express, and Mongoose.

## In-Depth Overview

*   **Purpose**: To provide a dedicated, decoupled REST API for all application data, such as clusters, services, hosts, alerts, and administrative content. This microservice architecture cleanly separates data logic from the frontend applications and the authentication service.

*   **Technology**:
    *   **Runtime**: Node.js
    *   **Framework**: Express.js for routing and middleware.
    *   **Database**: MongoDB with Mongoose for data modeling and validation.
    *   **CORS**: Configured to allow requests from the frontend applications.

*   **API Endpoints**: This service provides a comprehensive set of RESTful endpoints for all core data entities. It implements full CRUD (Create, Read, Update, Delete) functionality for:
    *   `/api/v1/users`
    *   `/api/v1/clusters`
    *   `/api/v1/services`
    *   `/api/v1/hosts`
    *   `/api/v1/alerts`
    *   `/api/v1/documentation`
    *   `/api/v1/pricing`
    *   ...and all other data models required by the platform.

## Running Locally

This service is designed to run as part of the overall development environment.

To start this service along with all other applications, run the following command from the root of the monorepo:

```bash
sh run.sh
```

The backend service will start on port `3004` by default. All AmberOps frontend applications are configured to send their API requests to this service.
