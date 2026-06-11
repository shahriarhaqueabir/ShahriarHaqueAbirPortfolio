"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VIEW_GOALS } from "@/lib/experience-model";
import { buildFallbackAnswer, buildSystemPrompt, inferVisitorProfile, LOCAL_MODEL_LABEL } from "@/lib/fallback-engine";
import type { Message, ViewKey } from "@/lib/types";

const MAX_CHAT_MESSAGES = 10;
const MAX_UI_MESSAGES = 100;

type VisitorProfile = {
  name?: string;
  role?: string;
  industry?: string;
  interests?: string[];
  goal?: string;
  intent?: string;
};

type RouterMemory = {
  currentView: ViewKey;
  previousViews: ViewKey[];
  detectedInterests: string[];
  visitorType: string | null;
};

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function getLocalAiFallbackReason() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return null;

  const userAgent = navigator.userAgent || "";
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent);
  const isTouchSmallScreen = window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(max-width: 767px)").matches;

  if (!window.isSecureContext) return "WebGPU requires a secure browser context.";
  if (!("gpu" in navigator)) return "this browser does not expose WebGPU.";
  if (isMobileUserAgent || isTouchSmallScreen) return "this mobile browser may not support stable local model inference.";

  return null;
}

function getTypewriterDelay(text: string) {
  return Math.min(text.length * 16 + 700, 5000);
}

function formatViewName(view: ViewKey) {
  if (view === "hero") return "Home";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

type UsePortfolioWorkerOptions = {
  onSynthesis?: (context: string) => void;
  onNavigate?: (view: ViewKey) => void;
};

export function usePortfolioWorker({ onSynthesis, onNavigate }: UsePortfolioWorkerOptions = {}) {
  const [localAiFallback, setLocalAiFallback] = useState(false);
  const [localAiPaused] = useState(false);
  const [localAiEnabled, setLocalAiEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "ai-opt-in",
      text: `Local AI guide is off by default. Enable it when you want portfolio Q&A; ${LOCAL_MODEL_LABEL} downloads and caches only when WebGPU is available and after you opt in.`,
      sender: "sys",
    },
  ]);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showReadyToast, setShowReadyToast] = useState(false);
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile>({});

  const sharedWorkerRef = useRef<Worker | null>(null);
  const initialLoadDoneRef = useRef(false);
  const initialLoadRequestedRef = useRef(false);
  const onboardingQueuedRef = useRef(false);
  const initialLoadProgressRef = useRef(0);
  const messageIdCounterRef = useRef(0);
  const localAiFallbackReasonRef = useRef(getLocalAiFallbackReason());
  const queuedMessageRef = useRef<{ text: string; activeView: ViewKey; routerMemory?: RouterMemory } | null>(null);
  const visitorProfileRef = useRef<VisitorProfile>({});
  const onSynthesisRef = useRef(onSynthesis);
  const onNavigateRef = useRef(onNavigate);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    onSynthesisRef.current = onSynthesis;
  }, [onSynthesis]);

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    visitorProfileRef.current = visitorProfile;
  }, [visitorProfile]);

  const getNextId = () => `msg-${++messageIdCounterRef.current}`;

  const pruneMessages = (msgs: Message[]): Message[] => {
    if (msgs.length <= MAX_UI_MESSAGES) return msgs;
    return msgs.slice(-MAX_UI_MESSAGES);
  };

  const createUserMessage = (text: string): Message => ({
    id: getNextId(),
    text,
    sender: "user",
  });

  const createFallbackMessage = (text: string, suggestions?: string[]): Message => ({
    id: getNextId(),
    text,
    sender: "fallback",
    ...(suggestions && suggestions.length > 0 ? { suggestions } : {}),
  });

  const createAiMessage = (text: string, isTyping = false): Message => ({
    id: getNextId(),
    text,
    sender: "ai",
    ...(isTyping ? { isTyping: true as const } : {}),
  });

  const createSysMessage = (text: string): Message => ({
    id: getNextId(),
    text,
    sender: "sys",
  });

  const enableLocalAi = useCallback(() => {
    setLocalAiEnabled(true);

    const fallbackReason = localAiFallbackReasonRef.current;

    if (fallbackReason) {
      setLocalAiFallback(true);
      setIsReady(true);
      setProgress(100);
      setMessages((prev) =>
        pruneMessages([
          ...prev.filter((message) => message.id !== "ai-opt-in" && message.id !== "1"),
          createSysMessage(`WebGPU model mode is unavailable here: ${fallbackReason} Using a lightweight portfolio fallback instead; no model will be downloaded or cached.`),
        ])
      );
      return;
    }

    if (initialLoadDoneRef.current) {
      setProgress(100);
      setIsReady(true);
    }
    setMessages((prev) => {
      const withoutOptIn = prev.filter((message) => message.id !== "ai-opt-in");
      if (initialLoadDoneRef.current) return withoutOptIn;
      if (withoutOptIn.some((message) => message.id === "1")) return withoutOptIn;

      return [...withoutOptIn, { id: "1", text: `Initializing Local AI Tour Guide (${LOCAL_MODEL_LABEL})... This may take a moment to cache the model on first use.`, sender: "sys" }];
    });
  }, []);

  useEffect(() => {
    if (localAiFallback || !localAiEnabled) return;

    const worker = new Worker(new URL("../lib/worker.ts", import.meta.url), { type: "module" });
    sharedWorkerRef.current = worker;

    const queueTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutsRef.current.push(timeout);
    };

    const queueOnboarding = () => {
      if (onboardingQueuedRef.current) return;
      onboardingQueuedRef.current = true;
      const welcomeText = "Welcome to Shahriar's Portfolio.";
      const assistantText = "I am the local AI tour guide. Ask me to compare skills to experience, explain project evidence, build a recruiter path, or synthesize Shahriar's fit for a role.";
      const objectiveText = "What would make this visit useful: hiring signal, technical depth, AI projects, support experience, or a quick guided tour?";

      queueTimeout(() => {
        setMessages((prev) => pruneMessages([...prev, { id: getNextId(), text: welcomeText, sender: "ai", isReadyGreen: true }]));
        queueTimeout(() => {
          setMessages((prev) => pruneMessages([...prev, createAiMessage(assistantText)]));
          queueTimeout(() => {
            setMessages((prev) => pruneMessages([...prev, createAiMessage(objectiveText)]));
          }, getTypewriterDelay(assistantText));
        }, getTypewriterDelay(welcomeText));
      }, 1000);
    };

    const onMessageReceived = (event: MessageEvent) => {
      switch (event.data.status) {
        case "progress": {
          const nextProgress = event.data.data?.progress || 0;
          initialLoadProgressRef.current = initialLoadDoneRef.current ? initialLoadProgressRef.current : Math.max(initialLoadProgressRef.current, nextProgress);
          setProgress(initialLoadProgressRef.current);

          if (!initialLoadDoneRef.current) {
            setMessages((prev) => {
              const newMsgs = [...prev];
              if (newMsgs[0]) {
                newMsgs[0] = { ...newMsgs[0], text: `Caching ${LOCAL_MODEL_LABEL} in browser... ${initialLoadProgressRef.current.toFixed(0)}%` };
              }
              return newMsgs;
            });
          }
          break;
        }
        case "ready":
        case "complete": {
          if (!initialLoadDoneRef.current) {
            initialLoadDoneRef.current = true;
            initialLoadProgressRef.current = 100;
            setProgress(100);
            setIsReady(true);
            setShowReadyToast(true);
            queueTimeout(() => setShowReadyToast(false), 5000);
            setMessages((prev) => prev.filter((message) => message.id !== "1"));
            queueOnboarding();

            if (queuedMessageRef.current) {
              const { text, activeView, routerMemory } = queuedMessageRef.current;
              queuedMessageRef.current = null;

              const nextProfile = inferVisitorProfile(text, visitorProfileRef.current);
              visitorProfileRef.current = nextProfile;

              setTimeout(() => {
                setVisitorProfile(nextProfile);
              }, 0);

              const chatHistory = [{ role: "user" as const, content: text }];
              worker.postMessage({
                messages: [{ role: "system", content: buildSystemPrompt(text, activeView, nextProfile, routerMemory) }, ...chatHistory],
              });
            }
          }

          if (event.data.status === "ready") break;

          setMessages((prev) => {
            const idx = prev.length - 1;
            const lastMsg = prev[idx];
            if (lastMsg && lastMsg.sender === "ai" && lastMsg.isTyping) {
              const cleanText = typeof event.data.text === "string" ? event.data.text.trim() : "";
              let updatedText: string;

              if (cleanText.includes("INITIATING_NAVIGATION:")) {
                const parts = cleanText.split("INITIATING_NAVIGATION:");
                const responseText = parts[0].trim();
                const rawView = parts[1].trim().toLowerCase();
                const viewToNavigate = rawView.split(/[\s\n]+/)[0] as ViewKey;

                const VALID_VIEWS: ViewKey[] = ["hero", "about", "projects", "experience", "skills", "stats", "contact"];

                if (VALID_VIEWS.includes(viewToNavigate)) {
                  updatedText = responseText || cleanText.replace(/INITIATING_NAVIGATION:\s*\S+\s*/i, "").trim();
                  if (onNavigateRef.current) {
                    onNavigateRef.current(viewToNavigate);
                  }
                } else {
                  updatedText = cleanText;
                }
              } else if (cleanText.includes("INITIATING_SYNTHESIS")) {
                const context = cleanText.replace("INITIATING_SYNTHESIS", "");
                if (onSynthesisRef.current) onSynthesisRef.current(context);
                updatedText = context;
              } else {
                updatedText = cleanText;
              }

              const newMsgs = [...prev];
              newMsgs[idx] = { ...lastMsg, text: updatedText, isTyping: false };
              return newMsgs;
            }
            return prev;
          });
          break;
        }
        case "error":
          setLocalAiFallback(true);
          setIsReady(true);
          setProgress(100);
          setMessages((prev) =>
            pruneMessages([
              ...prev.filter((message) => message.id !== "1"),
              createSysMessage(`WebGPU model mode could not start (${event.data.error}). Using the lightweight portfolio fallback instead.`),
            ])
          );
          break;
      }
    };

    worker.addEventListener("message", onMessageReceived);

    if (initialLoadDoneRef.current) {
      queueOnboarding();
    } else if (!initialLoadRequestedRef.current) {
      initialLoadRequestedRef.current = true;
      worker.postMessage({
        messages: [{ role: "user", content: "warm up" }],
        warmup: true,
      });
    }

    return () => {
      worker.removeEventListener("message", onMessageReceived);
      worker.terminate();
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [localAiFallback, localAiEnabled]);

  const addNavigationMessage = (userText: string, view: ViewKey) => {
    const viewGoal = VIEW_GOALS[view];

    setMessages((prev) =>
      pruneMessages([
        ...prev,
        createUserMessage(userText),
        createSysMessage(`Opened ${formatViewName(view)} - ${viewGoal.coreQuestion}`),
      ])
    );
  };

  const addSystemMessage = (text: string) => {
    setMessages((prev) => pruneMessages([...prev, createSysMessage(text)]));
  };

  const sendMessage = (userText: string, activeView: ViewKey, routerMemory?: RouterMemory) => {
    const text = userText.trim();
    if (!text) return;

    const riskyKeywords = ["script", "write code", "python code", "hack", "penetration", "exploit", "bash script", "sql injection", "vulnerability", "pen test"];
    if (riskyKeywords.some(kw => text.toLowerCase().includes(kw))) {
      setMessages((prev) =>
        pruneMessages([
          ...prev,
          createUserMessage(userText),
          createAiMessage("I am restricted to providing information about Shahriar's professional experience and portfolio. I cannot generate scripts or provide general technical assistance."),
        ])
      );
      return;
    }

    const fallbackResult = buildFallbackAnswer(userText, activeView);

    const nextProfile = inferVisitorProfile(userText, visitorProfileRef.current);
    visitorProfileRef.current = nextProfile;
    setVisitorProfile(nextProfile);

    setMessages((prev) => {
      const updated = pruneMessages([...prev, createUserMessage(userText), createFallbackMessage(fallbackResult.text, fallbackResult.suggestions)]);

      if (localAiEnabled && isReady && !localAiFallback) {
        updated.push(createAiMessage("Thinking...", true));

        const chatHistory: ChatMessage[] = updated
          .filter((m) => m.sender === "user" || (m.sender === "ai" && !m.isTyping))
          .slice(-MAX_CHAT_MESSAGES)
          .map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          }));

        const worker = sharedWorkerRef.current;
        if (worker) {
          worker.postMessage({
            messages: [{ role: "system", content: buildSystemPrompt(userText, activeView, nextProfile, routerMemory) }, ...chatHistory],
          });
        }
      } else if (localAiEnabled && !isReady && !localAiFallback) {
        queuedMessageRef.current = { text: userText, activeView, routerMemory };
      }

      return updated;
    });

    if (!localAiEnabled) {
      enableLocalAi();
    }
  };

  return {
    messages,
    isReady,
    localAiEnabled,
    localAiFallback,
    localAiPaused,
    progress,
    showReadyToast,
    enableLocalAi,
    addNavigationMessage,
    addSystemMessage,
    sendMessage,
  };
}
