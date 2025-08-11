# AmberOps Console

This is the monorepo for the AmberOps Console, a modern, enterprise-grade frontend for managing operations, built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

This project uses a pnpm monorepo to manage the codebase. The structure is organized as follows:

```
/
├── .github/              # GitHub Actions workflows & templates
├── apps/
│   └── web/              # The main Next.js frontend application
├── packages/
│   ├── api/              # API layer: MSW mocks and client adapters
│   ├── design-tokens/    # Shared styling: globals.css, Tailwind theme
│   └── ui/               # Shared React components and Storybook
├── tests/                # E2E tests (Playwright)
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Root package.json and workspace config
├── pnpm-workspace.yaml   # pnpm workspace definition
└── tsconfig.base.json    # Base TypeScript configuration
```

### Key Packages:

-   **`apps/web`**: The main Next.js application that consumers will interact with. It contains all pages, app-specific components, and hooks.
-   **`packages/api`**: Handles all communication with the backend. It includes a mock API using Mock Service Worker (MSW) for development and a client adapter for real API calls.
-   **`packages/ui`**: A shared library of React components used across the application. It is also configured with Storybook for component development and documentation.
-   **`packages/design-tokens`**: Contains the core design system, including global CSS, Tailwind CSS configuration, and theme variables (colors, spacing, etc.).

## Getting Started

### Prerequisites

-   Node.js (v20.x or later)
-   pnpm

### Installation

1.  Clone the repository.
2.  Install dependencies from the root directory:
    ```bash
    pnpm install
    ```

### Development

To start the development server for the web app, run:

```bash
pnpm dev
```

This will start the Next.js application at `http://localhost:3000`.

### Other Scripts

-   `pnpm build`: Build the web app for production.
-   `pnpm lint`: Lint all code in the monorepo.
-   `pnpm format`: Format all code with Prettier.
-   `pnpm storybook`: Start the Storybook server for `packages/ui`.
-   `pnpm test`: Run all unit and integration tests.
-   `pnpm test:e2e`: Run Playwright end-to-end tests.
