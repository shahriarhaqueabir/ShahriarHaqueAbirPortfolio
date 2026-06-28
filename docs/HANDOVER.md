# Project Handover Notes

## Architecture Overview

### Layout & Shell
- **`PortfolioShell.tsx`** is the root client component. It owns:
  - `panelOpen` state — toggles the AI panel drawer
  - `input` / `setInput` — shared text input state for both footer and panel
  - `voiceInput` / `voiceOutput` — voice hook instances, passed as props
  - The `send()` function — clears input, routes commands, dispatches messages
- The footer (`AiGuideFooter`) is a **status bar only** — no input, no mic, no send button. When the panel is open, the footer fades via `opacity: 0` + `pointer-events: none` (NOT `display: none`), keeping it in the DOM.
- The panel (`AiGuidePanel`) is a **bottom drawer** (`h-[85vh]`) that slides up from below. It contains the only input bar, mic button, and send button.

### Voice System
- Two hooks lifted to `PortfolioShell`:
  - `useVoiceInput` — wraps Web Speech API (`SpeechRecognition`). One instance shared by both components.
  - `useVoiceOutput` — wraps ElevenLabs TTS. One instance, manual activation only.
- `VoiceButton` uses a discriminated union (`mode: "input" | "speaker"`) to render mic or speaker buttons. Always renders a `<button>` (never `null`) to prevent hydration mismatches.

## What Worked Well

1. **Next.js Google Fonts**: Using `next/font/google` provides optimized font loading and eliminates CLS from web font swaps.
2. **Floating AI Bubble for Mobile**: Footer is `hidden md:block`. Mobile gets a floating circular bubble (`MessageCircle` icon) instead.
3. **Content Pruning**: Keeping `data.ts` focused on the most impactful roles and projects reduces visual fatigue.
4. **Lifted Voice State**: Sharing one `useVoiceInput` instance between footer and panel prevents independent mic state and ensures transcripts are always in sync.
5. **Bottom Drawer Panel**: Using a slide-up drawer (instead of a right sidebar) keeps the interaction anchored to the same part of the screen as the footer, making the transition feel natural.

## What Didn't Work (What to Avoid)

1. **Hardcoding Font Overrides in `:root`**: Placing `--font-syne: "Syne"` in `globals.css` overrides Next.js font optimization variables. Map fonts via Tailwind v4 `@theme` instead.
2. **persistent Full-Width Footer with Input on Mobile**: Using a floating bubble avoids crowding the viewport on small screens.
3. **`watchOptions.poll: 1000` in next.config.ts**: Causes infinite Fast Refresh loop on Windows. Do not add it back.
4. **Two Separate `useVoiceInput()` Instances**: Causes independent mic state — one instance can be listening while the other is off. Always lift voice hooks to the shared parent.
5. **Right Sidebar Panel**: Users found it disconnected from the footer interaction. A bottom drawer keeps the interaction anchored.
6. **VoiceButton returning `null` when unsupported**: Causes React hydration mismatch → Fast Refresh loop. Always render the `<button>` (disabled).

## Future Recommendations

1. **Particle Backgrounds**: The `tsparticles` implementation is route-aware. If adding routes, map particle configs in the `useMemo` block in `ParticleBackground.tsx`.
2. **Reduced Motion**: The `useReducedMotion` hook respects OS preferences. Any new Framer Motion animations should provide non-animated fallback states.
3. **WebLLM Context Window**: Adding large entries to `data.ts` increases the system prompt size. Monitor context limits when adding content.
4. **ElevenLabs Free Tier**: ~10K chars/month. If usage grows, consider Fish Audio (S2.1 Pro free + monthly credits) or Google Chirp 3 HD (1M chars/mo free) as alternatives.
5. **Brave Browser Compatibility**: SpeechRecognition doesn't work reliably on Brave due to aggressive fingerprinting protections. The 400ms restart delay mitigates some issues but doesn't fully solve it.
