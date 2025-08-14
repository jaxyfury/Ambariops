#!/bin/sh

# This script starts all development servers. It attempts to open new
# terminal windows for each service, but will fall back to running them
# in the background if it encounters an error.

set -e

# --- 1. Kill any running processes on the project ports ---
echo "--- Checking for and stopping any running services... ---"
sh ./kill-ports.sh
echo "--- Port check complete. ---"


# --- 2. Start Development Servers ---
OS=$(uname)
echo "Detected OS: $OS"

# Use a space-separated string for POSIX compliance
COMMANDS="dev:home dev:admin dev:auth dev:backend dev"

# Function to run a single command
run_cmd() {
  cmd="$1"
  current_dir=$(pwd)

  echo "Attempting to launch command: pnpm $cmd"

  if [ "$OS" = "Darwin" ]; then
    # For macOS, use osascript to open a new Terminal window
    osascript -e "tell application \"Terminal\" to do script \"cd '$current_dir' && pnpm $cmd\""
  
  elif [ "$OS" = "Linux" ]; then
    # For Linux, try common terminal emulators
    if command -v gnome-terminal >/dev/null 2>&1; then
      gnome-terminal -- bash -c "cd '$current_dir'; pnpm $cmd; exec bash" >/dev/null 2>&1 &
    elif command -v konsole >/dev/null 2>&1; then
      konsole --hold -e "bash -c \"cd '$current_dir' && pnpm $cmd\"" >/dev/null 2>&1 &
    elif command -v xterm >/dev/null 2>&1; then
      xterm -hold -e "cd '$current_dir' && pnpm $cmd" >/dev/null 2>&1 &
    else
      echo "⚠️ No supported terminal emulator found. Running 'pnpm $cmd' in the background..."
      (cd "$current_dir" && pnpm "$cmd") &
    fi
  
  elif echo "$OS" | grep -qE 'MINGW|CYGWIN|MSYS'; then
    # For Windows (Git Bash, etc.)
    start cmd.exe /c "cd /d '$current_dir' && pnpm $cmd"
  
  else
    echo "⚠️ Unsupported OS '$OS'. Running 'pnpm $cmd' in the background..."
    (cd "$current_dir" && pnpm "$cmd") &
  fi
}

echo "--- Starting all development servers ---"
echo "Home: http://localhost:3001"
echo "Web: http://localhost:3000"
echo "Admin: http://localhost:3003"
echo "Auth Service: Port 3002"
echo "Backend Service: Port 3004"
echo "----------------------------------------"

# Loop over the commands and execute them
for command in $COMMANDS; do
    run_cmd "$command"
    sleep 2 # Add a small delay between starting services
done

echo "✅ All service launch commands have been issued."
echo "If new terminals did not open, the services are running in the background of this window."
echo "You can manually stop them later by closing this terminal or using 'sh kill-ports.sh'."
