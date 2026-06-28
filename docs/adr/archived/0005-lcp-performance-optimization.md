# ADR-0005: LCP Performance Optimization via Dynamic Import and Deferred Hook Loading

**Date**: 2026-06-28
**Status**: superseded by ADR-0006
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

Lighthouse performance audits revealed a critical LCP issue on the portfolio homepage: the hero image (`profile.jpg`) downloaded in ~197ms but wasn't painted until ~1,274ms — a 995-1,076ms render delay. The root cause was main-thread blocking by React hydration, Framer Motion initialization, and eager hook evaluation inside `PortfolioShell`, which is the top-level client component rendered directly by `page.tsx`.

Key constraints:
- The portfolio uses Next.js 16 with webpack bundling
- The AI guide panel (tsparticles, voice hooks, TTS) adds significant JS weight
- The existing `PortfolioViewRenderer` already dynamically imports views, but `PortfolioShell` itself was a direct import
- Build needed to continue passing with `--webpack` flag

## Decision

We applied three changes to reduce LCP render delay:

1. **Dynamic import of `PortfolioShell` (initial approach, later reverted)**: Created `PortfolioShellLoader` — a thin client wrapper using `next/dynamic` with `ssr: false` — and updated `page.tsx` to render the loader instead of importing `PortfolioShell` directly. This was later reverted (see ADR-0006) because `ssr: false` caused a blank page until JS loaded — the shell was hidden behind a React Suspense boundary with `hidden` attribute.

2. **Moved voice hooks into lazy-loaded `AiGuidePanel`**: `useVoiceInput()` and `useVoiceOutput()` were previously called eagerly in `PortfolioShell` (participating in hydration) even though their results only flowed into `AiGuidePanel`, which was already lazy-loaded via `React.lazy()` + `Suspense`. Relocated the hook calls into `AiGuidePanel` and removed them from `PortfolioShell`'s props and imports.

3. **Explicit high-priority preload for hero image**: Added `<link rel="preload" href="/profile.jpg" as="image" fetchPriority="high">` to the root layout so the LCP image is discovered and prioritized during HTML parsing, independent of Next.js Image component's own preload generation.

## Alternatives Considered

### Alternative 1: Preload via HTTP Link header
- **Pros**: Discovers the image before HTML parsing even begins
- **Cons**: Requires server configuration changes; Next.js static export doesn't support custom HTTP headers per-page
- **Why not**: The `<link>` tag approach works within Next.js's static generation model and React 19 hoists it to `<head>`. An HTTP header would be additive but isn't feasible in the static deployment model.

### Alternative 2: Eagerly preload profile.jpg in `next.config.js`
- **Pros**: Centralized configuration
- **Cons**: Next.js doesn't expose a standard API for adding `Link` headers to static pages; the Image component's `priority` prop already generates a preload
- **Why not**: The generated preload lacks `fetchPriority="high"`, which the performance audit flagged as necessary.

### Alternative 3: Deferred custom hooks via `useDeferredValue`
- **Pros**: No structural component changes needed
- **Cons**: React's `useDeferredValue` defers state updates but doesn't prevent hook initialization from running during hydration
- **Why not**: The hooks themselves (with their `useEffect` calls, refs, and state) still run during hydration. Only moving them into a code-split component truly removes their code from the critical path.

## Consequences

### Positive
- Voice hooks (SpeechRecognition init, TTS setup) only load when the AI guide panel is about to mount
- Explicit `fetchPriority="high"` ensures profile.jpg is prioritized even on congested networks
- No breaking changes — all routes, APIs, and existing behavior preserved

### Negative
- The `ssr: false` dynamic import approach was reverted (see ADR-0006) because it created an invisible initial render — the shell content was hidden behind a Suspense boundary and only revealed after JS hydrated
- The dynamic import was replaced with a direct import of `PortfolioShell` in `page.tsx`, relying on Next.js static generation to produce the initial HTML

### Risks
- None remaining — the final approach (direct import) is the standard Next.js pattern for `"use client"` components rendering static content
