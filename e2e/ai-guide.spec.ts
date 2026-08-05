import { test, expect } from "@playwright/test";

test.describe("Portfolio — local AI guide", () => {
  test("answers a natural question about AI project experience in fallback mode", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: /Enable AI Guide/ })).toBeVisible();
    await page.getByRole("button", { name: /Enable AI Guide/ }).click();

    const input = page.getByLabel("Ask about Shahriar");
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill("What projects show AI experience?");
    await input.press("Enter");

    await expect(page.locator('[role="log"]')).toContainText("AI-Assisted German Law");
  });

  test("renders one streamed answer without duplicating the assistant message", async ({ page }) => {
    await page.addInitScript(() => {
      class MockWorker {
        private listeners = new Set<(event: MessageEvent) => void>();

        addEventListener(type: string, listener: (event: MessageEvent) => void) {
          if (type === "message") this.listeners.add(listener);
        }

        removeEventListener(type: string, listener: (event: MessageEvent) => void) {
          if (type === "message") this.listeners.delete(listener);
        }

        terminate() {}

        postMessage(message: { warmup?: boolean }) {
          if (message.warmup) {
            window.setTimeout(() => {
              this.emit({ status: "progress", data: { progress: 100 } });
              this.emit({ status: "ready", model: "mock-model" });
            }, 0);
            return;
          }

          const answer = "Thanks for the quick overview! UniversalOps and AI-Assisted German Law show Shahriar's AI project experience.";
          window.setTimeout(() => {
            this.emit({ status: "stream", text: answer, model: "mock-model" });
            this.emit({ status: "complete", text: answer, model: "mock-model" });
          }, 0);
        }

        private emit(data: Record<string, unknown>) {
          const event = new MessageEvent("message", { data });
          this.listeners.forEach((listener) => listener(event));
        }
      }

      Object.defineProperty(globalThis, "Worker", {
        configurable: true,
        writable: true,
        value: MockWorker,
      });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: /Enable AI Guide/ })).toBeVisible();
    await page.getByRole("button", { name: /Enable AI Guide/ }).click();
    await expect(page.getByLabel("Ask about Shahriar")).toBeVisible({ timeout: 15000 });
    await page
      .getByRole("button", { name: /Enable AI/ })
      .last()
      .click();
    await expect(page.getByRole("button", { name: /Enable AI/ })).toHaveCount(0);

    const input = page.getByLabel("Ask about Shahriar");
    await input.fill("Tell me about AI projects");
    await input.press("Enter");

    const answer = "Thanks for the quick overview! UniversalOps and AI-Assisted German Law show Shahriar's AI project experience.";
    const log = page.locator('[role="log"]');
    await expect(log).toContainText(answer);
    await expect(log.getByText(answer, { exact: true })).toHaveCount(1);
  });
});
