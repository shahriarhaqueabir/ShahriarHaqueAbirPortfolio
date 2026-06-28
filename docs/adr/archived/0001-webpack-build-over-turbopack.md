# ADR-0001: Webpack Build over Turbopack

**Date**: 2026-06-28
**Status**: accepted
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

The portfolio uses several native Node.js modules (`sharp` for image processing, `onnxruntime-node` for local WebLLM inference) that are resolved via webpack aliases in `next.config.ts`. Next.js 14+ defaults to Turbopack in development, but Turbopack does not support webpack `resolve.alias` overrides for native modules. Attempting to build or dev with Turbopack produces module-not-found errors for `sharp` and `onnxruntime-node`. The project also uses `--legacy-peer-deps` for dependency installation, which is incompatible with Turbopack's stricter resolution.

## Decision

Use Next.js with the `--webpack` flag for all build and dev commands. The `next.config.ts` explicitly configures webpack aliases to resolve `sharp$` and `onnxruntime-node$` to `false` (they are server-side-only modules that the client build should exclude). All `package.json` scripts (`dev`, `build`) include `--webpack` in their invocation.

## Alternatives Considered

### Alternative 1: Fix native module resolution for Turbopack
- **Pros**: Faster dev experience with Turbopack's incremental bundling
- **Cons**: Requires Next.js configuration that may not be stable across versions; `onnxruntime-node` and `sharp` have complex native bindings that are not straightforward to polyfill for Turbopack
- **Why not**: The effort-to-benefit ratio is poor for a static portfolio — dev iteration speed is already acceptable with webpack

### Alternative 2: Remove WebLLM / sharp dependencies
- **Pros**: Eliminates the compatibility issue entirely
- **Cons**: Loses the local AI guide feature (WebLLM) and portfolio image optimization (sharp) — both are core differentiators

## Consequences

### Positive
- Stable, predictable builds across all environments
- Clear documentation of the constraint in `package.json` scripts
- Works with Vercel deployment (which also uses webpack by default)

### Negative
- No access to Turbopack's faster incremental dev builds
- Developers must remember the `--webpack` flag when adding new npm scripts

### Risks
- Future Next.js versions may deprecate `--webpack`; at that point the project must migrate to native module resolution or remove the webpack aliases
