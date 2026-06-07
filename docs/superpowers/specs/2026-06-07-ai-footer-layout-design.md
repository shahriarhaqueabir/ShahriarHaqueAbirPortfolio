# AI Guide Footer Layout Redesign Spec

## 1. Overview
Move the AI chat interface from the left sidebar to a fixed footer bar. The desktop sidebar collapses to a permanent 76px icon rail. This decouples navigation from chat, gives content full horizontal width, and positions the AI as the top USP — always visible, always accessible.

## 2. Layout Architecture

### Current
```
┌─────────────────────┬──────────────────────────────────┐
│  Sidebar (380px)    │  Content Area                    │
│  Chat + Navigation  │                                  │
└─────────────────────┴──────────────────────────────────┘
```

### Proposed
```
┌────────┬───────────────────────────────────────────────┐
│ 76px   │  Content Area (full remaining width)          │
│ Icon   │                                               │
│ Rail   │                                               │
├────────┴───────────────────────────────────────────────┤
│  AI Guide Footer (fixed, ~140px default)               │
│  Status dot + greeting + chips + input field            │
└────────────────────────────────────────────────────────┘
```

## 3. Components

### 3A. IconRail (new)
- Permanent 76px left rail — no expand/collapse toggle
- Reuses existing `desktopRailItems` array and nav button styling from current collapsed sidebar state
- Brand "H" logo at top, AI status dot, nav buttons, no other chrome
- Hidden on mobile (<768px)

### 3B. AiGuideFooter (new)
- Fixed bottom bar, full viewport width minus 76px icon rail
- Default height ~140px
- **Left section:** Status indicator dot + "Shahriar's AI Guide" label
- **Center:** Greeting text or AI's last message (truncated to 1-2 lines)
- **Right-bottom:** Input field + send button
- **Suggestions chips:** Below input, show 3-4 quick-action chip buttons (e.g., "Show projects", "Compare skills", "Recruiter path", "Download CV")
- On mobile (no icon rail): full viewport width, slightly taller to accommodate navigation buttons

### 3C. AiGuidePanel (new)
- Slides up from above the footer on focus or when messages exist
- Takes bottom ~60% of viewport
- Semi-transparent backdrop overlay
- Contains chat message history with existing typewriter effect
- Close/dismiss button in top-right
- Scrollable message list
- Shares same message rendering as current `PortfolioSidebar` (TypewriterText, sender styles)
- On mobile: full-screen bottom sheet (like current `MobileCommandSheet`)

### 3D. Navigation buttons in footer (mobile only)
- On mobile, a compact row of nav buttons sits inside the footer header area
- Same `navItems` as the current sidebar
- Tapping a button navigates and optionally closes the panel

## 4. Component Tree

```
PortfolioShell
├── BootScreen (unchanged)
├── IconRail (76px, desktop only)
│   ├── Logo button → navigate("hero")
│   └── Nav items (same as current collapsed sidebar)
├── ContentArea (scrollable, unchanged)
│   └── PortfolioViewRenderer (unchanged)
├── AiGuideFooter (fixed bottom, z-30)
│   ├── Status indicator
│   ├── Greeting / AI message
│   ├── Suggestion chips
│   └── Input + send button
└── AiGuidePanel (absolute, slides up from footer)
    ├── Close button
    ├── Message list (with TypewriterText)
    └── (mobile: nav buttons in header)
```

## 5. Interactions

### 5A. User lands
- Footer shows: `● Ready — "Welcome. I can walk you through projects, compare experience, or build a recruiter path."` plus chips
- Input field is focused on desktop, auto-focus on mobile

### 5B. User types or clicks a chip
- Messages appear in `AiGuidePanel` sliding up from above the footer
- Footer input stays visible and focused
- Panel scrolls to show latest message

### 5C. AI responds with navigation
- Same INITIATING_NAVIGATION flow as current code
- Content view changes, AI response shows in panel
- Footer update: shows AI's response summary (truncated) when panel is closed

### 5D. Icon rail navigation
- Tapping an icon navigates to that view
- No effect on footer state (AI stays where it is)
- Content area scrolls to top

### 5E. Dismiss panel
- Click outside panel or close button
- Panel slides down, footer returns to default compact state
- Last AI response summary stays visible in footer greeting area

## 6. What Stays the Same

- `usePortfolioWorker` hook — all chat/AI/worker state
- `useCommandRouter` hook — keyword routing
- `PortfolioViewRenderer` — view switching
- All view components (HeroView, ProjectsView, etc.)
- URL pushState navigation
- INITIATING_NAVIGATION parsing (already fixed per the bugfix)
- BootScreen and boot gate flow
- All existing styles, animations, and framer-motion transitions
- HUD/terminal visual theme from the previous design

## 7. What Gets Removed

- `PortfolioSidebar` component (entirely replaced)
- `MobileCommandSheet` component (entirely replaced)
- `desktopSidebarCollapsed` state from `PortfolioShell`
- Sidebar-related JSX from `PortfolioShell`
- `onSend` prop pattern (replaced by direct hook access in footer components)

## 8. What Gets Added

- `IconRail` component
- `AiGuideFooter` component
- `AiGuidePanel` component
- Shared message rendering extracted into a reusable `ChatMessage` component (or inline in `AiGuidePanel`)

## 9. Mobile Behavior

- Icon rail hidden on screens <768px
- Footer spans full width
- A floating AI button in bottom-right replaces the icon rail's nav access
- Tapping the button opens `AiGuidePanel` as a full-screen bottom sheet
- Nav buttons inside the panel header compact row
- Footer input always visible when panel is open

## 10. Edge Cases

- **AI not enabled:** Footer shows the same opt-in "Enable AI Portfolio Guide" button, styled as a prominent CTA in the footer
- **Fallback mode:** Footer shows "Fallback guide active" status, chips reflect fallback capabilities
- **Loading:** Footer shows "Loading guide..." with progress, same as current
- **Error:** Footer shows error state with retry option
- **Empty chat:** Footer shows greeting and chips, no panel visible
