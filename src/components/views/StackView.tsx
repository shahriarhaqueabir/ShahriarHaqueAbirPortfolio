"use client";

import { motion } from "framer-motion";

const stackCategories = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Chart.js"], color: "#4A90E2" },
  { name: "Backend", items: ["Python", "FastAPI", "PostgreSQL", "Qdrant", "SQL"], color: "#2C2C2C" },
  { name: "Ops & AI", items: ["Docker", "GitHub Actions", "Transformers.js", "n8n", "CI/CD"], color: "#A5B4FC" },
  { name: "Tools", items: ["Postman", "Jira", "Bash", "nmap", "Cisco Packet Tracer"], color: "#E5E7EB" }
];

export default function StackView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Technology Inventory</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Stack</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)">
        {stackCategories.map((cat, idx) => (
          <motion.div 
            key={idx}
            className="bg-(--bg) p-10 hover:bg-white transition-colors relative group"
          >
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-black font-syne text-(--text) uppercase tracking-tighter">
                {cat.name}
              </h3>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-(--bg) border border-(--border) text-[10px] font-mono font-bold uppercase tracking-widest text-(--text-muted) group-hover:border-(--text) group-hover:text-(--text) transition-all">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 p-10 bg-white border border-(--border) flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md">
           <div className="text-[9px] font-mono text-(--accent) uppercase tracking-widest mb-2">Stack Strategy</div>
           <p className="text-sm text-(--text-muted) italic font-playfair leading-relaxed">&ldquo;Choosing the right tool is an act of architecture. I prioritize performance, maintainability, and user-centricity in every layer of the stack.&rdquo;</p>
        </div>
        <div className="font-mono text-[10px] text-(--text) border-l-2 border-(--accent) pl-6">
           SYSTEM_LOAD: OPTIMAL<br/>
           MODULAR_STATUS: ACTIVE<br/>
           LAST_UPDATED: 2026.05
        </div>
      </div>
    </motion.div>
  );
}
