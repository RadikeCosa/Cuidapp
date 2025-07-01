// lib/schema/patient.schema.ts
import { z } from "zod";

// Enum reutilizable para status
export const PatientStatusEnum = z.enum(["active", "inactive", "deceased"]);

// Enum para género
export const PatientGenderEnum = z.enum(["male", "female", "other", "unknown"]);

// Tipo TypeScript inferido desde el enum Zod
export type PatientStatus = z.infer<typeof PatientStatusEnum>;
export type PatientGender = z.infer<typeof PatientGenderEnum>;

// Esquema principal del paciente - SOLO estructura y validaciones
export const PatientSchema = z.object({
  id: z.string().min(1, "ID es requerido"),
  name: z.string().min(1, "Nombre es requerido").trim(),
  dni: z
    .string()
    .min(7, "DNI debe tener al menos 7 dígitos")
    .max(8, "DNI debe tener máximo 8 dígitos")
    .regex(/^\d+$/, "DNI debe contener solo números"),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha debe estar en formato YYYY-MM-DD")
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida"),
  gender: PatientGenderEnum,
  // Campos de contacto existentes
  address: z.string().trim().optional(),
  city: z.string().min(1, "La ciudad es requerida").trim(),
  neighborhood: z.string().trim().optional(),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Teléfono contiene caracteres inválidos")
    .or(z.literal(""))
    .optional(),
  // Nuevos campos de contacto
  email: z.string().email("Email inválido").optional(),
  emergency_contact: z
    .object({
      name: z.string().trim().or(z.literal("")).optional(),
      phone: z
        .string()
        .regex(/^[\d\s\-\+\(\)]+$/, "Teléfono contiene caracteres inválidos")
        .or(z.literal(""))
        .optional(),
    })
    .optional(),
  contact_notes: z.string().trim().optional(),
  // Campos existentes
  createdAt: z
    .string()
    .datetime("Fecha de creación debe ser un timestamp ISO válido")
    .optional(),
  status: PatientStatusEnum.optional().default("active"),
  image_url: z.string().url("URL de imagen inválida").optional(),
});

// Tipo TypeScript inferido desde el schema
export type Patient = z.infer<typeof PatientSchema>;
