"use client";

import { motion } from "framer-motion";

const principles = [
  { title: "Simplicity Wins", text: "Complex problems don't always need complex solutions. I prioritize clarity and maintainability." },
  { title: "Human Centric", text: "Software is built for people. I focus on the user experience and the human impact of my code." },
  { title: "Data Driven", text: "Decisions should be backed by numbers. I use analytics and metrics to guide my implementation." }
];

export default function VisionView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="pt-10 pb-20 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Mission Statement</div>
      <h2 className="text-5xl md:text-7xl font-syne font-black mb-16 text-(--text) leading-[0.9]">
        Crafting Digital <br/> 
        <span className="italic font-playfair font-normal text-(--text-muted) lowercase tracking-normal">Resilience.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)">
        {principles.map((p, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-(--bg) p-10 hover:bg-white transition-colors flex flex-col"
          >
            <div className="text-[10px] font-mono font-black text-(--accent) mb-8 opacity-30 group-hover:opacity-100 transition-opacity">
              PROTOCOL_0{idx + 1}
            </div>
            <h3 className="text-2xl font-syne font-black text-(--text) mb-6 uppercase tracking-tighter">{p.title}</h3>
            <p className="text-(--text-muted) text-sm leading-relaxed font-inter">
              {p.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 flex flex-col md:flex-row gap-12 items-center border-t border-(--border) pt-12">
        <div className="flex-1">
           <h4 className="font-syne font-black text-2xl text-(--text) mb-4">Architectural Integrity</h4>
           <p className="text-(--text-muted) leading-relaxed text-base max-w-2xl font-inter">
             Every line of code is a structural decision. I treat software development as an act of engineering excellence, where the goal is not just to build, but to sustain and evolve.
           </p>
        </div>
        <div className="w-full md:w-64 aspect-square border border-(--border) flex items-center justify-center relative overflow-hidden bg-white">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
           <div className="text-[8px] font-mono text-(--text-muted) rotate-90 uppercase tracking-[0.3em]">Verification Status</div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-(--accent) rotate-45 animate-spin-slow"></div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
