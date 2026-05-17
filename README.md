# Hawkward Website

Hawkward is Shahriar Haque Abir's AI-enabled portfolio: a cinematic, privacy-first portfolio experience built with Next.js, React, Tailwind CSS, Framer Motion, Chart.js, and WebLLM.

The site combines a multi-view portfolio explorer with an on-device AI tour guide. The guide runs Llama 3.2 1B in the browser through WebLLM, so portfolio exploration does not require an external LLM API key.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Framer Motion
- Chart.js
- WebLLM with Llama 3.2 1B

## Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```

The app is configured for static export with `output: "export"`, so production files are generated in `out/`.

## Deploying

For Vercel, use:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Output directory: `out`

If this project lives inside a larger repository, set Vercel's root directory to the folder that contains this `package.json`.
