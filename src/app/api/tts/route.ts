import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";

// Voice ID for "Rachel" — the default ElevenLabs voice
const DEFAULT_VOICE_ID = "FGY2WhTYpPnrIDTdsKH5";

// Simple in-memory rate limiting for serverless instances
// Note: This resets on cold starts but provides a basic shield against rapid spam
const RATE_LIMIT_MAP = new Map<string, { count: number; reset: number }>();
const LIMIT = 15; // requests
const WINDOW = 60 * 1000; // 1 minute

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const now = Date.now();

    // 1. Rate Limit Check
    const rateData = RATE_LIMIT_MAP.get(ip) || { count: 0, reset: now + WINDOW };

    if (now > rateData.reset) {
      rateData.count = 0;
      rateData.reset = now + WINDOW;
    }

    if (rateData.count >= LIMIT) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait a minute.", fallback: true }, { status: 429 });
    }

    rateData.count++;
    RATE_LIMIT_MAP.set(ip, rateData);

    // 2. CSRF/Origin Check
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    const isAllowedOrigin = !origin || origin.includes(host || "localhost");

    if (!isAllowedOrigin) {
      return NextResponse.json({ error: "Forbidden: Cross-origin requests not allowed" }, { status: 403 });
    }

    const { text, voice_id = DEFAULT_VOICE_ID } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Cap text to protect free-tier quota (~500 chars per request)
    const truncated = text.slice(0, 500);

    const apiKey = process.env.ELEVENLABS_API;
    if (!apiKey) {
      console.error("TTS route: ELEVENLABS_API not set");
      // Return 503 so the client knows to use browser SpeechSynthesis fallback
      return NextResponse.json({ error: "TTS not configured — use browser fallback", fallback: true }, { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // ElevenLabs deprecated xi-api-key in favor of Bearer token.
    // Support both to handle key rotation without breaking existing configs.
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey.startsWith("sk_")) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    } else {
      headers["xi-api-key"] = apiKey;
    }

    const response = await fetch(`${ELEVENLABS_BASE}/text-to-speech/${voice_id}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: truncated,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      const status = response.status;

      // Rate-limited, unauthorized, or quota exhausted — tell client to use browser fallback
      // Preserve the original status code so monitoring tools see accurate error types
      if (status === 429 || status === 401 || status === 402) {
        const label = status === 429 ? "rate limit" : status === 401 ? "unauthorized" : "quota exceeded";
        return NextResponse.json({ error: `ElevenLabs ${status}: ${label}`, fallback: true }, { status });
      }

      console.error("ElevenLabs API error:", status, errorBody.slice(0, 200));
      return NextResponse.json({ error: `ElevenLabs ${status}`, fallback: true }, { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    // AbortError = timeout, tell client to use browser fallback
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "TTS upstream timeout", fallback: true }, { status: 504 });
    }
    console.error("TTS route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
