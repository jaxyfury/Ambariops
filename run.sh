#!/bin/bash

# This script starts the development servers for both the web and home applications.
# It assumes that 'sh build-workspace.sh' has been run at least once.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting all development servers ---"
echo "Home (Landing Page) will be available at http://localhost:3001"
echo "Web (Dashboard App) will be available at http://localhost:3000"

# Start the home app in the background
pnpm dev:home &

# Start the web app in the foreground
pnpm dev
