"use client";

import { useEffect, useState } from "react";

export default function TypewriterText({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (!text) return;
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) window.clearInterval(interval);
    }, 16);
    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span>
      {visibleText}
      {visibleText.length < text.length && <span className="ml-0.5 inline-block h-4 w-1 translate-y-0.5 animate-pulse bg-(--accent)" />}
    </span>
  );
}
