import { CONFIG } from "@/lib/data";
import { CAREER_STATES, VIEW_GOALS } from "@/lib/experience-model";
import type { ViewKey } from "@/lib/types";

export const LOCAL_MODEL_LABEL = "Qwen 2.5 1.5B";

const DEFAULT_SUGGESTIONS = ["who is Shahriar", "show me projects", "what are his skills", "compare skills to experience", "navigation steps", "his working style", "why hire him", "show experience"];

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

type IntentPattern = {
  name: string;
  keywords: string[];
  exclusive?: string[];
  weight: number;
  answer: (input: string) => string;
};

function isQuestionLike(input: string): boolean {
  const text = input.toLowerCase().trim();
  return text.endsWith("?");
}

export function fuzzyMatchSkillOrTech(input: string): Array<{ term: string; source: "skill" | "experience" | "project"; context: string; group?: string }> {
  const lower = input.toLowerCase();
  const results: Array<{ term: string; source: "skill" | "experience" | "project"; context: string; group?: string }> = [];

  for (const group of CONFIG.skills) {
    for (const item of group.items) {
      if (item.toLowerCase().includes(lower) || lower.includes(item.toLowerCase())) {
        results.push({ term: item, source: "skill", context: group.group, group: group.group });
      }
    }
  }

  for (const exp of CONFIG.experience) {
    for (const point of exp.points) {
      if (point.toLowerCase().includes(lower)) {
        results.push({ term: exp.role, source: "experience", context: point.slice(0, 120) });
      }
    }
  }

  for (const project of CONFIG.projects) {
    for (const tech of project.stack) {
      if (tech.toLowerCase().includes(lower) || lower.includes(tech.toLowerCase())) {
        results.push({ term: tech, source: "project", context: `${project.name}: ${project.outcome.slice(0, 100)}` });
      }
    }
  }

  return results.slice(0, 5);
}

export function extractProjectName(input: string): string | null {
  let name = input.replace(/^(?:tell me about|show me|about|project|what is|describe)\s+/i, "").trim();
  name = name.replace(/[?.!]+$/, "").trim();
  return name.length > 2 ? name : null;
}

export function extractTechName(input: string): string | null {
  let tech = input.replace(/^(?:does he know|experience with|familiar with|proficient in|worked with|knowledge of|skill in|tool for)\s+/i, "").trim();
  tech = tech.replace(/[?.!]+$/, "").trim();
  return tech.length > 1 ? tech : null;
}

export function extractRoleName(input: string): string | null {
  let role = input.replace(/^(?:summary for|fit for|role fit|qualified for|suitable for|position|role)\s+/i, "").trim();
  role = role.replace(/\s+role$/i, "").trim();
  role = role.replace(/[?.!]+$/, "").trim();
  return role.length > 2 ? role : null;
}

export function extractTwoEntities(input: string): [string, string] | null {
  const normalized = input.replace(/^compare\s+|^show\s+|^tell\s+/i, "").trim();
  const parts = normalized.split(/\s+(?:vs|versus|and|or|to)\s+/i);
  if (parts.length >= 2) return [parts[0].trim(), parts[1].trim()];
  return null;
}

function getRelevantProjectIndexes(input: string): number[] {
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

function answerAboutBio(): string {
  const profile = CONFIG.profile.split(".")[0] + ".";
  const edu = CONFIG.education.map((e) => `• 🎓 ${e.degree} — ${e.school} (${e.period})`).join("\n");
  return `${profile}\n\n📍 ${CONFIG.location} · ${CONFIG.workAuth}\n\n🎓 Education:\n${edu}\n\n💭 ${CONFIG.philosophy}`;
}

function answerHireSynthesis(): string {
  const years = CONFIG.heroStats[0].value;
  const sla = CONFIG.heroStats[1].value;
  const regions = CONFIG.heroStats[2].value;
  const skills = CONFIG.skills.map((s) => s.group).join(", ");
  return `📊 **Experience:** ${years}+ years · ${sla} SLA · ${regions} regions\n\n🛠️ **Capabilities:** ${skills}\n\n⭐ **Qualities:** ${CONFIG.qualities.slice(0, 3).join(" · ")}\n\n💪 ${CONFIG.workingStyle.split(".")[0]}.`;
}

function answerStrengthsQualities(): string {
  return `💪 **Working Style:** ${CONFIG.workingStyle.split(".")[0]}.\n\n❤️ **Qualities:**\n${CONFIG.qualities.map((q) => `• ${q}`).join("\n")}\n\n📋 **Principles:**\n${CONFIG.principles.map((p) => `• ${p}`).join("\n")}`;
}

function answerProjectDetail(project: (typeof CONFIG.projects)[number]): string {
  return `📁 **${project.name}**\n\n📖 **Context:** ${project.context}\n\n⚙️ **Implementation:** ${project.implementation}\n\n✅ **Outcome:** ${project.outcome}\n\n🔧 **Stack:** ${project.stack.join(", ")}\n\n📝 **Lessons:** ${project.lessons}`;
}

function answerSkillLookup(tech: string, matches: Array<{ term: string; source: string; context: string; group?: string }>): string {
  if (matches.length === 0) {
    const groups = CONFIG.skills.map((s) => s.group).join(", ");
    return `❓ I couldn't find "${tech}" in Shahriar's capability set.\n\n🔧 Known areas: ${groups}`;
  }
  return `✅ Yes, "${tech}" is in Shahriar's capability set.\n\n${matches.map((m) => `• ${m.term} (${m.source}): ${m.context.slice(0, 80)}`).join("\n")}`;
}

function answerCompare(a: string, b: string): string {
  const projectA = CONFIG.projects.find((p) => p.name.toLowerCase().includes(a.toLowerCase()));
  const projectB = CONFIG.projects.find((p) => p.name.toLowerCase().includes(b.toLowerCase()));
  if (projectA && projectB) {
    return `📊 **${projectA.name}** vs **${projectB.name}**\n\n📁 ${projectA.name}: ${projectA.outcome.slice(0, 100)}\n🔧 Stack: ${projectA.stack.join(", ")}\n\n📁 ${projectB.name}: ${projectB.outcome.slice(0, 100)}\n🔧 Stack: ${projectB.stack.join(", ")}`;
  }
  const skillA = CONFIG.skills.find((s) => s.group.toLowerCase().includes(a.toLowerCase()));
  const skillB = CONFIG.skills.find((s) => s.group.toLowerCase().includes(b.toLowerCase()));
  if (skillA && skillB) {
    return `📊 **${skillA.group}** vs **${skillB.group}**\n\n🔧 ${skillA.group}: ${skillA.items.join(", ")}\n\n🔧 ${skillB.group}: ${skillB.items.join(", ")}`;
  }
  return `🔄 I can compare projects or skill groups. Try:\n• "compare [project A] vs [project B]"\n• "compare [skill group] and [skill group]"`;
}

function answerRoleFit(role: string): string {
  const state = CAREER_STATES.find((s) => role.toLowerCase().includes(s.id.split("-")[0]) || s.label.toLowerCase().includes(role.toLowerCase()));
  if (state) {
    return `📋 **Role fit: ${role}**\n\n📌 ${state.label} — ${state.summary}\n\n${state.answers.map((a) => `• ${a}`).join("\n")}`;
  }
  const relevantExp = CONFIG.experience.filter((e) => e.role.toLowerCase().includes(role.toLowerCase()) || e.company.toLowerCase().includes(role.toLowerCase()));
  if (relevantExp.length > 0) {
    return `📋 **Role fit: ${role}**\n\n💼 **Relevant experience:**\n${relevantExp.map((e) => `• ${e.role} at ${e.company} (${e.period})`).join("\n")}\n\n🔧 **Key capabilities:** ${CONFIG.skills
      .slice(0, 3)
      .map((s) => s.items.slice(0, 3).join(", "))
      .join(" · ")}`;
  }
  return `❓ No specific match for "${role}". Shahriar's career: ${CAREER_STATES.map((s) => s.label).join(" → ")}. Try "Technical Operations" or "Integration Engineer".`;
}

function answerContact(): string {
  return `${CONFIG.contact
    .filter((c) => c.href)
    .map((c) => `🔗 **${c.label}:** ${c.value}`)
    .join("\n")}`;
}

function answerProjectsOverview(): string {
  return `🚀 **${CONFIG.projects.length} projects:**\n\n${CONFIG.projects.map((p, i) => `${i + 1}. ${p.name}`).join("\n")}\n\n💡 Ask "tell me about [project name]" for details.`;
}

function answerExperienceCareer(): string {
  return `💼 **Career path:**\n${CONFIG.experience.map((e) => `• ${e.role} @ ${e.company} (${e.period})`).join("\n")}\n\n📅 ${CONFIG.heroStats[0].value}+ years total`;
}

function answerRecruiterPath(): string {
  return `🗺️ **Navigate Shahriar's story:**\n\n1️⃣ **Experience:** ${CAREER_STATES.map((s) => s.label).join(" → ")}\n2️⃣ **Projects:** ${CONFIG.projects.length} case studies\n3️⃣ **Skills:** ${CONFIG.skills.length} capability groups\n4️⃣ **Stats:** ${CONFIG.heroStats[0].value}+ yrs · ${CONFIG.heroStats[1].value} SLA · ${CONFIG.heroStats[2].value} regions\n5️⃣ **Contact:** 📬 Reach out\n\n💡 Use "go to [section]" to jump there.`;
}

function answerSkillsTools(): string {
  return `🔧 **Skill groups:**\n${CONFIG.skills.map((s) => `• **${s.group}:** ${s.items.slice(0, 4).join(", ")}`).join("\n")}\n\n🗣️ **Languages:** ${CONFIG.languages.slice(0, 3).join(" · ")}`;
}

function answerEducationCerts(): string {
  return `📜 **Education:**\n${CONFIG.education.map((e) => `• ${e.degree} — ${e.school} (${e.period})`).join("\n")}\n\n🏅 **Certifications:**\n${CONFIG.certifications
    .slice(0, 4)
    .map((c) => `• ${c.name}`)
    .join("\n")}`;
}

function answerLanguages(): string {
  return `🌐 **Languages:**\n${CONFIG.languages.map((l) => `• ${l}`).join("\n")}`;
}

function answerVisionPrinciples(): string {
  return `💭 **Philosophy:** ${CONFIG.philosophy}\n\n📐 **Principles:**\n${CONFIG.principles.map((p) => `• ${p}`).join("\n")}`;
}

function catchAll(activeView: ViewKey): string {
  return `👋 I can help with:\n\n👤 Who Shahriar is\n💼 Experience & career\n🚀 Projects & case studies\n🔧 Skills & tools\n📊 Why hire him\n💪 Working style\n📬 Contact\n\n📍 Currently on: ${formatViewName(activeView)}`;
}

function formatViewName(view: ViewKey): string {
  if (view === "hero") return "Home";
  return view.charAt(0).toUpperCase() + view.slice(1);
}

const intentPatterns: IntentPattern[] = [
  {
    name: "greeting",
    keywords: ["hi", "hello", "hey", "how are you", "what's up", "greetings", "good morning", "good afternoon", "what"],
    exclusive: ["projects", "skills", "experience", "contact", "compare", "who"],
    weight: 3,
    answer: () => "Hello! 👋 I'm Shahriar's portfolio guide. I can help you explore his projects, experience, or skills. What would you like to know?",
  },
  {
    name: "who_is",
    keywords: ["who", "shahriar", "abir", "about", "biography", "bio", "background", "profile", "tell"],
    exclusive: ["projects", "skills", "experience", "contact", "compare", "vs", "versus"],
    weight: 3,
    answer: answerAboutBio,
  },
  {
    name: "hire_synthesis",
    keywords: ["hire", "hiring", "recruiter", "assessment", "evaluation", "fit", "candidate", "strengths", "synthesis", "why", "recruiter"],
    exclusive: ["contact", "email", "linkedin"],
    weight: 3,
    answer: answerHireSynthesis,
  },
  {
    name: "strengths_qualities",
    keywords: ["strengths", "qualities", "style", "working", "principles", "values", "calm", "pressure", "problem", "solver", "translator", "solution"],
    exclusive: ["projects", "skills", "compare", "contact", "education"],
    weight: 2,
    answer: answerStrengthsQualities,
  },
  {
    name: "project_detail",
    keywords: ["project", "case", "study", "built", "implemented", "created", "developed", "tell", "about"],
    exclusive: ["skills", "experience", "contact", "education", "languages", "vision"],
    weight: 3,
    answer: (input: string) => {
      const name = extractProjectName(input);
      if (name) {
        const matches = getRelevantProjectIndexes(name);
        if (matches.length > 0) {
          return answerProjectDetail(CONFIG.projects[matches[0]]);
        }
      }
      return answerProjectsOverview();
    },
  },
  {
    name: "projects_overview",
    keywords: ["projects", "portfolio", "work", "built", "create", "implement", "case", "samples", "showcase"],
    exclusive: ["skills", "experience", "contact", "education", "languages", "vision", "about", "bio"],
    weight: 2,
    answer: answerProjectsOverview,
  },
  {
    name: "skill_lookup",
    keywords: ["know", "experience", "familiar", "proficient", "worked", "skill", "tool", "technology", "capable", "competent"],
    exclusive: ["projects", "experience", "contact", "about", "bio", "education", "languages", "vision"],
    weight: 3,
    answer: (input: string) => {
      const tech = extractTechName(input);
      if (tech && !/^(what|how|which|his|all|some|any|the)\b/i.test(tech)) {
        const matches = fuzzyMatchSkillOrTech(tech);
        return answerSkillLookup(tech, matches);
      }
      return answerSkillsTools();
    },
  },
  {
    name: "compare",
    keywords: ["compare", "versus", "vs", "difference", "relate", "relationship", "between", "which", "better"],
    exclusive: [],
    weight: 4,
    answer: (input: string) => {
      const entities = extractTwoEntities(input);
      if (entities) {
        return answerCompare(entities[0], entities[1]);
      }
      return `I can compare projects or skill groups. Try "compare [project A] vs [project B]" or "compare [skill group] and [skill group]".`;
    },
  },
  {
    name: "role_fit",
    keywords: ["summary", "fit", "qualified", "suitable", "position", "role", "match"],
    exclusive: ["projects", "about", "bio", "contact", "languages", "vision", "education"],
    weight: 3,
    answer: (input: string) => {
      const role = extractRoleName(input);
      if (role) {
        return answerRoleFit(role);
      }
      return answerHireSynthesis();
    },
  },
  {
    name: "contact",
    keywords: ["contact", "email", "linkedin", "github", "reach", "connect", "message", "talk"],
    exclusive: [],
    weight: 2,
    answer: answerContact,
  },
  {
    name: "experience_career",
    keywords: ["experience", "career", "history", "resume", "cv", "jobs", "roles", "employment", "work", "timeline", "background"],
    exclusive: ["projects", "skills", "contact", "about", "bio", "education", "languages"],
    weight: 2,
    answer: answerExperienceCareer,
  },
  {
    name: "recruiter_path",
    keywords: ["navigation", "steps", "recruiter", "guide", "tour", "walk", "start", "around", "path", "where", "direction"],
    exclusive: ["contact", "education", "languages"],
    weight: 2,
    answer: answerRecruiterPath,
  },
  {
    name: "skills_tools",
    keywords: ["skills", "tools", "capabilities", "competencies", "matrix", "stack", "technical", "able", "can"],
    exclusive: ["projects", "experience", "contact", "about", "bio", "education", "languages", "vision"],
    weight: 2,
    answer: answerSkillsTools,
  },
  {
    name: "education_certs",
    keywords: ["education", "degree", "university", "college", "certification", "certificate", "academic", "study", "studied", "learn", "training"],
    exclusive: ["projects", "experience", "contact", "about", "skills", "languages"],
    weight: 3,
    answer: answerEducationCerts,
  },
  {
    name: "languages",
    keywords: ["languages", "speak", "fluent", "bilingual", "german", "bangla", "hindi", "english"],
    exclusive: ["projects", "experience", "contact", "skills", "education"],
    weight: 3,
    answer: answerLanguages,
  },
  {
    name: "vision_principles",
    keywords: ["vision", "principles", "philosophy", "direction", "mission", "values", "beliefs", "approach", "design", "thinking", "future", "care"],
    exclusive: ["projects", "skills", "experience", "contact"],
    weight: 2,
    answer: answerVisionPrinciples,
  },
];

function normalizeInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/^(?:can you|i want|i need|i'd like|do you have|what about|tell me|let me|show me|show|give me)\s+(?:me|us|him|her|them)?\s*/i, "")
    .replace(/^(?:please|just)\s*/i, "")
    .replace(/^(?:about|the|a|an)\s+/i, "")
    .trim();
}

const SCORE_THRESHOLD = 0.25;

function scoreIntent(input: string, pattern: IntentPattern): number {
  const lowerInput = input.toLowerCase();
  const normalized = normalizeInput(input);

  const hasExclusive = pattern.exclusive?.some((kw) => lowerInput.includes(kw)) ?? false;
  if (hasExclusive) return 0;

  const matchedKeywords = pattern.keywords.filter((kw) => lowerInput.includes(kw));
  const keywordScore = matchedKeywords.length / Math.max(pattern.keywords.length, 1);

  // Phrase bonus: if the intent name contains the normalized input
  const phraseBonus = pattern.name.replace(/_/g, " ").includes(normalized) ? 0.2 : 0;

  // Compound match bonus: if multiple keywords match as a phrase
  const compoundBonus = matchedKeywords.length >= 3 ? 0.15 : matchedKeywords.length >= 2 ? 0.05 : 0;

  return keywordScore * pattern.weight + phraseBonus + compoundBonus;
}

function buildClarifyingQuestion(input: string): { text: string; suggestions: string[] } {
  const lowerInput = input.toLowerCase();
  const isQuestion = isQuestionLike(input);

  const scored = intentPatterns
    .map((p) => ({ pattern: p, score: scoreIntent(lowerInput, p) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const suggestions: string[] = [];

  if (scored.length > 0) {
    const topIntents = scored.slice(0, 3);
    for (const hit of topIntents) {
      const nameMap: Record<string, string> = {
        who_is: "about Shahriar",
        hire_synthesis: "hiring or evaluation",
        strengths_qualities: "strengths and working style",
        project_detail: "a specific project",
        projects_overview: "projects he has built",
        skill_lookup: "a specific technology",
        compare: "comparing projects or skills",
        role_fit: "role fit",
        contact: "contact information",
        experience_career: "experience and career",
        recruiter_path: "a guided tour",
        skills_tools: "skills and tools",
        education_certs: "education and certifications",
        languages: "languages he speaks",
        vision_principles: "vision and principles",
      };
      suggestions.push(nameMap[hit.pattern.name] || hit.pattern.name);
    }
  }

  if (suggestions.length === 0) {
    return {
      text: `I didn't quite understand that. You can ask me about Shahriar's background, experience, projects, skills, or anything related to his professional portfolio.`,
      suggestions: ["who is Shahriar", "show me projects", "what are his skills"],
    };
  }

  const uniqueSuggestions = [...new Set(suggestions)].slice(0, 3);
  const questionText = isQuestion
    ? `I'm a specialized guide for Shahriar's portfolio. I might not understand everything, but I'm great at answering questions about his work! `
    : `I might have misunderstood. As a specialized portfolio guide, I'm best at answering questions about Shahriar's experience and skills. `;

  return {
    text: `${questionText} Are you asking about ${uniqueSuggestions.join(", or ")}?`,
    suggestions: uniqueSuggestions,
  };
}

export function buildFallbackAnswer(userText: string, activeView: ViewKey): { text: string; suggestions?: string[] } {
  const lowerInput = userText.toLowerCase().trim();
  if (!lowerInput) return { text: catchAll(activeView), suggestions: DEFAULT_SUGGESTIONS };

  const scored = intentPatterns
    .map((p) => ({
      pattern: p,
      score: scoreIntent(lowerInput, p),
      answer: p.answer,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 || scored[0].score < SCORE_THRESHOLD) {
    return buildClarifyingQuestion(userText);
  }

  return { text: scored[0].answer(userText), suggestions: DEFAULT_SUGGESTIONS };
}

export function inferVisitorProfile(userText: string, currentProfile: VisitorProfile): VisitorProfile {
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

function formatVisitorProfile(visitorProfile: VisitorProfile): string {
  return [
    `- Name: ${visitorProfile.name || "Unknown"}`,
    `- Role: ${visitorProfile.role || "Unknown"}`,
    `- Industry: ${visitorProfile.industry || "Unknown"}`,
    `- Interests: ${visitorProfile.interests?.join(", ") || "None"}`,
    `- Session Goal: ${visitorProfile.goal || visitorProfile.intent || "Exploring"}`,
  ].join("\n");
}

function formatRouterMemory(routerMemory?: RouterMemory): string {
  if (!routerMemory) return "- Visitor Type: Unknown\n- Detected Interests: None\n- Previous Views: None";
  return [
    `- Visitor Type: ${routerMemory.visitorType || "Unknown"}`,
    `- Detected Interests: ${routerMemory.detectedInterests.join(", ") || "None"}`,
    `- Previous Views: ${routerMemory.previousViews.join(", ") || "None"}`,
  ].join("\n");
}

function formatDetailedProjects(projectIndexes: number[]): string {
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

function formatCareerModel(): string {
  return CAREER_STATES.map((state) => `- ${state.label}: ${state.summary}`).join("\n");
}

function formatViewGoals(): string {
  return Object.entries(VIEW_GOALS)
    .map(([view, goal]) => `- ${view}: ${goal.coreQuestion}`)
    .join("\n");
}

function getInteractionMode(input: string): string {
  const lowerInput = input.toLowerCase();
  if (/tour|guide|walk me through|where should i start|show me around/.test(lowerInput)) return "guided_tour";
  if (/compare|relate|relationship|map|connect|versus| vs |fit|match/.test(lowerInput)) return "cross_view_reasoning";
  if (/summary|brief|pitch|synthesis|cv|resume|hire|hiring|recruiter|assessment/.test(lowerInput)) return "synthesis";
  if (/contact|email|linkedin|github|reach/.test(lowerInput)) return "contact";
  return "answer";
}

export function buildContextPack(userText: string, activeView: ViewKey, visitorProfile: VisitorProfile, routerMemory?: RouterMemory): string {
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

export function buildSystemPrompt(userText: string, activeView: ViewKey, visitorProfile: VisitorProfile, routerMemory?: RouterMemory): string {
  return `You are Shahriar's strictly constrained local AI tour guide and portfolio knowledge source. You run fully inside the visitor's browser.

CORE RULES - MANDATORY:
1. You are NOT a general-purpose AI. You are a portfolio assistant.
2. Use ONLY the provided LOCAL TOOL CONTEXT as your source of truth.
3. NEVER generate code, scripts, technical snippets, or tutorials (e.g., Python, Bash, SQL).
4. NEVER provide technical advice, security advice, or instructions outside of this portfolio's facts.
5. Refer to Shahriar in the third person ("he", "Shahriar", "his").
6. If a user asks for anything outside of Shahriar's professional profile (e.g., code, general knowledge, jokes, unrelated advice), you MUST politely decline.

COOPERATION WITH THE REFERENCE GUIDE:
A quick-reference system called "the reference guide" may have already provided a brief answer before you. Your role is to acknowledge that and provide a deeper, more contextual response. Start your answer by thanking the reference guide briefly, then expand.
Example: "Thanks for the quick overview! Let me expand on that..."
Do NOT waste tokens re-explaining that you are an AI or that the reference guide exists — just acknowledge briefly and dive into the substance.

NAVIGATION CAPABILITY:
You can self-navigate around the website. If the user asks to see a section, or if you assess that moving to a specific page would be helpful to answer their query, you must include a specific command at the end of your response.
Supported views: hero, about, projects, experience, skills, stack, vision, stats, contact.

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
