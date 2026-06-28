"use client";

import { useEffect } from "react";
import { Syne, JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.debug("Page error:", error);
    }
  }, [error]);

  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-[#0a0a0f] text-[#eef6f8] flex items-center justify-center p-8">
        <main className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/5 flex items-center justify-center">
              <span className="font-syne text-2xl font-black text-[#38bdf8]">!</span>
            </div>
          </div>
          <h1 className="font-syne text-3xl font-black tracking-tight mb-4">System fault</h1>
          <p className="font-mono text-sm text-[#eef6f8]/60 mb-8 leading-relaxed">
            Something went wrong rendering this page. The error has been logged.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#38bdf8]/40 bg-[#38bdf8]/10 font-mono text-xs uppercase tracking-widest text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-colors"
          >
            Try again
          </button>
          <p className="mt-12 font-mono text-[10px] text-[#eef6f8]/30 uppercase tracking-widest">
            Shahriar Haque Abir · Portfolio
          </p>
        </main>
      </body>
    </html>
  );
}
