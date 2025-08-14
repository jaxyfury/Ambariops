#!/bin/bash

# This script starts the development servers for all frontend applications.
# It assumes that 'sh build-workspace.sh' has been run at least once.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting all development servers ---"
echo "Home (Landing Page) will be available at http://localhost:3001"
echo "Web (Dashboard App) will be available at http://localhost:3000"
echo "Admin (Admin Dashboard) will be available at http://localhost:3003"


# Start the home and admin apps in the background
pnpm dev:home &
pnpm dev:admin &

# Start the web app in the foreground
pnpm dev
