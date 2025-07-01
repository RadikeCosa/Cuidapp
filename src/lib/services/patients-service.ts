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
    // Limpiar y validar el contacto de emergencia
    const cleanEmergencyContact = emergency_contact
      ? {
          name: emergency_contact.name?.trim() || "",
          phone: emergency_contact.phone?.trim() || "",
        }
      : undefined;

    return {
      ...patient,
      emergency_contact: cleanEmergencyContact,
      contact_notes:
        contact_notes_data && contact_notes_data.length > 0
          ? contact_notes_data.map((n) => n.note).join(" | ") // Unimos las notas en un string
          : undefined,
    };
  }

  static async getAllPatients(
    page: number = 1,
    limit: number = 5 // Paginación: página 1, 5 pacientes por página
  ): Promise<{ patients: Patient[]; total: number }> {
    try {
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
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Retornar datos vacíos en caso de error para evitar fallos de build
      return {
        patients: [],
        total: 0,
      };
    }
  }

  /**
   * Obtiene un paciente por ID desde Supabase, incluyendo relaciones
   */
  static async getPatientById(id: string): Promise<Patient | null> {
    try {
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

      // 2. Obtener contacto de emergencia (1:1) - manejar caso sin contacto
      const { data: emergency_contact, error: emergencyError } = await supabase
        .from("emergency_contacts")
        .select("name, phone")
        .eq("patient_id", id)
        .single();

      // Si no hay contacto de emergencia (error PGRST116), es válido
      const emergencyContactData =
        emergencyError?.code === "PGRST116" ? null : emergency_contact;

      // 3. Obtener notas de contacto (1:N)
      const { data: contact_notes_data } = await supabase
        .from("contact_notes")
        .select("note")
        .eq("patient_id", id);

      // 4. Armar el objeto paciente extendido
      const patientWithRelations = this.buildPatientWithRelations(
        patient as Patient,
        emergencyContactData as EmergencyContact | null,
        contact_notes_data as ContactNote[] | null
      );

      // Debug: Log the data before validation
      console.log("Patient data before validation:", {
        id: patientWithRelations.id,
        emergency_contact: patientWithRelations.emergency_contact,
      });

      // 5. Validar con Zod
      return validatePatient(patientWithRelations);
    } catch (error) {
      console.error("Error in getPatientById:", error);
      return null;
    }
  }

  /**
   * Obtiene estadísticas calculadas desde Supabase
   */
  static async getStats() {
    try {
      const { data: patients, error } = await supabase
        .from("patients")
        .select("*");

      this.handleSupabaseError(error as SupabaseError | null);
      return calculatePatientStats(validatePatients(patients || []));
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Retornar estadísticas vacías en caso de error para evitar fallos de build
      return {
        statusDistribution: { active: 0, inactive: 0, deceased: 0 },
        geographicStats: [],
        demographicStats: { averageAge: 0, ageGroups: {} },
        genderDistribution: { male: 0, female: 0, other: 0, unknown: 0 },
      };
    }
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

  /**
   * Actualiza o crea un contacto de emergencia para un paciente
   */
  static async updateEmergencyContact(
    patientId: string,
    name: string,
    phone: string
  ) {
    try {
      // Verificar si ya existe un contacto de emergencia
      const { data: existingContact, error: fetchError } = await supabase
        .from("emergency_contacts")
        .select("id")
        .eq("patient_id", patientId)
        .limit(1);

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (existingContact && existingContact.length > 0) {
        // Actualizar contacto existente
        const contactId = existingContact[0].id;
        const { error: updateError } = await supabase
          .from("emergency_contacts")
          .update({ name, phone })
          .eq("id", contactId);

        if (updateError) {
          throw new Error(updateError.message);
        }
      } else {
        // Crear nuevo contacto
        const { error: insertError } = await supabase
          .from("emergency_contacts")
          .insert({ patient_id: patientId, name, phone });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * Actualiza o crea una nota de contacto para un paciente
   */
  static async updateContactNotes(patientId: string, contactNote: string) {
    try {
      // Verificar si ya existe una nota asociada al paciente
      const { data: existingNotes, error: fetchError } = await supabase
        .from("contact_notes")
        .select("id")
        .eq("patient_id", patientId)
        .limit(1);

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (existingNotes && existingNotes.length > 0) {
        // Actualizar nota existente
        const noteId = existingNotes[0].id;
        const { error: updateError } = await supabase
          .from("contact_notes")
          .update({ note: contactNote })
          .eq("id", noteId);

        if (updateError) {
          throw new Error(updateError.message);
        }
      } else {
        // Insertar nueva nota
        const { error: insertError } = await supabase
          .from("contact_notes")
          .insert({ patient_id: patientId, note: contactNote });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * Actualiza el status de un paciente
   */
  static async updatePatientStatus(patientId: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from("patients")
        .update({ status: newStatus })
        .eq("id", patientId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
  /**
   * Actualiza un campo específico de un paciente
   */
  static async updatePatientField(
    patientId: string,
    fieldName: string,
    value: string
  ) {
    try {
      // Validación básica por campo
      if (fieldName === "email" && value && value.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return {
            success: false,
            error: "Email inválido",
          };
        }
      }

      if (fieldName === "dni" && value && value.trim() !== "") {
        const dniRegex = /^\d{7,8}$/;
        if (!dniRegex.test(value)) {
          return {
            success: false,
            error: "DNI debe tener entre 7 y 8 dígitos",
          };
        }
      }

      if (fieldName === "phone" && value && value.trim() !== "") {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
          return {
            success: false,
            error: "Teléfono contiene caracteres inválidos",
          };
        }
      }

      if (fieldName === "name" && (!value || value.trim() === "")) {
        return {
          success: false,
          error: "El nombre es requerido",
        };
      }

      if (fieldName === "city" && (!value || value.trim() === "")) {
        return {
          success: false,
          error: "La ciudad es requerida",
        };
      }

      const updateData = { [fieldName]: value.trim() };

      const { error } = await supabase
        .from("patients")
        .update(updateData)
        .eq("id", patientId);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
