# GitHub Copilot Instructions
## Enterprise Open Banking QE Framework - Playwright Automation

**Version:** 1.0  
**Last Updated:** June 2026  
**Framework:** Playwright v1.54.0 | Node.js ES6+ | Page Object Model (POM)

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Design Patterns](#architecture--design-patterns)
3. [Code Standards & Conventions](#code-standards--conventions)
4. [Test Organization by Domain](#test-organization-by-domain)
5. [POM Implementation Guidelines](#pom-implementation-guidelines)
6. [Testing Patterns & Utilities](#testing-patterns--utilities)
7. [AI-Assisted Testing Features](#ai-assisted-testing-features)
8. [Accessibility & Compliance](#accessibility--compliance)
9. [Performance & Security](#performance--security)
10. [GitHub Actions & CI/CD](#github-actions--cicd)
11. [MCP Integration](#mcp-integration)
12. [Common Workflows](#common-workflows)

---

## Project Overview

### Purpose
Enterprise-grade Quality Engineering Framework for Open Banking/CDR (Consumer Data Right) compliance validation, designed to test:
- End-to-end Open Banking architecture
- ETL/CDC propagation validation
- ODS reconciliation
- API contract compliance
- Consent lifecycle management
- Data accuracy and regulatory adherence

### Tech Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Test Runner** | Playwright | 1.54.0 |
| **Language** | JavaScript (ES6+) | ES Modules |
| **Reporting** | Allure + HTML | 3.9.0 |
| **API Validation** | Swagger Parser + AJV | 10.0.3, 8.20.0 |
| **Accessibility** | axe-core/playwright | 4.11.3 |
| **Performance** | Lighthouse | 13.3.0 |
| **Database** | MySQL2 | 3.22.3 |

### Project Maturity
- ✅ Test Framework: Complete
- ✅ POM Implementation: Complete (8 page classes + BasePage)
- ✅ Multi-Domain Testing: Complete (10+ test categories)
- ✅ Reporting: Complete (HTML + Allure)
- 🟡 CI/CD: Template ready for GitHub Actions
- 🟡 AI Features: Utility framework established, ready for implementation

---

## Architecture & Design Patterns

### 1. Page Object Model (POM) Architecture

All UI interactions follow the POM pattern for maintainability, readability, and reusability.

**Class Hierarchy:**
```
BasePage (base/abstract layer)
├── LoginPage
├── HomePage
├── CheckoutPage
├── InventoryPage
├── ProductPage
├── CartPage
└── SearchPage
```

**BasePage Responsibilities:**
```javascript
// Base method signatures that all pages inherit
- navigate(url)
- click(locator)
- fill(locator, value)
- getText(locator)
- getTextArray(locator)
- isVisible(locator)
- waitForNavigation(action)
- screenshot(name)
- dropDownSelect(locator, value)
- hoverAndClick(elementLocator, targetLocator)
```

**Page Class Responsibilities:**
- Define UI element locators as class properties
- Implement business-focused methods (e.g., `login()`, `checkout()`)
- Extend BasePage for inherited functionality
- Handle page-specific waits and validations

### 2. Test Organization by Domain

```
tests/
├── accessibility/          # WCAG 2A/2AA compliance
├── contract/              # API contract & schema validation
├── data/                  # Database & backend reconciliation
├── performance/           # SLA & performance validation
├── regression/            # Full UI regression (POM-based)
├── security/              # Security validation (template)
├── sit/                   # System Integration Tests (API)
├── st/                    # Stability Testing
├── traceability/          # Jira acceptance criteria mapping
└── ui/                    # UI-specific tests
```

### 3. Utility Architecture

```
utils/
├── apiClient.js                # HTTP client wrapper (template)
├── authHelper.js               # Authentication utilities
├── dbHelper.js                 # Database query helpers
├── helpers.js                  # General utility functions
├── reporter.js                 # Custom reporting (template)
├── schemaValidator.js          # AJV JSON schema validation
├── selfHealingLocator.js       # Resilient locator strategies
├── aiFailureAnalysis.js        # AI-powered failure analysis (template)
├── aiCoverageAnalysis.js       # Test coverage analysis (template)
├── aiScenarioGenerator.js      # AI scenario generation (template)
└── aiTestDataGenerator.js      # AI test data generation (template)
```

### 4. Test Data Organization

```
fixtures/
└── testData.js                 # Centralized test data fixtures

test-data/
├── accounts.json               # Financial account test data
├── transactions.json           # Transaction test data
├── users.json                  # User credentials
├── jira/                       # Jira traceability data
└── consent.json                # Consent lifecycle data

config/
└── environments/               # Environment-specific configs (template)
    ├── dev.js
    ├── staging.js
    └── production.js
```

---

## Code Standards & Conventions

### 1. Import Conventions

All imports use ES6 module syntax with explicit `.js` extensions:

```javascript
// ✅ CORRECT
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { logStep, generateTestId } from '../utils/helpers.js';
import { validateSchema } from '../utils/schemaValidator.js';

// ❌ AVOID
import LoginPage from '../pages/LoginPage';  // Missing .js
const { test } = require('@playwright/test');  // CommonJS, not ES6
```

### 2. Test File Naming

All test files use the `.spec.js` suffix and descriptive names:

```
✅ CORRECT
- cdr-accessibility.spec.js
- api-contract-validation.spec.js
- user-login-regression.spec.js
- database-reconciliation.spec.js
- performance-sla.spec.js

❌ AVOID
- test.js
- spec.test.js
- cdr.js
```

### 3. Test Structure

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// Group related tests with descriptive suite names
test.describe('Login Feature - Regression Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Setup code
  });

  test.afterEach(async () => {
    await page.close();
  });

  // Individual test case with clear scenario description
  test('User can login with valid credentials and access dashboard', async () => {
    const loginPage = new LoginPage(page);
    
    // Use logStep for step-level reporting
    await logStep('Navigate to login page', async () => {
      await loginPage.navigate('https://app.example.com/login');
    });

    await logStep('Enter credentials', async () => {
      await loginPage.login('user@example.com', 'password');
    });

    await logStep('Verify dashboard is displayed', async () => {
      expect(await loginPage.isDashboardVisible()).toBeTruthy();
    });
  });
});
```

### 4. Assertion Standards

Use Playwright's native `expect()` function exclusively:

```javascript
// ✅ CORRECT - Playwright expect
expect(element).toBeVisible();
expect(text).toContain('Expected text');
expect(count).toBe(5);
expect(url).toMatch(/dashboard/);

// ❌ AVOID - Other assertion libraries
assert.equal(value, expected);  // Node.js assert
chai.expect(value).to.equal(expected);  // Chai
jest.expect(value).toBe(expected);  // Jest
```

### 5. Locator Strategies

Use the following hierarchy for selector robustness:

```javascript
// 1️⃣ Data attributes (MOST ROBUST - recommended)
page.locator('[data-test="submit-button"]')

// 2️⃣ Role-based selectors
page.locator('button:has-text("Submit")')
page.getByRole('button', { name: 'Submit' })

// 3️⃣ Text content selectors
page.locator('text=Submit')

// 4️⃣ CSS classes and IDs
page.locator('#submit-btn')
page.locator('.btn-primary')

// 5️⃣ XPath (LEAST ROBUST - avoid)
page.locator('//button[contains(text(), "Submit")]')
```

### 6. Self-Healing Locators

For unreliable selectors, use the `selfHealingLocator` utility:

```javascript
import { SelfHealingLocator } from '../utils/selfHealingLocator.js';

const submitButton = new SelfHealingLocator(page, {
  primary: '[data-test="submit"]',
  fallbacks: [
    '.btn-submit',
    'button:has-text("Submit")',
    '#submit-button'
  ]
});

await submitButton.click();  // Tries primary, then fallbacks
```

---

## Test Organization by Domain

### 1. Regression Tests (UI Automation)
**Location:** `tests/regression/`  
**Pattern:** Page Object Model with Playwright  
**Focus:** Full user journeys and feature validation

```javascript
// ✅ Example: tests/regression/checkout-flow.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';

test.describe('End-to-End Checkout Flow', () => {
  test('User can successfully complete purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await logStep('Login', async () => {
      await loginPage.navigate();
      await loginPage.login('user@test.com', 'password');
    });

    await logStep('Select product', async () => {
      await inventoryPage.selectProduct('Laptop');
    });

    await logStep('Add to cart', async () => {
      await inventoryPage.addToCart();
    });

    await logStep('Proceed to checkout', async () => {
      await cartPage.navigate();
      await cartPage.proceedToCheckout();
    });

    await logStep('Complete purchase', async () => {
      await checkoutPage.fillShippingInfo('John', 'Doe', '123 Main St');
      await checkoutPage.selectPaymentMethod('Credit Card');
      await checkoutPage.submitOrder();
    });

    await logStep('Verify order confirmation', async () => {
      expect(await checkoutPage.getOrderNumber()).toBeDefined();
    });
  });
});
```

### 2. API/CDR Contract Tests
**Location:** `tests/contract/` and `tests/sit/`  
**Pattern:** OpenAPI/Swagger schema validation + AJV  
**Focus:** API specification compliance

```javascript
// ✅ Example: tests/contract/cdr-api-contract.spec.js
import { test, expect } from '@playwright/test';
import { validateOpenAPI } from '../utils/schemaValidator.js';

test.describe('CDR API Contract Validation', () => {
  test('GET /accounts endpoint complies with OpenAPI spec', async () => {
    const response = await fetch('http://api.example.com/accounts');
    const data = await response.json();

    await logStep('Validate response schema', async () => {
      const schema = {
        type: 'object',
        properties: {
          accounts: {
            type: 'array',
            items: { $ref: '#/components/schemas/Account' }
          }
        },
        required: ['accounts']
      };
      
      const isValid = validateSchema(data, schema);
      expect(isValid).toBeTruthy();
    });
  });
});
```

### 3. Database Reconciliation Tests
**Location:** `tests/data/`  
**Pattern:** Query + API validation  
**Focus:** Backend data accuracy

```javascript
// ✅ Example: tests/data/account-reconciliation.spec.js
import { test, expect } from '@playwright/test';
import { dbQuery } from '../utils/dbHelper.js';

test.describe('Database & API Reconciliation', () => {
  test('Account data in ODS matches API response', async () => {
    const accountId = 'ACC-12345';

    await logStep('Query ODS database', async () => {
      const odsData = await dbQuery(
        `SELECT * FROM accounts WHERE id = ?`,
        [accountId]
      );
      expect(odsData).toHaveLength(1);
    });

    await logStep('Fetch API response', async () => {
      const apiResponse = await fetch(`http://api.example.com/accounts/${accountId}`);
      const apiData = await apiResponse.json();
      expect(apiData.balance).toBe(odsData[0].balance);
    });
  });
});
```

### 4. Accessibility Tests (WCAG 2A/2AA)
**Location:** `tests/accessibility/`  
**Pattern:** axe-core scanning with Playwright  
**Focus:** WCAG compliance

```javascript
// ✅ Example: tests/accessibility/wcag-compliance.spec.js
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('WCAG 2A/2AA Compliance', () => {
  test('Login page meets accessibility standards', async ({ page }) => {
    await page.goto('http://app.example.com/login');

    await logStep('Inject axe-core', async () => {
      await injectAxe(page);
    });

    await logStep('Run accessibility scan', async () => {
      const violations = await page.evaluate(() => {
        return axe.run();
      });

      expect(violations.violations).toHaveLength(0);
    });

    await logStep('Capture screenshot for manual review', async () => {
      await page.screenshot({ path: 'a11y-login.png' });
    });
  });

  test('All interactive elements are keyboard navigable', async ({ page }) => {
    await page.goto('http://app.example.com/checkout');
    
    await logStep('Navigate with Tab key', async () => {
      await page.press('button', 'Tab');
      expect(await page.evaluate(() => document.activeElement.tagName))
        .toBe('BUTTON');
    });
  });
});
```

### 5. Performance Tests (SLA Validation)
**Location:** `tests/performance/`  
**Pattern:** Lighthouse + response time SLA  
**Focus:** Performance benchmarking

```javascript
// ✅ Example: tests/performance/api-sla.spec.js
import { test, expect } from '@playwright/test';

test.describe('API Performance SLA', () => {
  const SLA_RESPONSE_TIME = 500; // milliseconds

  test('GET /accounts endpoint responds within SLA', async () => {
    await logStep('Measure API response time', async () => {
      const startTime = performance.now();
      const response = await fetch('http://api.example.com/accounts');
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      console.log(`Response Time: ${responseTime}ms (SLA: ${SLA_RESPONSE_TIME}ms)`);
      expect(responseTime).toBeLessThan(SLA_RESPONSE_TIME);
    });
  });

  test('Page load time meets performance benchmarks', async ({ page }) => {
    await logStep('Measure page load performance', async () => {
      const navigationTiming = await page.evaluate(() => {
        const perfData = window.performance.timing;
        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          pageLoad: perfData.loadEventEnd - perfData.navigationStart
        };
      });

      expect(navigationTiming.domContentLoaded).toBeLessThan(3000);
      expect(navigationTiming.pageLoad).toBeLessThan(5000);
    });
  });
});
```

### 6. Security Tests (Template)
**Location:** `tests/security/`  
**Pattern:** OWASP validation  
**Focus:** Security compliance

```javascript
// ✅ Template: tests/security/security-validation.spec.js
import { test, expect } from '@playwright/test';

test.describe('Security Validation', () => {
  test('API endpoints validate authentication headers', async () => {
    await logStep('Request without token should fail', async () => {
      const response = await fetch('http://api.example.com/accounts', {
        headers: {}
      });
      expect(response.status).toBe(401);
    });

    await logStep('Request with valid token should succeed', async () => {
      const token = 'Bearer valid_jwt_token';
      const response = await fetch('http://api.example.com/accounts', {
        headers: { 'Authorization': token }
      });
      expect(response.status).toBe(200);
    });
  });

  test('SQL injection attempts are sanitized', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    // Validate that the query is properly escaped/parameterized
    // Implementation depends on backend infrastructure
  });

  test('Sensitive data is not exposed in responses', async () => {
    const response = await fetch('http://api.example.com/accounts');
    const data = await response.json();
    
    // Verify SSN, full credit card numbers, etc. are not exposed
    expect(JSON.stringify(data)).not.toMatch(/\d{3}-\d{2}-\d{4}/); // SSN pattern
  });
});
```

---

## POM Implementation Guidelines

### 1. Creating a New Page Class

```javascript
// ✅ CORRECT: pages/NewPage.js
import { BasePage } from './BasePage.js';

export class NewPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators as properties
    this.headerTitle = page.locator('h1');
    this.submitButton = page.locator('[data-test="submit-btn"]');
    this.errorMessage = page.locator('.error-alert');
    this.nameInput = page.locator('#name-field');
  }

  // Business-focused methods
  async fillForm(name, email) {
    await this.nameInput.fill(name);
    await this.click('[data-test="email-field"]');
    await this.fill('[data-test="email-field"]', email);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getPageTitle() {
    return await this.getText(this.headerTitle);
  }

  async hasError() {
    return await this.isVisible(this.errorMessage);
  }

  async getErrorText() {
    return await this.getText(this.errorMessage);
  }
}
```

### 2. Using Page Objects in Tests

```javascript
// ✅ CORRECT
import { test, expect } from '@playwright/test';
import { NewPage } from '../pages/NewPage.js';
import { logStep } from '../utils/helpers.js';

test('Test scenario', async ({ page }) => {
  const newPage = new NewPage(page);

  await logStep('Navigate to page', async () => {
    await newPage.navigate('http://example.com/new-page');
  });

  await logStep('Fill and submit form', async () => {
    await newPage.fillForm('John Doe', 'john@example.com');
    await newPage.submitForm();
  });

  await logStep('Verify success', async () => {
    const title = await newPage.getPageTitle();
    expect(title).toBe('Success');
  });
});
```

### 3. Advanced POM Patterns

**Inheritance for Common Workflows:**
```javascript
// pages/AuthenticatedPage.js - Base for all authenticated pages
export class AuthenticatedPage extends BasePage {
  constructor(page) {
    super(page);
    this.userMenu = page.locator('[data-test="user-menu"]');
    this.logoutButton = page.locator('[data-test="logout-btn"]');
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
}

// pages/DashboardPage.js - Extends AuthenticatedPage
import { AuthenticatedPage } from './AuthenticatedPage.js';

export class DashboardPage extends AuthenticatedPage {
  constructor(page) {
    super(page);
    this.welcomeMessage = page.locator('h1');
  }

  async getWelcomeMessage() {
    return await this.getText(this.welcomeMessage);
  }
}
```

---

## Testing Patterns & Utilities

### 1. Test Data Management

```javascript
// ✅ fixtures/testData.js
export const testData = {
  users: {
    validUser: {
      email: 'user@test.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe'
    },
    invalidUser: {
      email: 'invalid@test.com',
      password: 'wrongpass'
    }
  },
  
  accounts: {
    checkingAccount: {
      id: 'ACC-001',
      type: 'CHECKING',
      balance: 5000.00,
      currency: 'USD'
    },
    savingsAccount: {
      id: 'ACC-002',
      type: 'SAVINGS',
      balance: 25000.00,
      currency: 'USD'
    }
  },

  transactions: {
    deposit: {
      id: 'TXN-001',
      type: 'CREDIT',
      amount: 1000.00,
      description: 'Deposit'
    }
  }
};

// Usage in tests:
import { testData } from '../fixtures/testData.js';

test('Login with valid credentials', async ({ page }) => {
  await loginPage.login(
    testData.users.validUser.email,
    testData.users.validUser.password
  );
});
```

### 2. Retry & Recovery Pattern

```javascript
// ✅ Use for flaky operations
async function retryOperation(operation, maxAttempts = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

// Usage:
await retryOperation(async () => {
  await page.click('[data-test="submit"]');
}, 3, 500);
```

### 3. Database Helper Pattern

```javascript
// ✅ utils/dbHelper.js (template to implement)
import mysql from 'mysql2/promise.js';

export async function dbQuery(sql, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    await connection.end();
  }
}

// Usage in tests:
const accountData = await dbQuery(
  'SELECT * FROM accounts WHERE id = ?',
  ['ACC-12345']
);
```

### 4. API Client Pattern

```javascript
// ✅ utils/apiClient.js (template to implement)
export class APIClient {
  constructor(baseUrl, authToken = null) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  async request(method, endpoint, data = null) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` })
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    });

    return response.json();
  }

  async get(endpoint) {
    return this.request('GET', endpoint);
  }

  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }
}

// Usage:
const client = new APIClient('https://api.example.com', 'jwt_token');
const accounts = await client.get('/accounts');
```

---

## AI-Assisted Testing Features

### 1. Scenario Generation (Template)

**Purpose:** Generate test scenarios from business requirements using AI

```javascript
// ✅ utils/aiScenarioGenerator.js (template implementation)
export async function generateTestScenarios(businessRequirement) {
  /**
   * TODO: Integrate with AI model (GPT-4, Claude, etc.)
   * 
   * Input: "User should be able to login with email and password"
   * 
   * Output: Array of test scenarios:
   * - Happy path: Valid credentials → logged in
   * - Invalid credentials → error message
   * - Empty fields → validation error
   * - Special characters in email → handled correctly
   * - Rate limiting after 5 failed attempts → locked out
   * - Forgot password flow → reset link sent
   */
  
  const scenarios = [
    {
      name: 'Valid credentials login',
      steps: ['Navigate to login', 'Enter valid email', 'Enter valid password', 'Click submit'],
      expectedResult: 'User logged in, dashboard displayed'
    },
    {
      name: 'Invalid credentials login',
      steps: ['Navigate to login', 'Enter invalid email', 'Enter wrong password', 'Click submit'],
      expectedResult: 'Error message displayed'
    }
  ];

  return scenarios;
}

// Usage:
const scenarios = await generateTestScenarios('User login flow');
scenarios.forEach(scenario => {
  test(scenario.name, async ({ page }) => {
    // Generate test code from scenario
  });
});
```

### 2. Test Data Generation (Template)

**Purpose:** Generate realistic test data using AI

```javascript
// ✅ utils/aiTestDataGenerator.js (template implementation)
export async function generateAccountData(count = 10) {
  /**
   * TODO: Integrate with AI model to generate realistic financial data
   * 
   * Generates:
   * - Valid account numbers (following regulatory format)
   * - Realistic balance amounts
   * - Valid transaction histories
   * - Compliance-aware customer data
   */
  
  return Array.from({ length: count }, (_, i) => ({
    accountId: `ACC-${String(i + 1).padStart(6, '0')}`,
    accountType: ['CHECKING', 'SAVINGS', 'INVESTMENT'][i % 3],
    balance: Math.random() * 100000,
    currency: 'USD',
    createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
  }));
}

// Usage:
const testAccounts = await generateAccountData(5);
```

### 3. Failure Analysis (Template)

**Purpose:** Analyze test failures and suggest fixes using AI

```javascript
// ✅ utils/aiFailureAnalysis.js (template implementation)
export async function analyzeTestFailure(error, testName, screenshot = null) {
  /**
   * TODO: Integrate with AI model for failure analysis
   * 
   * Analysis includes:
   * - Error message interpretation
   * - Root cause suggestion (selector changed, API down, etc.)
   * - Fix recommendation (update locator, add retry, etc.)
   * - Similar past failures
   */
  
  const analysis = {
    error: error.message,
    testName: testName,
    likelyRootCause: 'Selector no longer matches DOM structure',
    suggestedFix: 'Update locator in page object to use data-test attribute',
    similarIssues: [
      'Issue #145: Similar selector failure fixed with fallback strategy',
      'Issue #203: DOM restructuring resolved with self-healing locator'
    ],
    confidence: 0.92
  };

  return analysis;
}

// Usage in test hooks:
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    const analysis = await analyzeTestFailure(
      testInfo.errors[0],
      testInfo.title,
      await page.screenshot()
    );
    console.log('AI Failure Analysis:', analysis);
  }
});
```

### 4. Coverage Analysis (Template)

**Purpose:** Analyze test coverage and identify gaps using AI

```javascript
// ✅ utils/aiCoverageAnalysis.js (template implementation)
export async function analyzeCoveragGaps(testResults, sourceCode) {
  /**
   * TODO: Integrate with AI model for coverage analysis
   * 
   * Analysis identifies:
   * - Untested code paths
   * - Critical business flows without tests
   * - Edge cases not covered
   * - Security scenarios not tested
   * - Accessibility checks missing
   */
  
  const gaps = {
    untested_paths: ['Error handling in API response', 'Rate limiting scenarios'],
    recommended_tests: [
      'Concurrent account access',
      'Transaction rollback scenarios',
      'Multi-currency conversions'
    ],
    security_gaps: ['Missing CSRF token validation', 'Session timeout not tested'],
    a11y_gaps: ['Screen reader testing for error messages', 'Keyboard navigation for modals']
  };

  return gaps;
}
```

---

## Accessibility & Compliance

### 1. WCAG 2A/2AA Testing

All pages must pass automated accessibility checks using axe-core:

```javascript
// ✅ Standard accessibility test structure
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility - Page Name', () => {
  test('No automated accessibility violations', async ({ page }) => {
    await page.goto('http://app.example.com/page');
    await injectAxe(page);
    
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        axe.run((results) => {
          resolve(results.violations);
        });
      });
    });

    expect(violations).toHaveLength(0);
  });

  test('All form inputs have associated labels', async ({ page }) => {
    const inputs = await page.locator('input:not([type="hidden"])').all();
    
    for (const input of inputs) {
      const ariaLabel = await input.getAttribute('aria-label');
      const id = await input.getAttribute('id');
      
      if (!ariaLabel) {
        const label = await page.locator(`label[for="${id}"]`);
        expect(await label.count()).toBeGreaterThan(0);
      }
    }
  });

  test('Keyboard navigation is fully functional', async ({ page }) => {
    // Tab through all interactive elements
    await page.keyboard.press('Tab');
    
    let focusedElement = await page.evaluate(() => {
      return document.activeElement.outerHTML;
    });
    expect(focusedElement).not.toContain('body');
  });

  test('Color contrast meets WCAG AA standards', async ({ page }) => {
    // Use axe-core contrast checker or similar
    const contrastIssues = await page.evaluate(() => {
      return axe.utils.getNodeFromTree(document).children
        .map(node => axe.utils.getContrast(node))
        .filter(ratio => ratio < 4.5); // WCAG AA minimum for large text
    });
    
    expect(contrastIssues).toHaveLength(0);
  });
});
```

### 2. Open Banking Compliance

Tests must validate CDR/Open Banking regulatory requirements:

```javascript
// ✅ Compliance validation pattern
test.describe('Open Banking Compliance', () => {
  test('Consent manager displays required disclosures', async ({ page }) => {
    await page.goto('http://app.example.com/consent');
    
    // Verify required OBIE (Open Banking Implementation Entity) disclosures
    expect(await page.locator('text=Your consent')).toBeVisible();
    expect(await page.locator('text=Data usage')).toBeVisible();
    expect(await page.locator('text=Revoke consent')).toBeVisible();
  });

  test('Account selection shows all authorised accounts', async () => {
    const response = await apiClient.get('/accounts/authorised');
    
    // Must list all accounts with explicit user selection
    expect(response.accounts.length).toBeGreaterThan(0);
    response.accounts.forEach(account => {
      expect(account).toHaveProperty('accountId');
      expect(account).toHaveProperty('accountType');
    });
  });
});
```

---

## Performance & Security

### 1. Performance SLA Validation

```javascript
// ✅ Performance SLA thresholds
const SLA_THRESHOLDS = {
  LOGIN_PAGE_LOAD: 2000,      // 2 seconds
  DASHBOARD_LOAD: 3000,       // 3 seconds
  API_RESPONSE: 500,          // 500ms
  ACCOUNT_LIST: 1000,         // 1 second
  TRANSACTION_SEARCH: 2000    // 2 seconds
};

test('API endpoints meet performance SLA', async () => {
  const endpoints = [
    { path: '/accounts', threshold: SLA_THRESHOLDS.API_RESPONSE },
    { path: '/transactions', threshold: SLA_THRESHOLDS.API_RESPONSE },
    { path: '/consent/status', threshold: SLA_THRESHOLDS.API_RESPONSE }
  ];

  for (const endpoint of endpoints) {
    const startTime = performance.now();
    await apiClient.get(endpoint.path);
    const responseTime = performance.now() - startTime;

    expect(responseTime).toBeLessThan(endpoint.threshold);
  }
});
```

### 2. Security Best Practices

```javascript
// ✅ Security validation patterns
test.describe('Security', () => {
  test('Sensitive headers are set correctly', async ({ page }) => {
    const response = await page.goto('http://app.example.com');
    
    const headers = response.headers();
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['strict-transport-security']).toBeDefined();
  });

  test('CSRF tokens are validated on state-changing requests', async () => {
    // POST without CSRF token should fail
    const response = await fetch('http://api.example.com/transfer', {
      method: 'POST',
      body: JSON.stringify({ amount: 1000 })
    });
    expect(response.status).toBe(403);
  });

  test('Session timeout is enforced', async ({ page }) => {
    // Simulate session expiration
    await page.context().clearCookies();
    await page.goto('http://app.example.com/dashboard');
    
    expect(page.url()).toContain('/login');
  });
});
```

---

## GitHub Actions & CI/CD

### 1. Recommended GitHub Actions Workflows

Create these workflow files in `.github/workflows/`:

**a) Regression Tests (On Push)**
```yaml
# .github/workflows/test-regression.yml
name: Regression Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npx playwright install
      
      - run: npm run test:web
      
      - name: Generate Allure Report
        if: always()
        run: npm run allure:generate
      
      - name: Publish Allure Report
        uses: simple-elf/allure-report-action@master
        with:
          allure_results: allure-results
```

**b) Accessibility Tests (Scheduled)**
```yaml
# .github/workflows/test-accessibility.yml
name: Accessibility Tests

on:
  schedule:
    - cron: '0 8 * * 1'  # Monday 8am
  workflow_dispatch:

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci && npx playwright install
      - run: npm run test:accessibility
```

**c) Performance Tests (Daily)**
```yaml
# .github/workflows/test-performance.yml
name: Performance Tests

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2am

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci && npx playwright install
      - run: npm run test:performance
```

### 2. AI-Generated Code Review Gate
- Add a PR validation gate for AI-generated or Copilot-assisted code changes.
- Require the following when AI-assisted content is included:
  - explicit AI / Copilot note in PR description
  - regression test pass for Playwright suites
  - contract validation and accessibility verification
  - performance and security validation where applicable
  - CI/CD workflow pass before merge
- Use a label such as `ai-generated` to track AI-assisted changes.

### 3. CI/CD Best Practices for Your Framework

```yaml
# Multi-domain test execution with parallel jobs
jobs:
  regression:
    runs-on: ubuntu-latest
    # Runs full regression suite with POM
  
  api_contract:
    runs-on: ubuntu-latest
    # Validates CDR API contracts
  
  accessibility:
    runs-on: ubuntu-latest
    # WCAG compliance checks
  
  database:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8
    # Database reconciliation tests
  
  performance:
    runs-on: ubuntu-latest
    # SLA validation and Lighthouse audits
```

---

## MCP Integration

### 1. Context Management

When generating code, Copilot should understand:

```
Current Project Context:
- Testing Framework: Playwright 1.54.0
- Language: JavaScript (ES6+ with ES modules)
- Architecture: Page Object Model
- Domains: UI, API, Database, Accessibility, Performance, Security
- Report Format: Allure + HTML
- Compliance: Open Banking/CDR
```

### 2. Code Generation Guidelines for MCP

When creating new code files, Copilot should:

1. **Follow the POM pattern** for all UI tests
2. **Use logStep() for step-level reporting** for Allure integration
3. **Externalize test data** to fixtures or JSON files
4. **Use self-healing locators** for robust selectors
5. **Include appropriate assertions** using Playwright's expect()
6. **Add domain-specific validation** (accessibility, performance, security)
7. **Structure tests with beforeEach/afterEach** hooks
8. **Document complex logic** with comments
9. **Use environment variables** for secrets and endpoints
10. **Organize tests** into appropriate domain folders

### 3. Context Preservation

MCP should maintain awareness of:
- Project structure and file locations
- Naming conventions and patterns observed
- Imported dependencies and utilities
- Test data fixtures and schemas
- Environment configuration patterns
- Compliance requirements (WCAG, CDR, Open Banking)

---

## Common Workflows

### ✅ Adding a New Regression Test

```
1. Create test file in tests/regression/feature-name.spec.js
2. Import necessary page objects from pages/
3. Use Page Object Model for all UI interactions
4. Use logStep() for Allure reporting
5. Externalize test data to fixtures/testData.js
6. Run: npm run test:web -- --grep "test name"
7. Commit with clear message: "test: add regression test for feature X"
```

### ✅ Adding a New Page Object

```
1. Create file in pages/PageName.js
2. Extend BasePage class
3. Define element locators in constructor
4. Implement business-focused methods
5. Use data-test attributes for selectors
6. Export class as named export
7. Import and use in corresponding test file
```

### ✅ Adding API Contract Test

```
1. Create test file in tests/contract/api-endpoint.spec.js
2. Define OpenAPI schema or JSON schema
3. Use schemaValidator utility for validation
4. Test request/response against schema
5. Validate required fields and data types
6. Run: npm run test:cdr
```

### ✅ Adding Accessibility Test

```
1. Create test file in tests/accessibility/page-name.spec.js
2. Use axe-core for automated scanning
3. Test keyboard navigation
4. Verify color contrast
5. Check form labels and aria attributes
6. Run: npm run test:accessibility
```

### ✅ Running Tests Locally

```bash
# Full regression suite
npm run test:web

# Specific domain
npm run test:accessibility
npm run test:cdr
npm run test:performance
npm run test:database

# Specific file
npm run test:web -- tests/regression/checkout.spec.js

# Debug mode (with Inspector)
npm run test:debug

# Interactive UI
npm run test:ui

# Generate Allure report
npm run allure:generate && npm run allure:open
```

### ✅ Environment Setup

```javascript
// .env file (keep in .gitignore)
APP_URL=http://localhost:3000
API_URL=http://api.localhost:3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=test_db
JWT_TOKEN=your_test_token

// playwright.config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  webServer: {
    command: 'npm run start',
    url: process.env.APP_URL,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.APP_URL,
  },
  // ... rest of config
};
```

---

## Code Generation Examples

### ✅ Example 1: New Regression Test

When asked to create a new regression test, Copilot should generate:

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { HomePage } from '../../pages/HomePage.js';
import { logStep } from '../../utils/helpers.js';

test.describe('Feature Name - Regression', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('User can [specific action] and [expected outcome]', async () => {
    await logStep('Precondition: Login to application', async () => {
      await loginPage.navigate();
      await loginPage.login('user@test.com', 'password');
    });

    await logStep('Action: Perform specific action', async () => {
      // Page object interaction
    });

    await logStep('Verify: Expected outcome is displayed', async () => {
      expect(true).toBeTruthy();
    });
  });
});
```

### ✅ Example 2: New Page Object

When asked to create a page object, Copilot should generate:

```javascript
import { BasePage } from './BasePage.js';

export class FeaturePage extends BasePage {
  constructor(page) {
    super(page);
    this.pageHeading = page.locator('h1');
    this.actionButton = page.locator('[data-test="action-btn"]');
    this.resultMessage = page.locator('.result-message');
  }

  async navigateToPage() {
    await this.navigate('/path/to/page');
  }

  async performAction() {
    await this.actionButton.click();
  }

  async getResultMessage() {
    return await this.getText(this.resultMessage);
  }

  async isActionSuccessful() {
    return await this.isVisible(this.resultMessage);
  }
}
```

### ✅ Example 3: New API Contract Test

When asked to create an API contract test, Copilot should generate:

```javascript
import { test, expect } from '@playwright/test';
import { validateSchema } from '../../utils/schemaValidator.js';
import { logStep } from '../../utils/helpers.js';

test.describe('API Endpoint - Contract Validation', () => {
  const endpoint = 'http://api.example.com/endpoint';

  test('Response matches OpenAPI specification', async () => {
    await logStep('Send API request', async () => {
      const response = await fetch(endpoint);
      expect(response.status).toBe(200);
    });

    await logStep('Validate response schema', async () => {
      const data = await response.json();
      const schema = {
        type: 'object',
        properties: {
          // Schema definition
        },
        required: []
      };
      
      const isValid = validateSchema(data, schema);
      expect(isValid).toBeTruthy();
    });
  });
});
```

---

## Key Principles for Copilot

1. **POM First**: All UI tests use Page Object Model
2. **Test Data Externalization**: Never hardcode test data in tests
3. **Accessibility Required**: Include WCAG compliance checks
4. **API Contract Validation**: Validate schemas for all API responses
5. **Performance Awareness**: Include SLA checks in relevant tests
6. **Clear Reporting**: Use logStep() for Allure integration
7. **Domain Organization**: Place tests in appropriate category folders
8. **Self-Healing**: Use robust selectors with fallbacks
9. **ES6 Modules**: Always use ES6 import/export
10. **Compliance First**: Open Banking/CDR requirements are non-negotiable

---

## Resources & References

- **Playwright Docs:** https://playwright.dev/docs/intro
- **Allure Report:** https://docs.qameta.io/allure/
- **axe-core:** https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
- **WCAG 2A/2AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **Open Banking (CDR):** https://openbanking.org.uk/
- **OpenAPI/Swagger:** https://swagger.io/

---

**Last Review:** June 2026  
**Next Review:** September 2026 (quarterly)  
**Maintained By:** QE Framework Team  
**Version History:** [To be updated with each iteration]
