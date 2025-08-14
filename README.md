# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations, built with a scalable and maintainable monorepo architecture.

## Folder Structure In-Depth

This project is a `pnpm` workspace-based monorepo, a structure chosen for its excellent code-sharing capabilities and clear separation of concerns. It is organized into distinct applications (`apps`) and shared libraries (`packages`).

```
/
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── home/             # Public-facing landing page and authentication app
│   └── web/              # The core, protected dashboard application and API backend
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

This directory contains the runnable Next.js applications.

*   #### `apps/home`
    *   **Purpose**: This is the public-facing entry point for all users. It serves the marketing landing page and handles all authentication flows (login, sign-up, password reset, etc.).
    *   **Technology**: A standalone Next.js app optimized for fast initial loads and SEO.
    *   **Key Responsibilities**: User acquisition and authentication. After a user successfully authenticates, this application securely redirects them to the main `web` application. It contains all the UI for login/signup forms and social provider buttons.

*   #### `apps/web`
    *   **Purpose**: This is the secure, core application that users access after logging in. It contains all the functionality for cluster management, monitoring, and also serves as the **central API backend** for the entire monorepo.
    *   **Technology**: A feature-rich Next.js application that heavily relies on client-side rendering for its interactive dashboards.
    *   **Key Responsibilities**: Provides all the main features of AmberOps, including the dashboard, cluster/service/host views, alerting, and settings. It also contains the backend API routes for NextAuth.js and all data-related endpoints under `/api/v1/`.

---

### `packages/` Directory

This directory contains all the shared code, organized into distinct libraries to be consumed by the applications.

*   #### `packages/ui`
    *   **Purpose**: A comprehensive library of reusable React components, forming the core of the design system.
    *   **Contents**: Includes all the UI primitives like `Button`, `Card`, `Table`, `Dialog`, etc., built using **ShadCN/Radix**. It also contains **Storybook**, which provides a workshop for developing, documenting, and testing these components in isolation.

*   #### `packages/api`
    *   **Purpose**: Manages the application's data and AI layers.
    *   **Contents**:
        *   **API Client**: A centralized, shared client for making requests to the backend API.
        *   **Genkit AI Flows**: This is where the server-side AI logic is defined using **Google's Genkit**. It includes flows for summarizing cluster health and suggesting troubleshooting steps.

*   #### `packages/lib`
    *   **Purpose**: A foundational library for shared, non-React code.
    *   **Contents**: Contains core utilities and type definitions used across the entire monorepo, such as TypeScript types for `Cluster`, `Service`, `Host`, etc., and utility functions like `cn` for class name merging.

*   #### `packages/design-tokens`
    *   **Purpose**: Centralizes all styling and theme-related configurations.
    *   **Contents**: The shared **Tailwind CSS** configuration, including the full color palette (for both light and dark modes), fonts, and spacing tokens. This ensures a consistent visual identity across both the `home` and `web` applications.

---

### `tests/` Directory

*   **Purpose**: Contains all end-to-end (E2E) tests for the project, written with **Playwright**.
*   **Scope**: These tests cover critical user flows across both applications, such as the full authentication journey, navigation, data table interactions (sorting, filtering, exporting), and usage of global features like search and theme toggling.

---

## Getting Started

Follow this three-step process to set up and run the project locally.

### 1. Configure Your Environment

First, you need to set up your environment variables. The project includes a pre-configured `.env` file that you can use as a starting point.

*   **MongoDB URI**: You must provide your own MongoDB connection string in the `.env` file for the `MONGODB_URI` variable. This is required for user authentication to work.
*   **OAuth Credentials**: If you plan to use Google or GitHub for authentication, you will need to add your own client IDs and secrets.

### 2. Seed the Database

Once your `.env` file is configured, you can seed your MongoDB database with initial data (including a default admin user). Run the following command from the root of the project:

```bash
pnpm seed
```

This script will populate your database with mock users, clusters, services, and other necessary data. A default admin account will be created with the credentials:
*   **Email**: `admin@amberops.com`
*   **Password**: `admin@amberops`

### 3. Run the Development Servers

With the environment set up and the database seeded, you can start the local development servers for both applications simultaneously:

```bash
sh run.sh
```

The servers will be available at:
*   **Landing Page App (`home`)**: `http://localhost:3001`
*   **Dashboard App (`web`)**: `http://localhost:3000`

---

### Available Scripts

- `pnpm dev`: Starts the Next.js development server for the `web` app.
- `pnpm dev:home`: Starts the Next.js development server for the `home` app.
- `pnpm build`: Builds all packages and apps for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
- `pnpm seed`: Seeds the database with initial data.
