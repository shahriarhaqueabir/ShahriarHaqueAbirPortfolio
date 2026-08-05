import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stats | Shahriar Haque Abir | Portfolio Proof Points",
  description:
    "See Shahriar Haque Abir's key portfolio stats, delivery metrics, and working-style proof points in one quick scan.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/stats`,
    siteName,
    title: "Stats | Shahriar Haque Abir | Portfolio Proof Points",
    description:
      "See Shahriar Haque Abir's key portfolio stats, delivery metrics, and working-style proof points in one quick scan.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Stats | Shahriar Haque Abir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stats | Shahriar Haque Abir | Portfolio Proof Points",
    description:
      "See Shahriar Haque Abir's key portfolio stats, delivery metrics, and working-style proof points in one quick scan.",
    images: [socialPreviewImage],
  },
  alternates: {
    canonical: "/stats",
  },
};

export default function StatsPage() {
  return <PortfolioShell initialView="stats" />;
}
