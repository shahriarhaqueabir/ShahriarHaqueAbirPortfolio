const includesAny = (text, words) => words.some((word) => text.includes(word));

const audienceRules = [
  ["devops", ["devops", "sre", "ops", "reliability", "infrastructure", "incident", "uptime"]],
  ["beginner", ["beginner", "simple", "explain like", "entry level", "junior", "non technical", "plain english"]],
  ["technicalInterviewer", ["interview", "system design", "deep dive", "architecture", "debug", "code"]],
  ["engineer", ["engineer", "technical", "stack", "api", "backend", "frontend", "rag", "sql", "docker"]],
  ["founder", ["founder", "startup", "business", "roi", "growth", "gtm", "customer", "value"]],
  ["creativeDirector", ["creative", "brand", "story", "visual", "cinematic", "design", "portfolio"]],
  ["recruiter", ["recruiter", "resume", "cv", "hire", "experience", "role", "skills"]],
];

export const analyzeIntent = (input, sessionMemory = {}) => {
  const text = String(input || "").toLowerCase();
  const memoryFocus = sessionMemory.preferredFocus || "overview";
  const memoryTheme = sessionMemory.preferredTheme || "cinematic";

  const audience =
    audienceRules.find(([, words]) => includesAny(text, words))?.[0] ||
    sessionMemory.audience ||
    "recruiter";

  const focus = includesAny(text, ["bio", "birth", "origin", "journey", "story", "where", "from"])
    ? "bio"
    : includesAny(text, ["project", "portfolio", "build", "case study", "diagram", "infographic"])
    ? "projects"
    : includesAny(text, ["skill", "stack", "tool", "technology", "tree", "heatmap", "game"])
      ? "skills"
      : includesAny(text, ["experience", "timeline", "career", "job", "work"])
        ? "experience"
        : includesAny(text, ["architecture", "system", "rag", "backend", "infrastructure"])
          ? "systems"
          : includesAny(text, ["contact", "email", "linkedin", "hire"])
            ? "contact"
            : memoryFocus;

  const depth = includesAny(text, ["deep", "detail", "technical", "architecture", "interview"])
    ? "deep"
    : includesAny(text, ["quick", "summary", "brief", "short"])
      ? "brief"
      : "guided";

  const preferredStyle = includesAny(text, ["90", "retro", "arcade", "game"])
    ? "retro-90s"
    : includesAny(text, ["terminal", "cli", "command"])
    ? "retro-terminal"
    : includesAny(text, ["dashboard", "metrics", "technical"])
      ? "technical-dashboard"
      : includesAny(text, ["minimal", "clean"])
        ? "swiss-minimal"
        : includesAny(text, ["blueprint", "architecture"])
          ? "blueprint-interface"
          : includesAny(text, ["creative", "studio", "visual"])
            ? "creative-studio"
            : memoryTheme;

  const tone = audience === "beginner"
    ? "plain-language"
    : audience === "technicalInterviewer" || audience === "engineer" || audience === "devops"
    ? "precise"
    : audience === "founder"
      ? "commercial"
      : audience === "creativeDirector"
        ? "cinematic"
        : "credible";

  const probableGoal = focus === "contact"
    ? "contact"
    : audience === "beginner"
      ? "understand without jargon"
      : audience === "devops"
        ? "evaluate operational reliability"
        : audience === "technicalInterviewer"
      ? "evaluate technical depth"
      : audience === "founder"
        ? "understand business impact"
        : audience === "engineer"
          ? "inspect implementation thinking"
          : audience === "creativeDirector"
            ? "feel narrative and presentation quality"
            : "screen candidate fit";

  return {
    focus,
    audience,
    tone,
    depth,
    preferredStyle,
    probableGoal,
    memoryHints: sessionMemory.exploredTopics || [],
  };
};
