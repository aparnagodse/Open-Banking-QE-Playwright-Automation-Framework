# Story Scenario Demo Report

**Generated At:** 2026-06-06T21:44:30.499Z

## User Story Summary

- Jira key: CDR-101
- Summary: Validate customer account data sharing through Open Banking API
- Epic: Open Banking Accounts API

### Acceptance Criteria

- Customer account response must include accountId
- Customer account response must include displayName
- Customer account response must include productCategory
- API response must match agreed CDR contract

## Analysis

**Summary:** Open Banking user story analysis summary.

### Risks

- Open Banking / CDR compliance
- Consent lifecycle management
- Account data exposure
- Transaction data accuracy
- API contract drift
- Security of authentication flows
- Account selection and masking

### Compliance Areas

- CDR contract compliance
- OAuth token and scope validation
- FAPI security requirements
- Privacy and data minimisation
- Accessibility for regulatory reporting

### Suggested Tests

- ST: Validate critical account and consent workflows
- SIT: Validate end-to-end API contract and downstream integration
- API: Validate CDR response schema and status codes
- Contract: Validate payload against Open Banking JSON schema
- Accessibility: Validate transparency and consent UI elements
- Security: Validate token scope, expiry, and header protections

## ST Candidate Scenarios

### 1. ST: Validate account contract for Open Banking scenario

Verify that account response fields match the Open Banking contract and business rules.

- Scenario ID: st-001
- Tags: ST, Contract, Account

#### Steps

- [Setup] Prepare account API request payload according to user story requirements.
- [Action] Call the account API endpoint for the authorised user.
- [Action] Validate the response includes accountId, displayName, and productCategory.
- [Verify] Confirm the response matches the allowed CDR contract schema.

### 2. ST: Validate consent lifecycle for Open Banking scenario

Verify consent creation, authorisation, and activation flows in a functional test.

- Scenario ID: st-002
- Tags: ST, Consent, Security

#### Steps

- [Setup] Create consent with the required account access and scope.
- [Action] Authorise the consent through the simulated user consent flow.
- [Action] Activate the consent and verify status is Active.
- [Verify] Revoke the consent and verify the status transitions to Revoked.

### 3. SIT: End-to-end account and transaction integration for Open Banking scenario

Validate integrated account and transaction workflows across service boundaries.

- Scenario ID: sit-001
- Tags: SIT, Integration, Transaction

#### Steps

- [Setup] Execute account retrieval with a valid consent token.
- [Action] Request related transaction history for the selected account.
- [Action] Verify transaction data is returned and linked to the correct account.
- [Verify] Confirm integration results match expected Open Banking business rules.

### 4. SIT: Security and compliance validation for Open Banking scenario

Validate OAuth, FAPI, and contract compliance in an integrated environment.

- Scenario ID: sit-002
- Tags: SIT, Security, Compliance

#### Steps

- [Setup] Generate an OAuth token with the required scopes for CDR access.
- [Action] Submit a protected API request and validate the response headers.
- [Action] Verify the response meets FAPI and CDR contract expectations.
- [Verify] Confirm failed or expired tokens are rejected with the correct status.

## SIT Candidate Scenarios

### 1. ST: Validate account contract for Open Banking scenario

Verify that account response fields match the Open Banking contract and business rules.

- Scenario ID: st-001
- Tags: ST, Contract, Account

#### Steps

- [Setup] Prepare account API request payload according to user story requirements.
- [Action] Call the account API endpoint for the authorised user.
- [Action] Validate the response includes accountId, displayName, and productCategory.
- [Verify] Confirm the response matches the allowed CDR contract schema.

### 2. ST: Validate consent lifecycle for Open Banking scenario

Verify consent creation, authorisation, and activation flows in a functional test.

- Scenario ID: st-002
- Tags: ST, Consent, Security

#### Steps

- [Setup] Create consent with the required account access and scope.
- [Action] Authorise the consent through the simulated user consent flow.
- [Action] Activate the consent and verify status is Active.
- [Verify] Revoke the consent and verify the status transitions to Revoked.

### 3. SIT: End-to-end account and transaction integration for Open Banking scenario

Validate integrated account and transaction workflows across service boundaries.

- Scenario ID: sit-001
- Tags: SIT, Integration, Transaction

#### Steps

- [Setup] Execute account retrieval with a valid consent token.
- [Action] Request related transaction history for the selected account.
- [Action] Verify transaction data is returned and linked to the correct account.
- [Verify] Confirm integration results match expected Open Banking business rules.

### 4. SIT: Security and compliance validation for Open Banking scenario

Validate OAuth, FAPI, and contract compliance in an integrated environment.

- Scenario ID: sit-002
- Tags: SIT, Security, Compliance

#### Steps

- [Setup] Generate an OAuth token with the required scopes for CDR access.
- [Action] Submit a protected API request and validate the response headers.
- [Action] Verify the response meets FAPI and CDR contract expectations.
- [Verify] Confirm failed or expired tokens are rejected with the correct status.
