# GitHub Actions Workflows

CI/CD automation workflows for continuous testing, reporting, and deployment of the enterprise Open Banking QE framework.

## 📂 Workflow Files

This directory contains GitHub Actions workflows that automate:
- Test execution on code changes
- Scheduled test runs
- Report generation and publishing
- Compliance and security validation
- Deployment and release management

## 🚀 Workflow Categories

### Automated Test Execution

**On-Push Workflows (Triggered by code changes)**
- `test-regression.yml` - Full regression suite
- `test-smoke.yml` - Quick smoke tests
- `test-pr-validation.yml` - PR validation gates

**Scheduled Workflows (Nightly/Weekly)**
- `test-nightly-full.yml` - Comprehensive test run
- `test-accessibility.yml` - Weekly accessibility scans
- `test-performance.yml` - Weekly performance benchmarking
- `test-security.yml` - Weekly security validation

**Manual Trigger Workflows (Workflow Dispatch)**
- `test-on-demand.yml` - Manual test execution
- `report-generation.yml` - Generate reports on demand

### Reporting & Publishing

- `publish-allure-report.yml` - Publish Allure dashboard
- `publish-html-report.yml` - Publish HTML reports
- `notify-results.yml` - Slack/email notifications
- `sync-jira.yml` - JIRA result synchronization

### Environment Management

- `setup-environments.yml` - Provision test environments
- `validate-environments.yml` - Environment health checks
- `deploy-to-staging.yml` - Deploy to staging
- `deploy-to-production.yml` - Production deployment

## 📋 Workflow Template Structure

Each workflow follows this structure:

```yaml
name: [Workflow Name]

on:
  # Trigger conditions
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 8 * * 1'  # Monday 8am
  workflow_dispatch:

jobs:
  [job-name]:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install
      
      - name: Run tests
        run: npm run test:web
      
      - name: Generate reports
        if: always()
        run: npm run allure:generate
      
      - name: Publish results
        if: always()
        uses: [action-name]
```

## 🔧 Common Workflow Patterns

### Pattern 1: Test Execution with Reporting
```yaml
- Run tests
- Generate Allure results
- Upload to Allure server
- Create GitHub comment with results link
```

### Pattern 2: Multi-Job Parallel Execution
```yaml
jobs:
  regression:
    runs-on: ubuntu-latest
  api-tests:
    runs-on: ubuntu-latest
  accessibility:
    runs-on: ubuntu-latest
```

### Pattern 3: Conditional Steps
```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: npm run deploy:prod
```

### Pattern 4: Artifact Management
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: allure-results/
```

## 📊 Recommended Workflows

### 1. Quick Validation (On Pull Request)
**Trigger:** PR opened/updated  
**Duration:** 5-10 minutes  
**Tests:** Regression smoke tests only  
**Gate:** Blocks merge if failed

### 2. Full Regression (Scheduled Nightly)
**Trigger:** 2 AM UTC daily  
**Duration:** 30-45 minutes  
**Tests:** Complete regression suite  
**Report:** Allure dashboard + email summary

### 3. Accessibility Audit (Weekly)
**Trigger:** Monday 8 AM UTC  
**Duration:** 20-30 minutes  
**Tests:** Full WCAG 2A/2AA scan  
**Report:** Accessibility violations + trends

### 4. Performance Baseline (Weekly)
**Trigger:** Sunday 10 PM UTC  
**Duration:** 25-35 minutes  
**Tests:** API SLA + Page load times  
**Report:** Performance metrics + regressions

### 5. Security Scan (Weekly)
**Trigger:** Friday 5 PM UTC  
**Duration:** 15-25 minutes  
**Tests:** OWASP validation + dependency check  
**Report:** Security vulnerabilities + recommendations

## 🔐 Secrets & Environment Variables

### Required Secrets
- `ALLURE_SERVER_URL` - Allure report server
- `SLACK_WEBHOOK` - Slack notifications
- `JIRA_API_TOKEN` - JIRA integration
- `DB_PASSWORD` - Database credentials
- `API_KEY` - External API keys

### Recommended Environment Variables
```yaml
env:
  NODE_ENV: test
  LOG_LEVEL: info
  TEST_TIMEOUT: 30000
  RETRY_ATTEMPTS: 3
```

## ⚡ Performance Optimization

### Parallel Execution
```yaml
strategy:
  matrix:
    test-suite: [regression, api, data, accessibility, performance]
```

### Caching Dependencies
```yaml
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```

### Artifact Management
- Upload only on failure
- Clean up old artifacts after 30 days
- Use compression for large files

## 📈 Monitoring & Alerting

### Status Checks
- Add branch protection rules requiring workflow success
- Configure status checks on PRs
- Set up failure notifications

### Notifications
- Slack channels for test results
- Email for critical failures
- JIRA comments for linked issues

## 🔗 Integration Points

### With Allure Server
```yaml
- name: Publish to Allure
  uses: simple-elf/allure-report-action@master
  with:
    allure_results: allure-results
    allure_history: allure-history
```

### With JIRA
```yaml
- name: Comment on JIRA issues
  run: npm run sync:jira
```

### With Slack
```yaml
- name: Slack notification
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      text: "Tests ${{ job.status }}"
```

## 📋 Workflow Maintenance

### Regular Reviews
- Monthly: Verify all workflows still relevant
- Quarterly: Update action versions
- Yearly: Architectural review

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Workflow not triggering | Check trigger conditions, branch names |
| Slow execution | Enable parallelization, optimize setup |
| Artifact storage full | Implement cleanup policies |
| Secrets not accessible | Verify GitHub organization/repo settings |
| Flaky tests failing CI | Add retry logic, improve test resilience |

## 🚀 Getting Started

### Create Your First Workflow

1. Create `.github/workflows/my-workflow.yml`
2. Copy appropriate template above
3. Customize for your needs
4. Commit and push
5. Verify in Actions tab

### Test Locally

Use [`act`](https://github.com/nektos/act) to test workflows locally:
```bash
act push -j test-regression
```

## 📚 Resources

- GitHub Actions Docs: https://docs.github.com/en/actions
- Workflow Syntax: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- Actions Marketplace: https://github.com/marketplace?type=actions

---

**Last Updated:** June 2026  
**Maintained By:** QE Framework Team  
**Review Frequency:** Monthly
