import type { ExecutionSummary } from './dailyExecutionReport.js';
import { readDailyExecutionSummary } from './dailyExecutionReport.js';

export class QualityMetricsService {
  private summary?: ExecutionSummary;

  constructor(summary?: ExecutionSummary) {
    this.summary = summary;
  }

  async getExecutionSummary(): Promise<ExecutionSummary> {
    if (this.summary) {
      return this.summary;
    }

    const persisted = await readDailyExecutionSummary();
    if (persisted) {
      return persisted;
    }

    return {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      passPercentage: 0,
      releaseConfidence: 'Red',
      generatedAt: new Date().toISOString(),
    };
  }

  async getPassRate(): Promise<number> {
    const summary = await this.getExecutionSummary();
    return summary.totalTests > 0 ? summary.passPercentage : 0;
  }

  async getFailureRate(): Promise<number> {
    const summary = await this.getExecutionSummary();
    if (summary.totalTests === 0) {
      return 0;
    }
    return Number(((summary.failed / summary.totalTests) * 100).toFixed(2));
  }

  async getReleaseConfidence(): Promise<'Green' | 'Amber' | 'Red'> {
    const summary = await this.getExecutionSummary();
    return summary.releaseConfidence;
  }
}
