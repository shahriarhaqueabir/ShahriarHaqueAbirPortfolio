"use client";

import dynamic from "next/dynamic";
import type { ViewKey } from "@/lib/types";

const PortfolioShell = dynamic(() => import("@/components/layout/PortfolioShell"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-(--bg)">
      <div className="h-8 w-8 animate-pulse rounded-full border-2 border-(--accent) border-t-transparent" />
    </div>
  ),
});

export default function PortfolioShellLoader({ initialView = "hero" }: { initialView?: ViewKey }) {
  return <PortfolioShell initialView={initialView} />;
}
