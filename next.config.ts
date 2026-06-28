import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
  turbopack: {},
  // Minimal CSP — allows local AI (WebGPU blob workers, inline styles for Framer Motion)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Vercel CDN for analytics + speed-insights scripts in dev mode
              // (production on Vercel serves them same-origin)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              // Vercel analytics sends data; elevenlabs.io NOT needed — TTS proxied server-side
              "connect-src 'self' https://va.vercel-scripts.com",
              "worker-src 'self' blob:",
              "media-src 'self' blob:",
              "frame-ancestors 'none'",
              "form-action 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default nextConfig;
