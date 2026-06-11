"use client";

import { ArrowRight } from "lucide-react";
import { VIEW_GOALS } from "@/lib/experience-model";
import type { ViewKey } from "@/lib/types";

type GuidedNextProps = {
  currentView: ViewKey;
  onNavigate: (view: ViewKey) => void;
};

function formatViewLabel(view: ViewKey) {
  return view.charAt(0).toUpperCase() + view.slice(1);
}

export default function GuidedNext({ currentView, onNavigate }: GuidedNextProps) {
  const currentGoal = VIEW_GOALS[currentView];

  return (
    <section className="mt-10 border-t border-(--border) pt-6">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.22em] text-(--accent)">Suggested Next Paths</div>
          <h4 className="font-syne text-lg font-black leading-tight text-(--text) md:text-xl">{currentGoal.coreQuestion}</h4>
        </div>
        <p className="max-w-md text-[11px] leading-relaxed text-(--text-muted) md:text-xs">{currentGoal.intentDescription}</p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {currentGoal.nextViews.map((view) => {
          const nextGoal = VIEW_GOALS[view];

          return (
            <button
              key={view}
              type="button"
              onClick={() => onNavigate(view)}
              className="group flex min-h-20 flex-col justify-between border border-(--border) bg-(--bg)/70 p-3 text-left transition-colors hover:border-(--accent) hover:bg-(--surface-2)"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-(--accent)">{formatViewLabel(view)}</span>
                <ArrowRight className="h-3.5 w-3.5 text-(--text-muted) transition-transform group-hover:translate-x-1 group-hover:text-(--accent)" />
              </div>
              <span className="mt-4 font-syne text-sm font-black leading-tight text-(--text)">{nextGoal.coreQuestion}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
