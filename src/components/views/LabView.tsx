"use client";

import { motion } from "framer-motion";

export default function LabView({ context }: { context: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pt-10 pb-20"
    >
      <div className="font-mono text-sm text-(--accent) uppercase tracking-widest mb-4">— Dynamic Synthesis</div>
      <h2 className="text-4xl font-syne font-black mb-8 text-(--text)">Custom Report</h2>

      <div className="bg-white border border-(--border) p-10 rounded-sm shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-(--text-muted) border-l border-b border-(--border)">
          LAB_PROTO_402
        </div>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-(--text) leading-relaxed font-inter whitespace-pre-wrap">
            {context || "Analyzing your interests... Please wait while I synthesize a custom view of Shahriar's work."}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-(--border) flex gap-8">
           <div className="flex-1">
              <div className="text-[10px] font-mono text-(--accent) uppercase mb-2">Recommendation</div>
              <p className="text-xs text-(--text-muted)">Based on your input, I recommend exploring the **Vision** and **Stats** sections next for a deeper dive into these topics.</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
