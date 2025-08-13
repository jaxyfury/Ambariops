# AmberOps Home & Authentication Application

This application is the public-facing entry point for the AmberOps Console. It serves two primary functions: acting as a modern, responsive landing page and handling all user authentication flows.

## In-Depth Overview

*   **Purpose**: This app is designed to attract new users and provide a seamless and secure way for existing users to sign in. It is completely separate from the core dashboard application (`apps/web`) to ensure that the public-facing site can be optimized for performance and SEO without being burdened by the complexities of the main application.

*   **Technology**:
    *   **Framework**: Built with **Next.js** and the App Router.
    *   **Styling**: Uses **Tailwind CSS** and consumes the shared theme from `packages/design-tokens` for a consistent look and feel.
    *   **Components**: Leverages the reusable component library from `packages/ui` for elements like buttons and cards.

*   **Authentication Flow**:
    1.  A user visits the landing page and decides to either sign up for a new account or log in.
    2.  They are directed to the `/signup` or `/login` pages within this application.
    3.  This app's UI captures their credentials or initiates an OAuth flow (Google/GitHub).
    4.  The authentication request is sent to the NextAuth.js backend API, which is located in the **`apps/web`** application.
    5.  Upon successful authentication, the `apps/web` backend establishes a session, and the `home` app then securely redirects the user to the main AmberOps dashboard at `http://localhost:3000/dashboard`.

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev:home
```

The application will be available at `http://localhost:3001`.

Note that for the full authentication flow to work correctly, the main `web` application (which contains the NextAuth.js backend) must also be running on its port (`http://localhost:3000`). You can start both applications simultaneously by running `sh run.sh` from the root directory.
