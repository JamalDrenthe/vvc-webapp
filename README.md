# Verdienende Vrienden Club Platform

React + Vite dashboard and marketing experience for VVC, including onboarding, community views, chat, and partner pages. Tailwind is delivered via CDN in `index.html` for rapid setup.

## Features

- Marketing landing (hero, navigation)
- Auth gate and dashboard layout with sidebar navigation
- Missions/onboarding flows, community list, chat placeholder
- Partner/brand placeholder pages (Boastplug, Spontiva, WoningVrij, etc.)
- Hash-based routing (works on static hosting)

## Tech Stack

- React 19 + Vite 6
- React Router (HashRouter)
- Tailwind via CDN (no PostCSS pipeline yet)

## Requirements

- Node.js 18+
- npm

## Environment

Create `.env.local` in the project root and set:

```env
GEMINI_API_KEY=your_key
```

The key is injected via `vite.config.ts` (`process.env.GEMINI_API_KEY`).

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

- Vite defaults to port 3000 and auto-increments if busy (e.g., 3001).
- HashRouter ensures routes work without server-side rewrites.

## Build

```bash
npm run build
```

Outputs static assets to `dist/`.

## Deploy

Static hosting is sufficient because routing uses hashes:

- Any static host (GitHub Pages, Netlify, Vercel static export, S3/CloudFront, etc.) can serve `dist/`.
- If you add history routing later, configure rewrite rules; with HashRouter this is not required.
- If you adopt compiled Tailwind, remove the CDN script from `index.html` and add Tailwind/PostCSS build tooling.

## Useful Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – create production build
- `npm run preview` – preview the production build locally

## Troubleshooting

- **Port in use**: Vite will pick the next free port; check console for the active URL.
- **Missing styles**: Ensure the Tailwind CDN script in `index.html` is loaded; if blocked, switch to a local Tailwind build.
- **Env not applied**: Confirm `.env.local` exists and restart `npm run dev` after changes.
