"use client";

import React from "react";
import * as Si from "react-icons/si";
import * as Lu from "react-icons/lu";
import {
  Postman,
  Swagger,
  Docker,
  PostgreSQL,
  MySQLLight,
  Python,
  JavaScript,
  TypeScript,
  HTML5,
  Git,
  Linux,
  Ubuntu,
  CiscoDark,
  Nextjs,
  ReactLight,
  Nodejs,
  FastAPI,
  Zod,
  MarkdownDark,
} from "@ridemountainpig/svgl-react";

type TechIconProps = {
  name: string;
  className?: string;
  size?: number;
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

const SvgGoogleAnalytics = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 2195.9 2430.9" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#F9AB00" d="M2195.9,2126.7c0.9,166.9-133.7,302.8-300.5,303.7c-12.4,0.1-24.9-0.6-37.2-2.1c-154.8-22.9-268.2-157.6-264.4-314V316.1c-3.7-156.6,110-291.3,264.9-314c165.7-19.4,315.8,99.2,335.2,264.9c1.4,12.2,2.1,24.4,2,36.7L2195.9,2126.7z" />
    <path fill="#E37400" d="M301.1,1828.7c166.3,0,301.1,134.8,301.1,301.1c0,166.3-134.8,301.1-301.1,301.1C134.8,2430.9,0,2296.1,0,2129.8C0,1963.5,134.8,1828.7,301.1,1828.7z M1093.3,916.2c-167.1,9.2-296.7,149.3-292.8,316.6v808.7c0,219.5,96.6,352.7,238.1,381.1c163.3,33.1,322.4-72.4,355.5-235.7c4.1-20,6.1-40.3,6-60.7v-907.4c0.3-166.9-134.7-302.4-301.6-302.7C1096.8,916.1,1095,916.1,1093.3,916.2z" />
  </svg>
);

const iconMap: Record<string, (size: number) => React.ReactNode> = {
  // Tools
  postman: (s) => <Postman width={s} height={s} />,
  swagger: (s) => <Swagger width={s} height={s} />,
  cli: (s) => <Lu.LuTerminal size={s} style={{ color: "#00FF41" }} />,
  "cli (grep/awk)": (s) => <Lu.LuTerminal size={s} style={{ color: "#00FF41" }} />,
  docker: (s) => <Docker width={s} height={s} />,
  jira: (s) => <Si.SiJira size={s} />,
  confluence: (s) => <Si.SiConfluence size={s} />,

  // Databases
  postgresql: (s) => <PostgreSQL width={s} height={s} />,
  mysql: (s) => <MySQLLight width={s} height={s} />,
  "sql server": (s) => <Lu.LuDatabase size={s} style={{ color: "#0078D4" }} />,
  sqlite: (s) => <Lu.LuDatabase size={s} style={{ color: "#003B57" }} />,
  qdrant: (s) => <Lu.LuDatabase size={s} style={{ color: "#EB1F2F" }} />,

  // Languages & Analytics
  python: (s) => <Python width={s} height={s} />,
  javascript: (s) => <JavaScript width={s} height={s} />,
  typescript: (s) => <TypeScript width={s} height={s} />,
  html: (s) => <HTML5 width={s} height={s} />,
  n8n: (s) => <SvgN8N width={s} height={s} preserveAspectRatio="xMidYMid meet" />,
  "power bi": (s) => <Lu.LuChartBar size={s} style={{ color: "#F2C811" }} />,
  looker: (s) => <Si.SiLooker size={s} />,
  matplotlib: (s) => <Lu.LuChartLine size={s} style={{ color: "#11557C" }} />,
  git: (s) => <Git width={s} height={s} />,
  "ci/cd": (s) => <Si.SiGithubactions size={s} />,
  "github actions": (s) => <Si.SiGithubactions size={s} />,

  // Infrastructure
  linux: (s) => <Linux width={s} height={s} />,
  "linux admin": (s) => <Linux width={s} height={s} />,
  ubuntu: (s) => <Ubuntu width={s} height={s} />,
  cisco: (s) => <CiscoDark width={s} height={s} />,
  nmap: (s) => <Lu.LuShieldCheck size={s} style={{ color: "#4ADE80" }} />,
  "security foundations": (s) => <Lu.LuShieldCheck size={s} style={{ color: "#4ADE80" }} />,
  "it security": (s) => <Lu.LuShieldCheck size={s} style={{ color: "#4ADE80" }} />,

  // Modern Stack
  "next.js": (s) => <Nextjs width={s} height={s} />,
  react: (s) => <ReactLight width={s} height={s} />,
  reactflow: (s) => <Lu.LuWorkflow size={s} style={{ color: "#FF0072" }} />,
  "node.js": (s) => <Nodejs width={s} height={s} />,
  fastapi: (s) => <FastAPI width={s} height={s} />,
  d3: (s) => <SvgD3 width={s} height={s} />,
  "d3.js": (s) => <SvgD3 width={s} height={s} />,
  "rest apis": (s) => <Lu.LuWorkflow size={s} style={{ color: "#38BDF8" }} />,
  json: (s) => <Si.SiJson size={s} />,
  "json/xml": (s) => <Si.SiJson size={s} />,
  pydantic: (s) => <Si.SiPydantic size={s} />,
  zod: (s) => <Zod width={s} height={s} />,
  markdown: (s) => <MarkdownDark width={s} height={s} />,

  default: (s) => <Lu.LuCpu size={s} style={{ color: "#38BDF8" }} />,
};

export default function TechIcon({ name, className, size = 20 }: TechIconProps) {
  const render = iconMap[name.toLowerCase()] || iconMap.default;
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}>
      {render(size)}
    </span>
  );
}
