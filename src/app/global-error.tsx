"use client";

import { Syne, JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export default function GlobalError(
  props: {
    error: Error & { digest?: string };
    reset: () => void;
  },
) {
  return (
    <html className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="bg-[#0a0a0f] text-[#eef6f8] flex items-center justify-center min-h-screen p-8">
        <main className="text-center max-w-md">
          <h1 className="font-syne text-3xl font-black mb-4">Critical error</h1>
          <p className="font-mono text-sm mb-8 leading-relaxed">The application failed to load. Please try again.</p>
          <button
            onClick={() => props.reset()}
            className="px-6 py-3 border border-[#38bdf8]/40 bg-[#38bdf8]/10 font-mono text-xs uppercase tracking-widest text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-colors"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
