# ADR-001: AI-Enabled Open Banking QE Platform

**Date:** 2025  
**Status:** Accepted  
**Decision Maker:** QE Platform Lead

## Problem Statement

We need an enterprise-quality engineering platform for Open Banking/CDR that scales beyond manual test authoring and supports intelligent test generation, compliance validation, and diagnostic reporting.

## Context

Existing QE frameworks typically focus on manual script maintenance. Open Banking introduces a high volume of regulatory requirements, complex contract validation, and strong traceability expectations. AI can accelerate test authoring and diagnostics but must not reduce human review or compliance confidence.

## Alternatives Considered

- Use only Playwright + manual test authoring
- Adopt a traditional BDD toolchain without AI
- Integrate AI only for documentation and not for test generation

## Decision

Adopt an AI-enabled QE architecture that combines Playwright-based automation with:

- AI-driven scenario generation
- Synthetic CDR-compliant data generation
- Post-run failure analysis
- Prompt version governance
- Human review gates on all AI-generated content

## Consequences

### Positive

- Faster test coverage expansion
- Better identification of edge cases and compliance gaps
- Centralised AI prompt governance
- Stronger audit trail for AI-generated assets

### Negative

- Requires new governance around prompt versioning and review
- Introduces complexity in CI/CD and review workflows
- Depends on managed AI service contracts and model availability

## Related Decisions

- ADR-002: Playwright selection and test execution strategy
