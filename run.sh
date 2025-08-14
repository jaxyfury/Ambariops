#!/bin/bash

# This script starts the development servers for all frontend applications
# and the standalone authentication service.
# It assumes that 'sh build-workspace.sh' has been run at least once.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting all development servers ---"
echo "Home (Landing Page) will be available at http://localhost:3001"
echo "Web (Dashboard App) will be available at http://localhost:3000"
echo "Admin (Admin Dashboard) will be available at http://localhost:3003"
echo "Auth (Authentication Service) will be running on port 3002"


# Start the home, admin, and auth apps in the background
pnpm dev:home &
pnpm dev:admin &
pnpm dev:auth &

# Start the web app in the foreground
pnpm dev
