# ADR-0008: Strip emoji from TTS output via regex filter

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The built-in browser SpeechSynthesis API reads emoji characters aloud as Unicode descriptions (e.g., "rocket" for 🚀, "envelope" for ✉️), producing confusing audio output. The portfolio uses emoji in AI guide responses and UI labels; these need to be silently removed before passing text to the TTS API.

## Decision

Add a `stripEmojis()` utility that removes emoji and emoticon characters via Unicode regex before text reaches SpeechSynthesis or ElevenLabs synthesis.

## Alternatives Considered

### Alternative 1: Alt text replacement
- **Pros**: Maps emoji to human-readable words (🚀 → "launched")
- **Cons**: Requires maintaining a large dictionary with many edge cases
- **Why not**: Unsustainable for a portfolio with evolving AI-generated content

### Alternative 2: CSS `speak: never`
- **Pros**: No JavaScript changes needed
- **Cons**: Style-based approach doesn't affect SpeechSynthesis API input
- **Why not**: Doesn't solve the actual problem

### Alternative 3: ElevenLabs SSML
- **Pros**: Handles emoji at the API level
- **Cons**: Only solves one of two TTS paths; browser fallback still broken
- **Why not**: Incomplete solution

## Consequences

### Positive
- Clean, natural-sounding TTS output on both browser-native and ElevenLabs paths
- Simple, testable utility — no dependencies
- Single regex handles the full emoji spectrum

### Risks
- Very rare false positives (non-emoji symbols in the same Unicode range). Mitigated by using a targeted emoji-only regex pattern.
