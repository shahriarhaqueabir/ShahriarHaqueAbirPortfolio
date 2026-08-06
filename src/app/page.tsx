import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";
import { siteDescription, siteName, siteTitle, siteUrl, socialPreviewImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Shahriar Haque Abir portfolio preview",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <PortfolioShell />;
}
