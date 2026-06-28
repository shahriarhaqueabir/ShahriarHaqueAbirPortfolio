import { CONFIG } from "@/lib/data";
import { githubUrl, linkedInUrl, siteUrl } from "@/lib/seo";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: CONFIG.name,
    description: "Berlin-based Technical Operations and Solutions Engineer with 10+ years in enterprise SaaS, Tier-3 support, systems integration, and QA automation. Works across Implementation Engineering, Customer Success Engineering, Technical Account Management, Integration Consulting, and Technical Consulting roles.",
    jobTitle: "Technical Operations Engineer | Solutions Engineer | QA Automation Engineer",
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    email: "mailto:shahriarhaque90@gmail.com",
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
      "Solutions Engineering",
      "QA Automation",
      "Implementation Engineering",
      "Customer Success Engineering",
      "Technical Account Management",
      "Integration Consulting",
      "Technical Consulting",
      "Tier-3 Technical Support",
      "Support Engineering",
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
    alumniOf: ["Technische Hochschule Mittelhessen", "North South University"],
    award: ["Networking Foundations: Networking Basics", "CCNA: Scaling Networks (Cisco Networking Academy)", "Goethe-Zertifikat B1", "Linux System Engineer: Networking and SSH", "CCNA: Connecting Networks (Cisco Networking Academy)"],
    areaServed: ["APAC", "EMEA", "NAM"],
    nationality: "Bangladeshi",
    homeLocation: {
      "@type": "Place",
      name: CONFIG.location,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
