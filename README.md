# ShiftLeft

No-code AI flow builder — build and deploy AI agents visually.

## Requirements

- Node.js >= 18.15.0
- pnpm >= 8.0.0

Install pnpm if you don't have it:
  npm install -g pnpm

## Quick Start

### 1. Clone the repo
  git clone <your-repo-url>
  cd shiftleft

### 2. Install dependencies
  pnpm install

### 3. Setup environment files
  cp packages/server/.env.example packages/server/.env
  cp packages/ui/.env.example packages/ui/.env

Edit packages/server/.env and set a secure SECRETKEY value.

### 4. Start development servers
  pnpm dev

### 5. Open in browser
  Frontend: http://localhost:8080
  Backend API: http://localhost:3000

## Build for production
  pnpm build

## Project structure
  packages/
    server/       ? Node.js + Express API backend
    ui/           ? React frontend (Vite)
    components/   ? AI nodes and integrations

## Environment variables

### packages/server/.env
  PORT=3000
  DATABASE_TYPE=sqlite
  DATABASE_PATH=./database.sqlite
  SECRETKEY=your_secret_key_here
  CORS_ORIGIN=http://localhost:8080

### packages/ui/.env
  VITE_PORT=8080
  VITE_API_URL=http://localhost:3000

## License
Apache 2.0 — see LICENSE file.
