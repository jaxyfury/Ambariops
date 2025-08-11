
# 1 — Project summary & goals

**Project name:** AmberOps Console
**Vision:** Modern, maintainable React-based management console for Hadoop clusters (drop-in replacement for Ambari UI) with improved UX, one-step operations, automation, observability, and enterprise engineering practices.
**Primary goals (MVP):**

* Recreate Ambari core features (Clusters, Services, Hosts, Alerts, Configs, Tasks, Logs)
* Modern responsive UI (reddish-orange + white theme)
* Mock-first frontend; plug Ambari REST API later
* Enterprise-grade DX: ESLint (Airbnb), Prettier, Storybook, Playwright, CI/CD, i18n, a11y

# 2 — High-level architecture

* **Frontend**: Next.js (App Router) + TypeScript
* **UI library**: Tailwind CSS + Radix UI primitives + Lucide icons
* **State & data**: TanStack Query (server state), Zustand (local UI state)
* **Forms/validation**: React Hook Form + Zod
* **Charts/visuals**: Recharts + a small chart adapter layer
* **Component dev / docs**: Storybook (with Chromatic previews if desired)
* **Mocking**: MSW (Mock Service Worker) for API-first dev
* **Testing**: Jest + React Testing Library (unit), Playwright (E2E)
* **Lint/format**: ESLint (Airbnb + TS rules) + Prettier
* **CI/CD**: GitHub Actions (PR checks → preview deploys → staging → prod)
* **Deploy**: Vercel (frontend). Option to host static build in Ambari server later.
* **Observability**: Sentry (errors), Datadog/Prometheus (optional metrics), Log aggregation for UI telemetry.
* **i18n**: react-i18next with i18n JSON bundles and CI checks for coverage.
* **AI integrations** (future): backend microservice or serverless function to call LLMs for suggestions, repair workflows, and natural language search.

# 3 — Core modules / pages (MVP)

* Layout / Shell (Top nav, collapsible left nav, breadcrumbs)
* Dashboard (cluster health + quick actions)
* Clusters List → Cluster Detail
* Services List → Service Detail (configs, actions)
* Hosts List → Host Detail
* Alerts & Alert Definitions
* Configurations (edit + versioning)
* Tasks / Operations (task tracker)
* Logs / Log Search (integrated if Logsearch available)
* Settings (users, auth, integrations)
* Guided Tasks / Templates (one-step flows)
* Auth pages & custom 404/500

# 4 — Feature mapping (Existing Ambari vs AmberOps + New)

(Condensed — each item will have acceptance criteria in product tickets)

**Must replicate (Ambari baseline)**

* Cluster health, services start/stop/restart, host management, config edit + rollback, user RBAC, task tracking, alerting, quick links.

**New / Improved features**

* One-Click Repair (diagnostics + single-button fix)
* Guided Templates & Onboarding Wizard
* Unified troubleshooting view (alerts + correlated logs + metrics)
* Workflow automation & scheduler (save/run/reuse)
* Role-based contextual UX & streamlined operator flows
* Export reports (CSV/PDF), webhooks, API keys
* Multi-language & accessibility-first UI
* Live collaboration (share snapshots, comments) — v2

# 5 — Codebase structure (recommended)

```
/amberops
├─ .github/
│  ├─ workflows/                # CI / CD
│  ├─ ISSUE_TEMPLATE/
│  └─ PULL_REQUEST_TEMPLATE.md
├─ apps/
│  ├─ web/                      # Next.js app (frontend)
│  └─ admin-api/ (optional)     # small server-side proxy if needed
├─ packages/
│  ├─ ui/                       # shared React components + storybook
│  ├─ lib/                      # utilities, api client, types
│  └─ design-tokens/            # theme tokens (tailwind config, tokens)
├─ infra/                       # deployment infra (k8s/terraform) optional
├─ docs/                        # architecture, ADRs, onboarding
├─ scripts/                     # dev helpers
└─ README.md
```

Notes:

* Monorepo (pnpm/workspaces) recommended for large team: shared components, tokens, and types live in `packages/`.
* Keep `apps/web` as the Next.js app; `packages/ui` is Storybook-first component library.

# 6 — Development standards & tooling

* **TypeScript strict mode** (`"strict": true`, `noImplicitAny` etc.)
* **ESLint**: Airbnb + `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@typescript-eslint`.
* **Prettier** with single, agreed style (integrated with ESLint via `eslint-config-prettier`).
* **CSS**: Tailwind + small utility classes, use BEM for any non-utility classes in `packages/ui` components only. Use CSS variables for theme tokens.
* **Naming**: BEM for component wrapper classes (`.cmp-foo__bar--active`) but prefer Tailwind for layout; BEM only where custom CSS is required.
* **Commits**: Conventional Commits (`feat:, fix:, chore:`) enforced via commitlint + husky pre-commit hooks.
* **PRs**: Require description, linked ticket, testing steps, screenshot/Storybook link.

# 7 — Storybook & Component strategy

* Storybook lives in `packages/ui` and is the single source of truth for components.
* Stories for all core components + accessibility checks (axe).
* Publish Storybook as static site on PR/branch previews (Chromatic or Netlify previews).
* Component guidelines: small, focused, accessible, well-documented props and use-cases.

# 8 — Mocking & API design (API-first)

* Implement `src/api/ambariClient.ts` with an adapter interface:

  ```ts
  interface AmbariClient {
    getClusters(): Promise<ClustersResponse>;
    getServices(cluster: string): Promise<Service[]>;
    startService(cluster:string, service:string): Promise<RequestResponse>;
    // ...
  }
  ```
* Default implementation: `MockAmbariClient` using MSW + static JSON.
* Real implementation: `HttpAmbariClient` that calls `/api/v1/...` and handles auth.
* Keep contracts (types) in `packages/lib/types` to share across apps.

# 9 — CI/CD design (GitHub Actions)

**PR workflow**

* `on: pull_request` → run:

  * `pnpm install`
  * `pnpm lint`
  * `pnpm test` (unit)
  * `pnpm build` (preview)
  * `pnpm storybook:build` (optional)
  * `playwright test` (smoke) — heavy E2E on nightly
* Deploy preview: `on: pull_request` post successful checks → deploy to Vercel/Netlify preview or create a GitHub Pages storybook.

**Main -> Staging -> Prod**

* `main` merged → deploy to `staging` automatically
* Release: tag `vX.Y.Z` → GH Action builds release artifacts and deploys to `production` after approval
* Semantic-release for automated changelog (optional)

I can produce sample GitHub Actions YAMLs for PR lint/build/test and for release if you want.

# 10 — Testing strategy

* **Unit**: Jest + Testing Library for components (coverage threshold: 80% global).
* **Integration**: component + data-layer tests; TanStack Query behavior mocked.
* **Visual regression**: Storybook snapshots + Chromatic or Playwright visual comparisons.
* **E2E**: Playwright suites for core flows (auth, cluster list, start service, config edit, tasks)

  * Run full E2E on `staging` (post-merge) and a smaller smoke set on PRs.
* **Accessibility**: axe on Storybook + Playwright accessibility audits.

# 11 — Security & auth

* For MVP: mock auth + role-based UI variations.
* When integrating Ambari:

  * Support Basic Auth, Kerberos (via server-side proxy), and OAuth/OIDC (SAML later).
  * Do not store raw passwords in frontend; use token exchange via server-side proxy if Kerberos/OAuth needed.
  * HTTPS enforced; CSP headers and sameSite cookies.
  * Audit logging for critical actions.
  * Scan dependencies (GitHub Dependabot).

# 12 — Integration with Ambari (step-by-step)

1. Finish mock-first frontend; ensure API adapter abstraction.
2. Build `HttpAmbariClient` implementing the adapter with auth handling.
3. Choose integration mode:

   * **Proxy mode**: small server (Express) to set Kerberos cookies and forward requests. Good for Kerberos.
   * **CORS mode**: Configure Ambari server CORS and call API directly from client (works with basic auth).
4. Map payloads exactly (Ambari `RequestInfo` structure) and create request wrapper for long-running operations with polling for task status.
5. Add config option for `AMBARI_BASE_URL` and runtime feature flags.
6. Run full E2E against a staging Ambari cluster.

# 13 — Observability & monitoring

* Client-side errors: Sentry with release tagging.
* UI telemetry: track user flows (opt-in) with lightweight telemetry (Mixpanel/Amplitude).
* CI metrics: build/test times, flakiness dashboards.
* Production logs: capture UI request failures and long API latencies.

# 14 — Internationalization & accessibility

* `react-i18next` with JSON resource files per namespace.
* CI check to ensure keys coverage for supported languages.
* Fonts & layout to support RTL.
* WCAG 2.1 AA target: keyboard navigation, color contrast, ARIA attributes.

# 15 — Developer onboarding & docs

* `docs/` contains:

  * README + local dev setup (one-liners)
  * Architecture overview diagram (component boundaries)
  * Coding conventions & ESLint/Prettier rules
  * PR & branching strategy
  * Local Ambari mock startup guide
  * How to add a Storybook component
  * How to write Playwright tests
* `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `ADR/` for decisions

# 16 — Release & maintenance plan

* **Release cadence**:

  * Weekly internal builds
  * Monthly minor releases (feature improvements)
  * Quarterly major releases (breaking changes, API mapping)
* **Support policy**:

  * LTS branch for enterprise (patch-only) for a defined period (e.g., 6 months)
* **Changelog**: semantic-release to auto-generate changelogs from commits

# 17 — Sprint roadmap (8 sprints, 2 weeks each) — example

Sprint 0 (1 week): repo bootstrap, monorepo setup, eslint/prettier husky, CI skeleton, Storybook baseline, design tokens.
Sprint 1: Layout & shell, auth mock, clusters list page (mock data), TanStack Query wiring.
Sprint 2: Cluster detail, service list, basic charts (mock), hosts list.
Sprint 3: Config editor w/ version history (mock), tasks tracker UI, logs page skeleton.
Sprint 4: Alerts system UI, alert definitions editor, search across entities.
Sprint 5: Storybook polish + accessibility fixes, Playwright smoke tests, preview deploys.
Sprint 6: One-Click Repair prototype (UI + mock workflow), templates.
Sprint 7: Ambari integration (HTTP client + proxy config), end-to-end integration tests.
Sprint 8: Hardening, performance, i18n initial, docs, GA readiness.

# 18 — Deliverables I can provide immediately

Tell me which one you want first and I’ll build it now:

1. Starter monorepo scaffold (Next.js app + packages/ui + MSW + Storybook + ESLint/Prettier + GitHub Actions skeleton).
2. Complete Dashboard SPA mock (React + TypeScript + Tailwind) with mock data, charts, services table + Storybook stories.
3. CI/CD templates (GitHub Actions) for PR checks + release flow + Playwright setup.
4. ADRs, architecture diagram, and `docs/` onboarding pack.
5. Sample `AmbariClient` adapter with mocking + `HttpAmbariClient` stub.

# 19 — Risks & mitigation

* **Ambari API differences across versions** — mitigate by keeping adapter layer and writing contract tests against a real Ambari staging instance.
* **Kerberos integration complexity** — mitigate via server-side proxy abstraction.
* **Large design scope vs time** — use MVP-first prioritized features, ship iteratively.

---
