"use client";

import { motion } from "framer-motion";
import { LockKeyhole, PenLine } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

export default function BlogView({ setView }: { setView: (view: ViewKey) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="pt-10 pb-20 max-w-5xl">
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Blog</div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div>
          <h2 className="text-5xl md:text-7xl font-syne font-black text-(--text) leading-none">Posts</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--text-muted)">
            Owner-authored updates on technical products, customer adoption, GTM context, support patterns, and AI automation.
          </p>
        </div>
        <div className="flex items-start gap-3 border border-(--border) bg-(--surface) p-5 max-w-sm">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-(--accent)" />
          <p className="text-xs leading-relaxed text-(--text-muted)">Read-only for visitors. Updates are made directly by Shahriar through the site content.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px border border-(--border) bg-(--border)">
        {CONFIG.blog.map((post, index) => (
          <article key={post.title} className="bg-(--bg) p-7 md:p-9">
            <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-(--text-muted)">
              <span className="text-(--accent)">{String(index + 1).padStart(2, "0")}</span>
              <span>{post.category}</span>
              <span>{post.date}</span>
            </div>
            <div className="flex items-start gap-5">
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center border border-(--border) bg-(--surface) text-(--accent) sm:flex">
                <PenLine className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-syne text-2xl md:text-3xl font-black leading-tight text-(--text)">{post.title}</h3>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-(--text-muted)">{post.excerpt}</p>
                <p className="mt-6 max-w-3xl border-l-2 border-(--accent) pl-5 text-base leading-8 text-(--text)">{post.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <GuidedNext currentView="blog" onNavigate={setView} />
    </motion.div>
  );
}
