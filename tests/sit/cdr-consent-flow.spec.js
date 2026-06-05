import { test, expect } from "@playwright/test";

import consentSchema from "../../../contracts/cdr/consent.schema.json" assert { type: "json" };

import { validateSchema } from "../../../utils/schemaValidator.js";

test.describe("Open Banking Consent Lifecycle Tests", () => {

  test("Validate Active Consent Contract", async () => {

    const mockConsentResponse = {
      data: {
        consentId: "CONSENT001",
        status: "ACTIVE",
        permissions: [
          "ReadAccountsBasic",
          "ReadTransactionsDetail"
        ],
        expiryDate: "2026-12-31"
      }
    };

    console.log(
      "Validating consent response..."
    );

    validateSchema(
      consentSchema,
      mockConsentResponse
    );

    expect(
      mockConsentResponse.data.status
    ).toBe("ACTIVE");

  });

  test("Validate Expired Consent Access", async () => {

    const expiredConsentResponse = {
      error: "ConsentExpired",
      statusCode: 401
    };

    expect(
      expiredConsentResponse.statusCode
    ).toBe(401);

    expect(
      expiredConsentResponse.error
    ).toContain("ConsentExpired");

  });

});