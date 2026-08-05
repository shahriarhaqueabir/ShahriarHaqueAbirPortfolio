"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, BrainCircuit, Monitor, Network, ServerCog, Sparkles, User } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

type Project = (typeof CONFIG.projects)[number];

// Engineering context per project — replaces abstract metadata with concrete details
const projectContext: Record<string, { domain: string; impact: string }> = {
  "Network Discovery & Topology Mapping": { domain: "Network Operations · Incident Triage", impact: "Became the de facto reference for NOC incident triage" },
  "Log Analysis & Automated Ticketing": { domain: "Production Observability · Incident Response", impact: "Handles over 200 log streams daily with per-pattern adaptive thresholds" },
  UniversalOps: { domain: "Desktop Operations · Local-First Engineering", impact: "Fully offline ops platform with zero telemetry and local AI" },
  "AI-Assisted German Law": { domain: "Legal Tech · Semantic Search", impact: "302 tests, 103K+ vector points, 9-language AI guidance" },
  ShahriarHaqueAbirPortfolio: { domain: "Frontend · AI Integration", impact: "Local AI chat in-browser with 13/13 static routes" },
};

function getProjectVisual(project: Project) {
  if (project.name.includes("Network Discovery")) return { Icon: Network, color: "var(--accent)", symbol: "NET" };
  if (project.name.includes("Log Analysis")) return { Icon: ServerCog, color: "var(--accent)", symbol: "LOG" };
  if (project.name.includes("UniversalOps")) return { Icon: Monitor, color: "var(--accent3)", symbol: "OPS" };
  if (project.name.includes("German Law")) return { Icon: BrainCircuit, color: "var(--accent2)", symbol: "LAW" };
  if (project.name.includes("Portfolio")) return { Icon: Sparkles, color: "var(--accent)", symbol: "DEV" };

  return { Icon: Sparkles, color: "var(--accent)", symbol: "SYS" };
}

function getArchitectureNodes(project: Project): string[] {
  if (project.name.includes("Network Discovery")) return ["Subnet Sweep Config", "ICMP+SNMP Scan", "JSON Relationship Build", "Interactive Topology Render"];
  if (project.name.includes("Log Analysis")) return ["Log Stream Ingestion", "Regex Incident Detection", "Threshold Evaluation", "Jira Ticket Dispatch"];
  if (project.name.includes("UniversalOps")) return ["Go Backend Metrics", "Wails Native Bindings", "React UI Layer", "Ollama Local AI"];
  if (project.name.includes("German Law")) return ["Hybrid Search Query", "Qdrant Vector Retrieval", "AI Guidance Engine", "RDG-Compliant Output"];
  if (project.name.includes("Portfolio")) return ["Next.js Route Render", "Framer Motion Layout", "WebLLM Worker Init", "Fallback Intent Match"];
  return ["Input", "Process", "Logic", "Outcome"];
}

function DeviceMockup({ project, visual }: { project: Project; visual: { Icon: typeof Monitor; color: string; symbol: string } }) {
  const mockupReduceMotion = useReducedMotion();
  const nodes = getArchitectureNodes(project);

  return (
    <div className="relative group w-full aspect-[16/10] max-w-[640px] mx-auto">
      {/* Glow behind laptop */}
      <motion.div
        className="absolute inset-0 rounded-full blur-[80px] opacity-20"
        style={{ backgroundColor: visual.color }}
        animate={mockupReduceMotion ? {} : { opacity: [0.15, 0.35, 0.15] }}
        transition={mockupReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Laptop Frame */}
      <div className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-xl border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col">
        {/* Screen Bezel / Top Bar */}
        <div className="h-6 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-4 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="ml-4 font-mono text-[9px] text-white/30 truncate">{project.name.toLowerCase()}.app</div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-[#050505] p-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />

          <div className="relative z-10 h-full flex flex-col justify-center gap-4">
            {nodes.map((node, i) => (
              <motion.div
                key={node}
                initial={mockupReduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={mockupReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={mockupReduceMotion ? { duration: 0 } : { delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-px bg-white/20" />
                <div className="px-3 py-1.5 border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-white/80" style={{ borderLeft: `2px solid ${visual.color}` }}>
                  {node}
                </div>
              </motion.div>
            ))}

            {/* Abstract HUD element */}
            <div className="absolute right-4 bottom-4 w-24 h-24 opacity-20 border border-white/20 rounded-full flex items-center justify-center">
              <visual.Icon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Scanline overlay */}
          <div className="scanline-overlay absolute inset-0 pointer-events-none" />
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative z-10 w-[110%] -left-[5%] h-3 bg-[#1a1a1a] rounded-b-xl shadow-lg border-t border-[#2a2a2a]" />
      <div className="relative z-10 w-[30%] h-1 mx-auto bg-[#0a0a0a] rounded-b-md" />
    </div>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const featureReduceMotion = useReducedMotion();
  const visual = getProjectVisual(project);
  const ctx = projectContext[project.name] || { domain: "Technical Project", impact: "" };

  const isEven = index % 2 === 0;

  return (
    <motion.article
      data-testid={`project-card-${index}`}
      initial={featureReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={featureReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      {/* Image / Mockup Side */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <DeviceMockup project={project} visual={visual} />
      </div>

      {/* Details Side */}
      <div className={`flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-(--accent)" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-(--accent)">{ctx.domain}</span>
          </div>
          <h3 className="font-syne text-lg lg:text-2xl font-black text-(--text) leading-tight tracking-tight">{project.name}</h3>
        </div>

        <p className="text-(--text-muted) text-sm leading-relaxed max-w-xl">{project.desc}</p>

        {/* Problem / Solution / Result fields */}
        <div className="space-y-2">
          <div className="border-l-2 border-(--border) pl-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent) mb-0.5">Context</div>
            <p className="text-xs text-(--text-muted) leading-relaxed break-words">{project.context}</p>
          </div>
          <div className="border-l-2 border-(--border) pl-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent) mb-0.5">Implementation</div>
            <p className="text-xs text-(--text-muted) leading-relaxed break-words">{project.implementation}</p>
          </div>
          <div className="border-l-2 border-(--border) pl-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent) mb-0.5">Outcome</div>
            <p className="text-xs text-(--text-muted) leading-relaxed break-words">{project.outcome}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 py-1">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-(--accent)" />
            <div>
              <div className="text-[9px] uppercase font-mono text-(--text-muted) tracking-widest">Impact</div>
              <div className="text-xs font-bold text-(--text)">{ctx.impact}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--text-muted)">Tech Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-3 py-2 border border-(--border) bg-(--surface)/50 rounded-full text-[9px] font-sans font-semibold text-(--text-muted) flex items-center gap-2 group hover:border-(--accent) hover:text-(--text) transition-colors"
              >
                <TechIcon name={item} className="transition-opacity shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsView({ setView }: { setView: (view: ViewKey) => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
      className="pt-10 pb-24 max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl lg:text-4xl font-syne font-black text-(--text) tracking-tighter uppercase mb-3">
            Featured <span className="text-(--accent)">Projects</span>
          </h1>
          <p className="max-w-2xl text-xs leading-relaxed text-(--text-muted) font-mono uppercase tracking-tight">
            Network discovery tooling, log analysis pipelines, a local-first desktop ops platform, an AI-assisted German law research app, and this portfolio — built across Earth Telecommunication,
            tripunkt GmbH, and personal projects.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group text-xs font-bold uppercase tracking-widest text-(--text-muted) hover:text-(--accent) transition-colors"
          >
            <span>Back to Top</span>
            <div className="w-8 h-px bg-(--accent)/30 group-hover:bg-(--accent) group-hover:w-12 transition-[width,background-color]" />
          </button>
          <button
            onClick={() => setView("experience")}
            className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-(--text-muted) hover:text-(--accent) transition-colors"
          >
            View Career Timeline
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <section className="space-y-8">
        {CONFIG.projects.map((project, i) => (
          <FeaturedProject key={project.name} project={project} index={i} />
        ))}
      </section>

      <div className="flex justify-center py-12 border-t border-(--border)">
        <button
          onClick={() => setView("experience")}
          className="flex items-center gap-2 px-6 py-3 border border-(--border) font-mono text-xs uppercase tracking-widest text-(--text) hover:bg-(--accent) hover:text-(--bg) hover:border-(--accent) transition-[background-color,border-color,color]"
        >
          Explore Professional Record
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <GuidedNext currentView="projects" onNavigate={setView} />
    </motion.div>
  );
}
