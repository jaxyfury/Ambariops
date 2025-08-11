#!/bin/bash

# This script installs all dependencies using pnpm and then starts the
# development server for the web application.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Installing dependencies (pnpm) ---"
pnpm install

echo "--- Starting the development server ---"
echo "Application will be available at http://localhost:3000"
pnpm dev
