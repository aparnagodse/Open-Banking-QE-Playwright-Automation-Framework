# Sprint 8 — QE Orchestration Prompt

Purpose

- Preserve the final prompt used to implement daily orchestration for the QE platform.

When to use

- Use when adding a daily orchestration service and daily report/test execution sequence.

Copilot execution prompt

You are an AI-enabled QE platform engineer. Create `src/services/qeDailyOrchestrator.ts` that describes the end-to-end daily QE execution sequence in TypeScript. The module should define helper methods and interfaces for: generating story scenarios, running the daily test suite, and generating the daily report. The actual orchestration should reference the command names `generate:scenarios`, `test:daily`, and `report:daily` without invoking external APIs or requiring secrets. Add a `report:daily` npm script and a composite `qe:daily` npm script that runs `generate:scenarios`, `test:daily`, and `report:daily` in sequence. Do not modify tests.

Expected output

- `src/services/qeDailyOrchestrator.ts`
- Clear orchestration method names and typed interfaces
- Documentation or comments that explain the daily execution flow
- `report:daily` and `qe:daily` script names captured as part of the prompt

Verification commands

- `ls src/services/qeDailyOrchestrator.ts`
- `grep -n "report:daily" package.json`
- `grep -n "qe:daily" package.json`
- `grep -n "generate:scenarios" src/services/qeDailyOrchestrator.ts`
- `git status --short docs/prompts/copilot/17-sprint8-qe-orchestration.md`

Commit command

- `git add docs/prompts/copilot/17-sprint8-qe-orchestration.md && git commit -m "docs(prompts): add Sprint 8 QE orchestration prompt"`