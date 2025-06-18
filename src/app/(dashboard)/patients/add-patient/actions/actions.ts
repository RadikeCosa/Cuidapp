"use server";
import { PatientSchema } from "@/lib/schema/patient.schema";

export async function addPatientAction(
  prevState: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
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
    id: "temp-id",
  };

  try {
    PatientSchema.parse(data);
    // TODO: Guardar en la base de datos aquí
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.errors?.[0]?.message || "Error desconocido",
    };
  }
}
