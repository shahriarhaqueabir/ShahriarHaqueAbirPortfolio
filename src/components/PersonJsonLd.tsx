import { CONFIG } from "@/lib/data";
import { githubUrl, linkedInUrl, siteUrl } from "@/lib/seo";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: CONFIG.name,
    description:
      "Berlin-based Technical Project and Implementation Specialist with 10+ years in enterprise SaaS delivery, technical operations, systems integration, and cybersecurity operations. Works across project delivery, incident management, implementation engineering, and security operations.",
    jobTitle: "Technical Project & Implementation Specialist | Solutions Engineer | Cybersecurity",
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
      "Technical Project Management",
      "Cybersecurity Operations",
      "Incident Response",
      "Security Operations",
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
      "CompTIA Security+",
      "ITIL 4",
    ],
    alumniOf: ["Technische Hochschule Mittelhessen", "North South University"],
    award: [
      "Goethe-Zertifikat B2",
      "CCNA: Connecting Networks (Cisco Networking Academy)",
      "CCNA: Scaling Networks (Cisco Networking Academy)",
      "CompTIA Security+",
      "ITIL® 4 Foundation",
      "Linux Foundation Certified System Administrator",
      "Linux System Engineer: Networking and SSH",
      "Networking Foundations: Networking Basics",
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
