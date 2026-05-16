"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import MobileCommandSheet from "@/components/MobileCommandSheet";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import PortfolioViewRenderer from "@/components/PortfolioViewRenderer";
import { useBootGate } from "@/hooks/useBootGate";
import { useCommandRouter } from "@/hooks/useCommandRouter";
import { usePortfolioWorker } from "@/hooks/usePortfolioWorker";
import type { ViewKey } from "@/lib/types";

export default function Home() {
  const [dynamicContext, setDynamicContext] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isBooting, enterPortfolio } = useBootGate();
  const { activeView, conversationState, setActiveView, handleCommand } = useCommandRouter();
  const worker = usePortfolioWorker({
    onSynthesis: (context) => {
      setDynamicContext(context);
      setActiveView("lab");
    },
  });

  const navigate = (view: ViewKey, name?: string) => {
    setActiveView(view);
    setSidebarOpen(false);
    worker.addSystemMessage(`CMD: LOAD_${(name || view).toUpperCase()}`);
  };

  const send = (input: string) => {
    const result = handleCommand(input);
    if (result.navigated && result.view) {
      worker.addNavigationMessage(input, result.view);
    } else {
      worker.sendMessage(input, activeView, conversationState);
    }
    setSidebarOpen(false);
  };

  return (
    <main suppressHydrationWarning className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      <AnimatePresence>{isBooting && <BootScreen progress={worker.progress} isReady={worker.isReady} onEnter={enterPortfolio} />}</AnimatePresence>
      <div className="fixed inset-0 pointer-events-none opacity-[0.18]" style={{ backgroundImage: "radial-gradient(rgba(238,246,248,0.42) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <aside className="hidden md:flex w-[380px] min-w-[380px] h-full bg-(--surface)/80 border-r border-(--border) flex-col relative z-20 backdrop-blur-3xl">
        <PortfolioSidebar {...worker} activeView={activeView} onNavigate={navigate} onSend={send} />
      </aside>
      <section className="flex-1 h-full overflow-y-auto overflow-x-hidden px-5 py-6 md:px-12 md:py-16 xl:px-16 relative custom-scrollbar scroll-smooth">
        <div className="content-stage w-full max-w-[1360px] mx-auto">
          <AnimatePresence mode="wait">
            <PortfolioViewRenderer activeView={activeView} dynamicContext={dynamicContext} setView={setActiveView} />
          </AnimatePresence>
        </div>
      </section>
      <MobileCommandSheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <PortfolioSidebar {...worker} activeView={activeView} variant="mobile" onNavigate={navigate} onSend={send} />
      </MobileCommandSheet>
    </main>
  );
}
