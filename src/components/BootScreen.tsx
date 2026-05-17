"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type BootScreenProps = {
  progress: number;
  isReady: boolean;
  localAiPaused?: boolean;
  onEnter: () => void;
};

const lines = [
  { id: "system", label: "DESIGN STATUS", status: "OK" },
  { id: "record", label: "CORE OPTIMIZATION", status: "OK" },
  { id: "synthesis", label: "BACKEND PROTOCOLS", status: "OK" },
  { id: "ai", label: "AI GUIDE (LLAMA 3.2 1B)", status: null },
];

const FINAL_REVEAL_STEP = lines.length * 2;

export default function BootScreen({ progress, isReady, localAiPaused = false, onEnter }: BootScreenProps) {
  const hasEnteredRef = useRef(false);
  const [revealStep, setRevealStep] = useState(0);
  const [aiDisplayProgress, setAiDisplayProgress] = useState(0);
  const targetProgress = isReady ? 100 : Math.max(0, Math.min(100, Math.round(progress)));
  const handleEnter = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    onEnter();
  }, [onEnter]);

  useEffect(() => {
    if (revealStep >= FINAL_REVEAL_STEP) return;

    const timeout = window.setTimeout(
      () => setRevealStep((currentStep) => Math.min(currentStep + 1, FINAL_REVEAL_STEP)),
      revealStep === 0 ? 350 : revealStep % 2 === 1 ? 420 : 280,
    );

    return () => window.clearTimeout(timeout);
  }, [revealStep]);

  useEffect(() => {
    if (revealStep < FINAL_REVEAL_STEP || aiDisplayProgress >= targetProgress) return;

    const timeout = window.setTimeout(
      () => setAiDisplayProgress((currentProgress) => Math.min(currentProgress + 1, targetProgress)),
      isReady ? 18 : 45,
    );

    return () => window.clearTimeout(timeout);
  }, [aiDisplayProgress, isReady, revealStep, targetProgress]);

  useEffect(() => {
    if (!isReady || revealStep < FINAL_REVEAL_STEP || aiDisplayProgress < 100) return;

    const timeout = window.setTimeout(handleEnter, 700);
    return () => window.clearTimeout(timeout);
  }, [aiDisplayProgress, handleEnter, isReady, revealStep]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="pointer-events-none fixed inset-0 z-[100] bg-(--bg) flex items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      <div className="pointer-events-auto relative w-full max-w-xl px-6 py-10">
        <div className="mb-12">
          <div>
            <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.28em] mb-3">
              Portfolio System
            </div>
            <h1 className="text-2xl md:text-4xl font-syne font-black uppercase tracking-[0.08em] text-(--text)">
              Hawkward Portfolio
            </h1>
          </div>
        </div>

        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.12em] text-(--text-muted) border border-(--border) bg-white/50">
          <div className="px-5 py-4 border-b border-(--border) text-(--text)">
            HAWKWARD PORTFOLIO — INITIALISING
          </div>

          <div className="p-5 space-y-4">
            {lines.map((line, index) => {
              const labelStep = index * 2 + 1;
              const statusStep = labelStep + 1;
              const labelVisible = revealStep >= labelStep;
              const statusVisible = revealStep >= statusStep;

              return (
                <div key={line.id} className="grid min-h-4 grid-cols-[auto_1fr_auto] items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={labelVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {String(index + 1).padStart(2, "0")} /
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={labelVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="truncate"
                  >
                    {line.label}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={statusVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={line.status === "OK" || aiDisplayProgress === 100 ? "text-(--accent)" : "text-(--text-muted)"}
                  >
                    {line.status ?? (localAiPaused ? "PAUSED" : `${aiDisplayProgress}%`)}
                  </motion.span>
                </div>
              );
            })}

            <div className="pt-2">
              <div className="h-px bg-(--border) relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-(--accent)"
                  initial={{ width: 0 }}
                  animate={{ width: `${aiDisplayProgress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <div className="px-5 py-4 border-t border-(--border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-[9px] tracking-[0.18em]">
              AI {localAiPaused ? "PAUSED" : isReady ? "ONLINE" : "CALIBRATING"} / BROWSING AVAILABLE
            </span>
            <button
              type="button"
              onClick={handleEnter}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleEnter();
                }
              }}
              data-testid="enter-portfolio"
              className="self-start sm:self-auto px-4 py-2 bg-(--text) text-(--bg) text-[10px] uppercase tracking-[0.16em] hover:bg-(--accent) transition-colors"
            >
              Enter Portfolio →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
