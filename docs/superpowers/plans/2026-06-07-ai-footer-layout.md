# AI Guide Footer Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the AI chat interface from a left sidebar to a fixed footer bar + permanent icon rail, making the AI the prominent USP.

**Architecture:** Extract IconRail from the collapsed sidebar view, create AiGuideFooter (fixed bottom bar) and AiGuidePanel (expandable chat panel from footer), modify PortfolioShell to wire them together, remove old PortfolioSidebar and MobileCommandSheet.

**Tech Stack:** Next.js 16, React, Framer Motion, Tailwind CSS, Lucide icons

---

### Task 1: Create IconRail component

**Files:**
- Create: `src/components/layout/IconRail.tsx`

- [ ] **Step 1: Write IconRail component**

```tsx
"use client";

import { BarChart3, Briefcase, ChevronRight, Home as HomeIcon, Layers, Mail, PanelLeftOpen, User, Zap } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const desktopRailItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: HomeIcon, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
  { name: "Stats", icon: BarChart3, view: "stats" },
  { name: "Contact", icon: Mail, view: "contact" },
];

type IconRailProps = {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  aiReady: boolean;
  aiPaused: boolean;
  aiFallback: boolean;
  aiEnabled: boolean;
};

export default function IconRail({ activeView, onNavigate, aiReady, aiPaused, aiFallback, aiEnabled }: IconRailProps) {
  return (
    <aside className="hidden md:flex h-full w-[76px] min-w-[76px] flex-col items-center gap-4 px-3 py-6 relative z-20 backdrop-blur-3xl hud-container border-r border-(--border)">
      <button
        type="button"
        onClick={() => onNavigate("hero")}
        className="shine-surface flex h-11 w-11 items-center justify-center rounded-sm border border-(--border) bg-(--text) text-(--bg) font-syne text-sm font-black"
        aria-label="Go to home"
        title="Home"
      >
        H
      </button>
      <div
        className={`h-2 w-2 rounded-full ${aiReady && !aiPaused ? (aiFallback ? "bg-(--accent)" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]") : aiEnabled ? "bg-orange-500" : "bg-(--text-muted)"}`}
        title={aiPaused ? "Guide paused" : aiFallback ? "Guide fallback" : !aiEnabled ? "Guide opt-in" : aiReady ? "Guide ready" : "Guide loading"}
      />
      <div className="my-2 h-px w-full bg-(--border)" />
      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Portfolio navigation">
        {desktopRailItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-colors ${
              activeView === item.view ? "border-(--accent) bg-(--accent) text-(--bg)" : "border-transparent text-(--text-muted) hover:border-(--border) hover:text-(--text)"
            }`}
            aria-label={item.name}
            title={item.name}
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Verify the component uses the same styling tokens as the current collapsed sidebar** (no build needed yet, will verify in Task 4)

---

### Task 2: Create AiGuideFooter component

**Files:**
- Create: `src/components/AiGuideFooter.tsx`

- [ ] **Step 1: Write AiGuideFooter component**

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, MessageSquare, Power, Send, CheckCircle2 } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";

type AiGuideFooterProps = {
  messages: Message[];
  isReady: boolean;
  localAiEnabled: boolean;
  localAiFallback: boolean;
  localAiPaused: boolean;
  progress: number;
  showReadyToast: boolean;
  enableLocalAi: () => void;
  onSend: (input: string) => void;
  onFocus: () => void;
};

function formatViewName(view: ViewKey) {
  if (view === "hero") return "Home";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

const SUGGESTIONS = [
  { label: "Show projects", input: "show projects" },
  { label: "Recruiter path", input: "guide me around" },
  { label: "Compare skills", input: "compare skills to experience" },
  { label: "Download CV", input: "/shahriar-haque-abir-cv.pdf" },
];

export default function AiGuideFooter({
  messages,
  isReady,
  localAiEnabled,
  localAiFallback,
  localAiPaused,
  progress,
  showReadyToast,
  enableLocalAi,
  onSend,
  onFocus,
}: AiGuideFooterProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const lastAiMessage = [...messages].reverse().find((m) => m.sender === "ai" && !m.isTyping && !m.isReadyGreen);

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    onSend(text);
    onFocus();
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 md:left-[76px] z-30 border-t border-(--border) bg-(--surface)/90 backdrop-blur-3xl">
      <AnimatePresence>
        {showReadyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-16 left-4 right-4 bg-green-50 border border-green-200 p-4 rounded-sm shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-green-800 uppercase tracking-wider">AI guide ready</div>
              <div className="text-[9px] text-green-700">Ready to answer portfolio questions.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2 px-4 py-3 md:px-6 md:py-4">
        {/* Top row: status + greeting */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div
              className={`h-2 w-2 shrink-0 rounded-full ${
                isReady && !localAiPaused
                  ? localAiFallback
                    ? "bg-(--accent)"
                    : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  : localAiEnabled
                    ? "bg-orange-500"
                    : "bg-(--text-muted)"
              }`}
            />
            <span className="text-[8px] font-mono text-(--text-muted) uppercase tracking-wider shrink-0">
              [{localAiPaused ? "Paused" : localAiFallback ? "Fallback" : !localAiEnabled ? "Opt-in" : isReady ? "Ready" : "Loading"}]
            </span>
            <span className="text-[9px] font-mono text-(--text-muted) uppercase tracking-wider hidden sm:inline">
              Shahriar&apos;s AI Guide
            </span>
          </div>
          <Cpu className={`w-3 h-3 shrink-0 ${isReady && !localAiPaused ? (localAiFallback ? "text-(--accent)" : "text-green-500") : localAiEnabled ? "text-orange-500" : "text-(--text-muted)"}`} />
        </div>

        {/* Greeting / last AI message */}
        {!localAiEnabled ? null : localAiPaused ? (
          <p className="text-[11px] font-mono text-(--text-muted) italic">Guide is paused</p>
        ) : !isReady ? (
          <p className="text-[11px] font-mono text-(--text-muted)">Loading guide... {Math.round(progress)}%</p>
        ) : lastAiMessage ? (
          <p className="text-[11px] font-mono text-(--text) truncate max-w-full">{lastAiMessage.text}</p>
        ) : (
          <p className="text-[11px] font-mono text-(--text-muted)">
            Welcome. I can walk you through projects, compare experience, or build a recruiter path.
          </p>
        )}

        {/* Suggestions chips (only when no messages yet) */}
        {localAiEnabled && isReady && !localAiPaused && messages.filter(m => m.sender !== "sys").length <= 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setInput("");
                  onSend(s.input);
                  onFocus();
                }}
                className="shrink-0 px-3 py-1.5 rounded-sm border border-(--border) text-[9px] font-mono uppercase tracking-wider text-(--text-muted) hover:text-(--accent) hover:border-(--accent) transition-colors bg-(--bg)/50"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        {localAiPaused ? (
          <p className="text-[10px] font-mono text-(--text-muted) italic">Search disabled while guide is paused</p>
        ) : !localAiEnabled ? (
          <button
            type="button"
            onClick={enableLocalAi}
            className="flex items-center gap-2 px-4 py-3 border border-(--accent) bg-(--surface) text-(--text) transition-all hover:bg-(--accent) hover:text-(--bg) group w-full"
          >
            <Power className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Enable AI Portfolio Guide</span>
            <span className="text-[9px] font-mono text-(--text-muted) group-hover:text-(--bg)/80 transition-colors hidden sm:inline">
              Ask questions · Get a recruiter path · Explore projects
            </span>
          </button>
        ) : (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={onFocus}
              placeholder={
                localAiFallback
                  ? "Ask the fallback guide..."
                  : isReady
                    ? "Ask about Shahriar..."
                    : `Loading guide... ${Math.round(progress)}%`
              }
              disabled={!isReady && !localAiFallback}
              className="w-full bg-(--surface) border border-(--border) rounded-sm py-2.5 pl-9 pr-10 text-xs font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
            />
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--text-muted)" />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text) hover:text-(--accent) disabled:opacity-30 p-1"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
```

---

### Task 3: Create AiGuidePanel component

**Files:**
- Create: `src/components/AiGuidePanel.tsx`

- [ ] **Step 1: Write AiGuidePanel component**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, User, X, BarChart3, Briefcase, Home, Layers, Mail, User as UserIcon, Zap } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";

function TypewriterText({ text }: { text: string }) {
  const displayText = text.length > 600 ? text : text;
  // For longer responses, show full text; for short, animate
  // Simple version: just show the text
  return <span>{text}</span>;
}

type AiGuidePanelProps = {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
};

const navItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: Home, view: "hero" },
  { name: "About", icon: UserIcon, view: "about" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
  { name: "Stats", icon: BarChart3, view: "stats" },
  { name: "Contact", icon: Mail, view: "contact" },
];

export default function AiGuidePanel({ open, onClose, messages, activeView, onNavigate }: AiGuidePanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close chat panel"
            className="fixed inset-0 z-40 bg-(--text)/15 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.section
            className="fixed bottom-0 left-0 right-0 md:left-[76px] z-40 bg-(--surface)/95 backdrop-blur-3xl border-t border-(--border) shadow-2xl flex flex-col"
            style={{ height: "60vh", maxHeight: "600px" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-(--border) shrink-0">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-(--accent)">AI Guide · Conversation</span>
              <div className="flex items-center gap-2">
                {/* Mobile nav buttons */}
                <div className="flex gap-1 md:hidden overflow-x-auto">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => { onNavigate(item.view); onClose(); }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest border transition-colors ${
                        activeView === item.view
                          ? "bg-(--accent) text-white border-(--accent)"
                          : "bg-transparent text-(--text-muted) border-(--border) hover:border-(--text) hover:text-(--text)"
                      }`}
                    >
                      <item.icon className="w-2.5 h-2.5" />
                      <span className="hidden xs:inline">{item.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-sm text-(--text-muted) hover:text-(--text) hover:bg-(--surface) transition-colors"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 custom-scrollbar">
              {messages.length === 0 && (
                <p className="text-[11px] font-mono text-(--text-muted) text-center mt-8">
                  Start a conversation to see messages here.
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[90%] p-4 rounded-sm text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-(--text) text-(--bg) self-end font-medium"
                      : msg.sender === "sys"
                        ? "bg-transparent text-(--text-muted) border-l-2 border-(--border) self-start font-mono text-[9px] uppercase tracking-widest pl-3 py-1 shadow-none"
                        : msg.isReadyGreen
                          ? "bg-green-500 text-white border-green-400 self-start font-bold"
                          : "bg-(--surface) text-(--text) border border-(--border) self-start font-mono text-[11px]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.sender === "ai" && !msg.isTyping && <MessageSquare className="w-3 h-3 mt-1 text-(--accent) opacity-50 shrink-0" />}
                    {msg.sender === "user" && <User className="w-3 h-3 mt-1 text-(--bg) opacity-50 shrink-0" />}
                    <span>
                      {msg.isTyping ? (
                        <span className="animate-pulse flex gap-1 items-center h-4">
                          <span className="w-1 h-1 bg-(--accent) rounded-full" />
                          <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-100" />
                          <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-200" />
                        </span>
                      ) : (
                        msg.text
                      )}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

### Task 4: Modify PortfolioShell to integrate new layout

**Files:**
- Modify: `src/components/layout/PortfolioShell.tsx`

- [ ] **Step 1: Rewrite PortfolioShell to use IconRail, AiGuideFooter, AiGuidePanel**

Replace the entire file content with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import IconRail from "@/components/layout/IconRail";
import AiGuideFooter from "@/components/AiGuideFooter";
import AiGuidePanel from "@/components/AiGuidePanel";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

export default function PortfolioShell({ initialView = "hero" }: { initialView?: ViewKey }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const contentScrollRef = useRef<HTMLElement>(null);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter(initialView);
  const worker = usePortfolioWorker({
    onNavigate: (view: ViewKey) => {
      const item = desktopRailItems.find((i) => i.view === view);
      navigate(view, item?.name);
    },
  });

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setPanelOpen(false);
    worker.addSystemMessage(`Opened ${name || view}`);
    if (typeof window !== "undefined") {
      const path = view === "hero" ? "/" : `/${view}`;
      window.history.pushState({ view }, "", path);
    }
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
      if (typeof window !== "undefined") {
        const path = result.view === "hero" ? "/" : `/${result.view}`;
        window.history.pushState({ view: result.view }, "", path);
      }
    } else {
      worker.sendMessage(input, activeView, conversationState);
    }
    setPanelOpen(true);
  };

  const handleHeroAiQuery = (input: string) => {
    if (!worker.localAiEnabled) {
      worker.enableLocalAi();
    }
    setTimeout(() => {
      worker.sendMessage(input, "hero", conversationState);
    }, 200);
    setPanelOpen(true);
  };

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <BootScreen
            progress={worker.progress}
            isReady={worker.isReady}
            localAiEnabled={worker.localAiEnabled}
            localAiFallback={worker.localAiFallback}
            localAiPaused={worker.localAiPaused}
            onEnter={enterPortfolio}
          />
        )}
      </AnimatePresence>

      <IconRail
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
        aiReady={worker.isReady}
        aiPaused={worker.localAiPaused}
        aiFallback={worker.localAiFallback}
        aiEnabled={worker.localAiEnabled}
      />

      <section
        ref={contentScrollRef}
        data-testid="content-scroll"
        className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:px-12 md:py-16 xl:px-16 relative custom-scrollbar pb-[180px]"
      >
        <div className="content-stage w-full max-w-[1360px] mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} setView={setActiveView} onAiQuery={handleHeroAiQuery} />
          </AnimatePresence>
        </div>
      </section>

      <AiGuideFooter
        messages={worker.messages}
        isReady={worker.isReady}
        localAiEnabled={worker.localAiEnabled}
        localAiFallback={worker.localAiFallback}
        localAiPaused={worker.localAiPaused}
        progress={worker.progress}
        showReadyToast={worker.showReadyToast}
        enableLocalAi={worker.enableLocalAi}
        onSend={send}
        onFocus={() => setPanelOpen(true)}
      />

      <AiGuidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        messages={worker.messages}
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
      />

      {/* Mobile floating AI button (visible when panel is closed) */}
      {!panelOpen && !isBooting && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-(--accent)/45 bg-(--accent) text-(--bg) shadow-[0_18px_48px_rgba(var(--accent-rgb),0.36)] transition-transform active:scale-95 md:hidden"
          aria-label="Open AI guide"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-(--bg)/15">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-(--accent) bg-green-400 text-[7px] font-black tracking-tighter text-black shadow-sm">
              AI
            </span>
          </span>
        </button>
      )}
    </main>
  );
}

const desktopRailItems: Array<{ name: string; icon: any; view: ViewKey }> = [
  { name: "Home", icon: require("lucide-react").Home, view: "hero" },
  { name: "About", icon: require("lucide-react").User, view: "about" },
  { name: "Projects", icon: require("lucide-react").Briefcase, view: "projects" },
  { name: "Experience", icon: require("lucide-react").Layers, view: "experience" },
  { name: "Skills", icon: require("lucide-react").Zap, view: "skills" },
  { name: "Stats", icon: require("lucide-react").BarChart3, view: "stats" },
  { name: "Contact", icon: require("lucide-react").Mail, view: "contact" },
];
```

Wait, using `require` inside a component file is wrong. The IconRail already has `desktopRailItems` defined. I don't need it in PortfolioShell — the `onNavigate` callback doesn't need the items array. Let me fix this by simply defining the items inside PortfolioShell's `onNavigate` or using a simpler approach.

Actually, looking at the original code, `desktopRailItems` was used in `onNavigate` to find the item name. In the new code, the `navigate` function takes an optional `name` parameter. The IconRail's `onNavigate` calls `navigate(view)` without a name — that's fine, the name is just for the system message.

Let me clean this up. The `navigate` function in the new PortfolioShell should be:

```tsx
const navigate = (view: ViewKey, name?: string) => {
  setActiveView(view);
  setPanelOpen(false);
  worker.addSystemMessage(`Opened ${name || view}`);
  if (typeof window !== "undefined") {
    const path = view === "hero" ? "/" : `/${view}`;
    window.history.pushState({ view }, "", path);
  }
};
```

And the worker's `onNavigate` callback:
```tsx
const worker = usePortfolioWorker({
  onNavigate: (view: ViewKey) => {
    navigate(view);
  },
});
```

So I don't need `desktopRailItems` in PortfolioShell at all. Let me also remove the `require` pattern and just pass the view.

- [ ] **Step 1 (corrected): Rewrite PortfolioShell**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import IconRail from "@/components/layout/IconRail";
import AiGuideFooter from "@/components/AiGuideFooter";
import AiGuidePanel from "@/components/AiGuidePanel";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

export default function PortfolioShell({ initialView = "hero" }: { initialView?: ViewKey }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const contentScrollRef = useRef<HTMLElement>(null);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter(initialView);
  const worker = usePortfolioWorker({
    onNavigate: (view: ViewKey) => {
      navigate(view);
    },
  });

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setPanelOpen(false);
    worker.addSystemMessage(`Opened ${name || view}`);
    if (typeof window !== "undefined") {
      const path = view === "hero" ? "/" : `/${view}`;
      window.history.pushState({ view }, "", path);
    }
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
      if (typeof window !== "undefined") {
        const path = result.view === "hero" ? "/" : `/${result.view}`;
        window.history.pushState({ view: result.view }, "", path);
      }
    } else {
      worker.sendMessage(input, activeView, conversationState);
    }
    setPanelOpen(true);
  };

  const handleHeroAiQuery = (input: string) => {
    if (!worker.localAiEnabled) {
      worker.enableLocalAi();
    }
    setTimeout(() => {
      worker.sendMessage(input, "hero", conversationState);
    }, 200);
    setPanelOpen(true);
  };

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <BootScreen
            progress={worker.progress}
            isReady={worker.isReady}
            localAiEnabled={worker.localAiEnabled}
            localAiFallback={worker.localAiFallback}
            localAiPaused={worker.localAiPaused}
            onEnter={enterPortfolio}
          />
        )}
      </AnimatePresence>

      <IconRail
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
        aiReady={worker.isReady}
        aiPaused={worker.localAiPaused}
        aiFallback={worker.localAiFallback}
        aiEnabled={worker.localAiEnabled}
      />

      <section
        ref={contentScrollRef}
        data-testid="content-scroll"
        className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:px-12 md:py-16 xl:px-16 relative custom-scrollbar pb-[180px]"
      >
        <div className="content-stage w-full max-w-[1360px] mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} setView={setActiveView} onAiQuery={handleHeroAiQuery} />
          </AnimatePresence>
        </div>
      </section>

      <AiGuideFooter
        messages={worker.messages}
        isReady={worker.isReady}
        localAiEnabled={worker.localAiEnabled}
        localAiFallback={worker.localAiFallback}
        localAiPaused={worker.localAiPaused}
        progress={worker.progress}
        showReadyToast={worker.showReadyToast}
        enableLocalAi={worker.enableLocalAi}
        onSend={send}
        onFocus={() => setPanelOpen(true)}
      />

      <AiGuidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        messages={worker.messages}
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
      />

      {/* Mobile floating AI button (visible when panel is closed) */}
      {!panelOpen && !isBooting && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-(--accent)/45 bg-(--accent) text-(--bg) shadow-[0_18px_48px_rgba(var(--accent-rgb),0.36)] transition-transform active:scale-95 md:hidden"
          aria-label="Open AI guide"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-(--bg)/15">
            <MessageCircle className="h-4.5 w-4.5" />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-(--accent) bg-green-400 text-[7px] font-black tracking-tighter text-black shadow-sm">
              AI
            </span>
          </span>
        </button>
      )}
    </main>
  );
}
```

I need to import `MessageCircle` from lucide-react for the floating button. Let me add that to the imports.

Also need to consider that the `require` approach won't work — I'll just define `desktopRailItems` inside IconRail where it's used, which is already the plan.

Let me refine the PortfolioShell code to be clean.

- [ ] **Step 1: Rewrite PortfolioShell**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import BootScreen from "@/components/BootScreen";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import IconRail from "@/components/layout/IconRail";
import AiGuideFooter from "@/components/AiGuideFooter";
import AiGuidePanel from "@/components/AiGuidePanel";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

export default function PortfolioShell({ initialView = "hero" }: { initialView?: ViewKey }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const contentScrollRef = useRef<HTMLElement>(null);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter(initialView);
  const worker = usePortfolioWorker({
    onNavigate: (view: ViewKey) => {
      navigate(view);
    },
  });

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setPanelOpen(false);
    worker.addSystemMessage(`Opened ${name || view}`);
    if (typeof window !== "undefined") {
      const path = view === "hero" ? "/" : `/${view}`;
      window.history.pushState({ view }, "", path);
    }
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
      if (typeof window !== "undefined") {
        const path = result.view === "hero" ? "/" : `/${result.view}`;
        window.history.pushState({ view: result.view }, "", path);
      }
    } else {
      worker.sendMessage(input, activeView, conversationState);
    }
    setPanelOpen(true);
  };

  const handleHeroAiQuery = (input: string) => {
    if (!worker.localAiEnabled) {
      worker.enableLocalAi();
    }
    setTimeout(() => {
      worker.sendMessage(input, "hero", conversationState);
    }, 200);
    setPanelOpen(true);
  };

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <BootScreen
            progress={worker.progress}
            isReady={worker.isReady}
            localAiEnabled={worker.localAiEnabled}
            localAiFallback={worker.localAiFallback}
            localAiPaused={worker.localAiPaused}
            onEnter={enterPortfolio}
          />
        )}
      </AnimatePresence>

      <IconRail
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
        aiReady={worker.isReady}
        aiPaused={worker.localAiPaused}
        aiFallback={worker.localAiFallback}
        aiEnabled={worker.localAiEnabled}
      />

      <section
        ref={contentScrollRef}
        data-testid="content-scroll"
        className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:px-12 md:py-16 xl:px-16 relative custom-scrollbar pb-[180px]"
      >
        <div className="content-stage w-full max-w-[1360px] mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} setView={setActiveView} onAiQuery={handleHeroAiQuery} />
          </AnimatePresence>
        </div>
      </section>

      <AiGuideFooter
        messages={worker.messages}
        isReady={worker.isReady}
        localAiEnabled={worker.localAiEnabled}
        localAiFallback={worker.localAiFallback}
        localAiPaused={worker.localAiPaused}
        progress={worker.progress}
        showReadyToast={worker.showReadyToast}
        enableLocalAi={worker.enableLocalAi}
        onSend={send}
        onFocus={() => setPanelOpen(true)}
      />

      <AiGuidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        messages={worker.messages}
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
      />

      {!panelOpen && !isBooting && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-(--accent)/45 bg-(--accent) text-(--bg) shadow-[0_18px_48px_rgba(var(--accent-rgb),0.36)] transition-transform active:scale-95 md:hidden"
          aria-label="Open AI guide"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-(--bg)/15">
            <MessageCircle className="h-4.5 w-4.5" />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-(--accent) bg-green-400 text-[7px] font-black tracking-tighter text-black shadow-sm">
              AI
            </span>
          </span>
        </button>
      )}
    </main>
  );
}
```

- [ ] **Step 2: Verify build** — Run `npm run build` and fix any import/type errors

---

### Task 5: Remove old components

**Files:**
- Delete: `src/components/PortfolioSidebar.tsx`
- Delete: `src/components/MobileCommandSheet.tsx`

- [ ] **Step 1: Verify no remaining imports of PortfolioSidebar or MobileCommandSheet**

Search for any import references:
```bash
rg "PortfolioSidebar|MobileCommandSheet" src/
```

Expected: only matches in the old PortfolioShell (already replaced).

- [ ] **Step 2: Delete the files**

```bash
rm src/components/PortfolioSidebar.tsx
rm src/components/MobileCommandSheet.tsx
```

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: compiled successfully

---

### Task 6: Final verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: compiled successfully, all routes generated

- [ ] **Step 2: Verify the e2e test still works (if applicable)**

Run: `npx playwright test --project=chromium` (if tests exist)
Expected: tests pass

- [ ] **Step 3: Visual check of layout**
  - Desktop: 76px icon rail on left, content in center, footer bar at bottom
  - Desktop with panel open: footer + panel slides up
  - Mobile: no icon rail, floating button, footer full-width, panel full-screen
