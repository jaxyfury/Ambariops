# AmberOps Console: Project Report

## 1. Project Overview

**AmberOps Console** is a modern, enterprise-grade frontend for Apache Ambari. Its vision is to provide a fast, intuitive, and highly accessible user experience for managing and monitoring large-scale data clusters. The target users are system administrators, DevOps engineers, and data platform operators who require a reliable and efficient tool for their daily operations.

The project is built on a robust, scalable monorepo architecture using the following key technologies:

*   **Applications**: Two separate Next.js apps:
    *   **`home`**: A public-facing landing page for marketing and user authentication (Login/Sign-up).
    *   **`web`**: The core, protected single-page application for cluster management, which also serves as the project's API backend.
*   **Styling**: Tailwind CSS with a custom theme managed in `packages/design-tokens`.
*   **UI Components**: A shared component library in `packages/ui` built with Radix UI and documented with Storybook.
*   **Authentication**: NextAuth.js handling credentials, Google, and GitHub providers, with MongoDB as the backend user database.
*   **API Layer**: A centralized API client in `packages/api` that communicates with the Next.js API routes in the `web` app.
*   **Testing**: A comprehensive testing strategy including Jest and React Testing Library for unit/integration tests, and Playwright for end-to-end and accessibility tests.
*   **CI/CD**: Automated workflows managed by GitHub Actions for continuous integration, including linting, testing, and build checks.
*   **AI Integration**: Foundational hooks and flows for AI-powered features using Genkit.

## 2. Folder Structure Explanation

The project uses a pnpm-managed monorepo structure to ensure clear separation of concerns and code reusability.

```
/
├── apps/
│   ├── home/             # Public landing page and authentication app
│   └── web/              # Main protected dashboard app and API backend
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme tokens, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook stories
├── tests/                # Playwright end-to-end tests
├── docs/                 # Project documentation and architecture blueprints
├── .eslintrc.json        # ESLint config enforcing code quality and style
├── pnpm-workspace.yaml   # Defines pnpm workspace packages
└── tsconfig.base.json    # Base TypeScript config shared across the monorepo
```

*   **`apps/home`**: A public-facing Next.js app that serves the landing page and handles all user authentication flows (login, signup).
*   **`apps/web`**: The main protected Next.js application. It contains all pages for cluster management, app-specific components, and the main application layout. It also hosts all the backend API routes under `/api`.
*   **`packages/ui`**: A shared library of reusable React components built with ShadCN/Radix. Each component has a corresponding Storybook story for isolated development and testing.
*   **`packages/api`**: Contains the centralized API client and Genkit AI flows.
*   **`packages/lib`**: A shared library for common code, such as TypeScript types and utility functions.
*   **`packages/design-tokens`**: Holds the shared Tailwind CSS configuration, including theme colors, fonts, and spacing tokens.
*   **`tests/`**: Contains the end-to-end tests written with Playwright.
*   **`.github/`**: Contains the GitHub Actions workflows for continuous integration.
*   **`docs/`**: Project documentation, including this report and Architecture Decision Records (ADRs).

## 3. Current Progress and Features Implemented

The project is fully functional and operates against a live MongoDB database.

*   **Separated Applications**: A dedicated `home` app for the landing page and authentication, and a `web` app for the protected dashboard and API.
*   **Full Authentication Flow**: User registration and login (Email/Password, Google, GitHub) are implemented using NextAuth.js, with MongoDB as the user store.
*   **Core UI Modules**: All primary dashboard pages (Dashboard, Clusters, Services, Hosts, Alerts, Config, Tasks, Logs, Settings, Admin) are implemented and fetch data from the live backend.
*   **Full CRUD Operations**: All management sections (Users, Documentation, Pricing, Testimonials, FAQs) have complete Create, Read, Update, and Delete functionality.
*   **Global Search & Quick Access**: Universal search and a quick action menu are integrated into the dashboard header.
*   **Testing**: E2E tests for critical user flows, including authentication, are in place.
*   **CI/CD Pipeline**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **AI Integration**: The AI flows for summarizing cluster health and suggesting troubleshooting steps are integrated into the UI.

## 4. Development & Deployment Workflow

### Development Setup

1.  **Configure Environment**: Copy `.env.example` to `.env` and fill in your `MONGODB_URI` and other credentials.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Seed the Database**:
    ```bash
    pnpm seed
    ```
4.  **Run both development servers**:
    ```bash
    sh run.sh
    ```
    The main app will be at `http://localhost:3000`, and the landing page at `http://localhost:3001`.
5.  **Run Storybook**:
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

While the project is functionally complete, the following areas are planned for future development:

*   **Backend Abstraction**: The current API is built with Next.js API Routes. A future iteration could involve swapping this out for a dedicated backend service (e.g., Express, NestJS) by simply changing the `NEXT_PUBLIC_API_BASE_URL` environment variable.
*   **Secure User API Key Management**: Implement a secure backend service to encrypt and store user-provided API keys and use them for per-user AI requests.
*   **Customizable Dashboards**: Allow users to add, remove, and rearrange widgets on their dashboard to create personalized views.
*   **Production Monitoring**: Integrate a monitoring service like Sentry or Datadog for error tracking and performance monitoring.
*   **Complete Test Coverage**: Increase unit and integration test coverage to over 80%.
