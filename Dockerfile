# Base image for building Node.js applications in the monorepo
# It includes pnpm for dependency management.
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# --- Dependencies Stage ---
# Install all dependencies for the entire workspace.
# This layer is cached and only re-run if dependencies change.
FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml .
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm fetch

# --- Backend Builder Stage ---
# This stage builds a specific backend service (e.g., auth or backend).
# It copies only the necessary source code and builds it.
FROM base AS backend-builder
ARG APP_NAME
WORKDIR /app
COPY --from=deps /app/pnpm-lock.yaml .
COPY package.json .
COPY tsconfig.base.json .
COPY apps/${APP_NAME}/ ./apps/${APP_NAME}/
COPY packages/lib/ ./packages/lib/
RUN pnpm install --filter ${APP_NAME}... --prod
RUN pnpm --filter ${APP_NAME} build

# --- Frontend Builder Stage ---
# This stage builds a specific Next.js frontend application.
FROM base AS frontend-builder
ARG APP_NAME
WORKDIR /app
COPY --from=deps /app/pnpm-lock.yaml .
COPY package.json .
COPY pnpm-workspace.yaml .
COPY tsconfig.base.json .
COPY next.config.ts .
COPY apps/${APP_NAME}/ ./apps/${APP_NAME}/
COPY packages/ ./packages/
RUN pnpm install --filter ${APP_NAME}...
RUN pnpm --filter ${APP_NAME} build

# =============================================
# --- Final Image for Backend Services ---
# =============================================
FROM base AS backend
ARG APP_NAME
ENV NODE_ENV production
WORKDIR /app

COPY --from=backend-builder /app/apps/${APP_NAME}/dist ./apps/${APP_NAME}/dist
COPY --from=backend-builder /app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/package.json .

EXPOSE 3000
CMD ["node", "apps/${APP_NAME}/dist/index.js"]


# =============================================
# --- Final Image for Frontend Apps ---
# =============================================
FROM base AS frontend
ARG APP_NAME
ENV NODE_ENV production
WORKDIR /app

COPY --from=frontend-builder /app/apps/${APP_NAME}/.next ./apps/${APP_NAME}/.next
COPY --from=frontend-builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public
COPY --from=frontend-builder /app/apps/${APP_NAME}/package.json ./apps/${APP_NAME}/package.json
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/package.json .

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]
