import { portfolioKnowledgeBase } from "./portfolioKnowledge.js";

export const ALLOWED_COMPONENTS = [
  "hero",
  "timeline",
  "terminal",
  "skillGraph",
  "caseStudy",
  "architectureDiagram",
  "animatedStats",
  "chatPanel",
  "cinematicSection",
  "codeWindow",
  "memoryMap",
  "interactiveCanvas",
  "cvGraphLog",
  "motionStory",
  "bioJourney",
  "skillTree",
  "projectDiagram",
  "experienceLens",
];

export const ALLOWED_THEMES = [
  "cinematic",
  "technical-dashboard",
  "retro-terminal",
  "retro-90s",
  "swiss-minimal",
  "futuristic-lab",
  "blueprint-interface",
  "creative-studio",
  "glassmorphic",
  "claude-chat",
  "kinetic-shapes",
  "motion-blocks",
  "cyberpunk",
];

export const ALLOWED_LAYOUTS = ["focus-stack", "split-screen", "dashboard-grid", "cinematic-scroll", "immersive-page"];
export const ALLOWED_ANIMATIONS = [
  "streaming-text",
  "node-connections",
  "panel-materialization",
  "progressive-reveal",
  "metric-count",
];

const collectionMap = {
  bio: "bioJourney",
  projects: "projects",
  skills: "skills",
  experience: "experiences",
  systems: "projects",
  contact: "profile",
  overview: "stories",
};

const byCollection = (context, collection) =>
  context.filter((entry) => entry.collection === collection).map((entry) => entry.item);

const topProject = (context) => byCollection(context, "projects")[0] || portfolioKnowledgeBase.projects[0];

const clusterTitleMap = {
  "ai-systems": "The machine room lights up",
  "automation-growth": "Signals become motion",
  "support-reliability": "Reliability, rendered like a 90s control room",
  "customer-systems": "Customer complexity becomes a calm conversation",
  infrastructure: "Infrastructure as a living blueprint",
  enablement: "Knowledge transfer in motion",
  positioning: "A glass-clear professional map",
  "bio-journey": "From signal-curious kid to AI-native operator",
  "skill-tree": "Skills unlocked like a playable map",
  "project-diagrams": "Projects as diagrams, loops, and evidence",
};

const makeHero = (intent, context, cvGraph) => ({
  id: "section-hero",
  type: "hero",
  contentSource: "profile",
  priority: 1,
  visualStyle: cvGraph?.primaryCluster?.theme || intent.preferredStyle,
  props: {
    eyebrow: `${intent.audience.replace(/([A-Z])/g, " $1").trim()} / ${cvGraph?.primaryCluster?.label || "Portfolio"}`,
    title:
      intent.focus === "contact"
        ? "Ready to connect"
        : clusterTitleMap[cvGraph?.primaryCluster?.id] || "A hidden page generated around your prompt",
    summary:
      intent.focus === "contact"
        ? `Reach ${portfolioKnowledgeBase.profile.name} at ${portfolioKnowledgeBase.profile.contact.email}.`
        : portfolioKnowledgeBase.profile.summary,
    chips: [intent.focus, intent.depth, intent.probableGoal, cvGraph?.primaryCluster?.theme || intent.preferredStyle],
    primaryAction: "Ask for another hidden page",
  },
});

const makeTimeline = () => ({
  id: "section-timeline",
  type: "timeline",
  contentSource: "experiences",
  priority: 3,
  visualStyle: "structured",
  props: {
    title: "Career Arc",
    items: portfolioKnowledgeBase.experiences,
  },
});

const makeSkills = (context) => ({
  id: "section-skills",
  type: "skillGraph",
  contentSource: "skills",
  priority: 3,
  visualStyle: "interactive",
  props: {
    title: "Skill Graph",
    groups: byCollection(context, "skills").length ? byCollection(context, "skills") : portfolioKnowledgeBase.skills,
  },
});

const makeBioJourney = () => ({
  id: "section-bio-journey",
  type: "bioJourney",
  contentSource: "bioJourney",
  priority: 2,
  visualStyle: "story-map",
  props: {
    title: "Public Origin Story",
    privacyBoundary: portfolioKnowledgeBase.profile.privacyBoundary,
    beats: portfolioKnowledgeBase.bioJourney,
  },
});

const makeSkillTree = () => ({
  id: "section-skill-tree",
  type: "skillTree",
  contentSource: "skills",
  priority: 2,
  visualStyle: "game-heatmap",
  props: {
    title: "Playable Skill Tree",
    subtitle: "Each node shows current strength, evidence, and unlocked behaviors.",
    groups: portfolioKnowledgeBase.skills,
  },
});

const makeCaseStudies = (intent, context) => ({
  id: "section-case-studies",
  type: "caseStudy",
  contentSource: collectionMap[intent.focus] || "projects",
  priority: 2,
  visualStyle: intent.depth === "deep" ? "evidence-first" : "compact",
  props: {
    title: intent.focus === "systems" ? "Systems Evidence" : "Selected Work",
    audience: intent.audience,
    projects: byCollection(context, "projects").length ? byCollection(context, "projects") : portfolioKnowledgeBase.projects,
  },
});

const makeProjectDiagram = (intent, context) => ({
  id: "section-project-diagram",
  type: "projectDiagram",
  contentSource: "projects",
  priority: 2,
  visualStyle: "infographic-flow",
  props: {
    title: "Project Diagram Board",
    audience: intent.audience,
    projects: byCollection(context, "projects").length ? byCollection(context, "projects") : portfolioKnowledgeBase.projects,
  },
});

const makeExperienceLens = (intent) => ({
  id: "section-experience-lens",
  type: "experienceLens",
  contentSource: "experiences",
  priority: 2,
  visualStyle: "audience-lenses",
  props: {
    title: "Work Experience Lenses",
    activeAudience: intent.audience === "engineer" || intent.audience === "technicalInterviewer" ? "devops" : intent.audience,
    modes: portfolioKnowledgeBase.productExplorationModes,
    experiences: portfolioKnowledgeBase.experiences,
  },
});

const makeArchitecture = (intent, context) => {
  const project = topProject(context);
  return {
    id: "section-architecture",
    type: "architectureDiagram",
    contentSource: project.id,
    priority: 2,
    visualStyle: "controlled-blueprint",
    props: {
      title: `${project.title} Flow`,
      nodes: ["User prompt", "Intent analysis", "Retrieval", "Blueprint", "Validated renderer"],
      caption:
        "The frontend renders approved components from structured blueprints; no raw HTML or arbitrary component generation is allowed.",
    },
  };
};

const makeStats = () => ({
  id: "section-stats",
  type: "animatedStats",
  contentSource: "achievements",
  priority: 4,
  visualStyle: "metric-strip",
  props: {
    title: "Operational Proof",
    stats: portfolioKnowledgeBase.achievements,
  },
});

const makeMotionStory = (intent, cvGraph) => {
  const primary = cvGraph?.records?.[0];
  const secondary = cvGraph?.records?.[1];
  return {
    id: "section-motion-story",
    type: "motionStory",
    contentSource: primary?.id || "cv-bank",
    priority: 2,
    visualStyle: cvGraph?.primaryCluster?.theme || "glassmorphic",
    props: {
      title: primary?.label || "Narrative Engine",
      body:
        primary?.text ||
        "The page waits until intent arrives, then turns weighted CV evidence into a visual story.",
      supporting: secondary?.text || "Each section is animated through approved visual components.",
      cluster: cvGraph?.primaryCluster,
      records: cvGraph?.records?.slice(0, 4) || [],
    },
  };
};

const makeCanvas = (cvGraph) => ({
  id: "section-interactive-canvas",
  type: "interactiveCanvas",
  contentSource: cvGraph?.primaryCluster?.id || "visual_system",
  priority: 3,
  visualStyle: cvGraph?.primaryCluster?.theme || "kinetic-shapes",
  props: {
    title: `${cvGraph?.primaryCluster?.label || "Portfolio"} Visual Field`,
    theme: cvGraph?.primaryCluster?.theme || "kinetic-shapes",
    nodes: cvGraph?.clusters?.map((cluster) => cluster.label) || ["Intent", "CV Bank", "Blueprint"],
  },
});

const makeCvGraphLog = (cvGraph) => ({
  id: "section-cv-graph-log",
  type: "cvGraphLog",
  contentSource: "cv_bank_graph",
  priority: 8,
  visualStyle: "weighted-cluster-log",
  props: {
    title: "CV Bank Retrieval Log",
    cluster: cvGraph?.primaryCluster,
    records: cvGraph?.records || [],
    clusters: cvGraph?.clusters || [],
  },
});

const makeTerminal = (intent, context, cvGraph) => ({
  id: "section-terminal",
  type: "terminal",
  contentSource: "retrieved_context",
  priority: 5,
  visualStyle: "audit-log",
  props: {
    title: "Planner Trace",
    lines: [
      `intent.focus = ${intent.focus}`,
      `intent.audience = ${intent.audience}`,
      `intent.depth = ${intent.depth}`,
      `retrieved.records = ${context.length}`,
      `cv.cluster = ${cvGraph?.primaryCluster?.id || "none"}`,
      `page.theme = ${cvGraph?.primaryCluster?.theme || intent.preferredStyle}`,
      "renderer.policy = whitelist-only",
    ],
  },
});

const makeMemoryMap = (memory) => ({
  id: "section-memory",
  type: "memoryMap",
  contentSource: "session_memory",
  priority: 6,
  visualStyle: "session-map",
  props: {
    title: "Session Memory",
    memory,
  },
});

const makeCodeWindow = () => ({
  id: "section-contract",
  type: "codeWindow",
  contentSource: "blueprint_schema",
  priority: 7,
  visualStyle: "schema",
  props: {
    title: "Blueprint Contract",
    code: `{
  "layout": "focus-stack",
  "theme": "technical-dashboard",
  "sections": [
    { "type": "hero", "contentSource": "profile" },
    { "type": "caseStudy", "contentSource": "projects" }
  ]
}`,
  },
});

export const planExperience = ({ intent, context, memory, cvGraph }) => {
  const deepTechnical = intent.depth === "deep" || intent.audience === "technicalInterviewer";
  const focusSections = {
    bio: [makeBioJourney(), makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeExperienceLens(intent)],
    projects: [makeProjectDiagram(intent, context), makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeCaseStudies(intent, context), makeSkills(context), makeStats()],
    skills: [makeSkillTree(), makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeSkills(context), makeCaseStudies(intent, context), makeStats()],
    experience: [makeExperienceLens(intent), makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeTimeline(), makeStats(), makeCaseStudies(intent, context)],
    systems: [makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeArchitecture(intent, context), makeCaseStudies(intent, context), makeSkills(context)],
    contact: [makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeStats(), makeTimeline()],
    overview: [makeMotionStory(intent, cvGraph), makeCanvas(cvGraph), makeCaseStudies(intent, context), makeTimeline(), makeSkills(context)],
  };

  const sections = [
    makeHero(intent, context, cvGraph),
    ...(focusSections[intent.focus] || focusSections.overview),
    ...(deepTechnical ? [makeArchitecture(intent, context), makeCodeWindow()] : []),
    makeCvGraphLog(cvGraph),
    makeTerminal(intent, context, cvGraph),
    makeMemoryMap(memory),
  ];

  const theme = cvGraph?.primaryCluster?.theme || intent.preferredStyle;

  return {
    id: `blueprint-${Date.now()}`,
    layout: deepTechnical ? "dashboard-grid" : "immersive-page",
    theme: ALLOWED_THEMES.includes(theme) ? theme : "glassmorphic",
    pacing: intent.depth === "brief" ? "quick-reveal" : "progressive-reveal",
    narrativeStyle:
      intent.audience === "founder"
        ? "business-impact"
        : intent.audience === "engineer" || intent.audience === "technicalInterviewer"
          ? "systems-engineering"
          : "cinematic-credibility",
    animations: ["streaming-text", "panel-materialization", "progressive-reveal", "metric-count", "node-connections"],
    sections: sections
      .sort((a, b) => a.priority - b.priority)
      .map((section, index) => ({ ...section, priority: index + 1 })),
  };
};

const sanitizeString = (value) => String(value || "").replace(/[<>]/g, "");

const sanitizeProps = (props) => {
  if (Array.isArray(props)) return props.map(sanitizeProps);
  if (props && typeof props === "object") {
    return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, sanitizeProps(value)]));
  }
  return typeof props === "string" ? sanitizeString(props) : props;
};

export const validateBlueprint = (blueprint) => {
  const repaired = {
    id: sanitizeString(blueprint?.id || `blueprint-${Date.now()}`),
    layout: ALLOWED_LAYOUTS.includes(blueprint?.layout) ? blueprint.layout : "focus-stack",
    theme: ALLOWED_THEMES.includes(blueprint?.theme) ? blueprint.theme : "cinematic",
    pacing: sanitizeString(blueprint?.pacing || "progressive-reveal"),
    narrativeStyle: sanitizeString(blueprint?.narrativeStyle || "cinematic-credibility"),
    animations: (blueprint?.animations || []).filter((animation) => ALLOWED_ANIMATIONS.includes(animation)),
    sections: Array.isArray(blueprint?.sections) ? blueprint.sections : [],
  };

  repaired.sections = repaired.sections
    .filter((section) => ALLOWED_COMPONENTS.includes(section?.type))
    .map((section, index) => ({
      id: sanitizeString(section.id || `section-${index}`),
      type: section.type,
      contentSource: sanitizeString(section.contentSource || "unknown"),
      priority: Number(section.priority || index + 1),
      visualStyle: sanitizeString(section.visualStyle || "default"),
      props: sanitizeProps(section.props || {}),
    }))
    .sort((a, b) => a.priority - b.priority);

  if (!repaired.sections.length) {
    repaired.sections = [makeHero({ audience: "recruiter", focus: "overview", depth: "guided", probableGoal: "screen candidate fit", preferredStyle: "glassmorphic" }, [])];
  }

  return repaired;
};
