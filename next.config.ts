import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
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
              // Local AI (WebLLM): model config + weights from Hugging Face. Weight shards 302-redirect
              // to HF's Xet CAS CDN (us.aws.cdn.hf.co / eu.aws.cdn.hf.co / *.gcp.cdn.hf.co), and legacy
              // LFS files to cdn-lfs.huggingface.co — covered via *.hf.co + *.huggingface.co wildcards.
              // WASM model lib fetched from GitHub raw (binary-mlc-llm-libs).
              "connect-src 'self' https://va.vercel-scripts.com https://huggingface.co https://*.huggingface.co https://*.hf.co https://raw.githubusercontent.com",
              "worker-src 'self' blob:",
              "media-src 'self' blob:",
              "frame-ancestors 'none'",
              "form-action 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=(), midi=()",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
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
