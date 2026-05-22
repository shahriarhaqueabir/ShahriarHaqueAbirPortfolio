"use client";

import { motion } from "framer-motion";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const lifeMilestones = [
  { label: "2009", detail: "Electrical & Electronics Engineering foundation", marker: "BSc" },
  { label: "2013", detail: "Network operations and infrastructure support", marker: "NETWORK" },
  { label: "2015", detail: "Project management and training coordination at L&T", marker: "L&T" },
  { label: "2016", detail: "MSc path in Germany", marker: "GERMANY" },
  { label: "2017", detail: "Optical fiber research and quality control work", marker: "FIBER" },
  { label: "2020", detail: "B2B SaaS product sales, solution consulting, and Tier-3 support", marker: "SAAS" },
  { label: "2024+", detail: "AI automation, RAG, GTM, SDR workflows, and agentic full stack builds", marker: "AI OPS" },
  { label: "Now", detail: "Lead technical solution consultant profile", marker: "PRESENT" },
];

export default function ExperienceView({ setView }: { setView: (view: ViewKey) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Career Trajectory</div>
      <h2 className="text-5xl font-syne font-black mb-12 text-(--text)">Experience</h2>
      
      <div className="bg-(--surface) border border-(--border) p-8 mb-20 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-(--accent)"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h4 className="font-syne font-bold text-[10px] text-(--text-muted) uppercase tracking-widest">Professional Influence Map</h4>
          <div className="hidden sm:flex gap-2 font-mono text-[8px] uppercase tracking-widest text-(--text-muted)">
            <span className="border border-(--border) px-2 py-1">2009</span>
            <span className="border border-(--border) px-2 py-1">now</span>
          </div>
        </div>

          <div className="relative overflow-hidden xl:overflow-visible">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-(--border) xl:left-0 xl:right-0 xl:top-8 xl:bottom-auto xl:h-px xl:w-full"></div>
          <motion.div
            className="absolute left-3 top-0 bottom-0 w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),transparent)] xl:hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="signal-dot absolute left-3 top-0 -translate-x-1/2 -translate-y-1/2 text-(--accent) xl:hidden"
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-[linear-gradient(to_right,var(--accent),transparent)] xl:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="signal-dot absolute top-8 hidden -translate-x-1/2 -translate-y-1/2 text-(--accent) xl:block"
            initial={{ left: "6.25%", opacity: 0 }}
            animate={{ left: "93.75%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
          <div className="grid grid-cols-1 xl:grid-cols-8 gap-6">
            {lifeMilestones.map((milestone, index) => {
              const isNow = index === lifeMilestones.length - 1;
              const pulseDelay = 0.25 + index * 0.58;

              return (
                <motion.div
                  key={`${milestone.label}-${milestone.marker}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: isNow ? 1 : 0.72, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
                  className="relative pl-10 xl:pl-0 xl:pt-16"
                >
                  <motion.div
                    className="absolute left-3 top-2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-(--accent) xl:left-0 xl:right-0 xl:top-8 xl:mx-auto"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: isNow ? [1, 1.45, 1.3] : [1, 1.18, 1],
                    }}
                    transition={{ delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                  >
                    <motion.span
                      className="signal-dot"
                      initial={{ opacity: 0.28, scale: 1 }}
                      animate={isNow ? { opacity: [0.28, 1, 1], scale: [1, 1.85, 1.45] } : { opacity: [0.28, 0.95, 0.28], scale: [1, 1.5, 1] }}
                      transition={{ delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                  <motion.div
                    className="border bg-(--bg) px-4 py-4 min-h-[132px]"
                    initial={{ borderColor: "var(--border)", boxShadow: "0 0 0 rgba(56, 189, 248, 0)" }}
                    animate={{
                      borderColor: isNow
                        ? ["var(--border)", "rgba(56, 189, 248, 0.95)", "rgba(56, 189, 248, 1)"]
                        : ["var(--border)", "rgba(56, 189, 248, 0.65)", "var(--border)"],
                      boxShadow: isNow
                        ? ["0 0 0 rgba(56, 189, 248, 0)", "0 0 24px rgba(56, 189, 248, 0.12)", "0 0 34px rgba(56, 189, 248, 0.18)"]
                        : ["0 0 0 rgba(56, 189, 248, 0)", "0 0 18px rgba(56, 189, 248, 0.1)", "0 0 0 rgba(56, 189, 248, 0)"],
                    }}
                    transition={{ delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                  >
                    <div className={`font-mono text-[8px] uppercase tracking-[0.24em] mb-3 ${isNow ? "text-(--accent)" : "text-(--text-muted)"}`}>{milestone.marker}</div>
                    <div className="font-syne font-black text-2xl md:text-xl text-(--text) leading-none mb-3">{milestone.label}</div>
                    <p className="text-[11px] text-(--text-muted) leading-relaxed font-inter">{milestone.detail}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-l-2 border-(--accent) pl-5 max-w-2xl">
          <p className="text-sm text-(--text-muted) leading-relaxed font-inter">
            The timeline shows the influences that shaped the profile: engineering fundamentals, optical fibers, IT networks, L&T project management, B2B SaaS product sales, Tier-3 support, and the current move into AI automation and workflow engineering.
          </p>
        </div>
      </div>

      <div className="relative space-y-px bg-(--border) border border-(--border) pl-0 md:pl-14">
        <div className="absolute left-7 top-0 bottom-0 hidden md:block w-px bg-(--accent)/40"></div>
        {CONFIG.experience.map((e, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-(--bg) p-10 group hover:bg-(--surface-2) transition-colors relative"
          >
            <div className="absolute -left-9 top-10 hidden h-4 w-4 items-center justify-center rounded-full text-(--accent) md:flex">
              <motion.span
                className="signal-dot"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1">
                <div className="text-(--accent) font-mono text-[10px] tracking-[0.2em] uppercase mb-2">{e.company}</div>
                <h3 className="text-3xl font-black font-syne text-(--text) mb-6 group-hover:text-(--accent) transition-colors">{e.role}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {e.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-4 text-sm text-(--text-muted) leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-(--accent)/30 mt-1.5 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-mono text-[10px] font-bold text-(--text) bg-(--bg) border border-(--border) px-4 py-2 uppercase tracking-widest group-hover:bg-(--accent) group-hover:text-white group-hover:border-(--accent) transition-all">
                {e.period}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <GuidedNext currentView="experience" onNavigate={setView} />
    </motion.div>
  );
}
