# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations, built with a scalable and maintainable monorepo architecture.

## Folder Structure In-Depth

This project is a `pnpm` workspace-based monorepo, a structure chosen for its excellent code-sharing capabilities and clear separation of concerns. It is organized into distinct applications (`apps`) and shared libraries (`packages`).

```
/
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── home/             # Public-facing landing page and authentication app
│   └── web/              # The core, protected dashboard application
├── packages/
│   ├── api/              # API client, data mocking, and AI flows
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
    *   **Purpose**: This is the secure, core application that users access after logging in. It contains all the functionality for cluster management and monitoring.
    *   **Technology**: A feature-rich Next.js application that heavily relies on client-side rendering for its interactive dashboards.
    *   **Key Responsibilities**: Provides all the main features of AmberOps, including the dashboard, cluster/service/host views, alerting, and settings. It also contains the backend API routes for NextAuth.js.

---

### `packages/` Directory

This directory contains all the shared code, organized into distinct libraries to be consumed by the applications.

*   #### `packages/ui`
    *   **Purpose**: A comprehensive library of reusable React components, forming the core of the design system.
    *   **Contents**: Includes all the UI primitives like `Button`, `Card`, `Table`, `Dialog`, etc., built using **ShadCN/Radix**. It also contains **Storybook**, which provides a workshop for developing, documenting, and testing these components in isolation.

*   #### `packages/api`
    *   **Purpose**: Manages the application's data and AI layers.
    *   **Contents**:
        *   **Mock Service Worker (MSW)**: Contains mock API handlers that simulate a real backend. This allows for independent frontend development and robust testing.
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

## Current Progress

The project has achieved its initial MVP goals. The core architecture is in place, and all primary features are functional using a mocked API.

*   **Separated Applications**: A dedicated `home` app for the landing page and authentication, and a `web` app for the protected dashboard.
*   **Full Authentication Flow**: User registration and login (Email/Password, Google, GitHub) are implemented using NextAuth.js, with MongoDB as the user store.
*   **Core UI Modules**: All pages (Dashboard, Clusters, Services, Hosts, Alerts, etc.) are implemented and fetching data from the mock API.
*   **Component Library**: A robust set of shared UI components is available in `packages/ui`, with Storybook stories and accessibility checks.
*   **API Mocking**: The entire API is mocked using MSW, allowing for frontend development without a live backend.
*   **Testing**: A solid foundation for testing is in place, with E2E tests for critical user flows.
*   **CI/CD**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **AI Integration**: The AI flows for summarizing cluster health and suggesting troubleshooting steps are integrated into the UI.


## Getting Started

Follow this two-step process to set up and run the project.

### 1. Build the Workspace (One-Time Setup)

This command will install all the necessary tools and dependencies, then build and test the entire project to ensure your environment is set up correctly.

```bash
sh build-workspace.sh
```

### 2. Run the Development Server

After the initial setup, use this command to start the local development servers for both applications simultaneously.

```bash
sh run.sh
```

The servers will be available at:
*   **Landing Page App (`home`)**: `http://localhost:3001`
*   **Dashboard App (`web`)**: `http://localhost:3000`

## Available Scripts

- `pnpm dev`: Starts the Next.js development server for the `web` app.
- `pnpm dev:home`: Starts the Next.js development server for the `home` app.
- `pnpm build`: Builds all packages and apps for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test`: Runs all unit and integration tests.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
