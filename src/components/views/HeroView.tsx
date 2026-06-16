"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, Download, Send, Sparkles } from "lucide-react";
import { CONFIG } from "@/lib/data";
import Image from "next/image";
import type { ViewKey } from "@/lib/types";

export default function HeroView({ setView, onAiQuery }: { setView: (v: ViewKey) => void; onAiQuery?: (input: string) => void }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [aiInput, setAiInput] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const phrases: Array<{ text: string; highlight: string; color: string }> = [
    { text: "Tier-3 Technical Support", highlight: "Support", color: "#38BDF8" },
    { text: "Systems & API Integration", highlight: "Integration", color: "#F59E0B" },
    { text: "Incident & SLA Management", highlight: "Incident", color: "#A78BFA" },
    { text: "Root Cause Analysis", highlight: "Analysis", color: "#10B981" },
    { text: "Technical Operations Engineer", highlight: "Operations", color: "#F472B6" },
    { text: "SQL & Log Stream Auditing", highlight: "Log", color: "#5EEAD4" },
    { text: "Enterprise SaaS Operations", highlight: "SaaS", color: "#6366F1" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const handleAiSubmit = () => {
    const q = aiInput.trim();
    if (!q || !onAiQuery) return;
    setAiInput("");
    onAiQuery(q);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
      className="min-h-full pb-24 relative overflow-hidden"
    >
      <motion.div
        className="absolute right-0 top-8 hidden h-[72vh] w-px opacity-60 xl:block"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
        }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 0.8, 0.4] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
        {/* Role badge + Name */}
        <div className="w-full max-w-5xl">
          <div className="mb-5 border-l-2 border-(--accent) pl-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--accent)">{CONFIG.tagline}</p>
          </div>

          <h1 className="font-syne text-[1.8rem] font-black leading-[1.08] tracking-tight text-(--text) xl:text-[3.4rem] 2xl:text-[4rem] text-balance">
            {CONFIG.name.split(" ").map((word, i) => (
              <span key={i} className={word === CONFIG.nameHL ? "text-(--accent)" : ""}>
                {word}
                {i < CONFIG.name.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
        </div>

        {/* Profile photo + rotating competency badge */}
        <div className="w-full max-w-sm mx-auto relative group">
          <motion.div
            className="absolute -inset-5 bg-(--accent) opacity-14 rounded-sm blur-2xl"
            animate={shouldReduceMotion ? {} : { opacity: [0.1, 0.2, 0.1] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-10 bg-[#F59E0B] opacity-10 rounded-full blur-3xl"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-full aspect-[4/5] z-10 border border-(--border) shadow-2xl overflow-hidden rounded-sm">
            <Image src={CONFIG.profileImage} alt={CONFIG.name} fill className="object-cover" priority />
          </div>

          {/* Rotating competency badge */}
          <div
            className="absolute bottom-3 right-3 border border-(--border) p-3 md:bottom-4 md:right-4 md:p-4 rounded-sm shadow-2xl z-20 min-w-[120px] md:min-w-[170px] max-w-[calc(100%-1.5rem)] md:max-w-[calc(100%-2.5rem)] backdrop-blur"
            style={{ backgroundColor: "#000000" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhrase}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                className="font-syne font-black text-sm uppercase leading-tight md:text-lg"
              >
                {phrases[currentPhrase].text.split(" ").map((word, i) => (
                  <span key={i}>{word.includes(phrases[currentPhrase].highlight) ? <span style={{ color: phrases[currentPhrase].color }}>{word} </span> : word + " "}</span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quote */}
        <div className="w-full max-w-3xl">
          <p className="font-sans text-base leading-7 text-(--text) md:text-lg md:leading-8">
            I bridge the gap between complex enterprise architectures and critical system processes; turning production issues into clear decisions, repeatable solutions, and long-term operational
            frameworks.
          </p>
        </div>

        {/* Impact stats */}
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-3">
            {CONFIG.heroStats.map((stat) => (
              <div key={stat.label} className="bg-(--bg) p-5 min-w-0">
                <div className="mb-2 font-syne text-xl font-black leading-none text-(--text)">{stat.value}</div>
                <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-(--text-muted) break-words">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <button
              onClick={() => setView("projects")}
              className="shine-surface inline-flex items-center justify-center gap-2 border border-(--accent) px-6 text-(--accent) rounded-sm text-[10px] font-bold uppercase tracking-widest transition-[background-color,color,box-shadow,transform] hover:bg-(--accent) hover:text-(--bg) active:scale-95 min-h-[44px] md:border-0 md:bg-(--accent) md:text-(--bg) md:px-8 md:py-4 md:min-h-0 md:text-xs md:hover:bg-(--text) md:shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)]"
            >
              View Case Studies
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/shahriar-haque-abir-cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-(--accent) px-6 text-(--bg) rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)] transition-[background-color,color,box-shadow,transform] hover:bg-(--text) active:scale-95 min-h-[44px] md:border md:border-(--accent) md:bg-transparent md:text-(--accent) md:px-8 md:py-4 md:min-h-0 md:text-xs md:shadow-none md:hover:bg-(--accent) md:hover:text-(--bg) md:hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              onClick={() => setView("contact")}
              className="inline-flex items-center justify-center gap-2 border border-(--border) text-(--text) px-6 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:border-(--accent) hover:text-(--accent) active:scale-95 transition-[border-color,color,box-shadow,transform] hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)] min-h-[44px] md:px-8 md:py-4 md:min-h-0 md:text-xs"
            >
              <Sparkles className="h-4 w-4" />
              Connect With Me
            </button>
          </div>
        </div>

        {/* Location and work auth */}
        <div className="w-full max-w-3xl flex flex-wrap gap-4 items-center">
          <div className="inline-flex items-center gap-2 border border-(--border) px-3 py-2">
            <span className="font-syne font-black text-xs text-(--accent)">Based in</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--text)">Berlin, Germany</span>
          </div>
          <div className="inline-flex items-center gap-2 border border-(--border) px-3 py-2">
            <span className="font-syne font-black text-xs text-(--accent2)">Language</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--text)">German B2 (Professional)</span>
          </div>
          <div className="inline-flex items-center gap-2 border border-(--border) px-3 py-2">
            <span className="font-syne font-black text-xs text-(--accent2)">Authorization</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--text)">Niederlassungserlaubnis</span>
          </div>
        </div>

        {/* AI prompt */}
        {onAiQuery && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.6 }}
            className="w-full max-w-xl"
          >
            <div className="relative">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAiSubmit()}
                aria-label="Ask me anything about Shahriar"
                placeholder="Ask me anything about Shahriar..."
                className="w-full bg-(--surface) border border-(--border) rounded-sm pl-3 pr-10 py-2.5 text-xs font-mono text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:border-(--accent) transition-colors"
              />
              <button
                onClick={handleAiSubmit}
                disabled={!aiInput.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--accent) disabled:opacity-30 transition-colors p-1"
                aria-label="Ask AI guide"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-(--text-muted)">Powered by Qwen2.5 &middot; Runs locally in your browser &middot; No data sent</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
