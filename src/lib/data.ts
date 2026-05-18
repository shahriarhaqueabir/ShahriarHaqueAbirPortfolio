export const CONFIG = {
  name: "Shahriar Haque Abir",
  nameHL: "Shahriar",
  taglines: [
    "IT Networks Engineer",
    "Electrical & Electronics Engineer",
    "System Administrator",
    "Information & Communication Engineer",
    "APAC/EMEA/NAM Expertise",
    "AI Automation Engineer",
    "Technical Solution Consultant"
  ],
  location: "Berlin, Germany",
  workAuth: "Niederlassungserlaubnis (Permanent Resident)",
  profile: `I work as a lead technical solution consultant across B2B SaaS implementation, product sales, Tier-3 support, and AI automation. My foundation spans electrical and electronic engineering, information and communication engineering, optical fibers, IT networks, and software solution consultation. I help teams move from technical ambiguity to stable customer adoption through discovery, RFI/RFP support, PoCs, onboarding, production troubleshooting, release validation, and workflow engineering.`,
  profileImage: "/profile.jpg",
  contact: [
    { label: "Email", value: "shahriar_abby@hotmail.com", href: "mailto:shahriar_abby@hotmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shahriarhaqueabir", href: "https://www.linkedin.com/in/shahriarhaqueabir" },
    { label: "GitHub", value: "github.com/shahriarhaqueabir", href: "https://github.com/shahriarhaqueabir" },
    { label: "CV", value: "Download CV (PDF)", href: "/shahriar-haque-abir-cv.pdf" },
    { label: "Location", value: "Berlin, Germany", href: null }
  ],
  blog: [
    {
      title: "Building the bridge between product, customer, and engineering",
      date: "May 2026",
      category: "Working Notes",
      excerpt: "Notes on technical discovery, GTM context, support patterns, and the kind of operating model that helps technical products become adoptable.",
      body: "Technical products rarely fail because only one thing went wrong. The useful work is often in the middle: clarifying the customer problem, understanding the product constraint, noticing the sales friction, and turning repeated support patterns into decisions a team can act on."
    },
    {
      title: "Why support signals matter",
      date: "May 2026",
      category: "Customer Systems",
      excerpt: "A short reflection on why recurring tickets, onboarding friction, and release feedback should shape the product conversation.",
      body: "Support is not only a reactive function. When handled carefully, it becomes one of the clearest sources of product intelligence. Recurring questions, unclear handoffs, failed assumptions, and repeated configuration issues all point to places where the product or process can become easier to adopt."
    }
  ],
  experience: [
    {
      company: "tripunkt GmbH",
      role: "Software Solutions Consultant",
      period: "Nov 2020 – March 2026",
      points: [
        "Acted as the primary technical contact across discovery, RFI/RFP support, PoCs, onboarding, training, production support, product sales support, and post-release operations.",
        "Onboarded 10 international B2B clients, supporting stable adoption and service continuity across customer environments.",
        "Resolved around 40 production tickets per week across configuration, API, database, integration, and environment-level issues.",
        "Partnered with product and engineering teams to reproduce defects, validate fixes, and improve release readiness.",
        "Reduced recurring bug reports by 30% per release through structured regression testing, release validation, and root cause feedback loops.",
        "Led and coordinated work across a team of 5, translating customer needs into clear technical execution."
      ]
    },
    {
      company: "Technische Hochschule Mittelhessen",
      role: "Master's Thesis Research",
      period: "Oct 2019 – April 2020",
      points: [
        "Characterized solarization in glass optical fiber bundles under high-power UV irradiation.",
        "Performed technical research on light and optical fiber technologies including splicing and gluing.",
        "Executed hardware design, development, and data analysis for optical systems.",
        "Managed project planning and technical reporting/presentation of research findings."
      ]
    },
    {
      company: "TransMIT GmbH",
      role: "Optical Fiber Quality Control",
      period: "April 2017 – Nov 2017",
      points: [
        "Managed quality assurance and control for optical fiber cable assembly and polishing.",
        "Executed precision tubing and gluing of fiber cores, cladding, and connectors."
      ]
    },
    {
      company: "Larsen & Toubro",
      role: "Project Management & Technical Training Coordinator",
      period: "Aug 2015 – Sept 2016",
      points: [
        "Coordinated technical training and project delivery support for 60+ engineers across multiple training groups.",
        "Managed curriculum planning, scheduling, documentation, reporting, and training effectiveness tracking.",
        "Supported onboarding, stakeholder follow-up, and operational handoffs across technical teams.",
        "Built project management discipline around planning, coordination, execution visibility, and repeatable delivery."
      ]
    },
    {
      company: "Earth Telecommunication Pvt. Ltd.",
      role: "Network Operations Engineer",
      period: "2013 – 2015",
      points: [
        "Provided on-call technical support and network operations coverage for 500+ SME, corporate, and residential clients.",
        "Installed and maintained LAN/WAN network infrastructure and connectivity solutions.",
        "Configured network equipment including switches, routers, and access points.",
        "Created technical documentation for network setups and operational procedures."
      ]
    }
  ],
projects: [
  {
    name: "Pathfinder International SDR & GTM Operating Model",
    desc: "Led and pioneered the complete international SDR and GTM operating model for Pathfinder at tripunkt GmbH, building international sales presence where none existed before.",

    context: "Pathfinder had no established international market presence before this work began. The business needed a complete operating model for international SDR, GTM execution, product sales support, discovery, onboarding, and technical follow-through across APAC, EMEA, and North America.",

    implementation: "Led the operating model from prospecting and international SDR motion through technical discovery, RFI/RFP support, PoCs, product sales support, onboarding, training, SLA-driven Tier-3 support, documentation, and post-release validation. Connected customer signals back into product and engineering feedback loops.",

    outcome: "Pioneered Pathfinder's international sales operation, onboarded 10 international B2B clients, supported around 40 production tickets per week, and helped reduce recurring bug reports by 30% per release.",

    stack: ["Pathfinder", "International GTM", "SDR", "B2B SaaS", "Solution Consulting", "Product Sales", "RFI/RFP", "PoC", "Tier-3 Support", "Release Validation"]
  },

  {
    name: "L&T Technical Training & Project Coordination Program",
    desc: "Led project coordination and technical training operations for curriculum planning, scheduling, onboarding, documentation, and delivery tracking across 60+ engineers.",

    context: "Large engineering training groups needed structured onboarding, curriculum coordination, project visibility, and clear tracking of training effectiveness.",

    implementation: "Coordinated technical training programs for 60+ engineers across multiple groups, covering curriculum planning, scheduling, documentation, onboarding processes, delivery coordination, and reporting.",

    outcome: "Improved training organization and supported repeatable project delivery through clearer coordination, documentation, and stakeholder follow-up.",

    stack: ["Project Management", "Training Operations", "Curriculum Planning", "Engineer Onboarding", "Scheduling", "Reporting"]
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
    name: "AI Automation & Workflow Engineering Platform", 
    desc: "Practical AI automation environment for support workflows, retrieval systems, and agentic software development experiments.",

    context: "Repeated technical support and knowledge retrieval tasks created opportunities for AI-assisted workflows that could reduce manual effort and improve consistency.",

    implementation: "Combined local LLM tooling, RAG patterns, FastAPI, Qdrant, Docker Compose, and n8n to prototype workflows for retrieval, troubleshooting, and AI automation.",

    outcome: "Created a practical AI automation foundation for experimenting with support tooling, workflow engineering, and agentic full stack development.",

    stack: ["AI Automation", "RAG", "Local LLMs", "FastAPI", "Qdrant", "Docker Compose", "n8n"]
  },

  { 
    name: "GTM AI Workflow Platform", 
    desc: "AI workflow engineering for lead enrichment and outbound sales processes.",

    context: "Manual prospect research and lead routing created operational bottlenecks and delayed outreach workflows.",

    implementation: "Designed AI-assisted workflow pipelines in n8n to orchestrate data movement between enrichment platforms and CRM workflows. Integrated APIs to automate lead enrichment, routing, and personalized actions.",

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
    name: "Network Discovery & Topology Mapping Tool", 
    desc: "Python-based network discovery utility for identifying live hosts and visualizing device relationships.",
    
    context: "Infrastructure environments lacked centralized documentation, making troubleshooting and architecture analysis difficult.",

    implementation: "Developed a Python application integrating nmap for subnet scanning and host discovery. Processed scan outputs into structured JSON and used NetworkX to generate relationship and topology visualizations.",

    outcome: "Improved network visibility and reduced manual effort required for infrastructure documentation and troubleshooting.",

    stack: ["Python", "nmap", "NetworkX", "JSON"]
  },

  {
    name: "Optical Fiber Quality Control Assembly Workflow",
    desc: "Quality control and precision assembly workflow for optical fiber cable preparation and inspection.",

    context: "Fiber cable assemblies required repeatable quality control practices across polishing, tubing, gluing, connectors, and core/cladding handling.",

    implementation: "Managed quality control tasks for optical fiber cable assembly, including precision tubing, gluing, polishing, and connector preparation.",

    outcome: "Supported consistent optical fiber assembly quality through disciplined process execution and inspection.",

    stack: ["Quality Control", "Optical Fiber", "Cable Assembly", "Precision Gluing", "Process Control"]
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
    name: "Hawkward Portfolio", 
    desc: "AI-enabled interactive portfolio experience demonstrating engineering projects through dynamic content generation.",

    context: "Traditional portfolio websites often fail to communicate technical depth or provide interactive demonstrations of capabilities.",

    implementation: "Built an interactive portfolio using React and Next.js with local AI inference through WebLLM, Llama 3.2 1B, and Web Workers. Designed a custom design system and implemented motion-based interactions using Framer Motion.",

    outcome: "Created a portfolio experience combining storytelling, technical demonstrations, and AI-assisted exploration.",

    stack: ["React", "Next.js", "WebLLM", "Llama 3.2 1B", "Tailwind CSS", "Framer Motion"]
  }
],
  skills: [
  {
    group: "Engineering & Systems Foundation",
    items: [
      "Electrical & Electronic Engineering",
      "Information & Communication Engineering",
      "Optical Fibers",
      "IT Networks",
      "Linux",
      "LAN/WAN"
    ]
  },

  {
    group: "Project Delivery & L&T Coordination",
    items: [
      "Project Management",
      "Technical Training Coordination",
      "Curriculum Planning",
      "Scheduling",
      "Documentation",
      "Stakeholder Follow-up"
    ]
  },

  {
    group: "B2B SaaS Solution Consulting",
    items: [
      "Technical Discovery",
      "RFI/RFP Support",
      "Proof of Concept (PoC)",
      "B2B Product Sales",
      "Customer Onboarding",
      "SME/Enterprise Stakeholders"
    ]
  },

  {
    group: "Tier-3 Technical Support",
    items: [
      "SLA Management",
      "Incident Triage",
      "Root Cause Analysis",
      "API Troubleshooting",
      "Database Troubleshooting",
      "Release Validation"
    ]
  },

  {
    group: "AI Automation & Workflow Engineering",
    items: [
      "RAG",
      "Local LLMs",
      "FastAPI",
      "Qdrant",
      "Docker Compose",
      "n8n",
      "GTM Workflows",
      "SDR Systems",
      "Agentic Full Stack Development",
      "Cybersecurity"
    ]
  }
],
  languages: [
    "English (C2 / Professional Fluency)",
    "German (B2 / Professional Working Proficiency)",
    "Bengali (Native)",
    "Hindi (B2 / Conversational-Professional)"
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
