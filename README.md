# 🦅 Hawkward — Interactive Portfolio & AI Guide

[![Stack: Next.js 16](https://img.shields.io/badge/Next.js-16.2-000?logo=next.js&logoColor=fff)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EA4C89?logo=framer&logoColor=fff)](https://motion.dev)
[![WebLLM](https://img.shields.io/badge/WebLLM-0.2-4F46E5?logo=llama&logoColor=fff)](https://github.com/mlc-ai/web-llm)
[![AI: Qwen2.5 1.5B](https://img.shields.io/badge/AI-Qwen2.5_1.5B-0288D1?logo=alpacadev&logoColor=fff)](https://github.com/QwenLM/Qwen2.5)
[![Playwright](https://img.shields.io/badge/Tests-Playwright-45BA4B?logo=playwright&logoColor=fff)](https://playwright.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=fff)](https://vercel.com)
[![Known Vulnerabilities](https://snyk.io/package/npm/next/badge.svg)](https://snyk.io/package/npm/next)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A futuristic, multi-view portfolio experience with a browser-native AI guide that answers questions about Shahriar's work — no API keys, no server, no data leaving your machine.

---

## ✨ Highlights

- **🧠 Local AI Guide** — Runs Qwen2.5 1.5B via WebLLM in the browser. Ask questions about projects, experience, or skills. Zero server costs, zero API keys.
- **🕹️ Multi-View Architecture** — Seven interconnected portfolio views (Hero, About, Projects, Experience, Skills, Stats, Contact) with orbital navigation and command routing.
- **🎨 Futuristic HUD Aesthetic** — Deep-space palette (`#030509`), glassmorphism panels, animated orbit constellation, terminal-style boot screen.
- **🔍 Recruiter-First Design** — Recruiter Snapshot, Capability Stack, and a conversation-fit tag system surface the most relevant details immediately.
- **⚡ Performance Optimized** — Static generation, WebLLM lazy-load, reduced motion support, and a strict 10-route sitemap.

---

## 📸 What's Inside

| View | Purpose |
|------|---------|
| **Hero** | Identity, headline rotator, hero stats, recruiter snapshot, capability stack, AI guide entry |
| **About** | Personal & professional narrative with adjacent-role context woven into the bio |
| **Projects** | Case studies (Interactive Database Visualizer, Customer Onboarding Portal, etc.) |
| **Experience** | Chronological timeline + career influence map with 14+ years of enterprise SaaS history |
| **Skills** | Capability map across Technical Operations, Systems Integration, Data & Troubleshooting, Solutions Engineering, Infrastructure & Networking |
| **Stats** | Proof metrics, working-style orbit constellation, and exploration prompts |
| **Contact** | Direct contact channels, conversation-fit classification, work authorization |

---

## 🧠 The AI Guide

The AI Guide is the standout feature — a full LLM running in the visitor's browser:

- **Model:** [Qwen2.5 1.5B](https://github.com/QwenLM/Qwen2.5) via [WebLLM](https://github.com/mlc-ai/web-llm)
- **No backend:** Everything runs client-side through WebGPU/WebGL
- **Fallback mode:** Rule-based responses if the model fails to load or is declined
- **Suggested next paths:** After each answer, the guide suggests relevant portfolio views
- **Opt-in first:** Visitors must explicitly enable it — zero unwanted downloads

---

## 🏗️ Architecture

```
src/
├── app/                  # Next.js App Router pages (7 static routes)
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── skills/
│   └── stats/
├── components/
│   ├── views/            # One component per view
│   │   ├── HeroView.tsx
│   │   ├── AboutView.tsx
│   │   ├── ProjectsView.tsx
│   │   ├── ExperienceView.tsx
│   │   ├── SkillsView.tsx
│   │   ├── StatsView.tsx
│   │   └── ContactView.tsx
│   ├── layout/           # IconRail sidebar, glass-panel wrapper
│   ├── AiGuidePanel.tsx  # Full-screen chat panel
│   └── AiGuideFooter.tsx # Footer chat bar
├── hooks/                # useCommandRouter, usePortfolioWorker, useReducedMotion
├── lib/                  # data.ts, seo.ts, types.ts, experience-model.ts
└── tests/                # Playwright E2E suite
```

### Key Patterns

- **Command Router** — A React hook (`useCommandRouter`) that maps text commands to view navigation, enabling the AI guide to route visitors anywhere.
- **View Goals Model** — Each view declares a `coreQuestion` and `nextViews`, creating a guided exploration graph used by the `GuidedNext` component.
- **Portfolio Worker** — A Web Worker manages the WebLLM lifecycle, model download progress, and message dispatch.
- **Type-Safe Views** — `ViewKey` is a strict union type (`"hero" | "about" | "projects" | ...`) ensuring compile-time safety across routing, navigation, and content.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Static Generation) |
| Language | [TypeScript 5.8](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion 12](https://motion.dev) |
| AI Runtime | [WebLLM 0.2](https://github.com/mlc-ai/web-llm) |
| Model | [Qwen2.5 1.5B (q4f16_1)](https://github.com/QwenLM/Qwen2.5) |
| Fonts | Syne (headings), Playfair Display (accents), JetBrains Mono (code), Inter (body) |
| E2E Tests | [Playwright](https://playwright.dev) |
| Deployment | [Vercel](https://vercel.com) |

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/hawkward-website.git
cd hawkward-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The boot screen appears first — click **Enter Portfolio** to proceed.

> **Note:** The `--webpack` build flag is required because `next.config.ts` uses webpack aliases incompatible with Turbopack.

---

## ✅ Quality Checks

```bash
npm run lint        # ESLint
npm run build       # TypeScript check + production build
npx playwright test # E2E tests (4 passing: identity, navigation, scroll-reset, AI routing)
```

---

## 📦 Deployment

Optimized for **Vercel**:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Output directory: `.next`

If this project lives inside a monorepo, set Vercel's root directory to the folder containing `package.json`.

---

## 📝 Content Management

All visitor-facing content is centralized:

| File | Purpose |
|------|---------|
| `src/lib/data.ts` | Tagline, stats, profile text, contact info, project data |
| `src/lib/seo.ts` | Site title, meta description for Open Graph / Twitter |
| `src/components/PersonJsonLd.tsx` | JSON-LD structured data (knowsAbout, jobTitle, etc.) |
| `src/components/views/*.tsx` | Per-view composition and layout |
| `public/shahriar-haque-abir-cv.pdf` | Downloadable CV |

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

## 🙅 No Contributions — But Feel Free to Learn

This is a **personal portfolio** and is **not open for contributions, issues, or feature requests**. It exists as a public reference:

- **Learn from it** — Fork it, study the architecture, adapt patterns for your own projects.
- **Keep your distance** — Please do not submit PRs, open issues, or suggest changes. This repo is a snapshot of one person's work, not a community project.
- **Build your own** — If you find something useful here, great! Go build something even better.

---

*Built by [Shahriar Haque Abir](https://github.com/yourusername). Questions? Reach out through the contact channels on the site.*
