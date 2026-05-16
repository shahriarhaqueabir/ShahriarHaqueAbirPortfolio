"use client";

import HeroView from "@/components/views/HeroView";
import AboutView from "@/components/views/AboutView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import SkillsView from "@/components/views/SkillsView";
import StatsView from "@/components/views/StatsView";
import LabView from "@/components/views/LabView";
import ContactView from "@/components/views/ContactView";
import type { ViewKey } from "@/lib/types";

type PortfolioViewRendererProps = {
  activeView: ViewKey;
  dynamicContext: string;
  setView: (view: ViewKey) => void;
};

export default function PortfolioViewRenderer({ activeView, dynamicContext, setView }: PortfolioViewRendererProps) {
  switch (activeView) {
    case "hero":
      return <HeroView key="hero" setView={setView} />;
    case "about":
      return <AboutView key="about" setView={setView} />;
    case "projects":
      return <ProjectsView key="projects" setView={setView} />;
    case "experience":
      return <ExperienceView key="experience" setView={setView} />;
    case "skills":
      return <SkillsView key="skills" setView={setView} />;
    case "stack":
      return <SkillsView key="skills-stack" setView={setView} />;
    case "vision":
      return <AboutView key="about-vision" setView={setView} />;
    case "stats":
      return <StatsView key="stats" setView={setView} />;
    case "lab":
      return <LabView key="lab" context={dynamicContext} setView={setView} />;
    case "contact":
      return <ContactView key="contact" setView={setView} />;
    default:
      return <HeroView key="hero" setView={setView} />;
  }
}
