"use client";

import { BarChart3, Briefcase, Home as HomeIcon, Layers, Mail, User, Zap } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const sectionColors: Record<ViewKey, string> = {
  hero: "#0EA5E9",
  about: "#A855F7",
  projects: "#10B981",
  experience: "#6366F1",
  skills: "#06B6D4",
  stats: "#EC4899",
  contact: "#D946EF",
};

const desktopRailItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: HomeIcon, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
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
  const activeColor = sectionColors[activeView] || "var(--accent)";

  return (
    <aside className="hidden md:flex h-full w-[68px] min-w-[68px] flex-col items-center gap-3 px-2 py-4 relative z-20 backdrop-blur-3xl hud-container border-r border-(--border)">
      <button
        type="button"
        onClick={() => onNavigate("hero")}
        aria-label="Go to Home"
        title="Home"
        className="shine-surface flex h-10 w-10 items-center justify-center rounded-sm border border-(--border) bg-(--text) text-(--bg) font-syne text-xs font-black"
      >
        H
      </button>
      <div
        className="h-2 w-2 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: aiReady && !aiPaused ? (aiFallback ? activeColor : activeColor) : aiEnabled ? "#F97316" : "#B8C5D8",
          boxShadow: aiReady && !aiPaused && !aiFallback ? `0 0 8px ${activeColor}` : "none",
        }}
        title={aiPaused ? "Guide paused" : aiFallback ? "Guide fallback" : !aiEnabled ? "Guide opt-in" : aiReady ? "Guide ready" : "Guide loading"}
      />
      <div className="my-1.5 h-px w-full bg-(--border)" />
      <nav className="flex flex-1 flex-col items-center gap-1.5" aria-label="Portfolio navigation">
        {desktopRailItems.map((item) => {
          const color = sectionColors[item.view];
          const isActive = activeView === item.view;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onNavigate(item.view)}
              aria-label={`Navigate to ${item.name}`}
              title={item.name}
              className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-all duration-200 ${
                isActive ? "text-(--bg)" : "border-transparent hover:border-[var(--section-hover)] hover:bg-[var(--section-hover)]/10"
              }`}
              style={{
                backgroundColor: isActive ? color : "transparent",
                borderColor: isActive ? color : "transparent",
                ["--section-hover" as string]: `${color}66`,
              }}
            >
              <item.icon
                className="transition-all duration-200"
                style={{
                  width: isActive ? "20px" : "18px",
                  height: isActive ? "20px" : "18px",
                  color: isActive ? "var(--bg)" : "var(--text-muted)",
                }}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
