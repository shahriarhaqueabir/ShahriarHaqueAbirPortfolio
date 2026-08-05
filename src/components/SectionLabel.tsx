import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return <div className={`text-micro uppercase tracking-[0.2em] text-(--accent) ${className}`}>{children}</div>;
}
