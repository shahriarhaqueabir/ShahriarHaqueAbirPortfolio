import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Experience",
  description: "Chronological professional record of Shahriar Haque Abir: Technical Operations, SaaS Consulting, and Network Engineering.",
};

export default function ExperiencePage() {
  return <PortfolioShell initialView="experience" />;
}
