export type Message = {
  id: string;
  text: string;
  sender: "sys" | "user" | "ai";
  isTyping?: boolean;
  isReadyGreen?: boolean;
};

export type ViewKey =
  | "hero"
  | "blog"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "stack"
  | "vision"
  | "stats"
  | "contact";
