# Sprint 9 — Platform Validation Prompt

Purpose

- Preserve the final prompt used to validate the QE platform implementation and fix repository-local issues.

When to use

- Use when validating the final platform readiness, running core test domains, and cleaning repository path/casing issues.

Copilot execution prompt

You are an AI-enabled QE platform engineer. Validate the QE platform by running the following sequences: `npm run generate:scenarios`, `npm run test:st`, `npm run test:sit`, `npm run test:contract`, `npm run test:accessibility`, `npm run report:daily`, and `npm run qe:daily`. Identify and fix repository-local issues such as hardcoded absolute local import paths like `/Users/...` that should use repository-relative imports, report folder casing mismatches from `Reports` to `reports`, and accidental terminal-output files created during debugging. Do not modify tests or use secrets.

Expected output

- Successful execution of validation scripts or documented failures
- Fixes for repository-relative import paths
- Fixes for report folder casing issues
- Cleanup of accidental terminal-output or debug output files

Verification commands

- `npm run generate:scenarios`
- `npm run test:st`
- `npm run test:sit`
- `npm run test:contract`
- `npm run test:accessibility`
- `npm run report:daily`
- `npm run qe:daily`
- `grep -R "\/Users\/" . | head`
- `find . -type f | grep -E '(^|/)Reports/'`
- `find . -type f | egrep 'terminal-output|output\.txt|\.log$' | head`
- `git status --short docs/prompts/copilot/18-platform-validation.md`

Commit command

- `git add docs/prompts/copilot/18-platform-validation.md && git commit -m "docs(prompts): add platform validation prompt"`