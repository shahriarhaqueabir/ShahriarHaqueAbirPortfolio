# Full Portfolio Audit Report
**Date:** 2026-06-07 | **Branch:** feat/ai-footer-layout | **Build:** ✅ Pass | **Tests:** 4/4 ✅

---

## TL;DR — Critical (Fix Before Proceeding)

| # | Finding | Area | File | Effort |
|---|---------|------|------|--------|
| C1 | **Browser back button broken** — `popstate` listener missing | Nav/Routing | `PortfolioShell.tsx` | 15 min |
| C2 | **`/stack` and `/vision` routes missing** — 404 on refresh/direct access | Nav/Routing | `src/app/stack/`, `src/app/vision/` | 10 min |
| C3 | **`font-syne` / `font-playfair` not in Tailwind v4 `@theme`** — all `font-syne` classes fall back to serif | UI | `globals.css:3-7` | 5 min |
| C4 | **AboutView `useScroll` targets `window` instead of custom scroll container** — parallax broken | UI | `AboutView.tsx:47-50` | 30 min |
| C5 | **Stale closure in `sendMessage`** — captures `messages` by value; `handleHeroAiQuery` setTimeout worsens it | AI/State | `usePortfolioWorker.ts:623` | 30 min |
| C6 | **VisitorProfile sent to worker is always one render behind** — AI gets stale profile data | AI/State | `usePortfolioWorker.ts:636` | 15 min |
| C7 | **Module-level mutable state** — unsafe with React concurrent features, no crash recovery | AI/State | `usePortfolioWorker.ts:11-15` | 1 hr |
| C8 | **Unbounded `messages` array** — grows indefinitely, no pruning | AI/State | `usePortfolioWorker.ts` (all setMessages) | 30 min |
| C9 | **State mutation inside `setMessages` updater** — mutates prev's object directly | AI/State | `usePortfolioWorker.ts:461-497` | 10 min |

---

## 1. HIGH — Fix in This Session

### 1.1 Navigation & Routing

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| H1 | **No `popstate` listener** | `pushState` is called on navigation but no `popstate` handler. Back button changes URL but not active view. | Add `useEffect` with `popstate` listener in `PortfolioShell.tsx` |
| H2 | **Missing route files** | `/stack` and `/vision` are valid ViewKeys with full component implementations but have no `src/app/stack/page.tsx` or `src/app/vision/page.tsx` — direct access or refresh gives 404 | Add two route files |
| H3 | **Missing rail buttons** | `stack` and `vision` have no nav buttons in `IconRail.tsx` — users can't reach them without AI commands | Add 2 nav items |
| H4 | **`stack`/`vision` missing from sitemap** | Present in renderer and commands, absent from sitemap.xml | Update `sitemap.ts` |
| H5 | **GuidedNext doesn't suggest `vision`** | No `nextViews` points to `vision` — unreachable from guided paths | Add `"vision"` to a `nextViews` array in `experience-model.ts` |

### 1.2 UI & Accessibility

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| H6 | **`font-syne`/`font-playfair` not in `@theme`** | Tailwind v4 only generates `font-*` utilities for vars in `@theme`. These fonts are declared in `:root` but not in `@theme`. All `font-syne` classes silently fall back to browser serif. | Add `--font-syne` and `--font-playfair` to `@theme {}` block |
| H7 | **AboutView parallax broken** | `useScroll()` (defaults to `window`) but content scrolls in a custom `overflow-y-auto` container | Pass `contentScrollRef` to `useScroll()` or use context |
| H8 | **No `prefers-reduced-motion`** | All framer-motion animations, orbit rotations, particle fields play even for users who requested reduced motion | Wrap in `<MotionConfig reducedMotion="user">` |
| H9 | **No mobile nav for non-AI users** | IconRail is `hidden md:flex`. On mobile, the only way to navigate sections is through the AI panel (requires AI opt-in). Non-AI users have no section nav. | Add hamburger menu or persistent mobile nav bar |
| H10| **`scrollTo` invalid `behavior: "instant"`** | `"instant"` is not a valid ScrollBehavior — call silently fails | Replace with `{ top: 0, left: 0 }` or `"smooth"` |

### 1.3 AI & State

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| H11 | **Stale `messages` in `sendMessage`** | Closes over `messages` from render cycle. `handleHeroAiQuery` wraps in 200ms timeout, making stale read more likely. | Use functional updater `setMessages(prev => ...)` |
| H12 | **VisitorProfile sent to worker is stale** | Ref syncs in post-render effect, but `sendMessage` reads it synchronously — always one render behind | Update ref synchronously in the handler |
| H13 | **Module-level mutable state** | `sharedWorker`, `initialLoadDone`, etc. are module-level vars. No crash recovery if worker dies. | Move to `useRef` inside hook + add crash recovery |
| H14 | **Unbounded message array** | `messages` appended to but never trimmed. Long conversations cause memory growth and slow renders (`.filter()`, `.find()` iterate full array). | Prune to last 50-100 messages |
| H15 | **Object mutation in state updater** | `lastMsg.text = cleanText` mutates the previous state object directly inside `setMessages(prev => ...)` | Spread: `{ ...lastMsg, text: cleanText }` |

---

## 2. MEDIUM — Fix in Next Session

### 2.1 Code Architecture

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| M1 | **`usePortfolioWorker` god hook (653 lines)** | Contains 14+ helper functions, worker lifecycle, profile inference, fallback gen, chat history. Module-level mutable state. | Extract pure helpers to `src/lib/ai-helpers.ts` |
| M2 | **Duplicate nav items array** | `IconRail.tsx` and `AiGuidePanel.tsx` both define the same `desktopRailItems` array | Extract to `src/lib/navigation.ts` |
| M3 | **Duplicate path logic** | `view === "hero" ? "/" : `/${view}`` appears twice in `PortfolioShell.tsx` | Extract to `const viewToPath = (v: ViewKey) => ...` |
| M4 | **Duplicate interest detection** | `detectInterests` in `useCommandRouter.ts` and interest matching in `inferVisitorProfile` in `usePortfolioWorker.ts` have nearly identical logic | Export once, import in both |
| M5 | **Magic 200ms timeout in `handleHeroAiQuery`** | No cleanup, stale closure risk, undocumented | Add ref tracking + cleanup, or promise-based wait for readiness |

### 2.2 Navigation

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| M6 | **Initial view relies only on prop** | No startup path-sync effect; if shell mounts on wrong URL, view is wrong | Add `useEffect` to read `location.pathname` at mount |
| M7 | **`isExplicitNavigationCommand` false positives** | "show me the AI systems you've built" navigates to Projects instead of answering | Add secondary heuristic: if input has content words beyond view name, prefer answering |
| M8 | **Keyword collision: `skills` vs `stack`** | Both share "tools", "stack" keywords — tied scores resolve by insertion order | Add discriminating keywords to each |

### 2.3 UI

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| M9 | **AiGuideFooter toast uses light-mode colors** | `bg-green-50`, `text-green-800`, `border-green-200` clash with dark HUD theme | Use dark-theme green variants |
| M10| **AiGuidePanel missing dialog ARIA** | No `role="dialog"`, `aria-modal`, `aria-labelledby` | Add ARIA attributes |
| M11| **No custom focus-visible** | Default browser outline may be invisible on `#030509` background | Add `:focus-visible` styles |
| M12| **StatsView hardcoded `bg-[#030509]`** | Duplicates `--bg` value instead of referencing it | Replace with `bg-(--bg)` |
| M13| **`pb-[180px]` hardcoded for footer clearance** | Fragile if footer height changes | Use CSS `calc()` or ResizeObserver |
| M14| **ProjectsView "View All Projects" navigates to Experience** | Button label says "View All Projects" but navigates to `/experience` | Rename or change destination |
| M15| **Blog posts rendered in full** | No truncation, 3 full posts = very long page | Add "Read more" toggle |
| M16| **`Date.now()` message IDs can collide** | Two messages in same ms get same key | Use counter ref or `crypto.randomUUID()` |

### 2.4 Code Cleanup

| # | Finding | Detail | Fix |
|---|---------|--------|-----|
| M17| **`LenisProvider.tsx` dead code** | Declared but never imported | Delete file + remove `lenis` dep |
| M18| **Unused npm deps** | `clsx`, `tailwind-merge`, `chart.js`, `react-chartjs-2` never imported | Remove from `package.json` |
| M19| **`TechIcon.tsx` barrel imports** | `import * as Si from "react-icons/si"` imports entire library | Use named imports |

---

## 3. LOW — Nice to Have

| # | Finding | Detail |
|---|---------|--------|
| L1 | **Duplicate type defs** | `RouterMemory` (worker.ts:26-31) and `ConversationState` (router.ts:13-18) are structurally identical | Merge into `src/lib/types.ts` |
| L2 | **TypewriterText 16ms interval** | Barely perceptible typewriter effect; increase to 30-50ms |
| L3 | **StatsView particle count (96)** | Decrease to 30-40 for performance |
| L4 | **SVG noise filter performance** | `feTurbulence baseFrequency="0.65"` is heavy; reduce to 0.3-0.4 or use static PNG |
| L5 | **Dead link in ProjectsView** | "Preview" button calls `setView("hero")` — placeholder only |
| L6 | **Missing `not-found.tsx` and `error.tsx`** | Default Next.js 404/error pages shown on unknown routes |
| L7 | **No unit tests for any hook** | `useCommandRouter`, `useBootGate`, `usePortfolioWorker` have zero tests |
| L8 | **AiGuidePanel auto-scroll ignores user scroll position** | If user scrolled up to read history, new message yanks them to bottom |
| L9 | **`enableLocalAi` stale closure** | `useCallback` with empty deps captures initial `localAiFallbackReason` |
| L10| **`useBootGate` causes flash** | `isBooting` defaults to `true`, then flips to `false` on every load for returning users | Compute initial state synchronously from `sessionStorage` |
| L11| **TypewriterText internal `clearInterval`** | Redundant — effect cleanup already handles it | Remove internal clear |
| L12| **Viewport animation presets duplicated** | Each view defines its own `{ once: false, amount: 0.42 }` etc. |

---

## 4. What's Actually Working Well

| Area | Status |
|------|--------|
| **Build** | ✅ Compiles successfully, all routes generated |
| **E2E Tests** | ✅ 4/4 passing (homepage load, nav, scroll reset, command routing) |
| **TypeScript** | ✅ Clean compile — no type errors |
| **Type System** | ✅ `ViewKey` union is exhaustive (10 values) and consistently used across renderer, router, worker, and experience model |
| **Content Data** | ✅ All sections populated (profile, projects, experience, skills, blog, contact, certifications) |
| **SEO** | ✅ Comprehensive — OpenGraph, Twitter cards, JSON-LD Person schema, sitemap, robots.txt |
| **Theme System** | ✅ Consistent CSS variable usage (`--bg`, `--text`, `--accent`, `--border`) in ~95% of components |
| **AI Fallback** | ✅ Graceful degradation from WebLLM → keyword-based fallback |
| **Container Scroll** | ✅ Custom scroll container with `pb-[180px]` footer clearance |

---

## 5. Recommended Next Steps

### Immediate (before icon/color work)
1. Fix C3 — `@theme` font vars (5 min)
2. Fix C4 — `useScroll` container target (30 min)
3. Fix C1 — `popstate` listener (15 min)
4. Fix C2 — Add `/stack` and `/vision` route files (10 min)
5. Fix H3 — Add rail buttons for stack + vision (5 min)

### Icon & Color Implementation (original task)
6. Download svgl SVGs for nav rail + TechIcon
7. Implement section color map + colored active states in IconRail
8. Rewrite TechIcon with inline svgl SVGs
9. Update spec and proceed with implementation plan

### State Hardening (next session)
10. Fix C5 — Stale `sendMessage` closure
11. Fix C6 — VisitorProfile ref lag
12. Fix C7 — Module-level mutable state → `useRef`
13. Fix C8 — Message pruning
14. Fix C9 — State mutation in updater

### Polish (next session)
15. Add `prefers-reduced-motion` support
16. Fix AiGuideFooter toast colors
17. Add mobile nav for non-AI users
18. Add `not-found.tsx` and `error.tsx`
19. Remove dead code (LenisProvider, unused deps)
20. Add hook unit tests

---

## 6. Audit Scores

| Area | Score | Key Issue |
|------|-------|-----------|
| **Architecture** | B+ | `usePortfolioWorker` god hook, some duplicated logic |
| **UI Quality** | B+ | Broken parallax, font utility gap, no reduced-motion support |
| **AI/State Robustness** | 5.8/10 | Stale closures, module-level mutable state, unbounded array |
| **Navigation/Routing** | B | Missing popstate handler, missing routes for stack/vision |
| **Code Quality** | B | Clean types, some duplication, dead code |
| **Error Handling** | B | Worker errors caught, but no crash recovery, no error boundary |
| **Accessibility** | C+ | Missing ARIA on panel, no focus-visible, no reduced motion |
| **Test Coverage** | D | 4 e2e tests but zero unit tests for any hook |
| **Build & Tooling** | A | Clean build, passing tests, comprehensive metadata |
