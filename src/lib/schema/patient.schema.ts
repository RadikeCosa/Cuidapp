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
  // Campos de contacto existentes
  address: z.string().optional(),
  phone: z.string().optional(),
  // Nuevos campos de contacto
  email: z.string().email().optional(), // Validación de formato email
  emergency_contact: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  contact_notes: z.string().optional(),
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
