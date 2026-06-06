# Contributing to the Open Banking QE Platform

Welcome. This guide covers how to contribute tests, utilities, and documentation to the platform. Read it before raising your first PR.

---

## Local setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd open-banking-qe-platform

# 2. Install dependencies
npm install

# 3. Install pre-commit hooks (requires Python + pip)
pip install pre-commit detect-secrets
pre-commit install

# 4. Create your local dev env file
cp config/environments/.env.dev config/environments/.env.local
# Edit .env.local — add your personal dev credentials
# Never commit .env.local

# 5. Verify setup
npm run test:smoke
```

---

## Before writing a test

1. Check `docs/architecture/target-architecture.md` for the layer your change belongs to
2. Check `docs/cdr-test-matrix.md` to see if the endpoint is already covered
3. Find or create the Jira story — every test must be traceable
4. Identify the correct tag: `@smoke`, `@st`, `@sit`, `@regression`, `@contract`, `@data`, `@security`, `@accessibility`, or `@traceability`

---

## Test authoring rules

### Tags — required on every test

```javascript
test('@smoke accounts list returns 200', async ({ apiContext }) => { ... });
test('@regression @contract accounts schema is valid', async ({ apiContext }) => { ... });
```

A test without a tag will not be picked up by any CI project. The lint rule will catch it.

### Selectors — priority order

1. `data-testid` attribute — always preferred
2. ARIA role + name: `page.getByRole('button', { name: 'Submit' })`
3. CDR field name in `data-cdr-field`
4. Never: positional CSS selectors, XPath, or index-based locators

### Credentials — never in test files

```javascript
// WRONG
const token = 'eyJhbGc...';

// RIGHT
const token = await getOAuthToken();  // from utils/auth-helper.js
```

### Test data — always synthetic

```javascript
// WRONG
const accountId = '123456789';  // looks like a real account

// RIGHT
const accountId = process.env.TEST_ACCOUNT_ID || 'mock-account-sit-001';
```

---

## Using AI assistance

Copilot and Claude may assist with test authoring. If you use AI:

1. Read every line the AI generated — do not commit without review
2. Verify all CDR field names against `test-data/schemas/`
3. Verify all endpoint paths against `docs/cdr-test-matrix.md`
4. Check the PR template AI review gate — complete the checklist
5. Record which AI tool and model version you used in the PR description

See `docs/prompts/README.md` for guidance on using the platform's AI prompt templates.

---

## Running tests locally

```bash
npm run test:smoke          # quick smoke gate
npm run test:st             # system tests
npm run test:contract       # CDR contract validation
npm run lint                # ESLint
npm run format:check        # Prettier check
```

---

## Raising a PR

1. Ensure your branch is up to date with `develop`
2. Run `npm run test:smoke` and `npm run lint` — both must pass
3. Fill in every section of the PR template — incomplete PRs are returned
4. CODEOWNERS will assign reviewers automatically
5. If your PR touches `utils/auth-helper.js`, `test-data/schemas/`, or `.github/`, expect security team review

---

## Commit message format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(contract): add CDR transactions schema validation
fix(auth): handle token expiry race condition
docs(adr): add ADR-003 for k6 load testing
chore(deps): update playwright to 1.46.0
```

Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `ci`, `perf`

---

## Questions?

Raise an issue or ask in the QE platform Slack channel before starting large changes.
