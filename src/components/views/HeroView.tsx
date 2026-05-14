"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/data";
import Image from "next/image";

export default function HeroView({ setView }: { setView: (v: string) => void }) {
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
          <h1 className="font-syne font-black leading-[1.05] text-(--text) mb-8 tracking-tighter text-6xl md:text-8xl">
            {CONFIG.name.split(' ').map((word, i) => 
              word === CONFIG.nameHL 
                ? <span key={i} className="font-playfair italic font-normal text-(--accent) lowercase pr-4">{word} </span>
                : <span key={i}>{word} </span>
            )}
            <br />
            <span className="text-(--text-muted) font-medium font-playfair italic text-3xl lg:text-5xl tracking-normal">Architect of Systems.</span>
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
            <div className="absolute -bottom-10 -right-10 bg-white border border-(--border) p-8 rounded-sm shadow-2xl z-20">
              <div className="font-syne font-black text-5xl text-(--text)">6<span className="text-(--accent)">+</span></div>
              <div className="text-[10px] font-mono text-(--text-muted) uppercase tracking-[0.2em] mt-2">Years of Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
