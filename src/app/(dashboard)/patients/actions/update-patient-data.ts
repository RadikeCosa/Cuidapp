"use server";

import { PatientsService } from "@/lib/services/patients-service";

export async function updatePatientName(patientId: string, name: string) {
  return await PatientsService.updatePatientField(patientId, "name", name);
}

export async function updatePatientDni(patientId: string, dni: string) {
  return await PatientsService.updatePatientField(patientId, "dni", dni);
}

export async function updatePatientPhone(patientId: string, phone: string) {
  return await PatientsService.updatePatientField(patientId, "phone", phone);
}

export async function updatePatientEmail(patientId: string, email: string) {
  return await PatientsService.updatePatientField(patientId, "email", email);
}

export async function updatePatientAddress(patientId: string, address: string) {
  return await PatientsService.updatePatientField(
    patientId,
    "address",
    address
  );
}

export async function updatePatientCity(patientId: string, city: string) {
  return await PatientsService.updatePatientField(patientId, "city", city);
}

export async function updatePatientNeighborhood(
  patientId: string,
  neighborhood: string
) {
  return await PatientsService.updatePatientField(
    patientId,
    "neighborhood",
    neighborhood
  );
}
