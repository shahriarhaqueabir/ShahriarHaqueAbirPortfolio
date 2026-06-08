import { CreateMLCEngine, type ChatCompletionMessageParam, type InitProgressReport, type MLCEngine } from "@mlc-ai/web-llm";

const MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";

class LlamaEngineSingleton {
  static instance: MLCEngine | null = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (report: InitProgressReport) => {
          self.postMessage({
            status: "progress",
            data: {
              progress: Math.round((report.progress ?? 0) * 100),
              text: report.text,
              model: MODEL_ID,
            },
          });
        },
      });
    }

    return this.instance;
  }
}

self.addEventListener("message", async (event: MessageEvent<{ messages: ChatCompletionMessageParam[]; warmup?: boolean }>) => {
  const { messages, warmup } = event.data;

  try {
    const engine = await LlamaEngineSingleton.getInstance();

    if (warmup) {
      self.postMessage({ status: "ready", model: MODEL_ID });
      return;
    }

    const output = await engine.chat.completions.create({
      messages,
      temperature: 0.35,
      max_tokens: 420,
    });

    self.postMessage({
      status: "complete",
      text: output.choices[0]?.message?.content ?? "",
      model: MODEL_ID,
    });
  } catch (err: unknown) {
    const error = err as Error;
    self.postMessage({ status: "error", error: error.message, model: MODEL_ID });
  }
});
