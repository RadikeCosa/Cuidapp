import { Patient } from "@/lib/schema/patient.schema";
import {
  validatePatients,
  validatePatient,
} from "@/lib/validators/patient-validator";
import { supabase } from "@/lib/supabase";
import { calculatePatientStats } from "./patient-stats";

interface EmergencyContact {
  name: string;
  phone: string;
}

interface ContactNote {
  note: string;
}

interface SupabaseError {
  message: string;
  code?: string;
}

export class PatientsService {
  private static handleSupabaseError(error: SupabaseError | null) {
    if (error) throw new Error(error.message);
  }
  private static buildPatientWithRelations(
    patient: Patient,
    emergency_contact: EmergencyContact | null,
    contact_notes_data: ContactNote[] | null
  ) {
    return {
      ...patient,
      emergency_contact: emergency_contact ?? undefined, // Si no hay contacto de emergencia, lo dejamos como undefined
      contact_notes:
        contact_notes_data && contact_notes_data.length > 0
          ? contact_notes_data.map((n) => n.note).join(" | ") // Unimos las notas en un string
          : undefined, //
    };
  }

  static async getAllPatients(
    page: number = 1,
    limit: number = 5 // Paginación: página 1, 5 pacientes por página
  ): Promise<{ patients: Patient[]; total: number }> {
    const from = (page - 1) * limit; // Calcular el índice de inicio
    const to = from + limit - 1; // Calcular el índice de fin

    // Consulta paginada + cuenta total
    const { data, error, count } = await supabase
      .from("patients")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    this.handleSupabaseError(error as SupabaseError | null);

    return {
      patients: validatePatients(data || []),
      total: count ?? 0,
    };
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
      patient as Patient,
      emergency_contact as EmergencyContact | null,
      contact_notes_data as ContactNote[] | null
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

    this.handleSupabaseError(error as SupabaseError | null);
    return calculatePatientStats(validatePatients(patients || []));
  }
  static async createPatient(patientData: Omit<Patient, "id">) {
    const { data, error } = await supabase
      .from("patients")
      .insert([patientData])
      .select()
      .single();

    if (error) return { error };
    return { data };
  }
}
