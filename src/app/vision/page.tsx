import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Vision",
  description: "Shahriar Haque Abir's guiding principles, professional philosophy, and approach to systems engineering and technical leadership.",
};

export default function VisionPage() {
  return <PortfolioShell initialView="vision" />;
}
