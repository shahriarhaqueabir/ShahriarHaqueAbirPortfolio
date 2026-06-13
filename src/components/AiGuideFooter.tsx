"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, MessageSquare, Send, CheckCircle2, ChevronUp } from "lucide-react";
import type { Message } from "@/lib/types";

type AiGuideFooterProps = {
  messages: Message[];
  isReady: boolean;
  localAiEnabled: boolean;
  localAiFallback: boolean;
  localAiPaused: boolean;
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

export default function AiGuideFooter({ messages, isReady, localAiEnabled, localAiFallback, localAiPaused, progress, showReadyToast, onSend, onFocus }: AiGuideFooterProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAiOrFallback = localAiEnabled && !localAiPaused;
  const showSuggestions = activeAiOrFallback && isReady && !localAiFallback && messages.filter((m) => m.sender !== "sys").length <= 1;

  const lastMessage = [...messages].reverse().find((m) => (m.sender === "ai" || m.sender === "fallback") && !m.isTyping && !m.isReadyGreen);

  const handleSubmit = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    onSend(text);
    onFocus();
  }, [input, onSend, onFocus]);

  const showExpandHint = !localAiEnabled;

  return (
    <footer className="fixed bottom-0 left-0 right-0 md:left-[68px] z-50 border-t border-(--border) bg-(--surface)/90 backdrop-blur-3xl">
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

        {/* Status text / last message */}
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

        {/* Suggestions chips */}
        {showSuggestions && (
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
                className="shrink-0 px-3 py-2 rounded-sm border border-(--border) text-[9px] font-mono uppercase tracking-wider text-(--text-muted) hover:text-(--accent) hover:border-(--accent) transition-colors bg-(--bg)/50"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Expand hint when AI is off */}
        {showExpandHint && (
          <div className="flex items-center gap-2 px-1">
            <ChevronUp className="w-3 h-3 text-(--accent) animate-bounce" />
            <span className="text-[8px] font-mono uppercase tracking-widest text-(--text-muted)">Expand the guide panel to enable AI conversations</span>
          </div>
        )}

        {/* Input row — always visible */}
        <div className="relative">
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
                      ? `Loading guide... ${Math.round(progress)}%`
                      : "Ask a question..."
            }
            disabled={localAiPaused}
            className="w-full bg-(--surface) border border-(--border) rounded-sm py-2 pl-8 pr-9 text-sm font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
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
      </div>
    </footer>
  );
}
