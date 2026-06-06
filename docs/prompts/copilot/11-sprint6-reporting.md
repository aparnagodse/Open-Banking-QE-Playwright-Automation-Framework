# Sprint 6 — Reporting & Leadership Digest Prompt

Purpose

- Provide Copilot with a template to scaffold reporting features: Allure integration, daily digests, and trend analysis placeholders.

When to use

- Use when adding reporting, Allure generation, or leadership digest automation to the QE platform.

Copilot execution prompt

You are a reporting engineer. Create templates for: Allure report generation steps, a digest sender module that aggregates test results and AI analyses, and placeholders for Slack/email delivery. Keep implementations as stubs with interfaces and method signatures only. Do not integrate with real Slack or email providers in the scaffold.

Expected output

- `scripts/generateAllureReport.sh` (example)
- `utils/digestSender.ts` interface and stub
- `docs/reporting.md` guidance for scheduling digests and retention

Verification checklist

- [ ] Allure generation script exists with example commands
- [ ] `digestSender.ts` exports interfaces but no provider credentials
- [ ] Documentation includes sample retention and scheduling guidance
