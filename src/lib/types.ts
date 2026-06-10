export type Message = {
  id: string;
  text: string;
  sender: "sys" | "user" | "ai" | "fallback";
  isTyping?: boolean;
  isReadyGreen?: boolean;
  suggestions?: string[];
};

export type ViewKey = "hero" | "about" | "projects" | "experience" | "skills" | "stack" | "vision" | "stats" | "contact";
