# Visual Aesthetics Redesign Spec

## 1. Overview
The portfolio will undergo a visual redesign to achieve a "Highly technical and futuristic" aesthetic. The design is split into two distinct visual themes to create contrast:
1. **Main Content Area:** Premium Holographic Glassmorphism.
2. **AI Sidebar:** Utilitarian HUD / Terminal.

## 2. Global Changes
- **Background Texture:** Enhance the existing abstract grid background by layering a subtle static noise overlay and richer, deeper gradient pools to simulate a high-tech "data void".
- **Typography Adjustments:** Increase the usage of monospace fonts (JetBrains Mono or similar) for technical data, while keeping Inter/Syne for headings and prose to maintain readability.

## 3. Main Content Area (Glassmorphism)
- **Glass Panels:** Wrap main content containers (e.g., Hero, About, Projects cards) in frosted glass styling.
  - CSS implementation: `backdrop-blur-md`, semi-transparent backgrounds (e.g., `rgba(16, 24, 38, 0.4)`), glowing 1px borders, and soft outer shadows.
- **Imagery:** Introduce actual image placements. Images will be styled with slightly angled or clipped corners. A subtle scanline CSS animation overlay will be applied to give them a holographic feel.
- **Micro-animations:** Continue using Framer Motion to animate the glass cards floating into view.

## 4. AI Sidebar (HUD Terminal)
- **Visual Framing:** Replace any soft edges in the `PortfolioSidebar` with sharp, rigid, technical borders.
- **Corner Brackets:** Add HUD-style corner brackets (e.g., `+` or `[ ]` shapes in the absolute corners of the sidebar container).
- **Terminal Output:** The AI's conversational output will lean heavily into monospace fonts, appearing like a terminal log.
- **Status Indicators:** Expand the usage of the existing `stellar-core` glowing dot as the AI's "eye". Add minor textual status indicators (e.g., `[AWAITING_INPUT]`, `[PROCESSING]`) during interaction states.

## 5. Scope & Limitations
- This redesign is strictly CSS/Tailwind and React component restructuring.
- The underlying AI logic (`usePortfolioWorker`, Web-LLM) remains untouched.
- The routing logic (`useCommandRouter`) remains untouched.
