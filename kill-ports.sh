#!/bin/sh

# This script finds and kills any processes running on the
# standard AmberOps Console development ports.

set -e

echo "--- Stopping any running development servers ---"

# Use a space-separated string for POSIX compliance
PORTS="3000 3001 3002 3003 3004"
PIDS_KILLED=0

for PORT in $PORTS; do
  echo "Checking for process on port $PORT..."
  # Use a more robust command to find and kill the process.
  # The `|| true` prevents the script from exiting if no process is found.
  kill $(lsof -t -i:$PORT) >/dev/null 2>&1 || true
  
  # A small delay to allow the OS to release the port
  sleep 0.1 

  # Re-check to confirm
  if ! lsof -t -i:$PORT >/dev/null 2>&1; then
    echo "No process found on port $PORT."
  else
    echo "⚠️ Failed to kill process on port $PORT. Trying again with SIGKILL."
    kill -9 $(lsof -t -i:$PORT) >/dev/null 2>&1 || true
    PIDS_KILLED=1
  fi
done

echo "--- Port check complete. ---"
