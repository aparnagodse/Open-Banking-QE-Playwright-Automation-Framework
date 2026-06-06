import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export interface ExecutionSummary {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  passPercentage: number;
  releaseConfidence: 'Green' | 'Amber' | 'Red';
  sourceFile?: string;
  generatedAt: string;
}

const OUTPUT_DIR = path.join(process.cwd(), 'reports');
const JSON_OUTPUT_PATH = path.join(OUTPUT_DIR, 'daily-execution-summary.json');
const MD_OUTPUT_PATH = path.join(OUTPUT_DIR, 'daily-execution-summary.md');

const candidateJsonFiles = [
  path.join(process.cwd(), 'playwright-report', 'report.json'),
  path.join(process.cwd(), 'playwright-report', 'results.json'),
  path.join(process.cwd(), 'test-results', 'report.json'),
  path.join(process.cwd(), 'test-results', 'results.json'),
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function calculateReleaseConfidence(passPercentage: number): 'Green' | 'Amber' | 'Red' {
  if (passPercentage >= 95) {
    return 'Green';
  }

  if (passPercentage >= 85) {
    return 'Amber';
  }

  return 'Red';
}

function countTestsFromObject(data: any): { total: number; passed: number; failed: number; skipped: number } {
  if (!data || typeof data !== 'object') {
    return { total: 0, passed: 0, failed: 0, skipped: 0 };
  }

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  function traverseSuites(suite: any): void {
    if (!suite || typeof suite !== 'object') return;

    // Process nested suites recursively
    if (Array.isArray(suite.suites)) {
      for (const nestedSuite of suite.suites) {
        traverseSuites(nestedSuite);
      }
    }

    // Process specs in this suite
    if (Array.isArray(suite.specs)) {
      for (const spec of suite.specs) {
        if (spec && typeof spec === 'object' && Array.isArray(spec.tests)) {
          for (const test of spec.tests) {
            if (test && typeof test === 'object' && Array.isArray(test.results)) {
              for (const result of test.results) {
                if (result && typeof result === 'object') {
                  total += 1;
                  const status = String(result.status ?? '').toLowerCase();
                  if (status === 'passed') {
                    passed += 1;
                  } else if (status === 'failed' || status === 'timedout' || status === 'interrupted') {
                    failed += 1;
                  } else if (status === 'skipped') {
                    skipped += 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Start traversal from root suites
  if (Array.isArray(data.suites)) {
    for (const suite of data.suites) {
      traverseSuites(suite);
    }
  }

  return { total, passed, failed, skipped };
}

async function discoverPlaywrightJson(): Promise<string | null> {
  for (const candidate of candidateJsonFiles) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  const reportDir = path.join(process.cwd(), 'playwright-report');

  try {
    const files = await fs.readdir(reportDir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.json')) {
        const fullPath = path.join(reportDir, file);
        if (await fileExists(fullPath)) {
          return fullPath;
        }
      }
    }
  } catch {
    // ignore missing directory
  }

  return null;
}

export async function generateDailyExecutionReport(): Promise<ExecutionSummary> {
  const sourceFile = await discoverPlaywrightJson();
  let counts = { total: 0, passed: 0, failed: 0, skipped: 0 };

  if (sourceFile) {
    const raw = await fs.readFile(sourceFile, 'utf-8');
    const json = JSON.parse(raw);
    counts = countTestsFromObject(json);
  }

  const passPercentage = counts.total > 0 ? (counts.passed / counts.total) * 100 : 0;
  const releaseConfidence = calculateReleaseConfidence(passPercentage);
  const summary: ExecutionSummary = {
    totalTests: counts.total,
    passed: counts.passed,
    failed: counts.failed,
    skipped: counts.skipped,
    passPercentage: Number(passPercentage.toFixed(2)),
    releaseConfidence,
    sourceFile: sourceFile ?? undefined,
    generatedAt: new Date().toISOString(),
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(JSON_OUTPUT_PATH, JSON.stringify(summary, null, 2), 'utf-8');

  const markdownLines = [
    '# Daily Execution Summary',
    '',
    `**Generated At:** ${summary.generatedAt}`,
    `**Source File:** ${summary.sourceFile ?? 'Not found'}`,
    '',
    '## Test Summary',
    '',
    `- Total tests: ${summary.totalTests}`,
    `- Passed: ${summary.passed}`,
    `- Failed: ${summary.failed}`,
    `- Skipped: ${summary.skipped}`,
    `- Pass percentage: ${summary.passPercentage}%`,
    `- Release confidence: ${summary.releaseConfidence}`,
    '',
    '## Notes',
    '',
    'This summary is generated from available Playwright JSON results. If no results were found, counts default to zero.',
  ];

  await fs.writeFile(MD_OUTPUT_PATH, markdownLines.join('\n'), 'utf-8');

  return summary;
}

async function main(): Promise<void> {
  const summary = await generateDailyExecutionReport();
  console.log('Daily execution report generated successfully.');
  console.log(`JSON output: ${JSON_OUTPUT_PATH}`);
  console.log(`Markdown output: ${MD_OUTPUT_PATH}`);
  console.log(`Total tests: ${summary.totalTests}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Skipped: ${summary.skipped}`);
  console.log(`Release confidence: ${summary.releaseConfidence}`);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch((error) => {
    console.error('Failed to generate daily execution report:', error);
    process.exit(1);
  });
}

export async function readDailyExecutionSummary(): Promise<ExecutionSummary | null> {
  if (!(await fileExists(JSON_OUTPUT_PATH))) {
    return null;
  }

  const raw = await fs.readFile(JSON_OUTPUT_PATH, 'utf-8');
  return JSON.parse(raw) as ExecutionSummary;
}
