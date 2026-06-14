"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const VERCE_PATTERNS = ["Vercel Web Analytics", "Vercel Speed Insights", "/_vercel/insights/", "/_vercel/speed-insights/"];

export function VercelInsightsWrapper() {
  const restoredRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const origError = console.error;
    const origWarn = console.warn;

    const filter = (args: unknown[]) => {
      const msg = args.map(String).join(" ");
      return !VERCE_PATTERNS.some((p) => msg.includes(p));
    };

    console.error = (...args) => {
      if (filter(args)) origError.apply(console, args);
    };
    console.warn = (...args) => {
      if (filter(args)) origWarn.apply(console, args);
    };

    restoredRef.current = () => {
      console.error = origError;
      console.warn = origWarn;
    };

    return () => {
      restoredRef.current?.();
    };
  }, []);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
