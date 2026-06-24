const CONFIG = {
  SHEET_URL: 'https://docs.google.com/spreadsheets/d/1kWP0u2aF_54FaUAt52B-mS3gGbz42BD1l0Cy_LgMkrk/edit',
  SHEET_NAME: 'Libro de Reclamaciones',
  START_ROW: 4,
  COMPLAINT_PREFIX: 'MHR',
  SIGNATURE_FOLDER_ID: '1eIE6K_eAdC1tyJ5pXSGl-D-1bC3phLhc',
  PDF_FOLDER_ID: '1rexGtBji9qAcS6I3xo5mqXkg42IjKSKB',
  INTERNAL_RECIPIENTS: [
    'informe@mavrictec.com',
  ],
};

const SHEET_COLUMNS = {
  COMPLAINT_NUMBER: 2,
  FORM_DATE: 4,
  FULL_NAME: 5,
  DOCUMENT_NUMBER: 6,
  ADDRESS: 7,
  PHONE: 8,
  EMAIL: 9,
  GUARDIAN_NAME: 10,
  PRODUCT_MARK: 11,
  SERVICE_MARK: 12,
  CLAIMED_AMOUNT: 13,
  DESCRIPTION: 14,
  CLAIM_MARK: 15,
  GRIEVANCE_MARK: 16,
  DETAIL: 17,
  REQUEST: 18,
  SIGNATURE_URL: 19,
  PROVIDER_RESPONSE_DATE: 20,
  PROVIDER_SOLUTION: 21,
  PROVIDER_VALIDATION: 22,
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Respuestas proveedor')
    .addItem('Enviar respuesta de la fila seleccionada', 'sendSelectedProviderResponse')
    .addToUi();
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    validatePayload(payload);

    const sheet = SpreadsheetApp.openByUrl(CONFIG.SHEET_URL).getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) {
      throw new Error(`Sheet '${CONFIG.SHEET_NAME}' was not found.`);
    }

    const row = getNextAvailableRow(sheet);
    const complaintNumber = buildComplaintNumber(row);
    const signatureFile = saveSignatureFile(payload.consumerSignatureDataUrl, complaintNumber);
    const signatureUrl = signatureFile.getUrl();

    writeComplaintRow(sheet, row, complaintNumber, payload, signatureUrl);

    const pdfBlob = buildComplaintPdf({
      complaintNumber,
      row,
      payload,
      signatureUrl,
      signatureBlob: signatureFile.getBlob(),
    });
    const pdfFile = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID).createFile(pdfBlob);

    sendComplaintEmails({
      complaintNumber,
      payload,
      pdfBlob: pdfFile.getBlob(),
    });

    return jsonResponse({
      ok: true,
      complaintNumber,
      row,
      pdfUrl: pdfFile.getUrl(),
      signatureUrl,
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error.message || 'Unexpected error while processing complaint.',
    });
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function validatePayload(payload) {
  const requiredFields = [
    'formDate',
    'fullName',
    'documentNumber',
    'email',
    'address',
    'phone',
    'description',
    'detail',
    'request',
    'productType',
    'claimKind',
    'consumerSignatureDataUrl',
  ];

  requiredFields.forEach((field) => {
    if (!payload[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
}

function getNextAvailableRow(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), CONFIG.START_ROW);
  const complaintNumberColumnValues = sheet
    .getRange(CONFIG.START_ROW, 2, lastRow - CONFIG.START_ROW + 1, 1)
    .getDisplayValues();

  for (let index = 0; index < complaintNumberColumnValues.length; index += 1) {
    const value = String(complaintNumberColumnValues[index][0] || '').trim();
    if (!value) {
      return CONFIG.START_ROW + index;
    }
  }

  return lastRow + 1;
}

function buildComplaintNumber(row) {
  return `${CONFIG.COMPLAINT_PREFIX}${String(row).padStart(4, '0')}`;
}

function saveSignatureFile(dataUrl, complaintNumber) {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid signature image payload.');
  }

  const mimeType = matches[1];
  const bytes = Utilities.base64Decode(matches[2]);
  const extension = mimeType === 'image/jpeg' ? 'jpg' : 'png';
  const blob = Utilities.newBlob(bytes, mimeType, `${complaintNumber}-consumer-signature.${extension}`);
  return DriveApp.getFolderById(CONFIG.SIGNATURE_FOLDER_ID).createFile(blob);
}

function writeComplaintRow(sheet, row, complaintNumber, payload, signatureUrl) {
  sheet.getRange(row, 2, 1, 2).merge().setValue(complaintNumber);

  const rowValues = [[
    formatDateForSheet(payload.formDate),
    payload.fullName,
    payload.documentNumber,
    payload.address,
    payload.phone,
    payload.email,
    payload.guardianName || '',
    payload.productType === 'producto' ? 'X' : '',
    payload.productType === 'servicio' ? 'X' : '',
    payload.claimedAmount || '0.00',
    payload.description,
    payload.claimKind === 'reclamo' ? 'X' : '',
    payload.claimKind === 'queja' ? 'X' : '',
    payload.detail,
    payload.request,
    signatureUrl,
    '',
    '',
    '',
  ]];

  sheet.getRange(row, 4, 1, rowValues[0].length).setValues(rowValues);
}

function buildComplaintPdf(context) {
  const template = HtmlService.createTemplateFromFile('PdfTemplate');
  template.data = {
    complaintNumber: context.complaintNumber,
    complaintDate: formatDateForDisplay(context.payload.formDate),
    providerName: 'MAVRIC SAC',
    providerRuc: '20615878481',
    providerAddress: 'URB SAN EDUARDO',
    fullName: context.payload.fullName,
    documentNumber: context.payload.documentNumber,
    address: context.payload.address,
    phone: context.payload.phone,
    email: context.payload.email,
    guardianName: context.payload.guardianName || '',
    claimedAmount: context.payload.claimedAmount || '0.00',
    description: context.payload.description,
    detail: context.payload.detail,
    request: context.payload.request,
    responseDate: '',
    providerSolution: '',
    isProduct: context.payload.productType === 'producto',
    isService: context.payload.productType === 'servicio',
    isComplaint: context.payload.claimKind === 'reclamo',
    isGrievance: context.payload.claimKind === 'queja',
    signatureDataUrl: blobToDataUrl(context.signatureBlob),
  };

  const html = template.evaluate().getContent();
  return Utilities.newBlob(html, 'text/html', `${context.complaintNumber}.html`).getAs(MimeType.PDF).setName(`${context.complaintNumber}.pdf`);
}

function blobToDataUrl(blob) {
  const base64 = Utilities.base64Encode(blob.getBytes());
  return `data:${blob.getContentType()};base64,${base64}`;
}

function sendComplaintEmails({ complaintNumber, payload, pdfBlob }) {
  const internalSubject = `Reclamo recibido ${complaintNumber}`;
  const customerSubject = `Hemos recibido tu reclamo ${complaintNumber}`;

  const internalBody = [
    `N° de reclamo: ${complaintNumber}`,
    `Cliente: ${payload.fullName}`,
    `Documento: ${payload.documentNumber}`,
    `Email: ${payload.email}`,
    `Tipo: ${payload.productType} / ${payload.claimKind}`,
  ].join('\n');

  const customerBody = [
    `Hola ${payload.fullName},`,
    '',
    `Hemos recibido tu reclamo correctamente bajo el código ${complaintNumber}.`,
    'Adjuntamos una copia en PDF para tus registros.',
    '',
    'Mavric SAC',
  ].join('\n');

  MailApp.sendEmail({
    to: CONFIG.INTERNAL_RECIPIENTS.join(','),
    cc: payload.email,
    subject: internalSubject,
    body: internalBody,
    attachments: [pdfBlob],
  });

  MailApp.sendEmail({
    to: payload.email,
    subject: customerSubject,
    body: customerBody,
    attachments: [pdfBlob],
  });
}

function formatDateForSheet(value) {
  return formatDateForDisplay(value);
}

function formatDateForDisplay(value) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function sendSelectedProviderResponse() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.openByUrl(CONFIG.SHEET_URL).getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    ui.alert(`No se encontró la hoja '${CONFIG.SHEET_NAME}'.`);
    return;
  }

  const activeSheet = SpreadsheetApp.getActiveSheet();
  const activeRange = SpreadsheetApp.getActiveRange();

  if (!activeRange || activeSheet.getSheetId() !== sheet.getSheetId()) {
    ui.alert('Seleccioná primero una celda dentro de la fila que querés enviar.');
    return;
  }

  const row = activeRange.getRow();
  if (row < CONFIG.START_ROW) {
    ui.alert(`Seleccioná una fila válida desde la fila ${CONFIG.START_ROW}.`);
    return;
  }

  try {
    const record = getComplaintRecordByRow(sheet, row);
    validateProviderResponseRecord(record);

    if (!record.providerResponseDate) {
      record.providerResponseDate = getTodayDisplayDate();
      sheet.getRange(row, SHEET_COLUMNS.PROVIDER_RESPONSE_DATE).setValue(record.providerResponseDate);
    }

    const pdfBlob = buildProviderResponsePdf(record);
    const pdfFile = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID).createFile(pdfBlob);
    trashPreviousComplaintPdfs(record.complaintNumber, pdfFile.getId());

    sendProviderResponseEmail({
      record,
      pdfBlob: pdfFile.getBlob(),
    });

    addProviderResponseAuditNote(sheet, row, pdfFile.getUrl());

    ui.alert(`Respuesta enviada correctamente a ${record.email}.\n\nPDF: ${pdfFile.getUrl()}`);
  } catch (error) {
    ui.alert(error.message || 'Ocurrió un error al enviar la respuesta del proveedor.');
  }
}

function getComplaintRecordByRow(sheet, row) {
  const rowValues = sheet.getRange(row, SHEET_COLUMNS.COMPLAINT_NUMBER, 1, SHEET_COLUMNS.PROVIDER_VALIDATION - SHEET_COLUMNS.COMPLAINT_NUMBER + 1).getDisplayValues()[0];

  const complaintNumber = String(rowValues[0] || '').trim();

  return {
    row,
    complaintNumber,
    formDate: String(rowValues[SHEET_COLUMNS.FORM_DATE - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    fullName: String(rowValues[SHEET_COLUMNS.FULL_NAME - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    documentNumber: String(rowValues[SHEET_COLUMNS.DOCUMENT_NUMBER - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    address: String(rowValues[SHEET_COLUMNS.ADDRESS - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    phone: String(rowValues[SHEET_COLUMNS.PHONE - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    email: String(rowValues[SHEET_COLUMNS.EMAIL - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    guardianName: String(rowValues[SHEET_COLUMNS.GUARDIAN_NAME - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    claimedAmount: String(rowValues[SHEET_COLUMNS.CLAIMED_AMOUNT - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    description: String(rowValues[SHEET_COLUMNS.DESCRIPTION - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    detail: String(rowValues[SHEET_COLUMNS.DETAIL - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    request: String(rowValues[SHEET_COLUMNS.REQUEST - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    signatureUrl: String(rowValues[SHEET_COLUMNS.SIGNATURE_URL - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    providerResponseDate: String(rowValues[SHEET_COLUMNS.PROVIDER_RESPONSE_DATE - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    providerSolution: String(rowValues[SHEET_COLUMNS.PROVIDER_SOLUTION - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    providerValidation: String(rowValues[SHEET_COLUMNS.PROVIDER_VALIDATION - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim(),
    isProduct: String(rowValues[SHEET_COLUMNS.PRODUCT_MARK - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim().toUpperCase() === 'X',
    isService: String(rowValues[SHEET_COLUMNS.SERVICE_MARK - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim().toUpperCase() === 'X',
    isComplaint: String(rowValues[SHEET_COLUMNS.CLAIM_MARK - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim().toUpperCase() === 'X',
    isGrievance: String(rowValues[SHEET_COLUMNS.GRIEVANCE_MARK - SHEET_COLUMNS.COMPLAINT_NUMBER] || '').trim().toUpperCase() === 'X',
  };
}

function validateProviderResponseRecord(record) {
  if (!record.complaintNumber) {
    throw new Error('La fila seleccionada no tiene número de reclamo.');
  }

  if (!record.email) {
    throw new Error('La fila seleccionada no tiene correo del consumidor.');
  }

  if (!record.providerSolution) {
    throw new Error('Primero completá la columna de solución del proveedor antes de enviar.');
  }

  if (!record.providerValidation) {
    throw new Error('Primero completá la columna de validación del proveedor antes de enviar.');
  }
}

function buildProviderResponsePdf(record) {
  const signatureBlob = getDriveFileFromUrl(record.signatureUrl).getBlob();
  const template = HtmlService.createTemplateFromFile('PdfTemplate');

  template.data = {
    complaintNumber: record.complaintNumber,
    complaintDate: normalizeSheetDate(record.formDate),
    providerName: 'MAVRIC SAC',
    providerRuc: '20615878481',
    providerAddress: 'URB SAN EDUARDO',
    fullName: record.fullName,
    documentNumber: record.documentNumber,
    address: record.address,
    phone: record.phone,
    email: record.email,
    guardianName: record.guardianName,
    claimedAmount: record.claimedAmount || '0.00',
    description: record.description,
    detail: record.detail,
    request: record.request,
    responseDate: normalizeSheetDate(record.providerResponseDate),
    providerSolution: record.providerSolution,
    providerValidation: record.providerValidation,
    isProduct: record.isProduct,
    isService: record.isService,
    isComplaint: record.isComplaint,
    isGrievance: record.isGrievance,
    signatureDataUrl: blobToDataUrl(signatureBlob),
  };

  const html = template.evaluate().getContent();
  return Utilities.newBlob(html, 'text/html', `${record.complaintNumber}-provider-response.html`)
    .getAs(MimeType.PDF)
    .setName(`${record.complaintNumber}-respuesta-proveedor.pdf`);
}

function getDriveFileFromUrl(url) {
  const fileIdMatch = String(url || '').match(/[-\w]{25,}/);
  if (!fileIdMatch) {
    throw new Error('No se pudo obtener la firma del consumidor desde la URL guardada.');
  }

  return DriveApp.getFileById(fileIdMatch[0]);
}

function sendProviderResponseEmail({ record, pdfBlob }) {
  const subject = `Respuesta a tu reclamo ${record.complaintNumber}`;
  const body = [
    `Hola ${record.fullName},`,
    '',
    `Te enviamos la respuesta del proveedor para tu reclamo ${record.complaintNumber}.`,
    'Adjuntamos el formato completo en PDF con la información registrada.',
    '',
    'Mavric SAC',
  ].join('\n');

  MailApp.sendEmail({
    to: record.email,
    cc: CONFIG.INTERNAL_RECIPIENTS.join(','),
    subject,
    body,
    attachments: [pdfBlob],
  });
}

function addProviderResponseAuditNote(sheet, row, pdfUrl) {
  const sentAt = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
  const targetCell = sheet.getRange(row, SHEET_COLUMNS.COMPLAINT_NUMBER);
  const previousNote = targetCell.getNote();
  const nextNote = [
    previousNote,
    `Respuesta proveedor enviada: ${sentAt}`,
    `PDF: ${pdfUrl}`,
  ].filter(Boolean).join('\n');

  targetCell.setNote(nextNote);
}

function trashPreviousComplaintPdfs(complaintNumber, keepFileId) {
  const folder = DriveApp.getFolderById(CONFIG.PDF_FOLDER_ID);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const fileName = String(file.getName() || '');
    const isSameComplaintPdf = fileName.indexOf(complaintNumber) !== -1;

    if (isSameComplaintPdf && file.getId() !== keepFileId) {
      file.setTrashed(true);
    }
  }
}

function getTodayDisplayDate() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

function normalizeSheetDate(value) {
  if (!value) return '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return formatDateForDisplay(value);
  }

  return value;
}
