# ADR-0003: Bottom Drawer AI Panel over Right Sidebar

**Date**: 2026-06-29
**Status**: accepted
**Deciders**: Shahriar Haque Abir

## Context

The AI guide chat interface needs a visible container. Two layouts were prototyped: a right sidebar panel and a bottom drawer that slides up from the footer. User testing showed the sidebar felt disconnected from the footer's open/close trigger, while the bottom drawer kept the interaction anchored.

## Decision

Use a bottom drawer (`h-[85vh]`) that slides up from the footer area. The footer (`AiGuideFooter`) acts as a status bar that fades to `opacity: 0 + pointer-events: none` when the drawer is open. On mobile, the footer is hidden and a floating bubble is shown instead.

## Alternatives Considered

### Alternative 1: Right sidebar panel
- **Pros**: Always visible, doesn't overlay content
- **Cons**: Disconnected from the footer trigger, users found it unintuitive, crowded the viewport on smaller screens
- **Why not**: Poor UX feedback during prototyping

### Alternative 2: Modal dialog
- **Pros**: Focused interaction
- **Cons**: Covers the portfolio content entirely, disrupts browsing flow
- **Why not**: Users want to see the portfolio while chatting

## Consequences

### Positive
- Natural transition from footer status bar to full chat
- Consistent interaction model (trigger at bottom → panel from bottom)
- Mobile-friendly with floating bubble fallback

### Negative
- Covers 85% of the viewport when open
- Requires `pointer-events: none` trick (not `display: none`) to keep footer in DOM

### Risks
- Very long message threads may feel cramped in the drawer
