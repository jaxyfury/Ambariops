# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations.

## Folder Structure Overview

This project is a monorepo managed by `pnpm` workspaces.

```
/
├── .github/              # GitHub Actions workflows and templates
├── .husky/               # Git hooks for pre-commit checks
├── apps/
│   └── web/              # Main Next.js frontend application
│       ├── public/       # Static assets, including i18n locale files
│       └── src/
│           ├── app/      # Next.js App Router pages and layouts
│           ├── components/ # App-specific components (e.g., page-header)
│           └── lib/        # App-specific utilities and i18n setup
├── packages/
│   ├── api/              # API client and MSW mocking layer
│   ├── design-tokens/    # Shared theme, colors, and Tailwind config
│   ├── lib/              # Shared utilities and types
│   └── ui/               # Shared React component library
│       ├── .storybook/   # Storybook configuration
│       └── src/
│           ├── components/ # Reusable UI components
│           └── stories/    # Storybook stories for components
├── tests/                # End-to-end tests using Playwright
├── README.md             # This file
├── package.json          # Root package.json managing workspaces
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── tsconfig.base.json    # Base TypeScript configuration
```

### Key Folders

*   **`/apps/web`**: The main Next.js frontend application. It contains all pages, app-specific components, and the main application layout.
*   **`/packages/ui`**: A shared library of reusable React components built with ShadCN/Radix. Each component has a corresponding Storybook story for isolated development and testing.
*   **`/packages/api`**: Contains the API mocking layer built with Mock Service Worker (MSW). It simulates backend responses for local development. It also includes the Genkit AI flows.
*   **`/packages/lib`**: A shared library for common code, such as TypeScript types and utility functions, used across different parts of the monorepo.
*   **`/packages/design-tokens`**: Holds the shared Tailwind CSS configuration, including theme colors, fonts, and spacing tokens.
*   **`/tests`**: Contains the end-to-end tests written with Playwright, covering the main user flows of the application.
*   **`/.github`**: Contains the GitHub Actions workflows for continuous integration (linting, testing, building).

## Current Progress

The project has achieved its initial MVP goals. The core architecture is in place, and all primary features are functional using a mocked API.

*   **Core UI Modules**: All pages (Dashboard, Clusters, Services, Hosts, Alerts, etc.) are implemented and fetching data from the mock API.
*   **Component Library**: A robust set of shared UI components is available in `packages/ui`, with Storybook stories and accessibility checks.
*   **API Mocking**: The entire API is mocked using MSW, allowing for frontend development without a live backend.
*   **Testing**: A solid foundation for testing is in place, with E2E tests for critical user flows and a setup for unit tests.
*   **CI/CD**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **Internationalization**: The application supports English and Spanish, with a functional language switcher.

## Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The web app will be available at `http://localhost:3000`.

3.  **Run Storybook:**
    ```bash
    pnpm storybook
    ```
    Storybook will be available at `http://localhost:6006`.

## Available Scripts

- `pnpm dev`: Starts the Next.js development server for the `web` app.
- `pnpm build`: Builds all packages and the web app for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test`: Runs all unit and integration tests.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
