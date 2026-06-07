"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/data";
import { CAREER_STATES, VIEW_GOALS } from "@/lib/experience-model";
import type { Message, ViewKey } from "@/lib/types";

const LOCAL_MODEL_LABEL = "Llama 3.2 1B";
const MAX_CHAT_MESSAGES = 10;

let sharedWorker: Worker | null = null;
let initialLoadDone = false;
let initialLoadRequested = false;
let onboardingQueued = false;
let initialLoadProgress = 0;

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

function getPortfolioWorker() {
  if (!sharedWorker) {
    sharedWorker = new Worker(new URL("../lib/worker.ts", import.meta.url), {
      type: "module",
    });
  }

  return sharedWorker;
}

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

function formatVisitorProfile(visitorProfile: VisitorProfile) {
  return [
    `- Name: ${visitorProfile.name || "Unknown"}`,
    `- Role: ${visitorProfile.role || "Unknown"}`,
    `- Industry: ${visitorProfile.industry || "Unknown"}`,
    `- Interests: ${visitorProfile.interests?.join(", ") || "None"}`,
    `- Session Goal: ${visitorProfile.goal || visitorProfile.intent || "Exploring"}`,
  ].join("\n");
}

function formatRouterMemory(routerMemory?: RouterMemory) {
  if (!routerMemory) return "- Visitor Type: Unknown\n- Detected Interests: None\n- Previous Views: None";

  return [
    `- Visitor Type: ${routerMemory.visitorType || "Unknown"}`,
    `- Detected Interests: ${routerMemory.detectedInterests.join(", ") || "None"}`,
    `- Previous Views: ${routerMemory.previousViews.join(", ") || "None"}`,
  ].join("\n");
}

function formatDetailedProjects(projectIndexes: number[]) {
  return projectIndexes
    .map((index) => {
      const project = CONFIG.projects[index];
      if (!project) return "";

      return [
        `PROJECT: ${project.name}`,
        `- Summary: ${project.desc}`,
        `- Context: ${project.context}`,
        `- Implementation: ${project.implementation}`,
        `- Outcome: ${project.outcome}`,
        `- Stack: ${project.stack.join(", ")}`,
      ].join("\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

function formatCareerModel() {
  return CAREER_STATES.map((state) => `- ${state.label}: ${state.summary}`).join("\n");
}

function formatViewGoals() {
  return Object.entries(VIEW_GOALS)
    .map(([view, goal]) => `- ${view}: ${goal.coreQuestion}`)
    .join("\n");
}

function formatViewName(view: ViewKey) {
  if (view === "hero") return "Home";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

function getRelevantProjectIndexes(input: string) {
  const lowerInput = input.toLowerCase();
  const scored = CONFIG.projects
    .map((project, index) => {
      const haystack = [project.name, project.desc, project.context, project.implementation, project.outcome, project.stack.join(" ")].join(" ").toLowerCase();
      const score = lowerInput
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length > 2)
        .reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { index, score };
    })
    .sort((a, b) => b.score - a.score);

  const matches = scored
    .filter((item) => item.score > 0)
    .slice(0, 3)
    .map((item) => item.index);
  return matches.length ? matches : [1, 4, 5];
}

function getInteractionMode(input: string) {
  const lowerInput = input.toLowerCase();
  if (/tour|guide|walk me through|where should i start|show me around/.test(lowerInput)) return "guided_tour";
  if (/compare|relate|relationship|map|connect|versus| vs |fit|match/.test(lowerInput)) return "cross_view_reasoning";
  if (/summary|brief|pitch|synthesis|cv|resume|hire|hiring|recruiter|assessment/.test(lowerInput)) return "synthesis";
  if (/contact|email|linkedin|github|reach/.test(lowerInput)) return "contact";
  return "answer";
}

function buildContextPack(userText: string, activeView: ViewKey, visitorProfile: VisitorProfile, routerMemory?: RouterMemory) {
  const relevantProjectIndexes = getRelevantProjectIndexes(userText);
  const mode = getInteractionMode(userText);

  return `INTERACTION MODE: ${mode}
ACTIVE VIEW: ${activeView}
VISITOR PROFILE:
${formatVisitorProfile(visitorProfile)}
ROUTER MEMORY:
${formatRouterMemory(routerMemory)}

PORTFOLIO IDENTITY:
- Name: ${CONFIG.name}
- Role signals: ${CONFIG.taglines.join(", ")}
- Location: ${CONFIG.location}
- Work authorization: ${CONFIG.workAuth}
- Author bio written in Shahriar's first-person voice: ${CONFIG.profile}

CAREER LAYERS:
${formatCareerModel()}

EXPERIENCE:
${CONFIG.experience.map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`).join("\n")}

SKILLS:
${CONFIG.skills.map((skill) => `- ${skill.group}: ${skill.items.join(", ")}`).join("\n")}

RELEVANT PROJECT FILES:
${formatDetailedProjects(relevantProjectIndexes)}

VIEW MAP:
${formatViewGoals()}

CONTACT:
${CONFIG.contact.map((c) => `- ${c.label}: ${c.value}`).join("\n")}`;
}

function getTypewriterDelay(text: string) {
  return text.length * 16 + 700;
}

function inferVisitorProfile(userText: string, currentProfile: VisitorProfile): VisitorProfile {
  const lowerInput = userText.toLowerCase();
  const nextProfile: VisitorProfile = { ...currentProfile };

  if (lowerInput.includes("my name is") || lowerInput.includes("i'm ")) {
    nextProfile.name = userText.split(/is |i'm /i)[1]?.trim();
  }

  if (lowerInput.includes("recruiter")) {
    nextProfile.role = "Recruiter";
    nextProfile.goal = "Hiring evaluation";
  } else if (lowerInput.includes("hiring manager")) {
    nextProfile.role = "Hiring Manager";
    nextProfile.goal = "Hiring evaluation";
  } else if (lowerInput.includes("engineer") || lowerInput.includes("developer")) {
    nextProfile.role = "Engineer";
    nextProfile.goal = nextProfile.goal || "Technical evaluation";
  } else if (lowerInput.includes("designer")) {
    nextProfile.role = "Designer";
    nextProfile.goal = nextProfile.goal || "Portfolio experience review";
  }

  if (lowerInput.includes("hiring") || lowerInput.includes("job") || lowerInput.includes("role")) {
    nextProfile.intent = "hiring";
    nextProfile.goal = nextProfile.goal || "Hiring evaluation";
  }

  if (lowerInput.includes("collab") || lowerInput.includes("partner") || lowerInput.includes("project")) {
    nextProfile.intent = "collaboration";
    nextProfile.goal = nextProfile.goal || "Collaboration exploration";
  }

  const interests = new Set(nextProfile.interests || []);
  if (lowerInput.includes("ai") || lowerInput.includes("rag") || lowerInput.includes("llm")) interests.add("AI systems");
  if (lowerInput.includes("support") || lowerInput.includes("customer")) interests.add("Customer engineering");
  if (lowerInput.includes("automation") || lowerInput.includes("workflow")) interests.add("AI automation");
  if (lowerInput.includes("stack") || lowerInput.includes("architecture")) interests.add("Technical architecture");
  if (interests.size > 0) nextProfile.interests = Array.from(interests);

  return nextProfile;
}

function buildSystemPrompt(userText: string, activeView: ViewKey, visitorProfile: VisitorProfile, routerMemory?: RouterMemory) {
  return `You are Shahriar's local AI tour guide and portfolio knowledge source, running fully inside the visitor's browser on ${LOCAL_MODEL_LABEL}.

You are not Shahriar Haque Abir. Use "I" only when referring to yourself as the local AI guide. Refer to Shahriar as "Shahriar", "he", or "his". If using the author bio, remember it is portfolio copy written in Shahriar's voice, not your identity.

Your job is NOT to behave like a static menu. Your job is to reason across Shahriar's experience, projects, skills, and contact data, then guide the visitor with useful next steps.

LOCAL TOOL CONTEXT:
${buildContextPack(userText, activeView, visitorProfile, routerMemory)}

HOW TO RESPOND:
- Answer the user's actual question first.
- Use the portfolio facts above as your only source of truth.
- Connect evidence across sections when useful, especially skills -> experience -> projects.
- Describe Shahriar's case studies and experience in neutral professional past tense.
- Recommend one or two relevant views, but do not pretend you personally navigated unless the UI already did.
- If the user asks for a tour, create a short path with 3 stops and why each matters.
- If the user asks for hiring/fit/CV synthesis, write a compact structured brief.
- If the request is risky, destructive, or unrelated to the portfolio, politely redirect to what this assistant can do.
- If the data is missing, say you do not have enough information in the current portfolio dataset.

STYLE:
Clear, grounded, helpful. Light technical style is okay, but usefulness beats theatrics.
Keep answers under 180 words unless the user asks for a deep report.`;
}

function buildFallbackAnswer(userText: string, activeView: ViewKey) {
  const lowerInput = userText.toLowerCase();

  if (/contact|email|linkedin|github|reach/.test(lowerInput)) {
    const links = CONFIG.contact
      .filter((item) => ["Email", "LinkedIn", "GitHub"].includes(item.label))
      .map((item) => `${item.label}: ${item.value}`)
      .join(" | ");

    return `Fallback guide active. ${links}. Open Contact for all links and location details.`;
  }

  if (/project|case stud|rag|ai|automation|gtm|network|portfolio/.test(lowerInput)) {
    const projects = CONFIG.projects
      .slice(0, 4)
      .map((project) => project.name)
      .join(", ");
    return `Fallback guide active. Strong project evidence starts with: ${projects}. Open Projects for context, implementation, outcome, and stack details.`;
  }

  if (/experience|work|job|career|support|consult/.test(lowerInput)) {
    const current = CONFIG.experience[0];
    return `Fallback guide active. Core experience: ${current.role} at ${current.company} (${current.period}), covering discovery, RFI/RFP support, PoCs, onboarding, Tier-3 production support, release validation, and product/engineering coordination.`;
  }

  if (/skill|stack|technical|tools/.test(lowerInput)) {
    return `Fallback guide active. Main skill groups: ${CONFIG.skills.map((skill) => skill.group).join("; ")}. Open Skills for the detailed tool and capability map.`;
  }

  if (/tour|guide|start|where/.test(lowerInput)) {
    return "Fallback guide active. Fast recruiter path: start with Experience for career signal, open Projects for evidence, then use Contact or Download CV when ready.";
  }

  return `Fallback guide active. I can still route you through the portfolio without loading the Llama model. Current view: ${formatViewName(activeView)}. Try asking about experience, projects, skills, contact, or a quick recruiter path.`;
}

type UsePortfolioWorkerOptions = {
  onSynthesis?: (context: string) => void;
};

export function usePortfolioWorker({ onSynthesis }: UsePortfolioWorkerOptions = {}) {
  const [localAiFallbackReason] = useState(getLocalAiFallbackReason);
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
  const [queuedMessage, setQueuedMessage] = useState<{ text: string; activeView: ViewKey; routerMemory?: RouterMemory } | null>(null);

  const onSynthesisRef = useRef(onSynthesis);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    onSynthesisRef.current = onSynthesis;
  }, [onSynthesis]);

  const enableLocalAi = useCallback(() => {
    setLocalAiEnabled(true);

    if (localAiFallbackReason) {
      setLocalAiFallback(true);
      setIsReady(true);
      setProgress(100);
      setMessages((prev) => [
        ...prev.filter((message) => message.id !== "ai-opt-in" && message.id !== "1"),
        {
          id: Date.now().toString(),
          text: `WebGPU model mode is unavailable here: ${localAiFallbackReason} Using a lightweight portfolio fallback instead; no Llama model will be downloaded or cached.`,
          sender: "sys",
        },
      ]);
      return;
    }

    if (initialLoadDone) {
      setProgress(100);
      setIsReady(true);
    }
    setMessages((prev) => {
      const withoutOptIn = prev.filter((message) => message.id !== "ai-opt-in");
      if (initialLoadDone) return withoutOptIn;
      if (withoutOptIn.some((message) => message.id === "1")) return withoutOptIn;

      return [...withoutOptIn, { id: "1", text: `Initializing Local AI Tour Guide (${LOCAL_MODEL_LABEL})... This may take a moment to cache the model on first use.`, sender: "sys" }];
    });
  }, [localAiFallbackReason]);

  useEffect(() => {
    if (localAiFallback || !localAiEnabled) return;

    const worker = getPortfolioWorker();

    const queueTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutsRef.current.push(timeout);
    };

    const queueOnboarding = () => {
      if (onboardingQueued) return;
      onboardingQueued = true;
      const welcomeText = "Welcome to Shahriar's Portfolio.";
      const assistantText = "I am the local AI tour guide. Ask me to compare skills to experience, explain project evidence, build a recruiter path, or synthesize Shahriar's fit for a role.";
      const objectiveText = "What would make this visit useful: hiring signal, technical depth, AI projects, support experience, or a quick guided tour?";

      queueTimeout(() => {
        setMessages((prev) => [...prev, { id: "onboard-1", text: welcomeText, sender: "ai", isReadyGreen: true }]);
        queueTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "onboard-2",
              text: assistantText,
              sender: "ai",
            },
          ]);
          queueTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: "onboard-3",
                text: objectiveText,
                sender: "ai",
              },
            ]);
          }, getTypewriterDelay(assistantText));
        }, getTypewriterDelay(welcomeText));
      }, 1000);
    };

    const onMessageReceived = (event: MessageEvent) => {
      switch (event.data.status) {
        case "progress": {
          const nextProgress = event.data.data?.progress || 0;
          initialLoadProgress = initialLoadDone ? initialLoadProgress : Math.max(initialLoadProgress, nextProgress);
          setProgress(initialLoadProgress);

          if (!initialLoadDone) {
            setMessages((prev) => {
              const newMsgs = [...prev];
              if (newMsgs[0]) {
                newMsgs[0].text = `Caching ${LOCAL_MODEL_LABEL} in browser... ${initialLoadProgress.toFixed(0)}%`;
              }
              return newMsgs;
            });
          }
          break;
        }
        case "ready":
        case "complete": {
          if (!initialLoadDone) {
            initialLoadDone = true;
            initialLoadProgress = 100;
            setProgress(100);
            setIsReady(true);
            setShowReadyToast(true);
            queueTimeout(() => setShowReadyToast(false), 5000);
            setMessages((prev) => prev.filter((message) => message.id !== "1"));
            queueOnboarding();
          }

          if (event.data.status === "ready") break;

          setMessages((prev) => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];

            if (lastMsg && lastMsg.sender === "ai" && lastMsg.isTyping) {
              const cleanText = typeof event.data.text === "string" ? event.data.text.trim() : "";

              if (cleanText.includes("INITIATING_SYNTHESIS")) {
                const context = cleanText.replace("INITIATING_SYNTHESIS", "");
                if (onSynthesisRef.current) onSynthesisRef.current(context);
                lastMsg.text = context;
              } else {
                lastMsg.text = cleanText;
              }

              lastMsg.isTyping = false;
            }

            return newMsgs;
          });
          break;
        }
        case "error":
          setLocalAiFallback(true);
          setIsReady(true);
          setProgress(100);
          setMessages((prev) => [
            ...prev.filter((message) => message.id !== "1"),
            {
              id: Date.now().toString(),
              text: `WebGPU model mode could not start (${event.data.error}). Using the lightweight portfolio fallback instead.`,
              sender: "sys",
            },
          ]);
          break;
      }
    };

    worker.addEventListener("message", onMessageReceived);

    if (initialLoadDone) {
      queueOnboarding();
    } else if (!initialLoadRequested) {
      initialLoadRequested = true;
      worker.postMessage({
        messages: [{ role: "user", content: "warm up" }],
        warmup: true,
      });
    }

    return () => {
      worker.removeEventListener("message", onMessageReceived);
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [localAiFallback, localAiEnabled]);

  const addNavigationMessage = (userText: string, view: ViewKey) => {
    const viewGoal = VIEW_GOALS[view];

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: userText, sender: "user" },
      { id: (Date.now() + 1).toString(), text: `Opened ${formatViewName(view)} - ${viewGoal.coreQuestion}`, sender: "sys" },
    ]);
  };

  const addSystemMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "sys" }]);
  };

  useEffect(() => {
    if (isReady && queuedMessage) {
      const { text, activeView, routerMemory } = queuedMessage;
      setQueuedMessage(null);

      // Perform sending logic directly
      const nextVisitorProfile = inferVisitorProfile(text, visitorProfile);
      setVisitorProfile(nextVisitorProfile);

      const chatHistory = [{ role: "user" as const, content: text }];

      sharedWorker?.postMessage({
        messages: [{ role: "system", content: buildSystemPrompt(text, activeView, nextVisitorProfile, routerMemory) }, ...chatHistory],
      });
    }
  }, [isReady, queuedMessage, visitorProfile]);

  const sendMessage = (userText: string, activeView: ViewKey, routerMemory?: RouterMemory) => {
    if (!userText.trim()) return;

    if (localAiFallback) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: userText, sender: "user" },
        {
          id: (Date.now() + 1).toString(),
          text: buildFallbackAnswer(userText, activeView),
          sender: "ai",
        },
      ]);
      return;
    }

    if (!localAiEnabled) {
      // Automatically trigger enablement instead of showing an error message
      enableLocalAi();

      // Add the user message and "Thinking..." placeholder
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: userText, sender: "user" },
        { id: (Date.now() + 1).toString(), text: "Thinking...", sender: "ai", isTyping: true },
      ]);

      // Queue the message for when it's ready
      setQueuedMessage({ text: userText, activeView, routerMemory });
      return;
    }

    if (!isReady) {
      // AI is enabled but still loading. Add the user message and queue it.
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: userText, sender: "user" },
        { id: (Date.now() + 1).toString(), text: "Thinking...", sender: "ai", isTyping: true },
      ]);

      setQueuedMessage({ text: userText, activeView, routerMemory });
      return;
    }

    const nextVisitorProfile = inferVisitorProfile(userText, visitorProfile);
    if (routerMemory?.visitorType && !nextVisitorProfile.role) {
      nextVisitorProfile.role = routerMemory.visitorType;
    }
    if (routerMemory?.detectedInterests.length) {
      nextVisitorProfile.interests = Array.from(new Set([...(nextVisitorProfile.interests || []), ...routerMemory.detectedInterests]));
    }
    setVisitorProfile(nextVisitorProfile);

    const newMsgs: Message[] = [...messages, { id: Date.now().toString(), text: userText, sender: "user" }];
    newMsgs.push({ id: (Date.now() + 1).toString(), text: "Thinking...", sender: "ai", isTyping: true });
    setMessages(newMsgs);

    const chatHistory = newMsgs
      .filter((message) => message.sender !== "sys" && !message.isTyping)
      .slice(-MAX_CHAT_MESSAGES)
      .map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      })) satisfies ChatMessage[];

    sharedWorker?.postMessage({
      messages: [{ role: "system", content: buildSystemPrompt(userText, activeView, nextVisitorProfile, routerMemory) }, ...chatHistory],
    });
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
