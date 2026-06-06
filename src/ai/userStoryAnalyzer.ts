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
    return {
      summary: '',
      riskAreas: [],
      complianceAreas: [],
      suggestedTests: [],
    };
  }

  async summarize(userStory: UserStory): Promise<string> {
    return '';
  }
}
