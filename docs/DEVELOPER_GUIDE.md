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
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── admin/            # Admin dashboard frontend app
│   ├── auth/             # Standalone Node.js authentication service
│   ├── backend/          # Standalone Node.js backend API service
│   ├── home/             # Public-facing landing page and auth frontend
│   └── web/              # The core, protected user dashboard app
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook
├── tests/                # Playwright end-to-end tests for all applications
├── .env.example          # Example environment variables configuration
├── .env                  # Your local environment variables (gitignored)
├── package.json          # Root package manifest managing pnpm workspaces
└── tsconfig.base.json    # The shared base TypeScript configuration
```

---

## 3. Scripts and Commands

The project includes several shell scripts and `pnpm` commands to automate common tasks. All commands should be run from the project root.

### Shell Scripts

These scripts provide high-level orchestration for setting up and running the workspace.

| Script                  | Description                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `sh build-workspace.sh` | **First-Time Setup**: Prepares the entire workspace. It installs `nvm`, Node.js, `pnpm`, all dependencies, and runs builds and tests.      |
| `sh run.sh`             | **Run All Services**: Starts the development servers for all applications and services simultaneously. This is the primary command for local development. |
| `sh clean-workspace.sh` | **Full Cleanup**: Stops all running server processes, removes all `node_modules` folders, build caches (`.next`, `dist`), and the `pnpm-lock.yaml` file. |

### PNPM Commands

| Command           | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `pnpm install`    | Installs all dependencies across all packages in the workspace.             |
| `pnpm dev`        | Runs the main `web` dashboard application on `localhost:3000`.              |
| `pnpm dev:home`   | Runs the `home` landing page application on `localhost:3001`.               |
| `pnpm dev:admin`  | Runs the `admin` dashboard application on `localhost:3003`.                 |
| `pnpm dev:auth`   | Runs the `auth` service on port `3002`.                                     |
| `pnpm dev:backend`| Runs the `backend` API service on port `3004`.                              |
| `pnpm build`      | Builds all applications and packages for production.                        |
| `pnpm test:e2e`   | Runs all Playwright end-to-end tests.                                       |
| `pnpm seed`       | Populates your MongoDB database with initial data for development.          |
| `pnpm storybook`  | Starts the Storybook server for the `@amberops/ui` component library.         |


---

## 4. Development Workflow

### Step 1: Environment Configuration

Before running the application, you must configure your environment variables.

1.  **Create your local `.env` file**: At the root of the project, make a copy of the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  **Set Required Variables**: Open the new `.env` file and provide a valid `MONGODB_URI`. This is required for the application to connect to its database.
3.  **Set Optional Variables**: For features like social login (Google/GitHub) or AI-powered features (Gemini), you will need to provide the corresponding API keys and secrets in the `.env` file.

#### Environment Variable Details

| Variable                  | Description                                                                | Required? | Example                                         |
| ------------------------- | -------------------------------------------------------------------------- | --------- | ----------------------------------------------- |
| `MONGODB_URI`             | The connection string for your MongoDB database.                           | **Yes**   | `mongodb://localhost:27017/amberops`            |
| `JWT_SECRET`              | A secret key used for signing JSON Web Tokens for session management.      | **Yes**   | `your-very-secret-jwt-key`                      |
| `GOOGLE_CLIENT_ID`        | The client ID for Google OAuth 2.0.                                        | No        | `your-google-client-id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`    | The client secret for Google OAuth 2.0.                                    | No        | `GOCSPX-your-google-client-secret`              |
| `GITHUB_CLIENT_ID`        | The client ID for GitHub OAuth.                                            | No        | `your_github_client_id`                         |
| `GITHUB_CLIENT_SECRET`    | The client secret for GitHub OAuth.                                        | No        | `your_github_client_secret`                     |
| `GEMINI_API_KEY`          | Your API key for Google Gemini, used for all AI features.                  | No        | `your_gemini_api_key`                           |
| `AUTH_PORT`               | The port for the `auth` service. Defaults to `3002`.                       | No        | `3002`                                          |
| `BACKEND_PORT`            | The port for the `backend` service. Defaults to `3004`.                    | No        | `3004`                                          |

### Step 2: Database Seeding

With your environment configured, seed the database with initial data.

From the project root, run:
```bash
pnpm seed
```
A default admin account will be created with:
*   **Email**: `admin@amberops.com`
*   **Password**: `admin@amberops`

### Step 3: Running the Application Locally

Use this command to start all development servers simultaneously:
```bash
sh run.sh
```
The servers will be available at:
*   **Landing Page (`home`)**: `http://localhost:3001`
*   **Dashboard App (`web`)**: `http://localhost:3000`
*   **Admin App (`admin`)**: `http://localhost:3003`
*   **Auth Service (`auth`)**: Port `3002`
*   **Backend Service (`backend`)**: Port `3004`

---

## 5. Testing Strategy

*   **End-to-End (E2E) Testing**:
    *   **Tool**: **Playwright**.
    *   **Location**: `tests/` directory.
    *   **Purpose**: These tests simulate real user journeys across the applications, including the full authentication flow.

*   **Static Analysis & Linting**:
    *   **Tool**: **ESLint** and **Prettier**.
    *   **Purpose**: Enforce a consistent code style and catch common errors.

---

## 6. Deployment Guide (for DevOps)

Deploying this monorepo requires a platform that can handle multiple services.

### Build Process

1.  **Install Dependencies**: `pnpm install`
2.  **Build All Packages**: `pnpm build`
    *   This command runs the `build` script in every package, creating production-ready assets.

### Hosting Strategy

The multi-service architecture requires a hosting solution capable of running multiple Node.js applications and routing traffic accordingly (e.g., using Docker Compose, Kubernetes, or a platform like Vercel/Render with multiple services).

*   The frontend Next.js apps (`home`, `web`, `admin`) should be run as Node.js servers.
*   The backend services (`auth`, `backend`) must also be run as Node.js servers.
*   A reverse proxy (like Nginx) is typically used to route requests from a public domain to the correct internal service based on the path or subdomain.

### Environment Variables

All environment variables from the root `.env` file must be securely set in the production environment for all relevant services.
