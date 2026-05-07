import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Ghost, Compass, Zap, Code, Globe, Orbit, 
  Terminal, Shield, Cpu, ZapOff, ArrowUpRight, 
  Linkedin, Github, Mail, MapPin, ChevronDown 
} from 'lucide-react';

// --- DATA ---
const CHAPTERS = [
  {
    id: "bio",
    title: "The Mindset",
    subtitle: "Chapter 1: The Bio",
    text: "I operate at the intersection of human intent and technical execution. My career has been defined by a single obsession: taking fragmented, complex systems and distilling them into structured, high-value solutions. Whether I am leading technical discovery for global enterprise accounts or building RAG-based AI assistants, my goal is to bridge the gap between engineering complexity and customer success.",
    identity: ["Technical Architect", "Storyteller", "Bridge Builder"],
    icon: <Ghost size={24} />,
    visual: "windows",
    color: "#B85C38"
  },
  {
    id: "timeline",
    title: "The Journey",
    subtitle: "Chapter 2: Professional Timeline",
    text: "A decade of engineering, from the bedrock of network operations to the vanguard of solutions consulting. Every era represents a layer of expertise added to the stack.",
    experience: [
      {
        year: "2020 – 2026",
        role: "Software Solutions Consultant",
        company: "tripunkt GmbH",
        impact: "Managed full customer lifecycle for 10 international accounts, balancing high-volume support (40 tickets/week) with strategic solution design and Scrum facilitation."
      },
      {
        year: "2015 – 2016",
        role: "Technical Training Coordinator",
        company: "Larsen & Toubro",
        impact: "Scaled knowledge! Onboarded 60 engineers by standardizing training delivery and creating repeatable knowledge transfer processes."
      },
      {
        year: "2013 – 2015",
        role: "Network Operations Engineer",
        company: "Earth Telecommunication",
        impact: "Maintained uptime for 500+ SME and enterprise clients. Reduced MTTR through structured troubleshooting of complex LAN/WAN environments."
      }
    ],
    icon: <Compass size={24} />,
    visual: "landscape",
    color: "#2D3748"
  },
  {
    id: "skills",
    title: "Logic meeting Poetry",
    subtitle: "Chapter 3: Technical Skills",
    text: "The bridge between human empathy and machine logic is built with code, process, and persistence. These are the tools I use to stabilize the future.",
    skills: {
      "Customer Mastery": ["Technical Discovery", "RFI/RFP Support", "PoC Coordination", "ROI Retention"],
      "Support & Reliability": ["Tier-3 Support", "SLA Management", "Root Cause Analysis", "Incident Triage"],
      "Modern Stack": ["Python", "FastAPI", "React", "TypeScript", "SQL"],
      "Automation & AI": ["n8n", "Clay", "WeFlow", "Docker Compose", "RAG Pipeline"]
    },
    icon: <Zap size={24} />,
    visual: "neural",
    color: "#1A4731"
  },
  {
    id: "projects",
    title: "The Evidence",
    subtitle: "Chapter 4: Featured Projects",
    text: "Proof of concept, realized. These projects represent the intersection of automation, intelligence, and operational efficiency.",
    projects: [
      {
        name: "AI Knowledge Assistant",
        tagline: "Context-aware documentation",
        desc: "Built a FastAPI-based RAG system using Qdrant and Docker to turn static technical documentation into grounded answers."
      },
      {
        name: "GTM Workflow Automation",
        tagline: "Outbound without the friction",
        desc: "Orchestrated a low-code pipeline using n8n and Clay, automating lead enrichment and personalized outreach at scale."
      },
      {
        name: "SQL Diagnostics Toolkit",
        tagline: "Standardizing production support",
        desc: "Developed a library of SQL checks to identify SLA breaches and data integrity issues with scriptable reports."
      }
    ],
    icon: <Code size={24} />,
    visual: "orbit",
    color: "#744210"
  },
  {
    id: "education",
    title: "Ambition",
    subtitle: "Chapter 5: Education & Reach",
    text: "A global perspective, rooted in rigorous academic foundations. Fluent in languages, cultures, and infrastructures.",
    edu: [
      { degree: "M.Sc. Information and Communication Engineering", school: "Technische Hochschule Mittelhessen, Germany" },
      { degree: "B.Sc. Electrical and Electronic Engineering", school: "North South University, Bangladesh" }
    ],
    languages: ["English (C2)", "Bengali (C2)", "German (B2)", "Hindi (B2)"],
    status: "Permanent Resident (Niederlassungserlaubnis) | Berlin, Germany",
    icon: <Globe size={24} />,
    visual: "city",
    color: "#2C5282"
  },
  {
    id: "philosophy",
    title: "Resilience",
    subtitle: "Chapter 6: Achievements & Philosophy",
    text: "Operational excellence is not an accident. It is the result of intention, standardization, and a relentless focus on root causes.",
    mission: "To enable teams to move faster by connecting design, collaboration, and development into a single, seamless platform.",
    achievements: [
      "Sustained reliability across AMER, EMEA, and APAC time zones.",
      "Reduced support overhead through root-cause standardization."
    ],
    icon: <Shield size={24} />,
    visual: "glitch",
    color: "#18160F"
  }
];

// --- AI LOGIC ---

const getMockResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('role')) {
    const exp = CHAPTERS.find(c => c.id === 'timeline').experience;
    return `I have a decade of engineering experience. Most recently, I was a ${exp[0].role} at ${exp[0].company} (${exp[0].year}), where I ${exp[0].impact.toLowerCase()} Before that, I worked at ${exp[1].company} as a ${exp[1].role}.`;
  }
  
  if (lowerInput.includes('skill') || lowerInput.includes('stack') || lowerInput.includes('tech') || lowerInput.includes('tool')) {
    const skills = CHAPTERS.find(c => c.id === 'skills').skills;
    return `My technical stack includes ${skills["Modern Stack"].join(', ')}. I also focus heavily on Customer Mastery (like ${skills["Customer Mastery"][0]}) and Automation & AI (${skills["Automation & AI"].join(', ')}).`;
  }
  
  if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('build') || lowerInput.includes('make')) {
    const projects = CHAPTERS.find(c => c.id === 'projects').projects;
    let response = "Here are a few things I've built:\\n\\n";
    projects.forEach(p => {
      response += `• ${p.name}: ${p.desc}\\n`;
    });
    return response;
  }
  
  if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('degree') || lowerInput.includes('university')) {
    const edu = CHAPTERS.find(c => c.id === 'education').edu;
    return `I hold an ${edu[0].degree} from ${edu[0].school}, and a ${edu[1].degree} from ${edu[1].school}.`;
  }
  
  if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('reach') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return `Hello! You can reach me via email at shahriar_abby@hotmail.com or connect with me on LinkedIn. How can I help you today?`;
  }
  
  // Default response
  return "I operate at the intersection of human intent and technical execution. Ask me about my experience, skills, projects, or education.";
};

// --- MAIN PAGE ---

const SYSTEM_MESSAGE = {
  id: 'system',
  role: 'assistant',
  text: "Initiating connection...\\nI am the digital representation of Abir's professional journey. Ask me about his experience, skills, projects, or education.",
};

export default function AethericChronicle() {
  const [messages, setMessages] = useState([SYSTEM_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getMockResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="chat-root">
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        <header className="chat-header">
          <div className="nav-logo">ABIR·CHRONICLE</div>
          <div className="status-indicator">
            <span className="pulse-dot"></span>
            SYSTEM ONLINE
          </div>
        </header>

        <main className="chat-container">
          <div className="messages-area">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message-wrapper ${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="avatar assistant-avatar">
                      <Terminal size={14} />
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <div className="avatar user-avatar">
                      <Ghost size={14} />
                    </div>
                  )}
                  
                  <div className="message-content">
                    {msg.text.split('\\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== msg.text.split('\\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="message-wrapper assistant"
                >
                  <div className="avatar assistant-avatar">
                    <Terminal size={14} />
                  </div>
                  <div className="message-content typing-indicator">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="scroll-anchor" />
          </div>

          <div className="input-container">
            <form className="input-form" onSubmit={handleSubmit}>
              <span className="input-prefix">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abir's background..."
                className="chat-input"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping} 
                className="send-btn"
                aria-label="Send message"
              >
                <ArrowUpRight size={20} />
              </button>
            </form>
            <div className="input-footer">
              Operating at the intersection of human intent and technical execution.
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// --- CSS ---
const CSS = `
:root {
  --bg: #0A0A0B;
  --panel: #111112;
  --text: #F5F5F0;
  --text-muted: #888888;
  --accent: #B85C38;
  --border: rgba(255,255,255,0.08);
  --serif: 'Instrument Serif', serif;
  --sans: 'Inter', sans-serif;
  --mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  overflow: hidden; /* Prevent body scroll, handle inside chat */
}

.chat-root { 
  position: relative; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.noise-overlay {
  position: fixed; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03; pointer-events: none; z-index: 9999;
  mix-blend-mode: overlay;
}

/* Header */
.chat-header {
  width: 100%;
  max-width: 800px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
}

.nav-logo { 
  font-family: var(--serif); 
  font-size: 24px; 
  letter-spacing: 0.05em; 
  color: var(--text); 
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

/* Main Chat Area */
.chat-container {
  width: 100%;
  max-width: 800px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px 24px;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  /* Hide scrollbar for a cleaner look but keep functionality */
  scrollbar-width: none; 
  -ms-overflow-style: none;
}
.messages-area::-webkit-scrollbar {
  display: none;
}

/* Messages */
.message-wrapper {
  display: flex;
  gap: 16px;
  max-width: 90%;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.assistant-avatar {
  background: rgba(184, 92, 56, 0.1);
  color: var(--accent);
  border-color: rgba(184, 92, 56, 0.2);
}

.user-avatar {
  background: var(--panel);
  color: var(--text-muted);
}

.message-content {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  font-weight: 300;
  padding-top: 4px;
}

.message-wrapper.user .message-content {
  color: var(--text-muted);
  text-align: right;
}

/* Typing Indicator */
.typing-indicator span {
  animation: blink 1.4s infinite both;
  font-size: 24px;
  line-height: 10px;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}

.scroll-anchor {
  height: 1px;
}

/* Input Area */
.input-container {
  margin-top: auto;
  padding-top: 24px;
  background: linear-gradient(to top, var(--bg) 80%, transparent);
}

.input-form {
  display: flex;
  align-items: center;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 16px;
  transition: border-color 0.3s;
}

.input-form:focus-within {
  border-color: rgba(184, 92, 56, 0.5);
}

.input-prefix {
  font-family: var(--mono);
  color: var(--accent);
  margin-right: 12px;
  font-weight: 500;
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);
  font-family: var(--sans);
  font-size: 15px;
  padding: 12px 0;
  outline: none;
}

.chat-input::placeholder {
  color: var(--text-muted);
  opacity: 0.5;
}

.send-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, transform 0.2s;
}

.send-btn:not(:disabled):hover {
  color: var(--accent);
  transform: translateY(-2px) translateX(2px);
}

.send-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.input-footer {
  text-align: center;
  font-size: 11px;
  color: var(--text-muted);
  opacity: 0.6;
  margin-top: 16px;
  font-family: var(--mono);
}

/* Mobile */
@media (max-width: 640px) {
  .chat-header {
    padding: 24px 16px;
  }
  .chat-container {
    padding: 0 16px 16px 16px;
  }
  .nav-logo {
    font-size: 18px;
  }
  .message-wrapper {
    max-width: 100%;
  }
}
`;
