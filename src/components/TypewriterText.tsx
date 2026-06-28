"use client";

import { useState } from "react";

export default function TypewriterText({ text }: { text: string }) {
  const [isAnimating, setIsAnimating] = useState(true);

  if (!text) return null;

  return (
    <span className="relative whitespace-pre-wrap">
      <span
        className="inline-block"
        style={{
          clipPath: `inset(0 100% 0 0)`,
          animation: `typewriter-reveal ${text.length * 16}ms steps(${text.length}, end) forwards`,
        }}
        onAnimationEnd={() => setIsAnimating(false)}
      >
        {text}
      </span>
      {isAnimating && (
        <span className="ml-0.5 inline-block h-4 w-1 translate-y-0.5 animate-pulse bg-(--accent)" />
      )}
    </span>
  );
}
