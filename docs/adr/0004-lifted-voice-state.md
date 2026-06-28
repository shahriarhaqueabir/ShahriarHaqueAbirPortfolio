# ADR-0004: Lifted Voice Hooks Pattern for Shared Mic State

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The AI panel and the footer both need microphones. If both components create their own `useVoiceInput()` instance, they can be in conflicting states (one listening, the other idle). This causes race conditions and a confusing UX. The solution needs one source of truth for mic state.

## Decision

Lift `useVoiceInput` and `useVoiceOutput` to `PortfolioShell` (the shared parent) and pass hook state as props to both `AiGuideFooter` and `AiGuidePanel`. Only one `SpeechRecognition` instance is ever created.

## Alternatives Considered

### Alternative 1: Context provider for voice state
- **Pros**: Cleaner than prop drilling, no need to pass through intermediate components
- **Cons**: Adds another context provider to the tree, harder to reason about lifecycle
- **Why not**: The lift is shallow enough (one parent → two children) that prop drilling is simpler

### Alternative 2: Separate instances with sync
- **Pros**: Each component owns its mic lifecycle
- **Cons**: Two independent SpeechRecognition instances create race conditions; sync logic adds complexity
- **Why not**: Actually tried — caused hydration mismatches and Fast Refresh loops (see HANDOVER.md)

## Consequences

### Positive
- Single mic state shared across UI surfaces
- No conflicting listening states
- Clean ownership in the component hierarchy

### Negative
- Props must be threaded through PortfolioShell
- Voice hooks initialize even if the panel is never opened

### Risks
- If a third component needs voice access, the prop interface grows
