#!/bin/sh

# This script finds and kills any processes running on the
# standard AmberOps Console development ports using the `fuser` command,
# which is generally more reliable for this task than `lsof | kill`.

set -e

echo "--- Stopping any running development servers ---"

PORTS="3000 3001 3002 3003 3004"
FOUND_PROCESS=0

for PORT in $PORTS; do
  echo "Checking for process on port $PORT..."
  # Use `fuser` to find and kill the process on the TCP port.
  # The `-k` option sends SIGKILL.
  # The `|| true` prevents the script from exiting if fuser fails (e.g., no process found).
  if fuser -k -n tcp "$PORT" >/dev/null 2>&1; then
    echo "Process on port $PORT found and terminated."
    FOUND_PROCESS=1
    # Give the OS a moment to release the port
    sleep 0.5
  else
    echo "No process found on port $PORT."
  fi
done

if [ "$FOUND_PROCESS" -eq 1 ]; then
    echo "--- All running processes terminated. ---"
else
    echo "--- No running processes were found on the specified ports. ---"
fi
