# Exploration: Digital Complaint Book (Libro de Reclamaciones) — End-to-End Flow

## Current State

The landing-page React SPA (Vite 6 + React 18 + Tailwind CSS v3 + shadcn/ui) already has:

- **Route**: `/libro-de-reclamaciones` renders `LibroReclamacionesPage` → `LibroReclamaciones` component
- **Component**: `src/components/reclamaciones/libro-reclamaciones.jsx` (544 lines)
  - Canvas-based signature pad with draw/upload modes
  - Uncontrolled form fields (plain `useState` for every input — no react-hook-form)
  - All fields are static: provider data hardcoded, fields read from `useState` and uncontrolled `value`/`onChange` pairs
  - Submit button exists but does **nothing** (no `onClick` handler)
  - `productType` (producto/servicio) and `claimKind` (reclamo/queja) toggles via state
  - Signature captured as base64 data URL (from canvas `toDataURL()` or file `FileReader`)
- **Dependencies available** (not yet used in this component):
  - `react-hook-form` v7.54.2
  - `zod` v3.24.2
  - `@hookform/resolvers` v4.1.2
  - `jsPDF` v4.0.0
  - `html2canvas` v1.4.1
  - `sonner` (toast notifications)
  - `@tanstack/react-query` v5.84.1
- **No `.env` file** exists; no Vite env variables pattern used yet
- **No API service layer** exists in the project
- **No test framework** — project explicitly set to `strict_tdd: false` in openspec config
- **Project language**: Spanish UI (Peruvian complaint book regulation), JSDoc type-checked JSX

## Affected Areas

| File | Why Affected |
|------|-------------|
| `src/components/reclamaciones/libro-reclamaciones.jsx` | Needs react-hook-form integration, Zod validation, submit handler, state management, feedback UX |
| `src/components/reclamaciones/libro-reclamaciones.schema.js` | **NEW** — Zod schema for form data validation |
| `src/components/reclamaciones/libro-reclamaciones.service.js` | **NEW** — API call to Google Apps Script web app |
| `.env` | **NEW** — VITE_GAS_WEBAPP_URL for the Apps Script endpoint |
| `openspec/changes/libro-reclamaciones-digital/` | Change folder for SDD pipeline |

### GAS-side (out of repo, but scope-defined):

| Artifact | Why Needed |
|----------|-----------|
| Google Apps Script project | Receives POST, writes to sheet, generates PDF, sends email |
| `.clasp.json` | (Optional, dev tooling) clasp deployment config |

## Approaches

### 1. Google Apps Script Web App (doPost) — RECOMMENDED

Deploy a GAS project as a web app accepting JSON POST requests. Frontend calls it via `fetch()`. The GAS handles: sheet write, complaint number generation, PDF generation, and email dispatch.

- **Pros**:
  - Single call from frontend — no intermediary backend needed
  - GAS handles all backend concerns (sheet I/O, PDF, email) within its execution environment
  - Zero additional infrastructure cost
  - Built-in `MailApp` and `SpreadsheetApp` APIs
  - HtmlService for PDF template generation
  - The user explicitly requested this approach
- **Cons**:
  - GAS web app URLs are public (mitigation: deployment key parameter)
  - 6-minute execution limit (fine for single complaint: sheet write + PDF + 4 emails)
  - GAS developer experience is poor (no local dev, limited debugging)
  - CORS handling can be finicky for `doPost` with JSON — may need to use `text/plain` content type with stringified JSON to avoid preflight
  - Base64 signature data can be large (200KB+) — within GAS limits but adds to latency
- **Effort**: Medium

### 2. Direct Google Sheets API (REST)

Frontend calls Google Sheets API directly with a restricted API key.

- **Pros**: Simple initial implementation for sheet writes
- **Cons**:
  - API key exposed in client-side bundle (even with referrer restrictions, still visible)
  - Cannot generate PDFs (no jsPDF server-side)
  - Cannot send email
  - Would still need GAS or another service for PDF + email
  - **This does not solve the full problem**
- **Effort**: Low (but incomplete)

### 3. Serverless Function (Vercel/Netlify) + GAS

Add a serverless function that proxies to GAS or handles sheet writes directly.

- **Pros**: Better dev experience, proper environment variables, typed server code
- **Cons**:
  - Adds infrastructure cost and deployment surface
  - User explicitly asked for GAS
  - GAS would still be needed for PDF gen + email unless also added to serverless
  - Over-engineering for a landing page with a single form
- **Effort**: High

## Recommendation

**Approach 1 (GAS Web App)** is the clear winner. It aligns with the user's explicit choice, handles all requirements, and avoids adding infrastructure for a landing page. The architecture is:

```
[React SPA] → POST (JSON + base64 signature) → [GAS Web App]
                                                    ├── Write to Sheet (row 4+)
                                                    ├── Generate PDF (HTML template → blob)
                                                    └── Send email × 4 (with PDF attachment)
```

### Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content type for POST | `text/plain` with stringified JSON body | Avoids CORS preflight — GAS `doPost` handles `application/json` poorly with OPTIONS |
| Signature format | Base64 data URL (already how the component captures it) | GAS can decode and embed in PDF |
| Complaint number | `MHR` + zero-padded row number (e.g., row 4 → `MHR0004`) | Simple, deterministic, row-based |
| PDF generation | GAS `HtmlService.createHtmlFromFile()` → `.getAs('application/pdf')` | Pure GAS, no external API needed |
| Email | `MailApp.sendEmail()` with HTML body + PDF blob | Native GAS, no SendGrid/etc. needed |
| Key obscurity | GAS deployment URL with `?key=` parameter checked server-side | Basic protection against casual abuse |
| Form library | React Hook Form + Zod resolver | Already in dependencies, best practice for validation |
| Toast feedback | `sonner` (already in dependencies, used elsewhere in project?) | Lightweight, reactive |

## Frontend Changes Summary

1. **Rewrite form inputs** using `react-hook-form` `useForm` + `@hookform/resolvers/zod`
2. **Create Zod schema** with all complaint book fields, string/number validations, conditional `guardianName` (not required), signature as base64 string
3. **Add submit handler** that:
   - Reads the canvas signature as data URL (or uses the uploaded file data URL)
   - Calls `POST` to GAS via the service module
   - Shows loading state (disable button, spinner)
   - On success: toast + redirect or clear form
   - On error: toast with error message
4. **Pre-submit validation for signature**: check at least one signature mode is filled
5. **Add `.env`** with `VITE_GAS_WEBAPP_URL`

## GAS Responsibilities (contract)

```
POST / (doPost)
  Body: { complaintData, signatureBase64 }

  1. Validate required fields (defensive — primary validation is frontend)
  2. Open Spreadsheet by ID (config in GAS script)
  3. Determine next row: getDataRange().getLastRow() + 1
  4. Generate complaint number: "MHR" + String(row).padStart(4, "0")
  5. Write row data to columns B:U
  6. Generate PDF from HTML template (include complaint data + embedded signature image)
  7. Build email HTML with confirmation message
  8. Send email to: dordinola@mavrictec.com, informe@mavrictec.com, mosores@mavrictec.com, customer email
     - Subject: "MAVRIC SAC - Hoja de Reclamación N° {number}"
     - Body: HTML confirmation with complaint details
     - Attachments: PDF
  9. Return JSON: { success: true, complaintNumber: "MHR0004" }

  Error: return { success: false, error: "..." }
```

## Sheet Column Mapping

| Column | Field | Source |
|--------|-------|--------|
| B | Complaint number | Auto-generated: `MHR` + row padded |
| C | Complaint number (duplicate) | Same as B |
| D | Date | Today's date |
| E | Full name | Form `fullName` |
| F | DNI/CE | Form `dni` |
| G | Address | Form `address` |
| H | Phone | Form `phone` |
| I | Email | Form `email` |
| J | Minor guardian name | Form `guardianName` (optional) |
| K | Product | Form `product` (description of product) |
| L | Service | (same as K based on type) |
| M | Claimed amount | Form `claimedAmount` |
| N | Description | Form `description` |
| O | Complaint | Form `complaint` (detalle del reclamo/queja) |
| P | Grievance | Form `grievance` |
| Q | Detail | Form `detail` |
| R | Request | Form `request` |
| S | Consumer signature | Base64 (stored as reference, or "Presente" marker) |
| T | Response communication date | Initially empty (set during provider review) |
| U | Provider solution | Initially empty |
| V | Provider signature/validation | Initially empty |

> **Note on columns K:L**: The form asks for product OR service type. Both K and L could be populated based on `productType` selection. Clarify in spec phase whether K is for product name and L for service type, or if only one column gets filled.

## Risks

1. **CORS preflight for JSON POST**: GAS web apps respond to `OPTIONS` with a generic response that may not include proper CORS headers. **Mitigation**: Send request as `text/plain` with `JSON.stringify()` in the body — no preflight needed. GAS parses it with `JSON.parse(e.postData.contents)`.

2. **Signature image size**: Base64 from canvas can be 100-300KB. On slow connections, this could cause the POST to take noticeable time. **Mitigation**: Show a clear uploading/processing state. The GAS 6-min limit is ample, but user patience may not be.

3. **GAS URL exposed in client bundle**: Anyone can inspect the SPA bundle and find the URL. **Mitigation**: Add a simple `?key=` query parameter checked server-side. Not real security but deters casual abuse. For a complaint book, abuse risk is low.

4. **PDF layout fidelity**: GAS `HtmlService` + `.getAs('pdf')` renders HTML to PDF via the GAS engine, which may not match the target layout exactly. **Mitigation**: The PDF layout should be clean and professional but does not need pixel-perfect regulatory compliance — the physical complaint book is what matters for regulatory purposes.

5. **Email deliverability**: `MailApp.sendEmail()` may hit GAS daily sending limits (100/day for consumer accounts, higher for Workspace). **Mitigation**: Ensure the sending account has adequate limits. Four emails per submission × typically low volume should be fine.

6. **No testing on frontend**: The project has no test framework configured. All verification will rely on manual testing, lint (`eslint`), and type checks (`tsc`). **Mitigation**: Manual test plan covering: form validation (all fields), signature capture (draw + upload), successful submit (happy path), network error, GAS error response.

7. **GAS debugging**: If the GAS script errors, the frontend only gets the HTTP response. Error information from GAS may be limited. **Mitigation**: Include structured error logging in GAS (log to a separate "errors" sheet row or `console.log` for Stackdriver).

## Review Size Forecast

| Category | Estimate |
|----------|----------|
| Frontend changed lines | ~300-400 (moderate rewrite of existing component + new files) |
| GAS code (out-of-repo) | ~200-300 lines (GAS script) |
| Total change scope | ~400-500 frontend lines + GAS code |
| 400-line budget risk | **Medium** — the frontend changes could approach or exceed budget |
| Chained PRs needed | **No** — single coherent change front-to-back |

The frontend rewrite is the bulk: converting uncontrolled inputs to RHF, adding Zod schema, adding submit/service layer, and adding feedback UI. This is straightforward but touches many lines in the existing component.

## Ready for Proposal

**Yes** — the architecture is clear, the GAS approach is aligned with user preference, and the affected areas are well-understood. Proceed to proposal phase with the following scope boundaries:

- **In scope**: Frontend form rewrite (RHF + Zod), submission service, GAS web app implementation (out of repo docs)
- **Out of scope**: Authentication, admin panel, PDF preview in browser, provider signature flow (stays blank), multi-language support
