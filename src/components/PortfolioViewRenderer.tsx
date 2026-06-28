"use client";

import { type RefObject } from "react";
import dynamic from "next/dynamic";

const HeroView = dynamic(() => import("@/components/views/HeroView"));
const AboutView = dynamic(() => import("@/components/views/AboutView"));
const ProjectsView = dynamic(() => import("@/components/views/ProjectsView"));
const ExperienceView = dynamic(() => import("@/components/views/ExperienceView"));
const SkillsView = dynamic(() => import("@/components/views/SkillsView"));
const StatsView = dynamic(() => import("@/components/views/StatsView"));
const ContactView = dynamic(() => import("@/components/views/ContactView"));
import type { ViewKey } from "@/lib/types";

type PortfolioViewRendererProps = {
  activeView: ViewKey;
  setView: (view: ViewKey) => void;
  onAiQuery?: (input: string) => void;
  scrollContainerRef?: RefObject<HTMLElement | null>;
};

export default function PortfolioViewRenderer({ activeView, setView, onAiQuery, scrollContainerRef }: PortfolioViewRendererProps) {
  switch (activeView) {
    case "hero":
      return <HeroView key="hero" setView={setView} onAiQuery={onAiQuery} />;

    case "about":
      return <AboutView key="about" setView={setView} scrollContainerRef={scrollContainerRef} />;
    case "projects":
      return <ProjectsView key="projects" setView={setView} />;
    case "experience":
      return <ExperienceView key="experience" setView={setView} />;
    case "skills":
      return <SkillsView key="skills" setView={setView} />;
    case "stats":
      return <StatsView key="stats" />;
    case "contact":
      return <ContactView key="contact" setView={setView} />;
    default:
      return <HeroView key="hero" setView={setView} />;
  }
}
