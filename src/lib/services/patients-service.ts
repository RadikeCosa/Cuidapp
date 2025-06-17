import { Patient } from "@/lib/schema/patient.schema";
import {
  validatePatients,
  validatePatient,
} from "@/lib/validators/patient-validator";
import { supabase } from "@/lib/supabase";
import { calculatePatientStats } from "./patient-stats";

/**
 * Servicio de pacientes - Acceso a datos desde Supabase
 */
export class PatientsService {
  /**
   * Obtiene todos los pacientes desde Supabase
   */
  private static handleSupabaseError(error: any) {
    if (error) throw new Error(error.message);
  }
  private static buildPatientWithRelations(
    patient: any,
    emergency_contact: any,
    contact_notes_data: any
  ) {
    return {
      ...patient,
      emergency_contact: emergency_contact || null,
      contact_notes:
        contact_notes_data && contact_notes_data.length > 0
          ? contact_notes_data.map((n: any) => n.note).join(" | ")
          : undefined,
    };
  }
  static async getAllPatients(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    this.handleSupabaseError(error);
    return validatePatients(data || []);
  }

  /**
   * Obtiene un paciente por ID desde Supabase, incluyendo relaciones
   */
  static async getPatientById(id: string): Promise<Patient | null> {
    // 1. Obtener paciente principal
    const { data: patient, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    if (!patient) return null;

    // 2. Obtener contacto de emergencia (1:1)
    const { data: emergency_contact } = await supabase
      .from("emergency_contacts")
      .select("name, phone")
      .eq("patient_id", id)
      .single();

    // 3. Obtener notas de contacto (1:N)
    const { data: contact_notes_data } = await supabase
      .from("contact_notes")
      .select("note")
      .eq("patient_id", id);

    // 4. Armar el objeto paciente extendido
    const patientWithRelations = this.buildPatientWithRelations(
      patient,
      emergency_contact,
      contact_notes_data
    );

    // 5. Validar con Zod
    try {
      return validatePatient(patientWithRelations);
    } catch {
      return null;
    }
  }

  /**
   * Obtiene estadísticas calculadas desde Supabase
   */
  static async getStats() {
    const { data: patients, error } = await supabase
      .from("patients")
      .select("*");

    this.handleSupabaseError(error);
    return calculatePatientStats(validatePatients(patients || []));
  }
}
