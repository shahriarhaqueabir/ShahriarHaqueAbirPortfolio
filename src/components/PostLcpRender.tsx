"use client";

import { type ReactNode, useEffect, useState } from "react";

/**
 * Defers rendering children until after the LCP paint cycle.
 *
 * Uses a double requestAnimationFrame — the first waits for the next
 * paint (which includes the LCP image), the second ensures the browser
 * has actually committed the frame. This keeps heavy library init
 * (tsparticles, three.js, etc.) off the main thread during the
 * critical rendering path.
 */
export function PostLcpRender({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const defer = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setReady(true);
        });
      });
    };

    // Use requestIdleCallback when available, fall back to rAF
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(defer, { timeout: 500 });
    } else {
      defer();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
