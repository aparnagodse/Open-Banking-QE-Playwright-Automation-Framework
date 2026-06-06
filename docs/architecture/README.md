# Architecture Documentation

Complete system architecture, component relationships, and design patterns for the enterprise Open Banking QE framework.

See `docs/architecture/target-architecture.md` for the approved target platform architecture and layered design.

## 📐 Architecture Overview

### Test Framework Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                   Test Execution Layer                      │
│  (Playwright, Lighthouse, axe-core, MySQL2)                 │
└────────┬────────────┬──────────┬──────────┬─────────────────┘
         │            │          │          │
    ┌────▼──┐    ┌───▼──┐   ┌──▼───┐   ┌─▼────┐
    │ UI    │    │ API  │   │ DB   │   │ Perf │
    │Tests  │    │Tests │   │Tests │   │Tests │
    └───────┘    └──────┘   └──────┘   └──────┘
         │            │          │          │
    ┌────▼──────────────────────▼──────────▼──┐
    │    Page Object Model (POM) Layer       │
    │  (BasePage + 8 Specialized Page Classes) │
    └───────────────────────────────────────────┘
         │              │           │
    ┌────▼──┐      ┌───▼──┐   ┌──▼────┐
    │ Utils │      │ Data │   │Config │
    │       │      │      │   │       │
    └───────┘      └──────┘   └───────┘
```

### AI-Enabled Architecture
```
┌─────────────────────────────────────────┐
│    AI/ML Processing Layer               │
│  (Prompt Engineering, LLM Integration)  │
└────────┬────────────────────────────────┘
         │
    ┌────┴──────────────────────────┐
    │                               │
┌───▼──────┐  ┌────────────┐  ┌────▼─────┐
│ Scenario │  │ Data Gen   │  │ Failure  │
│Generator │  │ Engines    │  │ Analysis │
└─────┬────┘  └─────┬──────┘  └────┬─────┘
      │             │              │
      └──────┬──────┴──────────────┘
             │
      ┌──────▼──────────┐
      │Test Generation  │
      │& Optimization   │
      └─────────────────┘
```

## 📁 Component Descriptions

### `src/ai/` - AI/ML Services
**Purpose:** AI-powered test generation and optimization  
**Components:**
- `scenarioGenerator.js` - Generate test scenarios from requirements
- `dataGenerator.js` - Create realistic test data
- `failureAnalyzer.js` - Analyze and suggest fixes for failures
- `coverageAnalyzer.js` - Identify test coverage gaps
- `promptManager.js` - Load and manage AI prompts

### `src/reporting/` - Enterprise Reporting
**Purpose:** Multi-format test result reporting  
**Components:**
- `allureReporter.js` - Allure dashboard integration
- `htmlReporter.js` - Custom HTML report generation
- `jiraIntegration.js` - JIRA test case/result sync
- `metricsCollector.js` - Performance & coverage metrics
- `reportValidator.js` - Quality checks on reports

### `src/integrations/` - Third-Party Integrations
**Purpose:** External system connections  
**Components:**
- `jiraConnector.js` - JIRA API integration
- `slackNotifier.js` - Slack notifications
- `gitHubActions.js` - GitHub Actions workflow hooks
- `apiGateway.js` - REST API management
- `databaseConnector.js` - Multi-database support

### `src/services/` - Business Logic Services
**Purpose:** Reusable business logic and utilities  
**Components:**
- `authService.js` - Authentication flows
- `complianceValidator.js` - CDR/regulatory validation
- `performanceAnalyzer.js` - SLA and performance tracking
- `securityValidator.js` - Security testing utilities
- `dataReconciliation.js` - Backend data validation

## 🔗 Integration Points

### GitHub Actions ↔ Test Execution
```
Push Event → GitHub Actions → Test Execution → Results Upload → Allure
```

### AI Engine ↔ Test Generation
```
Business Requirement → AI Prompt → Generated Tests → Execute → Analyze
```

### Test Results ↔ Reporting
```
Test Execution → Metrics Collection → Multiple Reporters → Dashboards
```

## 📊 Data Flow

### End-to-End Test Execution Flow
```
1. User/CI triggers test execution
2. Configuration loaded from config/environments/
3. Test suite selected based on filters
4. POM pages initialized with Playwright
5. Test steps executed with logging
6. Results captured (pass/fail/error)
7. Metrics and artifacts collected
8. Allure results generated
9. Reports published to dashboards
10. Notifications sent (Slack, JIRA, etc.)
```

### AI-Assisted Test Generation Flow
```
1. Business requirement provided
2. AI prompt loaded from docs/prompts/
3. LLM processes requirement
4. Scenarios generated
5. Test code scaffolded
6. Review by QA engineer
7. Tests integrated into suite
8. Baseline execution
9. Results validated
```

## 🏗️ Design Patterns

### Pattern 1: Page Object Model (POM)
**Location:** `pages/BasePage.js` + specialized page classes  
**Benefits:** Maintainability, reusability, reduced flakiness

### Pattern 2: Self-Healing Locators
**Location:** `utils/selfHealingLocator.js`  
**Benefits:** Resilience to UI changes, reduced false failures

### Pattern 3: Retry & Recovery
**Location:** `utils/helpers.js`  
**Benefits:** Handle flakiness gracefully, reduce noise

### Pattern 4: Schema Validation
**Location:** `utils/schemaValidator.js`  
**Benefits:** Contract-driven testing, early error detection

### Pattern 5: AI-Driven Analysis
**Location:** `src/ai/`  
**Benefits:** Intelligent failure diagnosis, coverage optimization

## 🔐 Security Architecture

### Authentication
- JWT token-based API authentication
- Secure credential storage in environment variables
- Test data isolation per environment

### Data Protection
- PII masking in logs and reports
- Encrypted database connections
- Secure secrets management (GitHub Secrets, etc.)

### Compliance
- WCAG 2A/2AA accessibility checks
- CDR/Open Banking regulatory validation
- OWASP security scanning

## 📈 Scalability Considerations

### Horizontal Scaling
- Parallel test execution across multiple agents
- Distributed Playwright instances
- Load balancing for API tests

### Vertical Scaling
- Optimized database queries
- Caching strategies for test data
- Efficient memory management

### Performance Optimization
- Test parallelization by domain
- Lighthouse performance auditing
- Metrics tracking and alerting

## 🔄 Deployment Architecture

### Local Development
```
Developer Machine → npm test → Local Browser
```

### CI/CD Pipeline
```
GitHub Push → Actions Workflow → Parallel Jobs → Allure Upload → Dashboard
```

### Production Validation
```
Release → Smoke Tests → Full Regression → Performance Tests → Approval
```

## 📦 Dependencies

### Core Testing
- Playwright 1.54.0
- @playwright/test

### Reporting & Analysis
- Allure 3.9.0
- allure-playwright

### API & Data Validation
- Swagger Parser 10.0.3
- AJV 8.20.0
- MySQL2 3.22.3

### Quality & Performance
- axe-core/playwright 4.11.3
- Lighthouse 13.3.0

### AI Integration (Planned)
- OpenAI API / Claude API
- LangChain (optional)

## 🚀 Future Architecture Enhancements

### Q3 2026
- MCP server implementation
- Advanced AI prompt engineering
- Real-time test analytics dashboard

### Q4 2026
- Distributed test execution
- Machine learning-based failure prediction
- Advanced performance profiling

## 🔗 Related Documentation

- Copilot Instructions: [`/.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
- Roadmap: [`./roadmap/README.md`](../roadmap/)
- Decisions: [`./decisions/README.md`](../decisions/)

---

**Last Updated:** June 2026  
**Architecture Version:** 1.0  
**Maintained By:** QE Framework Team
