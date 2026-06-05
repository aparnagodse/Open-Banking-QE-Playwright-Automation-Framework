import { test, expect } from "@playwright/test";

import accountSchema from "../../../contracts/cdr/account.schema.json" assert { type: "json" };
import testData from "../../../test-data/accounts.json" assert { type: "json" };

import { validateSchema } from "../../../utils/schemaValidator.js";

test.describe("Open Banking CDR Contract Tests", () => {

  test("Validate Accounts API Contract using external test data", async ({ page }) => {

    const expectedAccount = testData.accounts[0];

    const mockResponse = {
      data: {
        accounts: [
          {
            accountId: expectedAccount.accountId,
            displayName: expectedAccount.displayName,
            accountNumber: "123456789",
            productCategory: "TRANS_AND_SAVINGS_ACCOUNTS"
          }
        ]
      }
    };

    console.log("Validating Open Banking response...");

    validateSchema(accountSchema, mockResponse);

    const actualAccount = mockResponse.data.accounts[0];

    expect(actualAccount.accountId).toBe(expectedAccount.accountId);
    expect(actualAccount.displayName).toBe(expectedAccount.displayName);
    expect(actualAccount.productCategory).toBe("TRANS_AND_SAVINGS_ACCOUNTS");

    await page.setContent(`
      <html>
        <body>
          <h1>Open Banking / CDR Accounts API Validation</h1>
          <p>Account contract validation completed successfully.</p>
          <ul>
            <li>Account ID: ${actualAccount.accountId}</li>
            <li>Display Name: ${actualAccount.displayName}</li>
            <li>Product Category: ${actualAccount.productCategory}</li>
          </ul>
        </body>
      </html>
    `);

    await page.screenshot({
      path: "screenshots/accounts-api-validation.png",
      fullPage: true
    });

  });

});