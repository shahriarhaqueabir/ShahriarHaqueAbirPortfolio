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
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
      className="pt-10 pb-24 max-w-5xl"
    >
      <div className="font-mono text-[10px] text-(--accent) uppercase tracking-[0.2em] mb-4">- Contact</div>
      <h2 className="text-2xl md:text-4xl font-syne font-black mb-8 text-(--text) leading-[0.9] tracking-tight">
        Let&apos;s <span className="font-sans text-(--text-muted)">talk.</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-px bg-(--border) border border-(--border)">
        <section className="bg-(--surface) p-8 md:p-10 flex flex-col justify-between min-h-0 md:min-h-[360px] relative overflow-hidden">
          <div>
            <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-4">Conversation Fit</div>
            <h3 className="text-xl font-syne font-black text-(--text) leading-none mb-4 tracking-tight">{CONFIG.name}</h3>
            <p className="text-sm text-(--text-muted) leading-relaxed max-w-md">
              Best reached for technical operations, systems integration, SaaS support engineering, and AI automation conversations where product, customer, and engineering context need to come
              together.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {["Technical Operations", "Systems Integration", "SaaS Support"].map((tagline) => (
                <span key={tagline} className="border border-(--accent)/30 text-(--accent) bg-(--accent)/5 px-3 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                  {tagline}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-(--border) pt-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 border border-(--border) bg-(--surface) flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-(--accent)" />
              </div>
              <div>
                <div className="font-mono text-[9px] text-(--accent) uppercase tracking-widest mb-1">Work Authorization</div>
                <div className="text-xs font-bold text-(--text)">{CONFIG.workAuth}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-(--surface) p-5 md:p-6 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-(--accent)"></div>
          <div className="grid grid-cols-1 gap-px bg-(--border) border border-(--border)">
            {CONFIG.contact.map((item) => {
              const Icon = getContactIcon(item.label);
              const content = (
                <div className="bg-(--surface) hover:bg-(--bg) p-5 md:p-6 transition-colors group flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 border border-(--border) bg-(--surface) flex items-center justify-center shrink-0 group-hover:border-(--accent) transition-colors">
                      <Icon className="w-3.5 h-3.5 text-(--accent)" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] text-(--text-muted) uppercase tracking-[0.2em] mb-1">{item.label}</div>
                      <div className="text-xs font-syne font-black leading-snug text-(--text) wrap-anywhere xl:text-sm">{item.value}</div>
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
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-6 font-mono text-[9px] text-(--text-muted) uppercase tracking-widest flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span>Direct contact preferred</span>
            <span>Available for relevant technical, consulting, and support-focused conversations</span>
          </div>
        </section>
      </div>

      <GuidedNext currentView="contact" onNavigate={setView} />
    </motion.div>
  );
}
