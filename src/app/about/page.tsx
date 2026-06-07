import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "About",
  description: "Shahriar Haque Abir's professional journey, philosophy, and background in systems engineering and technical consulting.",
};

export default function AboutPage() {
  return <PortfolioShell initialView="about" />;
}
