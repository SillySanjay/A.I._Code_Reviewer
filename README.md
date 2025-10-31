# Code Review (M.E.R.N) — README

A small M.E.R.N-style code review project with a frontend that lets you paste code and request an AI review from a backend service powered by Google Gemini (via `@google/genai`).

This README explains how the repository is organized, how to run the backend and frontend locally, required environment variables, and common troubleshooting steps.

---

## Repository structure

- `Backend/` — Express backend that exposes an AI review endpoint.
  - `server.js` — entry point that loads `src/app.js` and starts the server.
  - `src/` — application code
    - `app.js` — express app, routes and CORS config
    - `routes/ai.routes.js` — route for `/ai/get-review`
    - `controllers/ai.controller.js` — controller that validates input and calls service
    - `services/ai.service.js` — integrates with Google GenAI (`@google/genai`) to get reviews
  - `package.json` — backend dependencies and scripts

- `Frontend/` — Vite + React frontend
  - `src/App.jsx` — main UI (editor on the left, AI output on the right)
  - `src/App.css` — styles
  - `package.json` — frontend dependencies and scripts (dev/build)

- `.gitignore`, etc.

---

## Requirements

- Node.js (LTS recommended) and npm
- An API key / credentials for Google Gemini (used by `@google/genai`). See the service implementation for the exact environment variable name used (`GOOGLE_GEMINI_KEY`).

Note: The backend currently uses `@google/genai` and expects an environment variable named `GOOGLE_GEMINI_KEY` (see `Backend/src/services/ai.service.js`). If you use a different provider, update the service accordingly.

---

## Setup & run (Windows / PowerShell)

Open two terminals (one for backend, one for frontend).

1) Backend

```powershell
cd 'S:\M.E.R.N Stack\M.E.R.N Projects\Code_Review\Backend'
# install dependencies
npm install

# create a .env file with your Google Gemini key (see note below)
# Example .env content (DO NOT commit your real key):
# GOOGLE_GEMINI_KEY=sk-xxxxx

# start the server
node server.js
```

The backend listens on port 3000 by default (see `server.js`). It exposes POST `/ai/get-review` which expects a JSON body `{ code: "..." }` and returns the AI-generated review as plain text.

2) Frontend

```powershell
cd 'S:\M.E.R.N Stack\M.E.R.N Projects\Code_Review\Frontend'
# install dependencies
npm install

# start dev server
npm run dev
```

The frontend is configured to run using Vite (typically at `http://localhost:5173`). The backend CORS allows requests from `http://localhost:5173` by default (see `Backend/src/app.js`). If you run the frontend on a different port, update the backend CORS origin or the frontend base URL accordingly.

---

## Environment variables

Backend expects:

- `GOOGLE_GEMINI_KEY` — API key for Google GenAI (Gemini). Set this in `Backend/.env` or environment before running the server.

Example `.env` (DO NOT commit this to git):

```
GOOGLE_GEMINI_KEY=your-google-gemini-key-here
```

If you use a different credentials mechanism (service account file, application default credentials), update `Backend/src/services/ai.service.js` accordingly.

---

## API

- POST `/ai/get-review`
  - Body: `{ code: string }`
  - Response: text — the AI review

The frontend calls this endpoint (see `Frontend/src/App.jsx`) and renders the returned Markdown in the right pane.

---

## Styling / Editor

The frontend uses:

- `react-simple-code-editor` for the left-side code editor
- `prismjs` for syntax highlighting
- `react-markdown` to render AI responses returned as Markdown

If you want to change editor behavior or add syntax highlighting for more languages, update `src/App.jsx` and import the appropriate Prism components.

---

## Troubleshooting

- `CORS` problems: confirm the frontend origin is allowed in `Backend/src/app.js` CORS config.
- `API key` errors: confirm `GOOGLE_GEMINI_KEY` is set and valid. Check the backend logs for errors returned by `@google/genai`.
- `Port conflicts`: ensure nothing else is using `3000` (backend) or `5173` (vite) or update the ports.

---

## Security / Notes

- Never commit your API keys to git. Use environment variables or a secrets manager.
- The `ai.service.js` currently sends raw `code` strings to the model — for sensitive or large payloads consider sanitization or size limits.

---

## Deployment

This README focuses on local development. For production:

- Host the backend on a secure server (set env vars securely)
- Serve the built frontend (Vite build) from a CDN or static host and point it to the backend URL
- Use HTTPS and proper authentication if exposing the AI endpoint publicly

---

## License

Add your preferred license here (e.g., MIT). Create a `LICENSE` file if you want to include one.

---

If you'd like, I can:

- Add a short `CONTRIBUTING.md` with development workflow and commit guidelines.
- Add a sample GitHub Actions workflow to run lint/build on PRs.
- Add a `.env.example` file to both `Backend` and `Frontend` showing required env variables.

Tell me which of the above you'd like next and I'll add it.