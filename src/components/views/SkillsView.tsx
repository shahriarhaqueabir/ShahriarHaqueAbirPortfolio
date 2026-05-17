"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const groupColors = ["#38BDF8", "#34D399", "#F59E0B", "#A78BFA", "#F472B6"];
const expertiseLevels = [96, 91, 87, 82, 78, 74];
const channelExpertise: Record<string, number[]> = {
  "Core Competencies": [76, 61, 87, 92, 98, 74],
  "Systems & Automation": [86, 61, 77, 82, 98, 84],
  "Tools & Technologies": [96, 71, 67, 72, 78, 64],
};
const stackCategories = [
  {
    name: "Frontend & Experience Engineering",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Chart.js", "HTML/CSS", "Responsive Design", "UI Architecture", "Component Systems", "Zustand", "Shadcn/UI", "Motion Design", "Accessibility"],
    color: "#38BDF8",
  },
  {
    name: "Backend & Application Systems",
    items: ["Python", "FastAPI", "REST APIs", "SQL", "PydanticAI", "LangGraph", "Node.js", "API Design", "WebSockets", "Authentication", "Async Systems"],
    color: "#34D399",
  },
  {
    name: "Data, Storage & Retrieval",
    items: ["PostgreSQL", "Qdrant", "Valkey", "Redis", "JSON", "SearXNG", "Vector Search", "Embeddings", "Data Modeling", "Semantic Search", "ETL Pipelines"],
    color: "#10B981",
  },
  {
    name: "AI Systems & Intelligence",
    items: ["RAG", "Local LLMs", "Agent Workflows", "Ollama", "Open WebUI", "WebLLM", "Llama 3.2", "Prompt Engineering", "Multi-Agent Systems", "Context Management", "Tool Calling", "LLM Evaluation", "AI Orchestration", "Hugging Face"],
    color: "#F97316",
  },
  {
    name: "Infrastructure & DevOps",
    items: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "OpenTelemetry", "n8n", "Linux Containers", "Reverse Proxies", "Nginx", "Environment Management", "Deployment Pipelines"],
    color: "#F59E0B",
  },
  {
    name: "Systems & Networking",
    items: ["Linux", "Bash", "nmap", "Cisco Packet Tracer", "NetworkX", "TCP/IP", "DNS", "Routing", "Troubleshooting", "Network Diagnostics", "System Administration"],
    color: "#A78BFA",
  },
  {
    name: "Workflow, Operations & Consulting",
    items: ["Postman", "Jira", "Clay", "WeFlow", "Incident Management", "Technical Support", "QA Processes", "Stakeholder Communication", "Presales", "Customer Success", "Documentation", "Requirement Analysis", "Workflow Automation"],
    color: "#EC4899",
  },
  {
    name: "Development Workflow",
    items: ["Git", "GitHub", "Version Control", "Git Flow", "Unit Testing", "Integration Testing", "Agile/Scrum", "Debugging"],
    color: "#22D3EE",
  },
  {
    name: "Research & Experimental Systems",
    items: ["Human-AI Interaction", "Generative Interfaces", "Knowledge Graphs", "Dynamic UI Systems", "AI UX", "Local-First Architecture", "Experimental Prototyping"],
    color: "#F472B6",
  },
];

function wrapRadarLabel(label: string) {
  if (label.length <= 18) return label;

  const words = label.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > 16) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

function getEndpointPosition(index: number, total: number) {
  const angle = -90 + (360 / total) * index;
  const radians = (angle * Math.PI) / 180;
  const radius = 42;
  return {
    left: `${50 + Math.cos(radians) * radius}%`,
    top: `${50 + Math.sin(radians) * radius}%`,
  };
}

function getRadarPoint(index: number, total: number, radius: number) {
  const angle = -90 + (360 / total) * index;
  const radians = (angle * Math.PI) / 180;
  return {
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  };
}

function pointsToPath(points: Array<{ x: number; y: number }>) {
  return points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function FixedCenterRadar({ values, color }: { values: number[]; color: string }) {
  const total = values.length;
  const maxRadius = 34;
  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const valuePoints = values.map((value, index) => getRadarPoint(index, total, maxRadius * (value / 100)));
  const axisPoints = values.map((_, index) => getRadarPoint(index, total, maxRadius));

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" role="img" aria-label="Expertise radar chart">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={pointsToPath(values.map((_, index) => getRadarPoint(index, total, maxRadius * ring)))}
          fill="none"
          stroke="rgba(238, 246, 248, 0.08)"
          strokeWidth="0.45"
        />
      ))}
      {axisPoints.map((point, index) => (
        <line key={index} x1="50" y1="50" x2={point.x} y2={point.y} stroke="rgba(238, 246, 248, 0.08)" strokeWidth="0.35" />
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <polygon points={pointsToPath(valuePoints)} fill={`${color}26`} stroke={color} strokeWidth="0.45" strokeLinejoin="round" />
        {valuePoints.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r=".65" fill={color} stroke="#070B12" strokeWidth="0.2" />
        ))}
      </motion.g>
      <circle cx="50" cy="50" r="1" fill="rgba(238, 246, 248, 0.32)" />
    </svg>
  );
}

function RadarEndpointLabel({ label }: { label: string }) {
  const wrappedLabel = wrapRadarLabel(label);

  if (Array.isArray(wrappedLabel)) {
    return (
      <>
        {wrappedLabel.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </>
    );
  }

  return <>{wrappedLabel}</>;
}

export default function SkillsView({ setView }: { setView: (view: ViewKey) => void }) {
  const [activeGroup, setActiveGroup] = useState(0);
  const selectedGroup = CONFIG.skills[activeGroup] ?? CONFIG.skills[0];
  const activeColor = groupColors[activeGroup % groupColors.length];
  const radarItems = selectedGroup.items.slice(0, 6);
  const selectedExpertise = channelExpertise[selectedGroup.group] ?? expertiseLevels;
  const targetExpertise = radarItems.map((_, index) => selectedExpertise[index % selectedExpertise.length]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-5xl overflow-hidden"
    >
      <div className="font-mono text-xs text-(--accent) uppercase tracking-[0.2em] mb-4">- Capability Matrix</div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-syne font-black text-(--text) leading-none">Competencies</h2>
        <div className="max-w-sm border-l-2 pl-5" style={{ borderColor: activeColor }}>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-(--text-muted) mb-2">Active Signal</div>
          <div className="font-syne font-black text-2xl uppercase text-(--text)">{selectedGroup.group}</div>
        </div>
      </div>

      <div className="mb-20">
        <section className="border border-(--border) bg-[#0C1523] p-6 md:p-8 relative overflow-hidden text-white">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(238,246,248,0.28) 1px, transparent 1px), linear-gradient(rgba(238,246,248,0.28) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <motion.div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full border"
            style={{ borderColor: activeColor }}
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 26, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h4 className="font-syne font-black text-3xl text-white uppercase tracking-tight">Skill Signal Console</h4>
              <p className="text-base text-slate-300 leading-relaxed mt-4 max-w-lg">
                Select a capability cluster to inspect the range behind the consulting, support, systems, and delivery work.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-slate-300 border border-slate-700 bg-[#080D16] px-5 py-4">
              Mode: interactive
              <br />
              Signal: live
            </div>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {CONFIG.skills.map((group, idx) => {
                const isActive = idx === activeGroup;
                const color = groupColors[idx % groupColors.length];

                return (
                  <motion.button
                    type="button"
                    key={group.group}
                    onClick={() => setActiveGroup(idx)}
                    onMouseEnter={() => setActiveGroup(idx)}
                    className="w-full min-h-28 text-left border bg-[#070C14] p-5 relative overflow-hidden group"
                    style={{ borderColor: isActive ? color : "rgba(148, 163, 184, 0.24)" }}
                    whileHover={{ x: 6 }}
                  >
                    <motion.div className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: color }} animate={{ opacity: isActive ? 1 : 0.25 }} />
                    <div>
                      <div className="min-w-0">
                        <div className="font-mono text-xs uppercase tracking-[0.18em] mb-3" style={{ color }}>
                          Channel {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="font-syne font-black text-base uppercase text-white leading-tight max-w-[11rem]">{group.group}</div>
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 mt-4">{group.items.length} nodes</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 min-h-[520px] mt-4">
            <div className="relative h-[520px] w-full">
              <div className="absolute inset-[20%] md:inset-[22%]">
                  <FixedCenterRadar key={selectedGroup.group} values={targetExpertise} color={activeColor} />
              </div>
              {radarItems.map((item, index) => {
                const position = getEndpointPosition(index, radarItems.length);
                return (
                  <motion.div
                    key={item}
                    className="absolute max-w-[210px] -translate-x-1/2 -translate-y-1/2 border border-slate-700 bg-[#0D1726]/90 px-4 py-3 text-center shadow-sm backdrop-blur"
                    style={position}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                  >
                    <div className="font-mono text-sm uppercase tracking-[0.18em] leading-snug text-slate-300">
                      <RadarEndpointLabel label={item} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-20 border-t border-(--border) pt-12 relative">
        <div className="absolute right-0 top-10 hidden md:block font-mono text-xs uppercase tracking-[0.18em] text-(--text-muted)">tool layer</div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs text-(--accent) uppercase tracking-[0.2em] mb-4">Capability Map</div>
            <h4 className="font-syne font-black text-4xl text-(--text)">Stack In Practice</h4>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-(--text-muted)">
            The skill map explains how Shahriar thinks; the capability map shows how that thinking turns into working systems across product, data, AI, infrastructure, and operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)">
          {stackCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className="bg-(--bg) p-7 md:p-9 hover:bg-white transition-colors relative group overflow-hidden min-h-[230px]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ delay: idx * 0.05, duration: 0.35 }}
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: cat.color }} />
              <div className="absolute right-7 bottom-7 flex h-24 w-24 items-end gap-1 opacity-20 group-hover:opacity-45 transition-opacity">
                {cat.items.slice(0, 6).map((item, barIndex) => (
                  <motion.span
                    key={item}
                    className="flex-1"
                    style={{ backgroundColor: cat.color }}
                    initial={{ height: 0 }}
                    whileInView={{ height: 24 + barIndex * 9 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.7, delay: barIndex * 0.1, ease: "easeOut" }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h5 className="text-2xl font-black font-syne text-(--text) uppercase tracking-tighter">{cat.name}</h5>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-(--bg) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted) group-hover:border-(--text) group-hover:text-(--text) transition-all">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 p-8 md:p-10 bg-white border border-(--border) flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full w-1 bg-(--accent)"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="max-w-xl">
            <div className="text-xs font-mono text-(--accent) uppercase tracking-widest mb-2">Stack Strategy</div>
            <p className="text-sm text-(--text-muted) italic font-playfair leading-relaxed">&ldquo;The stack is strongest when it is explainable: easy to operate, easy to debug, and boring in all the right places.&rdquo;</p>
          </div>
          <div className="font-mono text-xs text-(--text) border-l-2 border-(--accent) pl-6">
            SYSTEM_LOAD: OPTIMAL<br />
            MODULAR_STATUS: ACTIVE<br />
            LAST_UPDATED: 2026.05
          </div>
        </div>
      </section>

      <div className="mt-20 pt-12 border-t border-(--border) relative">
        <div className="absolute right-0 top-10 hidden md:block font-mono text-xs uppercase tracking-[0.18em] text-(--text-muted)">foundation layer</div>
        <h4 className="font-syne font-black text-3xl text-(--text) mb-10">Academic Foundation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CONFIG.education.map((edu, idx) => (
            <motion.div key={idx} className="flex gap-8 items-start border border-(--border) bg-white p-6 relative overflow-hidden" whileHover={{ y: -4 }}>
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: groupColors[idx % groupColors.length] }} />
              <div className="w-16 h-16 border border-(--border) bg-(--bg) flex items-center justify-center shrink-0 rotate-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <h5 className="font-syne font-black text-xl text-(--text) leading-tight mb-2">{edu.degree}</h5>
                <div className="text-sm text-(--text-muted) mb-3 font-inter">{edu.school}</div>
                <div className="font-mono text-xs text-(--accent) font-bold uppercase tracking-widest">{edu.period}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "Languages", items: CONFIG.languages, color: "#34D399" },
            { title: "Certifications", items: CONFIG.certifications, color: "#F59E0B" },
          ].map((foundation) => (
            <motion.div
              key={foundation.title}
              className="border border-(--border) bg-white p-7 relative overflow-hidden"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: foundation.color }} />
              <div className="font-mono text-xs uppercase tracking-[0.2em] mb-5" style={{ color: foundation.color }}>
                {foundation.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {foundation.items.map((item) => (
                  <span key={item} className="px-3 py-2 bg-(--bg) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted)">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GuidedNext currentView="skills" onNavigate={setView} />
    </motion.div>
  );
}
