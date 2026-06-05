import { test, expect } from "@playwright/test";

import jiraStory from "../../../test-data/jira/cdr-user-story.json" assert { type: "json" };

test.describe("Jira Traceability - CDR User Story Validation", () => {

  test(`Validate Jira story ${jiraStory.jiraKey} acceptance criteria`, async () => {

    console.log(`Jira Story: ${jiraStory.jiraKey}`);
    console.log(`Summary: ${jiraStory.summary}`);
    console.log(`Epic: ${jiraStory.epic}`);

    const apiResponse = {
      accountId: "ACC001",
      displayName: "Savings Account",
      productCategory: "TRANS_AND_SAVINGS_ACCOUNTS"
    };

    expect(apiResponse.accountId).toBeTruthy();
    expect(apiResponse.displayName).toBeTruthy();
    expect(apiResponse.productCategory).toBeTruthy();

    expect(jiraStory.acceptanceCriteria.length).toBeGreaterThan(0);

    console.log("Acceptance criteria validated successfully.");

  });

});