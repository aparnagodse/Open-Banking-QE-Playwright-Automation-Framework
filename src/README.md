# Source Code & Services

Core application logic, AI services, reporting engines, and integration modules for the enterprise Open Banking QE framework.

## 📂 Directory Structure

```
src/
├── ai/                    # AI/ML services and intelligent features
├── reporting/             # Multi-format reporting engines
├── integrations/          # Third-party system connectors
└── services/              # Business logic and utilities
```

## 🎯 Purpose

The `src/` directory contains production-ready source code that powers:
- **AI-Driven Features:** Automated test generation, failure analysis, coverage optimization
- **Enterprise Reporting:** Allure, HTML, JIRA integration
- **External Integrations:** Slack, GitHub, JIRA APIs
- **Business Logic:** Authentication, compliance validation, data reconciliation

## 📊 Module Overview

| Module | Purpose | Key Files |
|--------|---------|-----------|
| **ai/** | AI/ML services | scenarioGenerator.js, dataGenerator.js, failureAnalyzer.js |
| **reporting/** | Report generation | allureReporter.js, htmlReporter.js, metricsCollector.js |
| **integrations/** | External APIs | jiraConnector.js, slackNotifier.js, gitHubActions.js |
| **services/** | Business logic | authService.js, complianceValidator.js, performanceAnalyzer.js |

## 🏗️ Architecture Principles

### 1. Modularity
- Each service is self-contained
- Clear interfaces and dependencies
- Minimal coupling between modules

### 2. Testability
- All services have unit tests
- Dependency injection pattern
- Mock-friendly design

### 3. Scalability
- Async/await for I/O operations
- Batch processing support
- Caching strategies

### 4. Security
- No credentials in code
- Environment variable injection
- Input validation on all APIs

### 5. Observability
- Comprehensive logging
- Error tracking
- Performance metrics

## 🔗 Service Dependencies

```
┌─────────────────────────────────────────┐
│         External Services               │
│  (OpenAI, JIRA, Slack, GitHub, etc.)   │
└──────────────────┬──────────────────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
┌─────▼──────┐         ┌────────▼─────┐
│Integrations│         │  Reporting   │
└─────┬──────┘         └────────┬─────┘
      │                         │
      └────────────┬────────────┘
                   │
      ┌────────────▼────────────┐
      │       Services          │
      │  (Auth, Compliance)     │
      └────────────┬────────────┘
                   │
      ┌────────────▼────────────┐
      │    AI Services          │
      │  (Generation, Analysis) │
      └─────────────────────────┘
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Verify all modules load
npm run build
```

### Usage Example

```javascript
import { ScenarioGenerator } from './src/ai/scenarioGenerator.js';
import { AllureReporter } from './src/reporting/allureReporter.js';

// Generate test scenarios
const generator = new ScenarioGenerator();
const scenarios = await generator.generate('business-requirement');

// Report results
const reporter = new AllureReporter();
await reporter.publish(testResults);
```

## 📝 Development Guidelines

### Code Standards
- ES6+ syntax
- Async/await for async operations
- Comprehensive error handling
- JSDoc comments for public APIs

### Testing Requirements
- Unit tests for all services
- Integration tests for APIs
- >80% code coverage
- No console.log in production code

### Commit Standards
```bash
# Use conventional commits
git commit -m "feat(ai): add scenario generator"
git commit -m "fix(reporting): handle missing metrics"
git commit -m "docs(services): update API documentation"
```

## 🔄 Service Lifecycle

### Initialization
```javascript
const service = new MyService(config);
await service.initialize();
```

### Operation
```javascript
const result = await service.doSomething(input);
```

### Cleanup
```javascript
await service.shutdown();
```

## 📋 Best Practices

### 1. Error Handling
```javascript
try {
  const result = await service.operation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error });
  throw new ServiceError(error.message);
}
```

### 2. Logging
```javascript
import logger from './utils/logger.js';

logger.info('Service started', { config: this.config });
logger.debug('Processing item', { id: item.id });
logger.error('Operation failed', { error });
```

### 3. Configuration
```javascript
const config = {
  apiUrl: process.env.API_URL,
  apiKey: process.env.API_KEY,  // Never log this!
  timeout: 30000,
  retries: 3
};
```

### 4. Testing
```javascript
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { MyService } from './myService.js';

describe('MyService', () => {
  let service;
  
  beforeEach(() => {
    service = new MyService(mockConfig);
  });
  
  test('should perform operation', async () => {
    const result = await service.doSomething();
    expect(result).toBeDefined();
  });
});
```

## 🔐 Security Considerations

### Secrets Management
- Use environment variables
- Never commit credentials
- Rotate secrets regularly
- Use GitHub Secrets for CI/CD

### Input Validation
```javascript
if (!input || typeof input !== 'string') {
  throw new ValidationError('Invalid input');
}
```

### Error Messages
```javascript
// ❌ Avoid exposing sensitive info
throw new Error(`Failed to connect to ${password}@${host}`);

// ✅ Safe error messages
throw new Error('Failed to authenticate with database');
```

## 📈 Performance Tips

### Optimization Strategies
- Cache frequently used data
- Implement connection pooling
- Use batch operations when possible
- Monitor and profile regularly

### Monitoring
```javascript
import { performance } from 'perf_hooks';

const start = performance.now();
await service.operation();
const duration = performance.now() - start;
logger.info(`Operation took ${duration}ms`);
```

## 🔗 Related Resources

- Architecture: [`/docs/architecture/README.md`](../docs/architecture/)
- Copilot Instructions: [`/.github/copilot-instructions.md`](./.github/copilot-instructions.md)
- Test Framework: [`/tests/README.md`](../tests/)

## 📦 Dependencies

### Core Runtime
- Node.js 18+
- ES6+ compatible

### AI Services
- OpenAI API (optional)
- Claude API (optional)
- LangChain (optional)

### Reporting
- Allure API
- HTML generation
- Metrics libraries

### Integrations
- JIRA REST API
- Slack SDK
- GitHub REST API

## 🚀 Contributing

### Adding a New Service

1. Create `src/[module]/newService.js`
2. Implement service class
3. Add unit tests
4. Update this README
5. Submit PR for review

### Code Review Checklist

- [ ] Follows code standards
- [ ] Has >80% test coverage
- [ ] Error handling comprehensive
- [ ] No credentials in code
- [ ] JSDoc comments present
- [ ] Updated documentation

---

**Last Updated:** June 2026  
**Node.js Version:** 18+  
**Maintained By:** QE Framework Team
