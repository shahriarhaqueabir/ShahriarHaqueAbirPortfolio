export const CONFIG = {
  name: "Shahriar Haque Abir",
  nameHL: "Shahriar",
  tagline: "Technical Operations Engineer | Solutions Engineer | QA Automation Engineer",
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
    { label: "Complex Production Incidents Triaged Weekly", value: "40+" },
    { label: "Expertise across global enterprise deployments (DACH, NAM, APAC)", value: "3" },
  ],
  location: "Berlin, Germany",
  workAuth: "Niederlassungserlaubnis (Permanent resident)",
  profile: `Technical Operations and Solutions Engineer with 10+ years of experience spanning enterprise software, SaaS platforms, systems integration, and mission-critical production environments. Worked across adjacent roles including Implementation Engineer, Customer Success Engineer, Technical Account Manager, Integration Consultant, Technical Consultant, and Support Engineer — bridging product, customer, and engineering contexts daily. Expertise in Tier-3 troubleshooting, incident management, root cause analysis (RCA), API integrations, SQL analysis, and operational reliability.

Maintained SLA compliance across ~40 weekly Tier-3 incidents spanning NAM, APAC, and DACH enterprise deployments. Built a structured RCA framework that reduced MTTR by 30% and cut recurring defects — working directly with engineering, product, and infrastructure teams to trace root causes through API, database, and application layers.`,
  profileImage: "/profile.jpg",
  contact: [
    { label: "Email", value: "shahriarhaque90@gmail.com", href: "mailto:shahriarhaque90@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/shahriarhaqueabir", href: "https://www.linkedin.com/in/shahriarhaqueabir" },
    { label: "GitHub", value: "github.com/shahriarhaqueabir", href: "https://github.com/shahriarhaqueabir" },
    { label: "CV", value: "Download CV (PDF)", href: "/shahriar-haque-abir-cv.pdf" },
    { label: "Location", value: "Berlin, Germany", href: null },
  ],

  experience: [
    {
      company: "tripunkt GmbH",
      role: "QA and Release Validation",
      period: "2024 – 2026",
      points: [
        "Led a team of 4 through the complete pre-release manual QA lifecycle across 3 annual releases, managing a suite of ~100 test cases covering frontend behaviour, database schema integrity, REST API contracts, and third-party connector integrations within Docker testing environments.",
        "Owned defect management end-to-end in JIRA, writing structured reproduction steps, coordinating hotfix verification with engineering, and retesting until closure — reducing customer-reported post-release bugs by 30% within the first year.",
        "Executed API validation using Postman and database inspection using DBeaver; authored and maintained release notes, test documentation, and QA specifications in Confluence with full release sign-off accountability.",
      ],
    },
    {
      company: "tripunkt GmbH",
      role: "Software Solution Consultant",
      period: "2020 – 2024",
      points: [
        "Resolved approximately 40 Tier-3 incidents weekly across global enterprise customer support operations, troubleshooting API integrations, application services, and database layers in SaaS production environments spanning NAM, APAC, and DACH regions.",
        "Engineered GTM strategies and SDR workflows with a cross-functional team of 5 for the international market, leading the full international customer lifecycle from onboarding to expansion.",
        "Standardised global sales, support and troubleshooting frameworks and escalation procedures to support enterprise onboarding across NAM, APAC, and DACH regions.",
        "Designed and implemented technical onboarding frameworks and escalation procedures for enterprise customers across NAM, APAC, and DACH regions.",
        "Investigated complex production issues using SQL queries across PostgreSQL and MySQL databases, tracing data flow through integrated platform layers.",
        "Provided API integration support and schema validation for enterprise customer deployments, ensuring seamless data interchange between CRM/ERP systems and the tripunkt platform.",
        "Owned technical account management and product support for premier enterprise accounts across 3 regions, serving as the primary bridge between client engineering teams and internal product development.",
      ],
    },
    {
      company: "Technische Hochschule Mittelhessen",
      role: "MSc Thesis — Optical Fiber Engineering",
      period: "Oct 2019 – April 2020",
      points: [
        "Investigated the degradation behavior of glass optical fiber bundles exposed to high-intensity UV light, characterizing performance loss over time through structured hardware testing.",
        "Designed and assembled fiber optic hardware setups, including precision splicing, gluing, and alignment of optical components.",
        "Analyzed measurement data to identify degradation patterns and draw quantitative conclusions, documenting findings through formal technical reports and research presentations.",
      ],
    },
    {
      company: "Larsen and Toubro",
      role: "Technical Training Coordinator",
      period: "2015 – 2016",
      points: [
        "Led technical enablement, onboarding infrastructure design, curriculum engineering, and mentorship of over 60 incoming engineers across parallel engineering tracks per quarter.",
        "Served as the primary liaison between Indian, Bangladeshi and Japanese C-level stakeholders, aligning executive priorities to streamline training initiatives.",
      ],
    },
    {
      company: "Earth Telecommunication PVT. LTD.",
      role: "Network Operations Engineer",
      period: "2013 – 2015",
      points: [
        "Managed network architecture and incident resolution for over 500 SME and enterprise accounts, coordinating field services and installation scheduling while maintaining strict high-uptime and SLA compliance.",
        "Standardized structural troubleshooting frameworks across localized hardware, multi-layered routing protocols, and configuration layers, decreasing Mean Time to Resolution (MTTR).",
        "Developed a Python tool to scan live hosts and aggregate device relationship data, rendering the output as an interactive JS/HTML topology graph for real-time component isolation and data-path tracing.",
      ],
    },
  ],
  projects: [
    {
      name: "Network Discovery & Topology Mapping",
      desc: "Python-based tool for live host scanning and interactive relationship visualization. Built at Earth Telecommunication (2013–2015).",
      context:
        "Infrastructure environments at Earth Telecommunication lacked centralized documentation, complicating incident resolution and data-path tracing for over 500 SME and enterprise accounts. Network maps were scattered across spreadsheets and engineer memory, making every outage a fire drill. Standardized, automated topology discovery was the only viable path to reliable operations.",
      implementation:
        "Built a Python tool to scan live hosts using ICMP and SNMP sweeps, then aggregated device relationship data into structured JSON. The output rendered as an interactive JS/HTML topology graph enabling real-time component isolation and data-path tracing during incidents. Scanner aggressiveness was tuned per subnet to balance completeness against network load.",
      outcome:
        "Enabled real-time component isolation and data-path tracing during network incidents, significantly reducing Mean Time to Resolution (MTTR). Engineers could visually isolate faulty segments in seconds rather than tracing cables manually. The tool became the de facto reference for incident triage across the NOC team.",
      lessons:
        "Scanner aggressiveness required careful manual tuning — too aggressive caused false positives and network chatter, too conservative left gaps in partial topologies. Handling partially discovered topologies gracefully, with clear visual indicators for missing segments, proved essential for operator trust.",
      stack: ["Python", "JavaScript", "HTML", "Topology Mapping", "Network Operations"],
    },
    {
      name: "Interactive Database Visualizer",
      desc: "Local tool for visual mapping and tracing of complex database relationships.",
      context:
        "Understanding complex relational schemas in enterprise databases often requires a more intuitive approach than reading DDL files or static ERD diagrams. New integration engineers spent weeks mapping foreign-key chains across dozens of tables before they could contribute meaningful work. A visual, interactive representation of relationships could dramatically shorten that ramp-up time.",
      implementation:
        "Developed a tool that parses SQL DDL or connects to live database instances to extract keys, indexes, and relationships. These are mapped into an interactive node-graph UI built with ReactFlow and D3.js, allowing engineers to pan, zoom, and trace dependency chains. The parser handles PostgreSQL, MySQL, and SQLite dialects with a unified internal model.",
      outcome:
        "Provided a high-performance visual interface that lets engineers trace foreign key dependencies and explore table linkages in seconds, reducing onboarding time for new integration engineers from weeks to days. The tool is used daily by the integration team for schema discovery and impact analysis.",
      lessons:
        "Performance degrades significantly with schemas exceeding 200 tables — naive force-directed layouts became unusable without aggressive caching and viewport culling. A hybrid caching strategy (client-side LRU combined with Web Worker offload for layout computation) was critical for maintaining interactivity at scale.",
      stack: ["React", "ReactFlow", "D3.js", "SQLite", "SQL Parser"],
    },
    {
      name: "Customer Onboarding & Validation Portal",
      desc: "Interactive portal for client data mapping and schema validation.",
      context: "Field mapping was manual, error-prone, and took weeks of back-and-forth per client. A portal with guided validation and immediate feedback could eliminate that friction.",
      implementation:
        "Built a Next.js portal for JSON/CSV uploads with an interactive drag-and-drop field-mapping interface. The backend runs a sandboxed validation engine that checks transformations against schema constraints and returns detailed error reports. The portal supports multi-tenant configurations and versioned schema definitions.",
      outcome:
        "Streamlined the onboarding process for technical integrations by providing immediate feedback on data compatibility. What previously took a week of email exchanges was reduced to a single self-service session, cutting average onboarding time by over 60% and reducing data-related production incidents from misconfigured mappings.",
      lessons:
        "Field mapping edge cases — nullable vs. required mismatches, nested object flattening, and character encoding differences — surfaced only when real customer data hit the sandbox. Early validation gaps meant we missed subtle type coercion failures that produced silent data corruption in production, teaching us to test with production-like datasets from day one.",
      stack: ["Next.js", "TypeScript", "Python", "Node.js", "Schema Validation"],
    },
    {
      name: "Log Analysis & Automated Ticketing",
      desc: "Automated error detection and Jira ticket creation workflow.",
      context: "Critical error patterns were buried in thousands of log lines per minute. Subtle regressions went unnoticed for hours. An automated detection pipeline could bridge that gap.",
      implementation:
        "Developed a Python-based log parsing workflow that monitors error frequency against configurable thresholds using regex pattern matching. When a validated incident exceeds its threshold, the system automatically creates a Jira ticket with contextual stack traces and surrounding log context via the Jira REST API. The pipeline runs on a scheduled cron trigger and supports multi-service log sources.",
      outcome:
        "Reduced response times for recurring production errors from hours to minutes and improved incident tracking reliability with structured Jira artifacts. Alert fatigue was significantly reduced by tuning thresholds per error pattern rather than using one-size-fits-all rules. The system now handles over 200 log streams daily.",
      lessons:
        "Threshold tuning was the hardest part — set too low and alert fatigue spiked, set too high and genuine issues slipped through. A per-pattern adaptive threshold with exponential backoff and a deduplication window was essential to keep the signal-to-noise ratio manageable. We also learned that not all error spikes warrant a ticket; a grace period for transient failures prevented unnecessary noise.",
      stack: ["Python", "Regex", "Jira API", "Operational Support"],
    },
    {
      name: "CI-Friendly API Test Automation",
      desc: "Automated API validation workflow for CI/CD pipelines.",
      context:
        "Ensuring authentication, schema integrity, and edge cases are validated across every deployment cycle is critical for release reliability. A CI-integrated automated test suite was needed to catch regressions.",
      implementation:
        "Developed a testing workflow using Postman collections with pre-request scripts, executed via Newman CLI. The suite is integrated into GitHub Actions to run on every PR and deploy.",
      outcome:
        "Improved release reliability by catching integration regressions early. The suite reduced pre-release defect escapes by over 70% and gave the QA team confidence to approve deployments faster.",
      lessons: "Flaky tests eroded team trust. We learned to isolate test data per run, pin service versions, and implement a 'quarantine' mechanism that moved flaky tests out of the critical path.",
      stack: ["Postman", "Newman", "GitHub Actions", "CI/CD", "API Testing"],
    },
  ],
  skills: [
    {
      group: "Technical Operations",
      items: ["Tier-3 Support", "Incident Management", "Root Cause Analysis", "SLA Management"],
    },
    {
      group: "Systems Integration",
      items: ["REST APIs", "Software Deployment", "Schema Validation", "Docker Environments"],
    },
    {
      group: "Data & Troubleshooting",
      items: ["SQL (PostgreSQL, MySQL)", "Log Analysis", "API Tracing", "Performance Optimization"],
    },
    {
      group: "Solutions Engineering",
      items: ["Technical Discovery", "Solution Scoping", "Technical Consulting"],
    },
    {
      group: "Infrastructure & Security",
      items: ["Network Troubleshooting", "Cloud Services", "Linux Admin", "LAN/WAN"],
    },
    {
      group: "AI Automation",
      items: ["Agentic Workflows", "Local LLM Integration", "Prompt Engineering"],
    },
  ],
  languages: ["English (Native or Bilingual)", "Bangla (Native or Bilingual)", "German (Professional Working)", "Hindi (Limited Working)"],
  workingStyle:
    "I like being the person who can enter a messy technical situation, find the signal, explain the tradeoffs, and help the next step become clear — then build the automation that makes it not happen again.",
  philosophy: "make systems reliable, explainable, and usable.",
  principles: [
    "clarity over complexity",
    "systems should reduce cognitive load",
    "small improvements should compound reliability",
    "support signals should shape product design",
    "AI automation should preserve transparency",
  ],
  qualities: ["Calm Under Pressure", "Problem Solver", "Technical Translator", "Solution Driven"],
  certifications: [
    { name: "Networking Foundations: Networking Basics", href: "https://www.linkedin.com/learning/certificates/networking-foundations-networking-basics" },
    { name: "cisco scaling networks", href: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html" },
    { name: "Goethe-Zertifikat B1", href: "https://www.goethe.de/en/spr/kup/prf/prf/gb1.html" },
    { name: "Linux System Engineer: Networking and SSH", href: "https://www.linkedin.com/learning/certificates/linux-system-engineer-networking-ssh" },
    { name: "cisco interconnecting networks", href: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html" },
  ],
  education: [
    { degree: "Master of Science - MSc, Information and Communication Engineering", school: "Technische Hochschule Mittelhessen, Germany", period: "2016 – 2020" },
    { degree: "Bachelor of Science - BSc, Electrical and Electronics Engineering", school: "North South University, Bangladesh", period: "2009 – 2014" },
  ],
};
