# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations.

## Project Structure

This project is a monorepo managed by `pnpm` workspaces.

- `apps/web`: The main Next.js frontend application.
- `packages/api`: Contains the API client adapter and MSW (Mock Service Worker) mocks.
- `packages/design-tokens`: Holds all design tokens, including theme colors, spacing, and the shared Tailwind CSS configuration.
- `packages/lib`: Shared utilities, types, and other library functions.
- `packages/ui`: Contains all shared React components and their Storybook stories.
- `tests/`: End-to-end tests using Playwright.

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Run Storybook:**
   ```bash
   pnpm storybook
   ```

## Available Scripts

- `pnpm dev`: Starts the Next.js development server.
- `pnpm build`: Builds all packages and the web app for production.
- `pnpm lint`: Lints all code in the repository.
- `pnpm test`: Runs all unit and integration tests.
- `pnpm test:e2e`: Runs all Playwright E2E tests.
- `pnpm storybook`: Starts the Storybook server for UI component development.
