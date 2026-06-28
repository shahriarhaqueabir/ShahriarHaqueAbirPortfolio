"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceInputState = {
  /** Final transcript from the last completed recognition */
  transcript: string;
  /** Whether the mic is actively listening */
  isListening: boolean;
  /** Whether the browser supports SpeechRecognition */
  isSupported: boolean;
  /** Non-null when an error occurred */
  error: string | null;
  /** Interim (partial) transcript shown while user is speaking */
  interimTranscript: string;
  /** Start listening (triggers browser mic permission) */
  startListening: () => void;
  /** Stop listening early */
  stopListening: () => void;
};

export function useVoiceInput(): VoiceInputState {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isManualStopRef = useRef(false);
  const accumulatedRef = useRef("");
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartCountRef = useRef(0);
  const MAX_RESTART_ATTEMPTS = 8;

  // Defer browser API check to prevent hydration mismatch
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(!!SpeechRecognitionAPI);
  }, []);

  const SpeechRecognitionAPI = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

  /** Clean up recognition instance and any pending restart timer. */
  const cleanupRecognition = useCallback(() => {
    if (restartTimerRef.current !== null) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
      recognitionRef.current = null;
    }
  }, []);

  const stopListening = useCallback(() => {
    isManualStopRef.current = true;
    cleanupRecognition();
    setIsListening(false);
    setTranscript(accumulatedRef.current.trim());
    setInterimTranscript("");
    restartCountRef.current = 0;
  }, [cleanupRecognition]);

  const buildRecognition = useCallback(() => {
    if (isManualStopRef.current) return;
    if (!SpeechRecognitionAPI) return;

    // Prevent infinite restart loops on aggressive browsers (Brave, etc.)
    if (restartCountRef.current >= MAX_RESTART_ATTEMPTS) {
      console.warn(`Speech recognition restart limit reached (${MAX_RESTART_ATTEMPTS})`);
      setError("Microphone keeps disconnecting. Try clicking the mic again.");
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      if (finalTranscript) {
        accumulatedRef.current += (accumulatedRef.current ? " " : "") + finalTranscript;
        setTranscript(accumulatedRef.current);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Check browser permissions.");
        isManualStopRef.current = true;
        setIsListening(false);
      } else if (event.error === "no-speech") {
        setInterimTranscript("...");
      } else if (event.error === "aborted") {
        // User called stopListening, ignore
      } else {
        setError(`Voice input error: ${event.error}`);
        isManualStopRef.current = true;
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (!isManualStopRef.current) {
        // Brave/Chrome fire onend aggressively. A delay prevents rate limiting
        // and lets the browser settle before creating a new recognition instance.
        restartCountRef.current += 1;
        restartTimerRef.current = setTimeout(() => {
          restartTimerRef.current = null;
          // eslint-disable-next-line react-hooks/immutability
          buildRecognition();
        }, 400);
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
      setError(null); // Clear previous errors on successful start
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to start speech recognition";
      if (process.env.NODE_ENV === "development") console.debug("SpeechRecognition start() failed:", msg);
      setError(msg);
      setIsListening(false);
    }
  }, [SpeechRecognitionAPI]);

  const startListening = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    // Clean up any existing session and pending restart timer
    cleanupRecognition();

    isManualStopRef.current = false;
    restartCountRef.current = 0;
    setError(null);
    setTranscript("");
    accumulatedRef.current = "";
    setInterimTranscript("");

    buildRecognition();
  }, [SpeechRecognitionAPI, buildRecognition, cleanupRecognition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isManualStopRef.current = true;
      cleanupRecognition();
    };
  }, [cleanupRecognition]);

  return {
    transcript,
    isListening,
    isSupported,
    error,
    interimTranscript,
    startListening,
    stopListening,
  };
}
