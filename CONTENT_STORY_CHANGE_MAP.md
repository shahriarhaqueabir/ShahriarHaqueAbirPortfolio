# Best New Site Story - Proposed Copy Change Map

This document began as a proposed copy change map based on the `CVdetails/` review. Most core recommendations have now been implemented in the app and this file is retained as the story rationale and audit trail.

## Implementation Status - May 2026

Implemented direction:

- Central identity now frames Shahriar Haque Abir as a lead technical solution consultant.
- Hero badges were changed from novelty labels to professional signals such as IT networks, electrical/electronics engineering, system administration, APAC/EMEA/NAM expertise, AI automation, and technical solution consulting.
- About, experience, projects, skills, stats, contact, sidebar, and blog copy were revised to reduce fake-system language and repeated claims.
- Lab page was removed.
- Blog page was added with owner-authored posts only.
- Public CV download was added as a PDF.
- Mobile behavior was tuned while preserving the desktop/browser experience.
- Page navigation now resets the main content scroll to the top.
- Case studies and experience copy use neutral professional past tense.
- Sidebar copy now uses portfolio-guide language instead of fake OS/command wording.

Current documentation to treat as canonical:

- `README.md` for project setup, checks, deployment, and current site shape.
- `DesignLanguage.md` for current visual/copy direction.
- `src/lib/data.ts` for most visitor-facing portfolio content.

Historical recommendations below may include old "Current" snippets that no longer match the codebase.

## Source Evidence Used

Primary sources reviewed:

- `CVdetails/CVs/SHAHRIAR HAQUE ABIR CV resume.pdf`
- `CVdetails/CVs/SHAHRIAR HAQUE ABIR CV resume.docx`
- `CVdetails/CVs/Master/Document Version_ Master CV - Long Form (Version A).docx`
- `CVdetails/CVs/CV BANK.pdf`
- Targeted CVs in `CVdetails/CVs/Targeted/`
- Cover letter templates and targeted cover letters in `CVdetails/Cover_Letters/`

Repeated evidence across the CV material and your latest clarification:

- B2B SaaS customer lifecycle ownership: discovery, RFI/RFP, PoC, onboarding, training, production support.
- Software Solutions Consultant at tripunkt GmbH from 2020 to March 2026.
- 15+ years of professional experience across networks, project coordination, SaaS solution consultation, support, and AI automation interests.
- 10 international clients onboarded.
- Around 40 production tickets/incidents per week.
- Team leadership or coordination across a team of 5.
- 30% recurring bug/defect reduction through regression testing, root cause analysis, and release validation.
- Earlier network operations foundation with 500+ clients.
- Project management and technical training coordination at Larsen & Toubro (L&T), including 60+ engineers.
- Modern AI automation layer: RAG, local LLMs, FastAPI, Qdrant, Docker, n8n, agentic workflows.
- Core foundations: Electrical and Electronic Engineering, Information and Communication Engineering, optical fibers, IT networks, software solution consultation, project management, B2B SME/enterprise product sales, and Tier-3 technical support.

## Approved Story Direction

Recommended core positioning:

> Lead Technical Solution Consultant for B2B SaaS implementation, Tier-3 support, product sales, project delivery, and AI automation.

Recommended narrative arc:

1. Built the technical foundation in Electrical and Electronic Engineering, Information and Communication Engineering, optical fibers, and IT networks.
2. Developed project management and training coordination experience at Larsen & Toubro.
3. Moved into B2B SME/enterprise product sales, software solution consultation, and Tier-3 technical support in Germany.
4. Took ownership across discovery, RFI/RFP, PoC, onboarding, support, release validation, and customer-facing technical delivery.
5. Now extends that experience into AI automation, workflow engineering, GTM systems, cybersecurity interests, SDR operations, and agentic full stack software development.

The AI automation work should be presented as the current expansion of a long technical-consulting foundation, not as a sudden pivot.

## Global Data Changes

### `src/lib/data.ts:4`

Current:

```ts
taglines: ["Solution Consultant", "SaaS B2B", "Technical Support Engineer"],
```

Recommended:

```ts
taglines: ["Lead Technical Solution Consultant", "B2B SaaS", "Tier-3 Support", "AI Automation"],
```

Reason:

The current order is slightly awkward, and "SaaS B2B" should be "B2B SaaS." The new tags create a clearer market position: lead technical solution consultant with B2B SaaS, Tier-3 support, and AI automation depth.

### `src/lib/data.ts:7`

Current:

```ts
profile: `I enable B2B SaaS teams to ship and operate reliable systems. I bring both infrastructure awareness and application-level depth to complex technical environments. I function at the intersection of customers, code, and production, operating across the complete customer lifecycle from pre-sales validation to SLA-driven production support.`,
```

Recommended:

```ts
profile: `I work as a lead technical solution consultant across B2B SaaS implementation, product sales, Tier-3 support, and AI automation. My foundation spans electrical and electronic engineering, information and communication engineering, optical fibers, IT networks, and software solution consultation. I help teams move from technical ambiguity to stable customer adoption through discovery, RFI/RFP support, PoCs, onboarding, production troubleshooting, release validation, and workflow engineering.`,
```

Reason:

This keeps the strong systems angle but names the actual CV-backed and user-confirmed scope: engineering foundation, networks, software solution consultation, product sales, Tier-3 support, and AI automation.

### `src/lib/data.ts:19`

Current:

```ts
period: "Nov 2020 - March 2026",
```

Recommended:

```ts
period: "Nov 2020 - Mar 2026",
```

Reason:

User confirmed March as the correct end date.

### `src/lib/data.ts:21-26`

Current:

```ts
"Led a team of 5 as the primary technical contact for international B2B pre-sales, onboarding, and production support.",
"Established international presence by onboarding over 7 international SMB clients within the first 2 years.",
"Owned customer tickets with end-to-end resolution for complex configuration, database, and integration issues.",
"Managed an average of 40 cases per week in live production environments, ensuring service continuity.",
"Provided direct customer training and operational guidance via live sessions and technical documentation.",
"Reduced average bug reports by 30% per release through structured manual QA and regression testing."
```

Recommended:

```ts
"Acted as the primary technical contact across discovery, RFI/RFP support, PoCs, onboarding, training, production support, product sales support, and post-release operations.",
"Onboarded 10 international B2B clients, supporting stable adoption and service continuity across customer environments.",
"Resolved around 40 production tickets per week across configuration, API, database, integration, and environment-level issues.",
"Partnered with product and engineering teams to reproduce defects, validate fixes, and improve release readiness.",
"Reduced recurring bug reports by 30% per release through structured regression testing, release validation, and root cause feedback loops.",
"Led and coordinated work across a team of 5, translating customer needs into clear technical execution."
```

Reason:

The current bullets are good but slightly generic. The recommended version better reflects the confirmed 10 international clients, full customer lifecycle, product-sales support, Tier-3 troubleshooting, and release validation depth.

### `src/lib/data.ts:31`

Current:

```ts
role: "Masters Thesis Work",
```

Recommended:

```ts
role: "Master's Thesis Research",
```

Reason:

Grammar and professionalism.

### `src/lib/data.ts:34`

Current:

```ts
"Characterized solarization in glass optical fiber bundles due to high power UV light irradiation.",
```

Recommended:

```ts
"Characterized solarization in glass optical fiber bundles under high-power UV irradiation.",
```

Reason:

Cleaner technical wording.

### `src/lib/data.ts:60-64`

Current:

```ts
company: "Earth Telecommunication PVT. LTD.",
role: "Network Engineer",
period: "June 2014 - June 2015",
...
"Provided on-call technical support for 100+ corporate and residential clients.",
```

Recommended:

```ts
company: "Earth Telecommunication Pvt. Ltd.",
role: "Network Operations Engineer",
period: "2013 - 2015",
...
"Provided on-call technical support and network operations coverage for 500+ SME, corporate, and residential clients.",
```

Reason:

The CV materials repeatedly use "Network Operations Engineer" and 500+ clients. User confirmed 2013-2015 as the correct network operations date range.

### `src/lib/data.ts:50-56`

Current:

```ts
company: "Larsen & Toubro",
role: "Training Coordinator",
period: "Aug 2015 - Sept 2016",
points: [
  "Coordinated technical training programs for 60+ engineers across 6 distinct training groups.",
  "Managed curriculum development, scheduling, and training effectiveness tracking.",
  "Led employee onboarding processes and professional development initiatives."
]
```

Recommended:

```ts
company: "Larsen & Toubro",
role: "Project Management & Technical Training Coordinator",
period: "Aug 2015 - Sept 2016",
points: [
  "Coordinated technical training and project delivery support for 60+ engineers across multiple training groups.",
  "Managed curriculum planning, scheduling, documentation, reporting, and training effectiveness tracking.",
  "Supported onboarding, stakeholder follow-up, and operational handoffs across technical teams.",
  "Built project management discipline around planning, coordination, execution visibility, and repeatable delivery."
]
```

Reason:

This restores the L&T chapter as a real shaping influence, not a side note. It connects project management, coordination, documentation, and technical training to the later consulting story.

### `src/lib/data.ts:258-263`

Current:

```ts
languages: [
  "English (Native/Bilingual)",
  "German (Fluent)",
  "Bengali (Native)",
  "Hindi (Conversational)"
],
```

Recommended:

```ts
languages: [
  "English (C2 / Professional Fluency)",
  "German (B2 / Professional Working Proficiency)",
  "Bengali (Native)",
  "Hindi (B2 / Conversational-Professional)"
],
```

Reason:

The CVs consistently say English C2 and German B2. "German (Fluent)" may overclaim. "English (Native/Bilingual)" should only remain if native/bilingual is the intended official claim.

### `src/lib/data.ts:250`

Current:

```ts
"Open Telemetry",
```

Recommended:

```ts
"OpenTelemetry",
```

Reason:

Correct product/project spelling.

## Hero Changes

### `src/components/views/HeroView.tsx:12-24`

Current:

```ts
const phrases = [
  { text: "LEVEL 9 WIZARD", highlight: "WIZARD", color: "#5EEAD4" },
  { text: "S+ Tier Ninja", highlight: "", color: "#1F2937", solidColor: true },
  { text: "Found the bug in the matrix", highlight: "matrix", color: "#10B981" },
  { text: "Final Boss Energy", highlight: "Boss", color: "#B8860B" },
  { text: "Power Level over 9000", highlight: "9000", color: "#EF4444" },
  { text: "Runs sudo rm -rf /", highlight: "sudo", color: "#F472B6" },
  { text: "10x Consultant", highlight: "10x", color: "#F97316" },
  { text: "Broke the Simulation", highlight: "Broke", color: "#6366F1" },
  { text: "5D Chess Master", highlight: "Chess", color: "#3B82F6" },
  { text: "10+ Years of innovation", highlight: "innovation", color: "#8B5CF6" },
  { text: "A wonderful Person", highlight: "Person", isRainbow: true }
];
```

Recommended:

```ts
const phrases = [
  { text: "Lead Technical Solution Consultant", highlight: "Lead", color: "#5EEAD4" },
  { text: "The bridge between client and engineering", highlight: "bridge", color: "#38BDF8" },
  { text: "Tier-3 problem solver", highlight: "Tier-3", color: "#10B981" },
  { text: "Turns ambiguity into action", highlight: "action", color: "#F59E0B" },
  { text: "AI automation builder", highlight: "AI", color: "#F472B6" },
  { text: "Calm under production pressure", highlight: "Calm", color: "#A78BFA" },
  { text: "Customer lifecycle owner", highlight: "owner", color: "#6366F1" },
  { text: "Systems thinker with commercial sense", highlight: "commercial", color: "#EF4444" }
];
```

Reason:

The current hero badge copy is playful but weakens credibility. The new badge copy reads like reputation signals, titles, or review-style phrases: what people would recognize Shahriar for after working with him.

### `src/components/views/HeroView.tsx:64`

Current:

```tsx
<div className="mt-4 text-(--accent) font-bold font-playfair italic text-2xl lg:text-4xl tracking-normal">-Technical Lead</div>
```

Recommended:

```tsx
<div className="mt-4 text-(--accent) font-bold font-playfair italic text-2xl lg:text-4xl tracking-normal">Lead Technical Solution Consultant</div>
```

Alternative:

```tsx
<div className="mt-4 text-(--accent) font-bold font-playfair italic text-2xl lg:text-4xl tracking-normal">B2B SaaS, Tier-3 Support & AI Automation</div>
```

Reason:

"Technical Lead" is not an official title. "Lead Technical Solution Consultant" is the desired frame and better reflects the combined consulting, product sales, support, project delivery, and AI automation story.

### `src/components/views/HeroView.tsx:68-74`

Current:

```tsx
View Projects
...
Connect
```

Recommended:

```tsx
View Case Studies
...
Discuss Fit
```

Reason:

"Projects" underplays the professional operating models and customer-facing systems work. "Discuss Fit" fits the hiring/recruiting context better than "Connect."

## About Changes

### `src/components/views/AboutView.tsx:10-29`

Current story beats:

```ts
const storyBeats = [
  {
    label: "Then",
    title: "Started at the infrastructure layer.",
    text: "Worked close to physical and operational systems: network infrastructure, optical fiber environments, QA systems, and on-call technical support. The environments were tangible. Systems either held together or failed, and failure was visible.",
    context: "Infrastructure grounding: physical constraints, deterministic environments, operational discipline, and root-cause thinking.",
  },
  {
    label: "Transition",
    title: "Moved into systems-facing consulting.",
    text: "Relocating to Germany shifted the work toward people as much as technology. The role expanded into onboarding, integrations, troubleshooting, and translating complex systems into workflows teams could actually use.",
    context: "Systems consulting: converting technical complexity into usable workflows, support clarity, and repeatable processes.",
  },
  {
    label: "Now",
    title: "Designing systems that reduce friction.",
    text: "Current work focuses on automation, AI-enabled workflows, and developer tooling. The objective remains consistent: make systems easier to understand, easier to operate, and easier to trust over time.",
    context: "AI and workflow systems: retrieval, orchestration, local models, and systems designed around reliability.",
  },
];
```

Recommended:

```ts
const storyBeats = [
  {
    label: "Foundation",
    title: "Built from engineering fundamentals.",
    text: "The foundation starts with Electrical and Electronic Engineering, Information and Communication Engineering, optical fibers, and IT networks. That mix shaped how I think about systems: signals, constraints, infrastructure, reliability, and the practical details that decide whether something works.",
    context: "Engineering grounding: electrical/electronic systems, information and communication engineering, optical fibers, LAN/WAN operations, documentation, and root-cause thinking.",
  },
  {
    label: "Delivery",
    title: "Added project management and technical coordination.",
    text: "At Larsen & Toubro, the work added project management, training coordination, documentation, scheduling, and stakeholder follow-through. It made the technical foundation operational: not just understanding systems, but coordinating people and delivery around them.",
    context: "L&T influence: project management, technical training coordination, curriculum planning, handoffs, reporting, and operational discipline.",
  },
  {
    label: "Consulting",
    title: "Moved into B2B SaaS solution consultation.",
    text: "In Germany, the work expanded into B2B SME and enterprise product sales, software solution consultation, Tier-3 technical support, discovery, RFI/RFP support, PoCs, onboarding, production troubleshooting, and release validation.",
    context: "SaaS consulting: product sales support, technical discovery, customer onboarding, API/database troubleshooting, SLA-driven Tier-3 support, release validation, and engineering coordination.",
  },
  {
    label: "Now",
    title: "Engineering AI automation and workflows.",
    text: "Current interests extend that operating experience into AI automation, workflow engineering, cybersecurity, GTM, SDR systems, and agentic full stack software development. The goal is practical: turn repeated technical work into systems that scale.",
    context: "AI automation layer: RAG, local LLMs, FastAPI, Qdrant, Docker, n8n, GTM workflows, agentic software development, and cybersecurity-aware systems thinking.",
  },
];
```

Reason:

This directly implements the updated story arc: engineering foundation, L&T project management, B2B SaaS consultation/Tier-3 support, then AI automation and workflow engineering.

### `src/components/views/AboutView.tsx:72-73`

Current:

```tsx
Hi. I&apos;m Shahriar. Born and raised in Bangladesh. I moved half way across the world to Germany and have been living in Berlin for the last 10 years. I like solving problems, and experimenting with different tech stacks. Let&apos;s catch up and chat about systems, AI, or whatever&apos;s on your mind.
```

Recommended:

```tsx
Hi. I&apos;m Shahriar. I was born and raised in Bangladesh, moved halfway across the world to Germany, and built my career across engineering fundamentals, IT networks, project delivery, B2B SaaS solution consultation, product sales, and Tier-3 technical support. I like the messy middle where customers, systems, commercial needs, and engineering decisions meet.
```

Reason:

Fixes grammar and makes the personal introduction support the full professional story.

### `src/components/views/AboutView.tsx:88`

Current:

```tsx
build systems people trust
```

Recommended:

```tsx
make systems reliable, explainable, and usable
```

Reason:

More specific and aligned with implementation/support work.

### `src/components/views/AboutView.tsx:154-155`

Current:

```tsx
What I care about now
Useful reliability, with a human voice.
```

Recommended:

```tsx
What I care about in the work
Reliable systems, clear handoffs, and fewer repeated failures.
```

Reason:

Grounds the philosophy in operational outcomes.

### `src/components/views/AboutView.tsx:178-180`

Current:

```tsx
Underneath the systems language
The short version? I like being the person who can sit with the messy thing, ask the useful question, and help everyone breathe again.
```

Recommended:

```tsx
The working style
I like being the person who can enter a messy technical situation, find the signal, explain the tradeoffs, and help the next step become clear.
```

Reason:

Keeps the human tone but makes it more professional and less vague.

## Experience Changes

### `src/components/views/ExperienceView.tsx:8-17`

Current:

```ts
const lifeMilestones = [
  { label: "1991", detail: "Origin point", marker: "BIRTH" },
  { label: "2009", detail: "Electrical & Electronics Engineering begins", marker: "BSc" },
  { label: "2014", detail: "First network engineering role", marker: "NETWORK" },
  { label: "2015", detail: "Training coordination for engineering cohorts", marker: "L&T" },
  { label: "2016", detail: "MSc path in Germany", marker: "GERMANY" },
  { label: "2017", detail: "Optical fiber QA and research work", marker: "RESEARCH" },
  { label: "2020", detail: "Solutions consulting and B2B SaaS support", marker: "CONSULTING" },
  { label: "Now", detail: "Technical lead profile and AI-enabled portfolio", marker: "PRESENT" },
];
```

Recommended:

```ts
const lifeMilestones = [
  { label: "2009", detail: "Electrical & Electronics Engineering foundation", marker: "BSc" },
  { label: "2013", detail: "Network operations and infrastructure support", marker: "NETWORK" },
  { label: "2015", detail: "Project management and training coordination at L&T", marker: "L&T" },
  { label: "2016", detail: "MSc path in Germany", marker: "GERMANY" },
  { label: "2017", detail: "Optical fiber research and quality control work", marker: "FIBER" },
  { label: "2020", detail: "B2B SaaS product sales, solution consulting, and Tier-3 support", marker: "SAAS" },
  { label: "2024+", detail: "AI automation, RAG, GTM, SDR workflows, and agentic full stack builds", marker: "AI OPS" },
  { label: "Now", detail: "Lead technical solution consultant profile", marker: "PRESENT" },
];
```

Reason:

Removes "birth" from a professional proof timeline and restores L&T/project management, optical fiber, product sales, Tier-3 support, and AI automation as visible shaping nodes.

### `src/components/views/ExperienceView.tsx:33`

Current:

```tsx
Life Milestone Line
```

Recommended:

```tsx
Professional Timeline
```

Reason:

Cleaner and more recruiter-friendly.

### `src/components/views/ExperienceView.tsx:118-119`

Current:

```tsx
A straight chronological map gives the professional record a human frame: early formation, engineering education, first infrastructure work, training coordination, relocation into Germany&apos;s technical ecosystem, research depth, consulting ownership, and the current AI-enabled portfolio phase.
```

Recommended:

```tsx
The timeline shows the influences that shaped the profile: engineering fundamentals, optical fibers, IT networks, L&T project management, B2B SaaS product sales, Tier-3 support, and the current move into AI automation and workflow engineering.
```

Reason:

This is the shortest expression of the updated site story.

## Projects Changes

### `src/components/views/ProjectsView.tsx:118-122`

Current:

```tsx
<div>— Technical Inventory</div>
<h2>Selected Project Works</h2>
<div>Case files, implementation traces, and impact signals.</div>
```

Recommended:

```tsx
<div>— Case Studies</div>
<h2>Selected Work</h2>
<div>Solution consulting, Tier-3 support, project delivery, AI automation, and technical systems work.</div>
```

Reason:

"Selected Project Works" is unnatural. "Selected Work" makes room for both personal projects and professional operating models.

### `src/lib/data.ts:71-200`

Current project order:

1. Network Discovery & Topology Mapping Tool
2. AI Knowledge Assistant (RAG API)
3. GTM Workflow Automation Platform
4. Operations Analytics & Forecasting Dashboard
5. Self-Hosted AI & Automation Platform
6. Hawkward Portfolio
7. B2B SaaS Onboarding & Support Operating Model
8. Optical Fiber Solarization Research System
9. Optical Fiber QA/QC Assembly Workflow
10. Engineering Training Coordination Program

Recommended project order:

1. B2B SaaS Solution Consulting & Tier-3 Support Operating Model
2. AI Knowledge Assistant (RAG API)
3. AI Automation & Workflow Engineering Platform
4. GTM Workflow Automation Platform
5. Operations Analytics & Forecasting Dashboard
6. Network Discovery & Topology Mapping Tool
7. Optical Fiber Quality Control Assembly Workflow
8. Optical Fiber Solarization Research System
9. L&T Technical Training & Project Coordination Program
10. Hawkward Portfolio

Reason:

Lead with the CV-backed professional story, then show AI automation as the current evolution. The portfolio project should not outrank the career evidence.

### `src/lib/data.ts:150-160`

Current:

```ts
name: "B2B SaaS Onboarding & Support Operating Model",
desc: "Customer-facing technical operating model for onboarding, configuration support, QA feedback, and production continuity.",
context: "International SMB clients needed reliable onboarding, clear technical guidance, and fast resolution of configuration, database, and integration issues in live SaaS environments.",
implementation: "Acted as the primary technical contact across pre-sales, onboarding, training, support, documentation, and SLA-driven issue resolution. Coordinated customer tickets end to end and fed recurring bug patterns into structured manual QA and regression testing.",
outcome: "Onboarded 7+ international SMB clients in the first 2 years, managed roughly 40 live cases per week, and helped reduce average bug reports by 30% per release.",
stack: ["B2B SaaS", "Customer Onboarding", "Production Support", "Manual QA", "Technical Documentation"]
```

Recommended:

```ts
name: "B2B SaaS Solution Consulting & Tier-3 Support Operating Model",
desc: "Customer-facing technical operating model spanning discovery, PoCs, onboarding, product sales support, Tier-3 production support, release validation, and AI automation opportunities.",
context: "International B2B customers needed clear technical discovery, stable onboarding, and fast resolution of configuration, API, database, and integration issues in live SaaS environments.",
implementation: "Owned the technical customer lifecycle across RFI/RFP support, proof-of-concept work, onboarding, training, SLA-driven Tier-3 support, documentation, and post-release validation. Converted recurring customer issues into engineering feedback and AI automation candidates.",
outcome: "Onboarded 10 international clients, handled around 40 production tickets per week, and helped reduce recurring bug reports by 30% per release.",
stack: ["B2B SaaS", "Solution Consulting", "Product Sales", "RFI/RFP", "PoC", "Tier-3 Support", "Release Validation", "AI Automation"]
```

Reason:

This should become the lead case study because it is the strongest proof of the new positioning: lead technical solution consultation, B2B product sales support, Tier-3 support, release validation, and AI automation.

### `src/components/views/ProjectsView.tsx:251`

Current:

```tsx
Quantitative Impact
```

Recommended:

```tsx
Outcome
```

Reason:

Not every project has a strictly quantitative impact. "Outcome" is accurate and avoids overclaiming.

### `src/components/views/ProjectsView.tsx:258-259`

Current:

```tsx
Verification Status: PASS
Architect: Shahriar Haque Abir
```

Recommended:

```tsx
Evidence Type: Portfolio Case Study
Owner: Shahriar Haque Abir
```

Reason:

"Verification Status: PASS" sounds artificial. The new wording supports credibility.

## Stats Changes

### `src/components/views/StatsView.tsx:12-19`

Current:

```ts
const rawOrbitNodes = [
  { id: "experience", label: "Experience", value: "10+ years", angle: -90, color: "#EF4444" },
  { id: "projects", label: "Projects", value: "28+ builds", angle: -30, color: "#38BDF8" },
  { id: "impact", label: "Impact", value: "Global", angle: 30, color: "#F59E0B" },
  { id: "learning", label: "Learning", value: "Everyday", angle: 90, color: "#34D399" },
  { id: "growth", label: "Growth", value: "Continuous", angle: 150, color: "#F472B6" },
  { id: "skills", label: "Skills", value: "42+ signals", angle: 210, color: "#92400E" },
];
```

Recommended:

```ts
const rawOrbitNodes = [
  { id: "engineering", label: "Engineering Core", value: "EEE + ICE", angle: -90, color: "#EF4444" },
  { id: "fiber", label: "Optical Systems", value: "fiber research", angle: -30, color: "#38BDF8" },
  { id: "networks", label: "IT Networks", value: "500+ clients", angle: 30, color: "#F59E0B" },
  { id: "lnt", label: "Project Delivery", value: "L&T", angle: 90, color: "#34D399" },
  { id: "saas", label: "B2B SaaS", value: "10 clients", angle: 150, color: "#F472B6" },
  { id: "ai", label: "AI Automation", value: "workflows", angle: 210, color: "#92400E" },
];
```

Reason:

The orbit is not just a metric chart. It should represent the influences and experiences that make up the larger life/professional sky: engineering foundations, optical fibers, IT networks, L&T project delivery, B2B SaaS, and AI automation. Keep the poetic premise, but make each node specific.

### `src/components/views/StatsView.tsx:21-27`

Current:

```ts
const metrics = [
  { value: "28+", label: "Projects Completed", glyph: "box", spark: "..." },
  { value: "12K+", label: "Hours Building", glyph: "code", spark: "..." },
  { value: "15+", label: "Contexts Impacted", glyph: "globe", spark: "..." },
  { value: "42+", label: "Skills Acquired", glyph: "book", spark: "..." },
  { value: "128+", label: "Experiments Run", glyph: "lab", spark: "..." },
];
```

Recommended:

```ts
const metrics = [
  { value: "40/wk", label: "Production Tickets", glyph: "box", spark: "..." },
  { value: "10", label: "International Clients Onboarded", glyph: "globe", spark: "..." },
  { value: "30%", label: "Recurring Bug Reduction", glyph: "code", spark: "..." },
  { value: "60+", label: "Engineers Coordinated at L&T", glyph: "book", spark: "..." },
  { value: "500+", label: "Network Clients Supported", glyph: "lab", spark: "..." },
  { value: "15+", label: "Years Professional Experience", glyph: "code", spark: "..." },
];
```

Reason:

The current metrics sound invented. The recommended metrics are traceable to the CV material.

### `src/components/views/StatsView.tsx:135-145`

Current:

```tsx
Career Observatory
Living metrics.
Real impact.
An interactive view of my journey through data, projects, skills and growth over time.
Move around. Explore. Discover.
```

Recommended:

```tsx
Proof Points
Influence map.
Life&apos;s sky.
Each node is a signal from the work that shaped me: engineering, optical fibers, IT networks, L&T project delivery, B2B SaaS, Tier-3 support, and AI automation.
Follow the constellation across experience, work, and contact paths.
```

Reason:

Keeps the orbit metaphor but anchors it in the real influences and experiences that shaped the profile.

### `src/components/views/StatsView.tsx:283`

Current:

```tsx
May 15, 2026&nbsp;&nbsp;20:45 PM
```

Recommended:

```tsx
May 15, 2026&nbsp;&nbsp;20:45
```

Reason:

Fix invalid time format.

### `src/components/views/StatsView.tsx:313-320`

Current:

```tsx
Potential Index
9.4 /10
High potential trajectory based on growth patterns, experiments, and impact.
```

Recommended:

```tsx
Operating Profile
Lead Technical Solution Consultant
Customer-facing technical operator with engineering foundations, project management range, B2B product sales experience, Tier-3 support depth, and AI automation ambition.
```

Reason:

"Potential Index 9.4/10" is arbitrary. The replacement explains the actual profile.

### `src/components/views/StatsView.tsx:29-33`

Current:

```ts
const futurePaths = [
  "local AI portfolio intelligence",
  "support operations tooling",
  "privacy-first knowledge systems",
];
```

Recommended:

```ts
const futurePaths = [
  "AI automation and workflow engineering",
  "cybersecurity-aware systems thinking",
  "GTM, SDR, and agentic full stack development",
];
```

Reason:

This reflects the stated current interests: AI automation and workflow engineering, cybersecurity, GTM, SDR, and agentic full stack software development.

## Contact Changes

### `src/components/views/ContactView.tsx:24-27`

Current:

```tsx
— Transmission Channel
Establish Link.
```

Recommended:

```tsx
— Contact
Let&apos;s talk.
```

Alternative:

```tsx
— Contact
Discuss a role or collaboration.
```

Reason:

The sci-fi language is fun but less aligned with professional hiring conversion.

### `src/components/views/ContactView.tsx:43`

Current:

```tsx
Identity Packet
```

Recommended:

```tsx
Profile Summary
```

Reason:

Cleaner and less gimmicky.

### `src/components/views/ContactView.tsx:52-53`

Current:

```tsx
Open to technical consulting, implementation, support engineering, and systems-focused collaboration.
```

Recommended:

```tsx
Open to lead technical solution consulting, B2B SaaS implementation, product sales, Tier-3 technical support, AI automation, workflow engineering, GTM, SDR, cybersecurity, and agentic full stack software development conversations.
```

Reason:

Names the exact target lanes from the CV details and user-provided interest areas.

### `src/components/views/ContactView.tsx:102-104`

Current:

```tsx
Protocol: Direct contact preferred
Status: Available for qualified conversations
```

Recommended:

```tsx
Direct contact preferred
Available for relevant technical, consulting, and support-focused conversations
```

Reason:

Keeps the message but removes unnecessary terminal framing.

## Skills Changes

### `src/lib/data.ts:202-256`

Current groups:

```ts
"Core Competencies"
"Solutions & Customer Engineering"
"Systems & Automation"
"Tools & Technologies"
```

Recommended groups:

```ts
"Engineering & Systems Foundation"
"Project Delivery & L&T Coordination"
"B2B SaaS Solution Consulting"
"Tier-3 Technical Support"
"AI Automation & Workflow Engineering"
```

Reason:

The current groups are serviceable, but the recommended groups better mirror the full core: engineering fundamentals, L&T project management, B2B SaaS solution consultation, Tier-3 support, and AI automation.

Recommended items:

```ts
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
```

## Navigation / Labeling Changes

### `src/components/PortfolioSidebar.tsx:165`

Current:

```tsx
Navigation Protocols
```

Recommended:

```tsx
Explore Portfolio
```

Reason:

More direct and less theme-heavy.

### `src/components/PortfolioSidebar.tsx:128-129`

Current:

```tsx
Shahriar&apos;s Portfolio
AI Enabled Portfolio
```

Recommended:

```tsx
Shahriar Haque Abir
Lead Technical Solution Consultant
```

Reason:

The sidebar should reinforce the professional positioning everywhere.

## Confirmed Decisions From Latest Review

1. Use **15+ years** for professional experience.
2. Use **March 2026** as the tripunkt end date.
3. Use **10 international clients onboarded**.
4. Use the language recommendations already in this change map.
5. Use **2013-2015** for network operations.
6. Do not use **Technical Lead** as an official title.
7. Use **Lead Technical Solution Consultant** as the desired frame.

## Remaining Questions Before Implementation

1. Should the public-facing spelling be **Lead Technical Solution Consultant** or **Lead Technical Solutions Consultant**?
2. For the L&T node, should the role be framed as **Project Management & Training Coordination** or **Technical Training Coordination with Project Management responsibilities**?
3. Should the hero badges read in first person/implied review style, such as "the bridge between client and engineering," or more title-like style, such as "Tier-3 Problem Solver"?

## Implementation Priority

Recommended order:

1. Update `src/lib/data.ts` first. Most visible copy flows from this file.
2. Update `HeroView.tsx` to make the first impression credible.
3. Update `AboutView.tsx` story beats to match the new narrative arc.
4. Reorder and rewrite the lead project in `data.ts`.
5. Replace Stats metrics with CV-backed metrics.
6. Tone down Contact and Sidebar labels.
7. Review final rendered pages for visual fit and line breaks.
