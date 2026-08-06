# Setup and Verification

## Prerequisites

- Node.js 20+
- npm 10+
- A Chromium-based browser for Playwright

## Local setup

1. Install dependencies with `npm ci`
2. Copy `.env.example` to `.env` if you need to override local environment values
3. Start the app with `npm run dev`

## Verification commands

- `npm run lint`
- `npm run build`
- `npm run test`

## Notes

- The app uses a local TTS proxy for ElevenLabs. The API key is optional for local development.
- `.env` is intentionally untracked and should never contain secrets committed to source control.
- Playwright smoke tests validate the main routes and the AI guide flows.
