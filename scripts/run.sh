#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd "$ROOT"

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt

echo "Starting server on port 80..."
echo "Note: port 80 requires sudo on macOS/Linux."
sudo uvicorn app.main:app --host 0.0.0.0 --port 80
