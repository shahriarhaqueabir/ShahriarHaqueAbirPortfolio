"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { MessageSquare, User, X, Home, Briefcase, Layers, Zap, BarChart3, Mail, User as UserIcon } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";

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

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

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
                      <span className="inline">{item.name}</span>
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
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 custom-scrollbar" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.length === 0 && (
                <p className="text-[11px] font-mono text-(--text-muted) text-center mt-8">
                  Start a conversation...
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
                      ) : msg.sender === "ai" ? (
                        <TypewriterText key={msg.id} text={msg.text} />
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
