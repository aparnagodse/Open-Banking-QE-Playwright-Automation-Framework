# ADR-002: Playwright Selection for Open Banking QE

**Date:** 2025  
**Status:** Accepted  
**Decision Maker:** QE Platform Lead

## Problem Statement

The platform requires a robust automation engine capable of UI, API, and accessibility testing with cross-browser support and strong reporting integration.

## Context

Open Banking verification spans UI flows, API contract validation, security compliance, and accessibility checks. The chosen automation engine must support:

- reliable browser-based UI automation
- API/testing hybrid workflows
- easy integration with Allure and custom reporting
- compatibility with GitHub Actions and CI orchestration

## Alternatives Considered

- Selenium WebDriver
- Cypress
- Playwright
- TestCafe

## Decision

Select Playwright for the platform because it offers:

- first-class cross-browser automation
- built-in API testing capabilities
- strong support for ES modules and modern JavaScript
- excellent observability and artifact collection
- native support for modern CI pipelines

## Consequences

### Positive

- Single-tool coverage for UI, API, and accessibility testing
- Better parallel execution performance
- Simpler integration with existing Playwright-based utilities and POM patterns

### Negative

- Team ramp-up required if not already familiar with Playwright
- Additional work to maintain Playwright-specific utilities and page objects

## Related Decisions

- ADR-001: AI-enabled QE platform
