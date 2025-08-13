#!/bin/sh
set -e

# Start the home app (port 3001) in the background
echo "Starting AmberOps Home App on port 3001..."
pnpm --filter home start -p 3001 &

# Start the web app (port 3000) in the foreground
echo "Starting AmberOps Web App on port 3000..."
pnpm --filter web start -p 3000
