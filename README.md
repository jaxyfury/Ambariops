# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations.

## Folder Structure Overview

This project is a monorepo managed by `pnpm` workspaces.
````
/
├── .github/              # GitHub Actions workflows and issue/PR templates
├── .husky/               # Git hooks for pre-commit linting and commit message checks
├── .idx/                 # Custom project-related tooling/config (optional)
├── .next/                # Next.js build and cache output (auto-generated)
├── apps/
│   └── web/              # Main Next.js frontend app with React components, pages, and localization
│       ├── public/       # Static assets like locale JSON files for i18n
│       └── src/
│           ├── app/      # Next.js App Router pages and layout definitions
│           ├── components/ # App-specific React components (headers, layout, widgets)
│           ├── hooks/    # Custom React hooks used by the web app
│           └── lib/      # Utilities, i18n setup, types specific to the web app
├── data/                 # Project metadata, tracking files, CSVs for progress and structure
├── docs/                 # Documentation and architectural blueprints
├── node_modules/         # Installed dependencies (auto-generated)
├── packages/             # Shared libraries and tools across apps
│   ├── api/              # API client, mocking (MSW), and Genkit AI flows for backend simulation
│   ├── design-tokens/    # Tailwind CSS configuration, theme tokens, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook stories and Radix primitives
├── tests/                # Playwright end-to-end tests covering main user workflows
├── .env                  # Environment variables configuration (not committed)
├── .eslintrc.json        # ESLint config enforcing code quality and style
├── .gitignore            # Specifies untracked files for git
├── .lintstagedrc.js      # Lint-staged config to run linting on staged files
├── .prettierrc           # Prettier config for consistent code formatting
├── commitlint.config.js  # Commit message linting rules
├── next.config.ts        # Next.js build and runtime configuration for the web app
├── package.json          # Root package manifest managing pnpm workspaces and scripts
├── playwright.config.ts  # Playwright test runner configuration
├── pnpm-workspace.yaml   # Defines pnpm workspace packages
├── postcss.config.mjs    # PostCSS config for styling
├── tailwind.config.ts    # Tailwind CSS config at repo root
├── tsconfig.base.json    # Base TypeScript config shared across the monorepo
├── tsconfig.json         # Root TypeScript config extending base config
└── README.md             # Project README file (this document)
````

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

Follow this two-step process to set up and run the project.

### 1. Build the Workspace (One-Time Setup)

This command will install all the necessary tools and dependencies, then build and test the entire project to ensure your environment is set up correctly.

```bash
sh build-workspace.sh
```

### 2. Run the Development Server

After the initial setup, use this command to start the local development server.

```bash
sh run.sh
```

The web app will be available at `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Starts the Next.js development server for the `web` app.
- `pnpm build`: Builds all packages and the web app for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test`: Runs all unit and integration tests.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
# Ambariops
