"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceOutputState = {
  /** Whether audio is currently playing */
  isSpeaking: boolean;
  /** Whether Audio playback is supported */
  isSupported: boolean;
  /** Speak the given text via ElevenLabs TTS */
  speak: (text: string) => Promise<void>;
  /** Stop current playback */
  stopSpeaking: () => void;
};

/**
 * Client-side TTS hook.
 *
 * Fetches audio from our `/api/tts` proxy (which wraps ElevenLabs),
 * plays it via a hidden `<Audio>` element, and caches the response
 * in memory keyed by the first 200 characters of text.
 */
export function useVoiceOutput(): VoiceOutputState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<Map<string, ArrayBuffer>>(new Map());

  // Defer browser API check to prevent hydration mismatch
  useEffect(() => {
    const supported = typeof Audio !== "undefined" && typeof Blob !== "undefined";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(supported);

    // Pre-fetch welcome message audio on idle so first speaker click is instant
    if (supported) {
      const prefetchWelcome = () => {
        const welcomeText = "Welcome to Shahriar's Portfolio. I am the local AI tour guide.";
        const cacheKey = welcomeText.slice(0, 200);
        if (!cacheRef.current.has(cacheKey)) {
          fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: welcomeText }),
          })
            .then((res) => (res.ok ? res.arrayBuffer() : null))
            .then((data) => {
              if (data) cacheRef.current.set(cacheKey, data);
            })
            .catch(() => {
              /* silent — pre-fetch is best-effort */
            });
        }
      };

      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => prefetchWelcome(), { timeout: 3000 });
      } else {
        setTimeout(prefetchWelcome, 2000);
      }
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim() || !isSupported) return;

      // Stop any current playback first
      stopSpeaking();

      // Simple in-memory cache keyed by first 200 chars
      const cacheKey = text.slice(0, 200);
      let audioData = cacheRef.current.get(cacheKey);

      if (!audioData) {
        try {
          const response = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });

          if (!response.ok) {
            if (process.env.NODE_ENV === "development") console.debug("TTS fetch failed:", response.status);
            return;
          }

          audioData = await response.arrayBuffer();
          cacheRef.current.set(cacheKey, audioData);
        } catch (err) {
          if (process.env.NODE_ENV === "development") console.debug("TTS playback error:", err);
          return;
        }
      }

      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        if (process.env.NODE_ENV === "development") console.debug("Audio playback element error");
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audioRef.current = audio;
      setIsSpeaking(true);

      try {
        await audio.play();
      } catch {
        // Autoplay may be blocked by browser policy
        stopSpeaking();
      }
    },
    [isSupported, stopSpeaking],
  );

  return { isSpeaking, isSupported, speak, stopSpeaking };
}
