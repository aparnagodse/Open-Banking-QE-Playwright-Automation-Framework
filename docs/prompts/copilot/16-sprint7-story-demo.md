# Sprint 7 — Story Demo Prompt

Purpose

- Preserve the final prompt used to build story demo generation and CLI execution support for the QE platform.

When to use

- Use when implementing story demo generation, sample user story fixtures, and output reporting artifacts.

Copilot execution prompt

You are an AI-enabled QE platform engineer. Scaffold and implement the story demo generation flow inside the existing Open Banking QE repository. Create a sample user story fixture at `test-data/jira/cdr-user-story.json`. Create `src/services/storyScenarioDemo.ts` with a TypeScript CLI entry point that can generate both `reports/story-scenarios.json` and `reports/story-scenarios.md`. Ensure the implementation is deterministic and repository-local, without calling external APIs or using secrets. Add a `generate:scenarios` npm script that uses `tsx` to execute the TypeScript CLI. Fix any TypeScript CLI execution issues by using `tsx` instead of plain `node` for TS entry points. Do not modify tests.

Expected output

- `test-data/jira/cdr-user-story.json`
- `src/services/storyScenarioDemo.ts`
- `reports/story-scenarios.json`
- `reports/story-scenarios.md`
- `generate:scenarios` npm script configured to run via `tsx`
- A TypeScript CLI entry point exposed from `src/services/storyScenarioDemo.ts`

Verification commands

- `ls test-data/jira/cdr-user-story.json src/services/storyScenarioDemo.ts reports/story-scenarios.json reports/story-scenarios.md`
- `grep -n "generate:scenarios" package.json`
- `npm run generate:scenarios`
- `node_modules/.bin/tsx --version`
- `git status --short docs/prompts/copilot/16-sprint7-story-demo.md`

Commit command

- `git add docs/prompts/copilot/16-sprint7-story-demo.md && git commit -m "docs(prompts): add Sprint 7 story demo prompt"`