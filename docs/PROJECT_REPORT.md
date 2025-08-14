# AmberOps Console: Project Report

## 1. Project Overview

**AmberOps Console** is a modern, enterprise-grade frontend for Apache Ambari. Its vision is to provide a fast, intuitive, and highly accessible user experience for managing and monitoring large-scale data clusters. The target users are system administrators, DevOps engineers, and data platform operators.

The project is built on a robust, scalable microservices-style architecture using the following key technologies:

*   **Applications**: Three separate Next.js frontends:
    *   **`home`**: A public-facing landing page and authentication UI.
    *   **`web`**: The core, protected single-page application for cluster management.
    *   **`admin`**: A protected dashboard for platform administration.
*   **Backend Services**: Two separate Node.js/Express backend services:
    *   **`auth`**: A dedicated service for all authentication and user management logic (registration, login, social OAuth, password resets).
    *   **`backend`**: A dedicated REST API service for all application data (clusters, services, etc.).
*   **Styling**: Tailwind CSS with a custom theme managed in `packages/design-tokens`.
*   **UI Components**: A shared component library in `packages/ui` built with Radix UI and documented with Storybook.
*   **Database**: MongoDB serving as the persistent data store for both backend services.
*   **Testing**: A comprehensive testing strategy using Playwright for end-to-end tests.
*   **CI/CD**: Automated workflows managed by GitHub Actions for continuous integration.
*   **AI Integration**: Foundational hooks and flows for AI-powered features using Genkit.

## 2. Folder Structure Explanation

The project uses a pnpm-managed monorepo structure to ensure clear separation of concerns and code reusability.

```
/
├── apps/
│   ├── admin/            # Admin dashboard frontend
│   ├── auth/             # Standalone authentication backend service
│   ├── backend/          # Standalone data backend service
│   ├── home/             # Public landing page and auth frontend
│   └── web/              # Main protected dashboard app
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS config and theme
│   ├── lib/              # Shared TypeScript types and utilities
│   └── ui/               # Reusable React UI components
├── tests/                # Playwright end-to-end tests
└── docs/                 # Project documentation
```

*   **`apps/`**: Contains all deployable applications and services. The `home`, `web`, and `admin` apps are frontends, while `auth` and `backend` are the backend services.
*   **`packages/`**: Contains all shared code, such as the UI library, API client, and type definitions.
*   **`tests/`**: Contains the end-to-end tests written with Playwright.
*   **`docs/`**: Project documentation, including this report and Architecture Decision Records (ADRs).

## 3. Current Progress and Features Implemented

The project is fully functional and operates against a live MongoDB database.

*   **Decoupled Architecture**: A true microservices-style architecture has been implemented with three distinct frontends and two dedicated backend services.
*   **Full Authentication Flow**: A complete user authentication system is in place:
    *   User registration and login (Email/Password).
    *   Social logins (Google, GitHub) via Passport.js.
    *   A full forgot/reset password flow.
    *   Secure session management using JSON Web Tokens (JWTs).
*   **Full CRUD Operations**: All management sections (`admin` and `web` apps) have complete Create, Read, Update, and Delete functionality, powered by the dedicated `backend` service.
*   **Core UI Modules**: All primary dashboard pages (Dashboard, Clusters, Services, Hosts, Alerts, etc.) are implemented and fetch data from the live backend.
*   **Global Search & Quick Access**: Universal search and a quick action menu are integrated into the dashboard header.
*   **Testing**: E2E tests for critical user flows, including authentication, are in place.
*   **CI/CD Pipeline**: The GitHub Actions pipeline is configured to run linting, testing, and builds on every pull request.
*   **AI Integration**: The AI flows for summarizing cluster health and suggesting troubleshooting steps are integrated into the UI.

## 4. Development & Deployment Workflow

### Development Setup

1.  **Configure Environment**: Copy `.env.example` to `.env` and fill in your `MONGODB_URI` and other credentials.
2.  **Install dependencies**: `pnpm install`
3.  **Seed the Database**: `pnpm seed`
4.  **Run all development servers**: `sh run.sh`

### CI/CD Workflow

The GitHub Actions workflow in `.github/workflows/ci.yml` is triggered on every pull request. It performs the following checks:

*   Installs dependencies (`pnpm install`).
*   Runs ESLint to check for code quality issues.
*   Runs the production build for all apps (`pnpm build`).
*   Runs the Storybook build (`pnpm build-storybook`).
*   Runs Playwright E2E tests (`pnpm test:e2e`).

## 5. Future Work & Roadmap

*   **Real-time Updates**: Integrate WebSockets to provide real-time updates for task progress and alerts, removing the need for manual refreshing.
*   **Deployment Automation**: Create production-ready deployment configurations (e.g., Docker Compose files) to simplify deploying the multi-service architecture.
*   **Production Monitoring**: Integrate a monitoring service like Sentry or Datadog for error tracking and performance monitoring.
*   **Complete Test Coverage**: Increase unit and integration test coverage for all backend services and frontend components.
