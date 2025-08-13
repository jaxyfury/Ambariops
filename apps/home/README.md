# AmberOps Home & Authentication

This application serves as the public-facing landing page and the authentication entry point for the AmberOps Console.

## Overview

- **Purpose**: To provide a modern, responsive, and SEO-friendly landing page for AmberOps. It handles all user sign-up and login flows.
- **Technology**: Built with Next.js, React, and Tailwind CSS, and uses NextAuth.js for authentication.
- **Authentication**: It integrates with the NextAuth.js backend running in the main `web` application to handle user sessions. It supports email/password, Google, and GitHub logins.
- **Workflow**: After a user successfully signs up or logs in through this application, they are securely redirected to the main AmberOps dashboard running in the `web` app.

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev:home
```

The application will be available at `http://localhost:3001`.

Note that for the full authentication flow to work, the main `web` application must also be running on its port (`http://localhost:3000`), which can be started with `pnpm dev`.
