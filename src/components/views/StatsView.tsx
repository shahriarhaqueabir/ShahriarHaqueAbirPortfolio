"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const ORBIT_RADIUS = 38;
const ORBIT_DURATION_SECONDS = 80;

const orbitNodes = [
  { id: "calm", label: "Calm Under Pressure", angle: 0, color: "#A78BFA" },
  { id: "story", label: "Story Teller", angle: 60, color: "#F59E0B" },
  { id: "person", label: "A Wonderful Person", angle: 120, color: "#F472B6" },
  { id: "solution", label: "Solution Driven", angle: 180, color: "#34D399" },
  { id: "problem", label: "Problem Solver", angle: 240, color: "#38BDF8" },
  { id: "bridge", label: "Technical Translator", angle: 300, color: "#EF4444" },
];

const metrics = [
  { value: "10+", label: "Years Enterprise Support Experience", glyph: "code", spark: "M3 16 L8 13 L13 15 L20 7" },
  { value: "40", label: "Tier-3 Incidents Resolved Weekly", glyph: "lab", spark: "M3 18 L8 12 L12 15 L16 9 L21 5" },
  { value: "30%", label: "Reduction in Recurring Defects", glyph: "box", spark: "M3 18 L10 14 L16 16 L21 8" },
  { value: "500+", label: "Network Clients Managed at Earth Tel", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
  { value: "60+", label: "Engineers Mentored at L&T", glyph: "book", spark: "M3 17 L8 16 L12 12 L16 14 L20 6" },
  { value: "10", label: "Enterprise Global Onboardings", glyph: "globe", spark: "M3 18 L8 10 L13 15 L19 11" },
];

const futurePaths = ["AI automation and workflow engineering", "cybersecurity-aware systems thinking", "GTM, SDR, and agentic full stack development"];

const nextPaths: Array<{ view: ViewKey; label: string; question: string }> = [
  { view: "experience", label: "Experience", question: "Can he operate in real environments?" },
  { view: "projects", label: "Projects", question: "What has he built?" },
  { view: "contact", label: "Contact", question: "How do I reach him?" },
];

function MetricGlyph({ type }: { type: string }) {
  const icons = {
    code: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 8 4 12l4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2 2.5 3 5.2 3 8s-1 5.5-3 8M12 4c-2 2.5-3 5.2-3 8s1 5.5 3 8" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 5h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H5z" /><path d="M19 5h-5a3 3 0 0 0-3 3" />
      </svg>
    ),
    lab: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3" /><path d="M7 16h10" />
      </svg>
    ),
    default: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5 12 12l8-4.5M12 12v9" />
      </svg>
    )
  };
  return icons[type as keyof typeof icons] || icons.default;
}

function OrbitingNode({ node, index, activeNode, setActiveNode }: { node: typeof orbitNodes[0], index: number, activeNode: any, setActiveNode: any }) {
  const isActive = activeNode.id === node.id;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateY: [node.angle, node.angle + 360],
      }}
      transition={{
        duration: ORBIT_DURATION_SECONDS,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div
        style={{ transform: `translateZ(${ORBIT_RADIUS}vw) rotateY(-${node.angle}deg)` }}
        className="relative"
      >
        <button
          type="button"
          onMouseEnter={() => setActiveNode(node)}
          onClick={() => setActiveNode(node)}
          className="relative h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none group"
        >
          {/* Node Glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
            style={{ backgroundColor: node.color }}
            animate={{ scale: isActive ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Star Core */}
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white shadow-[0_0_15px_white]"
            style={{ backgroundColor: node.color }}
          />

          {/* Label (Face camera) */}
          <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 whitespace-nowrap hidden md:block">
            <motion.span
              className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white opacity-40 group-hover:opacity-100 transition-opacity"
              animate={{ opacity: isActive ? 1 : 0.4 }}
            >
              {node.label}
            </motion.span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function StatsView({ setView }: { setView: (view: ViewKey) => void }) {
  const [activeNode, setActiveNode] = useState(orbitNodes[0]);
  const [futureIndex, setFutureIndex] = useState(0);

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const particleField = useMemo(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: index,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        z: Math.random() * 200 - 100,
        delay: Math.random() * 5,
        size: Math.random() * 2 + 1,
      })),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      className="relative -m-5 min-h-screen overflow-hidden bg-[#030509] px-6 py-10 text-(--text) md:-m-12 md:px-10 md:py-14 xl:-m-16 xl:px-12 flex flex-col items-center"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particleField.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full bg-white/20"
            style={{
              width: p.size,
              height: p.size,
              x: `${p.x}vw`,
              y: `${p.y}vh`,
              z: p.z,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <section className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-10 items-center">
        {/* Left Column: Context */}
        <aside className="space-y-12 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-(--accent)">Human Qualities</div>
            <h2 className="font-syne text-6xl font-black leading-tight text-white tracking-tighter">
              Life&apos;s sky.<br/>
              <span className="text-(--accent)">3D Space.</span>
            </h2>
          </div>
          <p className="font-mono text-xs leading-relaxed text-(--text-muted) max-w-xs">
            A volumetric map of professional traits and operational influence. Navigate the constellation.
          </p>
          <div className="pt-8 hidden lg:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--text-muted) mb-4">Focusing On</div>
            <div className="text-xl font-syne font-black text-white">{activeNode.label}</div>
            <div className="mt-2 h-1 w-12 bg-(--accent)" />
          </div>
        </aside>

        {/* Center: 3D Orbit */}
        <div className="relative aspect-square w-full flex items-center justify-center order-1 lg:order-2 py-20 lg:py-0">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Sun / Core */}
            <div className="relative z-10 h-24 w-24 rounded-full" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-3xl animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-white shadow-[0_0_60px_rgba(56,189,248,0.6)]" />
                <div className="absolute inset-0 rounded-full border border-white/40" />
            </div>

            {/* Orbit Rings */}
            <div className="absolute h-[76vw] w-[76vw] lg:h-[40vw] lg:w-[40vw] border border-white/5 rounded-full" style={{ transform: "rotateX(90deg)" }} />

            {/* Nodes */}
            {orbitNodes.map((node, i) => (
              <OrbitingNode
                key={node.id}
                node={node}
                index={i}
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            ))}
          </motion.div>
        </div>

        {/* Right Column: Metrics */}
        <aside className="space-y-10 order-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--text-muted) flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            Key Metrics
          </div>
          <div className="space-y-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-sm bg-white/5 border border-white/10 text-white group-hover:border-(--accent) group-hover:bg-(--accent)/10 transition-all">
                    <MetricGlyph type={metric.glyph} />
                  </div>
                  <div>
                    <div className="font-syne text-2xl font-black text-white leading-none">{metric.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-(--text-muted) mt-1">{metric.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Footer Details */}
      <section className="relative z-10 w-full max-w-7xl mt-20 pt-10 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex gap-10 items-start">
           <div className="p-8 border border-white/10 bg-white/[0.02] flex-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--text-muted) mb-6">Current Orbit</div>
              <div className="font-syne text-4xl font-black text-white mb-4">Integration</div>
              <p className="text-sm text-(--text-muted) leading-relaxed">
                Technical operations profile emphasizing stability, clear technical translation, and automated follow-through.
              </p>
              <div className="mt-8 text-(--accent) font-mono text-[10px] uppercase tracking-widest">{futurePaths[futureIndex]}</div>
              <button
                onClick={() => setFutureIndex(f => (f + 1) % futurePaths.length)}
                className="mt-6 flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-white hover:text-(--accent) transition-colors"
              >
                Change Viewport <ArrowRight className="h-3 w-3" />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextPaths.map(path => (
              <button
                key={path.view}
                onClick={() => setView(path.view)}
                className="group p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-left flex flex-col justify-between aspect-square md:aspect-auto md:h-40"
              >
                <div className="flex justify-between items-start">
                   <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-(--accent)">{path.label}</span>
                   <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-(--accent) group-hover:translate-x-1 transition-all" />
                </div>
                <div className="font-syne text-xl font-black text-white leading-tight">{path.question}</div>
              </button>
            ))}
        </div>
      </section>
    </motion.div>
  );
}
