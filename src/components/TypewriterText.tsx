"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Reveal pacing — ~22 words/sec base, slightly slower per longer word,
// with an extra beat after sentence-ending punctuation so it reads naturally.
const BASE_DELAY_MS = 45;
const MAX_CHARS_PER_SECOND = 90;
const PAUSE_AFTER_PUNCTUATION_MS = 140;

const SENTENCE_END = /[.!?…]["')]*$/;

export default function TypewriterText({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();

  // Split on whitespace, keeping separators so newlines/spacing are preserved.
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  const words = useMemo(() => tokens.filter((token) => token.trim().length > 0), [tokens]);
  // Map each token to the index of the visible "word" it belongs to (-1 = whitespace).
  const tokenVisibility = useMemo(() => {
    let wordIndex = 0;
    return tokens.map((token) => (token.trim().length > 0 ? wordIndex++ : -1));
  }, [tokens]);

  const totalWords = words.length;

  const [visibleCount, setVisibleCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion || totalWords === 0) {
      setVisibleCount(totalWords);
      setIsAnimating(false);
      return;
    }

    setVisibleCount(0);
    setIsAnimating(true);

    let cancelled = false;
    let timeout = 0;

    const schedule = (index: number) => {
      if (cancelled) return;
      const nextWord = words[index] ?? "";
      const charPace = Math.min(nextWord.length / MAX_CHARS_PER_SECOND, 0.3);
      const pause = SENTENCE_END.test(nextWord) ? PAUSE_AFTER_PUNCTUATION_MS : 0;
      const delay = BASE_DELAY_MS + charPace * 1000 + pause;

      timeout = window.setTimeout(() => {
        if (cancelled) return;
        const next = index + 1;
        setVisibleCount(next);
        if (next >= totalWords) {
          setIsAnimating(false);
        } else {
          schedule(next);
        }
      }, delay);
    };

    schedule(0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [words, totalWords, prefersReducedMotion]);

  if (!text) return null;

  return (
    <span className="relative whitespace-pre-wrap wrap-break-word">
      {tokens.map((token, i) => {
        const visible = tokenVisibility[i] < 0 || tokenVisibility[i] < visibleCount;
        return (
          <span key={i} style={{ opacity: visible ? 1 : 0 }}>
            {token}
          </span>
        );
      })}
      {isAnimating && (
        <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-1 translate-y-0.5 animate-pulse bg-(--accent)" />
      )}
    </span>
  );
}
