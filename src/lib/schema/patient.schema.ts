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
  city: z.string().min(1, "La ciudad es requerida"), // Campo requerido para análisis geográfico
  neighborhood: z.string().optional(), // Barrio para análisis granular

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
// Utilidades para análisis de datos
export const PatientAnalytics = {
  /**
   * Calcula la edad a partir de fecha de nacimiento
   */
  calculateAge: (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  },

  /**
   * Verifica si un paciente fue creado en el mes actual
   */
  isCreatedThisMonth: (createdAt: string): boolean => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  },

  /**
   * Agrupa pacientes por ciudad
   */
  groupByCity: (patients: Patient[]): Record<string, number> => {
    return patients.reduce((acc, patient) => {
      const city = patient.city || "Sin especificar";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  },

  /**
   * Calcula estadísticas de edad
   */
  getAgeStats: (patients: Patient[]) => {
    const ages = patients.map((p) =>
      PatientAnalytics.calculateAge(p.date_of_birth)
    );
    const validAges = ages.filter((age) => !isNaN(age) && age >= 0);

    if (validAges.length === 0) {
      return { average: 0, youngest: 0, oldest: 0 };
    }

    return {
      average: Math.round(
        validAges.reduce((sum, age) => sum + age, 0) / validAges.length
      ),
      youngest: Math.min(...validAges),
      oldest: Math.max(...validAges),
    };
  },
};

export { PatientSchema };
