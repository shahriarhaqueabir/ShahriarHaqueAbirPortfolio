"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, CheckCircle2, ChevronUp } from "lucide-react";
import type { Message } from "@/lib/types";

type AiGuideFooterProps = {
  messages: Message[];
  isReady: boolean;
  localAiEnabled: boolean;
  localAiFallback: boolean;
  localAiPaused: boolean;
  panelOpen: boolean;
  progress: number;
  showReadyToast: boolean;
  onSend: (input: string) => void;
  onFocus: () => void;
};

const SUGGESTIONS = [
  { label: "Show projects", input: "show projects" },
  { label: "Recruiter path", input: "guide me around" },
  { label: "Compare skills", input: "compare skills to experience" },
  { label: "Download CV", input: "/shahriar-haque-abir-cv.pdf" },
];

const FOOTER_TIPS = [
  'Try "show me his projects" or "what are his skills"',
  'Ask "compare skills to experience" for a capability overview',
  'Say "guide me around" for a recruiter-focused tour',
  "Open the panel and enable AI for deeper conversations",
];

export default function AiGuideFooter({ messages, isReady, localAiEnabled, localAiFallback, localAiPaused, panelOpen, progress, showReadyToast, onSend, onFocus }: AiGuideFooterProps) {
  const [tipIndex, setTipIndex] = useState(0);

  // Rotate through footer tips
  useEffect(() => {
    if (localAiPaused) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % FOOTER_TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [localAiPaused]);

  // Always show suggestion chips when conversation is fresh (≤1 non-system message)
  const showSuggestions = messages.filter((m) => m.sender !== "sys").length <= 1;

  const lastMessage = [...messages].reverse().find((m) => (m.sender === "ai" || m.sender === "fallback") && !m.isTyping && !m.isReadyGreen);

  const showExpandHint = !localAiEnabled;

  return (
    <footer
      className="hidden md:block fixed bottom-0 left-0 right-0 md:left-[68px] z-50 border-t border-(--border) bg-(--surface)/90 backdrop-blur-3xl transition-opacity duration-300"
      style={panelOpen ? { opacity: 0, pointerEvents: "none" } : undefined}
    >
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

      <div className="flex flex-col gap-1.5 px-3 py-2 md:px-4 md:py-3">
        {/* Status bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <div
              className={`h-2 w-2 shrink-0 rounded-full ${
                isReady && !localAiPaused ? (localAiFallback ? "bg-(--accent)" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]") : localAiEnabled ? "bg-orange-500" : "bg-(--text-muted)"
              }`}
            />
            <span className="text-[9px] font-mono text-(--text-muted) uppercase tracking-wider shrink-0">
              [{localAiPaused ? "Paused" : localAiFallback ? "Fallback" : !localAiEnabled ? "Fallback" : isReady ? "AI Ready" : "Loading"}]
            </span>
            <span className="text-[9px] font-mono text-(--text-muted) uppercase tracking-wider hidden sm:inline">Shahriar&apos;s Guide</span>
          </div>
          <Cpu className={`w-3 h-3 shrink-0 ${isReady && !localAiPaused ? (localAiFallback ? "text-(--accent)" : "text-green-500") : localAiEnabled ? "text-orange-500" : "text-(--text-muted)"}`} />
        </div>

        {/* Status text / last message — clickable to expand panel */}
        <button type="button" onClick={onFocus} className="w-full text-left cursor-pointer">
          {localAiPaused ? (
            <p className="text-[11px] font-mono text-(--text-muted) italic">Guide is paused</p>
          ) : !localAiEnabled ? (
            <p className="text-[11px] font-mono text-(--text) truncate max-w-full">{lastMessage?.text ?? "Ask about projects, experience, or skills — the fallback guide will respond."}</p>
          ) : !isReady ? (
            <p className="text-[11px] font-mono text-(--text-muted)">Loading guide... {Math.round(progress)}%</p>
          ) : lastMessage ? (
            <p className="text-[11px] font-mono text-(--text) truncate max-w-full">{lastMessage.text}</p>
          ) : (
            <p className="text-[11px] font-mono text-(--text-muted)">Welcome. I can walk you through projects, compare experience, or build a recruiter path.</p>
          )}

          {/* Rotating tip — shown when there are no messages yet */}
          {!lastMessage && !localAiPaused && <p className="text-[9px] font-mono text-(--accent2) italic truncate">{FOOTER_TIPS[tipIndex]}</p>}
        </button>

        {/* Suggestions chips */}
        {showSuggestions && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => onSend(s.input)}
                className="shrink-0 px-3 py-2 rounded-sm border border-(--border) text-[11px] md:text-[9px] font-mono uppercase tracking-wider text-(--text-muted) hover:text-(--accent) hover:border-(--accent) transition-colors bg-(--bg)/50"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Expand hint when AI is off — click to open panel */}
        {showExpandHint && (
          <button
            type="button"
            onClick={() => onFocus()}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-sm border-2 border-(--accent)/60 bg-(--accent)/[0.12] hover:bg-(--accent)/[0.25] transition-all cursor-pointer text-left group animate-pulse shadow-[0_0_12px_rgba(var(--accent-rgb),0.15)]"
          >
            <ChevronUp className="w-4 h-4 text-(--accent) shrink-0 group-hover:translate-y-[-2px] transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-(--accent) font-extrabold flex-1">Enable AI Guide · Click to expand panel</span>
            <span className="text-[7px] font-mono uppercase tracking-wider text-(--accent)/60 border border-(--accent)/30 px-2 py-0.5 rounded-sm shrink-0">Recommended</span>
          </button>
        )}
      </div>
    </footer>
  );
}
