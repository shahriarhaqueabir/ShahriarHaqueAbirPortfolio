"use client";

import { SiJira, SiConfluence, SiLooker, SiGithubactions, SiJson, SiPydantic } from "react-icons/si";
import { LuTerminal, LuDatabase, LuChartBar, LuChartLine, LuShieldCheck, LuWorkflow, LuCpu } from "react-icons/lu";
import { FaDocker, FaPython, FaJs, FaReact, FaNodeJs, FaGit, FaLinux, FaUbuntu, FaHtml5, FaDatabase } from "react-icons/fa";
import { SiPostgresql, SiTypescript, SiNextdotjs, SiFastapi, SiZod, SiMarkdown, SiPostman, SiSwagger, SiCisco } from "react-icons/si";

type TechIconProps = {
  name: string;
  className?: string;
};

const SvgD3 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-10 -10 116 111" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="d3-clip">
        <path d="M0,0h7.75a45.5,45.5 0 1 1 0,91h-7.75v-20h7.75a25.5,25.5 0 1 0 0,-51h-7.75zm36.2510,0h32a27.75,27.75 0 0 1 21.331,45.5a27.75,27.75 0 0 1 -21.331,45.5h-32a53.6895,53.6895 0 0 0 18.7464,-20h13.2526a7.75,7.75 0 1 0 0,-15.5h-7.75a53.6895,53.6895 0 0 0 0,-20h7.75a7.75,7.75 0 1 0 0,-15.5h-13.2526a53.6895,53.6895 0 0 0 -18.7464,-20z" />
      </clipPath>
    </defs>
    <linearGradient id="d3-g1" gradientUnits="userSpaceOnUse" x1="7" y1="64" x2="50" y2="107">
      <stop offset="0" stopColor="#f9a03c" />
      <stop offset="1" stopColor="#f7974e" />
    </linearGradient>
    <linearGradient id="d3-g2" gradientUnits="userSpaceOnUse" x1="2" y1="-2" x2="87" y2="84">
      <stop offset="0" stopColor="#f26d58" />
      <stop offset="1" stopColor="#f9a03c" />
    </linearGradient>
    <linearGradient id="d3-g3" gradientUnits="userSpaceOnUse" x1="45" y1="-10" x2="108" y2="53">
      <stop offset="0" stopColor="#b84e51" />
      <stop offset="1" stopColor="#f68e48" />
    </linearGradient>
    <g clipPath="url(#d3-clip)">
      <path d="M-100,-102m-28,0v300h300z" fill="url(#d3-g1)" />
      <path d="M-100,-102m28,0h300v300z" fill="url(#d3-g3)" />
      <path d="M-100,-102l300,300" fill="none" stroke="url(#d3-g2)" strokeWidth={40} />
    </g>
  </svg>
);

const SvgN8N = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 228 120" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M204 48C192.817 48 183.42 40.3514 180.756 30H153.248C147.382 30 142.376 34.241 141.412 40.0272L140.425 45.9456C139.489 51.5648 136.646 56.4554 132.626 60C136.646 63.5446 139.489 68.4352 140.425 74.0544L141.412 79.9728C142.376 85.759 147.382 90 153.248 90H156.756C159.42 79.6486 168.817 72 180 72C193.255 72 204 82.7452 204 96C204 109.255 193.255 120 180 120C168.817 120 159.42 112.351 156.756 102H153.248C141.516 102 131.504 93.5181 129.575 81.9456L128.588 76.0272C127.624 70.241 122.618 66 116.752 66H107.244C104.58 76.3514 95.183 84 84 84C72.817 84 63.4204 76.3514 60.7561 66H47.2439C44.5796 76.3514 35.183 84 24 84C10.7452 84 0 73.2548 0 60C0 46.7452 10.7452 36 24 36C35.183 36 44.5796 43.6486 47.2439 54H60.7561C63.4204 43.6486 72.817 36 84 36C95.183 36 104.58 43.6486 107.244 54H116.752C122.618 54 127.624 49.759 128.588 43.9728L129.575 38.0544C131.504 26.4819 141.516 18 153.248 18L180.756 18C183.42 7.64864 192.817 0 204 0C217.255 0 228 10.7452 228 24C228 37.2548 217.255 48 204 48ZM204 36C210.627 36 216 30.6274 216 24C216 17.3726 210.627 12 204 12C197.373 12 192 17.3726 192 24C192 30.6274 197.373 36 204 36ZM24 72C30.6274 72 36 66.6274 36 60C36 53.3726 30.6274 48 24 48C17.3726 48 12 53.3726 12 60C12 66.6274 17.3726 72 24 72ZM96 60C96 66.6274 90.6274 72 84 72C77.3726 72 72 66.6274 72 60C72 53.3726 77.3726 48 84 48C90.6274 48 96 53.3726 96 60ZM192 96C192 102.627 186.627 108 180 108C173.373 108 168 102.627 168 96C168 89.3726 173.373 84 180 84C186.627 84 192 89.3726 192 96Z"
      fill="#ea4b71"
    />
  </svg>
);

const iconSize = 20;

const iconMap: Record<string, (size?: number) => React.ReactNode> = {
  // Tools
  postman: () => <SiPostman size={iconSize} />,
  swagger: () => <SiSwagger size={iconSize} />,
  cli: () => <LuTerminal size={iconSize} style={{ color: "#00FF41" }} />,
  "cli (grep/awk)": () => <LuTerminal size={iconSize} style={{ color: "#00FF41" }} />,
  docker: () => <FaDocker size={iconSize} />,
  jira: () => <SiJira size={iconSize} />,
  confluence: () => <SiConfluence size={iconSize} />,

  // Databases
  postgresql: () => <SiPostgresql size={iconSize} />,
  mysql: () => <FaDatabase size={iconSize} style={{ color: "#4479A1" }} />,
  "sql server": () => <LuDatabase size={iconSize} style={{ color: "#0078D4" }} />,
  sqlite: () => <LuDatabase size={iconSize} style={{ color: "#003B57" }} />,
  qdrant: () => <LuDatabase size={iconSize} style={{ color: "#EB1F2F" }} />,

  // Languages & Analytics
  python: () => <FaPython size={iconSize} />,
  javascript: () => <FaJs size={iconSize} />,
  typescript: () => <SiTypescript size={iconSize} />,
  html: () => <FaHtml5 size={iconSize} />,
  n8n: () => <SvgN8N width={iconSize} height={iconSize} preserveAspectRatio="xMidYMid meet" />,
  "power bi": () => <LuChartBar size={iconSize} style={{ color: "#F2C811" }} />,
  looker: () => <SiLooker size={iconSize} />,
  matplotlib: () => <LuChartLine size={iconSize} style={{ color: "#11557C" }} />,
  git: () => <FaGit size={iconSize} />,
  "ci/cd": () => <SiGithubactions size={iconSize} />,
  "github actions": () => <SiGithubactions size={iconSize} />,

  // Infrastructure
  linux: () => <FaLinux size={iconSize} />,
  "linux admin": () => <FaLinux size={iconSize} />,
  ubuntu: () => <FaUbuntu size={iconSize} />,
  cisco: () => <SiCisco size={iconSize} />,
  nmap: () => <LuShieldCheck size={iconSize} style={{ color: "#4ADE80" }} />,
  "security foundations": () => <LuShieldCheck size={iconSize} style={{ color: "#4ADE80" }} />,
  "it security": () => <LuShieldCheck size={iconSize} style={{ color: "#4ADE80" }} />,

  // Modern Stack
  "next.js": () => <SiNextdotjs size={iconSize} />,
  react: () => <FaReact size={iconSize} />,
  reactflow: () => <LuWorkflow size={iconSize} style={{ color: "#FF0072" }} />,
  "node.js": () => <FaNodeJs size={iconSize} />,
  fastapi: () => <SiFastapi size={iconSize} />,
  d3: () => <SvgD3 width={iconSize} height={iconSize} />,
  "d3.js": () => <SvgD3 width={iconSize} height={iconSize} />,
  "rest apis": () => <LuWorkflow size={iconSize} style={{ color: "#38BDF8" }} />,
  json: () => <SiJson size={iconSize} />,
  "json/xml": () => <SiJson size={iconSize} />,
  pydantic: () => <SiPydantic size={iconSize} />,
  zod: () => <SiZod size={iconSize} />,
  markdown: () => <SiMarkdown size={iconSize} />,

  default: () => <LuCpu size={iconSize} style={{ color: "#38BDF8" }} />,
};

import React from "react";

const TechIconMemoized = React.memo(function TechIcon({ name, className }: TechIconProps) {
  const render = iconMap[name.toLowerCase()] || iconMap.default;
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}>
      {render()}
    </span>
  );
});

export default TechIconMemoized;
