# HANDOVER_DOC: Shahriar's AI Enabled Portfolio

## Project Overview
**Shahriar's Portfolio** is a cinematic, AI-augmented experience (An AI optimized CV) built for **Shahriar Haque Abir**. It transitions from a terminal-style chat interface into a multi-modal portfolio explorer.

### Core Philosophy
- **"Living Portfolio"**: The UI should feel like a high-end technical document or a premium OS interface.
- **Privacy-First AI**: All AI interactions happen locally on the user's device.
- **Data-Driven**: Every view is mapped to a central configuration object for easy maintenance.

---

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router), React 19.
- **Styling**: Tailwind CSS 4 (Vanilla CSS variables for theme).
- **Animations**: Framer Motion & Lenis (Smooth Scroll).
- **AI Engine**: Transformers.js (Running `SmolLM2-360M-Instruct` in a Web Worker).
- **Visuals**: Chart.js (Radar & Linear velocity charts).

---

## 📁 Key Architecture & Files

### 1. The Source of Truth (`src/lib/data.ts`)
This is the **most important file**. All professional history, projects, skills, and stats are managed here. 
- **To Update Bio/Experience**: Edit the `CONFIG` object.
- **To Add Projects**: Append to the `CONFIG.projects` array.

### 2. AI Command Center (`src/lib/worker.ts` & `src/app/page.tsx`)
- `worker.ts`: Handles the initialization and inference of the SmolLM2 model.
- `page.tsx`: Contains the command interception logic and the "Synthesis" protocol.
- **Synthesis Trigger**: The AI is programmed to switch to the `LabView` when it detects the `INITIATING_SYNTHESIS` token in its output.

### 3. Visual Views (`src/components/views/`)
- `HeroView.tsx`: Identity & High-impact intro.
- `SkillsView.tsx`: Programmatic radar chart (Capability Matrix).
- `ExperienceView.tsx`: Interactive career trajectory chart.
- `LabView.tsx`: The dynamic report generator for AI synthesis.

---

## 🎨 Design Language (`globals.css`)
- **Palette**: Editorial Cream (`#F9F7F2`) / Soft Charcoal (`#2C2C2C`).
- **Typography**: 
  - `Syne`: Technical headers.
  - `Inter`: Precise body text.
  - `Playfair Display`: High-end editorial accents.
- **Background**: Hand-drawn grid mesh with animated CSS blobs (`blob` class).

---

## 🚀 Maintenance & Deployment

### Adding a New Project
1. Open `src/lib/data.ts`.
2. Add a new object to `CONFIG.projects`.
3. The `ProjectsView.tsx` will automatically render the new card and its detail modal.

### Deployment
The app is configured for **Static Export** (`output: 'export'`).
```bash
npm run build
```
Upload the resulting `/out` folder to any static host (Vercel, Netlify, GH Pages).

### Security Notes
- No `.env` files are used for the frontend; everything is public-safe.
- Personal artifacts (`LinkedinProfile.pdf`, `legacy/`) are excluded via `.gitignore`.

---
**Status**: CALIBRATED / READY FOR OPERATION
**Prepared by**: Antigravity AI
