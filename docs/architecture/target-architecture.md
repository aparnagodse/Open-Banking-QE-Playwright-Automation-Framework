# Target architecture — AI-Enabled Open Banking QE Platform

**Version:** 1.0  
**Status:** Approved  
**Owner:** QE Platform Lead  
**Last updated:** 2025  
**CDR standard target:** v1.29+

---

## 1. Purpose

This document defines the target architecture for the Open Banking Quality Engineering Platform. It serves as the authoritative reference for:

- Engineering decisions on framework structure and tooling
- Onboarding new QE engineers to the platform
- Demonstrating QE maturity to delivery leadership and auditors
- Guiding the implementation roadmap across five phases

The platform is designed to support Consumer Data Right (CDR) / Open Banking testing at enterprise scale, incorporating AI-assisted test generation, automated failure analysis, and bi-directional Jira traceability.

---

## 2. Architectural principles

| Principle | Applied as |
|---|---|
| Credentials never in source | All secrets via CI/CD environment injection only |
| AI assists, humans decide | Every AI-generated artefact requires human review before merge |
| Environment parity | Dev / SIT / UAT / Prod share identical test logic; only config differs |
| Fail fast, fail visible | Smoke gate on every PR; failures surface within 3 minutes |
| Traceability by default | Every test maps to a Jira story; no orphan tests |
| Schema as source of truth | CDR JSON schemas drive both validation and contract tests |
| Separation of concerns | Each layer depends only on the layer below it |

---

## 3. Platform layers

The platform is organised into seven horizontal layers. Each layer has a single responsibility and depends only on the layer below.

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 7 — Leadership reporting                             │
│  Daily AI digest · Allure trends · Slack/email              │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 6 — CI/CD orchestration                              │
│  GitHub Actions · Tag-driven pipelines · Secret injection   │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 5 — Test execution engine                            │
│  Playwright · MCP server · GitHub Copilot                   │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 4 — AI intelligence layer                            │
│  Scenario gen · Data gen · Failure analysis · MCP           │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 3 — Traceability and contract                        │
│  Jira REST API · OpenAPI · CDR schema registry              │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 2 — Shared services                                  │
│  Auth helper · API client · DB helper · Fixtures            │
├───────────────────────────────────────────────────────────────────────────┤
│  Layer 1 — Configuration and data                           │
│  .env per environment · JSON schemas · Mock responses       │
└─────────────────────────────────────────────────────────────┘
```

### Layer responsibilities

**Layer 1 — Configuration and data**  
All runtime configuration is injected via `.env.<environment>` files. These files are never committed. CI/CD injects secrets at run time. CDR JSON schemas in `test-data/schemas/` are the source of truth for contract validation. Mock responses in `test-data/mock-responses/` enable offline contract testing when SIT is unavailable.

**Layer 2 — Shared services**  
Cross-cutting concerns with no test logic. The `auth-helper` manages OAuth2/PKCE token lifecycle with caching. The `api-client` wraps Playwright `APIRequestContext` with retry logic and FAPI interaction ID injection. The `db-helper` provides parameterised MySQL query utilities. Fixtures provide composable Playwright test setup for API, browser, and database contexts.

**Layer 3 — Traceability and contract**  
Bi-directional traceability between Jira user stories and test specs. The `jira-ingestion` module reads acceptance criteria and writes structured JSON to `test-data/jira/`. OpenAPI contract validation compares live CDR endpoint responses against pinned JSON schemas using Ajv. Schema drift from the CDR standard is detected automatically.

**Layer 4 — AI intelligence layer**  
Three distinct AI capabilities powered by the Anthropic API (claude-haiku model):
- `scenario-generator`: converts Jira acceptance criteria into structured test stub JSON
- `data-generator`: produces CDR-compliant synthetic test data with zero PII
- `ai-failure-analysis`: post-run root cause diagnosis with suggested fixes

The Playwright MCP server exposes browser tools (navigate, click, assert, screenshot) to AI agents for exploratory testing and self-healing scenarios.

**Layer 5 — Test execution engine**  
Playwright runs eleven test projects, each bound to a tag via `grep`. GitHub Copilot assists spec authoring using the shared `.github/copilot-instructions.md` context file. All test categories run in parallel within their project; cross-project parallelism is controlled via CI matrix strategy.

**Layer 6 — CI/CD orchestration**  
Four GitHub Actions workflows govern the deployment pipeline:
- `smoke.yml` — every PR, targets < 3 minutes
- `regression.yml` — nightly, full suite with sharding
- `performance.yml` — weekly, CDR API baseline
- `accessibility.yml` — on UI change and weekly
- `secret-scanning.yml` — every PR and push to protected branches

**Layer 7 — Leadership reporting**  
Post-run reporting aggregates Allure results, AI failure diagnoses, and coverage delta into a daily digest sent to Slack and email. Trend data is retained for 30 days. Risk flags are escalated automatically when failure rate exceeds threshold.

---

## 4. Repository structure

```
open-banking-qe-platform/
├── .github/
│   ├── CODEOWNERS                    # Mandatory review assignments
│   ├── pull_request_template.md      # PR checklist with AI gate
│   └── workflows/
│       ├── smoke.yml
│       ├── regression.yml
│       ├── performance.yml
│       ├── accessibility.yml
│       └── secret-scanning.yml
│
├── ai/                               # AI intelligence layer (Layer 4)
│   ├── mcp-server.js
│   ├── scenario-generator.js
│   ├── data-generator.js
│   ├── consent-lifecycle-simulator.js
│   └── prompt-templates/
│       ├── v1/
│       │   ├── scenario-gen.md
│       │   └── data-gen.md
│       └── registry.json
│
├── config/environments/              # Layer 1 — per-env config
│   ├── .env.dev                      # committed (no real secrets)
│   ├── .env.sit                      # gitignored
│   ├── .env.uat                      # gitignored
│   └── .env.prod                     # gitignored
│
├── docs/
│   ├── architecture/
│   │   └── target-architecture.md   # this document
│   ├── decisions/
│   │   ├── ADR-001-ai-qe-platform.md
│   │   └── ADR-002-playwright-selection.md
│   ├── prompts/
│   │   ├── README.md
│   │   ├── templates/
│   │   └── registry/
│   ├── test-strategy.md
│   ├── automation-strategy.md
│   ├── cdr-test-matrix.md
│   └── test-data-strategy.md
│
├── fixtures/                         # Layer 2 — shared test setup
│   ├── api-fixtures.js
│   ├── db-fixtures.js
│   ├── browser-fixtures.js
│   └── consent-fixtures.js
│
├── pages/                            # Page Object Model
│   ├── banking/
│   └── common/
│
├── performance/
│   └── k6/                           # Load test scripts (k6)
│
├── scripts/                          # Dev tooling scripts
│   ├── health-check.js
│   └── setup-secrets-baseline.sh
│
├── tests/                            # Layer 5 — test suites
│   ├── smoke/
│   ├── st/
│   ├── sit/
│   ├── regression/
│   ├── contract/
│   ├── data-validation/
│   ├── security/
│   ├── performance/
│   ├── accessibility/
│   └── traceability/
│
├── test-data/
│   ├── schemas/                      # CDR JSON schemas (Ajv)
│   ├── mock-responses/               # Offline mock payloads
│   ├── environments/                 # Per-env synthetic reference data
│   └── jira/                         # Ingested user story JSON
│
├── utils/                            # Layer 2 — shared services
│   ├── api-client.js
│   ├── auth-helper.js
│   ├── db-helper.js
│   ├── schema-validator.js
│   ├── ai-failure-analysis.js
│   ├── coverage-tracker.js
│   ├── digest-sender.js
│   └── reporter.js
│
├── reports/
│   ├── allure-results/
│   ├── html/
│   ├── junit/
│   └── accessibility/
│
├── .copilot-instructions.md          # Copilot context file
├── .eslintrc.json
├── .gitignore
├── .pre-commit-config.yaml
├── .prettierrc
├── CHANGELOG.md
├── CONTRIBUTING.md
├── playwright.config.js
└── package.json
```

---

## 5. Technology decisions

| Concern | Selected technology | Decision record |
|---|---|---|
| Test runner | Playwright 1.45+ (JavaScript) | ADR-002 |
| AI models | Anthropic claude-haiku-4-5 | ADR-001 |
| Schema validation | Ajv 8 + ajv-formats | ADR-001 |
| Browser agent | Playwright MCP server | ADR-001 |
| Dev assistance | GitHub Copilot | ADR-001 |
| Performance load | k6 (separate from Playwright) | Pending ADR |
| Accessibility | axe-core 4.9 | Pending ADR |
| Reporting | Allure + Playwright HTML + JUnit | Pending ADR |
| Database | mysql2/promise | Pending ADR |
| CI/CD | GitHub Actions | ADR-002 |
| Secret scanning | TruffleHog + GHAS | ADR-001 |
| CDR standard | v1.29+ (consumerdatastandards.gov.au) | — |
