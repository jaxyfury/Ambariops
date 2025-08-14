# Authentication Service Placeholder

This directory is a placeholder for a dedicated, standalone authentication service.

In a production enterprise environment, it's a common and recommended practice to delegate authentication and identity management to a specialized service rather than embedding it within an application. This provides better security, scalability, and centralization of user management.

## Recommended Solution: Keycloak

A powerful, open-source Identity and Access Management solution like **Keycloak** would be an ideal fit here.

### Why Keycloak?

*   **Single Sign-On (SSO)**: Allows users to log in once and access multiple applications (like the AmberOps `web` and `admin` dashboards) without re-authenticating.
*   **Identity Brokering**: Can connect to external identity providers like Google, GitHub, LDAP, or Active Directory.
*   **User Federation**: Can sync users from existing user stores.
*   **Fine-Grained Authorization**: Provides advanced control over user roles and permissions.

### Integration Plan

1.  **Deploy Keycloak**: Set up a Keycloak instance (e.g., in a Docker container or on a dedicated server).
2.  **Configure a Realm**: Create a new "realm" in Keycloak for the AmberOps Console.
3.  **Define Clients**:
    *   Create a client for the `home` app to initiate logins.
    *   Create clients for the `web` and `admin` apps, configured as confidential clients that require a valid access token to be accessed.
4.  **Update Frontend Apps**:
    *   The `home` app's login button would redirect to the Keycloak login page.
    *   After a successful login, Keycloak would redirect the user back to the appropriate application (`web` or `admin`) with a JSON Web Token (JWT).
    *   The frontend applications would then use this JWT in the `Authorization` header of all API calls to the backend.
5.  **Update Backend**: The Java backend would be configured to validate the incoming JWT against Keycloak's public keys on every API request, ensuring that the request is authentic and authorized.
