# ShiftLeft

No-code AI flow builder - build and deploy AI agents visually.

## Requirements

- Node.js >= 18.15.0
- pnpm >= 8.0.0

Install pnpm if you don't have it:

```powershell
npm install -g pnpm
```

## Quick Start

### 1. Clone the repo

```powershell
git clone <your-repo-url>
cd shiftleft
```

## Windows Local Setup (Exact Path)

Use this exact repository path:

```powershell
cd C:\Users\SYS-02\Desktop\nocode-main\nocode-main
```

### First-time setup (run once)

```powershell
cd C:\Users\SYS-02\Desktop\nocode-main\nocode-main
pnpm install
Copy-Item packages/server/.env.example packages/server/.env
Copy-Item packages/ui/.env.example packages/ui/.env
pnpm --filter @flowiseai/components build
pnpm --filter shiftleft-server build
```

### Backend startup blocker fix

Build components once before running dev servers:

```powershell
pnpm --filter @flowiseai/components build
```

### Long/stable run (use 2 terminals)

Terminal 1 (Backend):

```powershell
cd C:\Users\SYS-02\Desktop\nocode-main\nocode-main
pnpm --filter shiftleft-server dev
```

Terminal 2 (Frontend):

```powershell
cd C:\Users\SYS-02\Desktop\nocode-main\nocode-main
pnpm --filter shiftleft-ui dev -- --port 8080 --host
```

### If ports are stuck before starting

```powershell
npx kill-port 8080 3000
```

### Open in browser

- Frontend: http://localhost:8080
- Backend: http://localhost:3000

## Build for production

```powershell
pnpm build
```

## Project structure

```text
packages/
  server/       - Node.js + Express API backend
  ui/           - React frontend (Vite)
  components/   - AI nodes and integrations
```

## Environment variables

### packages/server/.env

```env
PORT=3000
DATABASE_TYPE=sqlite
DATABASE_PATH=./database.sqlite
SECRETKEY=your_secret_key_here
CORS_ORIGIN=http://localhost:8080
```

### packages/ui/.env

```env
VITE_PORT=8080
VITE_API_URL=http://localhost:3000
```

## License

Apache 2.0 - see LICENSE file.
