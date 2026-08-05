import path from "node:path";
import sharp from "sharp";

const width = 1200;
const height = 630;
const root = process.cwd();
const profilePath = path.join(root, "public", "profile.jpg");
const outPath = path.join(root, "public", "og-image.png");

const photo = await sharp(profilePath)
  .resize(420, 420, {
    fit: "cover",
    position: "centre",
  })
  .png()
  .toBuffer();

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="52%" stop-color="#081122"/>
      <stop offset="100%" stop-color="#101b33"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 120) rotate(35) scale(420 260)">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(980 540) rotate(-18) scale(360 240)">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glowA)"/>
  <rect width="${width}" height="${height}" fill="url(#glowB)"/>

  <g opacity="0.16" stroke="#dbeafe" stroke-width="1">
    <path d="M0 120H1200M0 260H1200M0 400H1200M0 540H1200"/>
    <path d="M120 0V630M360 0V630M600 0V630M840 0V630M1080 0V630"/>
  </g>

  <rect x="72" y="70" width="88" height="88" rx="22" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)"/>
  <text x="116" y="124" text-anchor="middle" fill="#f8fafc" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">SHA</text>

  <text x="72" y="236" fill="#e2e8f0" font-size="24" letter-spacing="0.22em" font-weight="700" font-family="Arial, Helvetica, sans-serif">PORTFOLIO</text>
  <text x="72" y="332" fill="#ffffff" font-size="60" font-weight="800" font-family="Arial, Helvetica, sans-serif">Shahriar Haque Abir</text>
  <text x="72" y="388" fill="#bfdbfe" font-size="30" font-weight="600" font-family="Arial, Helvetica, sans-serif">Technical Operations Engineer</text>
  <text x="72" y="430" fill="#bfdbfe" font-size="30" font-weight="600" font-family="Arial, Helvetica, sans-serif">Integration Engineer</text>
  <text x="72" y="472" fill="#bfdbfe" font-size="30" font-weight="600" font-family="Arial, Helvetica, sans-serif">Application Support Engineer</text>

  <rect x="72" y="512" width="468" height="4" rx="2" fill="url(#stroke)"/>
  <text x="72" y="560" fill="#cbd5e1" font-size="22" font-weight="500" font-family="Arial, Helvetica, sans-serif">Berlin-based delivery, support, and integration work for enterprise SaaS.</text>
  <text x="72" y="596" fill="#94a3b8" font-size="18" font-weight="500" font-family="Arial, Helvetica, sans-serif">shahriarhaqueabirportfolio.vercel.app</text>

  <rect x="708" y="88" width="420" height="420" rx="34" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" filter="url(#shadow)"/>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: 708, top: 88 }])
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath}`);
