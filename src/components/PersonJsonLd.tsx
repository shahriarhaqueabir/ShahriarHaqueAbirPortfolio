import { CONFIG } from "@/lib/data";
import { githubUrl, linkedInUrl, siteUrl } from "@/lib/seo";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONFIG.name,
    jobTitle: "Technical Operations Engineer | Integration Engineer | Application Support Engineer",
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    email: "mailto:shahriar_abby@hotmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    sameAs: [linkedInUrl, githubUrl],
    knowsAbout: [
      "B2B SaaS",
      "AI Automation",
      "RAG",
      "IT Networks",
      "Technical Operations",
      "Tier-3 Technical Support",
      "Customer Onboarding",
      "API Integrations",
      "Incident Management",
      "Root Cause Analysis",
      "SLA Management",
      "SQL",
      "PostgreSQL",
      "Docker",
      "n8n",
    ],
    areaServed: ["APAC", "EMEA", "NAM"],
    nationality: "Bangladeshi",
    homeLocation: {
      "@type": "Place",
      name: CONFIG.location,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
