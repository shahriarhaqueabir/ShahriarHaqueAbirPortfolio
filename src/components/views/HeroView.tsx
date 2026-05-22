"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Globe2, Sparkles, TrendingDown, Users } from "lucide-react";
import { CONFIG } from "@/lib/data";
import Image from "next/image";
import type { ViewKey } from "@/lib/types";

export default function HeroView({ setView }: { setView: (v: ViewKey) => void }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases: Array<{ text: string; highlight: string; color: string; solidColor?: boolean; isRainbow?: boolean }> = [
    { text: "IT Networks Engineer", highlight: "Networks", color: "#38BDF8" },
    { text: "Electrical & Electronics Engineer", highlight: "Electronics", color: "#F59E0B" },
    { text: "System Administrator", highlight: "System", color: "#A78BFA" },
    { text: "Information & Communication Engineer", highlight: "Communication", color: "#10B981" },
    { text: "APAC/EMEA/NAM Expertise", highlight: "Expertise", color: "#6366F1" },
    { text: "AI Automation Engineer", highlight: "AI", color: "#F472B6" },
    { text: "Technical Solution Consultant", highlight: "Solution", color: "#5EEAD4" }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const recruiterSignals = [
    { label: "International B2B clients onboarded", value: "10", icon: Globe2 },
    { label: "Production tickets resolved weekly", value: "40", icon: Users },
    { label: "Recurring bug reports reduced per release", value: "30%", icon: TrendingDown },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="min-h-full flex items-start md:items-center relative overflow-hidden"
    >
      <div className="absolute right-0 top-8 hidden h-[72vh] w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-60 xl:block" />
      <div className="flex w-full flex-col items-center gap-10 xl:flex-row xl:gap-14 2xl:gap-16">
        <div className="relative z-10 w-full xl:flex-[1.05]">
          <div className="mb-5 max-w-3xl border-l-2 border-(--accent) pl-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-(--accent)">Lead Technical Solution Consultant</p>
            <p className="mt-3 text-sm leading-6 text-(--text-muted) md:text-base">
              B2B SaaS implementation, product sales support, Tier-3 operations, and AI workflow engineering.
            </p>
          </div>
          <h1 className="mb-6 max-w-[760px] font-syne text-[3.4rem] font-black leading-[0.96] tracking-normal text-(--text) md:mb-7 md:text-7xl xl:text-[6.3rem] 2xl:text-[7rem]">
            <span className="block mb-2">
              {CONFIG.name.split(' ').map((word, i) => 
                word === CONFIG.nameHL 
                  ? <span key={i} className="pr-4">{word}</span>
                  : null
              )}
            </span>
            <span className="block">
              {CONFIG.name.split(' ').map((word, i) => 
                word !== CONFIG.nameHL 
                  ? <span key={i} className="inline-block mr-4">{word}</span>
                : null
              )}
            </span>
          </h1>
          <p className="mb-8 max-w-[720px] text-lg leading-8 text-(--text) md:text-xl md:leading-9">
            Shahriar helps technical products move from ambiguous customer need to stable adoption through discovery, PoCs, onboarding, production troubleshooting, release validation, and automation.
          </p>
          <div className="mb-10 grid max-w-3xl grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-3">
            {recruiterSignals.map((signal) => (
              <div key={signal.label} className="bg-(--bg) p-5">
                <div className="mb-4 flex items-center justify-between gap-4 text-(--accent)">
                  <signal.icon className="h-4 w-4" />
                  <span className="font-syne text-3xl font-black leading-none text-(--text)">{signal.value}</span>
                </div>
                <p className="text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-(--text-muted)">{signal.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <button onClick={() => setView('projects')} className="shine-surface order-2 inline-flex items-center justify-center gap-3 border border-(--accent) px-8 py-4 text-(--accent) rounded-sm text-xs font-bold uppercase tracking-widest transition-all hover:bg-(--accent) hover:text-(--bg) md:order-1 md:border-0 md:bg-(--accent) md:text-(--bg) md:px-10 md:py-5 md:text-sm md:hover:bg-(--text) md:shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)]">
              View Case Studies
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href="/shahriar-haque-abir-cv.pdf" download className="order-1 inline-flex items-center justify-center gap-3 bg-(--accent) px-8 py-4 text-(--bg) rounded-sm text-xs font-bold uppercase tracking-widest shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)] transition-all hover:bg-(--text) md:order-2 md:border md:border-(--accent) md:bg-transparent md:text-(--accent) md:px-10 md:py-5 md:text-sm md:shadow-none md:hover:bg-(--accent) md:hover:text-(--bg) md:hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)]">
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button onClick={() => setView('contact')} className="order-3 inline-flex items-center justify-center gap-3 border border-(--border) text-(--text) px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)] md:px-10 md:py-5 md:text-sm">
              <Sparkles className="h-4 w-4" />
              Connect With Me
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-[560px] xl:flex-[0.88] relative group z-10">
          <div className="relative">
            <div className="absolute -inset-5 bg-(--accent) opacity-14 rounded-sm blur-2xl group-hover:opacity-28 transition-opacity"></div>
            <div className="absolute -inset-10 bg-[#F59E0B] opacity-10 rounded-full blur-3xl"></div>
            <div className="relative w-full h-[360px] md:h-[520px] 2xl:h-[580px] z-10 border border-(--border) grayscale-[0.25] hover:grayscale-0 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm">
              <Image 
                src={CONFIG.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                alt={CONFIG.name} 
                fill
                className="object-cover" 
                priority
              />
            </div>
            <motion.div
              className="shine-surface absolute z-20 hidden w-fit bg-(--text) text-(--bg) border border-(--text) px-5 py-4 shadow-xl md:block"
              style={{ left: "-2rem", top: "3rem", bottom: "auto" }}
              animate={{ y: [0, 12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-60">status</div>
              <div className="whitespace-nowrap font-syne font-black text-sm uppercase">human in the loop</div>
            </motion.div>
            <div className="absolute bottom-4 right-4 border border-(--border) p-4 md:bottom-6 md:right-6 md:p-6 rounded-sm shadow-2xl z-20 min-w-[180px] md:min-w-[200px] max-w-[calc(100%-2rem)] md:max-w-[calc(100%-3rem)] backdrop-blur" style={{ backgroundColor: "#000000" }}>
               <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-syne font-black text-base uppercase leading-tight md:text-xl"
                  style={{ color: phrases[currentPhrase].solidColor ? phrases[currentPhrase].color : "#EEF6F8" }}
                >
                  {phrases[currentPhrase].text.split(' ').map((word, i) => (
                    <span key={i}>
                      {!phrases[currentPhrase].solidColor && word.includes(phrases[currentPhrase].highlight) ? (
                        phrases[currentPhrase].isRainbow ? (
                          <span className="inline-flex">
                            {word.split('').map((char, charIdx) => {
                              const rainbowColors = ["#EF4444", "#F97316", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6"];
                              return (
                                <span key={charIdx} style={{ color: rainbowColors[charIdx % rainbowColors.length] }}>
                                  {char}
                                </span>
                              );
                            })}
                            <span className="inline-block w-4"></span>
                          </span>
                        ) : (
                          <span style={{ color: phrases[currentPhrase].color }}>{word} </span>
                        )
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
