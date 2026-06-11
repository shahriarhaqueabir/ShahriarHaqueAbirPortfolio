import type { ViewKey } from "@/lib/types";

export type CareerStateId = "infrastructure-grounding" | "systems-consulting" | "ai-automation";
export type SystemLayer = "physical" | "logic" | "experience" | "proof";

export type CareerState = {
  id: CareerStateId;
  label: string;
  summary: string;
  primarySkills: string[];
  systemExposure: string;
  answers: string[];
  nextViews: ViewKey[];
};

export type ViewGoal = {
  coreQuestion: string;
  layer: SystemLayer;
  intentDescription: string;
  nextViews: ViewKey[];
};

export const CAREER_STATES: CareerState[] = [
  {
    id: "infrastructure-grounding",
    label: "Infrastructure Grounding",
    summary: "Engineering and operational systems: electrical/electronic foundations, information and communication engineering, networks, optical fiber, and on-call support.",
    primarySkills: ["network operations", "Linux", "optical fibers", "troubleshooting", "systems thinking"],
    systemExposure: "Deterministic systems where stability, failure, and root cause are directly observable.",
    answers: ["Can Shahriar operate complex systems?", "Does he understand infrastructure constraints?"],
    nextViews: ["experience", "skills", "projects"],
  },
  {
    id: "systems-consulting",
    label: "Systems-Facing Consulting",
    summary: "Customer-facing technical work across onboarding, integrations, training, support, and production issues.",
    primarySkills: ["solution consulting", "customer onboarding", "incident triage", "API integration", "SLA ownership"],
    systemExposure: "Multi-system coordination where technical detail has to become usable customer workflow.",
    answers: ["Can he translate technical complexity?", "Can he support customers in production?"],
    nextViews: ["experience", "about", "contact"],
  },
  {
    id: "ai-automation",
    label: "AI Automation & Workflow Engineering",
    summary: "Modern system design with RAG, local LLMs, AI automation pipelines, workflow engineering, and agentic developer tooling.",
    primarySkills: ["FastAPI", "Qdrant", "Docker Compose", "n8n", "RAG", "local LLMs"],
    systemExposure: "Adaptive systems where retrieval, AI automation, and orchestration reduce operational friction.",
    answers: ["What has he built recently?", "Can he build AI-enabled systems with practical constraints?"],
    nextViews: ["projects", "skills", "contact"],
  },
];

export const VIEW_GOALS: Record<ViewKey, ViewGoal> = {
  hero: {
    coreQuestion: "Where should I start?",
    layer: "experience",
    intentDescription: "Opening overview, first impression, and fast paths into the portfolio.",
    nextViews: ["projects", "about", "contact"],
  },

  about: {
    coreQuestion: "How does he think?",
    layer: "experience",
    intentDescription: "Professional point of view, story progression, principles, and working style.",
    nextViews: ["experience", "projects", "contact"],
  },
  projects: {
    coreQuestion: "What has he built?",
    layer: "logic",
    intentDescription: "Technical implementations, AI systems, AI automation workflows, architecture, and case studies.",
    nextViews: ["skills", "stats", "contact"],
  },
  experience: {
    coreQuestion: "Can he operate in real environments?",
    layer: "physical",
    intentDescription: "Career timeline, production support, consulting ownership, infrastructure work, and customer-facing roles.",
    nextViews: ["skills", "projects", "contact"],
  },
  skills: {
    coreQuestion: "What capabilities does he bring?",
    layer: "logic",
    intentDescription: "Capability matrix, consulting skills, technical systems, tools, languages, and certifications.",
    nextViews: ["projects", "experience", "contact"],
  },
  stats: {
    coreQuestion: "What proof points support the story?",
    layer: "proof",
    intentDescription: "Metrics, proof points, impact signals, scale, and measurable evidence.",
    nextViews: ["experience", "projects", "contact"],
  },
  contact: {
    coreQuestion: "How do I reach him?",
    layer: "experience",
    intentDescription: "Direct contact, LinkedIn, GitHub, location, and work authorization details.",
    nextViews: ["hero", "projects", "contact"],
  },
};
