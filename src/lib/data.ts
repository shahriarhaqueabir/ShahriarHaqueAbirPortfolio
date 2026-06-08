export const CONFIG = {
  name: "Shahriar Haque Abir",
  nameHL: "Shahriar",
  tagline: "Technical Operations Engineer | Integration Engineer | Application Support Engineer",
  taglineContext: "Enterprise Software · SaaS Platforms · Tier-3 Troubleshooting · API Integrations",
  taglines: [
    "Tier-3 Troubleshooting & RCA",
    "Enterprise SaaS Operations",
    "API & Systems Integration",
    "Incident & SLA Management",
    "SQL & Log Stream Analysis",
    "Technical Solution Consulting",
    "QA & Release Validation",
  ],
  heroStats: [
    { label: "Years experience in enterprise software & mission-critical support", value: "10+" },
    { label: "Complex production incidents triaged weekly across integrated SaaS environments", value: "~40" },
    { label: "Regions supported across enterprise deployments", value: "3" },
  ],
  location: "Berlin, Germany",
  workAuth: "Niederlassungserlaubnis (Permanent resident)",
  profile: `Technical Operations Engineer with 10+ years of experience supporting enterprise software, SaaS platforms, systems integration, and mission-critical production environments. Expertise in Tier-3 troubleshooting, incident management, root cause analysis (RCA), API integrations, SQL analysis, and operational reliability.

Led complex deployments, integrations, and critical production environments across North America, APAC, and DACH regions. Recognized for resolving high-impact technical issues, improving platform performance, and driving operational excellence at scale.

Trusted to improve system stability, optimize operational processes, and deliver scalable technical solutions through close collaboration with engineering, product, and infrastructure teams.`,
  profileImage: "/profile.jpg",
  contact: [
    { label: "Email", value: "shahriar_abby@hotmail.com", href: "mailto:shahriar_abby@hotmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shahriarhaqueabir", href: "https://www.linkedin.com/in/shahriarhaqueabir" },
    { label: "GitHub", value: "github.com/shahriarhaqueabir", href: "https://github.com/shahriarhaqueabir" },
    { label: "CV", value: "Download CV (PDF)", href: "/shahriar-haque-abir-cv.pdf" },
    { label: "Location", value: "Berlin, Germany", href: null },
  ],

  experience: [
    {
      company: "tripunkt GmbH",
      role: "QA and Release Validation",
      period: "2024 – March 2026",
      points: [
        "Executed regression test cycles and validated software releases against database schemas and integration specifications within Docker container environments.",
        "Inspected API request/response payloads and audited log streams to identify pre-release defects, coordinating directly with engineering for hotfix verification.",
        "Managed structured defect triage workflows, tracking issues from identification through engineering resolution and regression revalidation.",
      ],
    },
    {
      company: "tripunkt GmbH",
      role: "Software Solution Consultant",
      period: "Nov 2020 – 2024",
      points: [
        "Conducted root cause analysis for ~40 Tier-3 production incidents weekly across global enterprise SaaS deployments, troubleshooting API integrations, application services, and database layers.",
        "Investigated complex production issues using SQL queries across PostgreSQL and MySQL databases, tracing data flow through integrated platform layers.",
        "Provided API integration support and schema validation for enterprise customer deployments, ensuring seamless data interchange between CRM/ERP systems and the tripunkt platform.",
        "Designed and implemented technical onboarding frameworks and escalation procedures for enterprise customers across NAM, APAC, and DACH regions.",
        "Owned technical account management and production support for premier enterprise accounts across 3 global regions, serving as the primary bridge between client engineering teams and internal product development.",
      ],
    },
    {
      company: "Technische Hochschule Mittelhessen",
      role: "Masters Thesis Work",
      period: "Oct 2019 – April 2020",
      points: [
        "Investigated the degradation behavior of glass optical fiber bundles exposed to high-intensity UV light, with a focus on characterizing performance loss over time.",
        "Designed and assembled fiber optic hardware setups, including precision splicing, gluing, and alignment of optical components.",
        "Conducted structured hardware testing and performance characterization under controlled conditions.",
        "Analyzed measurement data to identify degradation patterns and draw quantitative conclusions.",
        "Documented findings through formal technical reports and research presentations.",
      ],
    },
    {
      company: "TransMIT GmbH",
      role: "Quality Assurance Quality Control of Optical Fibers",
      period: "April 2017 – Nov 2017",
      points: [
        "Assembled fiber optic cables (FOCs) including core, cladding, and connector integration as part of a production/lab workflow.",
        "Performed tubing and adhesive gluing of optical components to specification.",
        "Polished fiber end-faces to optical-grade finish for signal integrity.",
      ],
    },
    {
      company: "Larsen & Toubro",
      role: "Training Coordinator",
      period: "Aug 2015 – Sept 2016",
      points: [
        "Led the technical onboarding and enablement program for incoming engineers across multiple parallel engineering tracks.",
        "Onboarded and mentored 60+ engineers per quarter across 6 concurrent training groups.",
        "Designed and owned the end-to-end onboarding infrastructure — from curriculum engineering to deployment documentation.",
        "Translated dense engineering specifications into structured, accessible learning paths aligned with project delivery objectives.",
        "Managed scheduling, training effectiveness tracking, and coordination across trainers and facilitators.",
      ],
    },
    {
      company: "Earth Telecommunication PVT. LTD.",
      role: "Network Engineer",
      period: "June 2014 – Sept 2015",
      points: [
        "Built a Python tool to scan live hosts and aggregate device relationship data, rendering the output as an interactive JS/HTML topology graph for real-time component isolation and data-path tracing.",
        "Installed, configured, and maintained LAN/WAN infrastructure including switches, routers, and access points.",
        "Conducted site surveys and led network deployments for new client installations.",
        "Created and maintained technical documentation for network configurations and operational procedures.",
      ],
    },
    {
      company: "Earth Telecommunication (Pvt.) Limited",
      role: "Network Operations Engineer",
      period: "2013 – July 2014",
      points: [
        "Managed network architecture and incident resolution for over 500 SME and enterprise accounts, maintaining strict high-uptime and SLA compliance.",
        "Standardized structural troubleshooting frameworks across localized hardware, multi-layered routing protocols, and configuration layers, decreasing Mean Time to Resolution (MTTR).",
      ],
    },
  ],
  projects: [
    {
      name: "Network Discovery & Topology Mapping",
      desc: "Python-based tool for live host scanning and interactive relationship visualization. Built at Earth Telecommunication (2013–2015).",
      context: "Infrastructure environments at Earth Telecommunication lacked centralized documentation, complicating incident resolution and data-path tracing for over 500 SME and enterprise accounts.",
      implementation: "Built a Python tool to scan live hosts and aggregate device relationship data, rendering the output as an interactive JS/HTML topology graph for real-time component isolation.",
      outcome: "Enabled real-time component isolation and data-path tracing during network incidents, significantly reducing Mean Time to Resolution (MTTR).",
      stack: ["Python", "JavaScript", "HTML", "Topology Mapping", "Network Operations"],
    },
    {
      name: "Interactive Database Visualizer",
      desc: "Local tool for visual mapping and tracing of complex database relationships.",
      context: "Understanding complex relational schemas often requires a more intuitive approach than reading DDL files or ERD diagrams.",
      implementation: "Developed a tool that parses SQL DDL or live connections to isolate keys and relationships, mapping them into an interactive node-graph UI using ReactFlow and D3.js.",
      outcome: "Provided a high-performance visual interface to trace foreign key dependencies and explore table linkages, reducing onboarding time for new integration engineers.",
      stack: ["React", "ReactFlow", "D3.js", "SQLite", "SQL Parser"],
    },
    {
      name: "Customer Onboarding & Validation Portal",
      desc: "Interactive portal for client data mapping and schema validation.",
      context: "Integration engineers often face friction when mapping client-proprietary data structures to internal API schemas.",
      implementation: "Built a portal for JSON/CSV uploads with an interactive field-mapping interface and a sandboxed validation runner to check transformations against schema constraints.",
      outcome: "Streamlined the onboarding process for technical integrations by providing immediate feedback on data compatibility.",
      stack: ["Next.js", "TypeScript", "Python", "Node.js", "Schema Validation"],
    },
    {
      name: "Log Analysis & Automated Ticketing",
      desc: "Automated error detection and Jira ticket creation workflow.",
      context: "Production support teams need to catch recurring errors early without manual log tailing or ticket spam.",
      implementation: "Developed a log parsing workflow that monitors error thresholds using regex and automatically triggers Jira REST API calls for validated incidents.",
      outcome: "Reduced response times for recurring production errors and improved incident tracking reliability.",
      stack: ["Python", "Regex", "Jira API", "Operational Support"],
    },
    {
      name: "CI-Friendly API Test Automation",
      desc: "Automated API validation workflow for CI/CD pipelines.",
      context: "Ensuring authentication, schema integrity, and edge cases are validated across every deployment cycle.",
      implementation: "Developed a workflow using Postman collections and Newman CLI, integrated into GitHub Actions for automated validation of production-ready APIs.",
      outcome: "Improved release reliability by catching integration regressions and schema mismatches early in the pipeline.",
      stack: ["Postman", "Newman", "GitHub Actions", "CI/CD", "API Testing"],
    },
    {
      name: "Internal AI Gateway Proxy",
      desc: "Security-focused AI proxy for PII redaction and corporate governance.",
      context: "Corporate environments need to leverage LLMs while ensuring strict security, privacy, and data governance.",
      implementation: "Built an async middleware proxy to intercept prompt requests, using regex and NER to redact sensitive data (PII, financial, secrets) before vendor transmission.",
      outcome: "Enabled secure internal LLM usage by providing a transparent governance layer that masks sensitive information.",
      stack: ["Python", "FastAPI", "Regex", "NER", "Security Proxy", "Async Middleware"],
    },
  ],
  skills: [
    {
      group: "Technical Operations",
      items: ["Tier-3 Support", "Incident Management", "Root Cause Analysis (RCA)", "Production Support", "SLA Management", "Troubleshooting Frameworks"],
    },
    {
      group: "Systems Integration",
      items: ["REST APIs", "Application Integration", "Software Deployment", "Configuration Management", "Schema Validation", "Docker Environments"],
    },
    {
      group: "Data & Troubleshooting",
      items: ["SQL (PostgreSQL, MySQL, SQL Server)", "Log Analysis (Grep/Awk)", "API Tracing (Postman/Swagger)", "Data Investigation", "Performance Optimization"],
    },
    {
      group: "Solutions Engineering",
      items: ["Technical Discovery", "Solution Scoping", "PoC Delivery", "RFI/RFP Responses", "Technical Consulting", "Integration Schematics"],
    },
    {
      group: "Infrastructure & Networking",
      items: ["LAN/WAN", "Routing & Switching", "Network Troubleshooting", "IT Security", "Cloud Services", "Linux Admin"],
    },
    {
      group: "AI Automation",
      items: ["Agentic Workflows", "RAG Systems", "Local LLM Integration", "Prompt Engineering", "AI Governance"],
    },
  ],
  languages: ["English (Native or Bilingual)", "Bangla (Native or Bilingual)", "German (Professional Working)", "Hindi (Limited Working)"],
  certifications: [
    "Networking Foundations: Networking Basics",
    "cisco scaling networks",
    "Goethe-Zertifikat B1",
    "Linux System Engineer: Networking and SSH",
    "cisco interconnecting networks",
  ],
  education: [
    { degree: "Master of Science - MSc, Information and Communication Engineering", school: "Technische Hochschule Mittelhessen, Germany", period: "2016 – 2020" },
    { degree: "Bachelor of Science - BSc, Electrical and Electronics Engineering", school: "North South University, Bangladesh", period: "2009 – 2014" },
  ],
};
