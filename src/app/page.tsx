import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteTitle, siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default function Home() {
  return <PortfolioShell />;
}
