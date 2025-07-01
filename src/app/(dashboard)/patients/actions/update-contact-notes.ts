"use server";

import { PatientsService } from "@/lib/services/patients-service";

export async function updateContactNotes(
  patientId: string,
  contactNote: string
) {
  return await PatientsService.updateContactNotes(patientId, contactNote);
}
