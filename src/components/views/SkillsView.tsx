"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, GraduationCap, Languages, Network, Route, ShieldCheck, Workflow, Wrench, Zap } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const coreCompetencies = [
  {
    title: "Technical Solution Consulting",
    text: "Discovery, stakeholder translation, PoCs, onboarding, and customer-facing technical decisions.",
    Icon: Route,
  },
  {
    title: "International SDR & GTM",
    text: "Sales development and market-entry execution for technical products that need explanation and trust.",
    Icon: Zap,
  },
  {
    title: "B2B SaaS Implementation",
    text: "Configuration, training, adoption support, release feedback, and customer lifecycle follow-through.",
    Icon: Workflow,
  },
  {
    title: "Tier-3 Technical Support",
    text: "Production troubleshooting across APIs, databases, integrations, environments, and recurring defects.",
    Icon: ShieldCheck,
  },
  {
    title: "IT Networks & Systems",
    text: "LAN/WAN operations, Linux, system administration, documentation, and root-cause diagnostics.",
    Icon: Network,
  },
  {
    title: "AI Automation Workflows",
    text: "RAG, local LLMs, workflow orchestration, support automation, and practical AI-enabled tooling.",
    Icon: BrainCircuit,
  },
];

const toolGroups = [
  {
    title: "Customer & SaaS Operations",
    items: ["Jira", "Postman", "SQL", "Documentation", "Release Validation", "Customer Onboarding", "RFI/RFP Support"],
  },
  {
    title: "AI Automation",
    items: ["n8n", "FastAPI", "Qdrant", "RAG", "Local LLMs", "Docker Compose", "Workflow Engineering"],
  },
  {
    title: "Systems & Networks",
    items: ["Linux", "LAN/WAN", "nmap", "Cisco", "DNS", "Routing", "Troubleshooting"],
  },
  {
    title: "Development",
    items: ["Python", "TypeScript", "React", "Next.js", "REST APIs", "PostgreSQL", "Git"],
  },
];

export default function SkillsView({ setView }: { setView: (view: ViewKey) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-6xl"
    >
      <div className="font-mono text-xs text-(--accent) uppercase tracking-[0.2em] mb-4">- Skills</div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <h2 className="text-5xl md:text-7xl font-syne font-black text-(--text) leading-none">Capability Map</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--text-muted)">
            A practical view of what I can do, where I apply it, and the tools I use to turn product, customer, and engineering context into usable outcomes.
          </p>
        </div>
        <div className="border-l-2 border-(--accent) pl-5 max-w-sm">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-(--text-muted) mb-2">Primary Operating Context</div>
          <div className="font-syne font-black text-2xl uppercase text-(--text)">Technical products with customer-facing complexity</div>
        </div>
      </div>

      <section className="mb-16">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">Core Competencies</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px border border-(--border) bg-(--border)">
          {coreCompetencies.map((competency, index) => (
            <motion.article
              key={competency.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              className="bg-(--bg) p-7 min-h-56"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-(--border) bg-white text-(--accent)">
                  <competency.Icon className="h-5 w-5" />
                </div>
                <CheckCircle2 className="h-4 w-4 text-(--accent)" />
              </div>
              <h3 className="font-syne text-2xl font-black leading-tight text-(--text)">{competency.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-(--text-muted)">{competency.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">Tools I Use</div>
            <h3 className="mt-4 font-syne text-4xl font-black text-(--text)">Grouped by working context</h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-(--text-muted)">
            This is not an exhaustive inventory. It is the practical stack behind consulting, support, automation, systems, and implementation work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-(--border) bg-(--border)">
          {toolGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              className="bg-white p-7 md:p-9"
            >
              <div className="mb-6 flex items-center gap-3">
                <Wrench className="h-4 w-4 text-(--accent)" />
                <h4 className="font-syne text-2xl font-black text-(--text)">{group.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="px-3 py-2 bg-(--bg) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted)">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-px border border-(--border) bg-(--border)">
        <article className="bg-(--bg) p-7">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <GraduationCap className="h-4 w-4" />
            Education
          </div>
          <div className="space-y-5">
            {CONFIG.education.map((edu) => (
              <div key={edu.degree}>
                <div className="font-syne text-lg font-black leading-tight text-(--text)">{edu.degree}</div>
                <div className="mt-2 text-xs leading-relaxed text-(--text-muted)">{edu.school}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-(--accent)">{edu.period}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-(--bg) p-7">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <Languages className="h-4 w-4" />
            Languages
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFIG.languages.map((item) => (
              <span key={item} className="px-3 py-2 bg-white border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted)">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="bg-(--bg) p-7">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <ShieldCheck className="h-4 w-4" />
            Certifications
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFIG.certifications.map((item) => (
              <span key={item} className="px-3 py-2 bg-white border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted)">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <GuidedNext currentView="skills" onNavigate={setView} />
    </motion.div>
  );
}
