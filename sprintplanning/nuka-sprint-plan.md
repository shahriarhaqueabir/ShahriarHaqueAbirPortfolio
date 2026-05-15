# NUKA DESIGN LABORATORY — SPRINT PLAN
**Version**: 1.0  
**Prepared for**: Shahriar Haque Abir  
**Sprint Type**: Single delivery cycle — Feature + Quality  
**Status**: READY FOR EXECUTION

---

## Sprint Overview

This sprint transforms Nuka from a technically ambitious prototype into a production-ready, visually cinematic portfolio. It addresses every critical finding from the pre-sprint audit, upgrades the AI layer to be reliably functional, introduces four specific interaction patterns drawn from reference sites, and leaves the codebase in a maintainable, composable state.

**9 tickets. 2 priority tiers. 1 coherent outcome.**

---

## Sprint Goal

> Deliver a version of Nuka that is mobile-responsive, visually cinematic, and has a reliably functional AI layer — where every interaction earns its complexity.

---

## Dependency Map

```
P0 LAYER (Foundation — must complete first)
┌─────────────────────────────────────────────┐
│  T01: Boot Protocol   T02: Mobile Layout    │
│  (blocks UX work)     (blocks deployment)   │
└────────────────┬────────────────────────────┘
                 │
P1 LAYER (Architecture + AI — unblocked after P0)
                 ▼
┌─────────────────────────────────────────────┐
│  T03: Refactor page.tsx (God Component)     │
│  (blocks T04 and T05)                       │
└─────────┬──────────────────────┬────────────┘
          ▼                      ▼
    T04: Command Router     T05: AI Upgrade
    & Contact View          & Synthesis Fix
          │                      │
P2 LAYER (Visual + Polish — unblocked after P1)
          └──────────┬───────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│  T06: Cinematic       T07: Live Charts    T09: LabView  │
│  Transitions          (SubstrateRx)       Renderer      │
│  (Victor Furuya)                          (needs T05)   │
│       │                                                  │
│       ▼                                                  │
│  T08: Hero Objects                                       │
│  (Yan Liu / needs T06)                                   │
└─────────────────────────────────────────────────────────┘

Execution order:
T01 + T02 (parallel) → T03 → T04 + T05 (parallel)
→ T06 + T07 + T09 (parallel, T09 needs T05)
→ T08 (needs T06)
```

---

## TICKETS

---

### TICKET 01 — Staged Boot Protocol
**Priority**: P0  
**Label**: `ux` `first-impression` `ai-integration`  
**Estimated effort**: 3–4 hours

---

#### WHAT
Replace the current plain-text loading state (`"Downloading model weights... 43%"`) with a full-screen staged boot sequence. The boot screen becomes Chapter 1 of the Nuka experience — styled as a `LAB_SYSTEM` initialisation protocol. The site must be browsable immediately; the AI is an enhancement, not a gate.

---

#### WHY
The current first-load experience presents a dead screen to every first-time visitor. On a standard connection, the ~270MB model download takes 20–60 seconds. Recruiters who click a LinkedIn link and see a blank progress bar will close the tab. The boot screen transforms this technical constraint into a designed moment — and the "skippable" pattern means return visitors are not penalised.

---

#### HOW

**File to create**: `src/components/BootScreen.tsx`  
**File to modify**: `src/app/page.tsx` — gate main layout behind `bootComplete` state

**Boot sequence lines** (render with 120ms stagger between each):
```
NUKA LABORATORY — INITIALISING
─────────────────────────────────────────
01 / DESIGN SYSTEM ..................... OK
02 / PROFESSIONAL RECORD .............. OK
03 / SYNTHESIS PROTOCOLS .............. STANDBY
04 / AI ENGINE (Qwen2.5-1.5B) ......... {live progress %} 
─────────────────────────────────────────
[ENTER LABORATORY →]
```

**Key implementation patterns**:
```tsx
// BootScreen.tsx
const lines = [
  { id: 'css',   label: 'DESIGN SYSTEM',         status: 'OK',      delay: 0 },
  { id: 'data',  label: 'PROFESSIONAL RECORD',    status: 'OK',      delay: 120 },
  { id: 'proto', label: 'SYNTHESIS PROTOCOLS',    status: 'STANDBY', delay: 240 },
  { id: 'ai',    label: 'AI ENGINE (Qwen2.5-1.5B)', status: null,   delay: 360 },
];

// status: null = live progress, rendered as `{progress}%` from worker progress_callback
// [ENTER LABORATORY] button: enabled immediately (not waiting for AI)
// onClick: sets bootComplete = true in sessionStorage + parent state
```

**Skip logic**:
```ts
// On mount in page.tsx
const alreadyBooted = sessionStorage.getItem('nuka_booted');
if (alreadyBooted) setBootComplete(true); // skip immediately on return visits
// On enter click:
sessionStorage.setItem('nuka_booted', '1');
setBootComplete(true);
```

**Framer Motion variants**:
```ts
const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.12, duration: 0.3, ease: 'easeOut' }
  })
}
```

**Styling**: Full screen, `background: var(--bg)`, mono font, `--accent` coloured status values. Progress bar below line 04 — thin 1px height, fills left-to-right as download progresses.

---

#### DONE WHEN
- [ ] First-time visitor sees the boot sequence render line by line
- [ ] `[ENTER LABORATORY]` button is clickable before AI finishes loading
- [ ] Clicking enter immediately transitions to the main portfolio (no wait)
- [ ] AI status in sidebar shows "Calibrating..." until model is ready, then "ONLINE"
- [ ] Return visitor (model cached in IndexedDB) sees boot screen skip or fast-forward in under 300ms
- [ ] Boot screen is visually consistent with the Editorial Cream design system
- [ ] No layout shift when transitioning from boot to main content

---

#### BLOCKERS

```
BLOCKER T01-A: Worker progress_callback must emit granular progress events
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Verify Transformers.js progress_callback fires per-chunk during
download. If not granular enough, poll model load state and emit synthetic progress
events at intervals.

BLOCKER T01-B: sessionStorage not available during SSR in Next.js App Router
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Wrap sessionStorage access in useEffect or typeof window !== 
'undefined' guard. Boot screen component must be client-only ('use client').
```

---

### TICKET 02 — Mobile Responsive Layout
**Priority**: P0  
**Label**: `responsive` `layout` `accessibility`  
**Estimated effort**: 4–6 hours

---

#### WHAT
Convert the fixed 380px sidebar into a **bottom sheet** on screens ≤768px. The main content area occupies the full viewport width on mobile. A floating `[CMD]` button (bottom-right) opens/closes the AI panel. Navigation Protocols reflow into a horizontally scrollable strip. Desktop layout is completely unchanged.

---

#### WHY
Portfolio links shared on LinkedIn are opened on mobile by the majority of recruiters. The current `min-w-[380px]` sidebar means the entire site is broken on any phone. This is a P0 deployment blocker — no version of this portfolio should go live without mobile support.

---

#### HOW

**Files to modify**:
- `src/app/page.tsx` — add `isMobile` detection, `sidebarOpen` state
- `src/components/NukaSidebar.tsx` (after T03 refactor, or inline first)
- `src/app/globals.css` — add mobile breakpoint utilities if needed

**Layout logic**:
```tsx
// Detect mobile
const isMobile = useMediaQuery('(max-width: 768px)');
// or: use CSS only with Tailwind responsive classes

// Desktop: flex-row, sidebar fixed left
// Mobile: flex-col, sidebar hidden, bottom sheet slides up on demand
```

**Bottom sheet structure**:
```tsx
// Mobile bottom sheet
<motion.div
  className="fixed bottom-0 left-0 right-0 z-50 bg-(--surface) border-t border-(--border)"
  initial={{ y: '100%' }}
  animate={{ y: sidebarOpen ? 0 : '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
>
  {/* Compact nav strip + AI input */}
</motion.div>

// Floating trigger button (always visible on mobile)
<button
  className="fixed bottom-6 right-6 z-50 md:hidden w-12 h-12 bg-(--text) text-(--bg) rounded-sm font-mono text-xs"
  onClick={() => setSidebarOpen(prev => !prev)}
>
  {sidebarOpen ? '✕' : 'CMD'}
</button>
```

**Navigation strip on mobile**:
```tsx
// Horizontal scrollable row of nav buttons (same data as desktop)
<div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
  {navItems.map(v => <button key={v} className="snap-start shrink-0 ...">{v}</button>)}
</div>
```

**Breakpoints to test**:
- 390px — iPhone 15 Pro
- 430px — iPhone 15 Plus
- 768px — iPad Mini (boundary case — should show desktop)
- 1280px — Desktop baseline

---

#### DONE WHEN
- [ ] On 390px viewport, main content fills full width with no horizontal overflow
- [ ] Sidebar is not visible on mobile until `[CMD]` button is tapped
- [ ] Bottom sheet slides up smoothly with spring animation
- [ ] All 9 navigation destinations are accessible from the mobile bottom sheet
- [ ] AI input is functional in the bottom sheet (same behaviour as desktop)
- [ ] Desktop layout (1280px) is pixel-identical to pre-sprint baseline
- [ ] No content is clipped or unreachable at any of the four test breakpoints

---

#### BLOCKERS

```
BLOCKER T02-A: Touch event handling for bottom sheet drag-to-dismiss
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Implement drag-to-dismiss as a V2 enhancement. V1 uses tap-outside
overlay dismiss only. Log as follow-up ticket.

BLOCKER T02-B: Lenis smooth scroll may conflict with bottom sheet scroll
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Disable Lenis on mobile. Use native scroll within bottom sheet.
Wrap Lenis init in a desktop-only conditional.
```

---

### TICKET 03 — Refactor `page.tsx` into Composable Architecture
**Priority**: P1  
**Label**: `refactor` `architecture` `dx`  
**Estimated effort**: 4–5 hours  
**Depends on**: T01 (boot screen pattern established)

---

#### WHAT
Split the 250-line God Component `page.tsx` into three focused units: a `useNukaWorker` hook, a `useCommandRouter` hook, and a `<NukaSidebar />` component. `page.tsx` reduces to a layout shell. No behaviour changes — pure structural refactor.

---

#### WHY
The current `page.tsx` cannot be safely modified for AI reliability improvements (T05) or command router fixes (T04) without risk of cascading regressions. Every P1 and P2 ticket depends on a clean separation of concerns. This refactor is the enabler for everything downstream.

---

#### HOW

**Files to create**:
- `src/hooks/useNukaWorker.ts`
- `src/hooks/useCommandRouter.ts`
- `src/components/NukaSidebar.tsx`

**Files to modify**:
- `src/app/page.tsx` — reduce to layout shell

---

**`useNukaWorker.ts` interface**:
```ts
interface UseNukaWorkerReturn {
  messages: Message[];
  isReady: boolean;
  progress: number;
  sendMessage: (userText: string, systemPrompt: string) => void;
  addSystemMessage: (text: string) => void;
}

export function useNukaWorker(): UseNukaWorkerReturn { ... }
// Owns: worker ref, message state, onMessageReceived handler,
//       progress tracking, isReady state, chat history cap (last 8 turns)
```

**`useCommandRouter.ts` interface**:
```ts
interface UseCommandRouterReturn {
  activeView: string;
  setActiveView: (view: string) => void;
  handleCommand: (input: string) => { navigated: boolean; view?: string };
}

export function useCommandRouter(): UseCommandRouterReturn { ... }
// Owns: viewKeywords map, intent matching logic, activeView state
// handleCommand returns navigated:true if a view was matched,
// allowing page.tsx to decide whether to pass to AI
```

**`NukaSidebar.tsx` props interface**:
```ts
interface NukaSidebarProps {
  messages: Message[];
  isReady: boolean;
  progress: number;
  activeView: string;
  onNavigate: (view: string) => void;
  onSend: (input: string) => void;
}
```

**`page.tsx` after refactor** (target shape):
```tsx
export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const { messages, isReady, progress, sendMessage } = useNukaWorker();
  const { activeView, setActiveView, handleCommand } = useCommandRouter();

  if (!bootComplete) return <BootScreen progress={progress} onEnter={() => setBootComplete(true)} />;

  return (
    <main className="flex h-screen w-full ...">
      <NukaSidebar
        messages={messages} isReady={isReady} progress={progress}
        activeView={activeView} onNavigate={setActiveView}
        onSend={(input) => {
          const { navigated } = handleCommand(input);
          if (!navigated) sendMessage(input, buildSystemPrompt(activeView));
        }}
      />
      <section className="flex-1 ...">
        <AnimatePresence mode="wait">{renderView(activeView, setActiveView)}</AnimatePresence>
      </section>
    </main>
  );
}
```

---

#### DONE WHEN
- [ ] `page.tsx` is under 60 lines
- [ ] `useNukaWorker` encapsulates all worker lifecycle — no worker refs in `page.tsx`
- [ ] `useCommandRouter` encapsulates all keyword logic — no keyword maps in `page.tsx`
- [ ] `NukaSidebar` renders identically to the current sidebar on desktop
- [ ] All existing features work: navigation, AI chat, onboarding messages, progress tracking
- [ ] TypeScript strict mode passes with no `any` escapes in the new files
- [ ] No regression in boot screen behaviour (T01)

---

#### BLOCKERS

```
BLOCKER T03-A: Worker must be initialised only once across React StrictMode double-invocation
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Use a module-level singleton ref pattern outside the hook, or
guard with useRef + initialised flag. Test in development mode (StrictMode active).

BLOCKER T03-B: visitorProfile state — currently in page.tsx, ownership unclear after refactor
TYPE: Design
STATUS: Open
RESOLUTION PATH: Move visitorProfile into useNukaWorker as it feeds the system prompt.
Or move to useCommandRouter if it influences routing. Decide before starting refactor.
```

---

### TICKET 04 — Fix Command Router & Add Contact View
**Priority**: P1  
**Label**: `navigation` `bug-fix` `ux`  
**Estimated effort**: 2–3 hours  
**Depends on**: T03

---

#### WHAT
Remove the arbitrary `words.length < 3` navigation gate. Replace with intent confidence scoring. Build a `ContactView.tsx` component sourced from `CONFIG.contact`. Wire `contact` into the routing system and navigation button list.

---

#### WHY
The current router silently rejects valid commands ("show me my projects" = 4 words, never navigates). The `contact` route silently shows `HeroView` — a bug that undermines trust. Both issues directly affect the recruiter experience, which is the primary audience.

---

#### HOW

**Files to create**: `src/components/views/ContactView.tsx`  
**Files to modify**: `src/hooks/useCommandRouter.ts`, `src/components/NukaSidebar.tsx`

**Revised routing logic**:
```ts
// Remove: if (matchedViewKey && words.length < 3)
// Replace with: score-based intent matching

function matchIntent(input: string): string | null {
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [view, keywords] of Object.entries(viewKeywords)) {
    const score = keywords.reduce((acc, k) => {
      if (input.includes(k)) return acc + (k.length > 5 ? 2 : 1); // longer keyword = more confident
      return acc;
    }, 0);
    if (score > bestScore) { bestScore = score; bestMatch = view; }
  }

  return bestScore > 0 ? bestMatch : null;
}
```

**ContactView.tsx structure**:
```tsx
// Reads from CONFIG.contact array
// Renders: name, role, location, email link, LinkedIn link, GitHub link
// Styled as a "transmission card" — consistent with lab aesthetic
// Include: CONFIG.workAuth as a small badge (Niederlassungserlaubnis)
```

**Navigation button list update**:
```ts
// Add 'Contact' to the nav items array in NukaSidebar.tsx
['About', 'Vision', 'Projects', 'Experience', 'Skills', 'Stack', 'Stats', 'Contact']
```

---

#### DONE WHEN
- [ ] "show me my projects" navigates to `projects` view correctly
- [ ] "tell me about his experience" navigates to `experience` view correctly
- [ ] Single-word commands (e.g. "skills") still navigate correctly
- [ ] `contact` button in navigation renders `ContactView`, not `HeroView`
- [ ] `ContactView` displays all fields from `CONFIG.contact` with working `href` links
- [ ] "Contact" appears in the Navigation Protocols button list
- [ ] No existing navigation routes are broken

---

#### BLOCKERS

```
BLOCKER T04-A: Ambiguous keywords may over-match
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Test the scoring function against a set of 20 sample inputs covering
edge cases (greetings, off-topic questions, compound requests). Add minimum score
threshold (score >= 2) to prevent single-word coincidental matches in longer sentences.
```

---

### TICKET 05 — AI Model Upgrade & Synthesis Reliability
**Priority**: P1  
**Label**: `ai` `reliability` `ux`  
**Estimated effort**: 5–7 hours  
**Depends on**: T03

---

#### WHAT
Replace SmolLM2-135M with Qwen2.5-1.5B-Instruct. Remove the warmup inference. Replace the fragile `INITIATING_SYNTHESIS` string-match with a deterministic structured synthesis trigger. Cap chat history at 8 turns. Fix onboarding sequence timing. Increase `max_new_tokens` to 512.

---

#### WHY
SmolLM2-135M cannot reliably follow structured system prompts or produce formatted output. The Synthesis feature — the most unique feature of the portfolio — silently fails for most users. Qwen2.5-1.5B is the smallest model that reliably handles structured JSON output and complex system prompts within an acceptable download size (~1GB quantised, cached after first visit).

---

#### HOW

**Files to modify**:
- `src/lib/worker.ts` — model swap, remove warmup, increase token limit
- `src/hooks/useNukaWorker.ts` — cap history, fix onboarding timing
- `src/components/NukaSidebar.tsx` — add Synthesize button
- `src/components/views/LabView.tsx` — accept structured data (detailed in T09)

**Model swap** (one line change):
```ts
// worker.ts
static model = 'Qwen/Qwen2.5-1.5B-Instruct'; // was: HuggingFaceTB/SmolLM2-135M-Instruct
```

**Remove warmup inference**:
```ts
// Delete this from useEffect:
worker.current.postMessage({ messages: [{ role: 'user', content: 'hello' }] });
// Progress is already tracked via progress_callback — warmup was redundant
```

**Chat history cap** (in `useNukaWorker`):
```ts
const MAX_TURNS = 8;
const chatHistory = messages
  .filter(m => m.sender !== 'sys' && !m.isTyping)
  .slice(-MAX_TURNS * 2) // *2 because each turn = user + assistant message
  .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
```

**Deterministic synthesis trigger**:
```tsx
// In NukaSidebar.tsx — a dedicated button, not reliant on model outputting a token
<button onClick={handleSynthesizeClick} disabled={!isReady}>
  ⚗ SYNTHESIZE REPORT
</button>

// handleSynthesizeClick fires a structured prompt:
const synthesisPrompt = `
You are Nuka. Generate a structured JSON synthesis report about Shahriar Haque Abir
based on this conversation context and visitor profile.
Respond ONLY with valid JSON, no markdown, no explanation:
{
  "summary": "2–3 sentence professional summary tailored to visitor's apparent interest",
  "highlights": ["key strength 1", "key strength 2", "key strength 3"],
  "recommendation": "one specific recommendation for the visitor",
  "nextSteps": ["action 1", "action 2"]
}
Context: ${JSON.stringify(visitorProfile)}
Experience: ${CONFIG.experience.map(e => e.role + ' at ' + e.company).join('; ')}
`;
```

**Parse synthesis output safely**:
```ts
try {
  const parsed = JSON.parse(cleanText) as ReportData;
  setReportData(parsed);
  setActiveView('lab');
} catch {
  // Fallback: show raw text in LabView graceful fallback state
  setActiveView('lab');
}
```

**Fix onboarding timing**:
```ts
// In useNukaWorker, only add onboarding messages when isReady transitions true:
useEffect(() => {
  if (isReady) {
    addSystemMessages([onboard1, onboard2, onboard3]);
  }
}, [isReady]);
```

**Worker token update**:
```ts
const output = await generator(messages, {
  max_new_tokens: 512, // was 256
  temperature: 0.7,
  do_sample: true,
});
```

---

#### DONE WHEN
- [ ] Model loads as `Qwen/Qwen2.5-1.5B-Instruct` (verify in Network tab)
- [ ] No `hello` inference fires on page load — only download progress events
- [ ] `[SYNTHESIZE REPORT]` button appears in sidebar and fires a structured prompt
- [ ] On success, `LabView` receives valid `ReportData` object (not raw string)
- [ ] On parse failure, `LabView` shows the graceful fallback message
- [ ] Chat history sent to worker never exceeds 16 messages (8 turns × 2)
- [ ] Onboarding messages only appear after `isReady = true`
- [ ] Existing conversational Q&A still works for general questions about Shahriar

---

#### BLOCKERS

```
BLOCKER T05-A: Qwen2.5-1.5B availability in Transformers.js WASM/WebGPU
TYPE: External
STATUS: Open
RESOLUTION PATH: Verify model exists on HuggingFace Hub with transformers.js-compatible
quantised weights. Check: https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct
If unavailable, fallback: Qwen/Qwen2.5-0.5B-Instruct (500MB, lower quality but available)
or Phi-3.5-mini-instruct.

BLOCKER T05-B: JSON output reliability — even 1.5B models may not always produce valid JSON
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Add JSON repair step before parsing: strip markdown fences, trim
whitespace, attempt JSON.parse, on failure attempt to extract JSON substring with regex
/{[\s\S]*}/ before falling back to graceful error state.

BLOCKER T05-C: ~1GB download on first visit may still be problematic
TYPE: UX
STATUS: Open
RESOLUTION PATH: Boot screen (T01) makes this acceptable. Document in README that
first visit requires ~1GB download and subsequent visits use cached weights.
```

---

### TICKET 06 — Cinematic View Transitions
**Priority**: P2  
**Label**: `animation` `ux` `visual`  
**Estimated effort**: 3–4 hours  
**Depends on**: T03

---

#### WHAT
Replace all `AnimatePresence` opacity/slide transitions with `clipPath` wipe reveals. Add large typographic section identity counters to `ExperienceView` and `ProjectsView`. Respect `prefers-reduced-motion`. Transition timing: 0.55s with `[0.22, 1, 0.36, 1]` cubic bezier.

---

#### WHY
Current view transitions are functional but generic. The reference sites (especially Victor Furuya) use cinematic scroll and wipe reveals that make navigation feel intentional — like turning the page of a high-end editorial. The transition itself communicates that this is a designed artefact, not a default template.

---

#### HOW

**Files to modify**: All view components in `src/components/views/`

**Universal transition variant** (create `src/lib/transitions.ts`):
```ts
export const pageVariants = {
  initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  animate: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    clipPath: 'inset(0 0 0 100%)',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.64, 0, 0.78, 0] }
  }
};

// Reduced motion fallback
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};
```

**Usage in each view**:
```tsx
const prefersReducedMotion = useReducedMotion();
const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;

<motion.div variants={variants} initial="initial" animate="animate" exit="exit">
  {/* view content */}
</motion.div>
```

**Section identity counter — ExperienceView**:
```tsx
// Large display number before timeline content
// Sources the number from CONFIG.experience[0].period calculation
<div className="relative mb-16">
  <span className="absolute -top-8 -left-4 text-[180px] font-syne font-black
    text-(--border) leading-none select-none pointer-events-none z-0 opacity-60">
    05
  </span>
  <div className="relative z-10">
    <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">
      — Career Trajectory
    </div>
    <h2 className="text-5xl font-syne font-black mb-12">Experience</h2>
  </div>
</div>
```

**Apply the same pattern** to `ProjectsView` (counter = number of projects from `CONFIG.projects.length`).

---

#### DONE WHEN
- [ ] Navigating between any two views shows a left-to-right wipe enter and right-to-left wipe exit
- [ ] `ExperienceView` opens with a large `05` display number behind the section header
- [ ] `ProjectsView` opens with the project count as a large display number
- [ ] On a device with `prefers-reduced-motion: reduce`, transitions use simple opacity fade
- [ ] Transitions trigger for both button-click navigation and typed command navigation
- [ ] No layout shift or content flash during transition

---

#### BLOCKERS

```
BLOCKER T06-A: clipPath transition may clip child overflow (dropdowns, tooltips)
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Ensure all view components use overflow-visible for interactive
child elements. Apply clipPath only to the outermost motion.div wrapper, not inner
interactive elements.
```

---

### TICKET 07 — Live-Drawing Chart Animations
**Priority**: P2  
**Label**: `animation` `data-visualisation` `content`  
**Estimated effort**: 3–4 hours  
**Depends on**: T03

---

#### WHAT
Add real per-group proficiency values to `CONFIG`. Animate the radar chart from 0 to final values on mount. Animate the career timeline line drawing top-to-bottom with sequential node reveals. Charts animate once per mount — no re-triggers on re-render.

---

#### WHY
The current radar chart displays all values at 85 — a geometric circle that communicates nothing. The career timeline appears instantly with no narrative pacing. The reference site SubstrateRx shows that data visualisations that draw themselves feel live and technical — they make the visitor pay attention.

---

#### HOW

**Files to modify**:
- `src/lib/data.ts` — add `proficiency` to each skill group
- `src/components/views/SkillsView.tsx` — animated radar
- `src/components/views/ExperienceView.tsx` — animated timeline

**`data.ts` skill group update**:
```ts
skills: [
  { group: "Core Competencies",    proficiency: 90, items: [...] },
  { group: "Customer / Consulting", proficiency: 88, items: [...] },
  { group: "Technical / Systems",   proficiency: 82, items: [...] },
  { group: "Languages",             proficiency: 75, items: [...] },
  { group: "Certifications",        proficiency: 70, items: [...] }
]
```

**Radar chart animation** (`SkillsView.tsx`):
```ts
// On mount, animate dataset values from 0 to real proficiency over 1200ms
const [chartValues, setChartValues] = useState(skillsGroups.map(() => 0));
const hasAnimated = useRef(false);

useEffect(() => {
  if (hasAnimated.current) return;
  hasAnimated.current = true;
  const targets = skillsGroups.map(g => g.proficiency);
  const duration = 1200;
  const start = performance.now();

  const animate = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    setChartValues(targets.map(t => t * eased));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}, []);
```

**Timeline line animation** (`ExperienceView.tsx`):
```tsx
// SVG line that draws from top to bottom using pathLength animation
// Each node (company card) reveals sequentially after the line reaches it
<motion.div
  className="absolute left-4 top-0 bottom-0 w-px bg-(--border)"
  initial={{ scaleY: 0, originY: 0 }}
  animate={{ scaleY: 1 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
/>
{CONFIG.experience.map((exp, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
  >
    {/* experience card */}
  </motion.div>
))}
```

---

#### DONE WHEN
- [ ] `CONFIG.skills` has a `proficiency` field on every group with a value between 0–100
- [ ] Radar chart renders different values per axis (not a perfect circle)
- [ ] On `SkillsView` mount, radar values animate from 0 to real values over ~1.2s
- [ ] Animation plays once per mount, does not re-trigger on re-render or tab switch
- [ ] Career timeline line draws top-to-bottom, nodes reveal sequentially
- [ ] All animations degrade gracefully if `requestAnimationFrame` is unavailable

---

#### BLOCKERS

```
BLOCKER T07-A: Chart.js dataset updates may not trigger re-render smoothly
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Use chart.js update() method directly via ref if React state
updates cause flicker. Alternative: use chartjs-plugin-deferred for built-in
scroll-triggered animation.
```

---

### TICKET 08 — Hero View Scattered Objects
**Priority**: P2  
**Label**: `visual` `identity` `interaction`  
**Estimated effort**: 5–6 hours  
**Depends on**: T06

---

#### WHAT
Add 5 cursor-reactive, absolutely-positioned artifact objects to `HeroView`. Each object represents a piece of Shahriar's technical identity. All object content is sourced from `CONFIG`. Desktop-only — hidden on mobile.

---

#### WHY
The current `HeroView` is a standard heading/tagline layout. Yan Liu's portfolio demonstrates that scattered objects communicating personality and technical context — before any resume content appears — create an immediate, memorable impression. For a Solution Consultant / Technical Engineer, the objects *are* the brief: they signal competence, precision, and personality at a glance.

---

#### HOW

**Files to modify**: `src/components/views/HeroView.tsx`  
**Dependency**: `useMotionValue`, `useTransform` from Framer Motion (already installed)

**The 5 objects** (all content sourced from CONFIG):
```
Object 1: Mini terminal window
  Content: "$ docker compose up -d" (from Self-Hosted AI Stack project)
  Position: top-right, rotate(-3deg)
  Depth: 0.04

Object 2: Network topology SVG
  Content: 3-node SVG diagram (representing Network Discovery project)
  Position: bottom-left, rotate(2deg)
  Depth: 0.02

Object 3: JSON fragment
  Content: { "endpoint": "/api/rag", "status": "OK" } (from RAG API project)
  Position: top-left, rotate(-5deg)
  Depth: 0.06

Object 4: Stat badge
  Content: "≥ 40 cases / week" (from CONFIG.experience[0].points)
  Position: mid-right, rotate(4deg)
  Depth: 0.03

Object 5: Coordinates label
  Content: "52.5200° N  13.4050° E — Berlin" (from CONFIG.location)
  Position: bottom-right, rotate(-2deg)
  Depth: 0.08
```

**Parallax implementation**:
```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const handleMouseMove = (e: React.MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX.set(e.clientX - rect.left - rect.width / 2);
  mouseY.set(e.clientY - rect.top - rect.height / 2);
};

// Per-object transform (depth varies per object)
function useParallax(depth: number) {
  const x = useTransform(mouseX, v => v * depth);
  const y = useTransform(mouseY, v => v * depth);
  return { x, y };
}
```

**Object base styling**:
```tsx
// Each object is a motion.div with:
// - absolute positioning
// - font-mono text-[10px] or text-[9px]
// - bg-white border border-(--border) p-3 rounded-sm shadow-sm
// - initial rotate from its defined variance
// - hover: scale(1.05), z-index bump, shadow-lg
// - hidden on md:hidden (mobile)
```

---

#### DONE WHEN
- [ ] 5 objects are visible in `HeroView` on desktop (≥1280px)
- [ ] Each object moves subtly in response to cursor movement at its assigned depth
- [ ] Objects are hidden (`hidden md:block` equivalent) on screens ≤768px
- [ ] All text content in objects is sourced from `CONFIG` — no hardcoded personal data
- [ ] Hover state brings the hovered object visually forward (z-index + shadow)
- [ ] Objects do not obstruct the main hero heading or CTA
- [ ] Page performance is not degraded — `useMotionValue` updates do not cause React re-renders

---

#### BLOCKERS

```
BLOCKER T08-A: Absolute positioning may cause objects to overlap hero content
  on non-standard viewport widths
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Test at 1024px, 1280px, 1440px, 1920px. Use viewport-relative
positioning (vw/vh) rather than fixed px offsets for object placement. Add
pointer-events-none to objects to ensure they never block text selection or clicks.

BLOCKER T08-B: Mouse event listener on HeroView container may conflict with
  Lenis smooth scroll
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Use window-level mousemove listener in useEffect rather than
onMouseMove on the component. Ensure cleanup on unmount.
```

---

### TICKET 09 — LabView Structured Report Renderer
**Priority**: P2  
**Label**: `ai` `ux` `visual`  
**Estimated effort**: 3–4 hours  
**Depends on**: T05

---

#### WHAT
Redesign `LabView.tsx` to accept a typed `ReportData` object instead of a raw `context` string. Render each field as a distinct styled section. Add `[REGENERATE]` and `[COPY REPORT]` actions. Animate sections in sequentially on mount. Handle null/parse-failure gracefully.

---

#### WHY
The current `LabView` wraps unformatted model output in a single `<p>` tag. The elaborate lab-protocol framing (`LAB_PROTO_402`, shadow, border) frames what is effectively a text dump. After T05 provides structured JSON output, this component can finally deliver what the framing promises: a real, structured, scannable report.

---

#### HOW

**Files to modify**: `src/components/views/LabView.tsx`

**TypeScript interface** (create in `src/lib/types.ts` or inline):
```ts
export interface ReportData {
  summary: string;
  highlights: string[];
  recommendation: string;
  nextSteps: string[];
}

// Updated component props
interface LabViewProps {
  reportData: ReportData | null;
  onRegenerate: () => void;
}
```

**Section rendering**:
```tsx
// Summary — large editorial paragraph
<motion.div variants={sectionVariant} custom={0}>
  <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-3">
    SYNTHESIS SUMMARY
  </div>
  <p className="text-xl font-inter leading-relaxed text-(--text)">
    {reportData.summary}
  </p>
</motion.div>

// Highlights — horizontal badge row
<motion.div variants={sectionVariant} custom={1}>
  <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-3">
    KEY HIGHLIGHTS
  </div>
  <div className="flex flex-wrap gap-2">
    {reportData.highlights.map((h, i) => (
      <span key={i} className="font-mono text-[10px] px-3 py-1.5 border border-(--border)
        text-(--text) uppercase font-bold tracking-tighter">
        {h}
      </span>
    ))}
  </div>
</motion.div>

// Recommendation — accent left-border callout
<motion.div variants={sectionVariant} custom={2}
  className="border-l-2 border-(--accent) pl-6 py-2">
  <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-2">
    RECOMMENDATION
  </div>
  <p className="text-sm font-inter text-(--text) leading-relaxed">
    {reportData.recommendation}
  </p>
</motion.div>

// Next Steps — numbered mono list
<motion.div variants={sectionVariant} custom={3}>
  <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-3">
    NEXT STEPS
  </div>
  {reportData.nextSteps.map((step, i) => (
    <div key={i} className="flex gap-4 items-start mb-3">
      <span className="font-mono text-[9px] text-(--accent) shrink-0 mt-1">
        {String(i + 1).padStart(2, '0')} /
      </span>
      <span className="text-sm font-inter text-(--text-muted)">{step}</span>
    </div>
  ))}
</motion.div>
```

**Stagger animation**:
```ts
const sectionVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' }
  })
};
```

**Timestamp in header badge**:
```tsx
// Replace static LAB_PROTO_402 with:
<div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-(--text-muted) border-l border-b border-(--border)">
  LAB_PROTO_402 · {new Date().toISOString().slice(0, 16).replace('T', ' ')}
</div>
```

**Action buttons**:
```tsx
<div className="flex gap-4 mt-8">
  <button onClick={onRegenerate}
    className="font-mono text-[10px] px-4 py-2 border border-(--border) uppercase
    tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all">
    ⟳ REGENERATE
  </button>
  <button onClick={() => navigator.clipboard.writeText(JSON.stringify(reportData, null, 2))}
    className="font-mono text-[10px] px-4 py-2 border border-(--border) uppercase
    tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all">
    ⎘ COPY REPORT
  </button>
</div>
```

**Graceful fallback**:
```tsx
if (!reportData) return (
  <div className="font-mono text-sm text-(--text-muted) p-10 border border-(--border)">
    Synthesis incomplete — ask Nuka to generate a custom report for you.
  </div>
);
```

---

#### DONE WHEN
- [ ] `LabView` accepts `ReportData | null` prop (no longer accepts raw `context: string`)
- [ ] Each of the four sections (summary, highlights, recommendation, nextSteps) renders as a visually distinct block
- [ ] Sections animate in sequentially with 150ms stagger on mount
- [ ] Timestamp in the `LAB_PROTO_402` badge shows the actual generation time
- [ ] `[REGENERATE]` button fires `onRegenerate` callback (which re-triggers synthesis in T05)
- [ ] `[COPY REPORT]` copies JSON to clipboard and shows brief `"Copied"` confirmation
- [ ] `null` reportData shows the fallback message, not an error or blank screen
- [ ] Layout is responsive — all sections stack cleanly on mobile (≤768px)

---

#### BLOCKERS

```
BLOCKER T09-A: LabView prop interface change will break current call sites in page.tsx
TYPE: Technical
STATUS: Open
RESOLUTION PATH: After T05 is complete, update renderView() in page.tsx to pass
reportData instead of context. This is a coordinated change — T09 and T05 must
land together or feature-flag the old interface until both are ready.

BLOCKER T09-B: navigator.clipboard requires HTTPS
TYPE: Technical
STATUS: Open
RESOLUTION PATH: Site is deployed to Vercel/Netlify (always HTTPS). Local dev
uses localhost (also clipboard-eligible). No action needed for production.
```

---

## Risk Register

| ID | Description | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R01 | Qwen2.5-1.5B not available in Transformers.js with WASM/WebGPU quantisation | M | H | Pre-verify before sprint starts. Fallback: Qwen2.5-0.5B or Phi-3.5-mini. Document fallback in T05. |
| R02 | ~1GB model download causes first-visit abandonment despite boot screen | M | M | Boot screen (T01) makes browsing possible immediately. Add note in boot screen: "AI cached after first visit." Monitor with Vercel Analytics. |
| R03 | Framer Motion `clipPath` transitions cause Safari rendering bugs | L | M | Test on Safari 17+ before merging T06. Fallback: use `x` translate instead of clipPath on Safari detection. |
| R04 | T03 refactor introduces regressions in AI message handling | M | H | Write a manual test checklist covering all message states before starting T03. Run checklist after every major extraction step, not just at the end. |
| R05 | Lenis smooth scroll conflicts with mobile bottom sheet scroll (T02) | L | M | Disable Lenis on mobile at init. Use native scroll within bottom sheet. Low risk since Lenis is already conditionally applied. |

---

## Definition of Sprint Success

The sprint is complete when all of the following are true:

**Experience**
- [ ] A first-time visitor on mobile can browse the full portfolio without waiting for AI
- [ ] A first-time visitor on desktop sees the boot sequence, enters, and can ask Nuka a question within 30 seconds
- [ ] Clicking `[SYNTHESIZE REPORT]` produces a structured, multi-section report every time (not just when the model decides to emit a token)
- [ ] All 9 navigation destinations work reliably via button and typed command

**Code quality**
- [ ] `page.tsx` is under 60 lines
- [ ] No TypeScript `any` in newly created files
- [ ] All personal data is sourced from `CONFIG` — zero hardcoded strings in view components

**Visual**
- [ ] View transitions use clipPath wipes, not opacity fades
- [ ] Radar chart displays real non-uniform proficiency values
- [ ] Hero view has 5 cursor-reactive artifact objects on desktop
- [ ] Career timeline line draws itself on mount

**Reliability**
- [ ] The `contact` command and button route to `ContactView`, not `HeroView`
- [ ] Natural language navigation commands of any length work correctly
- [ ] Chat history is capped — a 30-message conversation does not degrade AI response quality

---

*Sprint Plan v1.0 — Nuka Design Laboratory*  
*Prepared by: Antigravity AI × Claude*  
*Status: READY FOR EXECUTION*
