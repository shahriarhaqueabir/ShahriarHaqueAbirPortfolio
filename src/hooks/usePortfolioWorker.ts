"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/data";
import { CAREER_STATES, VIEW_GOALS } from "@/lib/experience-model";
import type { Message, ViewKey } from "@/lib/types";

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

function getPortfolioWorker() {
  if (!sharedWorker) {
    sharedWorker = new Worker(new URL("../lib/worker.ts", import.meta.url), {
      type: "module",
    });
  }

  return sharedWorker;
}

function parseGeneratedText(output: unknown): string {
  if (!Array.isArray(output)) return "";

  const first = output[0] as { generated_text?: unknown } | undefined;
  const rawOutput = first?.generated_text;

  if (Array.isArray(rawOutput)) {
    const last = rawOutput[rawOutput.length - 1] as { content?: unknown } | undefined;
    return typeof last?.content === "string" ? last.content : "";
  }

  if (typeof rawOutput === "string") {
    const parts = rawOutput.split(/assistant\n|assistant:/i);
    return parts[parts.length - 1].trim();
  }

  return "";
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

function formatProjectSummary() {
  return CONFIG.projects
    .map((project) => `- ${project.name} -> ${project.stack.slice(0, 3).join(", ")}`)
    .join("\n");
}

function formatSkillSummary() {
  return CONFIG.skills.map((skill) => `- ${skill.group}: ${skill.items.slice(0, 6).join(", ")}`).join("\n");
}

function formatCareerModel() {
  return CAREER_STATES.map((state) => `- ${state.label}: ${state.summary}`).join("\n");
}

function formatViewGoals() {
  return Object.entries(VIEW_GOALS)
    .map(([view, goal]) => `- ${view}: ${goal.coreQuestion}`)
    .join("\n");
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
  if (lowerInput.includes("automation") || lowerInput.includes("workflow")) interests.add("Workflow automation");
  if (lowerInput.includes("stack") || lowerInput.includes("architecture")) interests.add("Technical architecture");
  if (interests.size > 0) nextProfile.interests = Array.from(interests);

  return nextProfile;
}

function buildSystemPrompt(activeView: ViewKey, visitorProfile: VisitorProfile, routerMemory?: RouterMemory) {
  return `You are the AI assistant for Hawkward, Shahriar's AI-enabled portfolio.
Your job is to understand each visitor, guide them intelligently, and answer from the portfolio dataset with precision.

CURRENT STATE:
- Active View: ${activeView.toUpperCase()}
- Visitor Intent:
${formatVisitorProfile(visitorProfile)}
- Router Memory:
${formatRouterMemory(routerMemory)}

KNOWLEDGE BASE:
- Identity: Shahriar is a ${CONFIG.taglines.join(", ")} based in ${CONFIG.location}.
- Bio: ${CONFIG.profile}
- Experience: ${CONFIG.experience.map((e) => `${e.role} at ${e.company} (${e.period})`).join("; ")}
- Projects:
${formatProjectSummary()}
- Skills:
${formatSkillSummary()}
- Career Layers:
${formatCareerModel()}
- View Questions:
${formatViewGoals()}
- Contact: ${CONFIG.contact.map((c) => `${c.label}: ${c.value}`).join(", ")}

PRIORITIES:
1. Understand the user's intent.
2. Stay accurate to the portfolio dataset.
3. Synthesize useful insights from the dataset.
4. Guide them to the most relevant portfolio view.
5. Maintain the portfolio's style without letting style reduce clarity.

ONBOARDING FLOW:
For a first interaction or broad "where should I start?" request:
1. Welcome briefly.
2. Infer the likely visitor type: Recruiter, Hiring Manager, Engineer, Designer, or Curious Visitor.
3. Suggest three relevant starting paths.
- Recruiter: Experience, Skills, CV Synthesis.
- Hiring Manager: Experience, Projects, Support/Consulting fit.
- Engineer: Projects, Stack, AI Architecture.
- Designer: Vision, Interactive Portfolio System, Hawkward Portfolio.
- Curious Visitor: About, Projects, Stats.

CAPABILITIES:
1. Navigation: Recommend specific views: Hero, About, Projects, Experience, Skills, Stack, Vision, Stats, Contact.
2. Synthesis: If a user asks for a summary, pitch, fit assessment, hiring brief, or custom CV synthesis:
   - Start with: "Synthesizing custom CV insights... INITIATING_SYNTHESIS"
   - Follow with a structured, professional report tailored to their profile.
3. Clarification: If the request is ambiguous, ask one short clarifying question or provide two useful paths.

TRUST RULES:
Never invent jobs, technologies, metrics, education, achievements, dates, or certifications.
If information is unavailable, say: "I do not have enough information in the current portfolio dataset."
Then suggest the closest relevant section or the Contact view.

TONE:
Editorial, technical, and lightly cinematic.
Use subtle system-inspired language sparingly.
Natural conversation and usefulness take priority over stylistic language.
Do not force cinematic or system language into every answer.
Be concise, specific, and visitor-aware.`;
}

type UsePortfolioWorkerOptions = {
  onSynthesis: (context: string) => void;
};

export function usePortfolioWorker({ onSynthesis }: UsePortfolioWorkerOptions) {
  const [messages, setMessages] = useState<Message[]>(() =>
    initialLoadDone
      ? []
      : [{ id: "1", text: "Initializing Local AI Assistant (SmolLM2-360M)... This may take a moment to load the weights on first visit.", sender: "sys" }],
  );
  const [isReady, setIsReady] = useState(initialLoadDone);
  const [progress, setProgress] = useState(initialLoadDone ? 100 : 0);
  const [showReadyToast, setShowReadyToast] = useState(false);
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile>({});

  const onSynthesisRef = useRef(onSynthesis);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    onSynthesisRef.current = onSynthesis;
  }, [onSynthesis]);

  useEffect(() => {
    const worker = getPortfolioWorker();

    const queueTimeout = (callback: () => void, delay: number) => {
      const timeout = setTimeout(callback, delay);
      timeoutsRef.current.push(timeout);
    };

    const queueOnboarding = () => {
      if (onboardingQueued) return;
      onboardingQueued = true;
      const welcomeText = "Welcome to Shahriar's Portfolio.";
      const assistantText = "I am your AI assistant. I can help you analyze Shahriar's technical trajectory, navigate specific modules, or synthesize custom CV insights based on your requirements.";
      const objectiveText = "Before we initialize the full tour: What is your primary objective today? (e.g., 'I am looking to hire', 'Just exploring', 'Seeking collaboration')";

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
                newMsgs[0].text = `Downloading model weights... ${initialLoadProgress.toFixed(0)}%`;
              }
              return newMsgs;
            });
          }
          break;
        }
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

          setMessages((prev) => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];

            if (lastMsg && lastMsg.sender === "ai" && lastMsg.isTyping) {
              const cleanText = parseGeneratedText(event.data.output);

              if (cleanText.includes("INITIATING_SYNTHESIS")) {
                const context = cleanText.replace("INITIATING_SYNTHESIS", "");
                onSynthesisRef.current(context);
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
          setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Error: " + event.data.error, sender: "sys" }]);
          break;
      }
    };

    worker.addEventListener("message", onMessageReceived);

    if (!initialLoadRequested) {
      initialLoadRequested = true;
      worker.postMessage({
        messages: [{ role: "user", content: "hello" }],
      });
    }

    return () => {
      worker.removeEventListener("message", onMessageReceived);
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  const addNavigationMessage = (userText: string, view: ViewKey) => {
    const viewGoal = VIEW_GOALS[view];

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: userText, sender: "user" },
      { id: (Date.now() + 1).toString(), text: `Portfolio Assistant: Navigating to ${view.toUpperCase()} — ${viewGoal.coreQuestion}`, sender: "sys" },
    ]);
  };

  const addSystemMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text, sender: "sys" }]);
  };

  const sendMessage = (userText: string, activeView: ViewKey, routerMemory?: RouterMemory) => {
    if (!userText.trim() || !isReady) return;

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
      .map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));

    sharedWorker?.postMessage({
      messages: [{ role: "system", content: buildSystemPrompt(activeView, nextVisitorProfile, routerMemory) }, ...chatHistory],
    });
  };

  return {
    messages,
    isReady,
    progress,
    showReadyToast,
    addNavigationMessage,
    addSystemMessage,
    sendMessage,
  };
}
