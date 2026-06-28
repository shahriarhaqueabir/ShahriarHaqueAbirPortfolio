# ADR-0005: Defer Heavy Client Libraries Until After LCP

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The portfolio uses `tsparticles` for animated background effects. When loaded during SSR or immediate hydration, it blocks the main thread during the critical rendering path, delaying LCP. Lighthouse showed the LCP image finishing download at 197ms but not painting until ~1,274ms due to main thread congestion.

## Decision

Defer `tsparticles` and other heavy client-side libraries until after the LCP element has painted using the `PostLcpRender` wrapper. This component uses a double `requestAnimationFrame` pattern plus `requestIdleCallback` to schedule non-critical work after the first paint.

## Alternatives Considered

### Alternative 1: SSR particles with canvas
- **Pros**: Particles visible immediately
- **Cons**: Heavy JS on critical path, worsens LCP significantly
- **Why not**: Measured 1s+ LCP regression

### Alternative 2: CSS-only background patterns
- **Pros**: Zero JS cost, no LCP impact
- **Cons**: Less visually rich, can't do interactive particle effects
- **Why not**: The animated particle background is a design requirement

## Consequences

### Positive
- Particles load off the critical path — LCP improves by ~1s
- Graceful degradation: JS-heavy features appear after the hero is visible
- Clean abstraction for deferring any future heavy components

### Negative
- Particle background appears after a noticeable delay on slow devices
- Brief flash of empty background before particles initialize

### Risks
- `requestIdleCallback` is not supported in Safari — falls back to `requestAnimationFrame` but with less optimal scheduling
