# ADR-0007: Projects section — replace abstract durations with engineering steps

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The projects section displayed abstract metadata (duration labels like "3 months", "Ongoing") that offered no insight into the actual engineering work. For a technical portfolio, visitors need concrete implementation details — not timeline placeholders.

## Decision

Replace `projectMeta.duration` fields with engineering-focused fields (`context`, `implementation`, `outcome`) that describe the actual problem, technical approach, and measurable result for each project.

## Alternatives Considered

### Alternative 1: Keep durations + add engineering context
- **Pros**: Preserves original data
- **Cons**: Adds clutter without removing the low-value metadata
- **Why not**: More fields dilute scannability; durations offer no signal for technical hiring

### Alternative 2: Merge everything into a single "description" field
- **Pros**: Simplest schema change
- **Cons**: Loses the structured Problem/Solution/Result breakdown that recruiters and screeners scan
- **Why not**: Structured data is more readable and parsable

## Consequences

### Positive
- Each project now communicates real engineering value, not timeline filler
- Structured fields (Context/Implementation/Outcome) are scannable and interview-relevant
- Aligns portfolio with what technical hiring managers look for

### Risks
- Existing `projectMeta` references in tests and types must be migrated — verified during implementation
