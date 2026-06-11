"use client";

import { useState } from "react";
import { VIEW_GOALS } from "@/lib/experience-model";
import type { ViewKey } from "@/lib/types";

type ViewIntent = {
  keywords: string[];
  description: string;
  weight: number;
};

type ConversationState = {
  currentView: ViewKey;
  previousViews: ViewKey[];
  detectedInterests: string[];
  visitorType: "recruiter" | "hiring-manager" | "engineer" | "designer" | "curious" | null;
};

const viewMap: Partial<Record<ViewKey, ViewIntent>> = {
  hero: {
    keywords: ["hero", "home", "intro", "start", "welcome", "beginning", "landing", "overview"],
    description: VIEW_GOALS.hero.intentDescription,
    weight: 2,
  },

  about: {
    keywords: ["about", "bio", "who", "profile", "story", "approach", "thinking", "philosophy", "background"],
    description: VIEW_GOALS.about.intentDescription,
    weight: 2,
  },
  projects: {
    keywords: [
      "projects",
      "work",
      "portfolio",
      "case studies",
      "solutions",
      "systems",
      "architecture",
      "automation",
      "pipelines",
      "built",
      "created",
      "implemented",
      "implementation",
      "engineering",
      "technical work",
      "ai systems",
      "rag",
      "docker",
      "n8n",
      "fastapi",
      "qdrant",
    ],
    description: VIEW_GOALS.projects.intentDescription,
    weight: 3,
  },
  experience: {
    keywords: ["experience", "history", "career", "resume", "cv", "jobs", "roles", "employment", "background", "work history", "professional history", "previous role"],
    description: VIEW_GOALS.experience.intentDescription,
    weight: 2,
  },
  skills: {
    keywords: ["skills", "competencies", "matrix", "capabilities", "technical skills", "languages"],
    description: VIEW_GOALS.skills.intentDescription,
    weight: 2,
  },
  stats: {
    keywords: ["stats", "metrics", "numbers", "data", "distribution", "analytics", "impact", "signals", "measurements"],
    description: VIEW_GOALS.stats.intentDescription,
    weight: 2,
  },
  contact: {
    keywords: ["contact", "email", "linkedin", "reach", "github", "connect", "message", "hire", "availability", "talk"],
    description: VIEW_GOALS.contact.intentDescription,
    weight: 2,
  },
};

type CommandResult = {
  navigated: boolean;
  view?: ViewKey;
  score?: number;
};

const fillerWords = new Set(["a", "an", "and", "are", "for", "i", "in", "me", "of", "on", "show", "the", "to", "you", "your"]);
const followUpCommands = new Set(["more", "show more", "tell me more", "continue", "go deeper", "expand", "details", "more details"]);
const navigationVerbs = ["go to", "open", "navigate", "take me to", "show me", "show", "load", "switch to", "jump to"];
const questionStarters = ["how", "what", "why", "who", "where", "when", "can", "could", "would", "does", "do", "is", "are", "explain", "compare", "relate", "tell me about"];

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !fillerWords.has(word));
}

function scoreKeyword(input: string, keyword: string, weight: number) {
  const normalizedKeyword = keyword.toLowerCase();
  if (!input.includes(normalizedKeyword)) return 0;

  const exactMatchBonus = input === normalizedKeyword ? weight : 0;
  const phraseBonus = normalizedKeyword.includes(" ") ? 1 : 0;
  return weight + exactMatchBonus + phraseBonus;
}

function scoreSemanticSimilarity(inputTokens: string[], description: string) {
  if (inputTokens.length === 0) return 0;

  const descriptionTokens = new Set(tokenize(description));
  const overlap = inputTokens.filter((token) => descriptionTokens.has(token)).length;
  return overlap / inputTokens.length;
}

function inferVisitorType(input: string): ConversationState["visitorType"] {
  if (input.includes("recruiter")) return "recruiter";
  if (input.includes("hiring manager") || input.includes("team lead")) return "hiring-manager";
  if (input.includes("engineer") || input.includes("developer") || input.includes("architect")) return "engineer";
  if (input.includes("designer") || input.includes("design")) return "designer";
  if (input.includes("exploring") || input.includes("curious")) return "curious";
  return null;
}

function detectInterests(input: string) {
  const interests: string[] = [];

  if (input.includes("ai") || input.includes("rag") || input.includes("llm")) interests.push("AI systems");
  if (input.includes("automation") || input.includes("workflow") || input.includes("pipeline")) interests.push("AI automation");
  if (input.includes("architecture") || input.includes("systems") || input.includes("infrastructure")) interests.push("Architecture");
  if (input.includes("support") || input.includes("customer") || input.includes("saas")) interests.push("Customer engineering");
  if (input.includes("hire") || input.includes("role") || input.includes("fit")) interests.push("Hiring fit");

  return interests;
}

function detectView(input: string): { view: ViewKey | null; score: number } {
  const text = input.toLowerCase().trim();
  const inputTokens = tokenize(text);
  const scores = new Map<ViewKey, number>();

  for (const [view, data] of Object.entries(viewMap) as Array<[ViewKey, ViewIntent]>) {
    const keywordScore = data.keywords.reduce((total, keyword) => total + scoreKeyword(text, keyword, data.weight), 0);
    const semanticScore = scoreSemanticSimilarity(inputTokens, data.description) * data.weight;
    scores.set(view, keywordScore + semanticScore);
  }

  const [bestView, bestScore] = [...scores.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
  return { view: bestView, score: bestScore };
}

function isQuestionLike(input: string) {
  const text = input.toLowerCase().trim();
  return text.endsWith("?") || questionStarters.some((starter) => text === starter || text.startsWith(`${starter} `));
}

function isExplicitNavigationCommand(input: string, view: ViewKey | null, score: number) {
  const text = input.toLowerCase().trim();
  if (!view || score < 2) return false;
  if (followUpCommands.has(text)) return true;

  const hasNavigationVerb = navigationVerbs.some((verb) => text === verb || text.startsWith(`${verb} `));
  if (!hasNavigationVerb) return false;

  if (isQuestionLike(text) && !text.startsWith("show me") && !text.startsWith("take me to")) return false;
  return true;
}

export function useCommandRouter(initialView: ViewKey = "hero") {
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentView: initialView,
    previousViews: [],
    detectedInterests: [],
    visitorType: null,
  });

  const setActiveView = (view: ViewKey) => {
    setConversationState((current) => ({
      ...current,
      currentView: view,
      previousViews: current.currentView === view ? current.previousViews : [current.currentView, ...current.previousViews].slice(0, 6),
    }));
  };

  const handleCommand = (input: string): CommandResult => {
    const lowerInput = input.toLowerCase().trim();
    if (!lowerInput) return { navigated: false };

    const visitorType = inferVisitorType(lowerInput);
    const interests = detectInterests(lowerInput);

    setConversationState((current) => ({
      ...current,
      visitorType: visitorType || current.visitorType,
      detectedInterests: Array.from(new Set([...current.detectedInterests, ...interests])).slice(0, 8),
    }));

    if (followUpCommands.has(lowerInput) && conversationState.currentView !== "hero") {
      return { navigated: true, view: conversationState.currentView, score: 1 };
    }

    const { view, score } = detectView(lowerInput);
    if (isExplicitNavigationCommand(lowerInput, view, score) && view) {
      setActiveView(view);
      return { navigated: true, view, score };
    }

    return { navigated: false };
  };

  return {
    activeView: conversationState.currentView,
    conversationState,
    setActiveView,
    handleCommand,
  };
}
