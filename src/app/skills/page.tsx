import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Skills | Shahriar Haque Abir | Support, Integration & Security",
  description:
    "Explore Shahriar Haque Abir's technical skills across support operations, systems integration, SQL, APIs, automation, networking, and security.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/skills`,
    siteName,
    title: "Skills | Shahriar Haque Abir | Support, Integration & Security",
    description:
      "Explore Shahriar Haque Abir's technical skills across support operations, systems integration, SQL, APIs, automation, networking, and security.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Skills | Shahriar Haque Abir",
      },
    ],
  },
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return <PortfolioShell initialView="skills" />;
}
