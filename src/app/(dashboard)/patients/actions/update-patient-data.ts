"use server";

import { PatientsService } from "@/lib/services/patients-service";

// Acción genérica para actualizar cualquier campo del paciente
export async function updatePatientFieldAction(
  patientId: string,
  field: string,
  value: string
) {
  return await PatientsService.updatePatientField(patientId, field, value);
}
