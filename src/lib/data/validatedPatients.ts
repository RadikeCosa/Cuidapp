import type { Patient } from "@/lib/schema/patient.schema";
import { validatePatients } from "@/lib/validators/patient-validator";
import { rawPatients } from "./data.json";

// Exportar datos validados
export const validatedPatients: Patient[] = validatePatients(rawPatients);
