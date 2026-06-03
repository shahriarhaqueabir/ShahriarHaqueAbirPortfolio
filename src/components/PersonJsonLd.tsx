import { CONFIG } from "@/lib/data";
import { githubUrl, linkedInUrl, siteUrl } from "@/lib/seo";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONFIG.name,
    jobTitle: "Lead Technical Solution Consultant",
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
      "Technical Consulting",
      "Tier-3 Technical Support",
      "Product Sales Support",
      "Customer Onboarding",
      "Optical Fibers",
      "GTM Workflows",
      "SDR Systems",
      "FastAPI",
      "Qdrant",
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
