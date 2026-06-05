import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("NAB Accessibility Validation", () => {

  test("Validate NAB homepage accessibility", async ({ page }) => {

    await page.goto("https://www.nab.com.au/", {
      waitUntil: "domcontentloaded"
    });

    await page.screenshot({
      path: "screenshots/nab-accessibility-homepage.png",
      fullPage: true
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    console.log(
      "Accessibility Violations:",
      accessibilityScanResults.violations.length
    );

    accessibilityScanResults.violations.forEach((violation) => {
      console.log(`Rule: ${violation.id}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Description: ${violation.description}`);
    });

    expect(accessibilityScanResults.violations.length).toBeLessThan(20);

  });

});