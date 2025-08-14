#!/bin/bash

# This script starts the development servers for all frontend applications
# and the standalone authentication and backend services.
# It assumes that 'sh build-workspace.sh' has been run at least once.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting all development servers ---"
echo "Home (Landing Page) will be available at http://localhost:3001"
echo "Web (Dashboard App) will be available at http://localhost:3000"
echo "Admin (Admin Dashboard) will be available at http://localhost:3003"
echo "Auth Service will be running on port 3002"
echo "Backend API Service will be running on port 3004"


# Start the home, admin, auth, and backend apps in the background
pnpm dev:home &
pnpm dev:admin &
pnpm dev:auth &
pnpm dev:backend &

# Start the web app (main dashboard) in the foreground
pnpm dev
