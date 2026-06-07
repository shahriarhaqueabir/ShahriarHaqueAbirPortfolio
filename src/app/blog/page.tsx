import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical notes and thoughts on Tier-3 support, local AI workflows, and GTM operations by Shahriar Haque Abir.",
};

export default function BlogPage() {
  return <PortfolioShell initialView="blog" />;
}
