# NUKA DESIGN LABORATORY — SPRINT PLAN GENERATION PROMPT

---

## INSTRUCTIONS FOR AI

You are a senior frontend engineer and technical project manager. Your task is to generate a **complete, production-ready sprint plan document** for the Nuka Design Laboratory portfolio project.

Using all context provided below, produce the full sprint scaffolding as a structured document. Each ticket must answer:
- **WHAT** — the precise scope of work
- **WHY** — the business/experience rationale
- **HOW** — the technical implementation approach with code direction
- **DONE WHEN** — an outcome-based, observable definition of done
- **BLOCKERS** — known dependencies, risks, or prerequisites that must be resolved before or during this ticket

The sprint covers **one focused delivery cycle**. All tickets must be **sequenced by dependency order**. Output the full document — do not summarise or truncate any ticket.

---

## PROJECT CONTEXT

### What is Nuka?
Nuka Design Laboratory is a cinematic, AI-augmented portfolio for **Shahriar Haque Abir** — a Solution Consultant and Technical Support Engineer based in Berlin. The site uses a terminal-style AI chat sidebar (powered by SmolLM2 running in a Web Worker via Transformers.js) alongside a multi-view "Design Laboratory" explorer. The design language is Editorial Cream / Soft Charcoal with Syne, Inter, and Playfair Display fonts.

### Current Tech Stack
- **Framework**: Next.js (App Router), React 19
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **Animation**: Framer Motion (installed), Lenis (smooth scroll)
- **AI Engine**: Transformers.js — SmolLM2-135M-Instruct in a Web Worker
- **Charts**: Chart.js (Radar + Line)
- **Output**: Static export (`output: 'export'`)
- **Deploy**: Vercel / Netlify / GitHub Pages

### Key Files
- `src/lib/data.ts` — Single source of truth: CONFIG object with all professional data
- `src/lib/worker.ts` — Web Worker: AI model init + inference
- `src/app/page.tsx` — God component: sidebar, routing, AI message handling
- `src/components/views/` — All view components (HeroView, SkillsView, ExperienceView, LabView, etc.)
- `src/app/globals.css` — Design tokens, body background, blob animation

---

## AUDIT FINDINGS (PROBLEMS TO FIX)

The following issues were identified in a pre-sprint code review. Every ticket must address at least one of these:

### AI Integration Issues
1. **Synthesis trigger is fragile** — `INITIATING_SYNTHESIS` token string-match depends on a 135M model reliably outputting an exact token. It fails silently and frequently.
2. **Model too small** — SmolLM2-135M cannot reliably follow structured system prompts, follow instruction schemas, or produce formatted multi-section output.
3. **Onboarding fires before model is ready** — Three onboarding messages render immediately but `isReady` is still `false`. UX appears ready before AI is calibrated.
4. **Hello warmup wastes inference** — A `hello` message is fired on load purely to trigger download progress. This burns tokens and delays first real response.
5. **Unbounded chat history** — Full message array is serialised into every worker call. Long conversations bloat context payload and will exceed SmolLM's context window.

### Architecture Issues
6. **`page.tsx` is a God Component** — 250+ lines handling: worker lifecycle, message state, visitor profiling, view routing, command interception, keyword parsing, and sidebar UI. Must be split.
7. **Brittle keyword router** — `words.length < 3` threshold for navigation is arbitrary and breaks expected commands like "show me my projects".
8. **Visitor profiling is a broken stub** — Regex captures garbage (`"i'm not sure"` → name = `"not sure"`). Passed to model but never meaningfully used.

### Design & UX Issues
9. **Mobile layout is broken** — Sidebar is `min-w-[380px]` with no responsive breakpoint. On 390px viewport the sidebar consumes full screen.
10. **First-load experience is a dead screen** — Users see plain text `"Downloading model weights... 43%"` with no way to browse until model loads. ~270MB download on first visit.
11. **Contact view routes to HeroView** — Silent bug. User clicks "contact", gets Hero with no feedback.
12. **Radar chart is a flat circle** — All skill group values hardcoded to `85`. Conveys no real information.
13. **LabView dumps raw text** — The "Custom Report" is an unformatted `<p>` tag wrapping model output. Static "Recommendation" is hardcoded and never changes.

---

## DESIGN INSPIRATION (PATTERNS TO IMPLEMENT)

The following four reference sites define the visual and interaction direction for this sprint:

### SubstrateRx (`countdown.substraterx.com`)
- Dark precision instrument aesthetic, real-time data visualisation
- **Pattern to borrow**: Live-plotting chart animations — lines draw themselves on mount, values interpolate from 0 to final. Apply to `ExperienceView` career timeline and `StatsView`.

### Yan Liu (`yanliuportfolio.vercel.app`)
- Scattered desk-object layout, physics-based hover, macOS window metaphors
- **Pattern to borrow**: Scattered positioned objects in `HeroView` reacting to cursor with `useMotionValue` parallax at different depths. Objects should reflect Shahriar's technical world: terminal snippet, network diagram, Docker compose fragment.

### Victor Furuya (`victorfuruya.com`)
- Editorial cinema, oversized display type, scroll-pinned cinematic reveals
- **Pattern to borrow**: Replace `AnimatePresence` fade/slide transitions with `clipPath` wipe reveals. Large counter/number as section identity (e.g. `05` for 5 years at tripunkt before the timeline). Text wipes in at scale before detail follows.

### Luca Nardi (`aboutluca.com`)
- Loading as Chapter 1, numbered chapter preloader, gated `enter` that's skippable
- **Pattern to borrow**: Transform load sequence into a staged boot protocol with line-by-line system messages. User can enter immediately — AI is an enhancement, not a gate.

---

## SPRINT GOAL

> **Deliver a version of Nuka that is mobile-responsive, visually cinematic, and has a reliably functional AI layer — where every interaction earns its complexity.**

---

## SPRINT CONSTRAINTS

- All changes must be **drop-in compatible** with the existing Next.js App Router + Tailwind 4 setup
- No new paid dependencies
- AI must remain **fully on-device** — no API calls to external LLM services
- Static export (`output: 'export'`) must remain intact
- The `CONFIG` object in `data.ts` remains the single source of truth — no data should be hardcoded in components
- Framer Motion is already installed — use it for all animation work
- The existing CSS design tokens (`--bg`, `--text`, `--accent`, `--border`, etc.) must be preserved and extended, not replaced

---

## TICKET DEFINITIONS

Generate the following 9 tickets in full. Each ticket must include all five sections: WHAT, WHY, HOW, DONE WHEN, BLOCKERS.

---

### TICKET 01 — Staged Boot Protocol (Load Screen)
**Theme**: First impression / Luca Nardi pattern  
**Priority**: P0 — Blocks all other UX work  

Context: The current load experience shows plain text progress. The site is unusable until a ~270MB model downloads. This is the first thing every visitor sees.

Generate a ticket that covers:
- Replacing the plain text loading state with a full-screen staged boot sequence
- Line-by-line system initialisation messages that render with stagger timing
- A progress bar or percentage counter styled as a `LAB_SYSTEM` readout
- An `[ENTER LABORATORY]` button that activates immediately (does not wait for AI)
- A secondary status indicator showing AI engine status separately from page readiness
- Boot sequence lines must map to real system states (CSS loaded, data loaded, AI downloading, AI ready)
- The boot screen must be skippable — visiting the site a second time (model cached) should fast-forward or skip entirely using `sessionStorage`

---

### TICKET 02 — Mobile Responsive Layout
**Theme**: Accessibility / reach  
**Priority**: P0 — Blocks deployment to production  

Context: The sidebar is `min-w-[380px]`. On any screen under ~800px it breaks the layout entirely. Portfolio links shared on LinkedIn will be opened on mobile by the majority of recruiters.

Generate a ticket that covers:
- Converting the fixed sidebar into a **bottom sheet** on mobile (≤768px breakpoint)
- The bottom sheet should show: AI input, status indicator, and a compact navigation strip
- Navigation Protocol buttons should reflow into a horizontal scrollable strip on mobile
- The main content area should occupy full viewport width on mobile
- The sidebar/bottom-sheet toggle should be a floating button (hamburger or `[CMD]` label) pinned bottom-right
- All existing desktop layout must remain identical — this is additive, not a redesign
- Test breakpoints: 390px (iPhone 15), 768px (iPad), 1280px+ (desktop)

---

### TICKET 03 — Refactor `page.tsx` into Composable Architecture
**Theme**: Code quality / maintainability  
**Priority**: P1 — Blocks AI reliability work (Ticket 05) and command router fix (Ticket 04)  

Context: `page.tsx` is a 250-line God Component handling too many responsibilities. It cannot be safely modified for AI or routing improvements without risk of regressions.

Generate a ticket that covers:
- Extracting a `useNukaWorker` custom hook: owns worker ref, message state, `isReady`, progress, and all `postMessage` / `onMessage` logic
- Extracting a `useCommandRouter` custom hook: owns keyword map, `words.length` logic, `activeView` state, and view-switching
- Extracting a `<NukaSidebar />` component: owns all sidebar JSX (header, message list, navigation protocols, input bar)
- `page.tsx` should reduce to a layout shell: `<NukaSidebar />` + `<main>{renderView()}</main>` + the boot screen gate
- All extracted logic must be type-safe with explicit TypeScript interfaces
- No behaviour changes — this is a pure refactor. All existing features must work identically after.

---

### TICKET 04 — Fix Command Router & Contact View
**Theme**: Navigation reliability  
**Priority**: P1 — Depends on Ticket 03  

Context: The keyword router uses an arbitrary `words.length < 3` threshold that silently rejects valid navigation commands. The `contact` view silently routes to `HeroView`.

Generate a ticket that covers:
- Removing the `words.length < 3` gate entirely — replace with **intent confidence scoring**: if any keyword match scores above threshold regardless of sentence length, navigate
- Adding a `contact` view that renders contact information from `CONFIG.contact` — name, email, LinkedIn, GitHub, location — styled consistently with other views
- Adding a `ContactView.tsx` component that reads from `CONFIG.contact`
- Updating `renderView()` in `page.tsx` to include the `contact` case
- Adding "Contact" to the Navigation Protocols button list in `NukaSidebar`
- Ensuring all 9 navigation targets (hero, about, projects, experience, skills, stack, vision, stats, contact) work reliably via both button click and typed command

---

### TICKET 05 — AI Model Upgrade & Synthesis Reliability
**Theme**: AI integration reliability  
**Priority**: P1 — Depends on Ticket 03  

Context: SmolLM2-135M is too small to reliably follow structured prompts. The `INITIATING_SYNTHESIS` token-match trigger silently fails. The warmup inference wastes tokens. Chat history is unbounded.

Generate a ticket that covers:
- Replacing `HuggingFaceTB/SmolLM2-135M-Instruct` with `Qwen/Qwen2.5-1.5B-Instruct` in `worker.ts`
- Removing the `hello` warmup inference — use `progress_callback` alone for download progress
- Replacing the `INITIATING_SYNTHESIS` string-match with a **deterministic synthesis trigger**: a dedicated "Synthesize" button in the sidebar that fires a structured prompt with an explicit output schema
- The structured synthesis prompt must request JSON output with defined keys: `{ summary, highlights: string[], recommendation, nextSteps: string[] }`
- `LabView.tsx` must parse and render this structured JSON into a proper multi-section report layout — not a raw `<p>` tag
- The "Recommendation" section in `LabView` must be dynamically populated from the AI output, not hardcoded
- Capping chat history at the **last 8 turns** before sending to the worker
- Fixing the onboarding sequence so it only renders *after* `isReady` transitions to `true` (or after boot screen is dismissed)
- `max_new_tokens` should increase to `512` for the 1.5B model

---

### TICKET 06 — Cinematic View Transitions (Victor Furuya Pattern)
**Theme**: Animation quality / cinematic storytelling  
**Priority**: P2 — Depends on Ticket 03  

Context: Current view transitions are basic `opacity`/`x` fades via `AnimatePresence`. The reference sites use `clipPath` wipe reveals and typographic scale entrances that feel intentional and cinematic.

Generate a ticket that covers:
- Replacing all `AnimatePresence` `exit`/`enter` variants in view components with `clipPath` wipe transitions: `inset(0 100% 0 0)` → `inset(0 0% 0 0)` on enter, reverse on exit
- Adding a **section identity number** to `ExperienceView` — a large display counter (`05` for 5 years) that renders at scale before the timeline content follows, using staggered delay
- Adding the same pattern to `ProjectsView` — project count as large display number hero element
- Transition duration: `0.55s` with `easeOut` cubic bezier `[0.22, 1, 0.36, 1]`
- All transitions must respect `prefers-reduced-motion` — fall back to simple `opacity` fade if set
- Navigation via sidebar buttons and typed commands must both trigger the transition

---

### TICKET 07 — Live-Drawing Chart Animations (SubstrateRx Pattern)
**Theme**: Data visualisation / technical credibility  
**Priority**: P2 — Depends on Ticket 03  

Context: Charts render instantly on mount with no animation. The radar chart has all values hardcoded to `85` (a flat circle). The experience misses an opportunity to make data feel live and technical.

Generate a ticket that covers:
- Adding real per-skill-group proficiency values to `CONFIG` in `data.ts` — new `proficiency` field on each skill group object (0–100). Values must reflect genuine self-assessment.
  Suggested values: Core Competencies: 90, Customer/Consulting: 88, Technical/Systems: 82, Languages: 75, Certifications: 70
- Animating the radar chart with `chartjs-plugin-annotation` or manual dataset interpolation: values animate from `0` to final on view mount using `requestAnimationFrame` over `1200ms`
- Animating the `ExperienceView` career timeline line: the connecting line draws from top to bottom on mount, each node fades in sequentially after the line reaches it
- All chart animations must only play once per view mount — not re-trigger on re-render
- Animations must degrade gracefully if Chart.js is unavailable

---

### TICKET 08 — Hero View Scattered Objects (Yan Liu Pattern)
**Theme**: Identity / personality / first impression  
**Priority**: P2 — Depends on Ticket 06  

Context: `HeroView` currently renders a standard heading + tagline layout. The reference sites use scattered, cursor-reactive objects to communicate personality and technical identity before the resume content appears.

Generate a ticket that covers:
- Adding 5 scattered decorative "artifact" objects to `HeroView`, positioned absolutely around the hero content:
  1. A mini terminal window snippet (showing a bash command from Shahriar's actual work — e.g. `docker compose up -d`)
  2. A simplified network topology node diagram (3 nodes, 2 edges, SVG)
  3. A small `{ JSON }` fragment representing the RAG API project
  4. A `≥ 40 cases/week` stat badge (from CONFIG experience data)
  5. A Berlin coordinates label: `52.5200° N, 13.4050° E`
- Each object must use `useMotionValue` + `useTransform` from Framer Motion to react to cursor position at **different parallax depths** (factors: 0.02, 0.04, 0.06, 0.08, 0.03)
- Objects must have subtle `rotate` variance (between -6deg and +6deg) and a hover state that brings them to `z-index` prominence
- Objects must be styled consistently with the existing design token system
- On mobile (≤768px), objects must be hidden (`display: none`) — they are desktop-only
- All object content must be sourced from `CONFIG` — no hardcoded personal data in the component

---

### TICKET 09 — LabView Structured Report Renderer
**Theme**: AI output quality / synthesis experience  
**Priority**: P2 — Depends on Ticket 05  

Context: `LabView` currently wraps raw AI text in a single `<p>` tag with a hardcoded "Recommendation" section. After Ticket 05, AI output will be structured JSON. This component must render it properly.

Generate a ticket that covers:
- Redesigning `LabView.tsx` to accept a structured `ReportData` prop (typed interface) rather than a raw `context: string`
- `ReportData` interface: `{ summary: string, highlights: string[], recommendation: string, nextSteps: string[] }`
- Rendering each section as a distinct styled block:
  - `summary` → Large intro paragraph with editorial styling
  - `highlights` → A horizontal row of bordered tag/badge elements (like skill tags in `SkillsView`)
  - `recommendation` → A call-out block with `--accent` left border
  - `nextSteps` → A numbered list with mono font counter labels (`01 /`, `02 /`)
- Adding a `[REGENERATE SYNTHESIS]` button that re-fires the structured synthesis prompt
- Adding a `[EXPORT AS TEXT]` button that copies the report to clipboard
- All sections must animate in sequentially using Framer Motion stagger on mount
- The `LAB_PROTO_402` badge in the top-right corner must update to include a timestamp of when the report was generated
- If `ReportData` is null or parsing fails, render a graceful fallback: `"Synthesis incomplete — ask Nuka to generate a custom report for you."`

---

## OUTPUT FORMAT INSTRUCTIONS FOR AI

Produce the sprint plan as a complete markdown document with the following structure:

```
# NUKA DESIGN LABORATORY — SPRINT PLAN
## Sprint Overview
## Sprint Goal
## Dependency Map (ASCII or table)
## Tickets (01–09, each with full WHAT / WHY / HOW / DONE WHEN / BLOCKERS)
## Risk Register
## Definition of Sprint Success
```

For each HOW section, include:
- Specific file paths to create or modify
- TypeScript interface definitions where applicable
- Key code patterns or pseudo-code (not full implementations — direction only)
- Framer Motion variant objects where animation is involved

For each BLOCKERS section, use this format:
```
BLOCKER [ID]: [Description]
TYPE: [Technical | Design | Dependency | External]
STATUS: [Open | In Progress | Resolved]
RESOLUTION PATH: [What needs to happen to unblock]
```

For the Dependency Map, show ticket numbers and arrows indicating which tickets must complete before others can begin.

For the Risk Register, identify the top 5 project risks with: Risk ID, Description, Likelihood (H/M/L), Impact (H/M/L), Mitigation.

The final document must be **self-contained** — an engineer unfamiliar with this project should be able to read it and begin executing any unblocked ticket immediately.

---

*End of prompt. Generate the full sprint plan document now.*
