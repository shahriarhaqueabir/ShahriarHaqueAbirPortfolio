export const CONFIG = {
  name: "Shahriar Haque Abir",
  nameHL: "Shahriar",
  taglines: ["Solution Consultant", "SaaS B2B", "Technical Support Engineer"],
  location: "Berlin, Germany",
  workAuth: "Niederlassungserlaubnis (Permanent Resident)",
  profile: `I enable B2B SaaS teams to ship and operate reliable systems. I bring both infrastructure awareness and application-level depth to complex technical environments. I function at the intersection of customers, code, and production, operating across the complete customer lifecycle from pre-sales validation to SLA-driven production support.`,
  profileImage: "/profile.jpg",
  contact: [
    { label: "Email", value: "shahriar_abby@hotmail.com", href: "mailto:shahriar_abby@hotmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shahriarhaqueabir", href: "https://www.linkedin.com/in/shahriarhaqueabir" },
    { label: "GitHub", value: "github.com/shahriarhaqueabir", href: "https://github.com/shahriarhaqueabir" },
    { label: "Location", value: "Berlin, Germany", href: null }
  ],
  experience: [
    {
      company: "tripunkt GmbH",
      role: "Software Solutions Consultant",
      period: "Nov 2020 – March 2026",
      points: [
        "Led a team of 5 as the primary technical contact for international B2B pre-sales, onboarding, and production support.",
        "Established international presence by onboarding over 7 international SMB clients within the first 2 years.",
        "Owned customer tickets with end-to-end resolution for complex configuration, database, and integration issues.",
        "Managed an average of 40 cases per week in live production environments, ensuring service continuity.",
        "Provided direct customer training and operational guidance via live sessions and technical documentation.",
        "Reduced average bug reports by 30% per release through structured manual QA and regression testing."
      ]
    },
    {
      company: "Technische Hochschule Mittelhessen",
      role: "Masters Thesis Work",
      period: "Oct 2019 – April 2020",
      points: [
        "Characterized solarization in glass optical fiber bundles due to high power UV light irradiation.",
        "Performed technical research on light and optical fiber technologies including splicing and gluing.",
        "Executed hardware design, development, and data analysis for optical systems.",
        "Managed project planning and technical reporting/presentation of research findings."
      ]
    },
    {
      company: "TransMIT GmbH",
      role: "QA/QC of Optical Fibers",
      period: "April 2017 – Nov 2017",
      points: [
        "Managed quality assurance and control for optical fiber cable assembly and polishing.",
        "Executed precision tubing and gluing of fiber cores, cladding, and connectors."
      ]
    },
    {
      company: "Larsen & Toubro",
      role: "Training Coordinator",
      period: "Aug 2015 – Sept 2016",
      points: [
        "Coordinated technical training programs for 60+ engineers across 6 distinct training groups.",
        "Managed curriculum development, scheduling, and training effectiveness tracking.",
        "Led employee onboarding processes and professional development initiatives."
      ]
    },
    {
      company: "Earth Telecommunication PVT. LTD.",
      role: "Network Engineer",
      period: "June 2014 – June 2015",
      points: [
        "Provided on-call technical support for 100+ corporate and residential clients.",
        "Installed and maintained LAN/WAN network infrastructure and connectivity solutions.",
        "Configured network equipment including switches, routers, and access points.",
        "Created technical documentation for network setups and operational procedures."
      ]
    }
  ],
  projects: [
    { 
      name: "Network Discovery & Topology Tool", 
      desc: "Python-based scanner to identify live hosts and map device relationships.",
      context: "Required a reliable method to map and document undocumented network environments to support infrastructure analysis.",
      implementation: "Developed a Python script using nmap integration to systematically scan designated IP ranges. Processed the results to generate JSON-based topology outputs and plotted relationships using NetworkX.",
      outcome: "Improved visibility into network structure, allowing for faster troubleshooting and architectural review.",
      stack: ["Python", "NetworkX", "JSON", "nmap"]
    },
    { 
      name: "AI Knowledge Assistant (RAG API)", 
      desc: "FastAPI-based RAG system using Qdrant and PostgreSQL for source-grounded answers.",
      context: "Needed to test and implement Retrieval-Augmented Generation (RAG) for querying internal documentation accurately.",
      implementation: "Built a FastAPI service connected to a Qdrant vector database and a PostgreSQL backend. Used Docker Compose to package the services into a reproducible deployment.",
      outcome: "Created a reliable, reproducible API capable of answering queries based strictly on uploaded sources, minimizing hallucination.",
      stack: ["FastAPI", "Qdrant", "PostgreSQL", "Docker"] 
    },
    { 
      name: "GTM Workflow Automation", 
      desc: "Automated lead enrichment and personalized outreach using n8n, Clay, and WeFlow.",
      context: "Manual prospecting, data enrichment, and lead routing processes were causing significant delays and operational overhead.",
      implementation: "Configured an n8n workflow to orchestrate data between Clay (for enrichment) and WeFlow. Built custom API integrations to ensure seamless data handoffs.",
      outcome: "Significantly reduced manual data entry and accelerated the prospecting cycle through automated, personalized outreach.",
      stack: ["n8n", "Clay", "WeFlow", "APIs"] 
    },
    { 
      name: "Operations Dashboard & Forecasting", 
      desc: "Dashboard to visualize KPIs, track trends, and provide operational overviews.",
      context: "Management required better visibility into ticket volumes, resolution times, and operational bottlenecks.",
      implementation: "Built a Python-based reporting script utilizing SQL for data extraction and Matplotlib for data visualization. Added forecasting views based on historical data.",
      outcome: "Provided clear operational visibility, improving capacity planning and team resource allocation.",
      stack: ["Python", "Matplotlib", "SQL"] 
    },
    { 
      name: "Self-Hosted AI & Automation Stack", 
      desc: "Modular Docker-based orchestration for local AI, RAG, and workflow automation.",
      context: "Need for a secure, private, and reproducible environment to run LLMs, vector databases, and automation tools locally.",
      implementation: "Engineered a complex multi-container stack using Docker Compose, integrating Open WebUI, Ollama, Qdrant, n8n, and SearXNG. Implemented security hardening with cap_drop and custom healthchecks.",
      outcome: "Deployed a production-ready local AI ecosystem with persistent memory, automated RAG pipelines, and private search capabilities.",
      stack: ["Docker Compose", "PostgreSQL", "Valkey", "Qdrant", "n8n"] 
    },
    { 
      name: "Nuka: The Design Laboratory", 
      desc: "An AI-powered, cinematic portfolio experience with local LLM integration.",
      context: "Traditional resume websites lack interactivity and fail to demonstrate technical depth in real-time.",
      implementation: "Built a multi-modal exploration engine using React 19 and Next.js. Integrated a local SmolLM2 model via Web Workers for private, on-device AI synthesis. Designed a custom 'Editorial Cream' design system with Framer Motion.",
      outcome: "A live demonstration of engineering and design, featuring real-time data visualization and an AI-driven command center.",
      stack: ["React 19", "Next.js", "Transformers.js", "Tailwind 4", "Framer Motion"] 
    }
  ],
  skills: [
    { group: "Core Competencies", items: ["Linux System Administration", "Cross-functional Team Leadership", "Cloud Administration", "B2B SaaS Operations", "Technical Support Engineering"] },
    { group: "Customer / Consulting", items: ["Technical Discovery", "Solution Consultation", "Customer Onboarding", "PoC Coordination", "SLA Management", "Requirement Engineering"] },
    { group: "Technical / Systems", items: ["API Integration", "Workflow Automation", "Network Operations", "Optical Fiber Tech", "Manual QA / Regression", "Incident Triage"] },
    { group: "Languages", items: ["English (Native/Bilingual)", "German (Professional Working)", "Bengali (Native)"] },
    { group: "Certifications", items: ["Networking Foundations", "Cisco Scaling Networks", "Linux System Engineer", "Goethe-Zertifikat B1"] }
  ],
  education: [
    { degree: "Master of Science - MSc, Information and Communication Engineering", school: "Technische Hochschule Mittelhessen, Germany", period: "2016 – 2020" },
    { degree: "Bachelor of Science - BSc, Electrical and Electronics Engineering", school: "North South University, Bangladesh", period: "2009 – 2014" }
  ]
};
