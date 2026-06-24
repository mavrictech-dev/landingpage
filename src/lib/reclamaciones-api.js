export const complaintRecipients = [
  "informe@mavrictec.com",
]

export function buildComplaintPayload(formData) {
  return {
    ...formData,
    internalRecipients: complaintRecipients,
  }
}
