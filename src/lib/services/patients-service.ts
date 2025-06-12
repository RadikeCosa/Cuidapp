// lib/services/patients-service.ts
import { Patient } from "@/lib/schema/patient.schema";
import {
  validatePatients,
  validatePatient,
} from "@/lib/validators/patient-validator";

/**
 * Servicio de pacientes - Responsabilidad única: Acceso a datos
 * Solo se encarga de obtener y buscar pacientes, sin procesar estadísticas
 */
// ...existing code...
const API_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export class PatientsService {
  static async getAllPatients(): Promise<Patient[]> {
    const res = await fetch(`${API_URL}/patients`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener pacientes");
    const data = await res.json();
    return validatePatients(data); // sigue usando Zod
  }

  static async getPatientById(id: string): Promise<Patient | null> {
    const res = await fetch(`${API_URL}/patients/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    try {
      return validatePatient(data);
    } catch {
      return null;
    }
  }

  static async searchPatients(query: string): Promise<Patient[]> {
    const res = await fetch(
      `${API_URL}/patients?q=${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Error al buscar pacientes");
    const data = await res.json();
    return validatePatients(data);
  }
  static async getStats() {
    const res = await fetch(`${API_URL}/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
    return res.json();
  }
}
