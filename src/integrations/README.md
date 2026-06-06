# Third-Party Integrations

External system connectors and API clients for seamless integration with enterprise tools like JIRA, Slack, GitHub, and other services.

## 🔗 Purpose

This module enables integration with:
- **JIRA:** Test case management and result synchronization
- **Slack:** Real-time notifications and alerts
- **GitHub:** Actions workflow integration and issue management
- **External APIs:** Generic REST API client wrapper
- **Database Systems:** Multi-database connectivity

## 📂 Module Structure

```
src/integrations/
├── jiraConnector.js         # JIRA API integration
├── slackNotifier.js         # Slack notifications
├── gitHubActions.js         # GitHub Actions integration
├── apiGateway.js            # Generic REST API wrapper
├── databaseConnector.js     # Multi-database support
└── index.js                 # Module exports
```

## 🎯 Core Integrations

### 1. JIRA Connector

**Purpose:** Connect with JIRA for test management

```javascript
import { JiraConnector } from '../src/integrations/jiraConnector.js';

const jira = new JiraConnector({
  host: 'https://jira.example.com',
  username: process.env.JIRA_USER,
  apiToken: process.env.JIRA_TOKEN,
  project: 'PROJ'
});

// Create test case
await jira.createTestCase({
  summary: 'CDR user login validation',
  description: 'Verify users can login with valid credentials',
  steps: [
    { step: 1, data: 'Navigate to login', result: 'Login page displayed' },
    { step: 2, data: 'Enter email', result: 'Email entered' }
  ]
});

// Link test to story
await jira.linkTestToIssue('PROJ-123', 'TEST-456');

// Update with results
await jira.updateTestResults('TEST-456', {
  status: 'PASS',
  duration: 1234,
  executedBy: 'automation',
  timestamp: new Date()
});

// Get test cases
const tests = await jira.getTestCases({ project: 'PROJ', status: 'READY' });
```

**Features:**
- Test case CRUD operations
- Result updates
- Issue linking
- Custom field mapping
- Bulk operations

### 2. Slack Notifier

**Purpose:** Send real-time notifications to Slack

```javascript
import { SlackNotifier } from '../src/integrations/slackNotifier.js';

const notifier = new SlackNotifier({
  webhook: process.env.SLACK_WEBHOOK,
  channel: '#qa-notifications'
});

// Send test results
await notifier.sendTestResults({
  suite: 'Regression Tests',
  total: 100,
  passed: 95,
  failed: 5,
  duration: 1800
});

// Alert on failure
await notifier.sendAlert({
  level: 'critical',
  title: 'Test Failure',
  message: 'CDR API contract test failed',
  link: 'https://allure.example.com/report'
});

// Thread-based updates
await notifier.startThread('Test Execution: CDR-2026-06-05');
await notifier.updateThread({ status: 'Running', progress: '45/100' });
await notifier.closeThread({ status: 'Completed', passed: 100 });
```

**Features:**
- Rich message formatting
- Threaded conversations
- File uploads
- Interactive buttons
- Custom emoji reactions

### 3. GitHub Actions Integration

**Purpose:** Integrate with GitHub Actions workflows

```javascript
import { GitHubActionsIntegration } from '../src/integrations/gitHubActions.js';

const github = new GitHubActionsIntegration({
  token: process.env.GITHUB_TOKEN,
  repo: 'org/repo'
});

// Set job output
await github.setOutput('test-report-url', 'https://allure.example.com/report');

// Create workflow artifact
await github.uploadArtifact({
  name: 'test-results',
  path: './allure-results'
});

// Comment on PR
await github.commentOnPR({
  body: '✅ All tests passed! 100/100'
});

// Create issue
await github.createIssue({
  title: 'Test Failure: CDR API',
  body: 'See attached screenshot',
  labels: ['test-failure', 'critical']
});
```

**Features:**
- Workflow outputs
- Artifact management
- PR comments
- Issue creation
- Status checks

### 4. API Gateway

**Purpose:** Generic REST API client wrapper

```javascript
import { ApiGateway } from '../src/integrations/apiGateway.js';

const api = new ApiGateway({
  baseUrl: 'https://api.example.com',
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000,
  retries: 3
});

// GET request
const accounts = await api.get('/accounts');

// POST request
const newAccount = await api.post('/accounts', {
  accountType: 'CHECKING',
  currency: 'USD'
});

// PUT request
await api.put(`/accounts/${accountId}`, { status: 'active' });

// DELETE request
await api.delete(`/accounts/${accountId}`);

// Custom request
const custom = await api.request('PATCH', '/accounts/bulk', data, {
  headers: { 'X-Custom-Header': 'value' }
});
```

**Features:**
- Automatic retries
- Request/response logging
- Error handling
- Request interceptors
- Response transformation

### 5. Database Connector

**Purpose:** Connect to multiple database systems

```javascript
import { DatabaseConnector } from '../src/integrations/databaseConnector.js';

// MySQL connection
const mysql = await DatabaseConnector.create('mysql', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const accounts = await mysql.query(
  'SELECT * FROM accounts WHERE id = ?',
  [accountId]
);

// PostgreSQL connection
const postgres = await DatabaseConnector.create('postgres', {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

// Execute transaction
const transaction = await postgres.beginTransaction();
try {
  await transaction.execute('UPDATE accounts SET balance = balance - ?', [1000]);
  await transaction.execute('UPDATE accounts SET balance = balance + ?', [1000]);
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
}
```

**Features:**
- Multi-database support
- Connection pooling
- Transaction management
- Query builders
- Prepared statements

## 🔧 Configuration

### Environment Variables

```bash
# JIRA Configuration
JIRA_HOST=https://jira.example.com
JIRA_USERNAME=automation-user
JIRA_API_TOKEN=xxxx
JIRA_PROJECT=PROJ

# Slack Configuration
SLACK_WEBHOOK=https://hooks.slack.com/services/xxxx
SLACK_CHANNEL=#qa-notifications
SLACK_NOTIFICATIONS_ENABLED=true

# GitHub Configuration
GITHUB_TOKEN=ghp_xxxx
GITHUB_REPO=org/repo
GITHUB_COMMENTS_ENABLED=true

# API Gateway Configuration
API_BASE_URL=https://api.example.com
API_TOKEN=xxxx
API_TIMEOUT=30000
API_RETRIES=3

# Database Configuration
DB_HOST=localhost
DB_USER=automation
DB_PASSWORD=xxxx
DB_NAME=test_db
DB_POOL_SIZE=10
```

## 💡 Usage Patterns

### Pattern 1: Notification Pipeline

```javascript
// Send notifications to multiple channels
async function notifyResults(results) {
  await Promise.all([
    notifier.sendSlack(results),
    jira.updateResults(results),
    github.updatePRComment(results)
  ]);
}
```

### Pattern 2: Data Validation

```javascript
// Validate data across systems
async function validateDataConsistency() {
  const apiData = await api.get('/accounts');
  const dbData = await database.query('SELECT * FROM accounts');
  
  const matches = compareData(apiData, dbData);
  if (!matches) {
    await notifier.sendAlert('Data inconsistency detected');
  }
}
```

### Pattern 3: Workflow Orchestration

```javascript
// Orchestrate across multiple systems
async function executeTestAndReportFlow() {
  // Run test
  const results = await runTests();
  
  // Update JIRA
  await jira.updateTestResults(results);
  
  // Notify team
  await notifier.sendSlack(results);
  
  // Create GitHub issue if failed
  if (results.failed > 0) {
    await github.createIssue({
      title: `Test Failure: ${results.failedTests[0]}`,
      body: results.summary
    });
  }
}
```

## 🔐 Security & Compliance

### Credential Management

```javascript
// ✅ Use environment variables
const jira = new JiraConnector({
  apiToken: process.env.JIRA_TOKEN  // From env
});

// ❌ Never hardcode
const jira = new JiraConnector({
  apiToken: 'xxxx-hardcoded-xxxx'   // DANGEROUS!
});
```

### Request Signing

```javascript
// Sign requests for enhanced security
const api = new ApiGateway({
  signRequests: true,
  signingKey: process.env.API_SIGNING_KEY
});
```

### Audit Logging

```javascript
import logger from './utils/logger.js';

logger.info('JIRA issue created', {
  issueKey: 'PROJ-123',
  user: 'automation',
  timestamp: new Date()
});
```

## 📈 Error Handling

```javascript
try {
  await jira.updateTestResults(testId, results);
} catch (error) {
  if (error.code === 'JIRA_AUTH_ERROR') {
    logger.error('JIRA authentication failed');
    // Notify admin
  } else if (error.code === 'JIRA_RATE_LIMIT') {
    logger.warn('JIRA rate limit exceeded, retrying...');
    // Implement exponential backoff
  } else {
    logger.error('JIRA operation failed', { error });
    // Fallback behavior
  }
}
```

## 🧪 Testing Integrations

```javascript
describe('JiraConnector', () => {
  let jira;

  beforeEach(() => {
    jira = new JiraConnector(mockConfig);
  });

  test('should create test case', async () => {
    const result = await jira.createTestCase(testCaseData);
    expect(result).toHaveProperty('key');
  });

  test('should handle JIRA errors gracefully', async () => {
    jira.setMockError(new JiraError('Invalid project'));
    
    await expect(jira.createTestCase(data))
      .rejects
      .toThrow('Invalid project');
  });
});
```

## 📚 Resources

- Architecture: [`/docs/architecture/README.md`](../../docs/architecture/)
- Services: [`/src/services/README.md`](../services/)
- Copilot Instructions: [`/.github/copilot-instructions.md`](../../.github/copilot-instructions.md)

---

**Last Updated:** June 2026  
**Status:** Template Ready for Implementation  
**Maintained By:** QE Framework Team
