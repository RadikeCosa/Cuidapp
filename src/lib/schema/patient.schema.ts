import { z } from "zod";

// Esquema principal del paciente
const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dni: z.string(),
  date_of_birth: z.string(),
  createdAt: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional().default("active"),
  image_url: z.string().optional(),
});

// Tipo inferido para usar en TypeScript
export type Patient = z.infer<typeof PatientSchema>;

// Función helper para validar datos
export function validatePatient(data: unknown): Patient {
  return PatientSchema.parse(data);
}

// Función helper para validar array de pacientes
export function validatePatients(data: unknown[]): Patient[] {
  return data.map(validatePatient);
}

export { PatientSchema };
