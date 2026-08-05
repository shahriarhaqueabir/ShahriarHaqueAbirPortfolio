import { test, expect } from "@playwright/test";

test.describe("Portfolio — QWEN guide", () => {
  test("shows model download progress inside the open guide panel", async ({ page }) => {
    await page.addInitScript(() => {
      class LoadingWorker {
        private listeners = new Set<(event: MessageEvent) => void>();

        addEventListener(type: string, listener: (event: MessageEvent) => void) {
          if (type === "message") this.listeners.add(listener);
        }

        removeEventListener(type: string, listener: (event: MessageEvent) => void) {
          if (type === "message") this.listeners.delete(listener);
        }

        terminate() {}

        postMessage(message: { warmup?: boolean }) {
          if (!message.warmup) return;
          window.setTimeout(() => {
            const event = new MessageEvent("message", { data: { status: "progress", data: { progress: 37 } } });
            this.listeners.forEach((listener) => listener(event));
          }, 0);
        }
      }

      Object.defineProperty(globalThis, "Worker", {
        configurable: true,
        writable: true,
        value: LoadingWorker,
      });
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Enable Qwen/ }).click();
    await page
      .getByRole("button", { name: /Enable Qwen/ })
      .last()
      .click();

    const progress = page.getByRole("progressbar", { name: /Downloading Qwen model/i });
    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute("aria-valuenow", "37");
    await expect(page.getByText(/First visit downloads the model/i)).toBeVisible();
  });

  test("answers a natural question about AI project experience in fallback mode", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: /Enable Qwen/ })).toBeVisible();
    await page.getByRole("button", { name: /Enable Qwen/ }).click();

    const input = page.getByLabel("Ask about Shahriar");
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.fill("What projects show AI experience?");
    await input.press("Enter");

    await expect(page.locator('[role="log"]')).toContainText("AI-Assisted German Law");
    await expect(page).toHaveURL(/\/projects$/);
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

          const answer = "Thanks for the quick overview! UniversalOps and AI-Assisted German Law show Shahriar's AI project experience.\nINITIATING_NAVIGATION: projects";
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
    await expect(page.getByRole("button", { name: /Enable Qwen/ })).toBeVisible();
    await page.getByRole("button", { name: /Enable Qwen/ }).click();
    await expect(page.getByText("QWEN GUIDE")).toBeVisible();
    await expect(page.getByLabel("Ask about Shahriar")).toBeVisible({ timeout: 15000 });
    await page
      .getByRole("button", { name: /Enable Qwen/ })
      .last()
      .click();
    await expect(page.getByRole("button", { name: /Enable Qwen/ })).toHaveCount(0);

    const input = page.getByLabel("Ask about Shahriar");
    await input.fill("Tell me about AI projects");
    await input.press("Enter");

    const answer = "Thanks for the quick overview! UniversalOps and AI-Assisted German Law show Shahriar's AI project experience.";
    const log = page.locator('[role="log"]');
    await expect(log).toContainText(answer);
    await expect(log).not.toContainText("INITIATING_NAVIGATION");
    await expect(log.getByText(answer, { exact: true })).toHaveCount(1);
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.locator("section.fixed")).toBeVisible();
  });
});
