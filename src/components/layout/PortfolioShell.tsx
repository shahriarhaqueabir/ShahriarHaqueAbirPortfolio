"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import BootScreen from "@/components/BootScreen";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import IconRail from "@/components/layout/IconRail";
import AiGuideFooter from "@/components/AiGuideFooter";
import AiGuidePanel from "@/components/AiGuidePanel";
import MobileNav from "@/components/layout/MobileNav";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

export default function PortfolioShell({ initialView = "hero" }: { initialView?: ViewKey }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const contentScrollRef = useRef<HTMLElement>(null);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter(initialView);
  const worker = usePortfolioWorker({
    onNavigate: (view: ViewKey) => {
      navigate(view);
    },
  });

  const viewToPath = (v: ViewKey) => (v === "hero" ? "/" : `/${v}`);

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setPanelOpen(false);
    worker.addSystemMessage(`Opened ${name || view}`);
    if (typeof window !== "undefined") {
      window.history.pushState({ view }, "", viewToPath(view));
    }
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
      if (typeof window !== "undefined") {
        window.history.pushState({ view: result.view }, "", viewToPath(result.view));
      }
      setPanelOpen(false);
    } else {
      worker.sendMessage(input, activeView, conversationState);
      setPanelOpen(true);
    }
  };

  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      const state = e.state as { view?: ViewKey } | null;
      if (state?.view && state.view !== activeView) {
        setActiveView(state.view);
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [activeView, setActiveView]);

  const heroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (heroTimeoutRef.current) clearTimeout(heroTimeoutRef.current);
    };
  }, []);

  const handleHeroAiQuery = (input: string) => {
    if (!worker.localAiEnabled) {
      worker.enableLocalAi();
    }
    heroTimeoutRef.current = setTimeout(() => {
      worker.sendMessage(input, "hero", conversationState);
      heroTimeoutRef.current = null;
    }, 200);
    setPanelOpen(true);
  };

  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [activeView]);

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-sans text-(--text)">
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

      <IconRail
        activeView={activeView}
        onNavigate={(view) => navigate(view)}
        aiReady={worker.isReady}
        aiPaused={worker.localAiPaused}
        aiFallback={worker.localAiFallback}
        aiEnabled={worker.localAiEnabled}
      />

      <section ref={contentScrollRef} data-testid="content-scroll" className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:py-16 pb-[180px] md:pb-[300px] relative custom-scrollbar">
        <div className="content-stage w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} setView={setActiveView} onAiQuery={handleHeroAiQuery} scrollContainerRef={contentScrollRef} />
          </AnimatePresence>
        </div>
      </section>

      <MobileNav activeView={activeView} onNavigate={(view) => navigate(view)} />

      <AiGuideFooter
        messages={worker.messages}
        isReady={worker.isReady}
        localAiEnabled={worker.localAiEnabled}
        localAiFallback={worker.localAiFallback}
        localAiPaused={worker.localAiPaused}
        progress={worker.progress}
        showReadyToast={worker.showReadyToast}
        onSend={send}
        onFocus={() => setPanelOpen(true)}
      />

      <AiGuidePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        messages={worker.messages}
        activeView={activeView}
        localAiEnabled={worker.localAiEnabled}
        enableLocalAi={worker.enableLocalAi}
        onNavigate={(view) => navigate(view)}
        onSend={send}
      />

      {!panelOpen && !isBooting && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed bottom-6 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-(--accent)/45 bg-(--accent) text-(--bg) shadow-[0_18px_48px_rgba(var(--accent-rgb),0.36)] transition-transform active:scale-95 md:hidden"
          aria-label="Open AI guide"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-(--bg)/15">
            <MessageCircle className="h-4.5 w-4.5" />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-(--accent) bg-green-400 text-[7px] font-black tracking-tighter text-black shadow-sm">
              AI
            </span>
          </span>
        </button>
      )}
    </main>
  );
}
