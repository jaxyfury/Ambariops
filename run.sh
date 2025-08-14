#!/bin/bash

set -e

# Detect OS
OS="$(uname)"
echo "Detected OS: $OS"

# Command list
COMMANDS=(
  "pnpm dev:home"
  "pnpm dev:admin"
  "pnpm dev:auth"
  "pnpm dev:backend"
  "pnpm dev" # main dashboard
)

# Function: Run command in new terminal tab/window
run_cmd() {
  local cmd="$1"

  if [[ "$OS" == "Darwin" ]]; then
    # macOS
    osascript <<EOF
tell application "Terminal"
  do script "cd $(pwd) && $cmd"
end tell
EOF

  elif [[ "$OS" == "Linux" ]]; then
    if command -v gnome-terminal >/dev/null 2>&1; then
      gnome-terminal -- bash -c "cd $(pwd) && $cmd; exec bash"
    elif command -v konsole >/dev/null 2>&1; then
      konsole --hold -e bash -c "cd $(pwd) && $cmd"
    elif command -v xterm >/dev/null 2>&1; then
      xterm -hold -e "cd $(pwd) && $cmd"
    else
      echo "⚠️ No supported terminal found, running in background..."
      bash -c "$cmd &"
    fi

  elif [[ "$OS" =~ MINGW.* || "$OS" =~ CYGWIN.* || "$OS" =~ MSYS.* ]]; then
    # Windows Git Bash
    start cmd /k "cd /d $(pwd) && $cmd"

  else
    echo "⚠️ Unknown OS, running in background..."
    bash -c "$cmd &"
  fi
}

echo "--- Starting all development servers in separate terminals ---"
echo "Home: http://localhost:3001"
echo "Web: http://localhost:3000"
echo "Admin: http://localhost:3003"
echo "Auth: http://localhost:3002"
echo "Backend: http://localhost:3004"

for cmd in "${COMMANDS[@]}"; do
  run_cmd "$cmd"
done

echo "✅ All services launched!"
