import { test, expect } from "@playwright/test";
import SwaggerParser from "swagger-parser";

test.describe("Open Banking CDR OpenAPI Validation", () => {
  test("Validate Swagger/OpenAPI specification", async () => {
    const api = await SwaggerParser.validate(
      "./contracts/cdr/openbanking-api.yaml"
    );

    console.log(`Validated API Contract: ${api.info.title}`);

    expect(api.info.title).toBe("Open Banking CDR API");
    expect(api.paths["/banking/accounts"]).toBeTruthy();
    expect(api.paths["/banking/transactions"]).toBeTruthy();
    expect(api.paths["/cdr/consent"]).toBeTruthy();
  });
});