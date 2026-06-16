"use client";

import { Home, User, Briefcase, Layers, Zap, BarChart3, Mail } from "lucide-react";
import type { ViewKey } from "@/lib/types";

const items: Array<{ icon: typeof Home; view: ViewKey; label: string }> = [
  { icon: Home, view: "hero", label: "Home" },
  { icon: User, view: "about", label: "About" },
  { icon: Briefcase, view: "projects", label: "Projects" },
  { icon: Layers, view: "experience", label: "Exp" },
  { icon: Zap, view: "skills", label: "Skills" },
  { icon: BarChart3, view: "stats", label: "Stats" },
  { icon: Mail, view: "contact", label: "Contact" },
];

type MobileNavProps = {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
};

export default function MobileNav({ activeView, onNavigate }: MobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-(--border) bg-(--surface)/95 backdrop-blur-3xl px-1 py-2 pb-safe md:hidden"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`flex flex-col items-center gap-0.5 rounded-sm px-2 py-1 transition-colors min-w-0 ${isActive ? "text-(--accent)" : "text-(--text-muted) hover:text-(--text)"}`}
            aria-label={item.label}
            style={isActive ? { color: "var(--accent)" } : undefined}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-[7px] font-mono uppercase tracking-wider leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
