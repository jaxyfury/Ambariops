

## 1. Project overview

- Next.js (App Router) + TypeScript
- Tailwind CSS + Radix UI + Lucide icons for UI
- TanStack Query + Zustand for state management
- React Hook Form + Zod for forms
- Recharts for charts + chart adapter layer
- Storybook for UI component development + docs
- MSW (Mock Service Worker) for API-first mock dev
- Jest + React Testing Library for unit/integration tests
- Playwright for E2E tests and accessibility audits
- ESLint (Airbnb + TS + a11y), Prettier, Husky for linting/formatting/commit hygiene
- GitHub Actions CI/CD pipelines (PR checks, deploy previews, staging, production)
- react-i18next for internationalization with coverage checks
- Accessibility-first approach with ARIA, keyboard nav, and contrast compliance
- AI integration readiness (LLM hooks, telemetry) planned for future

---

## 2. Folder & monorepo structure

```

/amberops
├─ .github/                     # GitHub workflows + issue/PR templates
├─ apps/
│  ├─ web/                     # Next.js frontend app
│  │  ├─ src/
│  │  │  ├─ app/               # Next.js App Router pages/layouts
│  │  │  ├─ components/        # app-specific components
│  │  │  ├─ hooks/             # app-specific hooks
│  │  │  ├─ lib/               # utils, types, mock data specific to app
│  │  │  └─ styles/            # global styles, Tailwind overrides
│  │  ├─ public/               # static assets
│  │  ├─ next.config.ts
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
├─ packages/
│  ├─ ui/                      # shared React components + Storybook + tests
│  ├─ lib/                     # shared utilities, API client adapters, types
│  └─ design-tokens/           # colors, spacing, theme tokens, shared Tailwind config
├─ docs/                       # docs, ADRs, architecture diagrams
├─ infra/                      # optional deployment infra code (terraform, k8s)
├─ scripts/                    # helper scripts for dev & build
├─ package.json                # root workspace manifest
├─ pnpm-workspace.yaml         # or yarn workspaces config
├─ tsconfig.base.json          # base TS config for all packages/apps
├─ .eslintrc.json
├─ .prettierrc
├─ commitlint.config.js
└─ README.md

```

---

## 3. Code & style standards

- TypeScript strict mode enabled everywhere
- ESLint with Airbnb style, React and accessibility plugins
- Prettier formatting consistent across codebase
- BEM naming convention for CSS classes only inside `packages/ui` components where Tailwind utilities are insufficient
- Tailwind CSS used for layouts and common styling
- Components must be accessible (ARIA, keyboard nav)
- Conventional commit messages enforced with Husky pre-commit hooks and commitlint
- Clear PR template requiring description, linked tickets, testing steps, screenshots or Storybook links

---

## 4. Core features and pages (MVP)

- Layout: top nav, collapsible sidebar, breadcrumbs
- Dashboard: cluster health, quick actions with mock data
- Clusters list and detail views
- Services list and detail with config and action controls
- Hosts list and detail views
- Alerts and alert definitions UI
- Config editor with version history UI (mock)
- Tasks/Operations tracker UI
- Logs search and live tail (mock)
- Settings page (users, roles, integrations; mocked)
- Auth pages (mock) and branded 404/500 pages
- AI-powered features placeholders/hooks

---

## 5. API design & mocking

- Define a typed API adapter interface `AmbariClient` with method signatures
- Default implementation: `MockAmbariClient` using MSW + static realistic JSON mocks
- Real implementation: `HttpAmbariClient` calling `/api/v1/...` endpoints, handling auth, error handling, etc.
- Types shared in `packages/lib/types`

---

## 6. Testing strategy

- Unit and integration tests with Jest + React Testing Library covering components, hooks, utilities
- Storybook with accessibility testing via axe addon and visual snapshot tests
- Playwright E2E tests for critical user flows with accessibility audits
- CI runs all tests with coverage threshold enforcement

---

## 7. CI/CD workflows

- GitHub Actions configured with:
  - PR checks: install, lint, test, build, storybook build
  - Deploy previews to Vercel or Netlify on PRs
  - Main branch merges deploy to staging
  - Tagged releases deploy to production after approval
- Husky pre-commit hooks for lint/test/format

---

## 8. Internationalization

- Use react-i18next with JSON resource files
- Language switcher UI in main layout
- CI coverage check for translation completeness
- Support RTL layouts and fonts

---

## 9. Documentation & onboarding

- Comprehensive README explaining repo structure, setup, build, testing, deployment
- ADRs folder describing major architecture decisions
- CONTRIBUTING.md with coding standards, PR guidelines
- CODE_OF_CONDUCT.md
- Docs for adding Storybook components, tests, and running CI

---

## 10. Sprint roadmap example (8 two-week sprints)

- Sprint 0: repo setup, monorepo config, linting, Storybook baseline, design tokens
- Sprint 1: layout/shell, mock auth, clusters list UI, data fetching wiring
- Sprint 2: cluster details, service list/detail, basic charts
- Sprint 3: config editor with versioning UI, tasks tracker, logs page shell
- Sprint 4: alerts UI and definitions, search across entities
- Sprint 5: Storybook polish, accessibility fixes, Playwright smoke tests
- Sprint 6: One-click repair UI + mock workflow, guided templates
- Sprint 7: Ambari API real client + proxy config, E2E integration tests
- Sprint 8: hardening, i18n, performance tuning, docs, GA readiness

---

## 11. Deliverables (examples)

- Starter monorepo scaffold with configured lint, prettier, husky, CI/CD workflows
- Fully functional dashboard SPA with mock data and charts
- CI/CD GitHub Actions templates for PR checks and releases
- Architecture docs, ADRs, onboarding guides
- API adapter interface and mocking with MSW example

---

## 12. Clean up and restructure instructions

- Remove duplicate `src/` folders in root and `apps/web`
- Move shared components and hooks into `packages/ui` and `packages/lib`
- Consolidate config files to appropriate package/app roots or repo root
- Remove unnecessary folders like `.idx/` or `.modified`
- Ensure Storybook config matches new package locations
- Ensure Playwright tests are not duplicated and live in `/tests` or app scope
- Validate `.github` workflows point to correct paths in monorepo
- Update README with new structure and usage instructions

---

Please generate:

- A detailed step-by-step migration or cleanup plan
- Examples of key config files (`package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.eslintrc.json`, `.github/workflows/ci.yml`)
- A final clean folder tree example for `amberops` repo
- Sample README content explaining the repo layout and setup
- Sample GitHub Actions YAML for CI/CD

Thank you!
```

---