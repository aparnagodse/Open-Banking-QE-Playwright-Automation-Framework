import { test, expect } from "@playwright/test";

import transactionSchema from "../../../contracts/cdr/transaction.schema.json" assert { type: "json" };

import { validateSchema } from "../../../utils/schemaValidator.js";

test.describe("Open Banking Transaction Contract Tests", () => {

  test("Validate Transactions API Contract", async () => {

    const mockTransactionResponse = {
      data: {
        transactions: [
          {
            transactionId: "TXN001",
            accountId: "ACC001",
            amount: 250.75,
            currency: "AUD",
            description: "OSKO Payment",
            status: "POSTED"
          }
        ]
      }
    };

    console.log(
      "Validating transaction contract..."
    );

    validateSchema(
      transactionSchema,
      mockTransactionResponse
    );

    expect(
      mockTransactionResponse.data.transactions.length
    ).toBeGreaterThan(0);

    expect(
      mockTransactionResponse.data.transactions[0].currency
    ).toBe("AUD");

  });

});