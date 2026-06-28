# ADR-0002: Local WebLLM AI over Server-Side AI API

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The AI guide needs to answer questions about the portfolio owner's experience, skills, and projects. Options were: server-side LLM API (OpenAI, Anthropic) with ongoing costs, or a browser-based WebLLM that runs on the user's machine. Server APIs cost per-request, require user data to leave the device, and add latency. The portfolio has no revenue to cover API costs.

## Decision

Use Qwen2.5-Coder 1.5B running in-browser via WebLLM (WebGPU) as the primary AI. Fall back to a 17-intent pattern-matching engine when WebGPU is unavailable. No server-side AI API calls. The model downloads (~300MB) only on user opt-in.

## Alternatives Considered

### Alternative 1: OpenAI / Anthropic API
- **Pros**: Best quality, no browser compatibility issues
- **Cons**: Ongoing per-request costs, requires API key management, user data leaves device, latency from server round-trip
- **Why not**: Cost-prohibitive for a free portfolio; data privacy concern

### Alternative 2: Server-side small model (Ollama)
- **Pros**: Free to run, decent quality
- **Cons**: Requires a server with GPU, higher hosting cost, maintenance overhead
- **Why not**: Vercel doesn't support server-side model hosting; would need separate infrastructure

## Consequences

### Positive
- Zero ongoing AI costs
- User data never leaves the browser
- No API keys to manage or rotate
- Privacy-focused selling point

### Negative
- Requires WebGPU (Chrome, Edge, recent Firefox) — Safari and mobile browsers excluded
- ~300MB model download on first use
- Qwen2.5-Coder 1.5B has limited reasoning capability

### Risks
- WebGPU API is still evolving — may break with browser updates
- Mobile Safari users get only the fallback engine
