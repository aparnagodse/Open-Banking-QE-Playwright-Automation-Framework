# Sprint 3 — Story Orchestration Prompt

Purpose

- Create Copilot prompt to scaffold services that orchestrate user story analysis and scenario generation (story→analysis→scenarios flow).

When to use

- Use when implementing Sprint 3 service layer that wires `UserStoryAnalyzer` and `TestScenarioGenerator` and produces ST/SIT candidate scenarios.

Copilot execution prompt

You are an AI-enabled QE platform engineer. Scaffold TypeScript service interfaces and orchestration stubs only (no business logic) that: accept a `UserStory`, call the analyzer, request scenario generation, and return classified ST and SIT candidate scenarios. Place files under `src/services/` and `src/integrations/` as needed. Do not implement any AI provider integrations or call external APIs.

Expected output

- `src/services/storyToScenarioService.ts` with interfaces and orchestration methods
- `src/integrations/promptRegistry.ts` (prompt metadata registry) or similar integration stub

Verification checklist

- [ ] Service file exists and imports analyzer + generator types
- [ ] Orchestration methods are typed and return candidate scenarios
- [ ] No AI provider or network calls added
- [ ] Code is TypeScript-only with clear interfaces for future implementations
