"use server";
import { PatientStatus } from "@/lib/schema/patient.schema";
import { supabase } from "@/lib/supabase";

export async function updatePatientStatus(
  id: string,
  newStatus: PatientStatus
) {
  const { error } = await supabase
    .from("patients")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
