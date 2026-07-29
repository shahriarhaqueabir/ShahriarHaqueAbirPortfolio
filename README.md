# Shahriar Haque Abir — Interactive Portfolio & AI Guide

[![Stack: Next.js 16](https://img.shields.io/badge/Next.js-16.2-000?logo=next.js&logoColor=fff)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EA4C89?logo=framer&logoColor=fff)](https://motion.dev)
[![WebLLM](https://img.shields.io/badge/WebLLM-0.2.83-4F46E5?logo=llama&logoColor=fff)](https://github.com/mlc-ai/web-llm)
[![ElevenLabs](https://img.shields.io/badge/TTS-ElevenLabs-000?logo=elevenlabs&logoColor=fff)](https://elevenlabs.io)
[![Playwright](https://img.shields.io/badge/Tests-Playwright-45BA4B?logo=playwright&logoColor=fff)](https://playwright.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=fff)](https://vercel.com)

> Multi-view portfolio with a browser-native AI guide and voice interaction. Ask questions about Shahriar's work, navigate with voice commands, and hear responses read aloud. No server-side AI costs — everything runs locally in the browser via WebLLM (WebGPU).

---

## Highlights

- **🧠 Local AI Guide** — Runs Qwen2.5-Coder 1.5B via WebLLM in the browser. Zero server costs, zero API keys. Falls back to a 17-intent rule engine when WebGPU is unavailable.
- **🎤 Voice Interaction** — Speech-to-text via the Web Speech API. Text-to-speech via ElevenLabs.
- **🕹️ Multi-View Architecture** — Seven interconnected portfolio views (Hero, About, Projects, Experience, Skills, Stats, Contact) with command routing and orbital navigation.
- **🎨 Dark Terminal Theme** — Deep-space palette (`#030509`), glass panels, animated orbit constellation, grid textures.
- **📋 Recruiter Snapshot** — At-a-glance stats, capability stack, and work authorization surface the most relevant details immediately.
- **⚡ Static Generation** — All routes pre-rendered. WebLLM loads lazily on user opt-in.

---

## AI Guide

Opens as a bottom drawer panel that slides up when you click the footer or send a message.

### Two Modes

| Mode | How it works | When |
| ------ | ------------- | ------ |
| **Fallback** (default) | 17-intent pattern-matching engine. Responds with hardcoded answers about projects, skills, experience. | Always available. No download, no GPU needed. |
| **Local LLM** | Qwen2.5-Coder 1.5B running in-browser via WebGPU. Offers richer, context-aware conversation. | User clicks "Enable AI" → downloads ~300MB model → ready. |

### AI Architecture Flow

```text
User input (text or voice)
        │
        ▼
useCommandRouter ──► Is it a navigation command?
        │                    │
        │ Yes                │ No
        ▼                    ▼
  Navigate view        usePortfolioWorker
                               │
                        ┌──────┴──────┐
                        │              │
                   localAiEnabled?   fallback-engine.ts
                        │          (pattern match, 0–5ms)
                        ▼
              Web Worker (worker.ts)
              Qwen2.5 1.5B via WebLLM
              ~300MB download, WebGPU
```

---

## Voice System

Bidirectional voice layer implemented entirely client-side.

### Speech-to-Text (Mic Button)

| File | Role |
| ------ | ------ |
| `src/hooks/useVoiceInput.ts` | Wraps the Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) |
| `src/types/speech-recognition.d.ts` | TypeScript declarations for the non-standard speech API |
| `src/components/VoiceButton.tsx` | Renders the mic button (always a `<button>` to prevent hydration mismatch) |

**How it works:**

1. Click the mic button → `startListening()` creates a `SpeechRecognition` instance with `continuous: true` and `interimResults: true`
2. Speak → interim transcript populates the input field in real time
3. Click mic again → `stopListening()` freezes the final transcript in the input
4. Click Send → text is sent to the AI guide

**Browser quirks handled:**

- Brave aggressively fires `onend` after short pauses → a 400ms `setTimeout` restart delay prevents rate-limiting
- A maximum of 8 restart attempts prevents infinite loops
- `isManualStopRef` distinguishes user stops from browser-enforced stops
- Hydration safety: the browser API check runs in `useEffect`, not during render

**Known issue:** Does not work on Brave. Works on Chrome and Chromium-based browsers. The Web Speech API has inconsistent implementation across browsers.

### Text-to-Speech (Speaker Button)

| File | Role |
| ------ | ------ |
| `src/hooks/useVoiceOutput.ts` | Manages audio playback with in-memory caching |
| `src/app/api/tts/route.ts` | Next.js API route that proxies to ElevenLabs |
| `src/components/VoiceButton.tsx` | Renders the speaker button on AI messages |

**How it works:**

1. Click the speaker icon on any AI message → `speak(text)` fires a POST to `/api/tts`
2. The API route proxies to `https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`
3. Audio is returned as `audio/mpeg` and played via `new Audio(url)`
4. Responses are cached in memory (keyed by first 200 characters of text)

**Configuration:**

- **Default voice:** Laura - Enthusiast, Quirky Attitude (`FGY2WhTYpPnrIDTdsKH5`)
- **Model:** `eleven_multilingual_v2`
- **Text cap:** 500 characters per request (protects free-tier quota)
- **Free tier:** ~10,000 credits/month (~10K characters of TTS)
- **API key:** Set `ELEVENLABS_API` in `.env`. Managed via Vercel environment variables in production.
- **Available free-tier voices:** Premade voices including Roger, Sarah, Laura, Charlie, George, Callum, River, and others (ElevenLabs offers 20+ premade voices on the free tier)

**Important:** The API key must never be committed. It is read from `process.env.ELEVENLABS_API` at request time.

### VoiceButton Component

A single component that renders two different button types via a discriminated union:

```typescript
type VoiceButtonProps =
  | { mode: "input";  isListening: boolean; isSupported: boolean; onClick: () => void }
  | { mode: "speaker"; isSpeaking: boolean; isSupported: boolean; onClick: () => void }
```

- `mode="input"` → Mic icon (🎤). Red when listening, muted when unsupported.
- `mode="speaker"` → Speaker icon. Highlighted when speaking, muted when unsupported.
- Always renders a `<button>` element — never returns `null` — preventing React hydration mismatches.

---

## Portfolio Views

| View | Route | Purpose |
| ------ | ------- | --------- |
| **Hero** | `/` | Identity, headline rotator, stats, recruiter snapshot, capability stack |
| **About** | `/about` | Personal narrative with adjacent-role context |
| **Projects** | `/projects` | Case studies with detailed breakdowns |
| **Experience** | `/experience` | Chronological timeline + career influence map |
| **Skills** | `/skills` | Capability map across 5 domains |
| **Stats** | `/stats` | Key metrics, working-style orbit constellation |
| **Contact** | `/contact` | Contact channels, work authorization |

---

## Architecture

```text
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout: fonts, particles, metadata
│   ├── page.tsx                 # Home → PortfolioShell
│   ├── globals.css              # Design tokens, glass-panel, print styles
│   ├── robots.ts / sitemap.ts   # SEO
│   ├── api/
│   │   └── tts/route.ts         # ElevenLabs TTS proxy
│   ├── about/                   # Static route
│   ├── contact/                 # Static route
│   ├── experience/              # Static route
│   ├── projects/                # Static route
│   ├── skills/                  # Static route
│   └── stats/                   # Static route
├── components/
│   ├── layout/
│   │   ├── PortfolioShell.tsx   # Shell: owns panel state, input state, voice hooks, send logic
│   │   ├── IconRail.tsx         # Desktop left-side navigation
│   │   └── MobileNav.tsx        # Mobile bottom tab bar
│   ├── views/                   # 7 view components (HeroView, AboutView, etc.)
│   ├── AiGuideFooter.tsx        # Bottom status bar (no input — status only)
│   ├── AiGuidePanel.tsx         # Bottom drawer: messages + input + mic + send + speaker buttons
│   ├── VoiceButton.tsx          # Mic (input) and speaker (output) button
│   ├── TypewriterText.tsx       # Animated text reveal for AI responses
│   ├── PortfolioViewRenderer.tsx # View routing with AnimatePresence
│   ├── ParticleBackground.tsx   # Route-aware particle system (tsparticles)
│   ├── LenisProvider.tsx        # Smooth-scroll Lenis integration
│   ├── PersonJsonLd.tsx         # JSON-LD structured data
│   ├── CompanyLogo.tsx          # SVG company logo renderer
│   ├── GuidedNext.tsx           # Post-navigation CTA chip
│   ├── TechIcon.tsx             # Simple Icons SVG renderer
│   └── VercelInsightsWrapper.tsx # Analytics + Speed Insights
├── hooks/
│   ├── useCommandRouter.ts      # Text → navigation/command detection
│   ├── usePortfolioWorker.ts    # Orchestrates fallback + LLM worker + message state
│   ├── useVoiceInput.ts         # Web Speech API wrapper (STT)
│   ├── useVoiceOutput.ts        # ElevenLabs TTS wrapper (TTS)
│   └── useReducedMotion.ts      # OS-level reduced motion detection
├── lib/
│   ├── data.ts                  # All content: bio, projects, skills, experience, stats
│   ├── types.ts                 # Message, ViewKey
│   ├── seo.ts                   # Site title, description, URL
│   ├── experience-model.ts      # View goals, career states
│   ├── fallback-engine.ts       # 17-intent pattern-matching fallback
│   └── worker.ts                # Web Worker: WebLLM engine singleton
├── types/
│   └── speech-recognition.d.ts  # Web Speech API type declarations
```

### Key Patterns

- **Command Router** — `useCommandRouter` maps text input to either a navigation action or a question. Detects phrases like "show projects" or "go to about" and routes accordingly.
- **Lifted State** — `PortfolioShell` owns `input`, `setInput`, `voiceInput`, and `voiceOutput` and passes them down as props to both footer and panel. This ensures a single source of truth for the text input and voice state.
- **Centralized Send** — The `send()` function in `PortfolioShell` clears the input, handles command routing, and dispatches messages to the worker. Both footer suggestion chips and panel input use this function.
- **Portfolio Worker** — `usePortfolioWorker` manages WebLLM lifecycle, model download progress, message dispatch, and the fallback/LLM dual-response system.
- **Type-Safe Views** — `ViewKey` is a strict union type (`"hero" | "about" | "projects" | ...`) ensuring compile-time safety across routing and navigation.

---

## Tech Stack

| Layer | Technology |
| ------- | ------------ |
| Framework | Next.js 16.2.6 (App Router, Static Generation) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| AI Runtime | WebLLM 0.2.83 (MLC) |
| AI Model | Qwen2.5-Coder 1.5B (q4f16_1) |
| Speech-to-Text | Web Speech API (`SpeechRecognition`) |
| Text-to-Speech | ElevenLabs API (via `POST /api/tts` proxy) |
| Particles | tsParticles (slim) + React wrapper |
| Fonts | Syne, JetBrains Mono |
| Smooth Scroll | Lenis |
| E2E Tests | Playwright |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone <repo-url>
cd ShahriarHaqueAbirPortfolio
npm install
```

### Environment

Create `.env` in the project root (never commit this file):

```env
ELEVENLABS_API=sk_...your-elevenlabs-api-key...
```

The API key is optional. Without it, voice output (TTS) will fail silently. Voice input (STT) works without any API key.

### Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000).

> **Important:** The `--webpack` build flag is used because `next.config.ts` contains webpack aliases (`sharp$`, `onnxruntime-node$` → `false`) that are incompatible with Turbopack. The build always uses `--webpack`.

### Build

```bash
npm run build       # TypeScript check + production build
```

### Test

```bash
npx playwright test                  # Headless E2E
npx playwright test --headed         # Visible browser
npm run test:headed                  # Same
```

### Quality

```bash
npm run lint        # ESLint
npm run format      # Prettier
```

---

## Deployment

Optimized for **Vercel**:

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- `vercel.json` is configured with `"buildCommand": "npm run build"` and `"installCommand": "npm install"`

**Environment variables to set in Vercel:**

| Key | Value |
| ----- | ------- |
| `ELEVENLABS_API` | `sk_...` (your ElevenLabs API key) |

---

## Content Management

All visitor-facing content is centralized:

| File | Purpose |
| ------ | --------- |
| `src/lib/data.ts` | Tagline, stats, profile text, contact info, project data, skill groupings |
| `src/lib/seo.ts` | Site title, meta description, canonical URL |
| `src/lib/experience-model.ts` | View goals, career trajectory states |
| `src/components/PersonJsonLd.tsx` | JSON-LD structured data (knowsAbout, jobTitle, etc.) |
| `src/components/views/*.tsx` | Per-view composition and layout |
| `public/shahriar-haque-abir-cv.pdf` | Downloadable CV |
| `public/profile.jpg` | Profile photo (used in Open Graph and hero) |

---

## Configuration Files

| File | Purpose |
| ------ | --------- |
| `next.config.ts` | Webpack aliases, dev origins, unoptimized images |
| `tsconfig.json` | Path aliases (`@/*` → `./src/*`), strict mode |
| `src/app/globals.css` | Tailwind CSS v4 config via `@theme` directives (CSS-first config, no separate PostCSS file needed) |
| `eslint.config.mjs` | ESLint flat config with Next.js core-web-vitals + TypeScript rules |
| `.prettierrc` | Prettier config (double quotes, trailing commas, 200 print width) |
| `playwright.config.ts` | Playwright with dev server auto-start |
| `vercel.json` | Vercel build and install commands |

---

## Design Decisions & Trade-offs

| Decision | Rationale |
| ---------- | ----------- |
| No Turbopack | Webpack aliases (`sharp$`, `onnxruntime-node$`) needed for WebLLM compatibility |
| Footer has no input bar | Only one input bar (in the panel) avoids dual-interface confusion |
| Manual TTS only | Auto-play would be disruptive. User clicks speaker to hear responses. |
| 500-char TTS cap | Protects the ~10K char/month ElevenLabs free tier from accidental overuse |
| In-memory audio cache | Avoids re-fetching the same text from ElevenLabs within a session |
| 400ms SpeechRecognition restart | Prevents rate-limiting on Brave which fires `onend` after short pauses |
| `display: none` → `opacity: 0` for footer | Keeps footer in DOM during panel open, preventing hydration issues |
| WebLLM in Web Worker | Keeps model inference off the main thread, preserving UI responsiveness |

---

## ⚙️ Repository Setup Standards

This repository adheres to the [Showcasing Standard](docs/SHOWCASING_STANDARD.md). If you're adapting this, remember to configure the following in the GitHub UI:

- **Topics/Tags**: `nextjs`, `portfolio`, `ai-guide`, `webllm`, `qwen`, `react-19`
- **Social Preview**: Set a high-quality image in Settings > General.
- **About Section**: Keep the description concise and include the live URL.

---

## Known Issues

| Issue | Workaround |
| ------- | ------------ |
| Speech-to-text doesn't work on Brave | Use Chrome, Edge, or another Chromium browser |
| ElevenLabs free tier is limited (~10K chars/mo) | Responses are capped at 500 chars. Consider Fish Audio or Google Chirp 3 for more generous free tiers. |
| Fast Refresh infinite loop on Windows | Ensure `watchOptions.poll` is NOT set in `next.config.ts`. Never add it back. |
| Vercel Insights `ERR_INTERNET_DISCONNECTED` in dev | Harmless. Only appears in local development when offline. |
| "preloaded but not used" profile.jpg warning | Harmless. Next.js preloads the Open Graph image. |
| WebLLM model download (~300MB) | Only happens if the user explicitly enables AI. The fallback engine works instantly. |

---

## License

MIT — see LICENSE.

---

## No Contributions — Personal Portfolio

This is a **personal portfolio** and is **not open for contributions, issues, or feature requests**. Feel free to fork it, study the architecture, and adapt patterns for your own projects.
