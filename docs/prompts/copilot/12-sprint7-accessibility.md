# Sprint 7 — Accessibility Prompt

Purpose

- Generate Copilot prompts to scaffold WCAG-compliant accessibility tests and automation guidance.

When to use

- Use when adding accessibility scanning, keyboard navigation checks, and a11y remediation guidance to the QE repo.

Copilot execution prompt

You are an accessibility engineer. Produce Playwright-based test templates that use `axe-core/playwright` to scan pages, verify ARIA attributes and label associations, and check keyboard navigation for key journeys. Provide stubs only and include guidance on interpreting axe results. Do not run scans or include sensitive data.

Expected output

- `tests/accessibility/sample-accessibility.spec.ts` template
- `docs/accessibility-guidance.md` with remediation steps and thresholding rules
- `utils/accessibilityHelper.ts` stub exporting `injectAxe` and `runA11yChecks` signatures

Verification checklist

- [ ] Test templates reference `axe-core/playwright` and include scanning steps
- [ ] Guidance covers WCAG 2A/2AA criteria relevant to Open Banking flows
- [ ] No test execution is performed by the prompt generation
