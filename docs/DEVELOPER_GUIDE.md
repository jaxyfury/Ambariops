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
├── .github/              # GitHub Actions workflows and issue/PR templates
├── apps/
│   ├── home/             # Public-facing landing page and authentication app
│   └── web/              # The core, protected application and API backend
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook stories
├── tests/                # Playwright end-to-end tests for all applications
├── .env                  # Environment variables configuration (not committed)
├── package.json          # Root package manifest managing pnpm workspaces
├── pnpm-workspace.yaml   # Defines pnpm workspace packages
└── tsconfig.base.json    # The shared base TypeScript configuration
```

### Root Level Files

*   **`pnpm-workspace.yaml`**: The heart of the monorepo. This file tells `pnpm` which directories to treat as separate packages, enabling cross-package linking.
*   **`package.json`**: The root package file. It contains scripts that can orchestrate actions across the entire workspace (e.g., `pnpm build` runs the build script in every package). It also holds the top-level development dependencies.
*   **`tsconfig.base.json`**: A shared TypeScript configuration file that other `tsconfig.json` files in the monorepo extend. This is where we define path aliases (like `@amberops/ui`) that allow for clean, direct imports between packages.
*   **`.gitignore`**: The global gitignore file.
*   **`.lintstagedrc.js` & `commitlint.config.js`**: Configuration for code quality tools that run automatically before commits, ensuring all code adheres to style guides.
*   **`build-workspace.sh` & `run.sh`**: Helper shell scripts to simplify the setup and local development process.
*   **`.env`**: The central file for managing all environment variables for both applications.

---

### `apps/` Directory

This directory contains the runnable Next.js applications.

#### `apps/home`
*   **Purpose**: The public-facing entry point for all users. It serves the marketing landing page and handles all authentication flows (login, sign-up, password reset, etc.).
*   **Technology**: A standalone Next.js app optimized for fast initial loads and SEO.
*   **Key Files**:
    *   `src/app/page.tsx`: The main landing page component.
    *   `src/app/auth/page.tsx`: The unified user/admin login and signup form.
    *   `next.config.js`: Contains a critical `rewrites` rule that proxies authentication API requests to the `web` app's backend.

#### `apps/web`
*   **Purpose**: The secure, core application that users access *after* logging in. This is a feature-rich Single-Page Application (SPA) and also serves as the **API backend** for the entire project.
*   **Technology**: A Next.js application that heavily relies on client-side rendering for its interactive dashboards.
*   **Key Files**:
    *   `src/app/(app)/...`: All the protected pages of the dashboard, organized by feature (e.g., `clusters`, `services`, `alerts`).
    *   `src/app/api/v1/...`: All backend API routes that connect to the database and serve data to both applications.
    *   `src/app/api/auth/[...nextauth]/route.ts`: The backend API endpoint for NextAuth.js. It handles session management, communication with OAuth providers (Google, GitHub), and the credentials provider.
    *   `src/lib/mongodb.ts`: A utility to manage the MongoDB connection pool.

---

### `packages/` Directory

This directory contains all the shared code, organized into distinct libraries.

#### `packages/ui`
*   **Purpose**: A comprehensive library of reusable React components, forming the core of the design system.
*   **Key Files**:
    *   `src/components/ui/`: Contains all the UI primitives like `Button.tsx`, `Card.tsx`, `Table.tsx`, etc., built using **ShadCN/Radix**.
    *   `src/stories/`: Contains **Storybook** files for each component. This allows for isolated development, documentation, and visual testing.

#### `packages/api`
*   **Purpose**: Manages the application's data and AI layers.
*   **Key Files**:
    *   `src/client.ts`: The centralized API client used by both `home` and `web` apps to communicate with the backend.
    *   `src/ai/`: This directory contains all the server-side AI logic built with **Google's Genkit**.
        *   `genkit.ts`: Initializes and configures the Genkit instance with the necessary plugins (like `googleAI`).
        *   `flows/`: Contains individual files for each AI-powered feature, such as summarizing cluster health.

#### `packages/lib`
*   **Purpose**: A foundational library for shared, non-React code.
*   **Key Files**:
    *   `src/types.ts`: Contains core TypeScript types used across the entire monorepo (e.g., `Cluster`, `Service`, `User`).
    *   `src/utils.ts`: Contains utility functions like `cn` for merging Tailwind CSS class names.

#### `packages/design-tokens`
*   **Purpose**: Centralizes all styling and theme-related configurations.
*   **Key Files**:
    *   `tailwind.config.ts`: The shared **Tailwind CSS** configuration, including the full color palette (light and dark modes), fonts, and spacing tokens.
    *   `globals.css`: Defines the root CSS variables that power the theme.

---

## 3. Development Workflow

### Step 1: Environment Configuration

The first and most important step is to set up your environment variables.

1.  **Copy the `.env.example` to `.env`**: If it doesn't exist, create a `.env` file at the root of the project.
2.  **Set `MONGODB_URI`**: You **must** provide a valid MongoDB connection string. The application relies on this for user authentication.
3.  **Set OAuth Credentials** (Optional): If you wish to use Google or GitHub for login, you must obtain and fill in the `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` variables.
4.  **Set `GEMINI_API_KEY`** (Optional): To use the AI features, you need a Google Gemini API key.

### Step 2: Database Seeding

With your environment configured, you must seed the database with initial data. This script populates your MongoDB instance with all the necessary data for clusters, services, users, etc.

From the project root, run:
```bash
pnpm seed
```
A default admin account will be created with:
*   **Email**: `admin@amberops.com`
*   **Password**: `admin@amberops`

### Step 3: Running the Application Locally

Use this command to start the development servers for both applications simultaneously:
```bash
sh run.sh
```
The servers will be available at:
*   **Landing Page (`home`)**: `http://localhost:3001`
*   **Dashboard App (`web`)**: `http://localhost:3000`

---

## 4. Testing Strategy

The project employs a multi-layered testing strategy:

*   **End-to-End (E2E) Testing**:
    *   **Tool**: **Playwright**.
    *   **Location**: `tests/` directory.
    *   **Purpose**: These tests simulate real user journeys across both applications, such as the full authentication flow, navigation, and critical feature interactions (e.g., filtering a data table and exporting it). They are the ultimate guarantee that the applications work as a whole.

*   **Static Analysis & Linting**:
    *   **Tool**: **ESLint** and **Prettier**.
    *   **Purpose**: These tools automatically enforce a consistent code style and catch common errors before the code is even run.

---

## 5. Deployment Guide (for DevOps)

Deploying this monorepo requires a platform that can handle multiple applications and build steps.

### Build Process

1.  **Install Dependencies**: `pnpm install`
2.  **Build All Packages**: `pnpm build`
    *   This command runs the `build` script defined in the `package.json` of every package in the workspace, creating production-ready assets in their respective `dist` or `.next` folders.

### Hosting Strategy

The two-app structure requires a hosting solution with a reverse proxy or path-based routing.

*   **Reverse Proxy (e.g., Nginx)**:
    *   The `home` app (running on port 3001) should be served for all root traffic (`/`, `/login`, `/signup`).
    *   The `web` app (running on port 3000) should be served for all traffic under a protected path like `/dashboard` or on a separate subdomain.
    *   The proxy must be configured to forward requests to the correct internal port based on the incoming request path.

*   **Environment Variables**:
    *   All environment variables from the root `.env` file (e.g., `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `NEXTAUTH_SECRET`) must be securely set in the production environment for both applications.

### Continuous Integration (CI/CD)

The GitHub Actions workflow in `.github/workflows/ci.yml` provides a template for the CI process. A full CD pipeline would extend this to:
1.  Run all checks (lint, build, test).
2.  Build production Docker images for each application.
3.  Push the images to a container registry (e.g., Docker Hub, GCR).
4.  Trigger a deployment to the hosting environment.
