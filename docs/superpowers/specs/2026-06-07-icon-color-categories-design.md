# Icon & Color Categories Spec

## 1. Overview
Give each portfolio section a distinct accent color and replace generic Lucide icons with real tech/brand SVG logos (from svgl) in two places:
- **Nav rail** — 8 tech logos that don't overlap with skills/projects tool lists
- **Tech badges** — all tool/tech names in Skills and Projects pages get real brand SVGs instead of `react-icons/si`

Layout stays identical — purely a visual swap.

## 2. Color Palette

| Section   | Color   | Tailwind  | Hex       |
|-----------|---------|-----------|-----------|
| Home      | sky     | sky-500   | `#0EA5E9` |
| About     | purple  | purple-500| `#A855F7` |
| Blog      | amber   | amber-500 | `#F59E0B` |
| Projects  | emerald | emerald-500| `#10B981`|
| Experience| indigo  | indigo-500| `#6366F1` |
| Skills    | cyan    | cyan-500  | `#06B6D4` |
| Stats     | pink    | pink-500  | `#EC4899` |
| Contact   | fuchsia | fuchsia-500| `#D946EF` |

Stored as a `ViewKey → colorHex` map. The active section's color is also set as a CSS custom property (`--section-color`) on the rail, so the status dot and footer can read it.

## 3. Nav Rail Icons

Each Lucide icon replaced with a real brand SVG from [svgl](https://svgl.app). These logos are chosen to **not overlap** with any tool/tech name that appears in the Skills or Projects pages.

| Section   | svgl Logo            | svgl route             | Why                                          |
|-----------|----------------------|------------------------|----------------------------------------------|
| Home      | Notion               | notion.svg             | Knowledge/workspace hub                      |
| About     | Figma                | figma.svg              | Design identity representation               |
| Blog      | Dev.to               | devto-light.svg        | Developer writing platform                   |
| Projects  | Visual Studio Code   | vscode.svg             | Primary coding environment                   |
| Experience| LinkedIn             | linkedin.svg           | Professional career network                  |
| Skills    | Vite                 | vite.svg               | Modern build tooling, developer skills        |
| Stats     | Google Analytics     | google-analytics.svg   | Data & metrics                                |
| Contact   | Discord              | discord.svg            | Developer messaging / community              |

Each SVG is downloaded once via `webfetch`, stored as an inline React component in a local `src/components/icons/svgl/` file. No runtime network requests.

## 4. Visual Behavior in IconRail

### Inactive (default)
- Muted icon at 50% opacity, transparent border

### Hover
- Icon shifts to section color at 60% opacity
- Border appears in section color at 30% opacity

### Active (current view)
- Colored circle background fills the button using the section color
- Icon turns white (current accent behavior)
- Dot indicator on the rail uses the section color
- Transition: 200ms ease

### Implementation
A `data-section-color` attribute on each nav button drives `var(--section-color)`. The SVG icon components accept a `className` prop so they inherit sizing and coloring from the parent.

## 5. Tech Badge Icons (Skills & Projects pages)

The existing `TechIcon` component (`src/components/TechIcon.tsx`) currently maps ~40 tool names to `react-icons/si` or `react-icons/lu` components. This gets replaced with inline svgl SVGs.

Tools to map (from Skills toolGroups + Projects stacks):

| Tool              | svgl route                    |
|-------------------|-------------------------------|
| Postman           | postman.svg                   |
| Swagger           | swagger.svg                   |
| Docker            | docker.svg                    |
| Jira              | jira.svg                      |
| Confluence        | confluence.svg                |
| PostgreSQL        | postgresql.svg                |
| MySQL             | mysql.svg                     |
| SQL Server        | sql-server.svg                |
| SQLite            | sqlite.svg                    |
| Python            | python.svg                    |
| JavaScript        | javascript.svg                |
| TypeScript        | typescript.svg                |
| HTML              | html5.svg                     |
| n8n               | n8n.svg                       |
| Power BI          | power-bi.svg                  |
| Looker            | looker.svg                    |
| Matplotlib        | matplotlib.svg                |
| Git               | git.svg                       |
| GitHub Actions    | github-actions.svg            |
| CI/CD             | githubactions.svg (same)      |
| Linux             | linux.svg                     |
| Cisco             | cisco.svg                     |
| nmap              | nmap.svg                      |
| Next.js           | nextjs_icon_dark.svg          |
| React             | react_light.svg               |
| Node.js           | nodejs.svg                    |
| FastAPI           | fastapi.svg                   |
| D3.js             | d3.svg                        |
| JSON              | json.svg                      |
| Pydantic          | pydantic.svg                  |
| Zod               | zod.svg                       |
| Markdown          | markdown.svg                  |

For generic entries (SLA Management, Schema Validation, API Tracing, Routing/Switching, etc.) with no matching svgl logo, fall back to a simple colored dot or keep the current Lucide fallback.

### Rendering
Each SVG is stored as a React component in a map. The `TechIcon` component looks up the name and renders the matching inline SVG with the passed `className`. Size stays `w-3.5 h-3.5` in badges.

## 6. Dot Indicator in Footer

The status dot in `AiGuideFooter` uses the active section color instead of always green. When AI is loading/paused/fallback, the dot shows its AI state color (overriding the section color).

## 7. Scope

### What changes
- `src/components/layout/IconRail.tsx` — 8 new SVGs from svgl, color map, colored active states/hover, colored dot
- `src/components/AiGuideFooter.tsx` — status dot reads active section color
- `src/components/TechIcon.tsx` — replace `react-icons/si` with inline svgl SVGs

### What stays the same
- All layout, spacing, sizing (grid, padding, badge shapes, etc.)
- SkillsView and ProjectsView component structure (they already use TechIcon)
- All other components (AiGuidePanel, PortfolioShell, views)
- All hooks and state management
- Animations and transitions
- Mobile behavior
- e2e tests

## 8. Implementation Approach

### SVG management
Each svgl SVG is fetched once via the svgl API, the raw SVG markup is extracted, and it's stored as a simple React component (or inline string) in a central `src/lib/svgl-icons.ts` file. The component renders the SVG with currentColor support where possible (some svgl SVGs use hardcoded fills — those get their fill attribute modified to `currentColor`).

### Color → rail wiring
The `desktopRailItems` array in `IconRail.tsx` gets an additional `color` field. The active view's color is used for the colored circle background, border, dot, and hover state.

### TechIcon rewrite
`TechIcon.tsx` imports the svgl icon map instead of `react-icons/*`. The lookup logic stays the same (lowercase key → icon component). Icons with no svgl match continue using the existing Lucide fallback.
