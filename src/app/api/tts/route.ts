import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";

// Voice ID for "Rachel" — the default ElevenLabs voice
const DEFAULT_VOICE_ID = "FGY2WhTYpPnrIDTdsKH5";

export async function POST(request: NextRequest) {
  try {
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
