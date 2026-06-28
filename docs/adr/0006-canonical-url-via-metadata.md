# ADR-0006: Canonical URL via metadata API

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The portfolio's sub-pages (`/about`, `/projects`, `/experience`, `/skills`, `/stats`, `/contact`) lacked canonical URLs. Without explicit canonicals, search engines could infer the wrong canonical or treat query-parameter variants as duplicates, diluting ranking signals across the portfolio.

## Decision

Add per-page canonical URLs using Next.js's `metadata` API (`{ alternates: { canonical: '...' } }`) in each view's page metadata.

## Alternatives Considered

### Alternative 1: `<link rel="canonical">` in layout.tsx
- **Pros**: Single location
- **Cons**: Would set the same canonical for every page — wrong, since each is distinct
- **Why not**: A shared layout can't express per-page canonicals

### Alternative 2: Dynamic canonical via middleware
- **Pros**: Centralized logic
- **Cons**: Over-engineered for a 7-page static portfolio
- **Why not**: Adds complexity without proportional benefit

### Alternative 3: No canonicals (status quo)
- **Pros**: No work required
- **Cons**: Leaves ranking signals vulnerable to dilution
- **Why not**: SEO best practice requires explicit canonicals

## Consequences

### Positive
- Each page gets a self-referencing canonical, consolidating ranking signals
- Follows Next.js metadata best practices, no custom head management
- Simple, declarative per-page approach

### Risks
- None — canonicals are additive and don't break existing behavior
