import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Stats",
  description: "Visual metrics and professional proof points of Shahriar Haque Abir's career impact and working style.",
};

export default function StatsPage() {
  return <PortfolioShell initialView="stats" />;
}
