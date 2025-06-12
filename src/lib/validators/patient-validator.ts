import { PatientSchema, type Patient } from "@/lib/schema/patient.schema";

/**
 * Valida un objeto desconocido contra el schema de paciente
 * @param data - Datos a validar
 * @returns Objeto Patient validado
 * @throws ZodError si los datos no son válidos
 */
export function validatePatient(data: unknown): Patient {
  return PatientSchema.parse(data);
}

/**
 * Valida un array de objetos desconocidos contra el schema de paciente
 * @param data - Array de datos a validar
 * @returns Array de objetos Patient validados
 * @throws ZodError si algún elemento no es válido
 */
export function validatePatients(data: unknown[]): Patient[] {
  return data.map(validatePatient);
}
