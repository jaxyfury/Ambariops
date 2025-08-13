# AmberOps Console: Project Report

## 1. Project Overview

**AmberOps Console** is a modern, enterprise-grade frontend for Apache Ambari. Its vision is to provide a fast, intuitive, and highly accessible user experience for managing and monitoring large-scale data clusters. The target users are system administrators, DevOps engineers, and data platform operators who require a reliable and efficient tool for their daily operations.

The project is built on a robust, scalable monorepo architecture using the following key technologies:

*   **Applications**: Two separate Next.js apps:
    *   **`home`**: A public-facing landing page for marketing and user authentication (Login/Sign-up).
    *   **`web`**: The core, protected single-page application for cluster management.
*   **Styling**: Tailwind CSS with a custom theme managed in `packages/design-tokens`.
*   **UI Components**: A shared component library in `packages/ui` built with Radix UI and documented with Storybook.
*   **Authentication**: NextAuth.js handling credentials, Google, and GitHub providers, with MongoDB as the backend user database.
*   **API Layer**: A mock-first development approach using Mock Service Worker (MSW) in `packages/api`.
*   **Testing**: A comprehensive testing strategy including Jest and React Testing Library for unit/integration tests, and Playwright for end-to-end and accessibility tests.
*   **CI/CD**: Automated workflows managed by GitHub Actions for continuous integration, including linting, testing, and build checks.
*   **AI Integration**: Foundational hooks and flows for future AI-powered features using Genkit.

## 2. Folder Structure Explanation

The project uses a pnpm-managed monorepo structure to ensure clear separation of concerns and code reusability.

```
/
├── apps/
│   ├── home/             # Public landing page and authentication app
│   └── web/              # Main protected dashboard app
├── packages/
│   ├── api/              # API client, mocking (MSW), and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme tokens, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook stories
├── tests/                # Playwright end-to-end tests
├── data/                 # Project metadata and progress tracking CSVs
├── docs/                 # Project documentation and architecture blueprints
├── .eslintrc.json        # ESLint config enforcing code quality and style
├── pnpm-workspace.yaml   # Defines pnpm workspace packages
└── tsconfig.base.json    # Base TypeScript config shared across the monorepo
```

*   **`apps/home`**: A public-facing Next.js app that serves the landing page and handles all user authentication flows (login, signup).
*   **`apps/web`**: The main protected Next.js application. It contains all pages for cluster management, app-specific components, and the main application layout.
*   **`packages/ui`**: A shared library of reusable React components built with ShadCN/Radix. Each component has a corresponding Storybook story for isolated development and testing.
*   **`packages/api`**: Contains the API mocking layer built with Mock Service Worker (MSW). It simulates backend responses for local development and includes Genkit AI flows.
*   **`packages/lib`**: A shared library for common code, such as TypeScript types and utility functions.
*   **`packages/design-tokens`**: Holds the shared Tailwind CSS configuration, including theme colors, fonts, and spacing tokens.
*   **`tests/`**: Contains the end-to-end tests written with Playwright.
*   **`.github/`**: Contains the GitHub Actions workflows for continuous integration.
*   **`data/`**: Contains CSV files for tracking project progress and structure.
*   **`docs/`**: Project documentation, including this report and Architecture Decision Records (ADRs).

## 3. Current Progress and Features Implemented

The project has successfully reached its initial MVP milestone. All core features are functional using a mocked API layer.

*   **Separated Applications**: A dedicated `home` app for the landing page and authentication, and a `web` app for the protected dashboard.
*   **Full Authentication Flow**: User registration and login (Email/Password, Google, GitHub) are implemented using NextAuth.js, with MongoDB as the user store.
*   **Core UI Modules**: All primary dashboard pages (Dashboard, Clusters, Services, Hosts, Alerts, Config, Tasks, Logs, Settings) are implemented in the `web` app.
*   **Global Search & Quick Access**: Universal search and a quick action menu are integrated into the dashboard header.
*   **Mock API**: The entire API surface is mocked using MSW, allowing for full frontend development without a live backend.
*   **Testing**: E2E tests for critical user flows, including authentication, are in place.
*   **CI/CD Pipeline**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **AI Integration**: The AI flows for summarizing cluster health and suggesting troubleshooting steps are integrated into the UI.

## 4. Development & Deployment Workflow

### Development Setup

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```
2.  **Run both development servers** (in separate terminal windows):
    ```bash
    # For the main dashboard app
    pnpm dev

    # For the landing page app
    pnpm dev:home
    ```
    The main app will be at `http://localhost:3000`, and the landing page at `http://localhost:3001`.
3.  **Run Storybook**:
    ```bash
    pnpm storybook
    ```
    Storybook will be available at `http://localhost:6006`.

### CI/CD Workflow

The GitHub Actions workflow in `.github/workflows/ci.yml` is triggered on every pull request. It performs the following checks:

*   Installs dependencies (`pnpm install`).
*   Runs ESLint to check for code quality issues.
*   Runs the production build for both apps (`pnpm build`).
*   Runs the Storybook build (`pnpm build-storybook`).
*   Runs Playwright E2E tests (`pnpm test:e2e`).

Merges to the `main` branch are protected and require all checks to pass.

## 5. Future Work & Roadmap

While the MVP is complete, the following areas are planned for future development:

*   **Real Ambari API Integration**: Replace the MSW mock client with a real HTTP client that communicates with a live Ambari backend.
*   **Secure User API Key Management**: Implement a secure backend service to encrypt and store user-provided API keys and use them for per-user AI requests.
*   **Customizable Dashboards**: Allow users to add, remove, and rearrange widgets on their dashboard to create personalized views.
*   **Production Monitoring**: Integrate a monitoring service like Sentry or Datadog for error tracking and performance monitoring.
*   **Complete Test Coverage**: Increase unit and integration test coverage to over 80%.
