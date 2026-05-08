import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Blocks,
  Braces,
  CircuitBoard,
  Database,
  FileCode2,
  Layers3,
  MessageSquare,
  Network,
  Route,
  Sparkles,
  Swords,
  TerminalSquare,
} from "lucide-react";

const panelMotion = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

const useProgressiveSections = (blueprint) => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);
    const timers = (blueprint.sections || []).slice(1).map((_, index) =>
      window.setTimeout(() => setVisibleCount((count) => Math.min(count + 1, blueprint.sections.length)), 420 + index * 360),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [blueprint.id, blueprint.sections]);

  return blueprint.sections.slice(0, visibleCount);
};

const SectionShell = ({ section, icon: Icon = Sparkles, children }) => (
  <motion.section className={`experience-section ${section.type}`} {...panelMotion} transition={{ duration: 0.35 }}>
    <div className="section-chrome">
      <span className="section-type">
        <Icon size={14} />
        {section.type}
      </span>
      <span className="section-source">{section.contentSource}</span>
    </div>
    {children}
  </motion.section>
);

const Hero = ({ section, onRegenerate }) => (
  <SectionShell section={section} icon={Sparkles}>
    <div className="hero-grid">
      <div>
        <p className="eyebrow">{section.props.eyebrow}</p>
        <h1>{section.props.title}</h1>
        <p className="hero-summary">{section.props.summary}</p>
        <div className="chip-row">
          {(section.props.chips || []).map((chip) => (
            <span className="intent-chip" key={chip}>{chip}</span>
          ))}
        </div>
      </div>
      <button className="primary-action" onClick={onRegenerate}>
        <Sparkles size={16} />
        {section.props.primaryAction || "Regenerate"}
      </button>
    </div>
  </SectionShell>
);

const Timeline = ({ section }) => (
  <SectionShell section={section} icon={Activity}>
    <h2>{section.props.title}</h2>
    <div className="timeline-list">
      {(section.props.items || []).map((item) => (
        <article className="timeline-item" key={item.id}>
          <span>{item.year}</span>
          <div>
            <h3>{item.role}</h3>
            <p className="muted">{item.company}</p>
            <p>{item.impact}</p>
          </div>
        </article>
      ))}
    </div>
  </SectionShell>
);

const SkillGraph = ({ section }) => (
  <SectionShell section={section} icon={Network}>
    <h2>{section.props.title}</h2>
    <div className="skill-grid">
      {(section.props.groups || []).map((group) => (
        <article className="skill-node" key={group.id}>
          <div className="node-title">
            <Database size={15} />
            <h3>{group.category}</h3>
          </div>
          <div className="skill-tags">
            {(group.items || []).map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <p>{group.evidence?.[0]}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);

const BioJourney = ({ section }) => (
  <SectionShell section={section} icon={Route}>
    <div className="bio-journey-head">
      <div>
        <p className="eyebrow">public story / private details excluded</p>
        <h2>{section.props.title}</h2>
      </div>
      <p>{section.props.privacyBoundary}</p>
    </div>
    <div className="journey-track">
      {(section.props.beats || []).map((beat, index) => (
        <motion.article
          className={`journey-beat mood-${beat.mood}`}
          key={beat.id}
          whileHover={{ y: -8, rotate: index % 2 ? -1.5 : 1.5 }}
        >
          <span>{beat.era}</span>
          <h3>{beat.title}</h3>
          <p>{beat.body}</p>
        </motion.article>
      ))}
    </div>
  </SectionShell>
);

const SkillTree = ({ section }) => (
  <SectionShell section={section} icon={Swords}>
    <div className="skill-tree-head">
      <div>
        <p className="eyebrow">game mode / professional XP</p>
        <h2>{section.props.title}</h2>
      </div>
      <p>{section.props.subtitle}</p>
    </div>
    <div className="skill-tree-map">
      {(section.props.groups || []).map((group, index) => (
        <motion.article
          className="skill-tree-node"
          key={group.id}
          style={{ "--xp": `${group.tree?.xp || 70}%`, "--lane": index + 1 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="node-badge">LVL {group.tree?.tier || 1}</div>
          <h3>{group.category}</h3>
          <div className="xp-bar"><span /></div>
          <div className="skill-tags">
            {(group.tree?.unlocks || group.items || []).map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <p>{group.evidence?.[0]}</p>
        </motion.article>
      ))}
    </div>
  </SectionShell>
);

const CaseStudy = ({ section, onProjectClick }) => (
  <SectionShell section={section} icon={Layers3}>
    <h2>{section.props.title}</h2>
    <div className="case-grid">
      {(section.props.projects || []).map((project) => (
        <button className="case-card" key={project.id} onClick={() => onProjectClick(project.id)}>
          <span className="case-kicker">{project.metadata?.category}</span>
          <h3>{project.title}</h3>
          <p>{project.narratives?.[section.props.audience] || project.narratives?.recruiter}</p>
          <div className="tech-row">
            {(project.technologies || []).slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </button>
      ))}
    </div>
  </SectionShell>
);

const ProjectDiagram = ({ section }) => (
  <SectionShell section={section} icon={CircuitBoard}>
    <h2>{section.props.title}</h2>
    <div className="project-diagram-board">
      {(section.props.projects || []).map((project) => (
        <article className="project-diagram" key={project.id}>
          <div className="diagram-title">
            <span>{project.metadata?.category}</span>
            <h3>{project.title}</h3>
          </div>
          <div className="diagram-flow">
            {(project.diagram?.nodes || []).map((node, index) => (
              <React.Fragment key={node}>
                <span>{node}</span>
                {index < project.diagram.nodes.length - 1 && <i />}
              </React.Fragment>
            ))}
          </div>
          <div className="infographic-strip">
            {(project.diagram?.metrics || []).map((metric) => <strong key={metric}>{metric}</strong>)}
          </div>
        </article>
      ))}
    </div>
  </SectionShell>
);

const ExperienceLens = ({ section }) => {
  const active = section.props.activeAudience === "devops" ? "devops" : section.props.activeAudience === "beginner" ? "beginner" : "recruiter";
  return (
    <SectionShell section={section} icon={Activity}>
      <div className="lens-head">
        <div>
          <p className="eyebrow">audience lens / {active}</p>
          <h2>{section.props.title}</h2>
        </div>
        <div className="lens-mode-row">
          {(section.props.modes || []).map((mode) => (
            <span className={mode.id === active ? "active" : ""} key={mode.id}>{mode.label}</span>
          ))}
        </div>
      </div>
      <div className="experience-lens-grid">
        {(section.props.experiences || []).map((item) => (
          <article className="lens-card" key={item.id}>
            <span>{item.year}</span>
            <h3>{item.role}</h3>
            <p className="muted">{item.company}</p>
            <p>{item.audienceViews?.[active] || item.impact}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

const ArchitectureDiagram = ({ section }) => (
  <SectionShell section={section} icon={CircuitBoard}>
    <h2>{section.props.title}</h2>
    <div className="flow-row">
      {(section.props.nodes || []).map((node, index) => (
        <React.Fragment key={node}>
          <div className="flow-node">{node}</div>
          {index < section.props.nodes.length - 1 && <div className="flow-edge" />}
        </React.Fragment>
      ))}
    </div>
    <p className="muted">{section.props.caption}</p>
  </SectionShell>
);

const AnimatedStats = ({ section }) => (
  <SectionShell section={section} icon={Blocks}>
    <h2>{section.props.title}</h2>
    <div className="stats-grid">
      {(section.props.stats || []).map((stat) => (
        <article className="stat-tile" key={stat.id}>
          <strong>{stat.metric}</strong>
          <span>{stat.unit}</span>
          <p>{stat.title}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);

const Terminal = ({ section }) => (
  <SectionShell section={section} icon={TerminalSquare}>
    <h2>{section.props.title}</h2>
    <div className="terminal-window">
      {(section.props.lines || []).map((line) => <code key={line}>$ {line}</code>)}
    </div>
  </SectionShell>
);

const ChatPanel = ({ section }) => (
  <SectionShell section={section} icon={MessageSquare}>
    <h2>{section.props.title || "Conversation Context"}</h2>
    <p>{section.props.body || "The chat layer updates intent and asks the planner for a new controlled blueprint."}</p>
  </SectionShell>
);

const CinematicSection = ({ section }) => (
  <SectionShell section={section} icon={Sparkles}>
    <h2>{section.props.title || "Narrative Scene"}</h2>
    <p>{section.props.body || "A staged narrative reveal composed from approved portfolio knowledge."}</p>
  </SectionShell>
);

const MotionStory = ({ section }) => (
  <SectionShell section={section} icon={Sparkles}>
    <div className="motion-story-grid">
      <div className="story-copy">
        <p className="eyebrow">{section.props.cluster?.label || "Narrative cluster"}</p>
        <h2>{section.props.title}</h2>
        <p>{section.props.body}</p>
        <p className="muted">{section.props.supporting}</p>
      </div>
      <div className="story-visual" aria-hidden="true">
        {(section.props.records || []).map((record, index) => (
          <motion.span
            key={record.id}
            className={`story-orbit orbit-${index + 1}`}
            animate={{ rotate: [0, 8, -8, 0], x: [0, index % 2 ? -12 : 12, 0] }}
            transition={{ duration: 3 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            {record.label}
          </motion.span>
        ))}
      </div>
    </div>
  </SectionShell>
);

const CvGraphLog = ({ section }) => (
  <SectionShell section={section} icon={Braces}>
    <h2>{section.props.title}</h2>
    <div className="graph-log">
      <div className="cluster-strip">
        {(section.props.clusters || []).map((cluster) => (
          <span key={cluster.id}>{cluster.label}</span>
        ))}
      </div>
      {(section.props.records || []).map((record) => (
        <article className="graph-record" key={record.id}>
          <div>
            <strong>{record.label}</strong>
            <span>{record.source} / {record.cluster}</span>
          </div>
          <meter min="0" max="1.8" value={record.weight} />
          <p>{record.text}</p>
        </article>
      ))}
    </div>
  </SectionShell>
);

const CodeWindow = ({ section }) => (
  <SectionShell section={section} icon={FileCode2}>
    <h2>{section.props.title}</h2>
    <pre className="code-window"><code>{section.props.code}</code></pre>
  </SectionShell>
);

const MemoryMap = ({ section }) => {
  const memory = section.props.memory || {};
  return (
    <SectionShell section={section} icon={Braces}>
      <h2>{section.props.title}</h2>
      <div className="memory-grid">
        <span>Audience: {memory.audience || "recruiter"}</span>
        <span>Theme: {memory.preferredTheme || "cinematic"}</span>
        <span>Focus: {memory.preferredFocus || "overview"}</span>
        <span>Interactions: {memory.interactionCount || 0}</span>
      </div>
      <div className="chip-row">
        {(memory.exploredTopics || []).map((topic) => <span className="intent-chip" key={topic}>{topic}</span>)}
      </div>
    </SectionShell>
  );
};

const InteractiveCanvas = ({ section }) => (
  <SectionShell section={section} icon={CircuitBoard}>
    <h2>{section.props.title || "Visual Field"}</h2>
    <div className={`canvas-field visual-${section.props.theme || section.visualStyle}`} aria-label="Interactive portfolio signal map">
      {(section.props.nodes || ["Intent", "CV Bank", "Blueprint", "Page"]).map((node, index) => (
        <motion.span
          key={node}
          className={`canvas-node node-${index + 1}`}
          animate={{ y: [0, -12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          {node}
        </motion.span>
      ))}
      <button className="runaway-button" type="button">catch me</button>
    </div>
  </SectionShell>
);

const componentMap = {
  hero: Hero,
  timeline: Timeline,
  terminal: Terminal,
  skillGraph: SkillGraph,
  bioJourney: BioJourney,
  skillTree: SkillTree,
  caseStudy: CaseStudy,
  projectDiagram: ProjectDiagram,
  experienceLens: ExperienceLens,
  architectureDiagram: ArchitectureDiagram,
  animatedStats: AnimatedStats,
  chatPanel: ChatPanel,
  cinematicSection: CinematicSection,
  codeWindow: CodeWindow,
  memoryMap: MemoryMap,
  interactiveCanvas: InteractiveCanvas,
  cvGraphLog: CvGraphLog,
  motionStory: MotionStory,
};

export const BlueprintRenderer = ({ blueprint, onRegenerate, onProjectClick }) => {
  const visibleSections = useProgressiveSections(blueprint);
  const shellClass = useMemo(
    () => `experience-stage theme-${blueprint.theme} layout-${blueprint.layout}`,
    [blueprint.layout, blueprint.theme],
  );

  return (
    <main className={shellClass}>
      <div className="blueprint-status">
        <span>Blueprint validated</span>
        <span>{blueprint.sections.length} sections</span>
        <span>{blueprint.narrativeStyle}</span>
      </div>
      <AnimatePresence mode="popLayout">
        {visibleSections.map((section) => {
          const Component = componentMap[section.type];
          if (!Component) return null;
          return (
            <Component
              key={`${blueprint.id}-${section.id}`}
              section={section}
              onRegenerate={onRegenerate}
              onProjectClick={onProjectClick}
            />
          );
        })}
      </AnimatePresence>
    </main>
  );
};
