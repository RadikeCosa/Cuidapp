"use server";

import { supabase } from "@/lib/supabase";

export async function updateContactNotes(
  patientId: string,
  contactNote: string
) {
  // Verificar si ya existe una nota asociada al paciente
  const { data: existingNotes, error: fetchError } = await supabase
    .from("contact_notes")
    .select("id")
    .eq("patient_id", patientId)
    .limit(1);

  if (fetchError) {
    return { success: false, error: fetchError.message };
  }

  if (existingNotes && existingNotes.length > 0) {
    // Actualizar la nota existente
    const noteId = existingNotes[0].id;
    const { error: updateError } = await supabase
      .from("contact_notes")
      .update({ note: contactNote })
      .eq("id", noteId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }
    return { success: true };
  } else {
    // Insertar una nueva nota
    const { error: insertError } = await supabase
      .from("contact_notes")
      .insert({ patient_id: patientId, note: contactNote });

    if (insertError) {
      return { success: false, error: insertError.message };
    }
    return { success: true };
  }
}
