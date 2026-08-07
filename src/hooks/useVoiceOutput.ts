"use client";

import { useCallback, useRef, useState } from "react";

export type VoiceOutputState = {
  /** Whether audio is currently playing */
  isSpeaking: boolean;
  /** Whether speech output is supported */
  isSupported: boolean;
  /** Speak the given text */
  speak: (text: string) => Promise<void>;
  /** Stop current playback */
  stopSpeaking: () => void;
};

/**
 * Client-side TTS hook.
 *
 * Uses the browser's built-in SpeechSynthesis API (free, no API key).
 * For higher-quality voice, it first attempts the ElevenLabs API proxy;
 * if that fails (quota, network, etc.), it falls back to SpeechSynthesis.
 */
function isSpeechSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof Audio !== "undefined" || typeof speechSynthesis !== "undefined";
}

export function useVoiceOutput(): VoiceOutputState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(isSpeechSupported());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cacheRef = useRef<Map<string, ArrayBuffer>>(new Map());

  const stopSpeaking = useCallback(() => {
    // Stop ElevenLabs audio playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Stop SpeechSynthesis
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  const speakViaElevenLabs = useCallback(
    async (text: string, cacheKey: string): Promise<boolean> => {
      try {
        let audioData = cacheRef.current.get(cacheKey);

        if (!audioData) {
          const response = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });

          if (!response.ok) {
            if (process.env.NODE_ENV === "development") {
              const body = await response.json().catch(() => ({ error: "unknown" }));
              console.debug("TTS API unavailable (", response.status, "):", body);
            }
            return false;
          }

          audioData = await response.arrayBuffer();
          cacheRef.current.set(cacheKey, audioData);
        }

        const blob = new Blob([audioData], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        return await new Promise<boolean>((resolve) => {
          audio.onended = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            audioRef.current = null;
            resolve(true);
          };

          audio.onerror = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            audioRef.current = null;
            resolve(false);
          };

          audioRef.current = audio;
          setIsSpeaking(true);

          audio.play().catch(() => {
            // Autoplay blocked by browser policy
            stopSpeaking();
            resolve(false);
          });
        });
      } catch {
        return false;
      }
    },
    [stopSpeaking],
  );

  const speakViaSpeechSynthesis = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof speechSynthesis === "undefined") {
        resolve();
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      // Try to pick a decent English voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) || voices.find((v) => v.lang.startsWith("en")) || null;
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
        resolve();
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    });
  }, []);

  const speak = useCallback(
    async (rawText: string) => {
      if (!rawText.trim() || !isSupported) return;

      // Strip emojis and other non-speech characters before TTS
      // Browser SpeechSynthesis reads emoji Unicode descriptions, which is distracting
      const text = rawText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, "").trim();

      if (!text) return;

      // Stop any current playback
      stopSpeaking();

      const cacheKey = text.slice(0, 200);

      // Try ElevenLabs first (higher quality), fall back to SpeechSynthesis
      const elevenLabsOk = await speakViaElevenLabs(text, cacheKey);
      if (elevenLabsOk) return;

      // Fall back to browser SpeechSynthesis
      await speakViaSpeechSynthesis(text);
    },
    [isSupported, stopSpeaking, speakViaElevenLabs, speakViaSpeechSynthesis],
  );

  return { isSpeaking, isSupported, speak, stopSpeaking };
}
