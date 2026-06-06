# Sprint 10 — Company Bootstrap Prompt

Purpose

- Preserve the final prompt used to bootstrap the QE framework in a new company repository using the prompt library as a blueprint.

When to use

- Use when recreating this framework in a different company repository without copying the personal repository directly.

Copilot execution prompt

You are an AI-enabled QE platform engineer. Use the existing prompt library as a blueprint to recreate the QE framework in a new company repository. Do not copy personal repository artifacts directly. Create generic bootstrap guidance that instructs the new company to replace Open Banking contracts, test data, OAuth configuration, CI/CD workflows, environment settings, and internal URLs with company-specific assets. Emphasize that all company data, secrets, and internal endpoints must remain in the company repository only. Review every Copilot-generated change before accepting it.

Expected output

- Clear bootstrap guidance for porting the framework to a new company repository
- A prompt that avoids personal repo references and enforces company-specific replacements
- A checklist for reviewing Copilot-generated code before merge

Verification commands

- `grep -n "company-specific" docs/prompts/copilot/19-company-bootstrap.md`
- `grep -n "Do not copy personal repository" docs/prompts/copilot/19-company-bootstrap.md`
- `git status --short docs/prompts/copilot/19-company-bootstrap.md`

Commit command

- `git add docs/prompts/copilot/19-company-bootstrap.md && git commit -m "docs(prompts): add company bootstrap prompt"`