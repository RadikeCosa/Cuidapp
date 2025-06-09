import { z } from "zod";

// Enum reutilizable para status
export const PatientStatusEnum = z.enum(["active", "inactive", "deceased"]);

// Tipo TypeScript inferido desde el enum Zod
export type PatientStatus = z.infer<typeof PatientStatusEnum>;

// Esquema principal del paciente
const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dni: z.string(),
  date_of_birth: z.string(),
  // Campos nuevos - opcionales para flexibilidad
  address: z.string().optional(),
  phone: z.string().optional(),
  // Campos existentes
  createdAt: z.string().optional(),
  status: PatientStatusEnum.optional().default("active"),
  image_url: z.string().optional(),
});

export type Patient = z.infer<typeof PatientSchema>;

export function validatePatient(data: unknown): Patient {
  return PatientSchema.parse(data);
}

export function validatePatients(data: unknown[]): Patient[] {
  return data.map(validatePatient);
}

export { PatientSchema };

/**
 * CHANGELOG v1.1.0:
 *
 * ✅ Agregados campos de contacto:
 *   - address: Dirección del paciente (opcional)
 *   - phone: Número de contacto (opcional)
 *
 * 📝 Decisiones técnicas:
 *   - Campos opcionales para mantener compatibilidad
 *   - Validación con Zod mantiene integridad de datos
 *   - Preparado para migración directa a Supabase
 */
