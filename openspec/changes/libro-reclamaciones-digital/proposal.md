# Proposal: Digital Complaint Book Submission Flow

## Intent

Turn the existing `/libro-de-reclamaciones` page from a static data-entry experience into an operational complaint submission flow that validates user input, preserves the consumer signature, sends the payload to a Google Apps Script web app, stores the complaint in Google Sheets with row-based identifiers (`MHR0004+`), generates a complaint PDF, and emails that PDF to internal recipients plus the customer.

## Problem Statement

The current complaint-book page presents the required fields and signature capture UI, but the form does not submit anywhere, does not validate critical inputs, does not persist complaints, and does not generate the regulatory-style record that the business needs for follow-up. This leaves the company with a page that looks functional but does not produce an auditable complaint trail or customer confirmation.

## Goals

- Provide a validated end-to-end submission flow on the existing complaint-book page.
- Enforce client-side validation with clear error handling before any network request is sent.
- Integrate the React app with a Google Apps Script web app through a stable request contract.
- Store each complaint in Google Sheets using the agreed column mapping and row-derived IDs starting at `MHR0004`.
- Generate a PDF that matches the provided complaint-book layout as closely as practical within the Google Apps Script rendering model.
- Email the generated PDF to three internal recipients and to the customer who submitted the complaint.
- Preserve the consumer signature for both storage and PDF insertion.
- Leave the provider signature blank during the initial submission flow.
- Document the environment and deployment configuration required to operate the flow.

## Non-Goals

- Building an authenticated internal dashboard for complaint review or response.
- Implementing the provider-side response workflow, provider signature capture, or post-submission resolution process.
- Adding complaint editing, search, export, or administrative reporting inside the React application.
- Delivering pixel-perfect PDF parity with a physical or externally provided layout when Apps Script PDF rendering imposes limitations.
- Introducing a separate custom backend, database, or serverless proxy outside the agreed Google Apps Script approach.

## Scope

### In Scope
- Refactor the existing complaint-book page into a controlled submission flow using the project’s form-validation stack.
- Add schema-based validation for complaint-book fields, including signature presence and submission readiness.
- Add a service layer that sends complaint data and signature payloads from the React app to the Google Apps Script web app.
- Define the request/response contract between the frontend and Google Apps Script.
- Persist submissions to Google Sheets using the agreed column mapping and row-based complaint number generation.
- Generate a PDF per complaint and attach it to outgoing confirmation emails.
- Send email copies to the three internal recipients and the consumer.
- Keep the consumer signature available for persistent record storage and PDF rendering.
- Keep provider-signature-related output columns blank on initial submission.
- Add repo-facing deployment/configuration instructions for frontend environment variables and Google Apps Script setup assumptions.

### Out of Scope
- Any authentication, CAPTCHA, abuse-prevention hardening beyond lightweight configuration assumptions.
- A browser-based PDF preview or download step before submission.
- A retry queue, webhook integration, or asynchronous job system.
- Migration away from Google Sheets / Google Apps Script.
- Legal review or reinterpretation of complaint-book wording already approved by the business.

## Capabilities

> This section is the CONTRACT between the proposal and specs phases. The `sdd-spec` agent reads this to know exactly which spec files to create or update.

### New Capabilities
- `complaint-book-submission`: Governs complaint-book form validation, submission UX, signature requirements, and frontend-to-backend request handling.
- `complaint-book-processing`: Governs Google Apps Script intake, Sheets persistence, complaint numbering, PDF generation, and email distribution.
- `complaint-book-deployment-config`: Governs required environment variables, operational configuration, and deployment instructions for the submission flow.

### Modified Capabilities
- `landing-page-layout`: The existing site route and rendering path for the complaint-book experience will be updated so the current page supports operational submission behavior instead of a static form shell.

## Approach

Keep the existing route and complaint-book UI as the user-facing entry point, but replace ad-hoc local field state with a validated form flow built around React Hook Form and Zod. On successful client validation, the frontend will submit the complaint payload and consumer signature to a Google Apps Script web app using a contract designed for Apps Script compatibility. The Apps Script layer will be responsible for defensive validation, complaint-number generation based on the target row, Sheets persistence, PDF creation, and email dispatch.

This approach preserves the current frontend footprint, avoids introducing extra infrastructure, and centralizes all document-generation and email responsibilities in the Google Workspace environment already aligned with the business workflow.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/reclamaciones/libro-reclamaciones.jsx` | Modified | Convert the current static page into a validated submission flow with loading/error/success states and signature enforcement. |
| `src/components/reclamaciones/` | New/Modified | Add validation schema and submission service modules for complaint-book data handling. |
| Frontend environment config | New/Modified | Add the Google Apps Script endpoint configuration and deployment guidance required by the React app. |
| `openspec/changes/libro-reclamaciones-digital/` | New/Modified | Store proposal, follow-up specs, design, and tasks for this change. |
| Google Apps Script project (external to repo) | New/Modified | Implement request intake, Sheets writes, complaint numbering, PDF generation, and email delivery. |
| Google Sheets workbook (external to repo) | Operational dependency | Receive complaint rows using the agreed column mapping and preserve blank provider-side fields initially. |

## Constraints

- The integration must use a Google Apps Script web app as the processing backend.
- Complaint IDs must be row-based and formatted as `MHR` plus a zero-padded row number, beginning with `MHR0004` when row 4 is the first active complaint row.
- The consumer signature must remain available both for persistent storage/reference and for embedding into the generated PDF.
- Provider signature and provider-resolution fields must remain blank at initial submission time.
- PDF generation must target close practical fidelity to the provided layout, but implementation must stay within Google Apps Script’s HTML-to-PDF capabilities.
- The current project has no dedicated automated test framework configured for this area, so verification planning will need to account for linting, type checks, and manual submission testing.

## Operational Assumptions

- A Google Apps Script deployment URL and any agreed shared secret or key parameter will be provisioned outside this repo.
- The target Google Sheet already exists and has the agreed complaint-book worksheet structure available for writes.
- The business-approved recipient list contains exactly three internal recipients plus the customer email captured from the form.
- The Google Workspace / Apps Script account used for sending email has sufficient quota for expected complaint volume.
- The provided PDF layout reference is stable enough to guide implementation, even if minor rendering differences are accepted.

## Rollout Plan

1. Prepare the Apps Script endpoint and target Google Sheet in a non-production environment.
2. Add frontend configuration for the Apps Script endpoint.
3. Release the validated submission flow behind the existing complaint-book route.
4. Run end-to-end manual verification covering validation, signature capture, successful submission, PDF generation, Sheets persistence, and email delivery.
5. Promote the Apps Script deployment/configuration to the production values used by the site.

## Rollback Plan

If the integrated flow fails in production, rollback consists of reverting the frontend submission changes and removing the active Apps Script endpoint configuration so the page no longer attempts live submission. Because persistence and email operations are handled outside the repo, operational rollback must also disable or redeploy the Apps Script web app if it is the failure source. Existing rows already written to Google Sheets remain as historical records and do not require migration rollback.

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Apps Script CORS or request-shape incompatibility blocks submissions | Medium | Define the request contract explicitly and prefer an Apps Script-compatible content type/transport pattern during implementation. |
| PDF output differs from the reference layout | Medium | Treat the provided layout as a close-fit target, verify the most important structural fields, and document acceptable rendering tolerances. |
| Signature payload size increases latency or causes submission failures on weak connections | Medium | Keep users informed with loading states and validate signature capture before upload. |
| Email quota or delivery failures prevent confirmations | Medium | Validate operational quotas early and return actionable failure responses from Apps Script. |
| Column-mapping mistakes create unusable complaint records | Medium | Lock the agreed field-to-column contract in spec/design artifacts before implementation. |
| Public exposure of the Apps Script endpoint increases abuse risk | Low to Medium | Use lightweight endpoint-key checks and document the residual risk clearly. |

## Success Criteria

- [ ] The complaint-book page validates required user inputs before submission.
- [ ] A successful submission creates the next complaint ID in the `MHR0004+` sequence based on the target sheet row.
- [ ] The agreed Google Sheets columns are populated correctly, while provider-signature-related fields remain blank initially.
- [ ] The consumer signature is preserved for record storage and appears in the generated PDF.
- [ ] A PDF is generated for each accepted complaint and emailed to the three internal recipients plus the customer.
- [ ] Deployment/configuration instructions are sufficient for another engineer to wire the frontend and Apps Script environments.
