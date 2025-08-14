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
  # Use lsof to find the PID, -t for terse output (PID only)
  # The || true prevents the script from exiting if no process is found
  PID=$(lsof -t -i:"$PORT" || true)
  if [ -n "$PID" ]; then
    echo "Found process with PID $PID on port $PORT. Killing it..."
    # Forcefully kill the process
    kill -9 "$PID"
    echo "Process on port $PORT killed."
    PIDS_KILLED=1
  else
    echo "No process found on port $PORT."
  fi
done

if [ "$PIDS_KILLED" -eq 1 ]; then
    echo "--- All running processes terminated. ---"
else
    echo "--- No running processes found on specified ports. ---"
fi
