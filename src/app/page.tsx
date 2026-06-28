import type { Metadata } from "next";
import PortfolioShellLoader from "./PortfolioShellLoader";
import { siteTitle, siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <PortfolioShellLoader />;
}
