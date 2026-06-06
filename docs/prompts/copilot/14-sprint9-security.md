# Sprint 9 — Security Prompt

Purpose

- Provide Copilot prompts to scaffold security validation templates (OWASP checks, headers, CSRF, SQL injection tests).

When to use

- Use when adding security tests and CI checks to the QE repository.

Copilot execution prompt

You are a security test engineer. Generate TypeScript/JS test templates that verify common security controls: secure headers, authentication enforcement, SQL injection resistance, and CSRF token validation. Provide stubs and guidance for integrating security scanners into CI. Do not include live exploitation scripts or run attacks.

Expected output

- `tests/security/sample-security.spec.ts` template
- `docs/security-guidance.md` with CI integration notes and remediation steps

Verification checklist

- [ ] Security test templates exist and are non-destructive
- [ ] Documentation advises on safe testing practices and scanners
- [ ] No offensive exploit code or live attack instructions included
