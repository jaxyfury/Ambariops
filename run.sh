#!/bin/sh

# This script starts all development servers. It attempts to open new
# terminal windows for each service, but will fall back to running them
# in the background if it encounters an error.

set -e

# Detect OS
OS=$(uname)
echo "Detected OS: $OS"

# Commands to run, as a space-separated string for POSIX compliance.
COMMANDS="pnpm dev:home;pnpm dev:admin;pnpm dev:auth;pnpm dev:backend;pnpm dev"

# Function to run a command in a new terminal tab/window
run_cmd() {
  cmd="$1"
  current_dir=$(pwd)

  echo "Attempting to launch command: $cmd"

  if [ "$OS" = "Darwin" ]; then
    # macOS
    osascript -e "tell application \"Terminal\" to do script \"cd '$current_dir' && $cmd\""
  
  elif [ "$OS" = "Linux" ]; then
    # Try gnome-terminal, but fall back on failure
    if command -v gnome-terminal >/dev/null 2>&1; then
      if ! gnome-terminal -- bash -c "cd '$current_dir' && $cmd; exec bash" >/dev/null 2>&1; then
        echo "⚠️ gnome-terminal failed to launch. Running in background..."
        (cd "$current_dir" && $cmd) &
      fi
    elif command -v konsole >/dev/null 2>&1; then
      konsole --hold -e "bash -c \"cd '$current_dir' && $cmd\""
    elif command -v xterm >/dev/null 2>&1; then
      xterm -hold -e "cd '$current_dir' && $cmd"
    else
      echo "⚠️ No supported terminal emulator found. Running in background..."
      (cd "$current_dir" && $cmd) &
    fi
  
  elif echo "$OS" | grep -qE 'MINGW|CYGWIN|MSYS'; then
    # Windows (Git Bash, etc.)
    start cmd.exe /c "cd /d '$current_dir' && $cmd"
  
  else
    echo "⚠️ Unsupported OS '$OS'. Running in background..."
    (cd "$current_dir" && $cmd) &
  fi
}

echo "--- Starting all development servers ---"
echo "Home: http://localhost:3001"
echo "Web: http://localhost:3000"
echo "Admin: http://localhost:3003"
echo "Auth Service: Port 3002"
echo "Backend Service: Port 3004"
echo "----------------------------------------"

# Use IFS to split the command string and loop through it
IFS=';'
for command in $COMMANDS; do
    run_cmd "$command"
done
unset IFS

echo "✅ All service launch commands have been issued."
echo "If new terminals did not open, the services are running in the background of this window."
echo "You can manually stop them later by closing this terminal or using 'pnpm kill-ports'."

