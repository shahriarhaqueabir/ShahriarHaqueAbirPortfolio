"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ChartSpline,
  Clock,
  ExternalLink,
  Eye,
  Network,
  ServerCog,
  Sparkles,
  User,
  Workflow
} from "lucide-react";
import TechIcon from "@/components/TechIcon";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

type Project = (typeof CONFIG.projects)[number];

// Metadata mapping for the "Visual Design" aspects inspired by the screenshot
const projectMeta: Record<string, { duration: string; client: string; category: string }> = {
  "Interactive Database Visualizer": { duration: "3 Months", client: "Internal Tooling", category: "Data Systems" },
  "Customer Onboarding & Validation Portal": { duration: "6 Months", client: "Enterprise Clients", category: "SaaS Operations" },
  "Log Analysis & Automated Ticketing": { duration: "Ongoing", client: "Tier-3 Support Team", category: "Automation" },
  "Network Discovery & Topology Mapping": { duration: "1 Year", client: "Earth Telecommunication", category: "Networking" },
  "CI-Friendly API Test Automation": { duration: "4 Months", client: "QA / Release Ops", category: "Quality Engineering" },
  "Internal AI Gateway Proxy": { duration: "5 Months", client: "Corporate Governance", category: "AI Security" },
};

function getProjectVisual(project: Project) {
  if (project.name.includes("Database")) return { Icon: Workflow, color: "#34D399", symbol: "DB" };
  if (project.name.includes("Network Discovery")) return { Icon: Network, color: "#38BDF8", symbol: "NET" };
  if (project.name.includes("Onboarding")) return { Icon: BrainCircuit, color: "#A78BFA", symbol: "PORTAL" };
  if (project.name.includes("Log Analysis")) return { Icon: ServerCog, color: "#22D3EE", symbol: "LOG" };
  if (project.name.includes("API Test")) return { Icon: ChartSpline, color: "#F59E0B", symbol: "TEST" };
  if (project.name.includes("AI Gateway")) return { Icon: Sparkles, color: "#F472B6", symbol: "SEC" };
  return { Icon: Sparkles, color: "#38BDF8", symbol: "SYS" };
}

function getArchitectureNodes(project: Project): string[] {
  if (project.name.includes("Database")) return ["SQL Parser", "Relationship Map", "Interactive UI", "Visual Query"];
  if (project.name.includes("Network Discovery")) return ["IP Range", "nmap Scanner", "JSON Topology", "Interactive Map"];
  if (project.name.includes("Onboarding")) return ["Data Upload", "Schema Mapper", "Sandbox Runner", "Live Validation"];
  if (project.name.includes("Log Analysis")) return ["Log Stream", "Regex Filter", "Threshold Sync", "Jira Automation"];
  if (project.name.includes("API Test")) return ["Collections", "Newman CLI", "CI/CD Pipeline", "Health Report"];
  if (project.name.includes("AI Gateway")) return ["Request Intercept", "NER Redaction", "Model Relay", "Token Unmask"];
  return ["Input", "Process", "Logic", "Outcome"];
}

function DeviceMockup({ project, visual }: { project: Project; visual: { Icon: typeof Workflow; color: string; symbol: string } }) {
  const nodes = getArchitectureNodes(project);

  return (
    <div className="relative group w-full aspect-[16/10] max-w-[640px] mx-auto">
      {/* Glow behind laptop */}
      <div
        className="absolute inset-0 rounded-full blur-[80px] opacity-20 transition-opacity group-hover:opacity-30"
        style={{ backgroundColor: visual.color }}
      />

      {/* Laptop Frame */}
      <div className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-xl border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col">
        {/* Screen Bezel / Top Bar */}
        <div className="h-6 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center px-4 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="ml-4 font-mono text-[8px] text-white/30 truncate">{project.name.toLowerCase()}.app</div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 bg-[#050505] p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className="relative z-10 h-full flex flex-col justify-center gap-4">
             {nodes.map((node, i) => (
               <motion.div
                 key={node}
                 initial={{ opacity: 0, x: -10 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center gap-3"
               >
                 <div className="w-8 h-px bg-white/20" />
                 <div
                   className="px-3 py-1.5 border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/80"
                  style={{ borderLeft: `2px solid ${visual.color}` }}
                 >
                   {node}
                 </div>
               </motion.div>
             ))}

             {/* Abstract HUD element */}
             <div className="absolute right-4 bottom-4 w-24 h-24 opacity-20 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
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

function FeaturedProject({ project, index, setView }: { project: Project; index: number; setView: (v: ViewKey) => void }) {
  const visual = getProjectVisual(project);
  const meta = projectMeta[project.name] || { duration: "3 Months", client: "Confidential", category: "Technical Project" };
  const isEven = index % 2 === 0;

  return (
    <motion.article
      data-testid={`project-card-${index}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 ${isEven ? "" : "lg:flex-row-reverse"}`}
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
             <span className="font-mono text-xs uppercase tracking-[0.3em] text-(--accent)">{meta.category}</span>
          </div>
          <h3 className="font-syne text-4xl lg:text-5xl font-black text-(--text) leading-tight">{project.name}</h3>
        </div>

        <p className="text-(--text-muted) text-base lg:text-lg leading-relaxed max-w-xl">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-8 py-2">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-(--accent)" />
            <div>
              <div className="text-[10px] uppercase font-mono text-(--text-muted) tracking-widest">Duration</div>
              <div className="text-xs font-bold text-(--text)">{meta.duration}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-(--accent)" />
            <div>
              <div className="text-[10px] uppercase font-mono text-(--text-muted) tracking-widest">Client / Partner</div>
              <div className="text-xs font-bold text-(--text)">{meta.client}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--text-muted)">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-4 py-2.5 border border-(--border) bg-(--surface)/50 rounded-full text-[10px] font-sans font-semibold text-(--text-muted) flex items-center gap-2.5 group hover:border-(--accent) hover:text-(--text) transition-colors"
              >
                <TechIcon name={item} size={20} className="transition-opacity shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4">
          <button
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-(--text) hover:text-(--accent) transition-colors"
            onClick={() => setView("hero")} // Placeholder for detail view
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
            <div className="w-0 group-hover:w-8 h-px bg-(--accent) transition-all duration-300" />
          </button>
          <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-(--text) hover:text-(--accent) transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
            <div className="w-0 group-hover:w-8 h-px bg-(--accent) transition-all duration-300" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsView({ setView }: { setView: (view: ViewKey) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="pt-10 max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-6xl lg:text-7xl font-syne font-black text-(--text) tracking-tighter uppercase mb-4">
            Featured <span className="text-(--accent)">Projects</span>
          </h2>
          <p className="max-w-2xl text-sm lg:text-base leading-relaxed text-(--text-muted) font-mono uppercase tracking-tight">
            Recent work demonstrating technical operations engineering, systems integration,
            API automation, and scalable dashboard-driven solutions.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => setView("experience")}
            className="flex items-center gap-2 group text-[10px] font-bold uppercase tracking-widest text-(--text-muted) hover:text-(--accent) transition-colors"
          >
            <span>View All Projects</span>
            <div className="w-8 h-px bg-(--accent)/30 group-hover:bg-(--accent) group-hover:w-12 transition-all" />
          </button>
          <button
            onClick={() => setView("experience")}
            className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-(--text-muted) hover:text-(--accent) transition-colors"
          >
            View Career Timeline
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <section className="space-y-12">
        {CONFIG.projects.map((project, i) => (
          <FeaturedProject
            key={project.name}
            project={project}
            index={i}
            setView={setView}
          />
        ))}
      </section>

      <div className="flex justify-center py-20 border-t border-(--border)">
        <button
          onClick={() => setView("experience")}
          className="flex items-center gap-3 px-8 py-4 border border-(--border) font-mono text-xs uppercase tracking-widest text-(--text) hover:bg-(--accent) hover:text-(--bg) hover:border-(--accent) transition-all"
        >
          Explore Professional Record
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <GuidedNext currentView="projects" onNavigate={setView} />
    </motion.div>
  );
}
