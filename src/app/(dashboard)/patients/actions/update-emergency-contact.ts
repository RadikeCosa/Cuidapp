"use server";

import { PatientsService } from "@/lib/services/patients-service";

export async function updateEmergencyContact(
  patientId: string,
  name: string,
  phone: string
) {
  return await PatientsService.updateEmergencyContact(patientId, name, phone);
}
