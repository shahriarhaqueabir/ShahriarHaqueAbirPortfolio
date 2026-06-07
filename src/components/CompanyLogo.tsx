"use client";

import React from "react";

type CompanyLogoProps = {
  name: string;
  className?: string;
};

export default function CompanyLogo({ name, className = "w-10 h-10" }: CompanyLogoProps) {
  const getLogoContent = () => {
    const n = name.toLowerCase();
    if (n.includes("tripunkt")) return { text: "T", color: "#34D399", bg: "bg-emerald-500/10" };
    if (n.includes("larsen")) return { text: "L&T", color: "#F59E0B", bg: "bg-amber-500/10" };
    if (n.includes("earth telecommunication")) return { text: "ET", color: "#38BDF8", bg: "bg-sky-500/10" };
    if (n.includes("transmit")) return { text: "TX", color: "#A78BFA", bg: "bg-violet-500/10" };
    if (n.includes("mittelhessen")) return { text: "THM", color: "#F472B6", bg: "bg-pink-500/10" };
    return { text: name.charAt(0).toUpperCase(), color: "#94A3B8", bg: "bg-slate-500/10" };
  };

  const logo = getLogoContent();

  return (
    <div
      className={`${className} flex items-center justify-center border border-white/10 rounded-sm font-syne font-black text-xs ${logo.bg} transition-transform group-hover:scale-110`}
      style={{ color: logo.color, borderColor: `${logo.color}33` }}
    >
      {logo.text}
    </div>
  );
}
