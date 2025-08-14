#!/bin/sh

# This script cleans the entire workspace by removing all generated
# artifacts, caches, and installed dependencies. It's useful for
# starting from a completely clean state before a fresh build.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting workspace cleanup ---"

# 1. Kill any running processes on the project ports
echo "--- Stopping any running development servers ---"
# Use a space-separated string for POSIX compliance
PORTS="3000 3001 3002 3003 3004"
for PORT in $PORTS; do
  echo "Checking for process on port $PORT..."
  # Use lsof to find the PID, -t for terse output (PID only)
  # The || true prevents the script from exiting if no process is found
  PID=$(lsof -t -i:$PORT || true)
  if [ -n "$PID" ]; then
    echo "Found process with PID $PID on port $PORT. Killing it..."
    # Forcefully kill the process
    kill -9 "$PID"
    echo "Process on port $PORT killed."
  else
    echo "No process found on port $PORT."
  fi
done

# 2. Remove all node_modules directories
echo "--- Removing all node_modules directories ---"
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# 3. Remove all .next build cache directories
echo "--- Removing all .next build caches ---"
find ./apps -name ".next" -type d -prune -exec rm -rf '{}' +

# 4. Remove all dist build output directories
echo "--- Removing all dist build outputs ---"
find ./apps -name "dist" -type d -prune -exec rm -rf '{}' +
find ./packages -name "dist" -type d -prune -exec rm -rf '{}' +

# 5. Remove the root lockfile
if [ -f "pnpm-lock.yaml" ]; then
  echo "--- Removing pnpm-lock.yaml ---"
  rm -f pnpm-lock.yaml
fi

# 6. Remove test reports and other cache folders
echo "--- Removing test reports and Storybook cache ---"
rm -rf playwright-report/
rm -rf storybook-static/

echo "--- Workspace cleanup complete! ---"
echo "You can now run 'sh build-workspace.sh' for a fresh setup."
