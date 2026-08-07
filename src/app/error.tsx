"use client";

import { useEffect } from "react";
import { Syne, JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.debug("Page error:", error);
    }
  }, [error]);

  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center p-8">
        <main className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 flex items-center justify-center">
              <span className="font-syne text-2xl font-black text-[var(--accent)]">!</span>
            </div>
          </div>
          <h1 className="font-syne text-4xl font-black tracking-tight mb-4">System fault</h1>
          <p className="font-mono text-sm text-[var(--text)]/60 mb-8 leading-relaxed">Something went wrong rendering this page. The error has been logged.</p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)]/40 bg-[var(--accent)]/10 font-mono text-xs uppercase tracking-widest text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors"
          >
            Try again
          </button>
          <p className="mt-12 font-mono text-[9px] text-[var(--text)]/30 uppercase tracking-widest">Shahriar Haque Abir · Portfolio</p>
        </main>
      </body>
    </html>
  );
}
