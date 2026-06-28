# ADR-0001: Use Next.js App Router with SSG

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The portfolio needs fast initial page loads, good SEO, and the ability to deploy to Vercel's free tier. There are seven static views (Hero, About, Projects, Experience, Skills, Stats, Contact) plus an interactive AI panel. The project needs SSG for performance while allowing client-side navigation between views without full page reloads.

## Decision

Use Next.js 16 App Router with static generation (SSG) for all routes. Each route pre-renders its page shell and metadata. Client-side view switching inside `PortfolioShell` uses `window.history.pushState` for URL sync without server round-trips.

## Alternatives Considered

### Alternative 1: Single-page app with React Router
- **Pros**: Full control over client routing
- **Cons**: No per-route metadata for SEO, requires wrapping all views in one client shell
- **Why not**: SEO loss from missing metadata per route and worse initial load

### Alternative 2: Pure SSG with static HTML
- **Pros**: Maximum performance
- **Cons**: No interactivity without attaching a JS framework anyway
- **Why not**: Would lose React component model and the AI guide interactivity

## Consequences

### Positive
- Each route has its own metadata (title, description, canonical) for SEO
- Static pages load instantly from CDN on first visit
- Client-side view switching feels instant after initial load
- Vercel deployment is free and simple

### Negative
- Duplication of metadata exports across route files
- Initial JS bundle includes all views even if only one is shown

### Risks
- Bundle size grows with content — monitor with `next-bundle-analyzer`
