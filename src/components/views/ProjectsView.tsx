"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BrainCircuit, ChartSpline, Network, ServerCog, Sparkles, Workflow, X } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

type Project = (typeof CONFIG.projects)[number];

// Projects to display — curated to 5 supporting + 1 hero
const HERO_PROJECT_INDEX = 0; // Pathfinder
const SUPPORTING_INDEXES = [2, 3, 5, 6, 9]; // AI KA, AI Automation, Analytics, Network Discovery, Portfolio

const pathfinderMetrics = [
  { value: "10+", label: "International B2B clients onboarded" },
  { value: "5+", label: "Years full customer lifecycle ownership" },
  { value: "40/wk", label: "Production tickets supported at peak" },
  { value: "30%", label: "Recurring bug reports reduced per release" },
];

function getProjectVisual(project: Project): { Icon: typeof Workflow; color: string; symbol: string } {
  if (project.name.includes("Pathfinder")) return { Icon: Workflow, color: "#34D399", symbol: "GTM" };
  if (project.name.includes("Network Discovery")) return { Icon: Network, color: "#38BDF8", symbol: "NET" };
  if (project.name.includes("Knowledge Assistant")) return { Icon: BrainCircuit, color: "#A78BFA", symbol: "RAG" };
  if (project.name.includes("AI Automation")) return { Icon: ServerCog, color: "#22D3EE", symbol: "AI" };
  if (project.name.includes("Dashboard")) return { Icon: ChartSpline, color: "#F59E0B", symbol: "KPI" };
  if (project.name.includes("Portfolio")) return { Icon: Sparkles, color: "#F472B6", symbol: "WEB" };
  return { Icon: Sparkles, color: "#38BDF8", symbol: "SYS" };
}

function getArchitectureNodes(project: Project): string[] {
  if (project.name.includes("Pathfinder")) return ["Market Signal", "SDR Motion", "Technical Discovery", "Client Onboarding"];
  if (project.name.includes("Network Discovery")) return ["IP Range", "nmap Scanner", "JSON Topology", "NetworkX Map"];
  if (project.name.includes("Knowledge Assistant")) return ["Source Docs", "FastAPI", "Qdrant + SQL", "Grounded Answer"];
  if (project.name.includes("AI Automation")) return ["Support Signals", "RAG + LLM", "n8n Workflows", "AI Automation"];
  if (project.name.includes("Dashboard")) return ["SQL Data", "Python Pipeline", "Forecast Model", "KPI View"];
  return ["Visitor", "Next.js UI", "Worker LLM", "Portfolio Views"];
}

function getDiagramLabel(project: Project): string {
  if (project.name.includes("Pathfinder")) return "Operating Model";
  return "System Flow";
}

function getStackLabel(project: Project): string {
  if (project.name.includes("Pathfinder")) return "Methods & Responsibilities";
  return "Technical Stack";
}

function ArchitectureDiagram({ project, compact = false }: { project: Project; compact?: boolean }) {
  const nodes = getArchitectureNodes(project);
  const visual = getProjectVisual(project);
  const diagramLabel = getDiagramLabel(project);

  return (
    <div className={`relative overflow-hidden border border-(--border) bg-(--bg)/80 ${compact ? "p-4" : "p-6"}`}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#2C2C2C 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
      <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.24em]" style={{ color: visual.color }}>
          <visual.Icon className="h-3.5 w-3.5" />
          {diagramLabel}
        </div>
        <div className="font-mono text-[8px] text-(--text-muted) uppercase tracking-widest">{compact ? "preview" : diagramLabel}</div>
      </div>
      <div className={`relative z-10 grid ${compact ? "grid-cols-2 gap-3" : "grid-cols-1 sm:grid-cols-4 gap-3"}`}>
        {nodes.map((node, index) => (
          <div key={node} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.25 }}
              className="min-h-16 border border-(--border) bg-(--surface) px-3 py-3 flex flex-col justify-between symbol-tile"
              style={{ boxShadow: `inset 0 0 0 1px ${visual.color}18, 0 0 ${compact ? 18 : 30}px ${visual.color}22` }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-[8px] uppercase tracking-widest" style={{ color: visual.color }}>
                  0{index + 1}
                </div>
                <span className="signal-dot" style={{ color: visual.color }} />
              </div>
              <div className="font-syne font-black text-[11px] text-(--text) uppercase leading-tight">{node}</div>
            </motion.div>
            {index < nodes.length - 1 && (
              <motion.div
                className={`hidden sm:block absolute top-1/2 -right-3 h-px w-3 ${compact ? "sm:hidden" : ""}`}
                style={{ background: `linear-gradient(90deg, ${visual.color}, transparent)`, boxShadow: `0 0 16px ${visual.color}` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, compact ? 3 : 6).map((item) => (
          <span key={item} className="font-mono text-[8px] px-2 py-1 border border-(--border) bg-(--surface) text-(--text-muted) uppercase tracking-widest">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Hero Project Card (Pathfinder — full width) ─────────────────────────────────
function PathfinderHeroCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const visual = getProjectVisual(project);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      className="relative w-full cursor-pointer group overflow-hidden border border-(--border) bg-(--surface)/40 hover:border-[#34D399]/60 transition-all duration-500"
      whileHover={{ boxShadow: "0 0 80px #34D39924" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" style={{ backgroundImage: "linear-gradient(90deg, #EEF6F8 1px, transparent 1px), linear-gradient(#EEF6F8 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      {/* Glow orb */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: "#34D399" }} />
      {/* Animated bottom bar */}
      <motion.div className="absolute bottom-0 left-0 h-[2px]" style={{ backgroundColor: "#34D399", boxShadow: "0 0 24px #34D399" }} initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.5 }} />

      <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
        {/* Left */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] mb-5" style={{ color: "#34D399" }}>
              <visual.Icon className="h-4 w-4" />
              Lead Showcase Project
            </div>
            <h3 className="font-syne font-black text-3xl md:text-4xl xl:text-5xl text-(--text) leading-tight mb-6 group-hover:text-[#34D399] transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-(--text-muted) text-base md:text-lg leading-relaxed max-w-xl">
              {project.desc}
            </p>
          </div>

          {/* Outcome metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-(--border) bg-(--border)">
            {pathfinderMetrics.map((m) => (
              <div key={m.label} className="bg-(--bg) p-4">
                <div className="font-syne font-black text-2xl md:text-3xl text-(--text) leading-none mb-2" style={{ color: "#34D399" }}>
                  {m.value}
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-(--text-muted) leading-4">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[9px] px-2 py-1 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter" style={{ boxShadow: "0 0 16px #34D39914" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Right — architecture diagram */}
        <div className="flex flex-col gap-6 justify-center">
          <ArchitectureDiagram project={project} />
          <button className="self-start flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-(--text-muted) group-hover:text-[#34D399] transition-colors">
            View full case study
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Supporting project card (smaller) ──────────────────────────────────────────
function SupportingProjectCard({ project, index, globalIndex, onClick }: { project: Project; index: number; globalIndex: number; onClick: () => void }) {
  const visual = getProjectVisual(project);
  const accent = visual.color;

  return (
    <motion.div
      data-testid={`project-card-${globalIndex}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
      className="glass-panel p-7 flex flex-col h-full cursor-pointer group transition-all duration-500 relative overflow-hidden hover:shadow-xl"
      whileHover={{ y: -4, boxShadow: `0 0 54px ${accent}24` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity" style={{ backgroundColor: accent }} />
      <div className="absolute -left-4 top-8 font-syne font-black text-7xl" style={{ color: `${accent}14` }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <motion.div className="absolute bottom-0 left-0 h-[2px]" style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}` }} initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.4 }} />

      <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.28em]" style={{ color: accent }}>
        Supporting Case Study
      </div>
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-start gap-4 pr-10">
          <div className="symbol-tile flex h-10 w-10 shrink-0 items-center justify-center border border-(--border) bg-(--bg)" style={{ color: accent, boxShadow: `0 0 28px ${accent}30` }}>
            <visual.Icon className="h-4 w-4" />
          </div>
          <h3 className="text-xl font-black font-syne text-(--text)">{project.name}</h3>
        </div>
        <div className="w-9 h-9 border border-(--border) flex items-center justify-center absolute right-0 top-0" style={{ color: accent }}>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
      <p className="text-(--text-muted) text-sm mb-6 flex-1 leading-relaxed line-clamp-2">{project.desc}</p>
      <ArchitectureDiagram project={project} compact />
      <div className="flex flex-wrap gap-2 mt-5">
        {project.stack.slice(0, 3).map((s) => (
          <span key={s} className="font-mono text-[9px] px-2 py-1 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter" style={{ boxShadow: `0 0 16px ${accent}14` }}>
            {s}
          </span>
        ))}
        {project.stack.length > 3 && <span className="font-mono text-[9px] px-2 py-1 text-(--text-muted)">+{project.stack.length - 3} MORE</span>}
      </div>
    </motion.div>
  );
}

// ── Main view ──────────────────────────────────────────────────────────────────
export default function ProjectsView({ setView }: { setView: (view: ViewKey) => void }) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const p = selectedProject !== null ? CONFIG.projects[selectedProject] : null;
  const selectedVisual = p ? getProjectVisual(p) : null;

  const heroProject = CONFIG.projects[HERO_PROJECT_INDEX];
  const supportingProjects = SUPPORTING_INDEXES.map((i) => ({ project: CONFIG.projects[i], globalIndex: i }));

  return (
    <>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="pt-10">
        <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Showcase Projects & Case Studies</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2 className="text-5xl font-syne font-black text-(--text)">Selected Work</h2>
          <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-widest border-l-2 border-(--accent) pl-5 max-w-xs">
            One lead project in depth. Supporting case studies after.
          </div>
        </div>

        {/* Pathfinder hero card */}
        <section className="mb-14">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">Lead Project</div>
          <PathfinderHeroCard project={heroProject} onClick={() => setSelectedProject(HERO_PROJECT_INDEX)} />
        </section>

        {/* Supporting projects */}
        <section className="pb-20">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">Supporting Case Studies</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {supportingProjects.map(({ project, globalIndex }, i) => (
              <SupportingProjectCard
                key={globalIndex}
                project={project}
                index={i}
                globalIndex={globalIndex}
                onClick={() => setSelectedProject(globalIndex)}
              />
            ))}
          </div>
        </section>

        <GuidedNext currentView="projects" onNavigate={setView} />
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedProject !== null && p && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-(--text)/40 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="relative glass-panel w-full max-w-4xl h-full max-h-[85vh] overflow-y-auto shadow-2xl no-scrollbar flex flex-col"
            >
              <div className="p-10 md:p-20 flex-1">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: selectedVisual?.color }}>
                      {selectedVisual && <selectedVisual.Icon className="h-4 w-4" />}
                      {selectedProject === HERO_PROJECT_INDEX ? "Lead Showcase Project" : "Supporting Case Study"}
                      <span aria-hidden="true">{"//"}</span>
                      {p.name.toUpperCase()}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-syne font-black text-(--text) leading-tight">{p.name}</h2>
                  </div>
                  <button
                    aria-label="Close project case study"
                    onClick={() => setSelectedProject(null)}
                    className="w-12 h-12 flex items-center justify-center border border-(--border) hover:bg-(--text) hover:text-(--bg) transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Pathfinder-specific metrics in modal */}
                {selectedProject === HERO_PROJECT_INDEX && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-(--border) bg-(--border) mb-12">
                    {pathfinderMetrics.map((m) => (
                      <div key={m.label} className="bg-(--bg) p-5">
                        <div className="font-syne font-black text-2xl text-(--text) mb-1" style={{ color: selectedVisual?.color }}>{m.value}</div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-(--text-muted) leading-4">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <div className="lg:col-span-2 space-y-12">
                    <p className="text-2xl text-(--text) leading-relaxed font-playfair italic border-l-4 border-(--accent) pl-10 py-2">{p.desc}</p>
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-black font-syne text-xs uppercase tracking-widest mb-4 text-(--text)">The Challenge</h4>
                        <p className="text-(--text-muted) leading-relaxed text-base">{p.context}</p>
                      </div>
                      <div>
                        <h4 className="font-black font-syne text-xs uppercase tracking-widest mb-4 text-(--text)">{getDiagramLabel(p)}</h4>
                        <ArchitectureDiagram project={p} />
                      </div>
                      <div>
                        <h4 className="font-black font-syne text-xs uppercase tracking-widest mb-4 text-(--text)">Implementation</h4>
                        <p className="text-(--text-muted) leading-relaxed text-base">{p.implementation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="shine-surface bg-(--surface) border border-(--border) p-8">
                      <h4 className="font-black font-syne text-[10px] uppercase tracking-widest mb-6" style={{ color: selectedVisual?.color }}>
                        {getStackLabel(p)}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s, idx) => (
                          <span key={idx} className="font-mono text-[10px] px-3 py-1.5 bg-(--bg) border border-(--border) text-(--text-muted) uppercase font-bold tracking-tighter" style={{ boxShadow: `0 0 18px ${selectedVisual?.color}16` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shine-surface bg-(--text) text-(--bg) p-8" style={{ boxShadow: selectedVisual ? `0 0 48px ${selectedVisual.color}24` : undefined }}>
                      <h4 className="font-black font-syne text-[10px] uppercase tracking-widest mb-4 opacity-50">Outcome</h4>
                      <p className="text-lg font-medium leading-relaxed italic">{p.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 border-t border-(--border) bg-(--surface)/82 flex justify-between items-center">
                <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-widest">
                  {selectedProject === HERO_PROJECT_INDEX ? "Lead Showcase Project" : "Supporting Case Study"}
                </div>
                <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-widest">Owner: Shahriar Haque Abir</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
