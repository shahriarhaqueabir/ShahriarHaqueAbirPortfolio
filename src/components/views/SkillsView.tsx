"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GraduationCap, Languages, ShieldCheck, Wrench } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const primaryCompetencies = [
  {
    number: "01",
    title: "Technical Operations",
    text: "Tier-3 Support, incident management, root cause analysis (RCA), production support, and SLA management across global enterprise accounts.",
    accent: "#38BDF8",
  },
  {
    number: "02",
    title: "Systems Integration",
    text: "REST APIs, application integration, software deployment, configuration management, and schema validation in Docker and on-prem environments.",
    accent: "#34D399",
  },
  {
    number: "03",
    title: "Data & Troubleshooting",
    text: "SQL databases, log analysis (grep/awk), API tracing (Postman/Swagger), and cross-database validation for production defect isolation.",
    accent: "#A78BFA",
  },
];

const expandingCompetencies = [
  {
    number: "04",
    title: "Solutions Engineering",
    text: "Technical discovery, solution scoping, PoC delivery, RFI/RFP responses, and authoring technical integration schematics.",
    accent: "#F472B6",
  },
  {
    number: "05",
    title: "Infrastructure & Networking",
    text: "LAN/WAN architecture, routing & switching, network troubleshooting, and standardized hardware configuration frameworks.",
    accent: "#F59E0B",
  },
  {
    number: "06",
    title: "AI Automation",
    text: "Agentic workflow orchestration, RAG systems, and AI-enabled support tooling to optimize operational processes and reliability.",
    accent: "#22D3EE",
  },
];

const toolGroups = [
  {
    title: "Technical Operations",
    items: ["Postman", "Swagger", "CLI (Grep/Awk)", "Docker", "Jira", "Confluence", "SLA Management"],
  },
  {
    title: "Data & Integration",
    items: ["PostgreSQL", "MySQL", "SQL Server", "REST APIs", "JSON/XML", "Schema Validation", "API Tracing"],
  },
  {
    title: "AI & Automation",
    items: ["Python", "n8n", "Ollama", "LangChain", "RAG", "Qdrant", "Git", "CI/CD"],
  },
  {
    title: "Systems & Networking",
    items: ["Linux", "LAN/WAN", "Cisco", "Routing/Switching", "Network Discovery", "nmap", "Security Foundations"],
  },
];

function CompetencyCard({
  number,
  title,
  text,
  accent,
  index,
}: {
  number: string;
  title: string;
  text: string;
  accent: string;
  index: number;
}) {
  const cardReduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={cardReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={cardReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={cardReduceMotion ? { duration: 0 } : { delay: index * 0.06, duration: 0.3 }}
      className="relative bg-(--bg) border border-(--border) p-7 min-h-56 flex flex-col justify-between group overflow-hidden hover:border-opacity-80 transition-all duration-300"
      style={{ borderColor: `${accent}22` }}
      whileHover={cardReduceMotion ? undefined : { boxShadow: `0 0 40px ${accent}18` }}
    >
      {/* Background glow */}
      <div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: accent }}
      />
      {/* Large number */}
      <div
        className="absolute right-5 bottom-5 font-syne font-black text-8xl leading-none select-none"
        style={{ color: `${accent}12` }}
      >
        {number}
      </div>
      <div>
        {/* Prominent number + accent bar */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="font-syne font-black text-2xl leading-none tracking-tight"
            style={{ color: accent }}
          >
            {number}
          </div>
          <div className="h-px flex-1 bg-(--border)" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />
        </div>
        <h3 className="font-syne text-lg font-black leading-tight tracking-tight text-(--text) mb-4 group-hover:text-(--text) transition-colors">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-(--text-muted)">{text}</p>
      </div>
    </motion.article>
  );
}

export default function SkillsView({ setView }: { setView: (view: ViewKey) => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
      className="pt-10 pb-20 max-w-5xl"
    >
      <div className="font-mono text-xs text-(--accent) uppercase tracking-[0.2em] mb-4">— Skills</div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-syne font-black text-(--text) leading-none tracking-tight">
            Capability Map
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--text-muted)">
            A practical view of what I can do, where I apply it, and the tools I use to turn product,
            customer, and engineering context into usable outcomes.
          </p>
        </div>
        <div className="border-l-2 border-(--accent) pl-5 max-w-sm">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-(--text-muted) mb-2">
            Primary Operating Context
          </div>
          <div className="font-syne font-black text-lg uppercase tracking-tight text-(--text)">
            Mission-critical production environments and enterprise SaaS
          </div>
        </div>
      </div>

      {/* Primary competencies */}
      <section className="mb-4">
        <div className="mb-5 flex items-center gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">
            Primary Competencies
          </div>
          <div className="h-px flex-1 bg-(--border)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)">
          {primaryCompetencies.map((c, i) => (
            <CompetencyCard key={c.number} {...c} index={i} />
          ))}
        </div>
      </section>

      {/* Expanding competencies */}
      <section className="mb-16">
        <div className="mb-5 flex items-center gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">
            Expanding
          </div>
          <div className="h-px flex-1 bg-(--border)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)">
          {expandingCompetencies.map((c, i) => (
            <CompetencyCard key={c.number} {...c} index={i + 3} />
          ))}
        </div>
      </section>

      {/* Tools section */}
      <section className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">
              Tools I Use
            </div>
            <h3 className="mt-4 font-syne text-2xl font-black tracking-tight text-(--text)">
              Grouped by working context
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-(--text-muted)">
            Not an exhaustive inventory — the practical stack behind consulting, support, automation,
            systems, and implementation work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-(--border) bg-(--border)">
          {toolGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.04, duration: 0.25 }}
              className="bg-(--surface) p-7 md:p-9"
            >
              <div className="mb-6 flex items-center gap-3">
                <Wrench className="h-4 w-4 text-(--accent)" />
                <h4 className="font-syne text-xl font-black tracking-tight text-(--text)">{group.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2.5 bg-(--bg) border border-(--border) text-[10px] font-sans font-semibold uppercase text-(--text-muted) flex items-center gap-2.5 group hover:border-(--accent) hover:text-(--text) transition-colors"
                  >
                    <TechIcon name={item} size={20} className="transition-opacity shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Education / Languages / Certifications */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-px border border-(--border) bg-(--border)">
        <article className="bg-(--bg) p-7 min-w-0">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <GraduationCap className="h-4 w-4" />
            Education
          </div>
          <div className="space-y-5">
            {CONFIG.education.map((edu) => (
              <div key={edu.degree}>
                <div className="font-syne text-lg font-black leading-tight text-(--text) break-words">{edu.degree}</div>
                <div className="mt-2 text-xs leading-relaxed text-(--text-muted) break-words">{edu.school}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-(--accent)">{edu.period}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-(--bg) p-7 min-w-0">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <Languages className="h-4 w-4" />
            Languages
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFIG.languages.map((item) => (
              <span
                key={item}
                className="px-3 py-2 bg-(--surface) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted) break-words"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="bg-(--bg) p-7 min-w-0">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">
            <ShieldCheck className="h-4 w-4" />
            Certifications
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFIG.certifications.map(({ name, href }) =>
              href ? (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-(--surface) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted) hover:bg-(--accent)/10 hover:border-(--accent) transition-colors break-words max-w-full"
                >
                  {name}
                </a>
              ) : (
                <span
                  key={name}
                  className="px-3 py-2 bg-(--surface) border border-(--border) text-xs font-mono font-bold uppercase tracking-widest text-(--text-muted) break-words max-w-full"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </article>
      </section>

      <GuidedNext currentView="skills" onNavigate={setView} />
    </motion.div>
  );
}
