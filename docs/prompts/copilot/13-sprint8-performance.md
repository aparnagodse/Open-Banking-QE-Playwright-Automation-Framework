# Sprint 8 — Performance Prompt

Purpose

- Create Copilot prompts for adding performance and SLA testing scaffolds (k6, Playwright timing checks, thresholds).

When to use

- Use when adding performance benchmarking, SLA checks, and load test scaffolding to the QE platform.

Copilot execution prompt

You are a performance engineer. Scaffold templates for k6 scripts, Playwright timing assertions, and a performance CI job. Include configuration examples for thresholds and reporting, and keep implementations as stubs. Do not include large sample datasets or run load tests in the scaffold.

Expected output

- `performance/k6/sample-test.js` template
- `tests/performance/sample-performance.spec.ts` with timing assertions
- `docs/performance.md` with SLA guidance and CI integration notes

Verification checklist

- [ ] k6 script and Playwright timing test templates present
- [ ] Threshold configuration example included
- [ ] No heavy data or execution artifacts committed
