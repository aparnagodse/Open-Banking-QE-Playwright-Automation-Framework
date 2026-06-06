import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import type { UserStory } from '../ai/userStoryAnalyzer.js';
import { UserStoryAnalyzer } from '../ai/userStoryAnalyzer.js';
import { TestScenarioGenerator } from '../ai/testScenarioGenerator.js';
import { StoryToScenarioService } from './storyToScenarioService.js';

const USER_STORY_PATH = path.join(
  process.cwd(),
  'test-data',
  'jira',
  'cdr-user-story.json'
);
const OUTPUT_DIR = path.join(process.cwd(), 'reports');
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, 'story-scenarios.json');
const MD_OUTPUT_PATH = path.join(OUTPUT_DIR, 'story-scenarios.md');

export interface StoryScenarioReport {
  userStory: UserStory;
  analysis: {
    summary: string;
    riskAreas: string[];
    complianceAreas: string[];
    suggestedTests: string[];
  };
  stCandidates: Array<{
    scenarioId: string;
    title: string;
    description?: string;
    steps: Array<{ id: string; description: string; actionType: string; data?: Record<string, unknown> }>;
    tags?: string[];
  }>;
  sitCandidates: Array<{
    scenarioId: string;
    title: string;
    description?: string;
    steps: Array<{ id: string; description: string; actionType: string; data?: Record<string, unknown> }>;
    tags?: string[];
  }>;
  generatedAt: string;
}

async function readUserStory(): Promise<UserStory> {
  const raw = await fs.readFile(USER_STORY_PATH, 'utf-8');
  return JSON.parse(raw) as UserStory;
}

function serializeScenario(scenario: any) {
  return {
    scenarioId: scenario.id,
    title: scenario.title,
    description: scenario.description,
    steps: Array.isArray(scenario.steps)
      ? scenario.steps.map((step: any) => ({
          id: step.id,
          description: step.description,
          actionType: step.actionType,
          data: step.data,
        }))
      : [],
    tags: scenario.tags,
  };
}

function renderMarkdown(report: StoryScenarioReport): string {
  const lines: string[] = [];
  lines.push('# Story Scenario Demo Report');
  lines.push('');
  lines.push(`**Generated At:** ${report.generatedAt}`);
  lines.push('');
  lines.push('## User Story Summary');
  lines.push('');
  lines.push(`- Jira key: ${report.userStory.jiraKey ?? 'N/A'}`);
  lines.push(`- Summary: ${report.userStory.summary}`);
  lines.push(`- Epic: ${report.userStory.epic ?? 'N/A'}`);
  lines.push('');
  lines.push('### Acceptance Criteria');
  lines.push('');
  report.userStory.acceptanceCriteria.forEach((criterion) => {
    lines.push(`- ${criterion}`);
  });
  lines.push('');
  lines.push('## Analysis');
  lines.push('');
  lines.push(`**Summary:** ${report.analysis.summary}`);
  lines.push('');
  lines.push('### Risks');
  lines.push('');
  if (report.analysis.riskAreas.length > 0) {
    report.analysis.riskAreas.forEach((risk) => lines.push(`- ${risk}`));
  } else {
    lines.push('- No risk areas returned');
  }
  lines.push('');
  lines.push('### Compliance Areas');
  lines.push('');
  if (report.analysis.complianceAreas.length > 0) {
    report.analysis.complianceAreas.forEach((area) => lines.push(`- ${area}`));
  } else {
    lines.push('- No compliance areas returned');
  }
  lines.push('');
  lines.push('### Suggested Tests');
  lines.push('');
  if (report.analysis.suggestedTests.length > 0) {
    report.analysis.suggestedTests.forEach((item) => lines.push(`- ${item}`));
  } else {
    lines.push('- No suggested tests returned');
  }
  lines.push('');
  function renderCandidates(title: string, candidates: typeof report.stCandidates) {
    lines.push(`## ${title}`);
    lines.push('');
    if (candidates.length === 0) {
      lines.push('- No scenarios generated');
      lines.push('');
      return;
    }
    candidates.forEach((candidate, index) => {
      lines.push(`### ${index + 1}. ${candidate.title}`);
      lines.push('');
      if (candidate.description) {
        lines.push(candidate.description);
        lines.push('');
      }
      lines.push(`- Scenario ID: ${candidate.scenarioId}`);
      if (candidate.tags?.length) {
        lines.push(`- Tags: ${candidate.tags.join(', ')}`);
      }
      lines.push('');
      lines.push('#### Steps');
      lines.push('');
      candidate.steps.forEach((step) => {
        lines.push(`- [${step.actionType}] ${step.description}`);
      });
      lines.push('');
    });
  }
  renderCandidates('ST Candidate Scenarios', report.stCandidates);
  renderCandidates('SIT Candidate Scenarios', report.sitCandidates);
  return lines.join('\n');
}

export async function generateStoryScenarioDemo(): Promise<StoryScenarioReport> {
  const userStory = await readUserStory();
  const analyzer = new UserStoryAnalyzer();
  const generator = new TestScenarioGenerator();
  const service = new StoryToScenarioService(analyzer, generator);

  const analysis = await analyzer.analyze(userStory);
  const generatedScenarios = await generator.generateScenarios(userStory);
  const stCandidates = await service.getSTCandidates(userStory);
  const sitCandidates = await service.getSITCandidates(userStory);

  const report: StoryScenarioReport = {
    userStory,
    analysis: {
      summary: analysis.summary,
      riskAreas: analysis.riskAreas,
      complianceAreas: analysis.complianceAreas,
      suggestedTests: analysis.suggestedTests,
    },
    stCandidates: stCandidates.map((candidate) => serializeScenario(candidate.scenario)),
    sitCandidates: sitCandidates.map((candidate) => serializeScenario(candidate.scenario)),
    generatedAt: new Date().toISOString(),
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify(report, null, 2), 'utf-8');
  await fs.writeFile(MD_OUTPUT_PATH, renderMarkdown(report), 'utf-8');

  return report;
}

async function main(): Promise<void> {
  const report = await generateStoryScenarioDemo();
  console.log('Story scenario demo generated successfully.');
  console.log(`JSON output: ${JSON_OUTPUT_PATH}`);
  console.log(`Markdown output: ${MD_OUTPUT_PATH}`);
  console.log(`ST scenarios: ${report.stCandidates.length}`);
  console.log(`SIT scenarios: ${report.sitCandidates.length}`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch((error) => {
    console.error('Failed to generate story scenario demo:', error);
    process.exit(1);
  });
}
