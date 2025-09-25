# Feel The Pain – Frontend (Next.js)

Modern Ocean Professional theme (Primary #2563EB, Secondary #F59E0B) with top navigation, sidebar, and main content.

## Run locally
1. Copy env example:
```bash
cp .env.example .env.local
```
2. Adjust the backend URL as needed:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```
3. Install and start:
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Structure
- app/layout.tsx – Shell (Top Nav, Sidebar, gradient bg)
- app/page.tsx – Welcome/entry to auth
- app/auth/login – Sign In
- app/auth/register – Sign Up
- app/dashboard – Log entries, quick stats
- app/history – List and manage entries
- app/profile – View/Edit profile, logout
- components/* – Reusable UI
- lib/api.ts – API client for backend
- lib/theme.ts – Theme tokens

## Notes
- Uses REST with bearer JWT (stored in localStorage).
- Ensure backend supports CORS for the frontend origin.
- Tailwind v4 for styling with a minimalist layout and subtle shadows.
