# Hawkward Website

Hawkward is Shahriar Haque Abir's interactive portfolio for lead technical solution consulting, B2B SaaS implementation, Tier-3 support, GTM/SDR operating models, and AI automation work.

The site is built as a multi-view portfolio experience with an optional local AI guide. The guide runs in the visitor's browser through WebLLM and does not require an external LLM API key.

## Visual & Architectural Shape

- **Aesthetic:** "Highly technical and futuristic" using deep backgrounds (`#030509`), subtle static noise, and a glassmorphism effect (`.glass-panel`) for the main content areas.
- **AI HUD Sidebar:** A local AI guide running via WebLLM on Llama 3.2 1B. It uses a utilitarian terminal window aesthetic (`.hud-container`) with corner brackets and monospace typography.
- **Home:** Lead identity, hero badges, case-study entry points, and downloadable CV.
- **Blog:** Owner-authored posts only, managed through local portfolio data.
- **About:** Personal and professional narrative from engineering foundations to AI workflow interests.
- **Projects:** Selected work and case studies, led by Pathfinder international SDR/GTM and L&T project coordination.
- **Experience:** Chronological professional record and career influence map.
- **Skills:** Capability map organized around engineering foundations, project delivery, solution consulting, Tier-3 support, and AI automation.
- **Stats:** Proof points, professional metrics, and working-style orbit.
- **Contact:** Direct contact links and CV download.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Framer Motion
- WebLLM with Llama 3.2 1B
- Playwright for end-to-end checks

## Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Quality Checks

```bash
npm run lint
npm run build
npx playwright test
```

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

## Content Source

Most visitor-facing profile content lives in `src/lib/data.ts`. View composition lives under `src/components/views/`. The public downloadable CV is served from `public/shahriar-haque-abir-cv.pdf`.
