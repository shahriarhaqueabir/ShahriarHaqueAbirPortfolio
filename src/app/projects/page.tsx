import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects by Shahriar Haque Abir | Technical Operations & Automation",
  description:
    "Explore Shahriar Haque Abir's technical projects, including operations tooling, automation systems, onboarding workflows, and diagnostic platforms.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    siteName,
    title: "Projects by Shahriar Haque Abir | Technical Operations & Automation",
    description:
      "Explore Shahriar Haque Abir's technical projects, including operations tooling, automation systems, onboarding workflows, and diagnostic platforms.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Projects by Shahriar Haque Abir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Shahriar Haque Abir | Technical Operations & Automation",
    description:
      "Explore Shahriar Haque Abir's technical projects, including operations tooling, automation systems, onboarding workflows, and diagnostic platforms.",
    images: [socialPreviewImage],
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return <PortfolioShell initialView="projects" />;
}
