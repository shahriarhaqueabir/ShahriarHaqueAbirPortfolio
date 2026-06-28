import { NextRequest, NextResponse } from "next/server";

const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";

export async function POST(request: NextRequest) {
  try {
    const { text, voice_id = "FGY2WhTYpPnrIDTdsKH5" } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Cap text to protect free-tier quota (~500 chars per request)
    const truncated = text.slice(0, 500);

    const apiKey = process.env.ELEVENLABS_API;
    if (!apiKey) {
      console.error("TTS route: ELEVENLABS_API not set");
      return NextResponse.json({ error: "TTS not configured" }, { status: 500 });
    }

    const response = await fetch(`${ELEVENLABS_BASE}/text-to-speech/${voice_id}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: truncated,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ElevenLabs API error:", response.status, errorBody);
      const errMsg = `ElevenLabs ${response.status}: ${errorBody.slice(0, 200)}`;
      console.error(errMsg);
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
