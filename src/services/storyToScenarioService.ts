import type { UserStory, UserStoryAnalysisResult } from '../ai/userStoryAnalyzer.js';
import type { TestScenario } from '../ai/testScenarioGenerator.js';
import { UserStoryAnalyzer } from '../ai/userStoryAnalyzer.js';
import { TestScenarioGenerator } from '../ai/testScenarioGenerator.js';

export interface ScenarioCandidate {
  scenario: TestScenario;
  classification: 'ST' | 'SIT';
  rationale?: string;
}

export interface StoryToScenarioRequest {
  userStory: UserStory;
  targetEnvironment?: 'ST' | 'SIT';
}

export interface StoryToScenarioResult {
  analysis: UserStoryAnalysisResult;
  scenarios: ScenarioCandidate[];
}

export class StoryToScenarioService {
  private analyzer: UserStoryAnalyzer;
  private scenarioGenerator: TestScenarioGenerator;

  constructor(
    analyzer: UserStoryAnalyzer,
    scenarioGenerator: TestScenarioGenerator
  ) {
    this.analyzer = analyzer;
    this.scenarioGenerator = scenarioGenerator;
  }

  async createCandidateScenarios(
    request: StoryToScenarioRequest
  ): Promise<StoryToScenarioResult> {
    const analysis = await this.analyzer.analyze(request.userStory);
    const generatedScenarios = await this.scenarioGenerator.generateScenarios(
      request.userStory
    );

    const candidates: ScenarioCandidate[] = generatedScenarios.map(
      (scenario) => ({
        scenario,
        classification: request.targetEnvironment ?? 'ST',
      })
    );

    return {
      analysis,
      scenarios: candidates,
    };
  }

  async getSTCandidates(userStory: UserStory): Promise<ScenarioCandidate[]> {
    const scenarios = await this.scenarioGenerator.generateScenarios(userStory);
    return scenarios.map((scenario) => ({
      scenario,
      classification: 'ST',
    }));
  }

  async getSITCandidates(userStory: UserStory): Promise<ScenarioCandidate[]> {
    const scenarios = await this.scenarioGenerator.generateScenarios(userStory);
    return scenarios.map((scenario) => ({
      scenario,
      classification: 'SIT',
    }));
  }
}
