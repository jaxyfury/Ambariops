#!/bin/sh

# This script starts all development servers. It attempts to open new
# terminal windows for each service, but will fall back to running them
# in the background if it encounters an error.

set -e

# --- 1. Kill any running processes on the project ports ---
echo "--- Checking for and stopping any running services... ---"
sh kill-ports.sh
echo "--- Port check complete. ---"


# --- 2. Start Development Servers ---
OS=$(uname)
echo "Detected OS: $OS"

COMMANDS=(
  "pnpm dev:home"
  "pnpm dev:admin"
  "pnpm dev:auth"
  "pnpm dev:backend"
  "pnpm dev"
)

run_cmd() {
  cmd="$1"
  current_dir=$(pwd)

  echo "Attempting to launch command: $cmd"

  if [ "$OS" = "Darwin" ]; then
    osascript -e "tell application \"Terminal\" to do script \"cd '$current_dir' && $cmd\""
  
  elif [ "$OS" = "Linux" ]; then
    if command -v gnome-terminal >/dev/null 2>&1; then
      # The '&' at the end runs the command in the background
      gnome-terminal -- bash -c "cd '$current_dir'; $cmd; exec bash" &
    elif command -v konsole >/dev/null 2>&1;
      konsole --hold -e "bash -c \"cd '$current_dir' && $cmd\"" &
    elif command -v xterm >/dev/null 2>&1;
      xterm -hold -e "cd '$current_dir' && $cmd" &
    else
      echo "⚠️ No supported terminal emulator found. Running in background..."
      (cd '$current_dir' && eval "$cmd") &
    fi
  
  elif echo "$OS" | grep -qE 'MINGW|CYGWIN|MSYS'; then
    start cmd.exe /c "cd /d '$current_dir' && $cmd"
  
  else
    echo "⚠️ Unsupported OS '$OS'. Running in background..."
    (cd "$current_dir" && eval "$cmd") &
  fi
}

echo "--- Starting all development servers ---"
echo "Home: http://localhost:3001"
echo "Web: http://localhost:3000"
echo "Admin: http://localhost:3003"
echo "Auth Service: Port 3002"
echo "Backend Service: Port 3004"
echo "----------------------------------------"

for command in "${COMMANDS[@]}"; do
    run_cmd "$command"
    sleep 2 # Add a small delay between starting services
done

echo "✅ All service launch commands have been issued."
echo "If new terminals did not open, the services are running in the background."
echo "You can manually stop them later by running 'sh kill-ports.sh'."
