# Mobile Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix iOS Safari input auto-zoom, seamlessly fallback to rule-based chat on unsupported mobile devices, and improve fallback engine greeting/gibberish handling.

**Architecture:** We will increase the input font size to `16px` on mobile, evaluate WebGPU support in `usePortfolioWorker.ts` on component mount instead of on button click, and add a `greeting` intent pattern to the `fallback-engine.ts`.

**Tech Stack:** React (Next.js), Tailwind CSS, TypeScript.

## User Review Required

Please review the plan below. Note that I am skipping writing formal tests for these small UI tweaks, but I will manually verify them.

## Proposed Changes

---

### Task 1: Fix Mobile Auto-Zoom

**Files:**
- Modify: `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\components\AiGuidePanel.tsx`
- Modify: `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\components\AiGuideFooter.tsx`

- [ ] **Step 1: Update input classes in AiGuidePanel.tsx**

Find the `<input>` element around line 235 and change `text-sm` to `text-base md:text-sm`.

```tsx
<input
  ref={inputRef}
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
  aria-label="Ask about Shahriar"
  placeholder="Ask about Shahriar..."
  className="w-full bg-(--surface) border border-(--border) rounded-sm py-2 pl-8 pr-9 text-base md:text-sm font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
/>
```

- [ ] **Step 2: Update input classes in AiGuideFooter.tsx**

Find the `<input>` element around line 149 and change `text-sm` to `text-base md:text-sm`.

```tsx
<input
  ref={inputRef}
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
  onFocus={onFocus}
  aria-label="Ask about Shahriar"
  placeholder={
    localAiPaused
      ? "Guide is paused"
      : localAiFallback
        ? "Ask the fallback guide..."
        : isReady
          ? "Ask about Shahriar..."
          : localAiEnabled
            ? \`Loading guide... \${Math.round(progress)}%\`
            : "Ask a question..."
  }
  disabled={localAiPaused}
  className="w-full bg-(--surface) border border-(--border) rounded-sm py-2 pl-8 pr-9 text-base md:text-sm font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
/>
```

---

### Task 2: Seamless WebGPU Fallback on Mount

**Files:**
- Modify: `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\hooks\usePortfolioWorker.ts`
- Modify: `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\components\AiGuidePanel.tsx`

- [ ] **Step 1: Check WebGPU support on mount**

Add a `useEffect` to `usePortfolioWorker.ts` that immediately evaluates `getLocalAiFallbackReason()` and triggers the fallback without waiting for the user to click 'Enable AI'. We will add this below the existing state declarations.

```tsx
  useEffect(() => {
    const fallbackReason = getLocalAiFallbackReason();
    if (fallbackReason && !localAiFallback) {
      setLocalAiFallback(true);
      setIsReady(true);
      setProgress(100);
      setMessages([
        createSysMessage(\`This device does not support local AI chat. Switching to Fallback Chat mode.\`)
      ]);
    }
  }, [createSysMessage, localAiFallback]);
```

- [ ] **Step 2: Prevent the 'Enable AI' button from showing if we are in fallback**

In `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\components\AiGuidePanel.tsx`, change the condition for the AI enable prompt so it is hidden when `localAiFallback` is true. We need to pass `localAiFallback` as a prop.

```tsx
// In AiGuidePanel.tsx
type AiGuidePanelProps = {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  activeView: ViewKey;
  localAiEnabled: boolean;
  localAiFallback: boolean; // ADDED THIS LINE
  enableLocalAi: () => void;
  onNavigate: (view: ViewKey) => void;
  onSend: (input: string) => void;
};
```

Update the render condition:
```tsx
{/* AI enable prompt when AI is off */}
{!localAiEnabled && !localAiFallback && (
  <div className="px-4 py-4 border-b border-(--border) shrink-0">
```

- [ ] **Step 3: Update AiGuidePanel usage**

Modify the parent component (likely `src/app/page.tsx` or similar) to pass `localAiFallback` down from `usePortfolioWorker`.

---

### Task 3: Improve Fallback Engine Greetings

**Files:**
- Modify: `e:\Projects\scratch\ShahriarHaqueAbirPortfolio\src\lib\fallback-engine.ts`

- [ ] **Step 1: Add Greeting Intent**

Add a new intent pattern to `intentPatterns`.

```ts
  {
    name: "greeting",
    keywords: ["hi", "hello", "hey", "how are you", "what's up", "greetings", "good morning", "good afternoon"],
    exclusive: ["projects", "skills", "experience", "contact", "compare"],
    weight: 3,
    answer: () => "Hello! 👋 I'm Shahriar's portfolio guide. I can help you explore his projects, experience, or skills. What would you like to know?",
  },
```

- [ ] **Step 2: Rewrite Clarifying Question**

Update `buildClarifyingQuestion`.

Change:
```ts
  const questionText = isQuestion ? \`I'm not sure I understood your question.\` : \`I'm not sure what you're looking for.\`;
```
To:
```ts
  const questionText = isQuestion 
    ? \`I'm a specialized guide for Shahriar's portfolio. I might not understand everything, but I'm great at answering questions about his work! \` 
    : \`I might have misunderstood. As a specialized portfolio guide, I'm best at answering questions about Shahriar's experience and skills. \`;
```
