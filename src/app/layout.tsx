import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { VercelInsightsWrapper } from "@/components/VercelInsightsWrapper";
import { CONFIG } from "@/lib/data";
import { siteDescription, siteTitle, siteUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Shahriar Haque Abir",
  },
  description: siteDescription,
  authors: [{ name: CONFIG.name, url: siteUrl }],
  creator: CONFIG.name,
  publisher: CONFIG.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shahriar Haque Abir Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Shahriar Haque Abir, Technical Operations Engineer",
      },
      {
        url: "/profile.jpg",
        width: 3456,
        height: 2305,
        alt: "Shahriar Haque Abir, Technical Operations Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${syne.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-(--bg) text-(--text) relative">
        <PersonJsonLd />
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_34%,rgba(245,158,11,0.07)_72%,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(238,246,248,0.35),transparent)]" />
        </div>
        {children}
        <VercelInsightsWrapper />
      </body>
    </html>
  );
}
