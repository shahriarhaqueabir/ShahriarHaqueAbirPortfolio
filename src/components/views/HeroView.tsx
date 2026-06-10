"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  const shouldReduceMotion = useReducedMotion();

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
      initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
      className="min-h-full relative overflow-hidden"
    >
      <div className="absolute right-0 top-8 hidden h-[72vh] w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-60 xl:block" />

      <div className="flex flex-col items-center gap-12 md:gap-16 w-full">

        {/* Role badge + Name */}
        <div className="w-full max-w-3xl">
          <div className="mb-5 border-l-2 border-(--accent) pl-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--accent)">
              {CONFIG.tagline}
            </p>
          </div>

          <h1 className="font-syne text-[2.2rem] font-black leading-[1.08] tracking-tight text-(--text) xl:text-[4.3rem] 2xl:text-[5rem]">
            {CONFIG.name.split(" ").map((word, i) => (
              <span key={i} className={word === CONFIG.nameHL ? "text-(--accent)" : ""}>
                {word}{i < CONFIG.name.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>
        </div>

        {/* Profile photo + rotating competency badge */}
        <div className="w-full max-w-sm mx-auto relative group">
          <div className="absolute -inset-5 bg-(--accent) opacity-14 rounded-sm blur-2xl group-hover:opacity-28 transition-opacity" />
          <div className="absolute -inset-10 bg-[#F59E0B] opacity-10 rounded-full blur-3xl" />
          <div className="relative w-full aspect-[4/5] z-10 border border-(--border) grayscale-[0.25] hover:grayscale-0 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm glass-panel">
            <div className="scanline-overlay absolute inset-0 z-20 pointer-events-none" />
            <Image
              src={CONFIG.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"}
              alt={CONFIG.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Rotating competency badge */}
          <div
            className="absolute bottom-4 right-4 border border-(--border) p-4 md:bottom-6 md:right-6 md:p-6 rounded-sm shadow-2xl z-20 min-w-[140px] md:min-w-[200px] max-w-[calc(100%-2rem)] md:max-w-[calc(100%-3rem)] backdrop-blur"
            style={{ backgroundColor: "#000000" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhrase}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
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

        {/* Quote */}
        <div className="w-full max-w-3xl">
          <p className="font-playfair text-lg italic leading-9 text-(--text) md:text-xl md:leading-10">
            I like being the person who can enter a messy technical situation, find the signal,
            explain the tradeoffs, and help the next step become clear —
            <span className="not-italic font-sans font-normal text-base md:text-lg text-(--text-muted) ml-1">
              then build the automation that makes it not happen again.
            </span>
          </p>
        </div>

        {/* Impact stats */}
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-3">
            {CONFIG.heroStats.map((stat) => (
              <div key={stat.label} className="bg-(--bg) p-5 min-w-0">
                <div className="mb-3 font-syne text-2xl font-black leading-none text-(--text)">
                  {stat.value}
                </div>
                <p className="text-xs font-bold uppercase leading-5 tracking-[0.12em] text-(--text-muted) break-words">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <button
              onClick={() => setView("projects")}
              className="shine-surface inline-flex items-center justify-center gap-3 border border-(--accent) px-8 py-4 text-(--accent) rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:bg-(--accent) hover:text-(--bg) md:border-0 md:bg-(--accent) md:text-(--bg) md:px-10 md:py-5 md:text-sm md:hover:bg-(--text) md:shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)]"
            >
              View Case Studies
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/shahriar-haque-abir-cv.pdf"
              download
              className="inline-flex items-center justify-center gap-3 bg-(--accent) px-8 py-4 text-(--bg) rounded-sm text-xs font-bold uppercase tracking-widest shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)] transition-all hover:bg-(--text) md:border md:border-(--accent) md:bg-transparent md:text-(--accent) md:px-10 md:py-5 md:text-sm md:shadow-none md:hover:bg-(--accent) md:hover:text-(--bg) md:hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              onClick={() => setView("contact")}
              className="inline-flex items-center justify-center gap-3 border border-(--border) text-(--text) px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)] md:px-10 md:py-5 md:text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Connect With Me
            </button>
          </div>
        </div>

        {/* Location and work auth */}
        <div className="w-full max-w-3xl flex flex-wrap gap-4 items-center">
          <div className="inline-flex items-center gap-3 border border-(--border) px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-(--accent)">Based in</span>
            <span className="font-syne font-black text-sm text-(--text)">Berlin, Germany</span>
          </div>
          <div className="inline-flex items-center gap-3 border border-(--border) px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-(--accent2)">Language</span>
            <span className="font-syne font-black text-sm text-(--text)">German B2 (Professional)</span>
          </div>
          <div className="inline-flex items-center gap-3 border border-(--border) px-4 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-(--accent2)">Authorization</span>
            <span className="font-syne font-black text-sm text-(--text)">Niederlassungserlaubnis</span>
          </div>
        </div>

        {/* Capability Stack */}
        <div className="w-full border-t border-(--border) pt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-(--accent) mb-8">Capability Stack</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-(--border) border border-(--border)">
            {[
              { group: "Integration", accent: "#38BDF8", items: ["REST APIs", "Webhooks", "OAuth 2.0", "OpenAPI", "Postman"] },
              { group: "Data", accent: "#34D399", items: ["SQL", "PostgreSQL", "MySQL", "DBeaver"] },
              { group: "Observability", accent: "#A78BFA", items: ["Splunk", "Grafana", "Kibana", "Datadog"] },
              { group: "AI & Automation", accent: "#F472B6", items: ["Ollama", "LangChain", "RAG", "n8n"] },
              { group: "Infrastructure", accent: "#F59E0B", items: ["Docker", "Linux", "GitHub", "Windows Server"] },
            ].map((cluster) => (
              <div key={cluster.group} className="bg-(--bg) p-5 md:p-6">
                <div className="font-syne text-xs font-black uppercase tracking-wider mb-4" style={{ color: cluster.accent }}>
                  {cluster.group}
                </div>
                <ul className="space-y-2">
                  {cluster.items.map((item) => (
                    <li key={item} className="font-mono text-[11px] text-(--text-muted) flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: cluster.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              Powered by Qwen2.5 &middot; Runs locally in your browser &middot; No data sent
            </p>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
