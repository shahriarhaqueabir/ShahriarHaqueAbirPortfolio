# Mobile Responsiveness & Fallback Chat Fixes Design

## 1. Goal
Fix the auto-zoom issue on mobile inputs and provide a seamless fallback experience for devices that do not support WebGPU (local AI).

## 2. Approach

### Mobile Auto-Zoom Fix
iOS Safari automatically zooms the viewport when focusing an input field with a font size smaller than `16px`. 
- **Change**: We will update the `<input>` elements in both `AiGuidePanel.tsx` and `AiGuideFooter.tsx`.
- **Implementation**: Replace `text-sm` (14px) with `text-base md:text-sm`. This ensures the input text is `16px` on mobile (preventing zoom) while remaining `14px` on desktop.

### WebGPU Fallback for Mobile Devices
Currently, users on unsupported devices (e.g., iOS Safari) must click "Enable AI Portfolio Guide" only to be told it doesn't work, which is a poor user experience.
- **Change**: We will evaluate WebGPU support automatically on mount.
- **Implementation**: 
  - Inside `usePortfolioWorker.ts`, we'll add an initialization step. 
  - If `getLocalAiFallbackReason()` returns a reason indicating no support, we will automatically set `localAiFallback` to `true`, hiding the "Enable AI" prompt.
  - We will inject a clear system message at the start of the chat: *"This device does not support local AI chat. Switching to Fallback Chat mode."*
  - The fallback guide will immediately be ready to answer portfolio questions via the rule-based engine.

## 3. Scope & Constraints
- The changes are localized to `AiGuidePanel.tsx`, `AiGuideFooter.tsx`, and `usePortfolioWorker.ts`.
- The rule-based engine (`fallback-engine.ts`) remains unchanged and will handle the fallback logic as it already does.
