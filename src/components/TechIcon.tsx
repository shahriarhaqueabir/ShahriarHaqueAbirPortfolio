"use client";

import React from "react";
import * as Si from "react-icons/si";
import * as Lu from "react-icons/lu";

type TechIconProps = {
  name: string;
  className?: string;
};

// Safe access helper for icons that might have changed names in Si library
const getSiIcon = (key: string): React.ReactNode => {
  const icons = Si as any;
  const IconComponent = icons[key] || icons[`Si${key}`];
  return IconComponent ? React.createElement(IconComponent) : null;
};

const iconMap: Record<string, React.ReactNode> = {
  // Tools
  postman: <Si.SiPostman />,
  swagger: <Si.SiSwagger />,
  cli: <Lu.LuTerminal />,
  "cli (grep/awk)": <Lu.LuTerminal />,
  docker: <Si.SiDocker />,
  jira: <Si.SiJira />,
  confluence: <Si.SiConfluence />,

  // Databases
  postgresql: <Si.SiPostgresql />,
  mysql: <Si.SiMysql />,
  "sql server": getSiIcon("SiMicrosoftsqlserver") || <Lu.LuDatabase />,
  sqlite: <Lu.LuDatabase />,
  qdrant: <Lu.LuDatabase />,

  // Languages & Analytics
  python: <Si.SiPython />,
  javascript: <Si.SiJavascript />,
  typescript: <Si.SiTypescript />,
  html: <Si.SiHtml5 />,
  n8n: <Si.SiN8N />,
  "power bi": getSiIcon("SiPowerbi") || <Lu.LuWorkflow />,
  looker: <Si.SiLooker />,
  matplotlib: <Lu.LuWorkflow />,
  git: <Si.SiGit />,
  "ci/cd": <Si.SiGithubactions />,
  "github actions": <Si.SiGithubactions />,

  // Infrastructure
  linux: <Si.SiLinux />,
  "linux admin": <Si.SiLinux />,
  ubuntu: <Si.SiUbuntu />,
  cisco: <Si.SiCisco />,
  nmap: getSiIcon("SiNmap") || <Lu.LuShieldCheck />,
  "security foundations": <Lu.LuShieldCheck />,
  "it security": <Lu.LuShieldCheck />,

  // Modern Stack
  "next.js": <Si.SiNextdotjs />,
  react: <Si.SiReact />,
  reactflow: <Lu.LuWorkflow />,
  "node.js": <Si.SiNodedotjs />,
  fastapi: <Si.SiFastapi />,
  d3: getSiIcon("SiD3Dotjs") || <Lu.LuWorkflow />,
  "d3.js": getSiIcon("SiD3Dotjs") || <Lu.LuWorkflow />,
  "rest apis": <Lu.LuWorkflow />,
  json: <Si.SiJson />,
  "json/xml": <Si.SiJson />,
  pydantic: <Si.SiPydantic />,
  zod: <Si.SiZod />,
  markdown: <Si.SiMarkdown />,

  // Generic
  default: <Lu.LuCpu />
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
