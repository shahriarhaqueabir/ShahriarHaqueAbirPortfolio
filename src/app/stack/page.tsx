import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Comprehensive technology stack and tooling used by Shahriar Haque Abir across technical operations, data, automation, and networking.",
};

export default function StackPage() {
  return <PortfolioShell initialView="stack" />;
}
