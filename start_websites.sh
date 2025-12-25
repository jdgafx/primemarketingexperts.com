#!/bin/bash

# ==============================================================================
# Universal Project Setup & Startup Script
# ==============================================================================
# This script sets up dependencies (Gum, Node.js) and starts the dual-website
# project on any Linux system with robust error handling and dynamic ports.
# ==============================================================================

set -e

# --- Configuration ---
GUM_VERSION="0.13.0"
PROJECT_ROOT=$(pwd)
CLONE_DIR="$PROJECT_ROOT/primemarketingexperts.com"
BRAND_DIR="$PROJECT_ROOT/amplify-marketing"
DEFAULT_CLONE_PORT=3060
DEFAULT_BRAND_PORT=3061

# --- Helper Functions ---

log_info() {
    if command -v gum &> /dev/null; then
        gum style --foreground 212 "$1"
    else
        echo -e "\033[1;36m$1\033[0m"
    fi
}

log_success() {
    if command -v gum &> /dev/null; then
        gum style --foreground 118 "$1"
    else
        echo -e "\033[1;32m$1\033[0m"
    fi
}

log_error() {
    if command -v gum &> /dev/null; then
        gum style --foreground 196 --bold "$1"
    else
        echo -e "\033[1;31m$1\033[0m"
    fi
}

install_gum() {
    echo "Installing Gum for UI..."
    ARCH=$(uname -m)
    case $ARCH in
        x86_64)  ARCH_SUFFIX="x86_64" ;;
        aarch64) ARCH_SUFFIX="arm64" ;;
        *)       echo "Unsupported architecture: $ARCH"; exit 1 ;;
    esac

    TEMP_DIR=$(mktemp -d)
    curl -L -o "$TEMP_DIR/gum.tar.gz" "https://github.com/charmbracelet/gum/releases/download/v${GUM_VERSION}/gum_${GUM_VERSION}_Linux_${ARCH_SUFFIX}.tar.gz"
    tar -xzf "$TEMP_DIR/gum.tar.gz" -C "$TEMP_DIR"
    
    # Try installing to local bin if sudo fails or user prefers
    if [ -d "$HOME/.local/bin" ]; then
        mv "$TEMP_DIR/gum" "$HOME/.local/bin/gum"
        export PATH="$HOME/.local/bin:$PATH"
    else
        if command -v sudo &> /dev/null; then
            sudo mv "$TEMP_DIR/gum" /usr/local/bin/gum
        else
            mkdir -p "$HOME/bin"
            mv "$TEMP_DIR/gum" "$HOME/bin/gum"
            export PATH="$HOME/bin:$PATH"
        fi
    fi
    
    rm -rf "$TEMP_DIR"
}

check_system_dependencies() {
    # Check Gum
    if ! command -v gum &> /dev/null; then
        install_gum
    fi

    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed."
        if gum confirm "Would you like to install Node.js (via NVM script)?"; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            nvm install --lts
        else
            log_error "Node.js is required. Please install it manually."
            exit 1
        fi
    fi

    # Check NPM
    if ! command -v npm &> /dev/null; then
         log_error "NPM not found. Please check your Node installation."
         exit 1
    fi
}

ensure_project_dependencies() {
    local dir=$1
    local name=$2

    if [ ! -d "$dir" ]; then
        log_error "Directory not found: $dir"
        return
    fi

    if [ ! -d "$dir/node_modules" ]; then
        gum style --border normal --margin "1" --padding "1 2" --border-foreground 214 "📦 Installing dependencies for $name..."
        cd "$dir"
        npm install
        cd "$PROJECT_ROOT"
        log_success "Dependencies installed for $name."
    else
        # Optional: check if package.json has changed compared to node_modules? 
        # For now, safe assumption: if node_modules exists, we are good.
        # Minimal noise if already installed.
        :
    fi
}

find_available_port() {
    local port=$1
    while :; do
        (echo >/dev/tcp/localhost/$port) &>/dev/null && check=1 || check=0
        if [ $check -eq 0 ]; then
            echo $port
            return
        fi
        port=$((port + 1))
    done
}

start_servers() {
    log_info "🔍 Protecting your ports..."
    
    CLONE_PORT=$(find_available_port $DEFAULT_CLONE_PORT)
    BRAND_PORT=$(find_available_port $DEFAULT_BRAND_PORT)
    
    # Ensure they aren't the same
    if [ "$CLONE_PORT" -eq "$BRAND_PORT" ]; then
        BRAND_PORT=$(find_available_port $((CLONE_PORT + 1)))
    fi

    gum style --border double --margin "1" --padding "1 2" --border-foreground 212 --bold "🚀 Starting Development Servers"
    
    echo "Starting servers on available ports:"
    gum style --foreground 118 "Clone Site: http://localhost:$CLONE_PORT"
    gum style --foreground 39 "Brand Site: http://localhost:$BRAND_PORT"
    
    # We use a subshell trap to kill both on exit
    (trap 'kill 0' SIGINT; 
     cd "$CLONE_DIR" && PORT=$CLONE_PORT npm run dev & \
     cd "$BRAND_DIR" && PORT=$BRAND_PORT npm run dev & \
     wait)
}

cleanup_existing_processes() {
    log_info "🧹 Cleaning up existing development processes..."
    
    # Kill common next.js processes automatically
    pkill -f "next dev" || true
    pkill -f "next-server" || true
    
    # Specifically check and kill processes on default ports if they exist
    for port in $DEFAULT_CLONE_PORT $DEFAULT_BRAND_PORT; do
        PID=$(lsof -t -i:$port || true)
        if [ -n "$PID" ]; then
            log_info "⚠️ Shutting down existing process on port $port..."
            kill -9 $PID || true
        fi
    done

    # Clean up lock files
    rm -f "$CLONE_DIR/.next/dev/lock"
    rm -f "$BRAND_DIR/.next/dev/lock"
    log_success "✅ Environment cleared."
}

# --- Main Workflow ---

cleanup_existing_processes
check_system_dependencies
ensure_project_dependencies "$CLONE_DIR" "Prime Marketing Experts (Clone)"
ensure_project_dependencies "$BRAND_DIR" "Amplify Marketing (Brand)"

# Welcome Screen
clear
gum style \
	--border double \
	--margin "1" \
	--padding "2 4" \
	--border-foreground 212 \
	"DUAL AI WEBSITE PROJECT" \
	" " \
	"1. Prime Marketing Experts (Clone)" \
	"2. Amplify Marketing (New Brand)"

ACTION=$(gum choose "Start Both Websites" "Start Clone Site Only" "Start Brand Site Only" "Exit")

case $ACTION in
    "Start Both Websites")
        start_servers
        ;;
    "Start Clone Site Only")
        PORT=$(find_available_port $DEFAULT_CLONE_PORT)
        log_info "Starting Clone Site on http://localhost:$PORT"
        cd "$CLONE_DIR" && PORT=$PORT npm run dev
        ;;
    "Start Brand Site Only")
        PORT=$(find_available_port $DEFAULT_BRAND_PORT)
        log_info "Starting Brand Site on http://localhost:$PORT"
        cd "$BRAND_DIR" && PORT=$PORT npm run dev
        ;;
    "Exit")
        exit 0
        ;;
esac
