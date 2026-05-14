"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/lib/data";

export default function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const p = selectedProject !== null ? CONFIG.projects[selectedProject] : null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="pt-10"
      >
        <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Technical Inventory</div>
        <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Selected Works</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20">
          {CONFIG.projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedProject(i)}
              className="bg-white border border-(--border) p-8 flex flex-col h-full cursor-pointer group hover:border-(--text) transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black font-syne text-(--text) group-hover:text-(--accent) transition-colors pr-10">{proj.name}</h3>
                <div className="w-10 h-10 border border-(--border) flex items-center justify-center group-hover:bg-(--text) group-hover:text-(--bg) transition-all absolute right-0 top-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </div>
              </div>
              
              <p className="text-(--text-muted) text-sm mb-8 flex-1 leading-relaxed font-inter line-clamp-2">{proj.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {proj.stack.slice(0, 3).map((s, sIdx) => (
                  <span key={sIdx} className="font-mono text-[9px] px-2 py-1 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter">{s}</span>
                ))}
                {proj.stack.length > 3 && <span className="font-mono text-[9px] px-2 py-1 text-(--text-muted)">+{proj.stack.length - 3} MORE</span>}
              </div>

              <div className="w-full h-1 bg-(--bg) overflow-hidden flex">
                <div className="h-full bg-(--accent) transition-all duration-700 w-0 group-hover:w-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject !== null && p && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute inset-0 bg-(--text)/40 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="relative bg-(--bg) border border-(--border) w-full max-w-4xl h-full max-h-[85vh] overflow-y-auto shadow-2xl no-scrollbar flex flex-col"
            >
              <div className="p-10 md:p-20 flex-1">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex-1">
                    <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.3em] mb-4">Project Case Study // {p.name.toUpperCase()}</div>
                    <h2 className="text-4xl md:text-6xl font-syne font-black text-(--text) leading-tight">{p.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="w-12 h-12 flex items-center justify-center border border-(--border) hover:bg-(--text) hover:text-(--bg) transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2 space-y-12">
                    <p className="text-2xl text-(--text) leading-relaxed font-playfair italic border-l-4 border-(--accent) pl-10 py-2">
                      {p.desc}
                    </p>
                    
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-black font-syne text-xs uppercase tracking-widest mb-4 text-(--text)">The Challenge</h4>
                        <p className="text-(--text-muted) leading-relaxed text-base">{p.context}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-black font-syne text-xs uppercase tracking-widest mb-4 text-(--text)">Solution Architecture</h4>
                        <p className="text-(--text-muted) leading-relaxed text-base">{p.implementation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-white border border-(--border) p-8">
                      <h4 className="font-black font-syne text-[10px] uppercase tracking-widest mb-6 text-(--accent)">Technical Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s, idx) => (
                          <span key={idx} className="font-mono text-[10px] px-3 py-1.5 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-(--text) text-(--bg) p-8">
                      <h4 className="font-black font-syne text-[10px] uppercase tracking-widest mb-4 opacity-50">Quantitative Impact</h4>
                      <p className="text-lg font-medium leading-relaxed italic">{p.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 border-t border-(--border) bg-white/50 flex justify-between items-center">
                 <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-widest">Verification Status: PASS</div>
                 <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-widest">Architect: Shahriar Haque Abir</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
