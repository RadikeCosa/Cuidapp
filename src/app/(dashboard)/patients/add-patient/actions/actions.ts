"use server";
import { PatientSchema } from "@/lib/schema/patient.schema";
import { PatientsService } from "@/lib/services/patients-service";

export async function addPatientAction(
  prevState: { success: boolean; error?: string; id?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string; id?: string }> {
  const data = {
    name: formData.get("name"),
    dni: formData.get("dni"),
    date_of_birth: formData.get("date_of_birth"),
    gender: formData.get("gender"),
    city: formData.get("city"),
    address: formData.get("address"),
    neighborhood: formData.get("neighborhood"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  try {
    const validated = PatientSchema.parse({ ...data, id: "temp-id" });
    const { id: _id, ...patientData } = validated; // Prefijo con _ para indicar que no se usa
    const result = await PatientsService.createPatient(patientData);

    if ("error" in result && result.error) {
      return {
        success: false,
        error: result.error.message || "Error al guardar en la base de datos",
      };
    }

    if (result && "data" in result && result.data?.id) {
      return { success: true, id: result.data.id };
    }

    return { success: true };
  } catch (err: unknown) {
    // Cambié any por unknown
    // Type guard para verificar si es un error de Zod
    if (
      err &&
      typeof err === "object" &&
      "name" in err &&
      err.name === "ZodError"
    ) {
      const zodError = err as { errors?: Array<{ message?: string }> };
      return {
        success: false,
        error: zodError.errors?.[0]?.message || "Datos inválidos",
      };
    }
    return { success: false, error: "Ocurrió un error desconocido" };
  }
}
