# Architecture Patterns

## App Architecture

- **SPA-in-MPA**: Each route is a page, but navigation is client-side via `useCommandRouter` hook
- **Single shell layout**: `PortfolioShell` wraps all views in `<AnimatePresence>` with Framer Motion page transitions
- **All views co-located**: No complex routing — each view is a simple component switched by `view` state

## AI Integration

- **WebLLM Worker**: `worker.ts` loads Qwen2.5-1.5B in a Web Worker for fully local inference
- **Fallback Engine**: `fallback-engine.ts` provides 17 pattern-matching intents when WebLLM is still loading
- **Voice I/O**: `useVoiceInput.ts` (Web Speech API) + `useVoiceOutput.ts` (ElevenLabs TTS via `/api/tts`)
- **Command router**: `useCommandRouter.ts` parses AI responses and maps to views/actions

## Data Flow

- **Static content**: All portfolio data in `src/lib/data.ts` (CONFIG object with experiences, projects, skills)
- **No backend**: Fully static site, deployed to Vercel, `/api/tts` is the only dynamic route
- **SEO**: Auto-generated sitemap + robots from `src/lib/seo.ts`

## Styling

- **Tailwind CSS v4**: `@import "tailwindcss"` with `@theme` custom tokens
- **CSS custom properties**: 7-level type scale, color palette in `globals.css`
- **Dark theme**: Base `#030509`, glass panels via `backdrop-filter: blur()`
