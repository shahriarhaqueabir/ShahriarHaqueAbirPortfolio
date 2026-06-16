"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ViewKey } from "@/lib/types";

const ORBIT_ROTATION_DEGREES = -10;
const ORBIT_RADIUS = 41;
const ORBIT_DURATION_SECONDS = 108;

const orbitNodes = [
  { id: "systems", label: "Systems Thinker", angle: -90, color: "#A78BFA" },
  { id: "adaptive", label: "Adaptive Learner", angle: -30, color: "#F59E0B" },
  { id: "cross", label: "Cross Functional", angle: 30, color: "#F472B6" },
  { id: "solution", label: "Solution Driven", angle: 90, color: "#34D399" },
  { id: "problem", label: "Problem Solver", angle: 150, color: "#38BDF8" },
  { id: "detail", label: "Detail Oriented", angle: 210, color: "#EF4444" },
];

const metrics = [
  { value: "10+", label: "Years Technical Support Experience", glyph: "code", spark: "M3 16 L8 13 L13 15 L20 7" },
  { value: "40+", label: "Complex Production Incidents Triaged Weekly", glyph: "lab", spark: "M3 18 L8 12 L12 15 L16 9 L21 5" },
  { value: "30%", label: "Recurring Defects Reduction at tripunkt GmbH", glyph: "box", spark: "M3 18 L10 14 L16 16 L21 8" },
  { value: "500+", label: "Network Clients Managed at Earth Telecom.", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
  { value: "60+", label: "Engineers Mentored at L&T", glyph: "book", spark: "M3 17 L8 16 L12 12 L16 14 L20 6" },
  { value: "3", label: "Global Regions Supported (NAM, APAC, DACH)", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
];

const principles = [
  "clarity over complexity",
  "systems should reduce cognitive load",
  "small improvements should compound reliability",
  "support signals should shape product design",
  "AI automation should preserve transparency",
];

function getOrbitPoint(angle: number) {
  const radians = ((angle + ORBIT_ROTATION_DEGREES) * Math.PI) / 180;

  return {
    x: 50 + Math.cos(radians) * ORBIT_RADIUS,
    y: 50 + Math.sin(radians) * ORBIT_RADIUS,
  };
}

const orbitNodesWithPoints = orbitNodes.map((node) => ({
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
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState(orbitNodesWithPoints[4]);

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
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
      className="relative min-h-screen overflow-hidden bg-[#030509] px-5 pb-24 pt-10 text-(--text) md:-m-12 md:px-10 md:pb-24 md:pt-14 xl:-m-16 xl:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: "radial-gradient(rgba(238,246,248,0.14) 1px, transparent 1px), radial-gradient(circle at 48% 42%, rgba(56,189,248,0.12), transparent 24rem)",
          backgroundSize: "31px 31px, 100% 100%",
        }}
      />

      <section className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.46fr_0.9fr] lg:items-start">
        <aside className="pt-12 lg:pt-24">
          <div className="mb-7 font-mono text-xs uppercase tracking-[0.34em] text-(--text-muted)">Human Qualities</div>
          <h2 className="max-w-[290px] font-syne text-3xl font-medium leading-[0.92] tracking-tight text-(--text) md:text-4xl">
            Life&apos;s sky.
            <br />
            Human signals.
          </h2>
          <p className="mt-12 max-w-[280px] font-mono text-xs font-bold leading-8 text-(--text)">Calm when stakes rise. Clear when systems get tangled. Kind enough to keep people with the work.</p>
          <p className="mt-12 max-w-[190px] font-mono text-xs uppercase leading-5 tracking-[0.28em] text-(--text-muted)">Follow the constellation.</p>
        </aside>

        <div className="relative mx-auto aspect-square w-full max-w-[620px] hidden lg:block">
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
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              style={{ transformOrigin: "50% 50%", willChange: "transform" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 58, repeat: Infinity, ease: "linear" }}
            />
            {particleField.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r={particle.warm ? 0.25 : 0.14}
                fill={particle.warm ? "rgba(245,158,11,0.48)" : "rgba(148,163,184,0.28)"}
                animate={shouldReduceMotion ? {} : { opacity: [0.72, 0.68, 0.62] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.6, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
            animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
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

          <motion.div
            className="absolute inset-0"
            animate={shouldReduceMotion ? {} : { rotate: -360 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: ORBIT_DURATION_SECONDS, repeat: Infinity, ease: "linear" }}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
              <motion.g
                key={activeNode.id}
                stroke="rgba(238,246,248,0.2)"
                strokeWidth="0.16"
                strokeLinecap="round"
                strokeDasharray="0.8 1.5"
                animate={shouldReduceMotion ? {} : { opacity: [0.6, 1, 0.6] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <line x1={orbitNodesWithPoints[5].x} y1={orbitNodesWithPoints[5].y} x2="50" y2="50" />
                <line x1={orbitNodesWithPoints[5].x} y1={orbitNodesWithPoints[5].y} x2={orbitNodesWithPoints[4].x} y2={orbitNodesWithPoints[4].y} />
                <line x1={orbitNodesWithPoints[5].x} y1={orbitNodesWithPoints[5].y} x2={orbitNodesWithPoints[3].x} y2={orbitNodesWithPoints[3].y} />
                <line x1="50" y1="50" x2={orbitNodesWithPoints[1].x} y2={orbitNodesWithPoints[1].y} />
                <line x1={orbitNodesWithPoints[3].x} y1={orbitNodesWithPoints[3].y} x2={orbitNodesWithPoints[4].x} y2={orbitNodesWithPoints[4].y} />
              </motion.g>
              <g stroke="rgba(238,246,248,0.2)" strokeWidth="0.18" strokeLinecap="round" strokeDasharray="0.8 1.4">
                {[
                  [0, 1],
                  [2, 3],
                ].map(([fromIndex, toIndex]) => {
                  const fromNode = orbitNodesWithPoints[fromIndex];
                  const toNode = orbitNodesWithPoints[toIndex];
                  return <line key={`${fromNode.id}-${toNode.id}`} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} />;
                })}
              </g>
              <g fill="rgba(238,246,248,0.62)">
                <circle cx="50" cy="50" r="0.35" />
                {orbitNodesWithPoints.map((node) => (
                  <circle key={`net-node-${node.id}`} cx={node.x} cy={node.y} r="0.28" />
                ))}
              </g>
            </svg>
            {orbitNodesWithPoints.map((node) => {
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
                  <motion.span
                    className="absolute inset-0 block will-change-transform"
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: ORBIT_DURATION_SECONDS, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.38),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] blur-[0.5px]" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-lg" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl" />
                    <motion.span
                      className="absolute left-1/2 top-1/2 block h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur will-change-transform"
                      style={{
                        background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,1), rgba(255,255,255,1) 46%, rgba(238,246,248,0.72) 100%)",
                        borderColor: "rgba(255,255,255,1)",
                        filter: "brightness(2.8)",
                        boxShadow: orbGlow,
                      }}
                      animate={shouldReduceMotion ? {} : { scale: isActive ? [1, 1.55, 1] : [1, 1.18, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: isActive ? 2.2 : 3.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="pointer-events-none absolute left-1/2 top-[calc(100%+18px)] hidden sm:block min-w-32 -translate-x-1/2 text-center">
                      <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-(--text)">{node.label}</span>
                    </span>
                  </motion.span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile-only: centred active node label — replaces clipping per-star labels */}
        <div className="mt-6 flex flex-col items-center gap-1 sm:hidden">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-(--text-muted)">tap a star</div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-(--text)">{activeNode.label}</div>
          <div className="mt-1 h-px w-8 bg-(--accent)" />
        </div>

        <aside className="relative pt-8 lg:pt-20">
          <div className="mb-32 hidden lg:block" />

          <div className="mb-8">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-(--text-muted)">Key Metrics</div>
            <div className="mt-3 h-px w-12 bg-(--accent2)" />
          </div>
          <div className="space-y-5">
            {metrics.map((metric) => (
              <div key={metric.label} className="grid grid-cols-1 sm:grid-cols-[40px_1fr_72px] items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-[#101826]/90 text-(--text)">
                  <MetricGlyph type={metric.glyph} />
                </div>
                <div>
                  <div className="font-syne text-lg font-black leading-none tracking-tight text-(--text)">{metric.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-(--text-muted) break-words">{metric.label}</div>
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

      <section className="grid grid-cols-1 gap-px border border-(--border) bg-(--border) lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-(--bg) p-6 md:p-10">
          <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-(--accent)">What I care about in the work</div>
          <h3 className="mt-4 font-syne text-xl font-black leading-none tracking-tight text-(--text)">Reliable systems, clear handoffs, and fewer repeated failures.</h3>
        </div>
        <div className="grid grid-cols-1 gap-px bg-(--border) sm:grid-cols-2">
          {principles.map((principle) => (
            <motion.div
              key={principle}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
              className="min-h-32 bg-(--surface) p-5"
            >
              <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-(--text-muted)">principle</div>
              <div className="font-syne text-lg font-black uppercase leading-tight tracking-tight text-(--text)">{principle}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
