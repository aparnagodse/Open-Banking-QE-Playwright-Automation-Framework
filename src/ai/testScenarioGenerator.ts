import type { UserStory } from './userStoryAnalyzer.js';

export interface TestStep {
  id: string;
  description: string;
  actionType: string;
  data?: Record<string, unknown>;
}

export interface TestScenario {
  id: string;
  title: string;
  description?: string;
  steps: TestStep[];
  tags?: string[];
}

export class TestScenarioGenerator {
  async generateScenarios(userStory: UserStory): Promise<TestScenario[]> {
    const baseTitle = userStory.title ?? 'Open Banking scenario';
    const scenarioSteps = (description: string, steps: string[]) =>
      steps.map((text, index) => ({
        id: `${description.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
        description: text,
        actionType: index === 0 ? 'Setup' : index === steps.length - 1 ? 'Verify' : 'Action',
      }));

    const stScenarios: TestScenario[] = [
      {
        id: 'st-001',
        title: `ST: Validate account contract for ${baseTitle}`,
        description: 'Verify that account response fields match the Open Banking contract and business rules.',
        steps: scenarioSteps('account-contract-validation', [
          'Prepare account API request payload according to user story requirements.',
          'Call the account API endpoint for the authorised user.',
          'Validate the response includes accountId, displayName, and productCategory.',
          'Confirm the response matches the allowed CDR contract schema.',
        ]),
        tags: ['ST', 'Contract', 'Account'],
      },
      {
        id: 'st-002',
        title: `ST: Validate consent lifecycle for ${baseTitle}`,
        description: 'Verify consent creation, authorisation, and activation flows in a functional test.',
        steps: scenarioSteps('consent-lifecycle-validation', [
          'Create consent with the required account access and scope.',
          'Authorise the consent through the simulated user consent flow.',
          'Activate the consent and verify status is Active.',
          'Revoke the consent and verify the status transitions to Revoked.',
        ]),
        tags: ['ST', 'Consent', 'Security'],
      },
    ];

    const sitScenarios: TestScenario[] = [
      {
        id: 'sit-001',
        title: `SIT: End-to-end account and transaction integration for ${baseTitle}`,
        description: 'Validate integrated account and transaction workflows across service boundaries.',
        steps: scenarioSteps('account-transaction-integration', [
          'Execute account retrieval with a valid consent token.',
          'Request related transaction history for the selected account.',
          'Verify transaction data is returned and linked to the correct account.',
          'Confirm integration results match expected Open Banking business rules.',
        ]),
        tags: ['SIT', 'Integration', 'Transaction'],
      },
      {
        id: 'sit-002',
        title: `SIT: Security and compliance validation for ${baseTitle}`,
        description: 'Validate OAuth, FAPI, and contract compliance in an integrated environment.',
        steps: scenarioSteps('security-compliance-validation', [
          'Generate an OAuth token with the required scopes for CDR access.',
          'Submit a protected API request and validate the response headers.',
          'Verify the response meets FAPI and CDR contract expectations.',
          'Confirm failed or expired tokens are rejected with the correct status.',
        ]),
        tags: ['SIT', 'Security', 'Compliance'],
      },
    ];

    return [...stScenarios, ...sitScenarios];
  }
}
