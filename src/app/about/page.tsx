import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Shahriar Haque Abir | Technical Operations, Integration & Support",
  description:
    "Learn about Shahriar Haque Abir's background in technical operations, integration engineering, application support, and cybersecurity-focused delivery.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    siteName,
    title: "About Shahriar Haque Abir | Technical Operations, Integration & Support",
    description:
      "Learn about Shahriar Haque Abir's background in technical operations, integration engineering, application support, and cybersecurity-focused delivery.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "About Shahriar Haque Abir",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <PortfolioShell initialView="about" />;
}
