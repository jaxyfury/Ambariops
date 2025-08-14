# AmberOps Console: The Ultimate Developer Guide

Welcome to the AmberOps Console project. This document is the comprehensive, in-depth guide for developers and system administrators. It covers the project's architecture, development workflow, testing strategy, and deployment guidelines.

## 1. Core Philosophy

The AmberOps Console is built on a foundation of modern, scalable, and maintainable principles. The key goals are:

*   **Separation of Concerns**: Each part of the project has a distinct and well-defined responsibility.
*   **Code Reusability**: Shared code is managed in dedicated packages to avoid duplication and ensure consistency.
*   **Developer Experience**: The project is designed to be easy to set up, run, and contribute to, with a focus on automation and clear documentation.
*   **Testability**: The architecture is designed to be easily testable at all levels, from individual components to end-to-end user flows.

---

## 2. In-Depth Folder & File Structure

This project is a `pnpm` workspace-based monorepo. This structure is ideal for managing multiple related projects within a single repository.

```
/
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── admin/            # Admin dashboard frontend app
│   ├── auth/             # Standalone Node.js authentication service
│   ├── backend/          # Standalone Node.js backend API service
│   ├── home/             # Public-facing landing page and auth frontend
│   └── web/              # The core, protected user dashboard app
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook
├── tests/                # Playwright end-to-end tests for all applications
├── .env                  # Environment variables configuration (not committed)
├── package.json          # Root package manifest managing pnpm workspaces
└── tsconfig.base.json    # The shared base TypeScript configuration
```

### Root Level Files

*   **`pnpm-workspace.yaml`**: The heart of the monorepo. This file tells `pnpm` which directories to treat as separate packages, enabling cross-package linking.
*   **`package.json`**: The root package file. It contains scripts that can orchestrate actions across the entire workspace (e.g., `pnpm build` runs the build script in every package).
*   **`tsconfig.base.json`**: A shared TypeScript configuration file that other `tsconfig.json` files in the monorepo extend.
*   **`build-workspace.sh` & `run.sh`**: Helper shell scripts to simplify the setup and local development process.
*   **`.env`**: The central file for managing all environment variables for all backend services and frontend applications.

---

### `apps/` Directory

This directory contains the runnable applications and services.

#### `apps/home`
*   **Purpose**: The public-facing entry point for all users. It serves the marketing landing page and acts as the **frontend** for the `auth` service.
*   **Technology**: A standalone Next.js app.

#### `apps/web`
*   **Purpose**: The secure, core application that users access *after* logging in.
*   **Technology**: A Next.js application that heavily relies on client-side rendering for its interactive dashboards.

#### `apps/admin`
*   **Purpose**: The secure dashboard for administrators to manage users and site content.
*   **Technology**: A standalone Next.js app.

#### `apps/auth`
*   **Purpose**: A dedicated, standalone **backend service** for authentication.
*   **Technology**: A Node.js/Express application that handles user registration, login (password & social), and JWT management.

#### `apps/backend`
*   **Purpose**: A dedicated, standalone **backend service** for all application data.
*   **Technology**: A Node.js/Express application that provides a REST API for clusters, services, hosts, etc.

---

### `packages/` Directory

This directory contains all the shared code, organized into distinct libraries.

#### `packages/ui`
*   **Purpose**: A comprehensive library of reusable React components (Button, Card, etc.).
*   **Key Files**: `src/components/ui/` contains all primitives; `src/stories/` contains Storybook files.

#### `packages/api`
*   **Purpose**: Manages the application's data and AI layers.
*   **Key Files**: `src/client.ts` is the centralized API client used by all frontend apps to communicate with the `backend` and `auth` services. `src/ai/` contains all server-side Genkit logic.

#### `packages/lib`
*   **Purpose**: A foundational library for shared, non-React code like TypeScript types (`src/types.ts`) and utilities.

#### `packages/design-tokens`
*   **Purpose**: Centralizes all styling and theme-related configurations, including the shared Tailwind CSS configuration.

---

## 3. Development Workflow

### Step 1: Environment Configuration

1.  **Copy the `.env.example` to `.env`**: Create a `.env` file at the root of the project.
2.  **Set `MONGODB_URI`**: You **must** provide a valid MongoDB connection string.
3.  **Set OAuth Credentials** (Optional): To enable Google or GitHub login, fill in the `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc., variables.
4.  **Set `GEMINI_API_KEY`** (Optional): To use the AI features, provide a Google Gemini API key.

### Step 2: Database Seeding

With your environment configured, seed the database with initial data.

From the project root, run:
```bash
pnpm seed
```
A default admin account will be created with:
*   **Email**: `admin@amberops.com`
*   **Password**: `admin@amberops`

### Step 3: Running the Application Locally

Use this command to start all development servers simultaneously:
```bash
sh run.sh
```
The servers will be available at:
*   **Landing Page (`home`)**: `http://localhost:3001`
*   **Dashboard App (`web`)**: `http://localhost:3000`
*   **Admin App (`admin`)**: `http://localhost:3003`
*   **Auth Service (`auth`)**: Port `3002`
*   **Backend Service (`backend`)**: Port `3004`

---

## 4. Testing Strategy

*   **End-to-End (E2E) Testing**:
    *   **Tool**: **Playwright**.
    *   **Location**: `tests/` directory.
    *   **Purpose**: These tests simulate real user journeys across the applications, including the full authentication flow.

*   **Static Analysis & Linting**:
    *   **Tool**: **ESLint** and **Prettier**.
    *   **Purpose**: Enforce a consistent code style and catch common errors.

---

## 5. Deployment Guide (for DevOps)

Deploying this monorepo requires a platform that can handle multiple services.

### Build Process

1.  **Install Dependencies**: `pnpm install`
2.  **Build All Packages**: `pnpm build`
    *   This command runs the `build` script in every package, creating production-ready assets.

### Hosting Strategy

The multi-service architecture requires a hosting solution capable of running multiple Node.js applications and routing traffic accordingly (e.g., using Docker Compose, Kubernetes, or a platform like Vercel/Render with multiple services).

*   The frontend Next.js apps (`home`, `web`, `admin`) should be run as Node.js servers.
*   The backend services (`auth`, `backend`) must also be run as Node.js servers.
*   A reverse proxy (like Nginx) is typically used to route requests from a public domain to the correct internal service based on the path or subdomain.

### Environment Variables

All environment variables from the root `.env` file must be securely set in the production environment for all relevant services.
