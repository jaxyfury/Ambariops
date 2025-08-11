#!/bin/bash

# This script starts the development server for the web application.
# It assumes that 'sh build-workspace.sh' has been run at least once.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting the development server ---"
echo "Application will be available at http://localhost:3000"

# Start the Next.js development server
pnpm dev
