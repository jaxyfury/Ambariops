# AmberOps Console: Project Report

## 1. Project Overview

**AmberOps Console** is a modern, enterprise-grade frontend replacement for the Apache Ambari UI. Its vision is to provide a fast, intuitive, and highly accessible user experience for managing and monitoring large-scale data clusters. The target users are system administrators, DevOps engineers, and data platform operators who require a reliable and efficient tool for their daily operations.

The project is built on a robust, scalable monorepo architecture using the following key technologies:

*   **Frontend**: Next.js (App Router) with TypeScript and React.
*   **Styling**: Tailwind CSS with a custom theme managed in `packages/design-tokens`.
*   **UI Components**: A shared component library in `packages/ui` built with Radix UI and documented with Storybook.
*   **State Management**: TanStack Query for server state and Zustand for local client state.
*   **API Layer**: A mock-first development approach using Mock Service Worker (MSW) in `packages/api`.
*   **Testing**: A comprehensive testing strategy including Jest and React Testing Library for unit/integration tests, and Playwright for end-to-end and accessibility tests.
*   **CI/CD**: Automated workflows managed by GitHub Actions for continuous integration, including linting, testing, and build checks.
*   **Internationalization (i18n)**: Full i18n support with `react-i18next`.
*   **AI Integration**: Foundational hooks and flows for future AI-powered features using Genkit.

## 2. Folder Structure Explanation

The project uses a pnpm-managed monorepo structure to ensure clear separation of concerns and code reusability.

```
/
├── .github/              # GitHub Actions workflows and issue/PR templates
├── .husky/               # Git hooks for pre-commit linting and commit message checks
├── apps/
│   └── web/              # Main Next.js frontend app
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

*   **`apps/web`**: The main Next.js frontend application. It contains all pages, app-specific components, and the main application layout.
*   **`packages/ui`**: A shared library of reusable React components built with ShadCN/Radix. Each component has a corresponding Storybook story for isolated development and testing.
*   **`packages/api`**: Contains the API mocking layer built with Mock Service Worker (MSW). It simulates backend responses for local development and includes Genkit AI flows.
*   **`packages/lib`**: A shared library for common code, such as TypeScript types and utility functions.
*   **`packages/design-tokens`**: Holds the shared Tailwind CSS configuration, including theme colors, fonts, and spacing tokens.
*   **`tests/`**: Contains the end-to-end tests written with Playwright.
*   **`.github/`**: Contains the GitHub Actions workflows for continuous integration.
*   **`.husky/`**: Manages Git hooks for running pre-commit checks like linting and formatting.
*   **`data/`**: Contains CSV files for tracking project progress and structure.
*   **`docs/`**: Project documentation, including this report and Architecture Decision Records (ADRs).

## 3. Current Progress and Features Implemented

The project has successfully reached its initial MVP milestone. All core features are functional using a mocked API layer.

*   **Core UI Modules**: All primary pages (Dashboard, Clusters, Services, Hosts, Alerts, Config, Tasks, Logs, Settings) are implemented and fetching data from the mock API.
*   **Component Library**: A robust set of shared UI components is available in `packages/ui`, with Storybook stories and accessibility checks.
*   **Mock API**: The entire API surface is mocked using MSW, allowing for full frontend development without a live backend.
*   **State Management**: TanStack Query is integrated for server state, and Zustand is set up for local UI state.
*   **Testing**: A solid foundation for testing is in place, with E2E tests for critical user flows and a setup for unit tests.
*   **CI/CD Pipeline**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **Internationalization**: The application supports English and Spanish, with a functional language switcher.
*   **AI Integration**: The AI flows for summarizing cluster health and suggesting troubleshooting steps are integrated into the UI.

## 4. Development & Deployment Workflow

### Development Setup

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```
2.  **Run the development server**:
    ```bash
    pnpm dev
    ```
    The web app will be available at `http://localhost:3000`.
3.  **Run Storybook**:
    ```bash
    pnpm storybook
    ```
    Storybook will be available at `http://localhost:6006`.

### CI/CD Workflow

The GitHub Actions workflow in `.github/workflows/ci.yml` is triggered on every pull request. It performs the following checks:

*   Installs dependencies (`pnpm install`).
*   Runs ESLint to check for code quality issues.
*   Runs the Next.js production build (`pnpm build`).
*   Runs the Storybook build (`pnpm build-storybook`).
*   Runs Playwright E2E tests (`pnpm test:e2e`).

Merges to the `main` branch are protected and require all checks to pass.

## 5. Future Work & Roadmap

While the MVP is complete, the following areas are planned for future development:

*   **Real Ambari API Integration**: Replace the MSW mock client with a real HTTP client that communicates with a live Ambari backend.
*   **Enhanced AI Features**: Expand the AI capabilities to include proactive alerting, root cause analysis, and automated remediation suggestions.
*   **Advanced Table Features**: Add global filtering, advanced sorting, and column customization to all data tables.
*   **Production Monitoring**: Integrate a monitoring service like Sentry or Datadog for error tracking and performance monitoring.
*   **Complete Test Coverage**: Increase unit and integration test coverage to over 80% and expand E2E tests to cover all edge cases.

## 6. Summary & Recommendations

The AmberOps Console project is in excellent health. The monorepo architecture is clean, scalable, and follows modern best practices. The codebase is well-organized, and the CI/CD pipeline ensures a high standard of quality.

**Recommendations for New Developers**:

*   Start by exploring the `packages/ui` component library via Storybook to get familiar with the design system.
*   Review the MSW handlers in `packages/api` to understand the data contracts for the frontend.
*   Follow the contribution guidelines in `CONTRIBUTING.md` (to be created) for all new pull requests.
