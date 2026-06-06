<!--
  Open Banking QE Platform — Pull Request Template
  This template is enforced for all PRs into main and develop.
  Complete every section. Incomplete PRs will be returned.
-->

## Summary

<!-- One to three sentences. What does this PR do and why? -->


## Change type

<!-- Check all that apply -->

- [ ] New test spec(s)
- [ ] Refactor / move existing tests
- [ ] Framework utility (utils/, fixtures/)
- [ ] AI module (ai/)
- [ ] CI/CD workflow (.github/workflows/)
- [ ] Configuration (playwright.config.js, .env.*, package.json)
- [ ] Documentation (docs/)
- [ ] Schema / test data (test-data/)
- [ ] Bug fix
- [ ] Other: ___________

---

## Test categories affected

<!-- Check all that apply -->

- [ ] `@smoke`
- [ ] `@st` (System Test)
- [ ] `@sit` (System Integration)
- [ ] `@regression`
- [ ] `@contract`
- [ ] `@data`
- [ ] `@security`
- [ ] `@performance`
- [ ] `@accessibility`
- [ ] `@traceability`
- [ ] Not applicable (docs / config only)

---

## AI-generated content

> This section is **mandatory** if any part of this PR was generated or assisted by Claude, GitHub Copilot, or any other AI tool.

**Does this PR contain AI-generated content?**

- [ ] **No** — all content is human-authored
- [ ] **Yes** — see checklist below

### If yes: AI review gate checklist

Complete this before requesting review. PRs with AI-generated specs that skip this checklist will be closed without review.

- [ ] I have read every AI-generated line in this PR
- [ ] Test assertions are logically correct — not just syntactically valid
- [ ] No hallucinated CDR field names, endpoint paths, or HTTP status codes
- [ ] No placeholder text left in from AI output (e.g. "TODO", "example.com", "your-token")
- [ ] Schema references point to real files in `test-data/schemas/`
- [ ] Tags (`@smoke`, `@regression` etc.) are correctly applied per the tag strategy
- [ ] AI tool used: ___________  Model/version: ___________

---

## CDR / Open Banking checklist

- [ ] All new CDR fields are validated against live schema definitions
- [ ] No real account numbers, tokens, or PII are committed
- [ ] Test coverage is aligned to Jira story acceptance criteria
- [ ] Regulatory metadata and traceability links are included
- [ ] Contract validation updates are documented in `docs/decisions/` if needed

---

## Review guidance

- Review Playwright selectors, test coverage, and contract validation.
- Validate accessibility and performance assertions.
- Confirm security headers, auth, and regulatory checks.
- Verify CI/CD gating and GitHub Actions workflow updates.
- Ensure AI-generated content is reviewed and documented.
