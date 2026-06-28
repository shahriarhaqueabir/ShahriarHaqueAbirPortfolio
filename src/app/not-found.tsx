import Link from "next/link";
import { Syne, JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export default function NotFound() {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen bg-[#0a0a0f] text-[#eef6f8] flex items-center justify-center p-8">
        <main className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/5 flex items-center justify-center">
              <span className="font-syne text-2xl font-black text-[#38bdf8]">404</span>
            </div>
          </div>
          <h1 className="font-syne text-4xl font-black tracking-tight mb-4">Page not found</h1>
          <p className="font-mono text-sm text-[#eef6f8]/60 mb-8 leading-relaxed">
            This route doesn&apos;t exist in the portfolio. Try the homepage.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#38bdf8]/40 bg-[#38bdf8]/10 font-mono text-xs uppercase tracking-widest text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-colors"
          >
            Go home
          </Link>
          <p className="mt-12 font-mono text-[9px] text-[#eef6f8]/30 uppercase tracking-widest">
            Shahriar Haque Abir · Portfolio
          </p>
        </main>
      </body>
    </html>
  );
}
