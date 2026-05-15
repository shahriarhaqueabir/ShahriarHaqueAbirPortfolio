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

      <div className="mt-20">
        <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Social Architecture</div>
        <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Human Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-8">
              {[
                { label: "Empathy & Support", value: 100, desc: "Peer-rated mentorship and guidance" },
                { label: "Collaboration Velocity", value: 95, desc: "Efficiency in cross-functional syncs" },
                { label: "Conflict Resolution", value: 100, desc: "Maintaining team harmony and SLOs" }
              ].map((m, i) => (
                <div key={i} className="group">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold uppercase tracking-wider text-(--text)">{m.label}</span>
                      <span className="text-[10px] font-mono text-(--accent)">{m.value}%</span>
                   </div>
                   <div className="h-1 bg-(--border) relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        className="absolute inset-0 bg-(--accent)"
                      ></motion.div>
                   </div>
                   <p className="text-[9px] text-(--text-muted) uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.desc}
                   </p>
                </div>
              ))}
           </div>
           
           <div className="bg-white border border-(--border) p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-(--accent)">
                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                 </svg>
              </div>
              <h4 className="font-syne font-black text-xl mb-2">"A Wonderful Person"</h4>
              <p className="text-sm text-(--text-muted) font-inter leading-relaxed italic">
                "Beyond technical leadership, Shahriar brings a rare level of empathy and warmth to every project. He doesn't just build systems; he builds environments where people thrive."
              </p>
              <div className="mt-6 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-(--accent) font-bold text-xs italic">SB</div>
                 <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest">Stakeholder Sentiment</div>
                    <div className="text-[9px] text-(--text-muted)">Verified peer review // 2024</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </motion.div>
  );
}
