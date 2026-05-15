"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/lib/data";
import Image from "next/image";

export default function HeroView({ setView }: { setView: (v: string) => void }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    { text: "LEVEL 9 WIZARD", highlight: "WIZARD", color: "#5EEAD4" }, // Light Teal
    { text: "S+ Tier Ninja", highlight: "Ninja", color: "#000000" },   // Black
    { text: "Found the bug in the matrix", highlight: "matrix", color: "#10B981" }, // Green
    { text: "Final Boss Energy", highlight: "Boss", color: "#B8860B" },   // Dark Gold
    { text: "Power Level over 9000", highlight: "9000", color: "#EF4444" }, // Red
    { text: "Running sudo rm -rf /", highlight: "sudo", color: "#F472B6" }, // Pink (Kept as requested earlier)
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
      className="pt-10 h-full flex items-center"
    >
      <div className="flex flex-col lg:flex-row gap-20 items-center w-full">
        <div className="flex-1">
          <div className="inline-flex gap-2 mb-8 flex-wrap">
            {CONFIG.taglines.map((t, i) => (
              <span key={i} className="border border-(--accent)/30 text-(--accent) bg-(--accent)/5 px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-syne font-black leading-[0.95] text-(--text) mb-8 tracking-tighter text-5xl md:text-7xl lg:text-8xl">
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
          <p className="text-xl text-(--text-muted) max-w-xl leading-relaxed mb-12 font-inter font-light">{CONFIG.profile}</p>
          <div className="flex gap-6">
            <button onClick={() => setView('projects')} className="bg-(--text) text-(--bg) px-10 py-5 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-(--accent) transition-all shadow-lg hover:shadow-(--accent)/20">Analyze Work</button>
            <button onClick={() => setView('contact')} className="border border-(--border) text-(--text) px-10 py-5 rounded-sm text-sm font-bold uppercase tracking-widest hover:border-(--text) transition-all">Establish Link</button>
          </div>
        </div>
        
        <div className="lg:w-2/5 w-full relative group">
          <div className="relative">
            <div className="absolute -inset-4 bg-(--accent) opacity-5 rounded-sm blur-2xl group-hover:opacity-10 transition-opacity"></div>
            <div className="relative w-full h-[600px] z-10 border border-(--border) grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl overflow-hidden rounded-sm">
              <Image 
                src={CONFIG.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
                alt={CONFIG.name} 
                fill
                className="object-cover" 
                priority
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white border border-(--border) p-8 rounded-sm shadow-2xl z-20 min-w-[200px]">
               <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-syne font-black text-xl text-(--text) uppercase leading-tight"
                >
                  {phrases[currentPhrase].text.split(' ').map((word, i) => (
                    <span key={i}>
                      {word.includes(phrases[currentPhrase].highlight) ? (
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
