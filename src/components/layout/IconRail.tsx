"use client";

import { BarChart3, Briefcase, Eye, Home as HomeIcon, Layers, Mail, Newspaper, User, Zap } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const desktopRailItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: HomeIcon, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Blog", icon: Newspaper, view: "blog" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
  { name: "Stack", icon: Layers, view: "stack" },
  { name: "Vision", icon: Eye, view: "vision" },
  { name: "Stats", icon: BarChart3, view: "stats" },
  { name: "Contact", icon: Mail, view: "contact" },
];

type IconRailProps = {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  aiReady: boolean;
  aiPaused: boolean;
  aiFallback: boolean;
  aiEnabled: boolean;
};

export default function IconRail({ activeView, onNavigate, aiReady, aiPaused, aiFallback, aiEnabled }: IconRailProps) {
  return (
    <aside className="hidden md:flex h-full w-[76px] min-w-[76px] flex-col items-center gap-4 px-3 py-6 relative z-20 backdrop-blur-3xl hud-container border-r border-(--border)">
      <button
        type="button"
        onClick={() => onNavigate("hero")}
        className="shine-surface flex h-11 w-11 items-center justify-center rounded-sm border border-(--border) bg-(--text) text-(--bg) font-syne text-sm font-black"
        aria-label="Go to home"
        title="Home"
      >
        H
      </button>
      <div
        className={`h-2 w-2 rounded-full ${aiReady && !aiPaused ? (aiFallback ? "bg-(--accent)" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]") : aiEnabled ? "bg-orange-500" : "bg-(--text-muted)"}`}
        title={aiPaused ? "Guide paused" : aiFallback ? "Guide fallback" : !aiEnabled ? "Guide opt-in" : aiReady ? "Guide ready" : "Guide loading"}
      />
      <div className="my-2 h-px w-full bg-(--border)" />
      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Portfolio navigation">
        {desktopRailItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-colors ${
              activeView === item.view ? "border-(--accent) bg-(--accent) text-(--bg)" : "border-transparent text-(--text-muted) hover:border-(--border) hover:text-(--text)"
            }`}
            aria-label={item.name}
            title={item.name}
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
      </nav>
    </aside>
  );
}
