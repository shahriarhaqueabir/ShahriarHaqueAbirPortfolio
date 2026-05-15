import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Shahriar Haque Abir | Digital Architect",
  description: "Portfolio of Shahriar Haque Abir — Application Implementation Consultant.",
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
      <body className="antialiased min-h-screen bg-(--bg) text-white overflow-hidden relative">
        <LenisProvider>
          {/* Animated Background Mesh */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="blob w-[600px] h-[600px] bg-[var(--accent)] top-[-10%] left-[40%] animate-[float_20s_infinite_alternate]" style={{ animationDelay: '0s' }}></div>
            <div className="blob w-[500px] h-[500px] bg-[var(--accent2)] bottom-[-20%] left-[-10%] animate-[float_20s_infinite_alternate]" style={{ animationDelay: '-5s' }}></div>
            <div className="blob w-[400px] h-[400px] bg-[#6200EA] top-[30%] right-[-5%] animate-[float_20s_infinite_alternate]" style={{ animationDelay: '-10s' }}></div>
          </div>
          
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
