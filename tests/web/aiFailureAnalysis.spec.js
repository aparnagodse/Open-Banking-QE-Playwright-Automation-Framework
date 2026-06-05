import { test, expect } from "@playwright/test";
import { selfHealLocator } from "../../utils/selfHealingLocator.js";

test("Open Banking Account Summary Validation with Self-Healing Locator", async ({ page }) => {
  await page.setContent(`
    <html>
      <body>
        <h1>Open Banking Account Summary</h1>

        <section data-testid="account-summary">
          <p>Account ID: ACC001</p>
          <p>Current Balance: 2500.75 AUD</p>
        </section>
      </body>
    </html>
  `);

  const recoveredElement = await selfHealLocator(page, {
    primary: "#customer-account-summary",
    fallbacks: [
      "[data-testid='account-summary']",
      "text=Open Banking Account Summary"
    ],
    timeout: 2000
  });

  await expect(recoveredElement).toBeVisible();
});