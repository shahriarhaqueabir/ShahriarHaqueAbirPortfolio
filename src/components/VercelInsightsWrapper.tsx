"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Wraps Vercel Analytics and Speed Insights in a single client component.
 *
 * Both libraries emit debug messages in development via console.log.
 * These appear only in dev mode and are stripped from production builds.
 * No console patching is used — see ADR-0001 for the rationale.
 */
export function VercelInsightsWrapper() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
