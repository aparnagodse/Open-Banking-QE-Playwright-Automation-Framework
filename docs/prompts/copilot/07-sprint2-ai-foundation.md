# Sprint 2 — AI Foundation Prompt

Purpose

- Guide Copilot to scaffold Sprint 2 AI foundation: analysis, scenario generation, synthetic data, and defect analysis stubs aligned to the AI QE Platform architecture.

When to use

- Use when creating the initial AI intelligence layer (Layer 4) artifacts for a new QE repository.

Copilot execution prompt

You are an expert automation engineer building an AI intelligence layer for an Open Banking QE platform. Create TypeScript interface and method stubs (no business logic) for: user story analysis, test scenario generation, synthetic data generation, and defect analysis. Place files under `src/ai/`. Follow the repository architecture: separate analysis, generation, and failure-analysis responsibilities. Do not call any AI provider APIs, and do not add secrets or environment values.

Expected output

- `src/ai/userStoryAnalyzer.ts` (interfaces + stubs)
- `src/ai/testScenarioGenerator.ts` (interfaces + stubs)
- `src/ai/testDataGenerator.ts` (interfaces + stubs)
- `src/ai/defectAnalyzer.ts` (interfaces + stubs)
- Minimal JSON MCP config entry (optional) `playwright-mcp-config.json`

Verification checklist

- [ ] Files created under `src/ai/` with TypeScript signatures only
- [ ] No provider APIs or secrets added
- [ ] Each module exports interfaces and an analyzer/generator class
- [ ] Files follow ES module path conventions and compile with `tsc` in strict mode (if TS configured)
