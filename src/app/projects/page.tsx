import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Shahriar Haque Abir's technical projects, including database visualizers, onboarding portals, and automated diagnostic tools.",
};

export default function ProjectsPage() {
  return <PortfolioShell initialView="projects" />;
}
