"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Years in Innovation", value: "6+", unit: "Years" },
  { label: "Active Deployments", value: "500+", unit: "Nodes" },
  { label: "Support Volume", value: "~40", unit: "Weekly Cases" },
  { label: "Tech Stack", value: "15+", unit: "Tools" }
];

export default function StatsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Quantitative Impact</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">System Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border) border border-(--border)">
        {stats.map((s, idx) => (
          <motion.div 
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-(--bg) p-10 flex flex-col items-center justify-center text-center hover:bg-white transition-colors group"
          >
            <div className="text-5xl font-syne font-black text-(--text) mb-2 group-hover:text-(--accent) transition-colors">{s.value}</div>
            <div className="text-[9px] font-mono text-(--text-muted) uppercase tracking-widest mb-6 font-bold">{s.unit}</div>
            <div className="text-[11px] font-mono text-(--accent) uppercase tracking-tighter font-bold">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-white border border-(--border) p-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h3 className="font-syne font-black text-2xl text-(--text) mb-4 uppercase tracking-tighter">Service Reliability Metric</h3>
          <p className="text-(--text-muted) text-sm mb-8 font-inter leading-relaxed">
            Consistently delivering high-availability support and infrastructure management with a focus on SLA compliance and system stability.
          </p>
          <div className="w-full h-2 bg-(--bg) border border-(--border) rounded-full overflow-hidden flex">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "99.9%" }}
              transition={{ duration: 2, ease: "circOut" }}
              className="h-full bg-(--accent)"
            ></motion.div>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-[9px] font-mono text-(--text-muted) font-bold uppercase tracking-widest">Target Reliability</span>
            <span className="text-[10px] font-mono text-(--accent) font-bold">99.9% SLO</span>
          </div>
        </div>
        <div className="w-32 h-32 border-4 border-(--accent)/10 flex items-center justify-center rounded-full relative">
           <div className="text-2xl font-syne font-black text-(--text)">99.9</div>
           <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-(--accent)" strokeDasharray="376.8" strokeDashoffset="0.37" />
           </svg>
        </div>
      </div>
    </motion.div>
  );
}
