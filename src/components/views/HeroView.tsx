"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CONFIG } from "@/lib/data";
import Image from "next/image";
import type { ViewKey } from "@/lib/types";

export default function HeroView({ setView }: { setView: (v: ViewKey) => void }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    { text: "LEVEL 9 WIZARD", highlight: "WIZARD", color: "#5EEAD4" }, // Light Teal
    { text: "S+ Tier Ninja", highlight: "", color: "#1F2937", solidColor: true },
    { text: "Found the bug in the matrix", highlight: "matrix", color: "#10B981" }, // Green
    { text: "Final Boss Energy", highlight: "Boss", color: "#B8860B" },   // Dark Gold
    { text: "Power Level over 9000", highlight: "9000", color: "#EF4444" }, // Red
    { text: "Runs sudo rm -rf /", highlight: "sudo", color: "#F472B6" }, // Pink (Kept as requested earlier)
    { text: "10x Consultant", highlight: "10x", color: "#F97316" },    // Orange
    { text: "Broke the Simulation", highlight: "Broke", color: "#6366F1" }, // Indigo
    { text: "5D Chess Master", highlight: "Chess", color: "#3B82F6" },   // Blue
    { text: "10+ Years of innovation", highlight: "innovation", color: "#8B5CF6" }, // Purple
    { text: "A wonderful Person", highlight: "Person", isRainbow: true }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="min-h-full flex items-center relative overflow-hidden"
    >
      <div className="absolute right-0 top-8 hidden h-[72vh] w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-60 xl:block" />
      <div className="flex flex-col xl:flex-row gap-10 2xl:gap-14 items-center w-full">
        <div className="w-full xl:flex-[1.05] relative z-10">
          <div className="inline-flex gap-2 mb-8 flex-wrap">
            {CONFIG.taglines.map((t, i) => (
              <span key={i} className="shine-surface border border-(--accent)/35 text-(--accent) bg-(--accent)/10 px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(var(--accent-rgb),0.18)]">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-syne font-black leading-[0.95] text-(--text) mb-8 tracking-tighter text-5xl md:text-7xl xl:text-[6.9rem] 2xl:text-[7.4rem] max-w-[760px]">
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
            <div className="mt-4 text-(--accent) font-bold font-playfair italic text-2xl lg:text-4xl tracking-normal">-Technical Lead</div>
          </h1>
          <p className="text-lg xl:text-xl text-(--text-muted) max-w-[650px] leading-relaxed mb-12 font-inter">{CONFIG.profile}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button onClick={() => setView('projects')} className="shine-surface inline-flex items-center justify-center gap-3 bg-(--accent) text-(--bg) px-10 py-5 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-(--text) transition-all shadow-[0_18px_58px_rgba(var(--accent-rgb),0.44)]">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => setView('contact')} className="inline-flex items-center justify-center gap-3 border border-(--border) text-(--text) px-10 py-5 rounded-sm text-sm font-bold uppercase tracking-widest hover:border-(--accent) hover:text-(--accent) transition-all hover:shadow-[0_0_34px_rgba(var(--accent-rgb),0.24)]">
              <Sparkles className="h-4 w-4" />
              Connect
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-[560px] xl:flex-[0.88] relative group z-10">
          <div className="relative">
            <div className="absolute -inset-5 bg-(--accent) opacity-14 rounded-sm blur-2xl group-hover:opacity-28 transition-opacity"></div>
            <div className="absolute -inset-10 bg-[#F59E0B] opacity-10 rounded-full blur-3xl"></div>
            <div className="relative w-full h-[520px] 2xl:h-[580px] z-10 border border-(--border) grayscale-[0.25] hover:grayscale-0 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm">
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
              style={{ left: "-2rem", top: "-34rem", bottom: "auto" }}
              animate={{ y: [0, 12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-60">status</div>
              <div className="whitespace-nowrap font-syne font-black text-sm uppercase">human in the loop</div>
            </motion.div>
            <div className="absolute bottom-6 right-6 border border-(--border) p-6 rounded-sm shadow-2xl z-20 min-w-[200px] max-w-[calc(100%-3rem)] backdrop-blur" style={{ backgroundColor: "#000000" }}>
               <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-syne font-black text-xl uppercase leading-tight"
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
