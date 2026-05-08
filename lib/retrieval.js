import { knowledgeCollections, portfolioKnowledgeBase } from "./portfolioKnowledge.js";

const STOP_WORDS = new Set([
  "a",
  "about",
  "and",
  "are",
  "as",
  "for",
  "i",
  "in",
  "is",
  "me",
  "of",
  "on",
  "or",
  "show",
  "tell",
  "the",
  "to",
  "with",
  "you",
]);

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();

const tokenize = (value) =>
  normalize(value)
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));

const flatten = (value) => {
  if (Array.isArray(value)) return value.map(flatten).join(" ");
  if (value && typeof value === "object") return Object.values(value).map(flatten).join(" ");
  return String(value || "");
};

const scoreRecord = (record, queryTokens, intent) => {
  const recordText = normalize(flatten(record));
  const recordTokens = new Set(tokenize(recordText));
  const exactScore = queryTokens.reduce((score, token) => {
    if (recordTokens.has(token)) return score + 3;
    if (recordText.includes(token)) return score + 1;
    return score;
  }, 0);

  const audienceScore = Number(record.audienceRelevance?.[intent.audience] || 0) * 4;
  const tagScore = (record.tags || []).some((tag) => normalize(tag).includes(intent.focus)) ? 2 : 0;
  const importanceScore = Number(record.importanceScore || 0.5);

  return exactScore + audienceScore + tagScore + importanceScore;
};

export const retrievePortfolioContext = ({ query = "", intent, limit = 8 }) => {
  const expandedQuery = [
    query,
    intent?.focus,
    intent?.audience,
    intent?.probableGoal,
    ...(intent?.memoryHints || []),
  ].join(" ");
  const queryTokens = tokenize(expandedQuery);

  const records = knowledgeCollections.flatMap((collection) =>
    (portfolioKnowledgeBase[collection] || []).map((item) => ({
      collection,
      item,
      score: scoreRecord(item, queryTokens, intent || {}),
    })),
  );

  return records
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ collection, item, score }) => ({ collection, item, score }));
};

export const getKnowledgeSnapshot = () => ({
  profile: portfolioKnowledgeBase.profile,
  skills: portfolioKnowledgeBase.skills,
  projects: portfolioKnowledgeBase.projects,
  experiences: portfolioKnowledgeBase.experiences,
  achievements: portfolioKnowledgeBase.achievements,
});
