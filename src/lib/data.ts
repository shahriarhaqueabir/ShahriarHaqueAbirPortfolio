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
    name: "Network Discovery & Topology Mapping Tool", 
    desc: "Python-based network discovery utility for identifying live hosts and visualizing device relationships.",
    
    context: "Infrastructure environments lacked centralized documentation, making troubleshooting and architecture analysis difficult.",

    implementation: "Developed a Python application integrating nmap for subnet scanning and host discovery. Processed scan outputs into structured JSON and used NetworkX to generate relationship and topology visualizations.",

    outcome: "Improved network visibility and reduced manual effort required for infrastructure documentation and troubleshooting.",

    stack: ["Python", "nmap", "NetworkX", "JSON"]
  },

  { 
    name: "AI Knowledge Assistant (RAG API)", 
    desc: "Retrieval-Augmented Generation API for source-grounded question answering using vector search.",

    context: "Needed an environment to evaluate RAG architectures for accurate querying of internal knowledge sources.",

    implementation: "Built a FastAPI backend integrated with Qdrant for vector retrieval and PostgreSQL for metadata storage. Containerized the application using Docker Compose for reproducible deployment and local development.",

    outcome: "Delivered a reproducible API capable of answering questions from indexed sources while reducing unsupported or hallucinated responses.",

    stack: ["FastAPI", "Qdrant", "PostgreSQL", "Docker Compose"]
  },

  { 
    name: "GTM Workflow Automation Platform", 
    desc: "Automated lead enrichment and workflow orchestration for outbound sales processes.",

    context: "Manual prospect research and lead routing created operational bottlenecks and delayed outreach workflows.",

    implementation: "Designed automation pipelines in n8n to orchestrate data movement between enrichment platforms and CRM workflows. Integrated APIs to automate lead enrichment, routing, and personalized actions.",

    outcome: "Reduced manual administrative effort and accelerated lead qualification and outreach processes.",

    stack: ["n8n", "Clay", "WeFlow", "REST APIs"]
  },

  { 
    name: "Operations Analytics & Forecasting Dashboard", 
    desc: "Operational reporting dashboard for KPI tracking and trend analysis.",

    context: "Teams required greater visibility into ticket trends, workload distribution, and operational performance metrics.",

    implementation: "Developed reporting workflows using SQL for data extraction and Python for transformation and visualization. Implemented historical trend analysis and forecasting views using Matplotlib.",

    outcome: "Improved operational reporting and supported resource planning through clearer visibility into performance trends.",

    stack: ["Python", "SQL", "Matplotlib"]
  },

  { 
    name: "Self-Hosted AI & Automation Platform", 
    desc: "Containerized local AI ecosystem for workflow automation, private search, and retrieval systems.",

    context: "Required a secure and reproducible environment for running local language models and automation services without relying on external platforms.",

    implementation: "Built a multi-service Docker Compose deployment integrating Ollama, Open WebUI, Qdrant, n8n, PostgreSQL, Valkey, and SearXNG. Added container health checks and service isolation for operational stability.",

    outcome: "Created a modular local AI environment supporting private inference, retrieval workflows, and automated pipelines.",

    stack: ["Docker Compose", "Ollama", "Qdrant", "PostgreSQL", "n8n", "SearXNG"]
  },

  { 
    name: "Hawkward Portfolio", 
    desc: "AI-enabled interactive portfolio experience demonstrating engineering projects through dynamic content generation.",

    context: "Traditional portfolio websites often fail to communicate technical depth or provide interactive demonstrations of capabilities.",

    implementation: "Built an interactive portfolio using React and Next.js with local AI inference through WebLLM, Llama 3.2 1B, and Web Workers. Designed a custom design system and implemented motion-based interactions using Framer Motion.",

    outcome: "Created a portfolio experience combining storytelling, technical demonstrations, and AI-assisted exploration.",

    stack: ["React", "Next.js", "WebLLM", "Llama 3.2 1B", "Tailwind CSS", "Framer Motion"]
  },

  {
    name: "B2B SaaS Onboarding & Support Operating Model",
    desc: "Customer-facing technical operating model for onboarding, configuration support, QA feedback, and production continuity.",

    context: "International SMB clients needed reliable onboarding, clear technical guidance, and fast resolution of configuration, database, and integration issues in live SaaS environments.",

    implementation: "Acted as the primary technical contact across pre-sales, onboarding, training, support, documentation, and SLA-driven issue resolution. Coordinated customer tickets end to end and fed recurring bug patterns into structured manual QA and regression testing.",

    outcome: "Onboarded 7+ international SMB clients in the first 2 years, managed roughly 40 live cases per week, and helped reduce average bug reports by 30% per release.",

    stack: ["B2B SaaS", "Customer Onboarding", "Production Support", "Manual QA", "Technical Documentation"]
  },

  {
    name: "Optical Fiber Solarization Research System",
    desc: "Research and measurement workflow for characterizing solarization in glass optical fiber bundles under high-power UV irradiation.",

    context: "Optical systems exposed to high-power UV light required technical characterization to understand material behavior, degradation patterns, and measurement reliability.",

    implementation: "Designed and executed thesis research across optical fiber handling, splicing, gluing, hardware setup, data collection, analysis, and technical presentation of findings.",

    outcome: "Delivered a complete research body covering experimental planning, optical system handling, data analysis, and technical reporting.",

    stack: ["Optical Fiber", "UV Testing", "Hardware Prototyping", "Data Analysis", "Technical Reporting"]
  },

  {
    name: "Optical Fiber QA/QC Assembly Workflow",
    desc: "Quality assurance and precision assembly workflow for optical fiber cable preparation and inspection.",

    context: "Fiber cable assemblies required repeatable QA/QC practices across polishing, tubing, gluing, connectors, and core/cladding handling.",

    implementation: "Managed quality assurance and control tasks for optical fiber cable assembly, including precision tubing, gluing, polishing, and connector preparation.",

    outcome: "Supported consistent optical fiber assembly quality through disciplined process execution and inspection.",

    stack: ["QA/QC", "Optical Fiber", "Cable Assembly", "Precision Gluing", "Process Control"]
  },

  {
    name: "Engineering Training Coordination Program",
    desc: "Technical training operations program for coordinating curriculum, scheduling, onboarding, and development tracking.",

    context: "Large engineering training groups needed structured onboarding, curriculum coordination, and clear tracking of training effectiveness.",

    implementation: "Coordinated technical training programs for 60+ engineers across 6 training groups, covering curriculum development, scheduling, onboarding processes, and effectiveness tracking.",

    outcome: "Improved training organization and supported professional development through repeatable coordination and reporting practices.",

    stack: ["Training Operations", "Curriculum Planning", "Engineer Onboarding", "Scheduling", "Reporting"]
  }
],
  skills: [
  {
    group: "Core Competencies",
    items: [
      "Linux Administration",
      "Cloud Infrastructure",
      "Technical Support Engineering",
      "B2B SaaS Operations",
      "Cross-functional Collaboration",
      "Process Optimization"
    ]
  },

  {
    group: "Solutions & Customer Engineering",
    items: [
      "Technical Discovery",
      "Solution Consulting",
      "Customer Onboarding",
      "Proof of Concept (PoC)",
      "Requirement Gathering",
      "Stakeholder Management",
      "SLA Management"
    ]
  },

  {
    group: "Systems & Automation",
    items: [
      "API Integration",
      "Workflow Automation",
      "Network Operations",
      "Incident Management",
      "Manual QA & Regression Testing",
      "Infrastructure Troubleshooting"
    ]
  },

  {
    group: "Tools & Technologies",
    items: [
      "Python",
      "PydanticAI",
      "LangGraph",
      "Docker",
      "PostgreSQL",
      "Qdrant",
      "Open WebUI",
      "Open Telemetry",
      "n8n",
      "FastAPI",
      "Git",
      "Linux"
    ]
  }
],
  languages: [
    "English (Native/Bilingual)",
    "German (Fluent)",
    "Bengali (Native)",
    "Hindi (Conversational)"
  ],
  certifications: [
    "Cisco Scaling Networks",
    "Networking Foundations",
    "Linux System Engineer",
    "Cyber Security Foundation",
    "Goethe-Zertifikat B1"
  ],
  education: [
    { degree: "Master of Science - MSc, Information and Communication Engineering", school: "Technische Hochschule Mittelhessen, Germany", period: "2016 – 2020" },
    { degree: "Bachelor of Science - BSc, Electrical and Electronics Engineering", school: "North South University, Bangladesh", period: "2009 – 2014" }
  ]
};
