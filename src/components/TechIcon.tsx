"use client";

import React from "react";
import {
  SiPostman,
  SiDocker,
  SiJira,
  SiConfluence,
  SiPostgresql,
  SiMysql,
  SiMicrosoftsqlserver,
  SiPython,
  SiN8N,
  SiPowerbi,
  SiLooker,
  SiLinux,
  SiCisco,
  SiGit,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiSwagger,
  SiD3Dotjs,
  SiFastapi,
  SiNmap,
  SiGithubactions,
  SiJavascript,
  SiHtml5,
  SiPydantic,
  SiZod,
  SiJson,
  SiMarkdown,
  SiUbuntu
} from "react-icons/si";
import { LuTerminal, LuDatabase, LuWorkflow, LuShieldCheck, LuCpu } from "react-icons/lu";

type TechIconProps = {
  name: string;
  className?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  // Tools
  postman: <SiPostman />,
  swagger: <SiSwagger />,
  cli: <LuTerminal />,
  "cli (grep/awk)": <LuTerminal />,
  docker: <SiDocker />,
  jira: <SiJira />,
  confluence: <SiConfluence />,

  // Databases
  postgresql: <SiPostgresql />,
  mysql: <SiMysql />,
  "sql server": <SiMicrosoftsqlserver />,
  sqlite: <LuDatabase />,
  qdrant: <LuDatabase />,

  // Languages & Analytics
  python: <SiPython />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  html: <SiHtml5 />,
  n8n: <SiN8N />,
  "power bi": <SiPowerbi />,
  looker: <SiLooker />,
  matplotlib: <LuWorkflow />,
  git: <SiGit />,
  "ci/cd": <SiGithubactions />,
  "github actions": <SiGithubactions />,

  // Infrastructure
  linux: <SiLinux />,
  "linux admin": <SiLinux />,
  ubuntu: <SiUbuntu />,
  cisco: <SiCisco />,
  nmap: <SiNmap />,
  "security foundations": <LuShieldCheck />,
  "it security": <LuShieldCheck />,

  // Modern Stack
  "next.js": <SiNextdotjs />,
  react: <SiReact />,
  reactflow: <LuWorkflow />,
  "node.js": <SiNodedotjs />,
  fastapi: <SiFastapi />,
  d3: <SiD3Dotjs />,
  "d3.js": <SiD3Dotjs />,
  "rest apis": <LuWorkflow />,
  json: <SiJson />,
  "json/xml": <SiJson />,
  pydantic: <SiPydantic />,
  zod: <SiZod />,
  markdown: <SiMarkdown />,

  // Generic
  default: <LuCpu />
};

export default function TechIcon({ name, className = "w-4 h-4" }: TechIconProps) {
  const iconKey = name.toLowerCase();
  const Icon = iconMap[iconKey] || iconMap.default;

  return (
    <span className={className}>
      {Icon}
    </span>
  );
}
