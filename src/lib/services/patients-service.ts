// lib/services/patients.service.ts
import { Patient } from "@/lib/schema/patient.schema";
import { patients } from "@/lib/data/placeholderdata";

/**
 * Servicio de pacientes - Abstrae la fuente de datos
 * En el futuro, estas funciones harán fetch a tu API
 */

// Simula delay de red para demostrar loading states
const simulateNetworkDelay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class PatientsService {
  /**
   * Obtiene todos los pacientes
   * Futura implementación: fetch('/api/patients')
   */
  static async getAllPatients(): Promise<Patient[]> {
    await simulateNetworkDelay();

    // Simula posible error de red (5% probabilidad)
    if (Math.random() < 0.05) {
      throw new Error("Error de conexión con el servidor");
    }

    return patients;
  }

  /**
   * Obtiene un paciente por ID
   * Futura implementación: fetch(`/api/patients/${id}`)
   */
  static async getPatientById(id: string): Promise<Patient | null> {
    await simulateNetworkDelay();

    // Simula posible error de red (3% probabilidad)
    if (Math.random() < 0.03) {
      throw new Error("Error al obtener datos del paciente");
    }

    const patient = patients.find((p) => p.id === id);
    return patient || null;
  }

  /**
   * Obtiene estadísticas de pacientes
   * Futura implementación: fetch('/api/patients/stats')
   */
  static async getPatientsStats() {
    await simulateNetworkDelay(100);

    return {
      total: patients.length,
      active: patients.filter((p) => p.status === "active").length,
      inactive: patients.filter((p) => p.status === "inactive").length,
      deceased: patients.filter((p) => p.status === "deceased").length,
    };
  }

  /**
   * Busca pacientes por término
   * Futura implementación: fetch(`/api/patients/search?q=${query}`)
   */
  static async searchPatients(query: string): Promise<Patient[]> {
    await simulateNetworkDelay();

    if (!query.trim()) return patients;

    const lowercaseQuery = query.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowercaseQuery) ||
        patient.dni.includes(query)
    );
  }
}

// Tipos para mejor tipado
export type PatientsStats = Awaited<
  ReturnType<typeof PatientsService.getPatientsStats>
>;

/**
 * VENTAJAS DE ESTA APROXIMACIÓN:
 *
 * 1. **Abstracción**: El resto del código no sabe de dónde vienen los datos
 * 2. **Simulación Realista**: Delays y errores simulan comportamiento real
 * 3. **Fácil Migración**: Cambiar placeholder por fetch es trivial
 * 4. **Tipado Fuerte**: TypeScript nos ayuda con la estructura
 * 5. **Testing**: Fácil mockear para pruebas unitarias
 */
