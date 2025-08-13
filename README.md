# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations.

## Folder Structure Overview

This project is a monorepo managed by `pnpm` workspaces, organized into two separate applications and a collection of shared packages.

```
/
├── .github/              # GitHub Actions workflows and issue/PR templates
├── apps/
│   ├── home/             # Public-facing landing page and authentication app
│   └── web/              # The core, protected application for cluster management
├── packages/
│   ├── api/              # API client, mocking (MSW), and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook stories
├── tests/                # Playwright end-to-end tests for all applications
├── .env                  # Environment variables configuration (not committed)
├── package.json          # Root package manifest managing pnpm workspaces
├── pnpm-workspace.yaml   # Defines pnpm workspace packages
└── README.md             # Project README file (this document)
```

### Key Folders

*   **`/apps/home`**: A public-facing Next.js application that serves the landing page and handles all user authentication flows (login, signup, etc.).
*   **`/apps/web`**: The main protected Next.js application. It contains all the pages for cluster management, app-specific components, and the core dashboard layout.
*   **`/packages/ui`**: A shared library of reusable React components built with ShadCN/Radix. Each component has a corresponding Storybook story for isolated development and testing.
*   **`/packages/api`**: Contains the API mocking layer built with Mock Service Worker (MSW) and the Genkit AI flows.
*   **`/packages/lib`**: A shared library for common TypeScript types and utility functions.
*   **`/packages/design-tokens`**: Holds the shared Tailwind CSS configuration, including theme colors, fonts, and spacing tokens.
*   **`/tests`**: Contains the end-to-end tests written with Playwright, covering the main user flows of both applications.

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
