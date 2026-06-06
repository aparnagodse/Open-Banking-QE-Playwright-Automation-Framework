# MCP Server Integration

Model Context Protocol (MCP) server configuration and utilities for enhanced AI integration and extended Copilot capabilities.

## 🤖 Purpose

The `.mcp/` directory contains configuration and resources for:
- **Protocol Implementation:** MCP server setup and initialization
- **Tool Definitions:** Custom tools available to AI models
- **Resource Management:** Context and resource provisioning
- **Prompt Templates:** System prompts and prompt engineering
- **Configuration:** Environment and capability settings

## 📂 Directory Structure

```
.mcp/
├── server.config.json        # MCP server configuration
├── capabilities.json         # Available capabilities and tools
├── prompts/                  # System prompts and templates
├── tools/                    # Custom tool definitions
├── resources/                # Shared resources
└── README.md                 # This file
```

## 🎯 MCP Architecture

```
┌──────────────────────────────────────┐
│     Copilot / AI Client              │
└──────────┬───────────────────────────┘
           │ (JSON-RPC over stdio)
           │
┌──────────▼───────────────────────────┐
│   MCP Server                         │
│  (Running in Node.js)                │
├──────────────────────────────────────┤
│ Tools:                               │
│  - runTests                          │
│  - generateTests                     │
│  - analyzeFailures                   │
│  - validateCompliance                │
│                                      │
│ Resources:                           │
│  - Test configurations               │
│  - AI prompts                        │
│  - Schema definitions                │
└──────────┬───────────────────────────┘
           │
┌──────────▼───────────────────────────┐
│ Backend Services                     │
│  - Test execution                    │
│  - Database operations               │
│  - External APIs                     │
└──────────────────────────────────────┘
```

## 📋 Configuration Files

### server.config.json

```json
{
  "name": "open-banking-qe",
  "version": "1.0.0",
  "description": "MCP server for Open Banking QE framework",
  "transport": {
    "type": "stdio",
    "command": "node",
    "args": ["./src/mcp/server.js"]
  },
  "capabilities": {
    "tools": true,
    "resources": true,
    "prompts": true
  },
  "environment": {
    "NODE_ENV": "production",
    "LOG_LEVEL": "info"
  }
}
```

### capabilities.json

```json
{
  "version": "1.0",
  "tools": [
    {
      "name": "runTests",
      "description": "Execute test suite",
      "inputSchema": {
        "type": "object",
        "properties": {
          "suite": { "type": "string" },
          "filter": { "type": "string" },
          "headless": { "type": "boolean" }
        }
      }
    }
  ],
  "resources": [
    {
      "type": "config",
      "name": "playwright-config",
      "path": "./playwright.config.js"
    }
  ]
}
```

## 🔧 Tool Definitions

### Available Tools

#### 1. runTests
Execute test suites and return results

```javascript
{
  name: "runTests",
  description: "Run tests with filtering and reporting",
  parameters: {
    suite: "regression | api | accessibility | performance",
    filter: "test name pattern",
    headless: true | false,
    failFast: true | false
  }
}
```

#### 2. generateTests
Generate test scenarios using AI

```javascript
{
  name: "generateTests",
  description: "Generate test scenarios from requirements",
  parameters: {
    requirement: "business requirement text",
    testType: "regression | api | accessibility",
    format: "javascript | gherkin"
  }
}
```

#### 3. analyzeFailures
Analyze test failures with AI

```javascript
{
  name: "analyzeFailures",
  description: "Analyze and suggest fixes for test failures",
  parameters: {
    testName: "name of failed test",
    errorMessage: "error details",
    screenshot: "base64 encoded image"
  }
}
```

#### 4. validateCompliance
Validate regulatory compliance

```javascript
{
  name: "validateCompliance",
  description: "Validate CDR/regulatory compliance",
  parameters: {
    checkType: "cdr | pii | security | accessibility",
    scope: "scope of validation"
  }
}
```

#### 5. getTestCoverage
Get coverage metrics

```javascript
{
  name: "getTestCoverage",
  description: "Get test coverage metrics",
  parameters: {
    metric: "lines | functions | branches | statements",
    period: "today | week | month"
  }
}
```

## 📁 Prompts

### System Prompts

**File:** `prompts/system-prompts.json`

```json
{
  "qe-assistant": {
    "role": "You are an expert Quality Engineering AI assistant",
    "capabilities": [
      "Test design and generation",
      "Failure analysis",
      "Coverage optimization",
      "Compliance validation"
    ],
    "constraints": [
      "Never suggest hardcoding credentials",
      "Always validate compliance",
      "Prioritize security"
    ]
  }
}
```

### Prompt Templates

**File:** `prompts/templates/`

```
test-generation-template.md
failure-analysis-template.md
coverage-analysis-template.md
compliance-validation-template.md
```

## 🚀 Server Implementation

### Basic Server Structure

```javascript
// src/mcp/server.js
import { MCPServer } from '@modelcontextprotocol/sdk/server/index.js';

const server = new MCPServer({
  name: 'open-banking-qe',
  version: '1.0.0'
});

// Register tools
server.tool('runTests', runTestsHandler);
server.tool('generateTests', generateTestsHandler);
server.tool('analyzeFailures', analyzeFailuresHandler);
server.tool('validateCompliance', validateComplianceHandler);
server.tool('getTestCoverage', getTestCoverageHandler);

// Register resources
server.resource('config', configResourceHandler);
server.resource('prompts', promptsResourceHandler);
server.resource('schemas', schemasResourceHandler);

// Start server
server.run();
```

## 🔌 Integration Points

### With Copilot Chat
```
User: "Generate accessibility tests for the login page"
→ Copilot calls generateTests tool via MCP
→ Server executes generation
→ Results returned to Copilot
```

### With CI/CD
```
GitHub Actions → Trigger MCP server action → Execute tests → Report results
```

### With Local Development
```
Developer runs: npm run mcp:server
→ MCP server starts listening
→ Copilot connects automatically
→ Can invoke tools directly
```

## 📊 Example Workflows

### Workflow 1: Generate and Run Tests

```
1. User: "Create accessibility tests for checkout page"
2. Copilot calls generateTests("Checkout page accessibility", "accessibility")
3. MCP server generates test file
4. User: "Run the generated tests"
5. Copilot calls runTests("accessibility", "checkout")
6. Tests execute and return results
```

### Workflow 2: Failure Analysis and Fix

```
1. Test fails with "Element not found"
2. Copilot calls analyzeFailures(...)
3. MCP server analyzes and suggests fix
4. User implements fix
5. Copilot calls runTests(...) to verify
```

### Workflow 3: Compliance Validation

```
1. User: "Validate CDR compliance"
2. Copilot calls validateCompliance("cdr", "all")
3. MCP server runs compliance checks
4. Returns compliance report
5. User reviews and takes action
```

## 🔐 Security

### Authentication
```javascript
// MCP server validates requests
const validateRequest = (request) => {
  if (!request.auth.token) {
    throw new Error('Unauthorized');
  }
  // Verify token...
};
```

### Rate Limiting
```javascript
// Prevent abuse
const rateLimit = {
  runTests: 10,        // per minute
  generateTests: 5,    // per minute
  analyzeFailures: 20  // per minute
};
```

### Sandboxing
```javascript
// Run in isolated context
const executeInSandbox = (code) => {
  const vm = require('vm');
  const context = vm.createContext({
    console: console
  });
  return vm.runInContext(code, context);
};
```

## 📈 Monitoring

### Metrics to Track
- Tool invocation counts
- Response latencies
- Error rates
- Resource usage
- User interactions

### Logging
```javascript
logger.info('Tool invoked', {
  tool: 'generateTests',
  duration: 2341,
  success: true
});
```

## 🧪 Testing MCP Server

### Unit Tests
```bash
npm run test:mcp
```

### Integration Tests
```bash
npm run test:mcp:integration
```

### Manual Testing
```bash
# Start server
npm run mcp:server

# In another terminal, test tool
node .mcp/test/run-tool.js runTests --suite=regression
```

## 📚 Resources

- MCP Documentation: https://modelcontextprotocol.io/
- Protocol Specification: https://spec.modelcontextprotocol.io/
- Copilot Integration: https://docs.github.com/en/copilot/
- Architecture: [`/docs/architecture/README.md`](../../docs/architecture/)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install @modelcontextprotocol/sdk
```

### 2. Create Server File
```bash
mkdir -p src/mcp
touch src/mcp/server.js
```

### 3. Implement Tools
Add tool handlers to server.js

### 4. Start Server
```bash
npm run mcp:server
```

### 5. Connect Copilot
Copilot will auto-discover MCP server

## 📋 Checklist for Implementation

- [ ] MCP server initialization
- [ ] Tool implementation (runTests, generateTests, etc.)
- [ ] Resource provisioning
- [ ] System prompts configuration
- [ ] Security and authentication
- [ ] Rate limiting
- [ ] Monitoring and logging
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation

---

**Last Updated:** June 2026  
**Status:** Ready for Implementation  
**Maintained By:** QE Framework Team
