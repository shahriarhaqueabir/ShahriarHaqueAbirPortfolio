"use client";

import { Mic, Volume2, VolumeX } from "lucide-react";

type VoiceButtonProps =
  | {
      mode: "input";
      isListening: boolean;
      isSupported: boolean;
      onClick: () => void;
    }
  | {
      mode: "speaker";
      isSpeaking: boolean;
      isSupported: boolean;
      onClick: () => void;
    };

export default function VoiceButton(props: VoiceButtonProps) {
  // Always render the button structure to prevent hydration mismatch.
  // When unsupported (SSR / old browser), the button is disabled and visually muted.

  if (props.mode === "input") {
    return (
      <button
        type="button"
        onClick={props.isSupported ? props.onClick : undefined}
        disabled={!props.isSupported}
        className={`p-1.5 rounded-sm transition-colors ${
          !props.isSupported ? "text-(--text-muted)/30 cursor-not-allowed" : props.isListening ? "text-red-400 bg-red-500/15" : "text-(--text-muted) hover:text-(--accent) hover:bg-(--surface)/80"
        }`}
        aria-label={props.isSupported ? (props.isListening ? "Stop listening" : "Voice input") : "Voice input unavailable"}
        title={props.isSupported ? (props.isListening ? "Stop listening" : "Voice input") : "Not supported by this browser"}
      >
        <Mic className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={props.isSupported ? props.onClick : undefined}
      disabled={!props.isSupported}
      className={`p-1 rounded-sm transition-colors ${
        !props.isSupported ? "text-(--text-muted)/30 cursor-not-allowed" : props.isSpeaking ? "text-(--accent) bg-(--accent)/10" : "text-(--text-muted) hover:text-(--accent) hover:bg-(--surface)/80"
      }`}
      aria-label={props.isSupported ? (props.isSpeaking ? "Stop speaking" : "Read aloud") : "Read aloud unavailable"}
      title={props.isSupported ? (props.isSpeaking ? "Stop speaking" : "Read aloud") : "Text-to-speech not available"}
    >
      {props.isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
    </button>
  );
}
