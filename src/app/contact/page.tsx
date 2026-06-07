import type { Metadata } from "next";
import PortfolioShell from "@/components/layout/PortfolioShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Shahriar Haque Abir for technical consulting, support operations, or AI automation inquiries.",
};

export default function ContactPage() {
  return <PortfolioShell initialView="contact" />;
}
