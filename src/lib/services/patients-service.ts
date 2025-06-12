// lib/services/patients-service.ts
import { Patient } from "@/lib/schema/patient.schema";
import { validatedPatients } from "@/lib/data/validatedPatients";
import { NetworkSimulator } from "@/lib/services/network-simulator";

/**
 * Servicio de pacientes - Responsabilidad única: Acceso a datos
 * Solo se encarga de obtener y buscar pacientes, sin procesar estadísticas
 */
export class PatientsService {
  /**
   * Obtiene todos los pacientes
   * Futura implementación: fetch('/api/patients')
   */
  static async getAllPatients(): Promise<Patient[]> {
    await NetworkSimulator.simulateNetworkCall();
    return validatedPatients;
  }

  /**
   * Obtiene un paciente por ID
   * Futura implementación: fetch(`/api/patients/${id}`)
   */
  static async getPatientById(id: string): Promise<Patient | null> {
    await NetworkSimulator.simulateNetworkCall();
    const patient = validatedPatients.find((p) => p.id === id);
    return patient || null;
  }

  /**
   * Busca pacientes por término
   * Futura implementación: fetch(`/api/patients/search?q=${query}`)
   */
  static async searchPatients(query: string): Promise<Patient[]> {
    await NetworkSimulator.simulateNetworkCall();

    if (!query.trim()) return validatedPatients;

    const lowercaseQuery = query.toLowerCase();
    return validatedPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowercaseQuery) ||
        patient.dni.includes(query) ||
        patient.city?.toLowerCase().includes(lowercaseQuery) ||
        patient.neighborhood?.toLowerCase().includes(lowercaseQuery)
    );
  }
}
