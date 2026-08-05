import type { Metadata } from "next";
import Script from "next/script";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { VercelInsightsWrapper } from "@/components/VercelInsightsWrapper";
import { CONFIG } from "@/lib/data";
import { siteDescription, siteName, siteTitle, siteUrl, socialPreviewImage } from "@/lib/seo";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s",
  },
  description: siteDescription,
  authors: [{ name: CONFIG.name, url: siteUrl }],
  creator: CONFIG.name,
  publisher: CONFIG.name,
  // Note: canonical is set per-page in each route's metadata export
  openGraph: {
    type: "website",
    locale: "en_US",
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
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialPreviewImage],
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

import dynamic from "next/dynamic";
import { PostLcpRender } from "@/components/PostLcpRender";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground").then((mod) => ({ default: mod.ParticleBackground })));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-(--bg) text-(--text)">
        <a href="#main-content" className="fixed -top-40 left-2 z-50 px-4 py-2 bg-(--accent) text-(--bg) text-sm font-mono transition-all focus:top-2 focus:outline-none">
          Skip to content
        </a>
        {/* Explicit high-priority preload for the LCP hero image
            Next.js generates a default preload via priority prop on <Image>,
            but it may lack fetchpriority="high". This ensures the browser
            prioritizes profile.jpg over other resources. */}
        <link rel="preload" href="/profile.jpg" as="image" fetchPriority="high" />
        <Script id="proton-pass-fix" strategy="beforeInteractive">
          {`(function(){var a=document.querySelectorAll("[data-protonpass-form]");for(var i=0;i<a.length;i++)a[i].removeAttribute("data-protonpass-form")})()`}
        </Script>
        <PersonJsonLd />
        <PostLcpRender>
          <ParticleBackground />
        </PostLcpRender>
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_34%,rgba(245,158,11,0.07)_72%,transparent)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(238,246,248,0.35),transparent)]" />
        </div>
        <main id="main-content">{children}</main>
        <VercelInsightsWrapper />
      </body>
    </html>
  );
}
