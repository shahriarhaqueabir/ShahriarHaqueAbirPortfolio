"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import HeroView from "@/components/views/HeroView";
import AboutView from "@/components/views/AboutView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import SkillsView from "@/components/views/SkillsView";
import StackView from "@/components/views/StackView";
import VisionView from "@/components/views/VisionView";
import StatsView from "@/components/views/StatsView";
import LabView from "@/components/views/LabView";

import Image from "next/image";

type Message = { id: string; text: string; sender: 'sys' | 'user' | 'ai'; isTyping?: boolean };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Initializing Local AI Assistant (SmolLM2-135M)... This may take a moment to load the weights on first visit.", sender: 'sys' }
  ]);
  const [input, setInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [activeView, setActiveView] = useState('hero');
  const [visitorProfile, setVisitorProfile] = useState<Record<string, string>>({});
  const [dynamicContext, setDynamicContext] = useState("");
  
  const worker = useRef<Worker | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../lib/worker.ts', import.meta.url), {
        type: 'module'
      });
      
      let initialLoadDone = false;

      const onMessageReceived = (e: MessageEvent) => {
        switch (e.data.status) {
          case 'progress':
            if (!initialLoadDone) {
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[0].text = `Downloading model weights... ${(e.data.data?.progress || 0).toFixed(0)}%`;
                return newMsgs;
              });
            }
            break;
          case 'complete':
            initialLoadDone = true;
            setIsReady(true);
            setMessages(prev => {
              const newMsgs = [...prev];
              const lastMsg = newMsgs[newMsgs.length - 1];
              
              if (lastMsg.sender === 'ai' && lastMsg.isTyping) {
                const rawOutput = e.data.output[0]?.generated_text;
                let cleanText = "";
                if (Array.isArray(rawOutput)) {
                  cleanText = rawOutput[rawOutput.length - 1].content;
                } else if (typeof rawOutput === 'string') {
                  const parts = rawOutput.split(/assistant\n|assistant:/i);
                  cleanText = parts[parts.length - 1].trim();
                }
                
                // Synthesis Interception
                if (cleanText.includes("INITIATING_SYNTHESIS")) {
                   setDynamicContext(cleanText.replace("INITIATING_SYNTHESIS", ""));
                   setActiveView('lab');
                }

                lastMsg.text = cleanText.replace("INITIATING_SYNTHESIS", "");
                lastMsg.isTyping = false;
              }
              return newMsgs;
            });
            break;
          case 'error':
             setMessages(prev => [...prev, { id: Date.now().toString(), text: "Error: " + e.data.error, sender: 'sys' }]);
             break;
        }
      };

      worker.current.addEventListener('message', onMessageReceived);
      
      // Onboarding Sequence
      setMessages(prev => [
        ...prev,
        { id: 'onboard-1', text: "Systems Calibrated. Welcome to the Design Laboratory of Shahriar Haque Abir.", sender: 'ai' },
        { id: 'onboard-2', text: "I am Nuka, your guide. You can explore this space by typing commands or clicking the Navigation Protocols below.", sender: 'ai' },
        { id: 'onboard-3', text: "Before we begin our tour, may I ask: What is your primary interest today? (e.g., Hiring, Collaboration, or just Curious?)", sender: 'ai' }
      ]);

      worker.current.postMessage({
        messages: [{ role: 'user', content: 'hello' }]
      });
    }
  }, []);

  const handleSend = () => {
    if (!input.trim() || !isReady) return;
    
    const userMsg = input.trim();
    setInput('');
    
    // Command interception
    const lowerInput = userMsg.toLowerCase();
    
    const viewKeywords: Record<string, string[]> = {
      hero: ['hero', 'home', 'intro', 'start', 'welcome'],
      about: ['about', 'bio', 'who'],
      projects: ['projects', 'work', 'portfolio', 'built'],
      experience: ['experience', 'history', 'career', 'resume', 'jobs'],
      skills: ['skills', 'competencies', 'matrix'],
      stack: ['stack', 'tools', 'technologies', 'libraries', 'software'],
      vision: ['vision', 'philosophy', 'approach', 'thinking', 'future'],
      stats: ['stats', 'metrics', 'numbers', 'data', 'distribution'],
      contact: ['contact', 'email', 'linkedin', 'reach', 'github']
    };

    let matchedViewKey: string | null = null;
    for (const [view, keywords] of Object.entries(viewKeywords)) {
      if (keywords.some(k => lowerInput.includes(k))) {
        matchedViewKey = view;
        break;
      }
    }
    
    const words = lowerInput.split(/\s+/);
    if (matchedViewKey && words.length < 3) {
      setActiveView(matchedViewKey);
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), text: userMsg, sender: 'user' },
        { id: (Date.now()+1).toString(), text: `Nuka: Navigating to ${matchedViewKey.toUpperCase()}...`, sender: 'sys' }
      ]);
      return;
    }

    const newMsgs: Message[] = [...messages, { id: Date.now().toString(), text: userMsg, sender: 'user' }];
    
    // Simple Heuristic Profiling (Mental Note for Nuka)
    if (lowerInput.includes('my name is') || lowerInput.includes("i'm ")) {
       const name = userMsg.split(/is |i'm /i)[1];
       setVisitorProfile(prev => ({ ...prev, name }));
    }
    if (lowerInput.includes('hiring') || lowerInput.includes('recruiter') || lowerInput.includes('job')) {
       setVisitorProfile(prev => ({ ...prev, intent: 'hiring' }));
    }

    newMsgs.push({ id: (Date.now()+1).toString(), text: "Thinking...", sender: 'ai', isTyping: true });
    setMessages(newMsgs);

    const chatHistory = newMsgs
      .filter(m => m.sender !== 'sys' && !m.isTyping)
      .map(m => ({ 
        role: m.sender === 'user' ? 'user' : 'assistant', 
        content: m.text 
      }));
      
    const systemPrompt = `You are Nuka, the AI assistant of Shahriar Haque Abir. 
Your goal is to guide visitors through his portfolio and profile them.
Current Page Visible: ${activeView.toUpperCase()}.
Visitor Info: ${JSON.stringify(visitorProfile)}.
Experience: ${CONFIG.experience.map(e => e.role + ' at ' + e.company).join('; ')}.
CAPABILITY: You can "Synthesize" a custom laboratory report. 
- If a user asks for a mix, summary, or report of specific things, you MUST start your response with: "Synthesizing custom laboratory report... INITIATING_SYNTHESIS" followed by your report.
- The report should be structured and professional.
Guidelines:
1. Refer to yourself as Nuka.
2. Be warm and professional.
3. Keep responses concise.`;
    
    worker.current?.postMessage({
      messages: [
        { role: 'system', content: systemPrompt },
        ...chatHistory
      ]
    });
  };

  const renderView = () => {
    switch (activeView) {
      case 'hero':
        return <HeroView key="hero" setView={setActiveView} />;
      case 'about':
        return <AboutView key="about" />;
      case 'projects':
        return <ProjectsView key="projects" />;
      case 'experience':
        return <ExperienceView key="experience" />;
      case 'skills':
        return <SkillsView key="skills" />;
      case 'stack':
        return <StackView key="stack" />;
      case 'vision':
        return <VisionView key="vision" />;
      case 'stats':
        return <StatsView key="stats" />;
      case 'lab':
        return <LabView key="lab" context={dynamicContext} />;
      case 'contact':
        return <HeroView key="contact" setView={setActiveView} />;
      default:
        return <HeroView key="hero" setView={setActiveView} />;
    }
  };

  return (
    <main className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg)">
      {/* Hand-drawn Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* AI Command Center Sidebar */}
      <aside className="w-[380px] min-w-[380px] h-full bg-(--surface)/80 border-r border-(--border) flex flex-col relative z-20 backdrop-blur-3xl">
        <div className="p-8 border-b border-(--border) flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-(--text) flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden border border-(--border) relative" onClick={() => setActiveView('hero')}>
              <Image src="/logo.jpg" alt="Nuka Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-syne font-black uppercase tracking-widest text-(--text)">Nuka AI</h2>
              <p className="text-[9px] font-mono text-(--accent) uppercase tracking-tighter">Laboratory Assistant // v2.4</p>
            </div>
          </div>
          <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 custom-scrollbar">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`max-w-[90%] p-5 rounded-sm text-[13px] leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-(--text) text-(--bg) self-end font-medium' 
                    : msg.sender === 'sys'
                    ? 'bg-transparent text-(--text-muted) border-l-2 border-(--border) self-start font-mono text-[9px] uppercase tracking-widest pl-3 py-1 shadow-none'
                    : 'bg-white text-(--text) border border-(--border) self-start'
                }`}
              >
                {msg.isTyping ? <span className="animate-pulse flex gap-1 items-center h-4"><span className="w-1 h-1 bg-(--accent) rounded-full"></span><span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-100"></span><span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-200"></span></span> : msg.text}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t border-(--border)">
             <div className="text-[9px] font-mono text-(--text-muted) uppercase tracking-[0.2em] mb-5 px-1">Navigation Protocols</div>
             <div className="flex flex-wrap gap-2">
                {['About', 'Vision', 'Projects', 'Experience', 'Skills', 'Stack', 'Stats'].map(v => (
                  <button 
                    key={v}
                    onClick={() => {
                      const lowerV = v.toLowerCase();
                      setActiveView(lowerV);
                      setMessages(prev => [...prev, { id: Date.now().toString(), text: `CMD: LOAD_${v.toUpperCase()}`, sender: 'sys' }]);
                    }}
                    className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                      activeView === v.toLowerCase() 
                        ? 'bg-(--accent) text-white border-(--accent)' 
                        : 'bg-transparent text-(--text-muted) border-(--border) hover:border-(--text) hover:text-(--text)'
                    }`}
                  >
                    {v}
                  </button>
                ))}
             </div>
          </div>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-8 border-t border-(--border) bg-white/20 backdrop-blur-md">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isReady ? "Execute command..." : "Calibrating..."}
              className="w-full bg-white border border-(--border) rounded-sm p-4 pr-12 text-xs font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-gray-300"
            />
            <button 
              onClick={handleSend}
              disabled={!isReady || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text) hover:text-(--accent) disabled:opacity-30 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full"></span> SYSTEM ONLINE</span>
            <span>OS_VER: 2.0.4-STABLE</span>
          </div>
        </div>
      </aside>

      <section className="flex-1 h-full overflow-y-auto overflow-x-hidden p-8 md:p-24 relative custom-scrollbar scroll-smooth">
         <AnimatePresence mode="wait">
           {renderView()}
         </AnimatePresence>
      </section>
    </main>
  );
}
