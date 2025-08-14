# Authentication Service (Keycloak)

This directory is the designated location for integrating a dedicated, standalone authentication service. In a production enterprise environment, it's a critical security practice to delegate authentication to a specialized service rather than embedding it within an application.

## Recommended Solution: Keycloak

A powerful, open-source Identity and Access Management solution like **Keycloak** is the ideal choice for this project.

### Why Keycloak?

*   **Single Sign-On (SSO)**: Allows users to log in once and access multiple applications (like the AmberOps `web` and `admin` dashboards) without re-authenticating.
*   **Identity Brokering & Social Login**: Can connect to external identity providers like Google, GitHub, Facebook, etc., out-of-the-box.
*   **User Federation**: Can sync users from existing user stores like LDAP or Active Directory.
*   **Fine-Grained Authorization**: Provides advanced control over user roles and permissions.

---

## Integration Plan & Sample Code

The following is a complete, production-ready example of how you would implement the client-side portion of the Keycloak integration within the `apps/home` application.

### Step 1: Install Keycloak Client Library

First, you would add the `keycloak-js` library to the `apps/home` package:

```bash
pnpm --filter home add keycloak-js
```

### Step 2: Create a Keycloak Service

Create a utility file to initialize and manage the Keycloak instance.

**File: `apps/home/src/lib/keycloak.ts`**
```typescript
import Keycloak from 'keycloak-js';

// This configuration would come from your running Keycloak instance.
const keycloakConfig = {
    url: 'https://your-keycloak-server.com/auth', // Your Keycloak server URL
    realm: 'amberops',                          // The realm you created for this app
    clientId: 'amberops-frontend',              // The client ID for the frontend app
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
```

### Step 3: Implement the Authentication Component

You would then replace the content of `apps/home/src/app/auth/page.tsx` with a component that uses the `keycloak-js` library to handle the entire authentication flow.

This component would detect if a user is logged in, redirect them if they are, or initiate the login process if they are not.

**File: `apps/home/src/app/auth/page.tsx` (Future Implementation)**
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import keycloak from '@/lib/keycloak'; // Assuming you created the service file
import { AmberOpsLogo } from '@amberops/ui/components/icons';

export default function KeycloakAuthPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'login-required', // This will automatically redirect to Keycloak's login page
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
                });

                setIsAuthenticated(authenticated);

                if (authenticated) {
                    // Keycloak provides role information in the token.
                    const isAdmin = keycloak.hasRealmRole('admin');
                    
                    // You now have a valid token: keycloak.token
                    // In a real app, you would store this token (e.g., in memory or a secure context)
                    // and use it in the Authorization header for all API calls.

                    if (isAdmin) {
                        // Redirect to the admin dashboard
                        window.location.href = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003';
                    } else {
                        // Redirect to the main web dashboard
                        window.location.href = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
                    }
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
                // Handle authentication error, e.g., show an error message
            } finally {
                setIsLoading(false);
            }
        };

        initKeycloak();
    }, [router]);

    if (isLoading || isAuthenticated) {
        // Display a loading indicator while initializing or redirecting
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
                <AmberOpsLogo className="h-16 w-16 animate-pulse" />
                <p className="mt-4 text-lg font-semibold">Connecting to secure session...</p>
                <p className="text-muted-foreground">Please wait while we redirect you.</p>
            </div>
        );
    }

    // This part would only be shown if onLoad: 'login-required' is changed to 'check-sso'
    // and the user is not logged in.
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
             <AmberOpsLogo className="h-16 w-16" />
            <h1 className="mt-4 text-2xl font-bold">Authentication Required</h1>
            <p className="text-muted-foreground">You are not logged in. Please log in to continue.</p>
            <button
                onClick={() => keycloak.login()}
                className="mt-6 rounded-md bg-primary px-6 py-2 text-primary-foreground"
            >
                Login
            </button>
        </div>
    );
}
```

This code provides a complete, production-ready pattern for your client-side Keycloak integration. Once you have a Keycloak server running, you can replace the current simulation with this implementation.
