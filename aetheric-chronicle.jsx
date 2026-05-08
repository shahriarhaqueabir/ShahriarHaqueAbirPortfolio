import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageSquare, Sparkles, Terminal } from "lucide-react";
import { BlueprintRenderer } from "./components/BlueprintRenderer.jsx";
import { analyzeIntent } from "./lib/intent.js";
import { planExperience, validateBlueprint } from "./lib/blueprintPlanner.js";
import { retrievePortfolioContext } from "./lib/retrieval.js";
import { createInitialMemory, updateMemory } from "./lib/sessionMemory.js";
import { retrieveFromCvGraph } from "./lib/cvBank.js";
import "./aetheric-chronicle.css";

const starterPrompts = [
  "Retro 90s support reliability",
  "Cyberpunk RAG architecture",
  "Claude-style recruiter chat",
  "Kinetic founder automation story",
];

const systemMessage = {
  id: "system",
  role: "assistant",
  text:
    "Aetheric Chronicle online. Ask a question or choose a path; I will plan a structured portfolio experience and render it through approved components.",
};

const buildExperience = (prompt, memory) => {
  const intent = analyzeIntent(prompt, memory);
  const retrievedContext = retrievePortfolioContext({ query: prompt, intent, limit: 8 });
  const cvGraph = retrieveFromCvGraph({ prompt, intent, limit: 8 });
  const nextMemory = updateMemory(memory, { intent });
  const blueprint = validateBlueprint(planExperience({ intent, context: retrievedContext, memory: nextMemory, cvGraph }));

  return {
    intent,
    retrievedContext,
    cvGraph,
    memory: nextMemory,
    blueprint,
    response:
      `Opened hidden page: ${cvGraph.primaryCluster.label}. ` +
      `Weighted ${cvGraph.records.length} CV-bank records and generated a ${blueprint.theme} story with ${blueprint.sections.length} validated sections.`,
  };
};

const useStreamingText = (message, onDone) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!message) return undefined;
    setText("");
    const tokens = message.split(" ");
    const timers = tokens.map((_, index) =>
      window.setTimeout(() => {
        setText(tokens.slice(0, index + 1).join(" "));
        if (index === tokens.length - 1) onDone?.();
      }, 35 * index),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [message, onDone]);

  return text;
};

const ThreeDotLoader = () => (
  <div className="three-dot-loader" aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
);

const MinimalChatBar = ({ input, setInput, onSubmit, compact = false }) => (
  <form className={`minimal-chat-bar ${compact ? "compact" : ""}`} onSubmit={onSubmit}>
    <ThreeDotLoader />
    <input
      aria-label="Ask the hidden portfolio"
      autoComplete="off"
      onChange={(event) => setInput(event.target.value)}
      placeholder="Prompt a hidden portfolio page..."
      spellCheck="false"
      type="text"
      value={input}
    />
    <button aria-label="Open hidden page" disabled={!input.trim()} type="submit">
      <ArrowUpRight size={18} />
    </button>
  </form>
);

const Landing = ({ input, setInput, onSubmit, onPrompt }) => (
  <main className="landing-shell">
    <motion.div
      className="landing-mark"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sparkles size={22} />
      <span>ABIR.OS</span>
    </motion.div>
    <motion.div
      className="landing-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.5 }}
    >
      <ThreeDotLoader />
      <h1>Hidden portfolio pages, generated on request.</h1>
      <MinimalChatBar input={input} onSubmit={onSubmit} setInput={setInput} />
      <div className="landing-prompts">
        {starterPrompts.map((prompt) => (
          <button key={prompt} onClick={() => onPrompt(prompt)}>{prompt}</button>
        ))}
      </div>
    </motion.div>
  </main>
);

const ChatConsole = ({ messages, pendingResponse, input, setInput, onSubmit, onPrompt }) => {
  const endRef = useRef(null);
  const streamingText = useStreamingText(pendingResponse);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <aside className="orchestrator-panel">
      <div className="panel-header">
        <div>
          <span className="micro-label">AI orchestrator</span>
          <h2>Experience Planner</h2>
        </div>
        <span className="live-badge"><span />online</span>
      </div>

      <div className="prompt-chips">
        {starterPrompts.map((prompt) => (
          <button key={prompt} onClick={() => onPrompt(prompt)}>{prompt}</button>
        ))}
      </div>

      <div className="message-log">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`chat-message ${message.role}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="message-icon">{message.role === "assistant" ? <Terminal size={14} /> : <MessageSquare size={14} />}</div>
              <p>{message.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {pendingResponse && (
          <div className="chat-message assistant streaming">
            <div className="message-icon"><Terminal size={14} /></div>
            <p>{streamingText}<span className="cursor">_</span></p>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <MinimalChatBar compact input={input} onSubmit={onSubmit} setInput={setInput} />
    </aside>
  );
};

export default function AethericChronicle() {
  const [memory, setMemory] = useState(createInitialMemory);
  const [blueprint, setBlueprint] = useState(null);
  const [messages, setMessages] = useState([systemMessage]);
  const [pendingResponse, setPendingResponse] = useState("");
  const [input, setInput] = useState("");

  const commitExperience = (prompt) => {
    const userMessage = { id: `user-${Date.now()}`, role: "user", text: prompt };
    const experience = buildExperience(prompt, memory);

    setMessages((current) => [...current, userMessage]);
    setMemory(experience.memory);
    setBlueprint(experience.blueprint);
    setPendingResponse(experience.response);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: "assistant", text: experience.response },
      ]);
      setPendingResponse("");
    }, Math.max(900, experience.response.split(" ").length * 35));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    setInput("");
    commitExperience(prompt);
  };

  const handlePrompt = (prompt) => {
    setInput("");
    commitExperience(prompt);
  };

  const handleProjectClick = (projectId) => {
    setMemory((current) => updateMemory(current, { projectId }));
    commitExperience(`Open project ${projectId} as a technical case study`);
  };

  return (
    <div className="app-shell">
      <div className="ambient-grid" />
      <AnimatePresence mode="wait">
        {!blueprint ? (
          <Landing
            key="landing"
            input={input}
            onPrompt={handlePrompt}
            onSubmit={handleSubmit}
            setInput={setInput}
          />
        ) : (
          <motion.div
            key="workspace"
            className="generated-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <header className="topbar">
              <div className="brand-lockup">
                <Sparkles size={18} />
                <span>ABIR.OS</span>
              </div>
              <span className="contract-pill">Hidden page / {blueprint.theme}</span>
            </header>
            <div className="workspace">
              <ChatConsole
                input={input}
                messages={messages}
                onPrompt={handlePrompt}
                onSubmit={handleSubmit}
                pendingResponse={pendingResponse}
                setInput={setInput}
              />
              <BlueprintRenderer
                blueprint={blueprint}
                onProjectClick={handleProjectClick}
                onRegenerate={() => commitExperience("Regenerate a fresh adaptive overview from my session history")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
