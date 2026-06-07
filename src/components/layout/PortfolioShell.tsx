"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Briefcase, ChevronRight, Home as HomeIcon, Layers, Mail, PanelLeftClose, PanelLeftOpen, User, Zap } from "lucide-react";
import BootScreen from "@/components/BootScreen";
import MobileCommandSheet from "@/components/MobileCommandSheet";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

const desktopRailItems: Array<{ name: string; icon: typeof User; view: ViewKey }> = [
  { name: "Home", icon: HomeIcon, view: "hero" },
  { name: "About", icon: User, view: "about" },
  { name: "Projects", icon: Briefcase, view: "projects" },
  { name: "Experience", icon: Layers, view: "experience" },
  { name: "Skills", icon: Zap, view: "skills" },
  { name: "Stats", icon: BarChart3, view: "stats" },
  { name: "Contact", icon: Mail, view: "contact" },
];

export default function PortfolioShell({ initialView = "hero" }: { initialView?: ViewKey }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const contentScrollRef = useRef<HTMLElement>(null);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter(initialView);
  const worker = usePortfolioWorker({
    onNavigate: (view: ViewKey) => {
      const item = desktopRailItems.find(i => i.view === view);
      navigate(view, item?.name);
    }
  });

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setSidebarOpen(false);
    worker.addSystemMessage(`Opened ${name || view}`);
    // Update URL without refresh to support direct linking while keeping SPA state
    if (typeof window !== "undefined") {
      const path = view === "hero" ? "/" : `/${view}`;
      window.history.pushState({ view }, "", path);
    }
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
      // URL update for command-based navigation
      if (typeof window !== "undefined") {
        const path = result.view === "hero" ? "/" : `/${result.view}`;
        window.history.pushState({ view: result.view }, "", path);
      }
    } else {
      worker.sendMessage(input, activeView, conversationState);
    }
    setSidebarOpen(false);
  };

  const handleHeroAiQuery = (input: string) => {
    if (!worker.localAiEnabled) {
      worker.enableLocalAi();
    }
    setTimeout(() => {
      worker.sendMessage(input, "hero", conversationState);
    }, 200);
    setSidebarOpen(true);
  };

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      <AnimatePresence>
        {isBooting && (
          <BootScreen
            progress={worker.progress}
            isReady={worker.isReady}
            localAiEnabled={worker.localAiEnabled}
            localAiFallback={worker.localAiFallback}
            localAiPaused={worker.localAiPaused}
            onEnter={enterPortfolio}
          />
        )}
      </AnimatePresence>
      <div className="fixed inset-0 pointer-events-none opacity-[0.18]" style={{ backgroundImage: "radial-gradient(rgba(238,246,248,0.42) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <motion.aside
        animate={{ width: desktopSidebarCollapsed ? 76 : 380 }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="hidden md:flex h-full min-w-[76px] flex-col relative z-20 backdrop-blur-3xl hud-container"
      >
        <button
          type="button"
          onClick={() => setDesktopSidebarCollapsed((collapsed) => !collapsed)}
          className="absolute -right-4 top-6 z-30 flex h-8 w-8 items-center justify-center rounded-sm border border-(--border) bg-(--surface) text-(--text-muted) shadow-xl transition-colors hover:border-(--accent) hover:text-(--accent)"
          aria-label={desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={desktopSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {desktopSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>

        {desktopSidebarCollapsed ? (
          <div className="flex h-full flex-col items-center gap-4 px-3 py-6">
            <button
              type="button"
              onClick={() => navigate("hero", "Home")}
              className="shine-surface flex h-11 w-11 items-center justify-center rounded-sm border border-(--border) bg-(--text) text-(--bg) font-syne text-sm font-black"
              aria-label="Go to home"
              title="Home"
            >
              H
            </button>
            <div
              className={`h-2 w-2 rounded-full ${worker.isReady && !worker.localAiPaused ? (worker.localAiFallback ? "bg-(--accent)" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]") : worker.localAiEnabled ? "bg-orange-500" : "bg-(--text-muted)"}`}
              title={worker.localAiPaused ? "Guide paused" : worker.localAiFallback ? "Guide fallback" : !worker.localAiEnabled ? "Guide opt-in" : worker.isReady ? "Guide ready" : "Guide loading"}
            />
            <div className="my-2 h-px w-full bg-(--border)" />
            <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Collapsed portfolio navigation">
              {desktopRailItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(item.view, item.name)}
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
            <button
              type="button"
              onClick={() => setDesktopSidebarCollapsed(false)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-(--border) text-(--text-muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
              aria-label="Open full chat sidebar"
              title="Open full chat sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <PortfolioSidebar {...worker} activeView={activeView} onNavigate={navigate} onSend={send} />
        )}
      </motion.aside>
      <section
        ref={contentScrollRef}
        data-testid="content-scroll"
        className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:px-12 md:py-16 xl:px-16 relative custom-scrollbar"
      >
        <div className="content-stage w-full max-w-[1360px] mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} setView={setActiveView} onAiQuery={handleHeroAiQuery} />
          </AnimatePresence>
        </div>
      </section>
      <MobileCommandSheet open={sidebarOpen} onOpenChange={setSidebarOpen} activeView={activeView}>
        <PortfolioSidebar {...worker} activeView={activeView} variant="mobile" onNavigate={navigate} onSend={send} />
      </MobileCommandSheet>
    </main>
  );
}
