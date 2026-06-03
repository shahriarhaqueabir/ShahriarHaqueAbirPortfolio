"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Briefcase, CheckCircle2, Cpu, Home, Layers, Mail, MessageSquare, Power, Send, User, Zap } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";

const navItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: Home, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
  { name: "Stats", icon: BarChart3, view: "stats" },
  { name: "Contact", icon: Mail, view: "contact" },
];

function TypewriterText({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 16);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span>
      {visibleText}
      {visibleText.length < text.length && <span className="ml-0.5 inline-block h-4 w-1 translate-y-0.5 animate-pulse bg-(--accent)" />}
    </span>
  );
}

type PortfolioSidebarProps = {
  messages: Message[];
  isReady: boolean;
  localAiEnabled: boolean;
  localAiFallback: boolean;
  localAiPaused: boolean;
  progress: number;
  activeView: ViewKey;
  showReadyToast: boolean;
  variant?: "desktop" | "mobile";
  enableLocalAi: () => void;
  onNavigate: (view: ViewKey, name?: string) => void;
  onSend: (input: string) => void;
};

export default function PortfolioSidebar({
  messages,
  isReady,
  localAiEnabled,
  localAiFallback,
  localAiPaused,
  progress,
  activeView,
  showReadyToast,
  variant = "desktop",
  enableLocalAi,
  onNavigate,
  onSend,
}: PortfolioSidebarProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = variant === "mobile";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    const userInput = input.trim();
    if (!userInput) return;

    setInput("");
    onSend(userInput);
  };

  return (
    <>
      <div className={`${isMobile ? "p-5" : "p-8"} border-b border-(--border) flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-4 min-w-0">
          <motion.div
            animate={isReady ? { boxShadow: ["0 0 0px var(--accent)", "0 0 15px var(--accent)", "0 0 0px var(--accent)"] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-sm bg-(--text) flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden border border-(--border) relative shrink-0"
            onClick={() => onNavigate("hero", "Home")}
          >
            <Image src="/logo.jpg" alt="Shahriar Haque Abir logo" fill className="object-cover" />
          </motion.div>
          <div className="min-w-0">
            <h2 className="text-sm font-syne font-black uppercase tracking-widest text-(--text) flex items-center gap-2 truncate">
              Shahriar Haque Abir{" "}
              <Cpu
                className={`w-3 h-3 shrink-0 ${isReady && !localAiPaused ? (localAiFallback ? "text-(--accent)" : "text-green-500") : localAiEnabled ? "text-orange-500" : "text-(--text-muted)"}`}
              />
            </h2>
            <p className="text-[9px] font-mono text-(--accent) uppercase tracking-tighter">Lead Technical Solution Consultant</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[8px] font-mono text-(--text-muted) uppercase">
            [{localAiPaused ? "Paused" : localAiFallback ? "Fallback" : !localAiEnabled ? "Opt-in" : isReady ? "Ready" : "Loading"}]
          </span>
          <div
            className={`w-2 h-2 rounded-full ${isReady && !localAiPaused ? (localAiFallback ? "bg-(--accent)" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]") : localAiEnabled ? "bg-orange-500" : "bg-(--text-muted)"}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {showReadyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mx-6 mt-4 bg-green-50 border border-green-200 p-4 rounded-sm shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-[10px] font-bold text-green-800 uppercase tracking-wider">AI guide ready</div>
              <div className="text-[9px] text-green-700">Ready to answer portfolio questions.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`${isMobile ? "p-4" : "p-6"} flex-1 overflow-y-auto flex flex-col gap-5 custom-scrollbar`}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`max-w-[90%] p-5 rounded-sm text-[13px] leading-relaxed shadow-sm relative group ${
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
                {msg.sender === "ai" && !msg.isTyping && <MessageSquare className="w-3 h-3 mt-1 text-(--accent) opacity-50" />}
                {msg.sender === "user" && <User className="w-3 h-3 mt-1 text-(--bg) opacity-50" />}
                <span>
                  {msg.isTyping ? (
                    <span className="animate-pulse flex gap-1 items-center h-4">
                      <span className="w-1 h-1 bg-(--accent) rounded-full" />
                      <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-100" />
                      <span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-200" />
                    </span>
                  ) : msg.sender === "ai" ? (
                    <TypewriterText key={`${msg.id}-${msg.text}`} text={msg.text} />
                  ) : (
                    msg.text
                  )}
                </span>
              </div>

              {msg.sender === "ai" && <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-(--border) opacity-0 group-hover:opacity-100 transition-opacity" />}
            </motion.div>
          ))}
        </AnimatePresence>

        {!localAiPaused && !localAiEnabled && (
          <div className="flex flex-col gap-3 mx-1">
            <div className="relative">
              {/* Pulsing ring */}
              <div className="absolute inset-[-3px] rounded-sm border border-(--accent) opacity-40 animate-ping" />
              <button
                type="button"
                onClick={enableLocalAi}
                className="relative w-full flex flex-col items-center gap-2 border border-(--accent) bg-(--surface) px-4 py-4 text-(--text) transition-all hover:bg-(--accent) hover:text-(--bg) group"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <Power className="h-3.5 w-3.5" />
                  Enable AI Portfolio Guide
                </div>
                <div className="text-[9px] font-mono text-(--text-muted) group-hover:text-(--bg)/80 transition-colors">
                  Ask questions · Get a recruiter path · Explore projects
                </div>
              </button>
            </div>
            <div className="text-[8px] font-mono text-center uppercase tracking-wider text-(--text-muted)">
              <span suppressHydrationWarning>
                {typeof window !== "undefined" && typeof navigator !== "undefined" && "gpu" in navigator
                  ? "✔ WebGPU · Llama 3.2 1B · Runs locally · No data sent"
                  : "⚠ Lightweight fallback mode · No model download"}
              </span>
            </div>
          </div>
        )}

        <div className={`${isMobile ? "mt-2 pt-4" : "mt-8 pt-8"} border-t border-(--border)`}>
          <div className="text-[9px] font-mono text-(--text-muted) uppercase tracking-[0.2em] mb-5 px-1">Explore Portfolio</div>
          <div className={isMobile ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.view, item.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                  activeView === item.view
                    ? "bg-(--accent) text-white border-(--accent) shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]"
                    : "bg-transparent text-(--text-muted) border-(--border) hover:border-(--text) hover:text-(--text) hover:bg-(--surface-2)"
                }`}
              >
                <item.icon className="w-3 h-3" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className={`${isMobile ? "p-5" : "p-8"} border-t border-(--border) bg-(--surface)/35 backdrop-blur-md`}>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
            placeholder={
              localAiPaused
                ? "Search the portfolio..."
                : localAiFallback
                  ? "Ask the fallback guide..."
                  : !localAiEnabled
                    ? "Enable AI guide to ask questions"
                    : isReady
                      ? "Ask about Shahriar..."
                      : `Loading guide... ${Math.round(progress)}%`
            }
            className="w-full bg-(--surface) border border-(--border) rounded-sm p-4 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
          />
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--text-muted)" />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text) hover:text-(--accent) disabled:opacity-30 p-1 group"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-(--text-muted) uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full ${isReady && !localAiPaused ? (localAiFallback ? "bg-(--accent)" : "bg-green-500") : localAiEnabled ? "bg-orange-500" : "bg-gray-400"}`} />
            {localAiPaused ? "[GUIDE PAUSED]" : localAiFallback ? "[GUIDE FALLBACK]" : !localAiEnabled ? "[GUIDE OPT-IN]" : isReady ? "[GUIDE READY]" : "[GUIDE LOADING]"}
          </span>
          <span>PORTFOLIO Q&A</span>
        </div>
      </div>
    </>
  );
}
