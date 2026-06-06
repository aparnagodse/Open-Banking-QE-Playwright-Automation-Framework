# Sprint 4 — CI/CD Foundation Prompt

Purpose

- Guide Copilot to scaffold CI/CD foundations that align with the platform's smoke gate and pipeline strategy.

When to use

- Use when creating GitHub Actions workflow templates, smoke gates, and baseline CI configs for a new QE repository.

Copilot execution prompt

You are a DevOps-savvy QE engineer. Generate CI/CD scaffolding for Playwright-based test suites: `smoke.yml`, `regression.yml`, and a minimal CI job that runs fast smoke checks on PRs. Include steps for installing dependencies, running Playwright tests, collecting Allure results, and failing fast on quickly-detected regressions. Provide placeholders for environment secret injection and matrix configuration. Do not include real secrets or provider-specific credentials.

Expected output

- `.github/workflows/smoke.yml` (PR smoke gate)
- `.github/workflows/regression.yml` (nightly regression template)
- README CI section describing how to adapt secrets and runners

Verification checklist

- [ ] Workflow files created under `.github/workflows/`
- [ ] Smoke workflow targets PRs and runs a minimal test command
- [ ] Placeholders exist for secret injection and matrix settings
- [ ] No secrets or credentials are stored in the repository
