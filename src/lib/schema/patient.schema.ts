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
