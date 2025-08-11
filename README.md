
# AmberOps Console

This repository contains the source code for the AmberOps Console, a modern, maintainable, and scalable frontend for managing Hadoop clusters, built to replace the legacy Ambari UI.

## Project Vision

The vision is to create a drop-in replacement for the Ambari UI with an improved user experience, one-step operations, workflow automation, enhanced observability, and enterprise-grade engineering practices.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN
- **State Management**: TanStack Query & Zustand
- **Mocking**: Mock Service Worker (MSW)
- **Testing**: Jest, React Testing Library, and Playwright
- **Component Docs**: Storybook
- **Code Quality**: ESLint, Prettier, Husky, commitlint

## Monorepo Structure

This project uses a `pnpm` workspace-based monorepo structure.

- `apps/web`: The main Next.js frontend application. All pages, app-specific components, and business logic reside here.
- `packages/api`: Contains the API adapter layer, including types, data fetching hooks (TanStack Query), and MSW mock handlers. This package is responsible for all communication with the backend.
- `packages/ui`: A shared library of reusable React components, each with its own Storybook stories for isolated development and testing.
- `packages/design-tokens`: Holds all shared styling constants, including theme colors (CSS variables) and the base Tailwind CSS configuration.
- `tests/`: Contains all Playwright end-to-end tests for comprehensive testing of user flows.

## Getting Started

### Prerequisites

- Node.js (v20.x or later)
- pnpm (v9.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/amberops-console.git
   ```
2. Install dependencies from the root directory:
   ```bash
   pnpm install
   ```

### Running the Development Server

To start the Next.js development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Development Workflows

- **Linting**: `pnpm lint`
- **Type Checking**: `pnpm typecheck`
- **Running Storybook**: `pnpm storybook`
- **Running E2E Tests**: `pnpm test:e2e`

## Contribution Guidelines

- **Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is enforced by `commitlint`.
- **Branches**: Create feature branches from `main`.
- **Pull Requests**: All PRs must pass CI checks (linting, testing, building) and receive at least one approval before being merged.
