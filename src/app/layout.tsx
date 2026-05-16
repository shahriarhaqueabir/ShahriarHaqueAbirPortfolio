import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Hawkward | Shahriar Haque Abir",
  description: "Shahriar Haque Abir's AI Enabled Portfolio.",
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
      <body className="antialiased min-h-screen bg-(--bg) text-(--text) overflow-hidden relative">
        <LenisProvider>
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.08),transparent_34%,rgba(245,158,11,0.07)_72%,transparent)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(238,246,248,0.35),transparent)]" />
          </div>
          
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
