# AmberOps Console: UI and Functional Improvement Plan

## 1. Introduction

This document outlines a comprehensive plan for enhancing the AmberOps Console frontend. The goal is to elevate the application to an enterprise-grade standard by focusing on a fully responsive user interface, robust state management, complete test coverage, and first-class accessibility.

---

## 2. UI Improvements

### Global Search Bar

-   **Header Integration**: A universal search bar is integrated into the application header for quick access from any page.
-   **Modal-based Results**: Search triggers a modal dialog that displays categorized results for clusters, services, and hosts.
-   **Keyboard Shortcut**: The search can be activated via a `⌘K` keyboard shortcut for power users.

### Responsive and Collapsible Sidebar

-   **Desktop View**: The sidebar is collapsible, allowing users to expand it for full navigation with labels or collapse it to an icon-only rail to maximize content space. The state is persisted across sessions.
-   **Mobile View**: On smaller viewports, the sidebar transforms into an off-canvas drawer, ensuring an uncluttered and intuitive mobile experience.
-   **Icons**: All navigation items feature clear, intuitive icons from the `lucide-react` library.

### Sticky, Accessible Header

-   A sticky header remains visible at all times, providing persistent access to global controls.
-   The header contains:
    -   A **Language Switcher** for internationalization.
    -   A **Theme Toggler** for light/dark mode.
    -   A **User Menu** with links to settings and logout actions.

### Professional Loaders and Indicators

-   **Skeleton Loaders**: All data-fetching views display animated, professional skeleton loaders that mimic the layout of the content being loaded. This provides a better perceived performance and reduces layout shift.
-   **Progress Indicators**: Long-running actions (e.g., service restarts) use progress bars or spinners to give users clear feedback on background tasks.

---

## 3. Future Enhancements

### User Onboarding Tour
- **Goal**: Create an interactive, guided walkthrough for new users to introduce them to core functionalities like the dashboard, cluster details, and alert management.
- **Recommendation**: Use a library like `react-joyride` to build a step-by-step tour that highlights key UI elements.

### Customizable Dashboards
- **Goal**: Empower users to create personalized dashboards by adding, removing, and rearranging widgets.
- **Recommendation**: Implement a drag-and-drop grid system using a library like `react-grid-layout`. User dashboard configurations should be saved to the backend.


### Complete Storybook Documentation

-   Every component in the `packages/ui` library will have a corresponding Storybook story.
-   Stories will include interactive controls (via `argTypes`) to allow developers and designers to test all component variants and states.

### Integrated Storybook Testing

-   **Accessibility Addon**: The `@storybook/addon-a11y` is integrated to run automated accessibility checks on every story.
-   **Playwright Addon**: The Storybook Playwright addon can be used to test component interactions directly within the Storybook environment.

---

## 4. Data and API Handling

### Centralized Mock Data

-   To ensure UI components are data-agnostic, all static and hardcoded data is centralized in `packages/api/src/mocks/mock-data.ts`.

### TanStack Query for API Operations

-   All API interactions (CRUD operations) are managed by TanStack Query (`@tanstack/react-query`).
-   Queries and mutations are organized into a dedicated services layer (`apps/web/src/lib/api/services.ts`), providing a clean, reusable, and maintainable data-fetching layer.

### User-Friendly Toast Notifications

-   Toast notifications (powered by `react-hot-toast`) are used for providing feedback on user actions.
-   Notifications are context-aware (success, error, info).

---

## 5. Accessibility and Testing

### Comprehensive Test IDs and ARIA

-   All interactive elements and key containers are assigned a stable `data-testid` attribute to facilitate robust and non-brittle E2E tests with Playwright.
-   Semantic HTML and proper ARIA roles (e.g., `role`, `aria-label`, `aria-describedby`) are used throughout the application.

### WCAG Compliance

-   The goal is to maintain 100% compliance with WCAG 2.1 AA guidelines. This includes color contrast, keyboard navigation, focus management, and semantic structure.

### End-to-End Testing with Playwright

-   A comprehensive suite of E2E tests has been written to cover all critical user flows, including navigation, CRUD actions, and theme toggling.
