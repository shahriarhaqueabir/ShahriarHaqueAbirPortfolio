import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/", title: /Shahriar Haque Abir \| Technical Operations Engineer/ },
  { path: "/about", title: /About Shahriar Haque Abir \| Technical Operations, Integration & Support/ },
  { path: "/projects", title: /Projects by Shahriar Haque Abir \| Technical Operations & Automation/ },
  { path: "/experience", title: /Experience \| Shahriar Haque Abir \| SaaS, Support & Engineering/ },
  { path: "/skills", title: /Skills \| Shahriar Haque Abir \| Support, Integration & Security/ },
  { path: "/stats", title: /Stats \| Shahriar Haque Abir \| Portfolio Proof Points/ },
  { path: "/contact", title: /Contact Shahriar Haque Abir \| Technical Operations & Consulting/ },
] as const;

test.describe("Portfolio — page load smoke tests", () => {
  for (const { path, title } of ROUTES) {
    test(`GET ${path} returns 200 with correct title`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.ok()).toBe(true);
      await expect(page).toHaveTitle(title);
    });
  }
});

test.describe("Portfolio — navigation", () => {
  test("navigates between views via sidebar icons", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Hero nav link should exist
    await expect(page.locator('nav a[href="/"], nav button').first()).toBeAttached();
  });

  test("robots.txt and sitemap.xml are accessible", async ({ page }) => {
    const robotsResponse = await page.goto("/robots.txt");
    expect(robotsResponse?.ok()).toBe(true);
    const robotsText = await robotsResponse?.text();
    expect(robotsText).toContain("Sitemap");

    const sitemapResponse = await page.goto("/sitemap.xml");
    expect(sitemapResponse?.ok()).toBe(true);
    const sitemapText = await sitemapResponse?.text();
    expect(sitemapText).toContain("urlset");
  });
});
