# AmberOps Web Application (Dashboard)

This is the main, protected Next.js application for the AmberOps Console. It contains all the core features for cluster management and is only accessible to authenticated users.

## In-Depth Overview

*   **Purpose**: This application serves as the primary tool for DevOps engineers and system administrators to monitor, manage, and troubleshoot their data clusters. It is designed as a feature-rich, highly interactive Single-Page Application (SPA).

*   **Technology**:
    *   **Framework**: Built with **Next.js** and the App Router.
    *   **State Management**: Uses **TanStack Query** for managing server state (caching, refetching API data) and **Zustand** or React Context for local UI state.
    *   **Authentication Backend**: Contains all the server-side API routes for **NextAuth.js** in `src/app/api/auth`. It handles session management and communication with authentication providers (Google, GitHub) and the MongoDB user database.

*   **Key Responsibilities**:
    *   **Displaying Data**: Renders all the main pages, including the Dashboard, Clusters, Services, Hosts, and Alerts lists.
    *   **User Interaction**: Handles all user actions, such as starting/stopping services, acknowledging alerts, and editing configurations.
    *   **AI Integration**: This app's client-side components make calls to the Genkit AI flows (defined in `packages/api`) to fetch and display AI-powered insights like health summaries and troubleshooting steps.
    *   **Security**: All pages within this application are protected and require a valid user session to be accessed. Unauthenticated users attempting to access any page will be redirected to the login page in the `apps/home` application.

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

For the complete user experience, including login and signup, you should also run the `home` application on its port (`http://localhost:3001`). You can start both applications simultaneously by running `sh run.sh` from the root directory.
