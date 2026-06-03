"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, MapPin, MessageCircle, Sparkles } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const storyBeats = [
  {
    label: "Foundation",
    title: "Built from engineering fundamentals.",
    text: "The foundation starts with Electrical and Electronic Engineering, Information and Communication Engineering, optical fibers, and IT networks. That mix shaped how I think about systems: signals, constraints, infrastructure, reliability, and the practical details that decide whether something works.",
    context: "Engineering grounding: electrical/electronic systems, information and communication engineering, optical fibers, LAN/WAN operations, documentation, and root-cause thinking.",
  },
  {
    label: "Delivery",
    title: "Added project management and technical coordination.",
    text: "At Larsen & Toubro, the work added project management, training coordination, documentation, scheduling, and stakeholder follow-through. It made the technical foundation operational: not just understanding systems, but coordinating people and delivery around them.",
    context: "L&T influence: project management, technical training coordination, curriculum planning, handoffs, reporting, and operational discipline.",
  },
  {
    label: "Consulting",
    title: "Moved into B2B SaaS solution consultation.",
    text: "In Germany, the work expanded into B2B SME and enterprise product sales, software solution consultation, Tier-3 technical support, discovery, RFI/RFP support, PoCs, onboarding, production troubleshooting, and release validation.",
    context:
      "SaaS consulting: product sales support, technical discovery, customer onboarding, API/database troubleshooting, SLA-driven Tier-3 support, release validation, and engineering coordination.",
  },
  {
    label: "Now",
    title: "Engineering AI automation and workflows.",
    text: "Current interests extend that operating experience into AI automation, workflow engineering, cybersecurity, GTM, SDR systems, and agentic full stack software development. The goal is practical: turn repeated technical work into systems that scale.",
    context: "AI automation layer: RAG, local LLMs, FastAPI, Qdrant, Docker, n8n, GTM workflows, agentic software development, and cybersecurity-aware systems thinking.",
  },
];

const principles = [
  "clarity over complexity",
  "systems should reduce cognitive load",
  "small improvements should compound reliability",
  "support signals should shape product design",
  "AI automation should preserve transparency",
];

export default function AboutView({ setView }: { setView: (view: ViewKey) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0.04, 0.88], [0, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [0.16, 0.32, 0.12]);

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative max-w-6xl pb-24">
      <motion.div
        className="pointer-events-none fixed right-12 top-20 hidden h-[60vh] w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),var(--accent2),transparent)] lg:block"
        style={{ scaleY: lineScale }}
      />
      <motion.div className="pointer-events-none absolute left-[18%] top-24 h-[520px] w-[520px] rounded-full bg-(--accent)/10 blur-3xl" style={{ opacity: glowOpacity }} />

      <section className="relative grid min-h-[78vh] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 border border-(--border) bg-(--surface)/82 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">
            <MessageCircle className="h-3.5 w-3.5" />
            Biography / Point of View
          </div>
          <h2 className="max-w-3xl font-syne text-5xl font-black leading-[0.9] text-(--text) md:text-7xl">It&apos;s good to catch up.</h2>
          <p className="mt-8 max-w-2xl font-playfair text-2xl italic leading-relaxed text-(--text)">
            Hi. I&apos;m Shahriar. I was born and raised in Bangladesh, moved halfway across the world to Germany, and I&apos;m currently living in Berlin. I specialize in helping technical products
            reach and retain customers through technical discovery, sales development, GTM strategy, in-depth support, and customer success-focused execution.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-2">
            <div className="bg-(--bg) p-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent)">
                <MapPin className="h-3.5 w-3.5" />
                Base
              </div>
              <div className="font-syne text-2xl font-black text-(--text)">{CONFIG.location}</div>
            </div>
            <div className="bg-(--bg) p-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent2)">
                <Sparkles className="h-3.5 w-3.5" />
                Philosophy
              </div>
              <div className="font-syne text-2xl font-black text-(--text)">make systems reliable, explainable, and usable</div>
            </div>
          </div>
        </div>

        <motion.aside style={{ y: portraitY }} className="relative z-10">
          <div className="relative overflow-hidden border border-(--border) bg-(--surface) shadow-2xl">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(rgba(238,246,248,0.65) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="relative p-8 md:p-10">
              <div className="mb-10 flex items-center justify-between gap-6 border-b border-(--border) pb-6">
                <div>
                  <div className="font-syne text-2xl font-black text-(--text)">Coffee and conversation</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center border border-(--border) bg-(--bg) text-(--accent)">
                  <Coffee className="h-5 w-5" />
                </div>
              </div>
              <p className="text-base leading-8 text-(--text-muted)">{CONFIG.profile}</p>
              <div className="mt-10 flex flex-wrap gap-2">
                {CONFIG.taglines.map((tagline) => (
                  <span key={tagline} className="border border-(--accent)/30 bg-(--accent)/10 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-widest text-(--accent)">
                    {tagline}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="relative mt-10 border-y border-(--border) py-20">
        <div className="absolute left-4 top-20 bottom-20 hidden w-px bg-(--border) md:block">
          <motion.div className="h-full origin-top bg-(--accent)" style={{ scaleY: lineScale }} />
        </div>
        <div className="space-y-20 md:pl-20">
          {storyBeats.map((beat, index) => (
            <motion.article
              key={beat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.42 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--accent)">
                {String(index + 1).padStart(2, "0")} / {beat.label}
              </div>
              <div className="max-w-3xl">
                <h3 className="font-syne text-3xl font-black leading-tight text-(--text) md:text-5xl">{beat.title}</h3>
                <p className="mt-6 text-lg leading-9 text-(--text-muted)">{beat.text}</p>
                <div className="mt-8 border border-(--border) bg-(--surface) p-5">
                  <div className="bg-(--surface) p-5">
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">System Context</div>
                    <p className="text-sm leading-relaxed text-(--text-muted)">{beat.context}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-px border border-(--border) bg-(--border) lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-(--bg) p-8 md:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">What I care about in the work</div>
          <h3 className="mt-5 font-syne text-4xl font-black leading-none text-(--text)">Reliable systems, clear handoffs, and fewer repeated failures.</h3>
        </div>
        <div className="grid grid-cols-1 gap-px bg-(--border) sm:grid-cols-2">
          {principles.map((principle, index) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="min-h-40 bg-(--surface) p-7"
            >
              <div className="mb-8 font-mono text-[9px] uppercase tracking-[0.24em] text-(--text-muted)">principle {String(index + 1).padStart(2, "0")}</div>
              <div className="font-syne text-2xl font-black uppercase leading-tight text-(--text)">{principle}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl border-l-2 border-(--accent) pl-8">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">The working style</div>
          <p className="font-playfair text-3xl italic leading-snug text-(--text) md:text-5xl">
            I like being the person who can enter a messy technical situation, find the signal, explain the tradeoffs, and help the next step become clear.
          </p>
        </div>
      </section>

      <GuidedNext currentView="about" onNavigate={setView} />
    </motion.div>
  );
}
