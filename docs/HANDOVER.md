# Project Handover Notes

## What Worked Well
1. **Next.js Google Fonts (`next/font/google`)**: Using Next.js's built-in font optimization provided a massive performance boost and eliminated Cumulative Layout Shift (CLS) for fonts like `Syne`, `Playfair Display`, and `JetBrains Mono`.
2. **Simplified Mobile Navigation**: Moving the `MobileNav` directly to `bottom-0` with `pb-safe` padding creates a native, app-like bottom tab bar experience that is predictable and thumb-friendly.
3. **Floating AI Bubble for Mobile**: Transitioning the persistent `AiGuideFooter` into a hidden component on mobile (`hidden md:block`) and replacing it with a floating "tap-to-open" bubble resolved viewport crowding while keeping the AI guide easily accessible.
4. **Content Pruning**: Reducing the `data.ts` payload to highlight only the most impactful roles and top 4-5 projects makes the portfolio punchier and dramatically reduces visual fatigue for the reader.

## What Didn't Work (What to Avoid)
1. **Hardcoding Font Overrides in `:root`**: 
   - *The Issue*: Placing `--font-syne: "Syne", sans-serif;` inside the `:root` block in `globals.css` completely overrides the optimized CSS variables injected by `next/font` on the `<html>` tag. 
   - *The Fix*: Ensure that Tailwind v4 `@theme` maps font utilities (e.g., `--font-sans: var(--font-syne)`) directly to the Next.js injected variables, and **do not** redefine them in `:root`.
2. **Persistent Full-Width Footers on Mobile**: 
   - *The Issue*: A persistent AI input footer sitting on top of a persistent mobile navigation bar consumes too much vertical screen real estate, causing a cluttered UX.
   - *The Fix*: Stick to floating action buttons (FABs) or bubbles for auxiliary features on mobile.

## Future Recommendations
1. **Particle Backgrounds**: The `tsparticles` implementation is route-aware and performs well. If adding new routes, ensure you map a specific particle config to it inside the `useMemo` block in `ParticleBackground.tsx`.
2. **Reduced Motion**: The app currently respects the user's OS-level reduced motion preferences via the `useReducedMotion` hook. Ensure any new Framer Motion animations continue to provide fallback (non-animated) states for accessibility.
3. **AI Local Runner**: The local AI worker (`usePortfolioWorker.ts`) is designed to run locally. Be mindful of token limits and context windows when adding new projects or long descriptions to `data.ts`.
4. **Maintenance of `data.ts`**: The UI is tightly coupled to the data structure in `src/lib/data.ts`. Any additions to skills, experience, or projects should follow the existing object schemas to prevent runtime rendering errors.
