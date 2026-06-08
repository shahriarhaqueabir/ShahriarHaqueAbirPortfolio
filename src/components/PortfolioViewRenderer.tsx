"use client";

import { type RefObject } from "react";
import HeroView from "@/components/views/HeroView";
import BlogView from "@/components/views/BlogView";
import AboutView from "@/components/views/AboutView";
import ProjectsView from "@/components/views/ProjectsView";
import ExperienceView from "@/components/views/ExperienceView";
import SkillsView from "@/components/views/SkillsView";
import StatsView from "@/components/views/StatsView";
import ContactView from "@/components/views/ContactView";
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
    case "blog":
      return <BlogView key="blog" setView={setView} />;
    case "about":
      return <AboutView key="about" setView={setView} scrollContainerRef={scrollContainerRef} />;
    case "projects":
      return <ProjectsView key="projects" setView={setView} />;
    case "experience":
      return <ExperienceView key="experience" setView={setView} />;
    case "skills":
      return <SkillsView key="skills" setView={setView} />;
    case "stack":
      return <SkillsView key="skills-stack" setView={setView} />;
    case "vision":
      return <AboutView key="about-vision" setView={setView} scrollContainerRef={scrollContainerRef} />;
    case "stats":
      return <StatsView key="stats" setView={setView} />;
    case "contact":
      return <ContactView key="contact" setView={setView} />;
    default:
      return <HeroView key="hero" setView={setView} />;
  }
}
