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
    const { id, ...patientData } = validated;
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
  } catch (err: any) {
    if (err.name === "ZodError") {
      return {
        success: false,
        error: err.errors?.[0]?.message || "Datos inválidos",
      };
    }
    return { success: false, error: "Ocurrió un error desconocido" };
  }
}
