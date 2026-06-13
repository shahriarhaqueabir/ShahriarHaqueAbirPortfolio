"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { MessageSquare, User, X, Home, Briefcase, Layers, Zap, BarChart3, Mail, User as UserIcon, Cpu, Power } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";

type AiGuidePanelProps = {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  activeView: ViewKey;
  localAiEnabled: boolean;
  enableLocalAi: () => void;
  onNavigate: (view: ViewKey) => void;
  onSend: (input: string) => void;
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

export default function AiGuidePanel({ open, onClose, messages, activeView, localAiEnabled, enableLocalAi, onNavigate, onSend }: AiGuidePanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Find the index of the latest non-typing content message (AI or fallback)
  const latestContentIdx = messages.reduceRight<number | null>((found, m, i) => {
    if (found !== null) return found;
    return (m.sender === "ai" || m.sender === "fallback") && !m.isTyping ? i : null;
  }, null);

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
            className="fixed bottom-0 left-0 right-0 md:left-[68px] z-40 bg-(--surface)/95 backdrop-blur-3xl border-t border-(--border) shadow-2xl flex flex-col"
            style={{ height: "60vh", maxHeight: "600px" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-(--border) shrink-0">
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-(--accent)">AI Guide · Conversation</span>
              <div className="flex items-center gap-2">
                {/* Mobile nav buttons */}
                <div className="flex gap-1 md:hidden overflow-x-auto">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        onNavigate(item.view);
                        onClose();
                      }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-sm text-[8px] font-bold uppercase tracking-widest border transition-colors ${
                        activeView === item.view ? "bg-(--accent) text-white border-(--accent)" : "bg-transparent text-(--text-muted) border-(--border) hover:border-(--text) hover:text-(--text)"
                      }`}
                    >
                      <item.icon className="w-2.5 h-2.5" />
                      <span className="inline">{item.name}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-sm text-(--text-muted) hover:text-(--text) hover:bg-(--surface) transition-colors focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  aria-label="Close AI guide panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI enable prompt when AI is off */}
            {!localAiEnabled && (
              <div className="px-4 py-4 border-b border-(--border) shrink-0">
                <button
                  type="button"
                  onClick={enableLocalAi}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-(--accent) bg-(--surface) text-(--text) transition-all hover:bg-(--accent) hover:text-(--bg) group focus:outline-none focus:ring-2 focus:ring-(--accent)"
                >
                  <Power className="h-4 w-4 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Enable AI Portfolio Guide</span>
                  <span className="text-[8px] font-mono text-(--text-muted) group-hover:text-(--bg)/80 transition-colors hidden sm:inline">
                    Ask questions · Get a recruiter path · Explore projects
                  </span>
                </button>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 pb-[140px] flex flex-col gap-3 custom-scrollbar" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.length === 0 && <p className="text-[10px] font-mono text-(--text-muted) text-center mt-6">Start a conversation...</p>}
              {messages.map((msg, idx) => {
                const isLatestAi = msg.sender === "ai" && idx === latestContentIdx;
                const isPast = idx !== latestContentIdx && (msg.sender === "ai" || msg.sender === "fallback") && !msg.isTyping && !msg.isReadyGreen;

                return (
                  <div
                    key={msg.id}
                    className={`max-w-[90%] p-3 rounded-sm text-[12px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-(--text) text-(--bg) self-end font-medium"
                        : msg.sender === "sys"
                          ? "bg-transparent text-(--text-muted) border-l-2 border-(--border) self-start font-mono text-[8px] uppercase tracking-widest pl-3 py-1 shadow-none"
                          : isPast
                            ? "bg-(--surface-2)/60 text-(--text-muted) border border-(--border)/50 self-start font-mono text-[10px]"
                            : msg.sender === "fallback"
                              ? "bg-(--surface) text-(--text) border-l-2 border-(--accent) self-start font-mono text-[10px]"
                              : msg.isReadyGreen
                                ? "bg-green-500 text-white border-green-400 self-start font-bold"
                                : "bg-(--surface) text-(--text) border border-(--border) self-start font-mono text-[10px]"
                    }`}
                  >
                    <div className={`flex items-start gap-3 ${isPast ? "opacity-60" : ""}`}>
                      {msg.sender === "ai" && !msg.isTyping && <MessageSquare className={`w-3 h-3 mt-1 shrink-0 ${isPast ? "text-(--text-muted)" : "text-(--accent) opacity-50"}`} />}
                      {msg.sender === "fallback" && <Cpu className={`w-3 h-3 mt-1 shrink-0 ${isPast ? "text-(--text-muted)" : "text-(--accent) opacity-50"}`} />}
                      {msg.sender === "user" && <User className="w-3 h-3 mt-1 text-(--bg) opacity-50 shrink-0" />}
                      <span>
                        {msg.isTyping ? (
                          <span className="animate-pulse flex gap-1 items-center h-4">
                            <span className="w-1 h-1 bg-(--accent) rounded-full" />
                            <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-100" />
                            <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-200" />
                          </span>
                        ) : msg.sender === "ai" && isLatestAi ? (
                          <TypewriterText key={msg.id} text={msg.text} />
                        ) : (
                          msg.text
                        )}
                      </span>
                    </div>
                    {msg.sender === "fallback" && !isPast && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {msg.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => onSend(suggestion)}
                            className="px-2.5 py-1 rounded-sm border border-(--accent)/40 text-[9px] font-mono text-(--accent) hover:bg-(--accent) hover:text-(--bg) transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
