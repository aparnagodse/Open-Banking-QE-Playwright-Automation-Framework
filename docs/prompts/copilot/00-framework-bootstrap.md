# Framework Bootstrap Prompt

## Purpose

This reusable prompt is designed to create the Sprint 1 AI QE Platform foundation in a new repository. It guides Copilot to generate the initial repository scaffolding, project structure, essential configuration files, and baseline automation templates for an enterprise-grade Playwright-based Open Banking quality engineering framework.

## When to use

Use this prompt when starting a new AI-assisted QE automation repository and you need a consistent, enterprise-ready foundation for:

- Playwright UI and API test automation
- Page Object Model structure
- Open Banking / CDR compliance testing
- Test data and environment configuration
- CI/CD workflow scaffolding
- Reporting integration (Allure, HTML)

## Expected output

The generated bootstrap should include:

- `package.json` with Playwright, Allure, and project dependencies
- `playwright.config.js` with environment defaults and test settings
- directory structure for `tests/`, `pages/`, `utils/`, `fixtures/`, `config/`, and `docs/`
- baseline POM page classes and a sample regression test
- reusable utility templates for API, DB, schema validation, and logging
- `.github/workflows/` CI pipeline templates for regression, accessibility, and contract tests
- README and contribution guidance
- placeholder files for environment config and test data

## Full bootstrap prompt

```text
You are an expert AI test automation engineer tasked with bootstrapping a new Sprint 1 AI QE Platform repository.

Create a Playwright-based Open Banking quality engineering framework foundation with the following requirements:

1. Project architecture
   - ES modules (import/export .js)
   - Page Object Model for UI tests
   - Domain organization for tests: regression, accessibility, contract, data, performance, security
   - Reusable utilities for API requests, schema validation, database queries, logging, and self-healing locators

2. Core files and structure
   - `package.json` with dependencies for Playwright, Allure, axe-core, MySQL2, AJV, dotenv
   - `playwright.config.js` with baseURL, retries, test directory settings, and reporter config
   - `README.md` describing repo purpose, setup, and commands
   - `.github/workflows/` with sample regression and accessibility workflows
   - `tests/` folder with a sample test file and `fixtures/` for test data
   - `pages/` folder with `BasePage.js` and one example page class
   - `utils/` folder with templates for `apiClient.js`, `dbHelper.js`, `schemaValidator.js`, `helpers.js`
   - `config/` folder with environment config templates

3. Open Banking / CDR compliance
   - include placeholders or examples for consent lifecycle, account validation, and API contract checks
   - add guidance for regulatory test coverage and accessibility compliance

4. Reporting and CI
   - integrate Allure and HTML reporting in test config
   - include README commands to install dependencies, run tests, and generate Allure reports
   - include CI workflow examples for GitHub Actions

5. Output expectations
   - produce only repository files needed for a bootstrap foundation
   - use clear section headings and consistent naming conventions
   - do not add production business logic beyond scaffolding and examples

Generate the repository bootstrap with a clean folder layout and minimal but runnable examples.
```

## Verification checklist

- [ ] `package.json` exists and includes Playwright, Allure, axe-core, AJV, mysql2, dotenv
- [ ] `playwright.config.js` exists and imports environment variables
- [ ] `tests/` folder includes at least one sample `.spec.js` test
- [ ] `pages/BasePage.js` exists and provides common helper methods
- [ ] `utils/` contains API, DB, schema, and log helper templates
- [ ] `README.md` explains setup, test commands, and reporting
- [ ] `.github/workflows/` contains at least one CI workflow template
- [ ] `config/` includes environment sample configuration
- [ ] prompt file itself contains Purpose, When to use, Expected output, Full bootstrap prompt, Verification checklist, and Next steps

## Next steps

1. Review the generated bootstrap files and adapt dependency versions to your organization standards.
2. Add real environment values and secrets to `.env` or secure vault storage.
3. Replace placeholder page locators and API endpoints with actual application selectors and service URLs.
4. Extend the scaffold with domain-specific tests, data fixtures, and Open Banking compliance scenarios.
5. Validate the repository by running the initial Playwright smoke tests and generating the first Allure report.
