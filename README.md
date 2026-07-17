# Real-chat

A real-time chat application built with React and [ChatEngine.io](https://chatengine.io),
deployed on Vercel as a single project: a Vite/React front end plus one serverless
function that handles authentication.

## How it works

1. A user enters a username on the auth screen.
2. The front end posts it to `/api/authenticate`, a Vercel serverless function.
3. That function calls the ChatEngine API using a **private key held server-side**,
   creating or fetching the user, and returns the result.
4. The chat UI renders via `react-chat-engine-pretty`.

Keeping the private key in the serverless function means it is never shipped to the
browser — only the ChatEngine *project id* (which is public by design) reaches the client.

## Project layout

```
real-chat/frontend/
├── api/authenticate.js   # serverless function (server-side, holds the private key)
├── src/                  # React app
└── .env.example          # required environment variables
```

## Environment variables

Copy `real-chat/frontend/.env.example` to `.env` and fill in both values from
your project at https://chatengine.io:

| Variable | Where it runs | Notes |
|---|---|---|
| `VITE_CHAT_ENGINE_PROJECT_ID` | browser | Public by design; the `VITE_` prefix bundles it into client JS. |
| `CHAT_ENGINE_PRIVATE_KEY` | server only | Secret. Never add a `VITE_` prefix, or it will leak to the browser. |

## Running locally

The app needs both the Vite dev server and the serverless function, so use the
Vercel CLI rather than `npm run dev`:

```bash
cd real-chat/frontend
npm install
vercel dev
```

## Deploying

The project root on Vercel is `real-chat/frontend`. Set both environment variables in
Project Settings, and Vercel builds the Vite app and the `api/` function together.
