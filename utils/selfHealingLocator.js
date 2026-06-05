export async function selfHealLocator(page, locatorOptions) {
  const { primary, fallbacks = [], timeout = 3000 } = locatorOptions;

  const allLocators = [primary, ...fallbacks];

  for (const locator of allLocators) {
    try {
      const element = page.locator(locator);
      await element.waitFor({ state: "visible", timeout });

      console.log(`Self-healing locator found: ${locator}`);
      return element;
    } catch (error) {
      console.log(`Locator failed, trying next: ${locator}`);
    }
  }

  throw new Error(
    `Self-healing failed. None of the locators worked: ${allLocators.join(", ")}`
  );
}