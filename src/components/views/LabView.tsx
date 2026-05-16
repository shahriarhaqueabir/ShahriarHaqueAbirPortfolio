"use client";

import { motion } from "framer-motion";
import GuidedNext from "@/components/GuidedNext";
import type { ViewKey } from "@/lib/types";

export default function LabView({ context, setView }: { context: string; setView: (view: ViewKey) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pt-10 pb-20"
    >
      <div className="font-mono text-sm text-(--accent) uppercase tracking-widest mb-4">— CV Synthesis</div>
      <h2 className="text-4xl md:text-6xl font-syne font-black mb-8 text-(--text)">Custom Insights</h2>

      <div className="bg-white border border-(--border) p-10 rounded-sm shadow-xl relative overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(74, 144, 226, 0.12), transparent)" }}
          animate={{ y: [-96, 420] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-(--text-muted) border-l border-b border-(--border)">
          LAB_PROTO_402
        </div>

        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)">
          {["input", "synthesis", "recommendation"].map((step, index) => (
            <div key={step} className="bg-(--bg) p-4">
              <div className="font-mono text-[8px] text-(--accent) uppercase tracking-widest">0{index + 1}</div>
              <div className="font-syne font-black text-sm uppercase text-(--text) mt-1">{step}</div>
            </div>
          ))}
        </div>
        
        <div className="prose prose-slate max-w-none relative z-10">
          <p className="text-lg text-(--text) leading-relaxed font-inter whitespace-pre-wrap">
            {context || "Ask the command center what you care about: hiring fit, support depth, AI projects, integration work, or how Shahriar approaches technical ambiguity."}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-(--border) flex gap-8">
           <div className="flex-1">
              <div className="text-[10px] font-mono text-(--accent) uppercase mb-2">Recommendation</div>
              <p className="text-xs text-(--text-muted)">Based on your input, the assistant will point you toward the most relevant portfolio views and summarize the signal in plain language.</p>
           </div>
        </div>
      </div>

      <GuidedNext currentView="lab" onNavigate={setView} />
    </motion.div>
  );
}
