
# Stage 1: Base image for installing dependencies
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Stage 3: Build the applications
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 4: Production runner
FROM base AS runner
WORKDIR /app

# Copy environment variables and scripts
COPY .env ./
COPY run-docker.sh ./
RUN chmod +x ./run-docker.sh

# Copy built applications and necessary files from the builder stage
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

COPY --from=builder /app/apps/home/.next ./apps/home/.next
COPY --from=builder /app/apps/home/public ./apps/home/public
COPY --from=builder /app/apps/home/package.json ./apps/home/package.json

# Copy production node_modules
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
EXPOSE 3001

# This script will start both Next.js servers
CMD ["./run-docker.sh"]
