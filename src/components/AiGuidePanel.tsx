"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import VoiceButton from "@/components/VoiceButton";
import { MessageSquare, Send, Cpu, User, X, Home, Briefcase, Layers, Zap, BarChart3, Mail, User as UserIcon, Power } from "lucide-react";
import type { Message, ViewKey } from "@/lib/types";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useVoiceOutput } from "@/hooks/useVoiceOutput";

type AiGuidePanelProps = {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  activeView: ViewKey;
  localAiEnabled: boolean;
  enableLocalAi: () => void;
  localAiFallback: boolean;
  onNavigate: (view: ViewKey) => void;
  onSend: (input: string) => void;
  // Shared state lifted to PortfolioShell
  input: string;
  setInput: (v: string) => void;
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

export default function AiGuidePanel({
  open,
  onClose,
  messages,
  activeView,
  localAiEnabled,
  localAiFallback,
  enableLocalAi,
  onNavigate,
  onSend,
  input,
  setInput,
}: AiGuidePanelProps) {
  const voiceInput = useVoiceInput();
  const voiceOutput = useVoiceOutput();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [usedSuggestions, setUsedSuggestions] = useState<string[]>([]);

  const onSendRef = useRef(onSend);

  useEffect(() => {
    onSendRef.current = onSend;
  }, [onSend]);

  // Populate input with interim transcript while mic is listening
  useEffect(() => {
    if (voiceInput.isListening && voiceInput.interimTranscript) {
      setInput(voiceInput.interimTranscript);
    }
  }, [voiceInput.interimTranscript, voiceInput.isListening, setInput]);

  // Populate input with accumulated transcript when voice stops
  // User clicks Send to transmit — no auto-send
  useEffect(() => {
    if (voiceInput.transcript) {
      setInput(voiceInput.transcript);
    }
  }, [voiceInput.transcript, setInput]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
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

  const latestContentIdx = messages.reduceRight<number | null>((found, m, i) => {
    if (found !== null) return found;
    return (m.sender === "ai" || m.sender === "fallback") && !m.isTyping ? i : null;
  }, null);

  const handleSubmit = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    onSend(text);
  }, [input, onSend, setInput]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setUsedSuggestions((prev) => [...prev, suggestion]);
      onSend(suggestion);
    },
    [onSend],
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-30 bg-black hidden md:block" aria-label="Close guide" />
          <motion.section
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 md:left-[68px] z-40 bg-(--bg) border-t border-(--border) flex flex-col shadow-2xl h-[85vh]"
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-4 border-b border-(--border)">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.view}
                      type="button"
                      onClick={() => onNavigate(item.view)}
                      className={`p-1.5 rounded-sm transition-colors ${activeView === item.view ? "text-(--accent) bg-(--accent)/10" : "text-(--text-muted) hover:text-(--text) hover:bg-(--surface)"}`}
                      aria-label={item.name}
                    >
                      <item.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-(--text-muted) hidden md:inline">{localAiFallback ? "Fallback" : "AI"} Guide</span>
              </div>
              <div className="flex items-center gap-2">
                {!localAiEnabled && (
                  <motion.button
                    type="button"
                    onClick={enableLocalAi}
                    className="flex items-center gap-1.5 px-2.5 py-1 border-2 border-(--accent)/60 bg-(--accent)/[0.12] hover:bg-(--accent)/[0.25] rounded-sm text-[9px] font-mono uppercase tracking-wider text-(--accent) transition-all cursor-pointer animate-pulse shadow-[0_0_12px_rgba(var(--accent-rgb),0.15)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Power className="w-3 h-3" />
                    Enable AI
                    <span className="text-[7px] font-mono uppercase tracking-wider text-(--accent)/60 border border-(--accent)/30 px-1.5 py-0.5 rounded-sm">Recommended</span>
                  </motion.button>
                )}
                <button type="button" onClick={onClose} className="p-1.5 rounded-sm text-(--text-muted) hover:text-(--text) hover:bg-(--surface)" aria-label="Close guide">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar" role="log">
              {messages
                .filter((m) => m.sender !== "sys")
                .map((msg) => {
                  const isLatestAi = msg.sender === "ai" && !msg.isTyping && latestContentIdx === messages.indexOf(msg);
                  const isPast = msg.sender === "ai" && latestContentIdx !== null && messages.indexOf(msg) < latestContentIdx && !msg.isTyping;

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.sender === "user"
                          ? "flex-row-reverse"
                          : msg.sender === "ai" && isLatestAi
                            ? "flex-row"
                            : isPast
                              ? "flex-row opacity-60"
                              : msg.sender === "fallback"
                                ? "flex-row"
                                : "flex-row"
                      }`}
                    >
                      {(msg.sender === "ai" || msg.sender === "fallback") && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.sender === "ai" ? "bg-(--accent)" : "bg-(--accent2)"}`}>
                          <Cpu className={`w-3 h-3 ${msg.sender === "ai" ? "text-(--bg)" : "text-(--bg)"}`} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[9px] font-mono uppercase tracking-wider ${
                              msg.sender === "ai" ? "text-(--accent)" : msg.sender === "fallback" ? "text-(--accent2)" : "text-(--text-muted)"
                            }`}
                          >
                            {msg.sender === "ai" ? "Guide" : msg.sender === "fallback" ? "Guide (Fallback)" : "You"}
                          </span>
                          <VoiceButton
                            mode="speaker"
                            isSpeaking={voiceOutput.isSpeaking}
                            isSupported={voiceOutput.isSupported}
                            onClick={() => (voiceOutput.isSpeaking ? voiceOutput.stopSpeaking() : voiceOutput.speak(msg.text))}
                          />
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="whitespace-pre-wrap">
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
                      </div>
                      {msg.sender === "fallback" && !localAiEnabled && msg.suggestions && msg.suggestions.filter((s) => !usedSuggestions.includes(s)).length > 0 && (
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                                                  {msg.suggestions
                                                    .filter((s) => !usedSuggestions.includes(s))
                                                    .map((suggestion) => (
                                                      <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="px-1.5 py-0.5 rounded-sm border border-(--accent2)/30 text-[8px] font-mono text-(--accent2)/70 hover:text-(--accent2) hover:border-(--accent2)/60 transition-colors"
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

            {/* Input row — shared with footer via lifted state */}
            <div className="shrink-0 border-t border-(--border) px-3 py-2 bg-(--surface)">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={voiceInput.isListening && voiceInput.interimTranscript ? voiceInput.interimTranscript : input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  aria-label="Ask about Shahriar"
                  placeholder={voiceInput.isListening ? "Listening... speak now" : "Ask about Shahriar..."}
                  className="w-full bg-(--surface) border border-(--border) rounded-sm py-2 pl-8 pr-16 text-base md:text-sm font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-(--text-muted)"
                />
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-(--text-muted)" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <VoiceButton
                    mode="input"
                    isListening={voiceInput.isListening}
                    isSupported={voiceInput.isSupported}
                    onClick={voiceInput.isListening ? voiceInput.stopListening : voiceInput.startListening}
                  />
                  <button type="button" onClick={handleSubmit} disabled={!input.trim()} className="text-(--text) hover:text-(--accent) disabled:opacity-30 p-1" aria-label="Send message">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
