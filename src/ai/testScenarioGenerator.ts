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
    return [];
  }
}
