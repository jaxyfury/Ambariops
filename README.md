# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations, built with a scalable and maintainable monorepo architecture.

## Folder Structure In-Depth

This project is a `pnpm` workspace-based monorepo, a structure chosen for its excellent code-sharing capabilities and clear separation of concerns. It is organized into distinct frontend applications (`apps`), shared libraries (`packages`), and two dedicated backend services (`auth` and `backend`).

```
/
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── admin/            # The admin dashboard application
│   ├── auth/             # The standalone Node.js/Express authentication service
│   ├── backend/          # The standalone Node.js/Express backend API service
│   ├── home/             # Public-facing landing page application
│   └── web/              # The core, protected user dashboard application
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Shared theme, global styles, and Tailwind config
│   ├── lib/              # Shared TypeScript types and core utility functions
│   └── ui/               # Reusable React UI components and Storybook
├── tests/                # End-to-end tests for all applications
├── .env                  # Environment variables (not committed to source control)
├── package.json          # Root package manifest managing pnpm workspaces
├── pnpm-workspace.yaml   # Defines the pnpm workspace packages
└── README.md             # This document
```

---

### `apps/` Directory

- **`apps/home`**: The public-facing entry point. It serves the marketing landing page and acts as the dedicated frontend for the authentication service.
- **`apps/web`**: The secure, core application for end-users, containing all cluster management and monitoring features.
- **`apps/admin`**: A separate, secure application for administrators to manage site content (like testimonials and pricing) and users.
- **`apps/auth`**: A standalone **Node.js/Express** service that handles all user authentication, including registration, login (password & social), password resets, and JWT management.
- **`apps/backend`**: A standalone **Node.js/Express** service that provides the core REST API for all application data (clusters, services, hosts, etc.).

---

### `packages/` Directory

- **`packages/api`**: Manages the application's data and AI layers. Contains the centralized API client used by all frontend apps and the Genkit AI flows.
- **`packages/ui`**: A comprehensive library of reusable React components (Button, Card, etc.) with Storybook.
- **`packages/lib`**: A foundational library for shared, non-React code like TypeScript types and utilities.
- **`packages/design-tokens`**: Centralizes all styling and theme-related configurations, including the shared Tailwind CSS config.

---

### `tests/` Directory

- **`tests/`**: Contains all end-to-end (E2E) tests for the project, written with **Playwright**.

---

## Getting Started

Follow this three-step process to set up and run the project locally.

### 1. Configure Your Environment

First, create a `.env` file at the project root (you can copy `.env.example`) and add your `MONGODB_URI`. This is required for all backend services to function.

### 2. Seed the Database

Once your `.env` file is configured, seed your MongoDB database with initial data:

```bash
pnpm seed
```

A default admin account will be created with:

- **Email**: `admin@amberops.com`
- **Password**: `admin@amberops`

### 3. Run the Development Servers

Start all local development servers simultaneously:

```bash
sh run.sh
```

The servers will be available at:

- **Landing Page App (`home`)**: `http://localhost:3001`
- **Dashboard App (`web`)**: `http://localhost:3000`
- **Admin App (`admin`)**: `http://localhost:3003`
- **Auth Service (`auth`)**: Port `3002`
- **Backend Service (`backend`)**: Port `3004`

---

### Available Scripts

- `pnpm dev`: Starts the Next.js development server for the `web` app.
- `pnpm dev:home`: Starts the Next.js development server for the `home` app.
- `pnpm dev:admin`: Starts the Next.js development server for the `admin` app.
- `pnpm dev:auth`: Starts the Node.js development server for the `auth` service.
- `pnpm dev:backend`: Starts the Node.js development server for the `backend` service.
- `pnpm build`: Builds all packages and apps for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
- `pnpm seed`: Seeds the database with initial data.
