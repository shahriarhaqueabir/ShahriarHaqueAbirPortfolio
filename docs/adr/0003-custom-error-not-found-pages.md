# ADR-0003: Custom Error and Not-Found Pages

**Date**: 2026-06-28
**Status**: accepted
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

Next.js provides default error and 404 pages that do not match the portfolio's dark terminal aesthetic. Without custom `error.tsx` and `not-found.tsx` files, users encountering a runtime error or navigating to an invalid route would see the generic Next.js white page with minimal branding. The portfolio has a specific visual identity: dark background (`#0a0a0f`), cyan accent (`#38bdf8`), and a dual-typeface system (Syne for headings, JetBrains Mono for UI text).

## Decision

Create two custom error boundary pages in `src/app/`:

1. **`error.tsx`** — A client component that renders "System fault" with a retry button, logged error details in development, and the portfolio's branding. Uses full font loading to match the rest of the site.

2. **`not-found.tsx`** — A server component that renders "Page not found" with a link back to the homepage. Shares the same visual design as the error page.

Both pages are self-contained with their own `<html>` and `<body>` tags (required by Next.js for error boundary pages) and use the same `Syne`/`JetBrains_Mono` typeface system and cyan accent palette as the main layout.

## Alternatives Considered

### Alternative 1: Minimal unstyled pages
- **Pros**: Zero design effort; fast to implement
- **Cons**: Jarring visual break when users hit an error; erodes trust in the portfolio's quality; no recovery path offered
- **Why not**: A portfolio is a design showcase — every page, including error states, should be coherent

### Alternative 2: Redirect to homepage on error
- **Pros**: Simplest user experience
- **Cons**: Hides the error; users lose their place; no opportunity to retry; bad for debugging
- **Why not**: The retry pattern gives users agency; the error message is honest and transparent

## Consequences

### Positive
- Cohesive brand experience across all states (happy path, error, not-found)
- Users can recover from transient errors via the retry button
- 404 page guides users back to the homepage naturally
- Development-mode logging aids debugging without exposing internals

### Negative
- Error page must load fonts independently (duplicate font loading from main layout, but acceptable for error boundary pages)
- `error.tsx` is a client component and cannot use server components for its fallback

### Risks
- If font loading fails on the error page, the page renders in system fonts — the content and CTAs remain accessible
