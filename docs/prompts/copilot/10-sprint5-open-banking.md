# Sprint 5 — Open Banking / CDR Scaffold Prompt

Purpose

- Create Copilot prompt templates for scaffolding Open Banking / CDR-specific tests and contract validation helpers.

When to use

- Use when adding CDR schema validation, consent lifecycle scaffolds, and contract test templates to a QE repo.

Copilot execution prompt

You are a compliance-focused QE engineer. Generate TypeScript templates for: CDR JSON schema validation using `ajv`, contract test templates under `tests/contract/`, and placeholders for consent lifecycle simulation. Include references to `test-data/schemas/` and `test-data/jira/`. Do not include real PII or live endpoint credentials.

Expected output

- `utils/schemaValidator.ts` template for Ajv-based validation
- `tests/contract/sample-contract.spec.js` or `.ts` template
- `docs/` guidance snippet linking to CDR schema sources

Verification checklist

- [ ] Ajv usage sample exists and references `test-data/schemas/`
- [ ] Contract test template asserts schema conformance
- [ ] No PII or secrets added
- [ ] Guidance added for where to store real schemas and how to pin versions
