"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, MapPin, MessageCircle, Sparkles } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const storyBeats = [
  {
    label: "Then",
    title: "Started at the infrastructure layer.",
    text: "Worked close to physical and operational systems: network infrastructure, optical fiber environments, QA systems, and on-call technical support. The environments were tangible. Systems either held together or failed, and failure was visible.",
    context: "Infrastructure grounding: physical constraints, deterministic environments, operational discipline, and root-cause thinking.",
  },
  {
    label: "Transition",
    title: "Moved into systems-facing consulting.",
    text: "Relocating to Germany shifted the work toward people as much as technology. The role expanded into onboarding, integrations, troubleshooting, and translating complex systems into workflows teams could actually use.",
    context: "Systems consulting: converting technical complexity into usable workflows, support clarity, and repeatable processes.",
  },
  {
    label: "Now",
    title: "Designing systems that reduce friction.",
    text: "Current work focuses on automation, AI-enabled workflows, and developer tooling. The objective remains consistent: make systems easier to understand, easier to operate, and easier to trust over time.",
    context: "AI and workflow systems: retrieval, orchestration, local models, and systems designed around reliability.",
  },
];

const principles = [
  "clarity over complexity",
  "systems should reduce cognitive load",
  "small improvements should compound reliability",
  "support signals should shape product design",
  "automation should preserve transparency",
];

export default function AboutView({ setView }: { setView: (view: ViewKey) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0.04, 0.88], [0, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [0.16, 0.32, 0.12]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative max-w-6xl pb-24"
    >
      <motion.div
        className="pointer-events-none fixed right-12 top-20 hidden h-[60vh] w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),var(--accent2),transparent)] lg:block"
        style={{ scaleY: lineScale }}
      />
      <motion.div
        className="pointer-events-none absolute left-[18%] top-24 h-[520px] w-[520px] rounded-full bg-(--accent)/10 blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <section className="relative grid min-h-[78vh] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 border border-(--border) bg-white/70 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">
            <MessageCircle className="h-3.5 w-3.5" />
            Biography / Point of View
          </div>
          <h2 className="max-w-3xl font-syne text-5xl font-black leading-[0.9] text-(--text) md:text-7xl">
            It&apos;s good to catch up.
          </h2>
          <p className="mt-8 max-w-2xl font-playfair text-2xl italic leading-relaxed text-(--text)">
            Hi. I&apos;m Shahriar. Born and raised in Bangladesh. I moved half way across the world to Germany and have been living in Berlin for the last 10 years. I like solving problems, and experimenting with different tech stacks. Let&apos;s catch up and chat about systems, AI, or whatever&apos;s on your mind.
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
              <div className="font-syne text-2xl font-black text-(--text)"> build systems people trust</div>
            </div>
          </div>
        </div>

        <motion.aside style={{ y: portraitY }} className="relative z-10">
          <div className="relative overflow-hidden border border-(--border) bg-white shadow-2xl">
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
              <p className="text-base leading-8 text-(--text-muted)">
                {CONFIG.profile}
              </p>
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
                <div className="mt-8 border border-(--border) bg-white p-5">
                  <div className="bg-white p-5">
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
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">What I care about now</div>
          <h3 className="mt-5 font-syne text-4xl font-black leading-none text-(--text)">Useful reliability, with a human voice.</h3>
        </div>
        <div className="grid grid-cols-1 gap-px bg-(--border) sm:grid-cols-2">
          {principles.map((principle, index) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="min-h-40 bg-white p-7"
            >
              <div className="mb-8 font-mono text-[9px] uppercase tracking-[0.24em] text-(--text-muted)">
                principle {String(index + 1).padStart(2, "0")}
              </div>
              <div className="font-syne text-2xl font-black uppercase leading-tight text-(--text)">{principle}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl border-l-2 border-(--accent) pl-8">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-(--accent)">Underneath the systems language</div>
          <p className="font-playfair text-3xl italic leading-snug text-(--text) md:text-5xl">
            The short version? I like being the person who can sit with the messy thing, ask the useful question, and help everyone breathe again.
          </p>
        </div>
      </section>

      <GuidedNext currentView="about" onNavigate={setView} />
    </motion.div>
  );
}
