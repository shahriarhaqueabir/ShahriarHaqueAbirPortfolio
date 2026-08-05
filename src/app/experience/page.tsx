import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Experience | Shahriar Haque Abir | SaaS, Support & Engineering",
  description:
    "Review Shahriar Haque Abir's professional experience across technical operations, SaaS consulting, network engineering, and support delivery.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/experience`,
    siteName,
    title: "Experience | Shahriar Haque Abir | SaaS, Support & Engineering",
    description:
      "Review Shahriar Haque Abir's professional experience across technical operations, SaaS consulting, network engineering, and support delivery.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Experience | Shahriar Haque Abir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Shahriar Haque Abir | SaaS, Support & Engineering",
    description:
      "Review Shahriar Haque Abir's professional experience across technical operations, SaaS consulting, network engineering, and support delivery.",
    images: [socialPreviewImage],
  },
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperiencePage() {
  return <PortfolioShell initialView="experience" />;
}
