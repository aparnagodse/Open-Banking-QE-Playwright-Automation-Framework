export interface UserStory {
  id: string;
  title: string;
  description?: string;
  acceptanceCriteria: string[];
  tags?: string[];
  rawText?: string;
}

export interface UserStoryAnalysisResult {
  summary: string;
  riskAreas: string[];
  complianceAreas: string[];
  suggestedTests: string[];
}

export class UserStoryAnalyzer {
  async analyze(userStory: UserStory): Promise<UserStoryAnalysisResult> {
    const title = userStory.title || 'Open Banking user story';
    const description = userStory.description ? ` ${userStory.description}` : '';

    const riskAreas = new Set<string>([
      'Open Banking / CDR compliance',
      'Consent lifecycle management',
      'Account data exposure',
      'Transaction data accuracy',
      'API contract drift',
      'Security of authentication flows',
    ]);

    const criteria = userStory.acceptanceCriteria.join(' ').toLowerCase();
    if (criteria.includes('consent')) {
      riskAreas.add('Consent authorization and revocation');
    }
    if (criteria.includes('account')) {
      riskAreas.add('Account selection and masking');
    }
    if (criteria.includes('transaction')) {
      riskAreas.add('Transaction integrity and status reporting');
    }
    if (criteria.includes('security') || criteria.includes('token')) {
      riskAreas.add('OAuth and token validation');
    }

    const complianceAreas = [
      'CDR contract compliance',
      'OAuth token and scope validation',
      'FAPI security requirements',
      'Privacy and data minimisation',
      'Accessibility for regulatory reporting',
    ];

    const suggestedTests = [
      'ST: Validate critical account and consent workflows',
      'SIT: Validate end-to-end API contract and downstream integration',
      'API: Validate CDR response schema and status codes',
      'Contract: Validate payload against Open Banking JSON schema',
      'Accessibility: Validate transparency and consent UI elements',
      'Security: Validate token scope, expiry, and header protections',
    ];

    return {
      summary: `${title} analysis summary.${description}`.trim(),
      riskAreas: Array.from(riskAreas),
      complianceAreas,
      suggestedTests,
    };
  }

  async summarize(userStory: UserStory): Promise<string> {
    const analysis = await this.analyze(userStory);
    return analysis.summary;
  }
}
