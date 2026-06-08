"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Send, Sparkles } from "lucide-react";
import { CONFIG } from "@/lib/data";
import Image from "next/image";
import type { ViewKey } from "@/lib/types";

export default function HeroView({
  setView,
  onAiQuery,
}: {
  setView: (v: ViewKey) => void;
  onAiQuery?: (input: string) => void;
}) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [aiInput, setAiInput] = useState("");

  const phrases: Array<{ text: string; highlight: string; color: string }> = [
    { text: "Tier-3 Technical Support", highlight: "Support", color: "#38BDF8" },
    { text: "Systems & API Integration", highlight: "Integration", color: "#F59E0B" },
    { text: "Incident & SLA Management", highlight: "Incident", color: "#A78BFA" },
    { text: "Root Cause Analysis", highlight: "RCA", color: "#10B981" },
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="min-h-full flex items-start md:items-center relative overflow-hidden"
    >
      <div className="absolute right-0 top-8 hidden h-[72vh] w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-60 xl:block" />
      <div className="flex w-full flex-col items-center gap-10 xl:flex-row xl:gap-14 2xl:gap-16">
        {/* ── Left column ──────────────────────────────── */}
        <div className="relative z-10 w-full xl:flex-[1.05]">
          {/* Role badge */}
          <div className="mb-5 max-w-3xl border-l-2 border-(--accent) pl-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--accent)">
              {CONFIG.tagline}
            </p>
            <p className="mt-2 text-sm font-mono text-(--text-muted) tracking-widest">
              {CONFIG.taglineContext}
            </p>
          </div>

          {/* Name */}
          <h1 className="mb-6 max-w-[760px] font-syne text-[2.2rem] font-black leading-[0.96] tracking-tight text-(--text) md:mb-7 md:text-3xl xl:text-[4.3rem] 2xl:text-[5rem]">
            <span className="block mb-2">
              {CONFIG.name.split(" ").map((word, i) =>
                word === CONFIG.nameHL ? (
                  <span key={i} className="pr-4">
                    {word}
                  </span>
                ) : null,
              )}
            </span>
            <span className="block">
              {CONFIG.name.split(" ").map((word, i) =>
                word !== CONFIG.nameHL ? (
                  <span key={i} className="inline-block mr-4">
                    {word}
                  </span>
                ) : null,
              )}
            </span>
          </h1>

          {/* Hero quote — the best line in the portfolio */}
          <p className="mb-8 max-w-[680px] font-playfair text-lg italic leading-9 text-(--text) md:text-xl md:leading-10">
            I like being the person who can enter a messy technical situation, find the signal,
            explain the tradeoffs, and help the next step become clear —
            <span className="not-italic font-inter font-normal text-base md:text-lg text-(--text-muted) ml-1">
              then build the automation that makes it not happen again.
            </span>
          </p>

          {/* Impact stat cards */}
          <div className="mb-10 grid max-w-3xl grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-3">
            {CONFIG.heroStats.map((stat) => (
              <div key={stat.label} className="bg-(--bg) p-5">
                <div className="mb-3 font-syne text-2xl font-black leading-none text-(--text)">
                  {stat.value}
                </div>
                <p className="text-xs font-bold uppercase leading-5 tracking-[0.12em] text-(--text-muted)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <button
              onClick={() => setView("projects")}
              className="shine-surface order-2 inline-flex items-center justify-center gap-3 border border-(--accent) px-8 py-4 text-(--accent) rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:bg-(--accent) hover:text-(--bg) md:order-1 md:border-0 md:bg-(--accent) md:text-(--bg) md:px-10 md:py-5 md:text-sm md:hover:bg-(--text) md:shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)]"
            >
              View Case Studies
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/shahriar-haque-abir-cv.pdf"
              download
              className="order-1 inline-flex items-center justify-center gap-3 bg-(--accent) px-8 py-4 text-(--bg) rounded-sm text-xs font-bold uppercase tracking-widest shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)] transition-all hover:bg-(--text) md:order-2 md:border md:border-(--accent) md:bg-transparent md:text-(--accent) md:px-10 md:py-5 md:text-sm md:shadow-none md:hover:bg-(--accent) md:hover:text-(--bg) md:hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              onClick={() => setView("contact")}
              className="order-3 inline-flex items-center justify-center gap-3 border border-(--border) text-(--text) px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)] md:px-10 md:py-5 md:text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Connect With Me
            </button>
          </div>

          {/* Inline AI prompt */}
          {onAiQuery && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 max-w-xl"
            >
              <div className="relative">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSubmit()}
                  placeholder="Ask me anything about Shahriar..."
                  className="w-full bg-(--surface) border border-(--border) rounded-sm pl-4 pr-12 py-3.5 text-sm font-mono text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:border-(--accent) transition-colors"
                />
                <button
                  onClick={handleAiSubmit}
                  disabled={!aiInput.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--accent) disabled:opacity-30 transition-colors p-1"
                  aria-label="Ask AI guide"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-(--text-muted)">
                Powered by Llama 3.2 · Runs locally in your browser · No data sent
              </p>
            </motion.div>
          )}
        </div>

        {/* ── Right column — profile image ──────────────── */}
        <div className="w-full max-w-[560px] xl:flex-[0.88] relative group z-10">
          <div className="relative">
            <div className="absolute -inset-5 bg-(--accent) opacity-14 rounded-sm blur-2xl group-hover:opacity-28 transition-opacity" />
            <div className="absolute -inset-10 bg-[#F59E0B] opacity-10 rounded-full blur-3xl" />
            <div className="relative w-full h-[360px] md:h-[520px] 2xl:h-[580px] z-10 border border-(--border) grayscale-[0.25] hover:grayscale-0 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm glass-panel">
              <div className="scanline-overlay absolute inset-0 z-20 pointer-events-none" />
              <Image
                src={CONFIG.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"}
                alt={CONFIG.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating status badge */}
            <motion.div
              className="shine-surface absolute z-20 hidden w-fit bg-(--text) text-(--bg) border border-(--text) px-5 py-4 shadow-xl md:block"
              style={{ left: "-1.5rem", bottom: "35rem", top: "auto" }}
              animate={{ y: [0, 12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">status</div>
              <div className="whitespace-nowrap font-syne font-black text-sm uppercase">human in the loop</div>
            </motion.div>

            {/* Rotating competency badge */}
            <div
              className="absolute bottom-4 right-4 border border-(--border) p-4 md:bottom-6 md:right-6 md:p-6 rounded-sm shadow-2xl z-20 min-w-[180px] md:min-w-[200px] max-w-[calc(100%-2rem)] md:max-w-[calc(100%-3rem)] backdrop-blur"
              style={{ backgroundColor: "#000000" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-syne font-black text-base uppercase leading-tight md:text-xl"
                >
                  {phrases[currentPhrase].text.split(" ").map((word, i) => (
                    <span key={i}>
                      {word.includes(phrases[currentPhrase].highlight) ? (
                        <span style={{ color: phrases[currentPhrase].color }}>{word} </span>
                      ) : (
                        word + " "
                      )}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
