# Digital complaint book with Google Apps Script

This project sends complaint-book submissions from the React landing page to a Google Apps Script web app.

## Frontend setup

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_RECLAMACIONES_GAS_URL` to the deployed Apps Script web app URL.
3. Run the app normally with Vite.

## Google assets required

- One Google Sheet with the complaint register.
- One Drive folder where generated signatures and PDFs will be stored.
- One Apps Script project bound to the Google account that owns those assets.

## Expected sheet layout

Rows start at `4`.

- `B:C` complaint number (`MHR0004`, `MHR0005`, ...)
- `D` date
- `E` full name
- `F` DNI/CE
- `G` address
- `H` phone
- `I` email
- `J` guardian name
- `K` product (`X` when selected)
- `L` service (`X` when selected)
- `M` claimed amount
- `N` description
- `O` complaint (`X` when selected)
- `P` grievance (`X` when selected)
- `Q` detail
- `R` request
- `S` consumer signature file URL
- `T` provider response date (empty on submission)
- `U` provider solution (empty on submission)
- `V` provider validation/signature (empty on submission)

## Email recipients

The Apps Script sends the generated PDF to:

- `dordinola@mavrictec.com`
- `informe@mavrictec.com`
- `mosores@mavrictec.com`
- the customer email captured in the form

## Deployment notes

- Deploy the Apps Script as a **Web app**.
- Execute as: **Me**.
- Access: **Anyone** or **Anyone with the link**.
- The frontend uses `text/plain` payloads to avoid common Apps Script CORS preflight issues.

## Files in this repo

- `scripts/google-apps-script/libro-reclamaciones/Code.gs`
- `scripts/google-apps-script/libro-reclamaciones/PdfTemplate.html`
- `scripts/google-apps-script/libro-reclamaciones/appsscript.json`

Copy those files into the Apps Script editor or sync them with clasp if you use it.
