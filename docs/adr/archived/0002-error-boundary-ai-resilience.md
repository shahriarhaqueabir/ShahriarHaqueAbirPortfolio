# ADR-0002: ErrorBoundary Components for AI Feature Resilience

**Date**: 2026-06-28
**Status**: accepted
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

The portfolio includes AI-powered features: a local WebLLM inference engine, ElevenLabs voice input/output, and a conversation panel. These features depend on browser APIs (Web Workers, AudioContext, Web Speech API) that can fail nondeterministically — missing WASM support, audio permission denied, out-of-memory on mobile, or model load failure. Without isolation, a crash in any of these features would take down the entire portfolio page via an uncaught React render error. The app has no server-side rendering fallback for these client-only features.

## Decision

Wrap AI-dependent component trees in React class-based `ErrorBoundary` components. Two boundary layers exist:

1. **Content boundary** — wraps `PortfolioViewRenderer` in `PortfolioShell.tsx` to protect the main portfolio content from render errors
2. **AI boundary** — wraps both `AiGuideFooter` and `AiGuidePanel` in a shared `ErrorBoundary` to isolate AI feature failures from the rest of the UI

The `ErrorBoundary` component displays a compact fallback UI with a retry button that resets the error state. In development mode, errors are logged to the console for debugging.

## Alternatives Considered

### Alternative 1: Inline try/catch in every AI hook
- **Pros**: Granular error handling at the hook level
- **Cons**: Requires wrapping every async operation; easy to miss edge cases; does not catch render-time errors; clutters hook code with error state management
- **Why not**: ErrorBoundary catches render errors that try/catch cannot; less invasive to existing hook logic

### Alternative 2: `window.onerror` global handler
- **Pros**: Catches everything
- **Cons**: Cannot provide component-level recovery; reset would reload the entire page; poor UX for minor AI failures
- **Why not**: Too coarse-grained; the portfolio should recover individual features without full page reload

## Consequences

### Positive
- AI feature failures are contained — the rest of the portfolio remains fully functional
- Retry mechanism lets users recover AI features without page reload
- Follows React's established error boundary pattern
- Development-mode logging aids debugging without exposing internals to users

### Negative
- Error boundaries cannot catch errors in event handlers or async code — hooks must still handle those internally
- Adds two wrapper components to the render tree (negligible perf impact)

### Risks
- If both ErrorBoundary instances catch errors simultaneously, the AI panel could show two redundant fallback UIs — acceptable trade-off
