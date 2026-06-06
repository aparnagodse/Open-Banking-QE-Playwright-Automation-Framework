# Reporting & Analytics Services

Enterprise-grade reporting engines for multi-format test result publishing, metrics collection, and real-time analytics in the Open Banking QE framework.

## 📊 Purpose

This module provides comprehensive reporting capabilities:
- **Allure Reporting:** Enterprise dashboard with trends and history
- **HTML Reports:** Self-contained portable reports
- **JIRA Integration:** Sync results with test case management
- **Metrics Collection:** Performance and coverage tracking
- **Real-time Analytics:** Live test execution dashboards

## 📂 Module Structure

```
src/reporting/
├── allureReporter.js        # Allure dashboard integration
├── htmlReporter.js          # HTML report generation
├── jiraIntegration.js       # JIRA API integration
├── metricsCollector.js      # Performance & coverage metrics
├── reportValidator.js       # Quality checks on reports
├── dashboardGenerator.js    # Real-time dashboard
└── index.js                 # Module exports
```

## 🎯 Core Services

### 1. Allure Reporter

**Purpose:** Generate and publish Allure enterprise reports

```javascript
import { AllureReporter } from '../src/reporting/allureReporter.js';

const reporter = new AllureReporter({
  resultsDir: './allure-results',
  serverUrl: 'https://allure.example.com'
});

// Generate report
await reporter.generate();

// Publish to server
await reporter.publish();

// Get report URL
const reportUrl = reporter.getReportUrl();
```

**Features:**
- Automatic test result collection
- Historical trend tracking
- Rich attachment support (screenshots, videos)
- Custom categorization
- Failure analysis links

### 2. HTML Reporter

**Purpose:** Generate portable HTML reports

```javascript
import { HtmlReporter } from '../src/reporting/htmlReporter.js';

const reporter = new HtmlReporter({
  outputDir: './test-reports',
  title: 'CDR API Test Results'
});

// Generate report
await reporter.generate(testResults);

// Get report path
const reportPath = reporter.getReportPath();
```

**Features:**
- Self-contained single HTML file
- Searchable test results
- Screenshots and logs
- Summary statistics
- No external dependencies

### 3. JIRA Integration

**Purpose:** Sync test results with JIRA

```javascript
import { JiraIntegration } from '../src/reporting/jiraIntegration.js';

const jira = new JiraIntegration({
  host: 'https://jira.example.com',
  username: process.env.JIRA_USER,
  apiToken: process.env.JIRA_TOKEN
});

// Link test results to issue
await jira.updateTestResults('PROJ-123', testResults);

// Create test case
await jira.createTestCase({
  name: 'User login test',
  steps: ['Navigate to login', 'Enter credentials'],
  project: 'PROJ'
});

// Get linked tests
const tests = await jira.getLinkedTests('PROJ-456');
```

**Features:**
- Test case creation/update
- Result synchronization
- Automation linking
- Test execution reporting
- Issue linking

### 4. Metrics Collector

**Purpose:** Collect and analyze performance metrics

```javascript
import { MetricsCollector } from '../src/reporting/metricsCollector.js';

const collector = new MetricsCollector();

// Record metrics
collector.recordMetric('test_duration', 1234, { test: 'login' });
collector.recordMetric('api_response_time', 567, { endpoint: '/accounts' });
collector.recordMetric('coverage_percentage', 85.5);

// Retrieve analytics
const metrics = await collector.getMetrics({
  startDate: '2026-06-01',
  endDate: '2026-06-30',
  groupBy: 'daily'
});
```

**Features:**
- Real-time metric collection
- Historical data storage
- Trend analysis
- Alerts for SLA violations
- Custom dashboards

### 5. Report Validator

**Purpose:** Quality checks on generated reports

```javascript
import { ReportValidator } from '../src/reporting/reportValidator.js';

const validator = new ReportValidator();

// Validate report
const isValid = await validator.validate(reportPath);

if (!isValid) {
  const errors = validator.getErrors();
  console.error('Report validation failed:', errors);
}

// Get validation score
const score = validator.getValidationScore();
```

**Features:**
- Completeness checks
- Format validation
- Required data verification
- Performance analysis
- Compliance checks

## 🔧 Configuration

### Environment Variables

```bash
# Allure Configuration
ALLURE_RESULTS_DIR=./allure-results
ALLURE_SERVER_URL=https://allure.example.com
ALLURE_PROJECT_ID=open-banking-qe

# JIRA Configuration
JIRA_HOST=https://jira.example.com
JIRA_USERNAME=automation-user
JIRA_API_TOKEN=xxxx
JIRA_PROJECT=PROJ
JIRA_TEST_COMPONENT=QE

# Report Configuration
REPORT_OUTPUT_DIR=./test-reports
REPORT_TITLE=Open Banking QE Reports
REPORT_RETENTION_DAYS=90

# Metrics Configuration
METRICS_BACKEND=influxdb     # or prometheus, datadog, etc.
METRICS_HOST=localhost
METRICS_PORT=8086
METRICS_DATABASE=metrics
```

## 💡 Usage Patterns

### Pattern 1: Complete Reporting Pipeline

```javascript
import { AllureReporter } from '../src/reporting/allureReporter.js';
import { HtmlReporter } from '../src/reporting/htmlReporter.js';
import { JiraIntegration } from '../src/reporting/jiraIntegration.js';

test.afterEach(async ({ page }, testInfo) => {
  // Collect test results
  const result = {
    name: testInfo.title,
    status: testInfo.status,
    duration: testInfo.duration,
    error: testInfo.errors[0]
  };

  // Publish to all systems
  await Promise.all([
    allureReporter.addTestResult(result),
    htmlReporter.addTestResult(result),
    jira.updateTestResults(getIssueId(testInfo.title), result)
  ]);
});
```

### Pattern 2: SLA Monitoring

```javascript
test.afterEach(async ({}, testInfo) => {
  const duration = testInfo.duration;
  
  // Record metric
  metricsCollector.recordMetric('test_duration', duration, {
    test: testInfo.title,
    suite: testInfo.project.name
  });

  // Check SLA
  if (duration > SLA_THRESHOLD) {
    await notifier.sendAlert({
      level: 'warning',
      message: `Test ${testInfo.title} exceeded SLA (${duration}ms)`,
      channel: '#qa-alerts'
    });
  }
});
```

### Pattern 3: Test Coverage Tracking

```javascript
async function generateCoverageReport() {
  const collector = new MetricsCollector();
  
  // Collect coverage data
  const coverage = {
    lines: 85.5,
    functions: 82.3,
    branches: 78.9,
    statements: 84.2
  };

  // Record metrics
  Object.entries(coverage).forEach(([type, percentage]) => {
    collector.recordMetric(`coverage_${type}`, percentage);
  });

  // Generate trends
  const trends = await collector.getTrends('coverage_lines', 30); // Last 30 days
  console.log('Coverage improvement:', trends.change);
}
```

## 📊 Report Types

### Allure Report
- **Format:** Web dashboard
- **Best For:** Team collaboration, trend analysis
- **Includes:** Trends, history, attachment gallery
- **Refresh:** Real-time

### HTML Report
- **Format:** Single HTML file
- **Best For:** Email distribution, archiving
- **Includes:** Test results, logs, screenshots
- **Size:** Varies (1MB-100MB+)

### JIRA Integration
- **Format:** Native JIRA data
- **Best For:** Test management, issue linking
- **Includes:** Test case status, automation links
- **Real-time:** Yes

### Metrics Dashboard
- **Format:** Time-series data
- **Best For:** Performance tracking
- **Includes:** Response times, coverage, flakiness
- **Storage:** Database/time-series store

## 🔐 Security & Compliance

### PII Masking

```javascript
function maskSensitiveData(data) {
  return data.replace(
    /\d{3}-\d{2}-\d{4}/g,      // SSN pattern
    'XXX-XX-XXXX'
  ).replace(
    /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,  // Credit card pattern
    'XXXX-XXXX-XXXX-XXXX'
  );
}
```

### Credential Security

```javascript
// ❌ Never include credentials
const report = {
  dbPassword: 'secret123'  // DANGEROUS!
};

// ✅ Safe report
const report = {
  dbConnected: true,
  dbStatus: 'healthy'
};
```

### Access Control

```javascript
// Configure JIRA credentials securely
const jira = new JiraIntegration({
  host: process.env.JIRA_HOST,      // From env vars
  username: process.env.JIRA_USER,
  apiToken: process.env.JIRA_TOKEN,
  https: true
});
```

## 📈 Performance Considerations

### Report Generation Optimization

```javascript
// ❌ Slow: Generate full report for every test
test.afterEach(async () => {
  await allureReporter.generateFullReport();  // Expensive!
});

// ✅ Fast: Collect results, generate once
test.afterEach(async () => {
  await allureReporter.addResult(result);    // Cheap!
});

// ✅ Generate periodically
schedule.scheduleJob('0 * * * *', async () => {  // Hourly
  await allureReporter.generateFullReport();
});
```

### Database Optimization

```javascript
// Use batch operations for metrics
const batchInsert = metricsCollector.batch();
results.forEach(r => {
  batchInsert.add('test_duration', r.duration);
  batchInsert.add('test_status', r.status === 'passed' ? 1 : 0);
});
await batchInsert.commit();
```

## 🧪 Testing Reports

```javascript
import { HtmlReporter } from '../src/reporting/htmlReporter.js';

describe('HtmlReporter', () => {
  let reporter;

  beforeEach(() => {
    reporter = new HtmlReporter({ outputDir: './test-output' });
  });

  test('should generate valid HTML', async () => {
    const results = [{
      name: 'test1',
      status: 'passed',
      duration: 100
    }];

    await reporter.generate(results);
    expect(fs.existsSync(reporter.getReportPath())).toBe(true);
  });
});
```

## 📚 Resources

- Architecture: [`/docs/architecture/README.md`](../../docs/architecture/)
- Copilot Instructions: [`/.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
- Allure Docs: https://docs.qameta.io/allure/

## 🔗 API Reference

### AllureReporter

```javascript
class AllureReporter {
  async addTestResult(result: TestResult): Promise<void>
  async generate(): Promise<void>
  async publish(): Promise<void>
  getReportUrl(): string
}
```

### MetricsCollector

```javascript
class MetricsCollector {
  recordMetric(name: string, value: number, tags?: object): void
  async getMetrics(filters: object): Promise<Metric[]>
  async getTrends(metric: string, days: number): Promise<Trend>
  batch(): Batch
}
```

---

**Last Updated:** June 2026  
**Status:** Template Ready for Implementation  
**Maintained By:** QE Framework Team
