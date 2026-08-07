# Shahriar Haque Abir Portfolio — Memory Index

## Active Sprint

**Locked Down** (2026-08-07) - All Hardening tasks complete.

## Codebase Identity

| Attribute | Value |
| ----------- | ------- |
| Stack | Next.js 16.2, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12 |
| Deployment | Vercel (static generation) |
| AI | WebLLM (Qwen2.5-1.5B) + Fallback rule engine |
| Voice | Web Speech API (STT) + ElevenLabs (TTS proxy) |
| Test | Playwright (pre-configured, **no test files yet**) |

## Key Files

| File | Purpose |
| ------ | --------- |
| `src/lib/types.ts` | Shared types (Message, ViewKey) |
| `src/lib/data.ts` | All portfolio content (CONFIG) |
| `src/lib/seo.ts` | SEO metadata + siteUrl |
| `src/lib/experience-model.ts` | Career states + view goals |
| `src/lib/fallback-engine.ts` | 17-intent fallback AI engine |
| `src/lib/worker.ts` | WebLLM Web Worker |
| `src/hooks/usePortfolioWorker.ts` | AI worker orchestration hook |
| `src/hooks/useCommandRouter.ts` | Command/navigation routing |
| `src/hooks/useVoiceInput.ts` | Speech-to-text |
| `src/hooks/useVoiceOutput.ts` | Text-to-speech |
| `src/components/layout/PortfolioShell.tsx` | Main app shell |
| `src/components/layout/IconRail.tsx` | Desktop sidebar nav |
| `src/components/layout/MobileNav.tsx` | Mobile bottom nav |
| `src/components/PortfolioViewRenderer.tsx` | View lazy-loader |
| `src/app/globals.css` | Design system + utilities |
| `DesignLanguage.md` | Design principles doc |
| `README.md` | Project docs (has lint issues) |

## Active Topics

- [Sprint 1 Plan](/plans/2026-07-29-sprint-1-hardening.md)
- [ADR 0001: Dual-Engine AI Architecture](/docs/adr/0001-dual-engine-ai-architecture.md)

## Sprint History

- Sprint 1: Initial getset — site hardening, polish, and baseline setup. Rate limiting and ADR documentation established.
