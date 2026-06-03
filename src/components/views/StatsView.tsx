"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const ORBIT_ROTATION_DEGREES = -10;
const ORBIT_RADIUS = 41;
const ORBIT_DURATION_SECONDS = 108;

const rawOrbitNodes = [
  { id: "calm", label: "Calm Under Pressure", angle: -90, color: "#A78BFA" },
  { id: "story", label: "Story Teller", angle: -30, color: "#F59E0B" },
  { id: "person", label: "A Wonderful Person", angle: 30, color: "#F472B6" },
  { id: "solution", label: "Solution Driven", angle: 90, color: "#34D399" },
  { id: "problem", label: "Problem Solver", angle: 150, color: "#38BDF8" },
  { id: "bridge", label: "Technical Translator", angle: 210, color: "#EF4444" },
];

const metrics = [
  { value: "15+", label: "Years Professional Experience", glyph: "code", spark: "M3 16 L8 13 L13 15 L20 7" },
  { value: "10", label: "International Clients Onboarded", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
  { value: "40/wk", label: "Production Tickets", glyph: "box", spark: "M3 18 L10 14 L16 16 L21 8" },
  { value: "30%", label: "Recurring Bug Reduction", glyph: "lab", spark: "M3 18 L8 12 L12 15 L16 9 L21 5" },
  { value: "60+", label: "Engineers Coordinated at L&T", glyph: "book", spark: "M3 17 L8 16 L12 12 L16 14 L20 6" },
  { value: "500+", label: "Network Clients Supported", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
];

const futurePaths = ["AI automation and workflow engineering", "cybersecurity-aware systems thinking", "GTM, SDR, and agentic full stack development"];

const nextPaths: Array<{ view: ViewKey; label: string; question: string }> = [
  { view: "experience", label: "Experience", question: "Can he operate in real environments?" },
  { view: "projects", label: "Projects", question: "What has he built?" },
  { view: "contact", label: "Contact", question: "How do I reach him?" },
];

function getOrbitPoint(angle: number) {
  const radians = ((angle + ORBIT_ROTATION_DEGREES) * Math.PI) / 180;

  return {
    x: 50 + Math.cos(radians) * ORBIT_RADIUS,
    y: 50 + Math.sin(radians) * ORBIT_RADIUS,
  };
}

const orbitNodes = rawOrbitNodes.map((node) => ({
  ...node,
  ...getOrbitPoint(node.angle),
}));

function MetricGlyph({ type }: { type: string }) {
  if (type === "code") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 8 4 12l4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 5-4 14" />
      </svg>
    );
  }

  if (type === "globe") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2 2.5 3 5.2 3 8s-1 5.5-3 8M12 4c-2 2.5-3 5.2-3 8s1 5.5 3 8" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 5h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H5z" />
        <path d="M19 5h-5a3 3 0 0 0-3 3" />
      </svg>
    );
  }

  if (type === "lab") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3" />
        <path d="M7 16h10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

export default function StatsView({ setView }: { setView: (view: ViewKey) => void }) {
  const [activeNode, setActiveNode] = useState(orbitNodes[4]);
  const [futureIndex, setFutureIndex] = useState(0);

  const particleField = useMemo(
    () =>
      Array.from({ length: 96 }, (_, index) => ({
        id: index,
        x: 2 + ((index * 19) % 96),
        y: 3 + ((index * 31) % 94),
        delay: (index % 11) * 0.16,
        warm: index % 7 === 0,
      })),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative -m-5 min-h-screen overflow-hidden bg-[#070B12] px-6 py-10 text-(--text) md:-m-12 md:px-10 md:py-14 xl:-m-16 xl:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: "radial-gradient(rgba(238,246,248,0.14) 1px, transparent 1px), radial-gradient(circle at 48% 42%, rgba(56,189,248,0.12), transparent 24rem)",
          backgroundSize: "31px 31px, 100% 100%",
        }}
      />

      <section className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.46fr_0.9fr] lg:items-start">
        <aside className="pt-24 lg:pt-32">
          <div className="mb-7 font-mono text-[10px] uppercase tracking-[0.34em] text-(--text-muted)">Human Qualities</div>
          <h2 className="max-w-[290px] font-syne text-6xl font-medium leading-[0.92] tracking-normal text-(--text) md:text-7xl">
            Life&apos;s sky.
            <br />
            Human signals.
          </h2>
          <p className="mt-12 max-w-[280px] font-mono text-[11px] font-bold leading-8 text-(--text)">
            Calm when stakes rise. Clear when systems get tangled. Kind enough to keep people with the work.
          </p>
          <p className="mt-12 max-w-[190px] font-mono text-[10px] uppercase leading-5 tracking-[0.28em] text-(--text-muted)">Follow the constellation.</p>
        </aside>

        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={ORBIT_RADIUS} fill="none" stroke="rgba(238,246,248,0.07)" strokeWidth="0.1" />
            <motion.circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="rgba(155,58,71,0.12)"
              strokeWidth="0.2"
              strokeDasharray="1 1.7"
              animate={{ rotate: -360 }}
              style={{ transformOrigin: "50% 50%" }}
              transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
            />
            {particleField.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r={particle.warm ? 0.25 : 0.14}
                fill={particle.warm ? "rgba(245,158,11,0.48)" : "rgba(148,163,184,0.28)"}
                animate={{ opacity: [0.72, 0.68, 0.62] }}
                transition={{ duration: 4.6, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.46),transparent)] blur-[0.5px]" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(56,189,248,0.46),transparent)] blur-[0.5px]" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/30 blur-lg" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/10 blur-xl" />
            <span
              className="absolute left-1/2 top-1/2 block h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200"
              style={{
                background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,1), rgba(125,211,252,1) 46%, rgba(56,189,248,0.72) 100%)",
                filter: "brightness(2.8)",
                boxShadow: "0 0 20px rgba(56,189,248,1), 0 0 58px rgba(125,211,252,0.9), 0 0 108px rgba(56,189,248,0.48)",
              }}
            />
          </motion.div>

          <motion.div className="absolute inset-0" animate={{ rotate: -360 }} transition={{ duration: ORBIT_DURATION_SECONDS, repeat: Infinity, ease: "linear" }}>
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
              <g stroke="rgba(238,246,248,0.2)" strokeWidth="0.16" strokeLinecap="round" strokeDasharray="0.8 1.5">
                <line x1={orbitNodes[5].x} y1={orbitNodes[5].y} x2="50" y2="50" />
                <line x1={orbitNodes[5].x} y1={orbitNodes[5].y} x2={orbitNodes[4].x} y2={orbitNodes[4].y} />
                <line x1={orbitNodes[5].x} y1={orbitNodes[5].y} x2={orbitNodes[3].x} y2={orbitNodes[3].y} />
                <line x1="50" y1="50" x2={orbitNodes[1].x} y2={orbitNodes[1].y} />
                <line x1={orbitNodes[3].x} y1={orbitNodes[3].y} x2={orbitNodes[4].x} y2={orbitNodes[4].y} />
              </g>
              <g stroke="rgba(238,246,248,0.2)" strokeWidth="0.18" strokeLinecap="round" strokeDasharray="0.8 1.4">
                {[
                  [0, 1],
                  [2, 3],
                ].map(([fromIndex, toIndex]) => {
                  const fromNode = orbitNodes[fromIndex];
                  const toNode = orbitNodes[toIndex];
                  return <line key={`${fromNode.id}-${toNode.id}`} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} />;
                })}
              </g>
              <g fill="rgba(238,246,248,0.62)">
                <circle cx="50" cy="50" r="0.35" />
                {orbitNodes.map((node) => (
                  <circle key={`net-node-${node.id}`} cx={node.x} cy={node.y} r="0.28" />
                ))}
              </g>
            </svg>
            {orbitNodes.map((node) => {
              const isActive = activeNode.id === node.id;
              const orbGlow = isActive
                ? "0 0 20px rgba(255,255,255,1), 0 0 58px rgba(238,246,248,0.9), 0 0 108px rgba(238,246,248,0.48)"
                : "0 0 16px rgba(255,255,255,0.9), 0 0 44px rgba(238,246,248,0.52)";
              return (
                <button
                  type="button"
                  key={node.id}
                  onPointerEnter={() => setActiveNode(node)}
                  onPointerMove={() => setActiveNode(node)}
                  onMouseEnter={() => setActiveNode(node)}
                  onFocus={() => setActiveNode(node)}
                  onClick={() => setActiveNode(node)}
                  className="absolute z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full text-left outline-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <motion.span className="absolute inset-0 block" animate={{ rotate: 360 }} transition={{ duration: ORBIT_DURATION_SECONDS, repeat: Infinity, ease: "linear" }}>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.38),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-lg" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl" />
                    <motion.span
                      className="absolute left-1/2 top-1/2 block h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur"
                      style={{
                        background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,1), rgba(255,255,255,1) 46%, rgba(238,246,248,0.72) 100%)",
                        borderColor: "rgba(255,255,255,1)",
                        filter: "brightness(2.8)",
                        boxShadow: orbGlow,
                      }}
                      animate={{ scale: isActive ? [1, 1.55, 1] : [1, 1.18, 1] }}
                      transition={{ duration: isActive ? 2.2 : 3.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="pointer-events-none absolute left-1/2 top-[calc(100%+18px)] hidden sm:block min-w-32 -translate-x-1/2 text-center">
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-(--text)">{node.label}</span>
                    </span>
                  </motion.span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile-only: centred active node label — replaces clipping per-star labels */}
        <div className="mt-6 flex flex-col items-center gap-1 sm:hidden">
          <div className="font-mono text-[8px] uppercase tracking-[0.28em] text-(--text-muted)">tap a star</div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-(--text)">{activeNode.label}</div>
          <div className="mt-1 h-px w-8 bg-(--accent)" />
        </div>

        <aside className="relative pt-8 lg:pt-20">
          <div className="mb-32 hidden text-right font-mono text-[8px] font-bold uppercase tracking-[0.32em] text-(--text-muted) lg:block">
            <div>Last Updated</div>
            <div className="mt-4 text-(--text)">May 15, 2026&nbsp;&nbsp;20:45</div>
          </div>

          <div className="mb-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">Key Metrics</div>
            <div className="mt-3 h-px w-12 bg-(--accent2)" />
          </div>
          <div className="space-y-7">
            {metrics.map((metric) => (
              <div key={metric.label} className="grid grid-cols-[46px_1fr_84px] items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-(--border) bg-[#101826]/90 text-(--text)">
                  <MetricGlyph type={metric.glyph} />
                </div>
                <div>
                  <div className="font-syne text-3xl font-black leading-none text-(--text)">{metric.value}</div>
                  <div className="mt-1 text-xs leading-tight text-(--text-muted)">{metric.label}</div>
                </div>
                <svg viewBox="0 0 24 24" className="h-8 w-full text-(--text-muted)" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <path d={metric.spark} />
                  <circle cx="20" cy="7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-8 border-t border-(--border) pt-8 lg:grid-cols-[300px_1fr]">
        <div className="overflow-hidden border border-(--border) bg-[#101826]/86">
          <div className="p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--text-muted)">Working Style</div>
            <div className="mt-7 flex items-end gap-2">
              <div className="font-syne text-5xl font-black leading-none text-(--text)">Lead</div>
              <div className="pb-2 text-xs text-(--text-muted)">technical solution consultant</div>
            </div>
            <div className="my-7 h-px w-11 bg-(--text)" />
            <p className="max-w-[220px] text-sm leading-relaxed text-(--text-muted)">
              The technical profile matters, but the work is remembered through steadiness, clarity, follow-through, and care for the customer&apos;s actual situation.
            </p>
            <div className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-(--accent)">{futurePaths[futureIndex]}</div>
          </div>
          <button
            type="button"
            onClick={() => setFutureIndex((current) => (current + 1) % futurePaths.length)}
            className="flex w-full items-center justify-between bg-(--text) px-8 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#070B12]"
          >
            Explore current interests
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="pt-10">
          <p className="max-w-xl text-base leading-relaxed text-(--text-muted) md:text-lg">Numbers show the scale. The work depends on staying useful, steady, and clear when the problem is live.</p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {nextPaths.map((path) => (
              <button
                key={path.view}
                type="button"
                onClick={() => setView(path.view)}
                className="group flex min-h-28 flex-col justify-between border border-(--border) bg-[#070B12]/70 p-5 text-left transition-colors hover:border-(--accent) hover:bg-[#101826]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-(--accent)">{path.label}</span>
                  <ArrowRight className="h-4 w-4 text-(--text-muted) transition-transform group-hover:translate-x-1 group-hover:text-(--accent)" />
                </div>
                <span className="mt-7 font-syne text-lg font-black leading-tight text-(--text)">{path.question}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
