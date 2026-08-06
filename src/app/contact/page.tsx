import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteName, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Shahriar Haque Abir | Technical Operations & Consulting",
  description:
    "Contact Shahriar Haque Abir about technical operations, implementation support, integration work, consulting, or cybersecurity-focused opportunities.",
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    siteName,
    title: "Contact Shahriar Haque Abir | Technical Operations & Consulting",
    description:
      "Contact Shahriar Haque Abir about technical operations, implementation support, integration work, consulting, or cybersecurity-focused opportunities.",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Contact Shahriar Haque Abir",
      },
    ],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <PortfolioShell initialView="contact" />;
}
