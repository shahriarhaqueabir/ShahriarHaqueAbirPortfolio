const uniqueRecent = (items, limit = 8) => Array.from(new Set(items.filter(Boolean))).slice(-limit);

export const createInitialMemory = () => ({
  exploredTopics: [],
  clickedProjects: [],
  preferredTheme: "cinematic",
  preferredFocus: "overview",
  audience: "recruiter",
  interactionCount: 0,
});

export const updateMemory = (memory, event) => {
  const next = {
    ...memory,
    interactionCount: (memory.interactionCount || 0) + 1,
  };

  if (event.intent) {
    next.preferredFocus = event.intent.focus || next.preferredFocus;
    next.preferredTheme = event.intent.preferredStyle || next.preferredTheme;
    next.audience = event.intent.audience || next.audience;
    next.exploredTopics = uniqueRecent([
      ...(next.exploredTopics || []),
      event.intent.focus,
      event.intent.audience,
    ]);
  }

  if (event.projectId) {
    next.clickedProjects = uniqueRecent([...(next.clickedProjects || []), event.projectId], 6);
    next.exploredTopics = uniqueRecent([...(next.exploredTopics || []), "projects"], 8);
  }

  if (event.topic) {
    next.exploredTopics = uniqueRecent([...(next.exploredTopics || []), event.topic], 8);
  }

  return next;
};
