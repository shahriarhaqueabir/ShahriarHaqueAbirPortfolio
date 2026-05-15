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
import { 
  Terminal, 
  Cpu, 
  Navigation, 
  ShieldCheck, 
  User, 
  Layers, 
  Zap, 
  BarChart3, 
  Eye, 
  Briefcase, 
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import Image from "next/image";

type Message = { id: string; text: string; sender: 'sys' | 'user' | 'ai'; isTyping?: boolean; isReadyGreen?: boolean };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Initializing Local AI Assistant (SmolLM2-360M)... This may take a moment to load the weights on first visit.", sender: 'sys' }
  ]);
  const [input, setInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [activeView, setActiveView] = useState('hero');
  const [visitorProfile, setVisitorProfile] = useState<Record<string, string>>({});
  const [dynamicContext, setDynamicContext] = useState("");
  const [showReadyToast, setShowReadyToast] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootStatus, setBootStatus] = useState<string[]>([
    "Building System Core",
    "[OK]",
    "Loading AI Parameters",
    "[OK]",
    "Kernel initialized...",
    "....................................."
  ]);
  const [visibleLogCount, setVisibleLogCount] = useState(0);

  // Sequential log reveal logic
  useEffect(() => {
    if (visibleLogCount < bootStatus.length) {
      const prevLine = bootStatus[visibleLogCount - 1];
      const delay = prevLine === "[OK]" ? 800 : 300;

      const timer = setTimeout(() => {
        setVisibleLogCount(prev => prev + 1);
        
        if (bootStatus[visibleLogCount] === "1.") {
           setTimeout(() => setIsBooting(false), 800);
        }
      }, delay); 
      return () => clearTimeout(timer);
    }
  }, [bootStatus.length, visibleLogCount]);
  
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
            const progress = (e.data.data?.progress || 0);
            if (!initialLoadDone) {
              setMessages(prev => {
                const newMsgs = [...prev];
                if (newMsgs[0]) {
                  newMsgs[0].text = `Downloading model weights... ${progress.toFixed(0)}%`;
                }
                return newMsgs;
              });
              
              setBootStatus(prev => {
                const next = [...prev];
                if (progress > 30 && next.length === 6) next.push("Loading neural weights (360M)...", "[OK]");
                if (progress > 60 && next.length === 8) next.push("Calibrating inference engine...", "[OK]");
                if (progress > 90 && next.length === 10) next.push("Optimizing UI modules...", "[OK]");
                return next;
              });
            }
            break;
          case 'complete':
            if (initialLoadDone) break;
            initialLoadDone = true;
            setIsReady(true);
            setShowReadyToast(true);
            setTimeout(() => setShowReadyToast(false), 5000);
            
            // Remove download progress message
            setMessages(prev => prev.filter(m => m.id !== '1'));
            
            // Completion Sequence - Countdown
            setBootStatus(prev => [...prev, "System ready in 3...", "2...", "1."]);

            // Sequential Onboarding Sequence
            setTimeout(() => {
                // Note: setIsBooting is now handled by the reveal useEffect reaching "1."
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: 'onboard-1', text: "Welcome to Shahriar's Portfolio.", sender: 'ai', isReadyGreen: true }]);
                    setTimeout(() => {
                        setMessages(prev => [...prev, { id: 'onboard-2', text: "I am your AI assistant. I can help you analyze Shahriar's technical trajectory, navigate specific modules, or synthesize custom CV insights based on your requirements.", sender: 'ai' }]);
                        setTimeout(() => {
                            setMessages(prev => [...prev, { id: 'onboard-3', text: "Before we initialize the full tour: What is your primary objective today? (e.g., 'I am looking to hire', 'Just exploring', 'Seeking collaboration')", sender: 'ai' }]);
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1000);

            setMessages(prev => {
              const newMsgs = [...prev];
              const lastMsg = newMsgs[newMsgs.length - 1];
              
              if (lastMsg && lastMsg.sender === 'ai' && lastMsg.isTyping) {
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
    
    // Simple Heuristic Profiling (Mental Note)
    if (lowerInput.includes('my name is') || lowerInput.includes("i'm ")) {
       const name = userMsg.split(/is |i'm /i)[1];
       setVisitorProfile(prev => ({ ...prev, name }));
    }
    if (lowerInput.includes('hiring') || lowerInput.includes('recruiter') || lowerInput.includes('job') || lowerInput.includes('role')) {
       setVisitorProfile(prev => ({ ...prev, intent: 'hiring' }));
    }
    if (lowerInput.includes('collab') || lowerInput.includes('partner') || lowerInput.includes('project')) {
       setVisitorProfile(prev => ({ ...prev, intent: 'collaboration' }));
    }

    newMsgs.push({ id: (Date.now()+1).toString(), text: "Thinking...", sender: 'ai', isTyping: true });
    setMessages(newMsgs);

    const chatHistory = newMsgs
      .filter(m => m.sender !== 'sys' && !m.isTyping)
      .map(m => ({ 
        role: m.sender === 'user' ? 'user' : 'assistant', 
        content: m.text 
      }));
      
    const systemPrompt = `You are the AI assistant for Shahriar's Portfolio (An AI optimized CV). 
Your goal is to onboard visitors, guide them through the portfolio, and answer questions with extreme precision.

CURRENT STATE:
- Active View: ${activeView.toUpperCase()}
- Visitor Profile: ${JSON.stringify(visitorProfile)}

KNOWLEDGE BASE:
- Identity: Shahriar is a ${CONFIG.taglines.join(', ')} based in ${CONFIG.location}.
- Bio: ${CONFIG.profile}
- Experience: ${CONFIG.experience.map(e => `${e.role} at ${e.company} (${e.period})`).join('; ')}
- Projects: ${CONFIG.projects.map(p => `${p.name}: ${p.desc}`).join('; ')}
- Skills: ${CONFIG.skills.map(s => `${s.group}: ${s.items.join(', ')}`).join('; ')}
- Contact: ${CONFIG.contact.map(c => `${c.label}: ${c.value}`).join(', ')}

CAPABILITIES:
1. NAVIGATION: You can tell users to check specific views (Hero, About, Projects, Experience, Skills, Stack, Vision, Stats).
2. SYNTHESIS: If a user asks for a summary, a "pitch", or a custom CV synthesis, you MUST:
   - Start with: "Synthesizing custom CV insights... INITIATING_SYNTHESIS"
   - Follow with a structured, professional report tailored to their profile.

GUIDELINES:
1. Persona: Professional, technical, editorial, and helpful. 
2. Tone: "Cinematic Technical" - use words like "Protocol", "Module", "Calibration", "Analysis".
3. Accuracy: Only answer based on the KNOWLEDGE BASE. If unsure, offer to navigate them to the "Contact" protocol.
4. Conciseness: Avoid fluff. Be direct.`;

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
    <main className="flex h-screen w-full relative z-10 font-inter text-(--text) bg-(--bg) overflow-hidden">
      {/* Boot/Loading Screen Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-(--bg) flex items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             <div className="max-w-md w-full p-10 relative">
                <div className="flex flex-col items-center gap-12">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     className="w-24 h-24 border border-(--border) flex items-center justify-center relative"
                   >
                      <div className="absolute inset-2 border-2 border-t-(--accent) border-transparent rounded-full animate-spin"></div>
                      <Cpu className="w-8 h-8 text-(--accent)" />
                   </motion.div>
                   
                   <div className="w-full space-y-8">
                      <div className="text-center">
                         <h1 className="text-xl font-syne font-black uppercase tracking-[0.3em] mb-2">System Building</h1>
                         <p className="text-[10px] font-mono text-(--text-muted) uppercase tracking-widest">Integrating AI Enabled Portfolio // Core 360M</p>
                      </div>
                      
                      <div className="space-y-3 font-mono text-[9px] uppercase tracking-widest text-(--text-muted)">
                         {bootStatus.slice(0, visibleLogCount).map((s, i) => (
                           <motion.div 
                             key={i}
                             initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                             transition={{ duration: 0.6, ease: "easeOut" }}
                             className="flex items-center gap-2"
                           >
                              <span className={s === "[OK]" ? "text-(--accent)" : ""}>{s}</span>
                           </motion.div>
                         ))}
                         {visibleLogCount < bootStatus.length && (
                           <div className="flex items-center gap-2">
                              <span className="animate-pulse text-(--accent)">_</span>
                           </div>
                         )}
                      </div>

                      <div className="h-px bg-(--border) relative overflow-hidden">
                         <motion.div 
                           initial={{ x: "-100%" }}
                           animate={{ x: isReady ? "0%" : "0%" }} 
                           className="absolute inset-0 bg-(--accent)"
                         ></motion.div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hand-drawn Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* AI Command Center Sidebar */}
      <aside className="w-[380px] min-w-[380px] h-full bg-(--surface)/80 border-r border-(--border) flex flex-col relative z-20 backdrop-blur-3xl">
        <div className="p-8 border-b border-(--border) flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={isReady ? { 
                boxShadow: ["0 0 0px var(--accent)", "0 0 15px var(--accent)", "0 0 0px var(--accent)"],
              } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-10 h-10 rounded-sm bg-(--text) flex items-center justify-center rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden border border-(--border) relative" 
              onClick={() => setActiveView('hero')}
            >
              <Image src="/logo.jpg" alt="Nuka Logo" fill className="object-cover" />
            </motion.div>
            <div>
              <h2 className="text-sm font-syne font-black uppercase tracking-widest text-(--text) flex items-center gap-2">
                Shahriar's Portfolio <Cpu className={`w-3 h-3 ${isReady ? 'text-green-500' : 'text-orange-500'}`} />
              </h2>
              <p className="text-[9px] font-mono text-(--accent) uppercase tracking-tighter">An AI optimized CV</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[8px] font-mono text-(--text-muted) uppercase">{isReady ? 'Ready' : 'Loading'}</span>
             <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-orange-500 animate-bounce'}`}></div>
          </div>
        </div>

        {/* Readiness Toast */}
        <AnimatePresence>
          {showReadyToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-24 left-6 right-6 z-50 bg-green-50 border border-green-200 p-4 rounded-sm shadow-xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-[10px] font-bold text-green-800 uppercase tracking-wider">System Operational</div>
                <div className="text-[9px] text-green-700">360M Model successfully loaded. Ready for synthesis.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 custom-scrollbar">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`max-w-[90%] p-5 rounded-sm text-[13px] leading-relaxed shadow-sm relative group ${
                  msg.sender === 'user' 
                    ? 'bg-(--text) text-(--bg) self-end font-medium' 
                    : msg.sender === 'sys'
                    ? 'bg-transparent text-(--text-muted) border-l-2 border-(--border) self-start font-mono text-[9px] uppercase tracking-widest pl-3 py-1 shadow-none'
                    : msg.isReadyGreen
                    ? 'bg-green-500 text-white border-green-400 self-start font-bold'
                    : 'bg-white text-(--text) border border-(--border) self-start'
                }`}
              >
                <div className="flex items-start gap-3">
                  {msg.sender === 'ai' && !msg.isTyping && <Terminal className="w-3 h-3 mt-1 text-(--accent) opacity-50" />}
                  {msg.sender === 'user' && <User className="w-3 h-3 mt-1 text-(--bg) opacity-50" />}
                  <span>{msg.isTyping ? <span className="animate-pulse flex gap-1 items-center h-4"><span className="w-1 h-1 bg-(--accent) rounded-full"></span><span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-100"></span><span className="w-1 h-1 bg-(--accent) rounded-full animation-delay-200"></span></span> : msg.text}</span>
                </div>
                
                {/* Decorative corner for AI messages */}
                {msg.sender === 'ai' && (
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-(--border) opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t border-(--border)">
             <div className="text-[9px] font-mono text-(--text-muted) uppercase tracking-[0.2em] mb-5 px-1">Navigation Protocols</div>
             <div className="flex flex-wrap gap-2">
                {[
                  { name: 'About', icon: User, view: 'about' },
                  { name: 'Vision', icon: Eye, view: 'vision' },
                  { name: 'Projects', icon: Briefcase, view: 'projects' },
                  { name: 'Experience', icon: Layers, view: 'experience' },
                  { name: 'Skills', icon: Zap, view: 'skills' },
                  { name: 'Stack', icon: Cpu, view: 'stack' },
                  { name: 'Stats', icon: BarChart3, view: 'stats' }
                ].map(v => (
                  <button 
                    key={v.name}
                    onClick={() => {
                      setActiveView(v.view);
                      setMessages(prev => [...prev, { id: Date.now().toString(), text: `CMD: LOAD_${v.name.toUpperCase()}`, sender: 'sys' }]);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                      activeView === v.view 
                        ? 'bg-(--accent) text-white border-(--accent) shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]' 
                        : 'bg-transparent text-(--text-muted) border-(--border) hover:border-(--text) hover:text-(--text) hover:bg-gray-50'
                    }`}
                  >
                    <v.icon className="w-3 h-3" />
                    {v.name}
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
               className="w-full bg-white border border-(--border) rounded-sm p-4 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-(--accent) transition-all text-(--text) placeholder:text-gray-300"
             />
             <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
             <button 
               onClick={handleSend}
               disabled={!isReady || !input.trim()}
               className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text) hover:text-(--accent) disabled:opacity-30 p-1 group"
             >
               <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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
