export const portfolioKnowledgeBase = {
  profile: {
    name: "Shahriar Haque Abir",
    shortName: "Abir",
    role: "Software Solutions Consultant",
    location: "Berlin, Germany",
    productPositioning:
      "A public, interactive professional product: explore how Shahriar thinks, builds, communicates, supports customers, and turns messy systems into usable outcomes.",
    privacyBoundary:
      "Only public/professional narrative is used. Private family, identity, and sensitive personal details are intentionally excluded.",
    contact: {
      email: "shahriar_abby@hotmail.com",
      linkedin: "https://www.linkedin.com/",
    },
    summary:
      "A solutions-focused technologist who turns fragmented customer, support, and engineering problems into structured systems, grounded automation, and clear technical narratives.",
  },
  projects: [
    {
      id: "ai-knowledge-assistant",
      title: "AI Knowledge Assistant",
      metadata: {
        status: "prototype",
        category: "AI systems",
        timeframe: "2025",
      },
      technologies: ["FastAPI", "Python", "Qdrant", "Docker", "RAG", "Embeddings"],
      tags: ["rag", "documentation", "retrieval", "support", "backend"],
      visualAssociations: ["knowledge graph", "retrieval flow", "document index"],
      narratives: {
        recruiter:
          "Built a grounded assistant that makes technical documentation searchable and answerable, reducing the distance between support questions and verified source material.",
        engineer:
          "Designed a FastAPI service around retrieval, vector search, and constrained answer generation so responses stay tied to indexed documentation.",
        founder:
          "Turns static technical content into a faster customer-support surface without asking teams to rewrite their knowledge base.",
      },
      relatedSkills: ["Python", "FastAPI", "Docker Compose", "RAG Pipeline", "Root Cause Analysis"],
      relatedIndustries: ["SaaS", "support operations", "technical documentation"],
      audienceRelevance: {
        recruiter: 0.9,
        engineer: 1,
        founder: 0.85,
        creativeDirector: 0.45,
        technicalInterviewer: 1,
      },
      importanceScore: 0.96,
      diagram: {
        title: "Grounded Answer Pipeline",
        nodes: ["Docs", "Chunking", "Embeddings", "Qdrant", "FastAPI", "Answer UI"],
        metrics: ["source-grounded", "low-friction support", "containerized"],
      },
    },
    {
      id: "gtm-workflow-automation",
      title: "GTM Workflow Automation",
      metadata: {
        status: "implemented",
        category: "automation",
        timeframe: "2025",
      },
      technologies: ["n8n", "Clay", "WeFlow", "APIs", "Data enrichment"],
      tags: ["automation", "gtm", "lead enrichment", "workflow", "growth"],
      visualAssociations: ["pipeline", "routing map", "signal board"],
      narratives: {
        recruiter:
          "Orchestrated a repeatable outbound workflow that connects data enrichment, personalization, and execution.",
        engineer:
          "Composed low-code and API-based workflow nodes into a predictable enrichment and outreach pipeline.",
        founder:
          "Removes manual friction from go-to-market motion by turning scattered lead data into prepared, personalized outreach.",
      },
      relatedSkills: ["n8n", "Clay", "Technical Discovery", "PoC Coordination"],
      relatedIndustries: ["B2B SaaS", "sales operations", "growth"],
      audienceRelevance: {
        recruiter: 0.8,
        engineer: 0.7,
        founder: 1,
        creativeDirector: 0.65,
        technicalInterviewer: 0.6,
      },
      importanceScore: 0.88,
      diagram: {
        title: "Outbound Signal Pipeline",
        nodes: ["Lead source", "Clay enrich", "n8n route", "Personalize", "WeFlow send", "Feedback loop"],
        metrics: ["less manual work", "repeatable motion", "better targeting"],
      },
    },
    {
      id: "sql-diagnostics-toolkit",
      title: "SQL Diagnostics Toolkit",
      metadata: {
        status: "implemented",
        category: "support engineering",
        timeframe: "2024",
      },
      technologies: ["SQL", "Reporting", "Support playbooks", "Data quality checks"],
      tags: ["sql", "diagnostics", "sla", "data integrity", "operations"],
      visualAssociations: ["query window", "health grid", "incident trace"],
      narratives: {
        recruiter:
          "Standardized recurring support investigations into reusable SQL checks and clearer reporting patterns.",
        engineer:
          "Built query patterns for SLA breach detection and data integrity triage, reducing repeated manual investigation.",
        founder:
          "Improves operational confidence by turning recurring production questions into repeatable diagnostics.",
      },
      relatedSkills: ["SQL", "SLA Management", "Incident Triage", "Root Cause Analysis"],
      relatedIndustries: ["enterprise support", "operations", "customer success"],
      audienceRelevance: {
        recruiter: 0.82,
        engineer: 0.9,
        founder: 0.72,
        creativeDirector: 0.35,
        technicalInterviewer: 0.92,
      },
      importanceScore: 0.84,
      diagram: {
        title: "Support Diagnostics Loop",
        nodes: ["Incident", "SQL checks", "SLA signal", "Data issue", "Report", "Root cause"],
        metrics: ["repeatable triage", "faster RCA", "data integrity"],
      },
    },
  ],
  skills: [
    {
      id: "customer-mastery",
      category: "Customer Mastery",
      items: ["Technical Discovery", "RFI/RFP Support", "PoC Coordination", "ROI Retention"],
      tags: ["recruiter", "founder", "consulting", "customer"],
      evidence: ["Managed full customer lifecycle for 10 international accounts."],
      tree: { tier: 4, xp: 92, unlocks: ["Discovery map", "Stakeholder translation", "Retention lens"] },
    },
    {
      id: "support-reliability",
      category: "Support & Reliability",
      items: ["Tier-3 Support", "SLA Management", "Root Cause Analysis", "Incident Triage"],
      tags: ["support", "operations", "technical interviewer", "engineer"],
      evidence: ["Balanced strategic solution design with roughly 40 support tickets per week."],
      tree: { tier: 5, xp: 95, unlocks: ["Incident triage", "RCA patterning", "SLA awareness"] },
    },
    {
      id: "modern-stack",
      category: "Modern Stack",
      items: ["Python", "FastAPI", "React", "TypeScript", "SQL"],
      tags: ["engineer", "technical interviewer", "backend", "frontend"],
      evidence: ["Built RAG and diagnostic systems across backend, frontend, and data layers."],
      tree: { tier: 3, xp: 82, unlocks: ["API thinking", "React systems", "SQL diagnosis"] },
    },
    {
      id: "automation-ai",
      category: "Automation & AI",
      items: ["n8n", "Clay", "WeFlow", "Docker Compose", "RAG Pipeline"],
      tags: ["ai", "automation", "founder", "systems"],
      evidence: ["Connected low-code automation with AI retrieval and workflow orchestration."],
      tree: { tier: 4, xp: 88, unlocks: ["RAG design", "Workflow routing", "Tool orchestration"] },
    },
  ],
  experiences: [
    {
      id: "tripunkt",
      year: "2020-2026",
      role: "Software Solutions Consultant",
      company: "tripunkt GmbH",
      impact:
        "Managed full customer lifecycle for 10 international accounts while balancing high-volume support, strategic solution design, and Scrum facilitation.",
      tags: ["consulting", "enterprise", "support", "scrum", "customer success"],
      importanceScore: 0.98,
      audienceViews: {
        recruiter: "Proof of ownership: full customer lifecycle, international accounts, support load, and solution design.",
        devops: "Operational signal: ticket throughput, incident triage, SLA awareness, and systems-level troubleshooting.",
        beginner: "He helped customers use technical products successfully while solving problems when things broke.",
      },
    },
    {
      id: "larsen-toubro",
      year: "2015-2016",
      role: "Technical Training Coordinator",
      company: "Larsen & Toubro",
      impact:
        "Onboarded 60 engineers by standardizing training delivery and repeatable knowledge transfer.",
      tags: ["training", "enablement", "knowledge transfer", "engineering"],
      importanceScore: 0.7,
      audienceViews: {
        recruiter: "Shows communication leverage and the ability to scale knowledge beyond individual contribution.",
        devops: "Enablement pattern: standardize the runbook, train the team, reduce repeat confusion.",
        beginner: "He taught engineers in a structured way so knowledge could travel faster.",
      },
    },
    {
      id: "earth-telecom",
      year: "2013-2015",
      role: "Network Operations Engineer",
      company: "Earth Telecom",
      impact:
        "Supported uptime for 500+ SME and enterprise clients through structured troubleshooting of LAN/WAN environments.",
      tags: ["networking", "operations", "infrastructure", "incident response"],
      importanceScore: 0.76,
      audienceViews: {
        recruiter: "Strong early foundation in infrastructure reliability and customer-impacting operations.",
        devops: "Hands-on LAN/WAN troubleshooting, uptime pressure, and incident response for 500+ clients.",
        beginner: "He started close to the wires: keeping networks working for many customers.",
      },
    },
  ],
  achievements: [
    {
      id: "global-coverage",
      title: "Global account coverage",
      metric: "10",
      unit: "international accounts",
      tags: ["recruiter", "customer success", "scale"],
    },
    {
      id: "support-throughput",
      title: "Support throughput",
      metric: "40",
      unit: "tickets per week",
      tags: ["support", "operations", "reliability"],
    },
    {
      id: "engineer-enablement",
      title: "Engineer onboarding",
      metric: "60",
      unit: "engineers trained",
      tags: ["training", "enablement", "leadership"],
    },
    {
      id: "client-uptime",
      title: "Network clients supported",
      metric: "500+",
      unit: "SME and enterprise clients",
      tags: ["networking", "infrastructure", "operations"],
    },
  ],
  stories: [
    {
      id: "public-bio-journey",
      title: "From Signal to Systems",
      body:
        "A public story arc from early curiosity about how things connect, through engineering foundations, customer-facing systems work, and now AI-native tooling in Berlin.",
      tags: ["bio", "journey", "origin", "story", "public"],
    },
    {
      id: "bridge-builder",
      title: "The Bridge Builder",
      body:
        "Abir's strongest pattern is translation: turning customer pressure, support noise, and engineering detail into a shared operating model.",
      tags: ["narrative", "recruiter", "founder", "consulting"],
    },
    {
      id: "systems-under-pressure",
      title: "Systems Under Pressure",
      body:
        "The work history moves from network operations to support reliability to AI-assisted knowledge systems, preserving the same habit: make complexity legible.",
      tags: ["engineer", "technical interviewer", "systems", "reliability"],
    },
  ],
  bioJourney: [
    {
      id: "origin-curiosity",
      era: "Early spark",
      title: "The question was always: how does this connect?",
      body:
        "The public story starts with curiosity about systems: signals, networks, tools, and the strange satisfaction of making separate pieces talk to each other.",
      mood: "playful",
    },
    {
      id: "engineering-foundation",
      era: "Engineering foundation",
      title: "Electrical and communication engineering became the grammar.",
      body:
        "Formal engineering study gave that curiosity structure: circuits, networks, information flow, and a habit of decomposing complex things.",
      mood: "focused",
    },
    {
      id: "ops-reality",
      era: "Operations reality",
      title: "Then reality arrived as uptime, incidents, and customers.",
      body:
        "Network operations turned theory into pressure-tested judgment: diagnose fast, communicate clearly, and keep service stable.",
      mood: "urgent",
    },
    {
      id: "customer-systems",
      era: "Customer systems",
      title: "The work expanded from fixing systems to translating them.",
      body:
        "Solutions consulting added the human layer: discovery, expectation management, support, product value, and trust.",
      mood: "human",
    },
    {
      id: "ai-native-now",
      era: "Now",
      title: "Now the product is an AI-native operator.",
      body:
        "The current arc combines AI, automation, retrieval, and frontend storytelling into tools that make expertise easier to explore.",
      mood: "electric",
    },
  ],
  productExplorationModes: [
    {
      id: "recruiter",
      label: "Recruiter View",
      promise: "Fast signal on scope, ownership, impact, and fit.",
    },
    {
      id: "devops",
      label: "DevOps / Technical View",
      promise: "Operational depth, reliability habits, diagrams, and system flows.",
    },
    {
      id: "beginner",
      label: "Beginner View",
      promise: "Plain-language explanations of what the work means and why it matters.",
    },
  ],
  personalityTraits: [
    { id: "structured", label: "Structured under pressure", tags: ["reliability", "support"] },
    { id: "curious", label: "Curious systems thinker", tags: ["ai", "architecture"] },
    { id: "communicative", label: "Customer-aware communicator", tags: ["consulting", "recruiter"] },
  ],
  careerArcs: [
    {
      id: "ops-to-ai",
      title: "From operations discipline to AI-native systems",
      phases: ["Network operations", "Technical enablement", "Solutions consulting", "RAG and automation"],
      tags: ["timeline", "systems", "ai", "career"],
    },
  ],
  visualThemes: [
    {
      id: "cinematic",
      label: "Cinematic",
      tone: "narrative",
      palette: ["ink", "copper", "soft white", "signal blue"],
    },
    {
      id: "technical-dashboard",
      label: "Technical Dashboard",
      tone: "precise",
      palette: ["graphite", "lime", "cyan", "white"],
    },
    {
      id: "retro-terminal",
      label: "Retro Terminal",
      tone: "direct",
      palette: ["black", "green", "amber", "gray"],
    },
    {
      id: "swiss-minimal",
      label: "Swiss Minimal",
      tone: "restrained",
      palette: ["paper", "black", "red", "steel"],
    },
    {
      id: "futuristic-lab",
      label: "Futuristic Lab",
      tone: "experimental",
      palette: ["charcoal", "violet", "cyan", "mint"],
    },
    {
      id: "blueprint-interface",
      label: "Blueprint Interface",
      tone: "architectural",
      palette: ["navy", "white", "cyan", "sand"],
    },
    {
      id: "creative-studio",
      label: "Creative Studio",
      tone: "expressive",
      palette: ["plum", "coral", "cream", "ink"],
    },
  ],
};

export const knowledgeCollections = [
  "projects",
  "skills",
  "experiences",
  "achievements",
  "stories",
  "bioJourney",
  "personalityTraits",
  "careerArcs",
  "productExplorationModes",
];
