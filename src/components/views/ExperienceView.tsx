"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CompanyLogo from "@/components/CompanyLogo";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const lifeMilestones = [
  { label: "2009", detail: "Electrical & Electronics Engineering foundation", marker: "BSc" },
  { label: "2013", detail: "Network operations and infrastructure support", marker: "NETWORK" },
  { label: "2015", detail: "Technical training coordination at L&T", marker: "L&T" },
  { label: "2016", detail: "MSc Information & Communication Engineering", marker: "MSc" },
  { label: "2020", detail: "Software Solution Consulting & Tier-3 Support", marker: "SAAS" },
  { label: "2024", detail: "QA and Release Validation engineering", marker: "QA/REL" },
  { label: "2026", detail: "Technical Operations & Integration Engineering", marker: "CURRENT" },
];

export default function ExperienceView({ setView }: { setView: (view: ViewKey) => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
      className="pt-10 pb-24 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Career Trajectory</div>
      <h2 className="text-2xl font-syne font-black mb-8 tracking-tight text-(--text)">Experience</h2>

      <div className="bg-(--surface) border border-(--border) p-4 md:p-6 mb-14 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-(--accent)"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h4 className="font-syne font-bold text-xs text-(--text-muted) uppercase tracking-widest">Professional Influence Map</h4>
          <div className="hidden sm:flex gap-2 font-mono text-[10px] uppercase tracking-widest text-(--text-muted)">
            <span className="border border-(--border) px-2 py-1">2009</span>
            <span className="border border-(--border) px-2 py-1">now</span>
          </div>
        </div>

        <div className="relative overflow-hidden xl:overflow-visible">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-(--border) xl:left-0 xl:right-0 xl:top-8 xl:bottom-auto xl:h-px xl:w-full"></div>
          <motion.div
            className="absolute left-3 top-0 bottom-0 w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),transparent)] xl:hidden"
            initial={shouldReduceMotion ? false : { scaleY: 0 }}
            animate={shouldReduceMotion ? {} : { scaleY: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="signal-dot absolute left-3 top-0 -translate-x-1/2 -translate-y-1/2 text-(--accent) xl:hidden"
            initial={shouldReduceMotion ? false : { top: 0, opacity: 0 }}
            animate={shouldReduceMotion ? {} : { top: "100%", opacity: [0, 1, 1, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-[linear-gradient(to_right,var(--accent),transparent)] xl:block"
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={shouldReduceMotion ? {} : { scaleX: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.8, ease: "easeInOut" }}
          />
          <motion.div
            className="signal-dot absolute top-8 hidden -translate-x-1/2 -translate-y-1/2 text-(--accent) xl:block"
            initial={shouldReduceMotion ? false : { left: "6.25%", opacity: 0 }}
            animate={shouldReduceMotion ? {} : { left: "93.75%", opacity: [0, 1, 1, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.8, ease: "easeInOut" }}
          />
          <div className="grid grid-cols-1 xl:grid-cols-8 gap-6">
            {lifeMilestones.map((milestone, index) => {
              const isNow = index === lifeMilestones.length - 1;
              const pulseDelay = 0.25 + index * 0.58;

              return (
                <motion.div
                  key={`${milestone.label}-${milestone.marker}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={shouldReduceMotion ? {} : { opacity: isNow ? 1 : 0.72, y: 0, scale: 1 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
                  className="relative pl-10 xl:pl-0 xl:pt-16"
                >
                  <motion.div
                    className="absolute left-3 top-2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-(--accent) xl:left-0 xl:right-0 xl:top-8 xl:mx-auto"
                    initial={shouldReduceMotion ? false : { scale: 1 }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: isNow ? [1, 1.45, 1.3] : [1, 1.18, 1],
                          }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                  >
                    <motion.span
                      className="signal-dot will-change-transform"
                      initial={shouldReduceMotion ? false : { opacity: 0.28, scale: 1 }}
                      animate={shouldReduceMotion ? {} : isNow ? { opacity: [0.28, 1, 1], scale: [1, 1.85, 1.45] } : { opacity: [0.28, 0.95, 0.28], scale: [1, 1.5, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                  <motion.div
                    className="border bg-(--bg) px-3 py-3 min-h-[100px]"
                    initial={shouldReduceMotion ? false : { borderColor: "var(--border)", boxShadow: "0 0 0 rgba(56, 189, 248, 0)" }}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            borderColor: isNow
                              ? ["rgba(238, 246, 248, 0.22)", "rgba(56, 189, 248, 0.95)", "rgba(56, 189, 248, 1)"]
                              : ["rgba(238, 246, 248, 0.22)", "rgba(56, 189, 248, 0.65)", "rgba(238, 246, 248, 0.22)"],
                            boxShadow: isNow
                              ? ["0 0 0 rgba(56, 189, 248, 0)", "0 0 24px rgba(56, 189, 248, 0.12)", "0 0 34px rgba(56, 189, 248, 0.18)"]
                              : ["0 0 0 rgba(56, 189, 248, 0)", "0 0 18px rgba(56, 189, 248, 0.1)", "0 0 0 rgba(56, 189, 248, 0)"],
                          }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: pulseDelay, duration: isNow ? 1.4 : 0.9, ease: "easeOut" }}
                  >
                    <div className={`font-mono text-[9px] uppercase tracking-[0.24em] mb-2 ${isNow ? "text-(--accent)" : "text-(--text-muted)"}`}>{milestone.marker}</div>
                    <div className="font-syne font-black text-lg tracking-tight text-(--text) leading-none mb-2">{milestone.label}</div>
                    <p className="text-xs text-(--text-muted) leading-relaxed font-sans">{milestone.detail}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-l-2 border-(--accent) pl-5 max-w-2xl">
          <p className="text-sm text-(--text-muted) leading-relaxed font-sans">
            The timeline shows the influences that shaped the profile: engineering fundamentals, network operations, technical enablement at L&T, SaaS solution consulting and integration consulting,
            Tier-3 production support, technical account management, and current focus on QA, release validation, solutions engineering, and technical operations engineering.
          </p>
        </div>
      </div>

      <div className="relative space-y-px bg-(--border) border border-(--border) pl-0 md:pl-14">
        <div className="absolute left-7 top-0 bottom-0 hidden md:block w-px bg-(--accent)/40" />
        {CONFIG.experience.map((e, i) => (
          <motion.div
            key={i}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.1 }}
            className={`bg-(--bg) p-5 md:p-8 group transition-all duration-300 relative overflow-hidden ${
              i === 0 ? "border-l-4 border-l-(--accent) hover:bg-(--surface)" : "border-l-4 border-l-transparent hover:border-l-(--accent)/50 hover:bg-(--surface)"
            }`}
          >
            {i === 0 && <div className="absolute inset-0 bg-(--accent)/3 pointer-events-none" />}
            <div className="absolute -left-9 top-10 hidden h-4 w-4 items-center justify-center rounded-full text-(--accent) md:flex">
              <motion.span
                className="signal-dot will-change-transform"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.8, 1], opacity: [1, 0.35, 1] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1 flex gap-6 items-start">
                <CompanyLogo name={e.company} className="w-14 h-14 shrink-0 hidden sm:flex" />
                <div className="flex-1">
                  {i === 0 && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent) mb-3 flex items-center gap-2">
                      <span className="signal-dot text-(--accent)" />
                      Most Recent Role
                    </div>
                  )}
                  <div className="text-(--accent) font-mono text-[10px] tracking-[0.2em] uppercase mb-2">{e.company}</div>
                  <h3
                    className={`text-lg font-black font-syne mb-4 tracking-tight transition-colors duration-200 ${
                      i === 0 ? "text-(--text) group-hover:text-(--accent)" : "text-(--text) group-hover:text-(--accent)"
                    }`}
                  >
                    {e.role}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {e.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-(--text-muted) leading-relaxed min-w-0">
                        <span className="w-1 h-1 rounded-full bg-(--accent)/40 mt-1.5 shrink-0" />
                        <span className="break-words">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className={`font-mono text-[9px] font-bold border px-3 py-1.5 uppercase tracking-widest transition-all shrink-0 ${
                  i === 0
                    ? "text-(--bg) bg-(--accent) border-(--accent) group-hover:bg-(--text) group-hover:border-(--text)"
                    : "text-(--text) bg-(--bg) border-(--border) group-hover:bg-(--accent) group-hover:text-white group-hover:border-(--accent)"
                }`}
              >
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
