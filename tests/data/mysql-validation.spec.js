import { test, expect } from "@playwright/test";
import mysql from "mysql2/promise";

test.describe("CDR MySQL Database Validation", () => {

  test("Validate account balance against MySQL database", async () => {

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "openbanking"
    });

    const [rows] = await connection.execute(
      "SELECT * FROM accounts WHERE account_id = ?",
      ["ACC001"]
    );

    const dbAccount = rows[0];

    console.log("Database Record:", dbAccount);

    const apiResponse = {
      accountId: "ACC001",
      currentBalance: 2500.75,
      availableBalance: 2400.75,
      currency: "AUD"
    };

    expect(apiResponse.accountId).toBe(dbAccount.account_id);
    expect(apiResponse.currentBalance).toBe(Number(dbAccount.current_balance));
    expect(apiResponse.availableBalance).toBe(Number(dbAccount.available_balance));
    expect(apiResponse.currency).toBe(dbAccount.currency);

    await connection.end();
  });

});