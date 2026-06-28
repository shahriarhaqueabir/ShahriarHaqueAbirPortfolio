# ADR-0006: Direct Import of PortfolioShell for SSR and SpeechSynthesis TTS Fallback

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

After deploying ADR-0005's `ssr: false` dynamic import approach, two issues emerged:

1. **Blank page until JS loads**: The `dynamic()` import with `ssr: false` wrapped the PortfolioShell in a React Suspense boundary. The pre-rendered shell HTML was placed in a `<div hidden>` element, while the visible HTML showed only a loading spinner. Users saw a blank/spinner page until the JS bundle downloaded and `$RC()` unhid the content.

2. **ElevenLabs TTS API unreliable**: The `/api/tts` route proxied to ElevenLabs API, but the API key was expired / quota exhausted, causing persistent 502 errors when users clicked the speaker button.

## Decision

### 1. Direct import of PortfolioShell

Removed `PortfolioShellLoader` and the `dynamic()` wrapper entirely. `page.tsx` now imports `PortfolioShell` directly as a standard `"use client"` component.

Next.js statically generates `"use client"` components — they are pre-rendered to HTML during build and placed directly in the document flow, not hidden behind a Suspense boundary. The browser paints the hero, nav, icon rail, and stats immediately on first render. JS hydration then adds interactivity.

### 2. SpeechSynthesis as primary TTS

Replaced the ElevenLabs-only approach in `useVoiceOutput` with a two-tier strategy:
- **Tier 1**: Try ElevenLabs API via `/api/tts` (higher quality, cached in memory)
- **Tier 2**: Fall back to browser `SpeechSynthesis` API (free, no API key, works offline)

The `SpeechSynthesis` API is universally available in modern browsers and requires no network requests. Voice selection picks an English voice matching the content.

## Alternatives Considered

### Alternative 1: Keep `ssr: false` with a statically-rendered shell skeleton
- **Pros**: Full code-split of shell JS
- **Cons**: Still need a loading state; the skeleton adds complexity
- **Why not**: Direct import achieves the same result (static HTML on first paint) without the complexity of coordinating a skeleton and dynamic chunk

### Alternative 2: Remove TTS entirely
- **Pros**: Simplest fix
- **Cons**: Loses a feature that differentiates the portfolio — voice-enabled AI guide

### Alternative 3: Web Speech API only, remove ElevenLabs
- **Pros**: Simplest code, no API dependency
- **Cons**: ElevenLabs voices are higher quality when the API is working; keeping it as a try-first tier costs nothing

## Consequences

### Positive
- **Instant first paint**: Shell HTML is in the document flow immediately, no hidden Suspense wrapper
- **No spinner flash**: The loading spinner is gone entirely
- **TTS always works**: Even if the ElevenLabs API is down or the key expires, `SpeechSynthesis` provides a working fallback
- **No API dependency for core feature**: Voice output works offline and without any API key

### Negative
- `SpeechSynthesis` voices vary by OS/browser — quality is less consistent than ElevenLabs
- `SpeechSynthesis` has a known quirk where the first call may be silent on some Chromium builds (triggered by user interaction, which the button click satisfies)
- The full PortfolioShell JS bundle is in the critical hydration path (but the HTML is visible immediately, so the user perceives fast loading)
