"use client";

import { BarChart3, Briefcase, Home as HomeIcon, Layers, Mail, Newspaper, User, Zap } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const sectionColors: Record<ViewKey, string> = {
  hero: "#0EA5E9",
  about: "#A855F7",
  blog: "#F59E0B",
  projects: "#10B981",
  experience: "#6366F1",
  skills: "#06B6D4",
  stack: "#06B6D4",
  vision: "#A855F7",
  stats: "#EC4899",
  contact: "#D946EF",
};

const desktopRailItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: HomeIcon, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Blog", icon: Newspaper, view: "blog" },
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
        className="h-2 w-2 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: aiReady && !aiPaused ? (aiFallback ? activeColor : activeColor) : aiEnabled ? "#F97316" : "#B8C5D8",
          boxShadow: aiReady && !aiPaused && !aiFallback ? `0 0 8px ${activeColor}` : "none",
        }}
        title={aiPaused ? "Guide paused" : aiFallback ? "Guide fallback" : !aiEnabled ? "Guide opt-in" : aiReady ? "Guide ready" : "Guide loading"}
      />
      <div className="my-2 h-px w-full bg-(--border)" />
      <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Portfolio navigation">
        {desktopRailItems.map((item) => {
          const color = sectionColors[item.view];
          const isActive = activeView === item.view;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={`flex h-11 w-11 items-center justify-center rounded-sm border transition-all duration-200 ${
                isActive
                  ? "text-(--bg)"
                  : "border-transparent hover:border-[var(--section-hover)] hover:bg-[var(--section-hover)]/10"
              }`}
              style={{
                backgroundColor: isActive ? color : "transparent",
                borderColor: isActive ? color : "transparent",
                ["--section-hover" as string]: `${color}66`,
              }}
              aria-label={item.name}
              title={item.name}
            >
              <item.icon
                className="transition-all duration-200"
                style={{
                  width: isActive ? "22px" : "20px",
                  height: isActive ? "22px" : "20px",
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
