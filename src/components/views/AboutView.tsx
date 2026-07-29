"use client";

import { type RefObject, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Coffee, MapPin, MessageCircle, Sparkles } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const storyBeats = [
  {
    label: "Network Operations (2013–2015)",
    title: "Started in network engineering and field operations.",
    text: "Began at Earth Telecommunication managing network infrastructure and incident resolution for SME and enterprise accounts. Built a Python-based network discovery tool, coordinated field services, and learned SLA-driven operations from the ground up.",
    context: "Network operations, field support, Python tooling, SLA management.",
  },
  {
    label: "Technical Training & Coordination (2015–2016)",
    title: "Shifted from hands-on to enabling others.",
    text: "At Larsen & Toubro, designed onboarding infrastructure and led technical training for 60+ incoming engineers per quarter. Coordinated with Japanese, Indian, and Bangladeshi stakeholders — learning that delivery depends on communication as much as technical skill.",
    context: "Technical enablement, curriculum design, cross-cultural stakeholder coordination.",
  },
  {
    label: "SaaS Solutions & Technical Project Delivery (2020–2024)",
    title: "Enterprise implementation and incident management in Germany.",
    text: "At tripunkt, managed technical delivery for enterprise B2B clients across NAM, APAC, and DACH — from discovery through production adoption. Owned Tier-3 incident response, SQL-based diagnostics, API integrations, and cross-functional coordination. The work was part consulting, part project management, part operations.",
    context: "Customer-facing implementation, incident response, SQL/API diagnostics, cross-region coordination.",
  },
  {
    label: "QA Engineer & Release Validation (2024–2026)",
    title: "Owning release quality and validation processes.",
    text: "Managed pre-release QA lifecycle, defect tracking, API validation, and release documentation. Reduced customer-reported post-release defects through structured test processes and engineering coordination.",
    context: "Release lifecycle, QA process, Jira-based defect management, API validation.",
  },
  {
    label: "Current Focus (2026)",
    title: "Cybersecurity operations, SaaS solution engineering & enterprise account management.",
    text: "I decided to come back to my roots and continue building on my IT network engineering foundations. Most recently I obtained the CompTIA Security+ certification and am looking for roles in cybersecurity, SaaS solution engineering, and enterprise account management.",
    context: "Cybersecurity operations, solution engineering, enterprise account management.",
  },
];

export default function AboutView({ setView, scrollContainerRef }: { setView: (view: ViewKey) => void; scrollContainerRef?: RefObject<HTMLElement | null> }) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef, target: containerRef, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0.04, 0.88], [0, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8], [0.16, 0.32, 0.12]);

  return (
    <motion.div
      ref={containerRef}
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
      className="relative max-w-5xl pb-24"
    >
      <motion.div
        className="pointer-events-none fixed right-12 top-20 hidden h-[60vh] w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),var(--accent2),transparent)] lg:block"
        style={{ scaleY: lineScale }}
      />
      <motion.div className="pointer-events-none absolute left-[18%] top-24 h-[520px] w-[520px] rounded-full bg-(--accent)/10 blur-3xl" style={{ opacity: glowOpacity }} />

      <section className="relative grid min-h-[70vh] grid-cols-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 border border-(--border) bg-(--surface)/82 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">
            <MessageCircle className="h-3 w-3" />
            Biography / Point of View
          </div>
          <h1 className="max-w-3xl font-syne text-2xl font-black leading-[0.9] tracking-tight text-(--text) md:text-4xl">It&apos;s good to catch up.</h1>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed tracking-tight text-(--text)">
                      Hi. I&apos;m Shahriar. I was born and raised in Bangladesh, moved halfway across the world to Germany, and I&apos;m currently living in Berlin. I specialize in technical operations,
            technical project management, systems integration, and cybersecurity operations — working across adjacent roles such as implementation engineering, customer success engineering,
            technical account management, and project delivery to turn complexity into clear outcomes and repeatable processes.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-px border border-(--border) bg-(--border) sm:grid-cols-2">
            <div className="bg-(--surface) p-5">
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent)">
                <MapPin className="h-3 w-3" />
                Base
              </div>
              <div className="font-syne text-lg font-black tracking-tight text-(--text)">{CONFIG.location}</div>
            </div>
            <div className="bg-(--surface) p-5">
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent2)">
                <Sparkles className="h-3.5 w-3.5" />
                Philosophy
              </div>
              <div className="font-syne text-lg font-black tracking-tight text-(--text)">make systems reliable, explainable, and usable</div>
            </div>
          </div>
        </div>

        <motion.aside style={{ y: portraitY }} className="relative z-10">
          <div className="relative overflow-hidden border border-(--border) bg-(--surface) shadow-2xl">
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(rgba(238,246,248,0.65) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="relative p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-(--border) pb-4">
                <div>
                  <div className="font-syne text-lg font-black tracking-tight text-(--text)">Coffee and conversation</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center border border-(--border) bg-(--bg) text-(--accent)">
                  <Coffee className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm leading-7 text-(--text-muted)">{CONFIG.profile}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
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

      {/* Working style quote — complements the Hero version without repeating the automation clause */}
      <section className="relative py-10 border-y border-(--border)">
        <div className="max-w-3xl border-l-4 border-(--accent) pl-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-(--accent)">Working Style</div>
          <p className="font-sans text-lg leading-snug tracking-tight text-(--text)">
            I like being the person who can walk into a messy technical situation, work out what matters, explain the tradeoffs, and lay out a clear plan.
          </p>
        </div>
      </section>

      <section className="relative mt-8 border-y border-(--border) py-14">
        <div className="absolute left-4 top-20 bottom-20 hidden w-px bg-(--border) md:block">
          <motion.div className="h-full origin-top bg-(--accent)" style={{ scaleY: lineScale }} />
        </div>
        <div className="space-y-8 md:space-y-14 md:pl-16">
          {storyBeats.map((beat) => (
            <motion.article
              key={beat.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.42 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]"
            >
              <div>
                <div className="font-syne font-black text-lg tracking-tight text-(--accent) uppercase">{beat.label}</div>
              </div>
              <div className="max-w-3xl">
                <h3 className="font-syne text-lg font-black leading-tight tracking-tight text-(--text) md:text-2xl">{beat.title}</h3>
                <p className="mt-4 text-sm leading-8 text-(--text-muted)">{beat.text}</p>
                <div className="mt-5 border border-(--border) bg-(--surface) p-4">
                  <div className="bg-(--surface)">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-(--accent)">System Context</div>
                    <p className="text-sm leading-relaxed text-(--text-muted)">{beat.context}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <GuidedNext currentView="about" onNavigate={setView} />
    </motion.div>
  );
}
