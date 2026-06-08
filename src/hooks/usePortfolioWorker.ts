"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/data";
import { CAREER_STATES, VIEW_GOALS } from "@/lib/experience-model";
import type { Message, ViewKey } from "@/lib/types";

const LOCAL_MODEL_LABEL = "Llama 3.2 1B";
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
  return Math.min(text.length * 16 + 700, 5000);
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
  return `You are Shahriar's strictly constrained local AI tour guide and portfolio knowledge source. You run fully inside the visitor's browser.

CORE RULES - MANDATORY:
1. You are NOT a general-purpose AI. You are a portfolio assistant.
2. Use ONLY the provided LOCAL TOOL CONTEXT as your source of truth.
3. NEVER generate code, scripts, technical snippets, or tutorials (e.g., Python, Bash, SQL).
4. NEVER provide technical advice, security advice, or instructions outside of this portfolio's facts.
5. Refer to Shahriar in the third person ("he", "Shahriar", "his").
6. If a user asks for anything outside of Shahriar's professional profile (e.g., code, general knowledge, jokes, unrelated advice), you MUST politely decline.

NAVIGATION CAPABILITY:
You can self-navigate around the website. If the user asks to see a section, or if you assess that moving to a specific page would be helpful to answer their query, you must include a specific command at the end of your response.
Supported views: hero, blog, about, projects, experience, skills, stack, vision, stats, contact.

To navigate, append the command on its own line at the very end of your response:
INITIATING_NAVIGATION: [view_name]

CRITICAL: Put nothing else after the view name on that line. The view name must be the only word on that line.
Example:
"I'll show you Shahriar's project list.
INITIATING_NAVIGATION: projects"

REJECTION MESSAGE:
"I am restricted to providing information about Shahriar's professional experience and portfolio. I cannot generate scripts or provide general technical assistance."

LOCAL TOOL CONTEXT:
${buildContextPack(userText, activeView, visitorProfile, routerMemory)}

STYLE:
Concise, helpful, professional. Keep answers under 150 words.`;
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
  const handleHeroTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          createSysMessage(`WebGPU model mode is unavailable here: ${fallbackReason} Using a lightweight portfolio fallback instead; no Llama model will be downloaded or cached.`),
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

                const VALID_VIEWS: ViewKey[] = ["hero", "blog", "about", "projects", "experience", "skills", "stack", "vision", "stats", "contact"];

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

    if (localAiFallback) {
      setMessages((prev) =>
        pruneMessages([
          ...prev,
          createUserMessage(userText),
          createAiMessage(buildFallbackAnswer(userText, activeView)),
        ])
      );
      return;
    }

    if (!localAiEnabled) {
      enableLocalAi();

      setMessages((prev) =>
        pruneMessages([
          ...prev,
          createUserMessage(userText),
          createAiMessage("Thinking...", true),
        ])
      );

      queuedMessageRef.current = { text: userText, activeView, routerMemory };
      return;
    }

    if (!isReady) {
      setMessages((prev) =>
        pruneMessages([
          ...prev,
          createUserMessage(userText),
          createAiMessage("Thinking...", true),
        ])
      );

      queuedMessageRef.current = { text: userText, activeView, routerMemory };
      return;
    }

    const nextProfile = inferVisitorProfile(userText, visitorProfileRef.current);
    visitorProfileRef.current = nextProfile;

    setVisitorProfile(nextProfile);

    setMessages((prev) => {
      const newMsgs = pruneMessages([...prev, createUserMessage(userText), createAiMessage("Thinking...", true)]);

      const chatHistory: ChatMessage[] = newMsgs
        .filter((m) => m.sender !== "sys" && !m.isTyping)
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

      return newMsgs;
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
