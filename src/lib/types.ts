export type Message = {
  id: string;
  text: string;
  sender: "sys" | "user" | "ai" | "fallback";
  isTyping?: boolean;
  isStreaming?: boolean;
  wasStreamed?: boolean;
  isReadyGreen?: boolean;
  suggestions?: string[];
};

export type ViewKey = "hero" | "about" | "projects" | "experience" | "skills" | "stats" | "contact";
