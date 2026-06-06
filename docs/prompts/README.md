# AI Prompts & Templates

Central repository for AI prompt engineering used across the Open Banking QE framework. These prompts enable intelligent test generation, data creation, failure analysis, and coverage optimization.

## 📋 Prompt Categories

### Test Scenario Generation
**Purpose:** Generate comprehensive test scenarios from business requirements  
**Files:**
- `test-scenario-generator.md` - Prompt for scenario generation
- `gherkin-converter.md` - Convert scenarios to Gherkin format
- `edge-case-finder.md` - Identify edge cases and boundary conditions

**Example Use Case:**
```
Input: "Users should be able to transfer funds between CDR-authorised accounts"
Output: 5-10 detailed test scenarios covering happy path, edge cases, security, and compliance
```

### Test Data Generation
**Purpose:** Create realistic, compliant test data for financial services  
**Files:**
- `financial-data-generator.md` - Generate account/transaction data
- `regulatory-data-generator.md` - CDR/Open Banking compliant data
- `edge-case-data-generator.md` - Boundary and error condition data

**Example Use Case:**
```
Input: "Generate 100 test accounts with realistic transactions"
Output: Valid account IDs, balances, transaction histories, compliance metadata
```

### Failure Analysis
**Purpose:** Automatically analyze test failures and suggest fixes  
**Files:**
- `failure-root-cause-analyzer.md` - Determine root cause
- `fix-suggestion-generator.md` - Recommend solutions
- `similar-issue-finder.md` - Locate related past failures

**Example Use Case:**
```
Input: Test failure log, screenshot, error message
Output: Root cause analysis, suggested fix, similar past issues, confidence score
```

### Coverage Analysis
**Purpose:** Identify test coverage gaps and recommend new tests  
**Files:**
- `coverage-gap-analyzer.md` - Find untested code paths
- `risk-based-prioritizer.md` - Prioritize by business impact
- `compliance-coverage-validator.md` - Validate regulatory coverage

**Example Use Case:**
```
Input: Test results + source code
Output: Untested paths, recommended tests, compliance gaps, business impact scores
```

### Accessibility Testing
**Purpose:** Generate WCAG 2A/2AA compliance tests  
**Files:**
- `a11y-scenario-generator.md` - Accessibility test scenarios
- `wcag-coverage-checker.md` - Validate WCAG coverage
- `keyboard-navigation-generator.md` - Keyboard test generation

### Performance Testing
**Purpose:** Generate performance and SLA validation tests  
**Files:**
- `performance-scenario-generator.md` - Create load/stress scenarios
- `sla-threshold-analyzer.md` - Calculate optimal SLA thresholds
- `regression-detector.md` - Identify performance regressions

### Security Testing
**Purpose:** Generate security and compliance validation tests  
**Files:**
- `security-scenario-generator.md` - OWASP-aligned scenarios
- `compliance-validator.md` - CDR/regulatory validation
- `data-protection-checker.md` - Privacy/PII protection tests

## 🎯 How to Use These Prompts

### 1. Direct Usage with Copilot Chat
```
Copy prompt content → Paste into Copilot Chat → Customize with your specifics
```

### 2. Programmatic Integration
```javascript
import { loadPrompt } from '../src/ai/promptManager.js';

const prompt = await loadPrompt('test-scenario-generator');
const scenarios = await generateWithAI(prompt, businessRequirement);
```

### 3. Batch Processing
Use prompts in CI/CD pipelines for automated test generation

## 📝 Prompt Template Structure

Each prompt file follows this structure:

```markdown
# [Prompt Name]

**Purpose:** Brief description  
**Use Case:** When to use this prompt  
**Model:** Recommended AI model (GPT-4, Claude, etc.)  
**Temperature:** 0.5-1.0 (creativity level)

## Context
[Background information needed for the AI]

## Instructions
[Step-by-step instructions for the AI]

## Input Format
[How to structure the input]

## Output Format
[Expected output structure]

## Examples
[Example inputs and outputs]

## Tips
[Best practices and optimization tips]
```

## 🔧 Creating New Prompts

1. Use the template above
2. Test with your AI model
3. Iterate based on output quality
4. Document examples and edge cases
5. Add to this index
6. Submit for team review

## 🧭 Prompt Governance

The prompt library is governed by versioning and registry metadata. Prompt templates are treated as immutable once published. Changes are implemented by creating a new version and updating the active registry only when the new version is validated.

- `docs/prompts/registry/active.json` determines which prompt version is active per capability.
- `docs/prompts/registry/changelog.md` records every prompt change and version update.
- Prompt changes require platform lead review and QE governance sign-off.
- Do not include real credentials, PII, or environment secrets in any prompt file.

## 📊 Prompt Performance Metrics

Track effectiveness:
- Test generation accuracy (% valid tests)
- Data generation compliance (% regulatory-compliant)
- Failure analysis accuracy (% correct root causes)
- Coverage improvement (% gaps identified)
- Time saved vs. manual effort

## 🔗 Related Resources

- AI Module: [`/src/ai/`](../../src/ai/)
- Copilot Instructions: [`/.github/copilot-instructions.md`](../../.github/copilot-instructions.md)
- Test Framework: [`/tests/README.md`](../../tests/README.md)

## ⚠️ Important Notes

- **Sensitive Data:** Do not include real credentials/API keys in prompts
- **Compliance:** Ensure all generated data meets regulatory requirements
- **Version Control:** Track prompt changes; version important ones
- **Testing:** Always validate AI-generated tests before production use
- **Token Limits:** Be aware of model token limits for large inputs

---

**Last Updated:** June 2026  
**Maintained By:** QE Framework Team  
**Model Versions:** GPT-4 Turbo, Claude 3.5 Sonnet
