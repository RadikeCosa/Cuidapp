"use server";
import { PatientStatus } from "@/lib/schema/patient.schema";
import { PatientsService } from "@/lib/services/patients-service";

export async function updatePatientStatus(
  id: string,
  newStatus: PatientStatus
) {
  return await PatientsService.updatePatientStatus(id, newStatus);
}
