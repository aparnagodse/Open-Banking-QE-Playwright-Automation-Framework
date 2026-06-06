import { generateStoryScenarioDemo } from './storyScenarioDemo.js';
import { generateDailyExecutionReport } from '../reporting/dailyExecutionReport.js';

export interface QEDailyOrchestrationResult {
  status: 'success' | 'partial' | 'failure';
  message: string;
  generatedAt: string;
  scenarioReportPath: string;
  executionReportPath: string;
}

export class QEDailyOrchestrator {
  describeExecutionSequence(): string {
    return [
      '1. Generate scenario artifacts from the Open Banking user story',
      '2. Execute daily test suites (ST, SIT, Contract, Accessibility)',
      '3. Generate daily execution report from Playwright JSON results',
      '4. Persist scenario and execution summaries for review',
    ].join('\n');
  }

  async generateScenarios(): Promise<void> {
    await generateStoryScenarioDemo();
  }

  async generateReport(): Promise<void> {
    await generateDailyExecutionReport();
  }

  async orchestrateDailyRun(): Promise<QEDailyOrchestrationResult> {
    const generatedAt = new Date().toISOString();

    await this.generateScenarios();
    await this.generateReport();

    return {
      status: 'success',
      message: 'Daily QE orchestration completed successfully.',
      generatedAt,
      scenarioReportPath: 'reports/story-scenarios.json',
      executionReportPath: 'reports/daily-execution-summary.json',
    };
  }
}
