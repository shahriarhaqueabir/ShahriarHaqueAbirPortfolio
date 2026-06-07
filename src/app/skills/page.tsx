import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical capability map of Shahriar Haque Abir: SQL, APIs, AI Automation, Networking, and Systems Integration.",
};

export default function SkillsPage() {
  return <PortfolioShell initialView="skills" />;
}
