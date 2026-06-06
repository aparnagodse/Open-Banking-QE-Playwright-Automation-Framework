# Copilot Test Implementation Prompts

Purpose:
- Generate executable Playwright test code and domain-specific test cases.

When to use:
- Writing new regression, contract, accessibility, or performance tests
- Translating scenarios into test scripts
- Implementing end-to-end or API validation flows

Expected output:
- Code snippets using Playwright ES6 imports and `expect`
- Tests organized by domain and purpose
- Hooks, setup, and assertions following framework conventions

Prompt examples:
- "Write a Playwright regression test for login and dashboard validation." 
- "Generate a contract test that validates a CDR API response schema using AJV." 
- "Create an accessibility test that injects axe-core and checks for violations."