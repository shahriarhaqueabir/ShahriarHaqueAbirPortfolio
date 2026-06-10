"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Download, ExternalLink, Link, Mail, MapPin, ShieldCheck } from "lucide-react";
import GuidedNext from "@/components/GuidedNext";
import { CONFIG } from "@/lib/data";
import type { ViewKey } from "@/lib/types";

const contactIcons: Record<string, typeof Mail> = {
  Email: Mail,
  LinkedIn: Link,
  GitHub: Link,
  CV: Download,
  Location: MapPin,
};

const getContactIcon = (label: string): typeof Mail => {
  if (Object.prototype.hasOwnProperty.call(contactIcons, label)) {
    return contactIcons[label];
  }
  return ExternalLink;
};

export default function ContactView({ setView }: { setView: (view: ViewKey) => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }} animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }} className="pt-10 pb-20 max-w-5xl">
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">— Contact</div>
      <h2 className="text-3xl md:text-5xl font-syne font-black mb-10 text-(--text) leading-[0.9] tracking-tight">
        Let&apos;s <span className="italic font-playfair font-normal text-(--text-muted) lowercase tracking-normal">talk.</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-px bg-(--border) border border-(--border)">
        <section className="bg-(--bg) p-10 md:p-12 flex flex-col justify-between min-h-0 md:min-h-[420px] relative overflow-hidden">
          <div>
            <div className="font-mono text-[10px] text-(--accent) uppercase tracking-widest mb-6">Conversation Fit</div>
            <h3 className="text-2xl font-syne font-black text-(--text) leading-none mb-6 tracking-tight">{CONFIG.name}</h3>
            <p className="text-sm text-(--text-muted) leading-relaxed max-w-md">
              Best reached for technical operations, systems integration, SaaS support engineering, and AI automation conversations where product, customer, and engineering context need to come
              together.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Technical Operations", "Systems Integration", "SaaS Support"].map((tagline) => (
                <span key={tagline} className="border border-(--accent)/30 text-(--accent) bg-(--accent)/5 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest">
                  {tagline}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-(--border) pt-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-(--border) bg-(--surface) flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-(--accent)" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-(--accent) uppercase tracking-widest mb-2">Work Authorization</div>
                <div className="text-sm font-bold text-(--text)">{CONFIG.workAuth}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-(--surface) p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-(--accent)"></div>
          <div className="grid grid-cols-1 gap-px bg-(--border) border border-(--border)">
            {CONFIG.contact.map((item, index) => {
              const Icon = getContactIcon(item.label);
              const content = (
                <div className="bg-(--surface) hover:bg-(--bg) p-6 md:p-8 transition-colors group flex items-center justify-between gap-6">
                  <div className="flex items-start gap-5 min-w-0">
                    <div className="w-11 h-11 border border-(--border) bg-(--bg) flex items-center justify-center shrink-0 group-hover:border-(--accent) transition-colors">
                      <Icon className="w-4 h-4 text-(--accent)" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] text-(--text-muted) uppercase tracking-[0.2em] mb-2">
                        {String(index + 1).padStart(2, "0")} / {item.label}
                      </div>
                      <div className="text-sm font-syne font-black leading-snug text-(--text) wrap-anywhere xl:text-base">{item.value}</div>
                    </div>
                  </div>
                  {item.href && <ExternalLink className="w-4 h-4 text-(--text-muted) group-hover:text-(--accent) transition-colors shrink-0" />}
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  download={item.label === "CV" ? "Shahriar_Haque_Abir_CV.pdf" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-8 font-mono text-[10px] text-(--text-muted) uppercase tracking-widest flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>Direct contact preferred</span>
            <span>Available for relevant technical, consulting, and support-focused conversations</span>
          </div>
        </section>
      </div>

      <GuidedNext currentView="contact" onNavigate={setView} />
    </motion.div>
  );
}
