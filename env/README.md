# Environment configuration

Vite loads env files from this folder (`envDir: env` in `vite.config.js`).

## Files

| File | Purpose |
|------|---------|
| `.env.example` | Template — commit to git |
| `.env.development` | Local dev (e.g. ngrok URL) — used when running `npm run dev` |
| `.env.local` | Optional overrides (gitignored) |
| `.env.production` | Production API URL for `npm run build` |

## Variables

| Variable | Client-visible | Description |
|----------|----------------|-------------|
| `VITE_API_BASE_URL` | Yes | Axios base URL. Use `/api/v1` in dev (proxied) or full URL for production. |
| `API_PROXY_TARGET` | No (Vite only) | Where `/api` is forwarded during `npm run dev` (localhost or ngrok host). |

## CORS and ngrok

Browsers block cross-origin calls from `http://localhost:5173` to ngrok unless the backend allows every header. Do **not** send `ngrok-skip-browser-warning` from the app — it fails CORS preflight.

**Recommended for local dev:** keep `VITE_API_BASE_URL=/api/v1` and set `API_PROXY_TARGET` to your ngrok URL (no `https` path suffix). Vite proxies requests so the browser only talks to localhost.

## Usage

1. Copy `.env.example` to `.env.development` if needed.
2. Set `API_PROXY_TARGET` to your backend host (e.g. ngrok URL without `/api/v1`).
3. Restart the dev server after changes: `npm run dev`.
