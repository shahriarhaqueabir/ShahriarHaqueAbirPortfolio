# ADR 0001: Dual-Engine AI Architecture (Local LLM + Pattern Fallback)

## Status
Accepted

## Date
2026-08-06

## Context
The portfolio requires an AI guide to help visitors navigate Shahriar's experience and projects. Traditionally, this would involve a cloud-based LLM (e.g., OpenAI, Anthropic), which introduces several challenges:
1. **Cost:** Running a cloud LLM for every visitor can become expensive.
2. **Privacy/Telemetry:** Sending visitor queries to a third-party server may be undesirable.
3. **Latency:** API round-trips can be slow.
4. **Availability:** If the API key exceeds quota or the service is down, the guide fails.

## Decision
We will implement a **Dual-Engine AI Architecture** that prioritizes client-side execution:

1.  **Primary Engine (WebLLM):** Use `Qwen2.5-Coder-1.5B` running in-browser via WebGPU. This provides high-quality, context-aware responses with zero server costs and maximum privacy.
2.  **Fallback Engine (Pattern Matching):** Use a custom 17-intent regex-based engine (implemented in `src/lib/fallback-engine.ts`). This ensures the guide is functional on devices without WebGPU (mobile, old browsers, or during the ~300MB model download).

## Consequences

### Positive
*   **Zero Marginal Cost:** The AI guide runs for free on the visitor's hardware.
*   **Offline/Privacy First:** No visitor data ever leaves the browser for AI processing.
*   **Instant Interaction:** The fallback engine provides sub-5ms responses while the larger model loads.
*   **Demonstrates Technical Depth:** Showcases expertise in WebGPU, Web Workers, and hybrid AI architectures.

### Negative
*   **Initial Load Delay:** The local model is ~300MB, requiring a significant first-time download (though opted-in by the user).
*   **Hardware Requirements:** WebLLM requires a modern GPU and browser support (WebGPU).
*   **Complexity:** Managing two engines and synchronization between them (messages, navigation, state) adds implementation overhead.
