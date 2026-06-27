# 🦅 Shahriar Haque Abir — Interactive Portfolio & AI Guide

<!-- badges: start -->
<!-- Status Badges -->
[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-000?style=flat&logo=vercel&logoColor=fff)](https://vercel.com)
[![Custom Build](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/shahriarhaqueabir/adbd0eaa95a15c5cfbc78a3d70a8f910/raw/badge.json)](https://github.com/shahriarhaqueabir/shahriarhaqueabir-portfolio/actions)
[![Playwright Tests](https://img.shields.io/badge/Tests-Passing-45BA4B?style=flat&logo=playwright&logoColor=fff)](https://playwright.dev)
[![Known Vulnerabilities](https://snyk.io/package/npm/next/badge.svg)](https://snyk.io/package/npm/next)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<!-- Stack Badges -->
[![Next.js 16.2.6](https://img.shields.io/badge/Next.js-16.2.6-000?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EA4C89?style=for-the-badge&logo=framer&logoColor=fff)](https://motion.dev)
[![WebLLM](https://img.shields.io/badge/WebLLM-0.2-4F46E5?style=for-the-badge&logo=llama&logoColor=fff)](https://github.com/mlc-ai/web-llm)
[![Qwen2.5 1.5B](https://img.shields.io/badge/AI-Qwen2.5_1.5B-0288D1?style=for-the-badge&logo=alpacadev&logoColor=fff)](https://github.com/QwenLM/Qwen2.5)
<!-- badges: end -->

<div align="center">
  <!-- TODO: Replace with a high-quality screenshot or GIF of the portfolio in action -->
  <img src="https://via.placeholder.com/800x400.png?text=Shahriar+Haque+Abir+Portfolio+Screenshot" alt="Shahriar Haque Abir Portfolio Screenshot" width="800"/>
</div>

> A futuristic, multi-view portfolio experience featuring a browser-native AI guide and an advanced NLP fallback engine that answers questions about Shahriar's work — no API keys, no server, no data leaving your machine.

---

## ✨ Highlights

- **🧠 Local AI Guide (WebGPU)** — Runs Qwen2.5 1.5B via WebLLM entirely in the browser. Ask questions about projects, experience, or skills. Zero server costs, zero API keys.
- **🛡️ Advanced NLP Fallback Engine** — Even before or without the WebLLM loading, an advanced intent-matching engine (`fallback-engine.ts`) uses fuzzy search, entity extraction, and contextual conversation memory to provide robust answers and view-routing.
- **🕹️ Multi-View SPA Architecture** — Seven interconnected portfolio views (Hero, About, Projects, Experience, Skills, Stats, Contact) constructed as a hybrid SPA utilizing `window.history.pushState` over Next.js App Router static endpoints.
- **🎨 Futuristic HUD Aesthetic** — Deep-space palette (`#030509`), glassmorphism panels, interactive `tsparticles` background, `lenis` smooth scrolling, and `Chart.js` data visualizations.
- **🔍 Recruiter-First Design** — Recruiter Snapshot, Capability Stack, and a conversation-fit tag system surface the most relevant details immediately.

---

## 📸 What's Inside

| View | Purpose |
|------|---------|
| **Hero** | Identity, headline rotator, hero stats, recruiter snapshot, capability stack, AI guide entry |
| **About** | Personal & professional narrative with adjacent-role context woven into the bio |
| **Projects** | Case studies (Interactive Database Visualizer, Customer Onboarding Portal, etc.) |
| **Experience** | Chronological timeline + career influence map with 14+ years of enterprise SaaS history |
| **Skills** | Capability map across Technical Operations, Systems Integration, Data & Troubleshooting, Solutions Engineering, Infrastructure & Networking |
| **Stats** | Proof metrics utilizing `Chart.js`, working-style orbit constellation, and exploration prompts |
| **Contact** | Direct contact channels, conversation-fit classification, work authorization |

---

## 🧠 The AI Ecosystem

The portfolio features a dual-layer AI strategy to maximize accessibility and performance:

### 1. WebLLM Guide (The Heavy Lifter)
- **Model:** [Qwen2.5 1.5B (q4f16_1)](https://github.com/QwenLM/Qwen2.5) via [WebLLM](https://github.com/mlc-ai/web-llm)
- **No backend:** Executes client-side through WebGPU/WebGL
- **Privacy First:** Opt-in required. No data leaves the browser.

### 2. The NLP Fallback Engine (The Safety Net)
For unsupported browsers or while the model caches, the `fallback-engine.ts` handles queries instantly:
- **Intent Scoring:** Evaluates user queries against 15+ complex interaction patterns (e.g., comparing skills, seeking role fits).
- **Entity Extraction:** Dynamically identifies projects and technologies in user queries for targeted responses.
- **Conversation State:** Remembers the visitor profile (e.g., recruiter vs engineer) and active views to tailor responses appropriately.

---

## 🏗️ Architecture

```text
src/
├── app/                  # Next.js App Router pages (7 static routes wrapping PortfolioShell)
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── skills/
│   └── stats/
├── components/
│   ├── views/            # One component per view (HeroView, ProjectsView, etc.)
│   ├── layout/           # IconRail sidebar, PortfolioShell wrapper
│   ├── AiGuidePanel.tsx  # Full-screen chat panel
│   └── AiGuideFooter.tsx # Footer chat bar
├── hooks/                # useCommandRouter, usePortfolioWorker, useReducedMotion
├── lib/                  # data.ts, seo.ts, fallback-engine.ts, worker.ts
└── tests/                # Playwright E2E suite
```

### Key Patterns

- **PortfolioShell & Command Router** — A hybrid navigation hook (`useCommandRouter`) that intercepts route changes and maps text commands to view navigation via `window.history.pushState`, allowing seamless Framer Motion transitions without full re-renders.
- **Web Worker Offloading** — The LLM operations run inside a dedicated web worker (`worker.ts`) hooked up via `usePortfolioWorker.ts` so the main thread never blocks.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16.2](https://nextjs.org) (App Router, Static Generation) |
| Core UI | [React 19](https://react.dev) |
| Language | [TypeScript 5.8](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation & Scroll | [Framer Motion 12](https://motion.dev), [Lenis](https://lenis.studiofreight.com/) |
| AI Runtime | [WebLLM 0.2](https://github.com/mlc-ai/web-llm) |
| Model | [Qwen2.5 1.5B (q4f16_1)](https://github.com/QwenLM/Qwen2.5) |
| Visualizations | [Chart.js](https://www.chartjs.org/), [tsParticles](https://particles.js.org/) |
| E2E Tests | [Playwright](https://playwright.dev) |

---

## 🚀 Getting Started

```bash
git clone https://github.com/shahriarhaqueabir/shahriarhaqueabir-portfolio.git
cd shahriarhaqueabir-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The boot screen appears first — click **Enter Portfolio** to proceed.

> **Note:** The `--webpack` build flag is utilized by default (`next dev --webpack`) to ensure maximum compatibility with the custom worker configurations.

---

## ✅ Quality Checks

```bash
npm run lint        # ESLint
npm run format:check # Prettier
npm run build       # TypeScript check + production build
npm run test        # Playwright E2E tests
```

---

## 📦 Deployment

Optimized for **Vercel**:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Output directory: `.next`

---

## 📝 Content Management

All visitor-facing content is centralized to make updates trivial:

| File | Purpose |
|------|---------|
| `src/lib/data.ts` | Tagline, stats, profile text, contact info, project data |
| `src/lib/seo.ts` | Site title, meta description for Open Graph / Twitter |
| `src/components/PersonJsonLd.tsx` | JSON-LD structured data (knowsAbout, jobTitle, etc.) |

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

## ⚙️ Repository Setup Standards

This repository adheres to the [Showcasing Standard](docs/SHOWCASING_STANDARD.md). If you're adapting this, remember to configure the following in the GitHub UI:
- **Topics/Tags**: `nextjs`, `portfolio`, `ai-guide`, `webllm`, `qwen`, `react-19`
- **Social Preview**: Set a high-quality image in Settings > General.
- **About Section**: Keep the description concise and include the live URL.

---

## 🙅 No Contributions — But Feel Free to Learn

This is a **personal portfolio** and is **not open for contributions, issues, or feature requests**. It exists as a public reference:

- **Learn from it** — Fork it, study the architecture, adapt patterns for your own projects.
- **Keep your distance** — Please do not submit PRs, open issues, or suggest changes. This repo is a snapshot of one person's work, not a community project.
- **Build your own** — If you find something useful here, great! Go build something even better.

---

*Built by [Shahriar Haque Abir](https://github.com/shahriarhaqueabir).*
