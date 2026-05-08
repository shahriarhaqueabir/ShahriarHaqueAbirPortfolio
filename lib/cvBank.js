import { portfolioKnowledgeBase } from "./portfolioKnowledge.js";

export const cvBank = [
  {
    id: "cv-main-positioning",
    source: "main-cv",
    cluster: "positioning",
    label: "Professional positioning",
    weight: 1,
    text:
      "Software Solutions Consultant in Berlin who bridges customer intent, support complexity, and technical execution.",
    links: ["tripunkt", "bridge-builder", "customer-mastery"],
  },
  {
    id: "cv-bank-public-bio",
    source: "cv-bank",
    cluster: "bio-journey",
    label: "Public bio journey",
    weight: 0.9,
    text:
      "A public origin-to-now arc: systems curiosity, engineering foundation, network operations, solutions consulting, and AI-native product thinking.",
    links: ["public-bio-journey", "origin-curiosity", "engineering-foundation", "ops-reality", "customer-systems", "ai-native-now"],
  },
  {
    id: "cv-main-tripunkt",
    source: "main-cv",
    cluster: "customer-systems",
    label: "tripunkt GmbH",
    weight: 0.98,
    text:
      "Managed the full lifecycle for 10 international accounts, combining technical discovery, solution design, support, and Scrum facilitation.",
    links: ["tripunkt", "customer-mastery", "support-reliability", "global-coverage"],
  },
  {
    id: "cv-bank-support-load",
    source: "cv-bank",
    cluster: "support-reliability",
    label: "Support reliability",
    weight: 0.92,
    text:
      "Balanced strategic work with roughly 40 support tickets per week, making root-cause thinking and SLA discipline central to the narrative.",
    links: ["support-throughput", "sql-diagnostics-toolkit", "support-reliability"],
  },
  {
    id: "cv-bank-rag",
    source: "cv-bank",
    cluster: "ai-systems",
    label: "RAG system evidence",
    weight: 0.96,
    text:
      "Built a FastAPI and Qdrant knowledge assistant that turns technical documentation into grounded answers.",
    links: ["ai-knowledge-assistant", "modern-stack", "automation-ai"],
  },
  {
    id: "cv-bank-automation",
    source: "cv-bank",
    cluster: "automation-growth",
    label: "GTM automation evidence",
    weight: 0.88,
    text:
      "Used n8n, Clay, WeFlow, and APIs to orchestrate lead enrichment and personalized outbound workflows.",
    links: ["gtm-workflow-automation", "automation-ai", "customer-mastery"],
  },
  {
    id: "cv-bank-sql",
    source: "cv-bank",
    cluster: "support-reliability",
    label: "SQL diagnostics evidence",
    weight: 0.84,
    text:
      "Created reusable SQL diagnostic checks for SLA breaches, data integrity issues, and repeatable production support.",
    links: ["sql-diagnostics-toolkit", "support-reliability", "modern-stack"],
  },
  {
    id: "cv-main-training",
    source: "main-cv",
    cluster: "enablement",
    label: "Engineer enablement",
    weight: 0.76,
    text:
      "Onboarded 60 engineers by standardizing technical training delivery and repeatable knowledge transfer.",
    links: ["larsen-toubro", "engineer-enablement", "bridge-builder"],
  },
  {
    id: "cv-main-network-ops",
    source: "main-cv",
    cluster: "infrastructure",
    label: "Network operations foundation",
    weight: 0.78,
    text:
      "Supported uptime for 500+ SME and enterprise clients through structured LAN/WAN troubleshooting.",
    links: ["earth-telecom", "client-uptime", "systems-under-pressure"],
  },
];

export const graphClusters = [
  {
    id: "bio-journey",
    label: "Public Bio Journey",
    theme: "glassmorphic",
    terms: ["bio", "birth", "origin", "journey", "story", "from", "now", "public"],
    neighbors: ["positioning", "customer-systems", "ai-systems"],
  },
  {
    id: "positioning",
    label: "Positioning",
    theme: "glassmorphic",
    terms: ["overview", "profile", "positioning", "story", "bio", "portfolio"],
    neighbors: ["customer-systems", "ai-systems", "support-reliability"],
  },
  {
    id: "customer-systems",
    label: "Customer Systems",
    theme: "claude-chat",
    terms: ["recruiter", "customer", "consulting", "accounts", "scrum", "discovery", "rfi", "rfp"],
    neighbors: ["positioning", "support-reliability", "automation-growth"],
  },
  {
    id: "ai-systems",
    label: "AI Systems",
    theme: "cyberpunk",
    terms: ["ai", "rag", "fastapi", "qdrant", "docker", "architecture", "retrieval", "embeddings"],
    neighbors: ["support-reliability", "automation-growth", "infrastructure"],
  },
  {
    id: "automation-growth",
    label: "Automation Growth",
    theme: "kinetic-shapes",
    terms: ["automation", "gtm", "founder", "growth", "n8n", "clay", "workflow", "outbound"],
    neighbors: ["customer-systems", "ai-systems"],
  },
  {
    id: "support-reliability",
    label: "Support Reliability",
    theme: "retro-90s",
    terms: ["support", "sla", "incident", "sql", "diagnostics", "operations", "reliability"],
    neighbors: ["customer-systems", "ai-systems", "infrastructure"],
  },
  {
    id: "skill-tree",
    label: "Skill Tree",
    theme: "retro-90s",
    terms: ["skill", "skills", "tree", "heatmap", "game", "xp", "level", "stack"],
    neighbors: ["ai-systems", "support-reliability", "customer-systems"],
  },
  {
    id: "project-diagrams",
    label: "Project Diagrams",
    theme: "blueprint-interface",
    terms: ["project", "diagram", "infographic", "architecture", "case study", "flow"],
    neighbors: ["ai-systems", "automation-growth", "support-reliability"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    theme: "blueprint-interface",
    terms: ["network", "infrastructure", "lan", "wan", "uptime", "systems", "technical"],
    neighbors: ["support-reliability", "ai-systems"],
  },
  {
    id: "enablement",
    label: "Enablement",
    theme: "motion-blocks",
    terms: ["training", "enablement", "engineers", "knowledge", "teaching", "handover"],
    neighbors: ["positioning", "customer-systems"],
  },
];

const flattenKnowledge = () => {
  const collections = ["projects", "skills", "experiences", "achievements", "stories", "careerArcs"];
  return collections.flatMap((collection) =>
    (portfolioKnowledgeBase[collection] || []).map((item) => ({
      collection,
      id: item.id,
      item,
      text: JSON.stringify(item),
    })),
  );
};

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();

const scoreText = (text, terms) => {
  const normalized = normalize(text);
  return terms.reduce((score, term) => {
    const normalizedTerm = normalize(term);
    return normalized.includes(normalizedTerm) ? score + 1 : score;
  }, 0);
};

export const clusterPrompt = (prompt, intent) => {
  const target = `${prompt} ${intent.focus} ${intent.audience} ${intent.probableGoal}`;
  return graphClusters
    .map((cluster) => ({
      ...cluster,
      score: scoreText(target, cluster.terms),
    }))
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))[0];
};

export const retrieveFromCvGraph = ({ prompt, intent, limit = 8 }) => {
  const primaryCluster = clusterPrompt(prompt, intent);
  const activeClusterIds = new Set([primaryCluster.id, ...primaryCluster.neighbors]);
  const knowledge = flattenKnowledge();

  const bankMatches = cvBank
    .map((record) => {
      const clusterBoost = activeClusterIds.has(record.cluster) ? 1.4 : 0.4;
      const promptScore = scoreText(`${record.text} ${record.label}`, [prompt, intent.focus, intent.audience]);
      return {
        type: "cv-record",
        id: record.id,
        label: record.label,
        source: record.source,
        cluster: record.cluster,
        weight: Number((record.weight * clusterBoost + promptScore * 0.15).toFixed(2)),
        text: record.text,
        links: record.links,
      };
    })
    .sort((a, b) => b.weight - a.weight);

  const linkSet = new Set(bankMatches.slice(0, 5).flatMap((record) => record.links));
  const knowledgeMatches = knowledge
    .filter((record) => linkSet.has(record.id))
    .map((record) => ({
      type: "knowledge-object",
      id: record.id,
      label: record.item.title || record.item.role || record.item.category || record.id,
      source: record.collection,
      cluster: primaryCluster.id,
      weight: 0.7,
      text: record.text,
      item: record.item,
    }));

  const records = [...bankMatches, ...knowledgeMatches]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);

  return {
    primaryCluster,
    clusters: graphClusters.filter((cluster) => activeClusterIds.has(cluster.id)),
    records,
  };
};
