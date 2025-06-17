// lib/services/patients-service.ts
import { Patient } from "@/lib/schema/patient.schema";
import {
  validatePatients,
  validatePatient,
} from "@/lib/validators/patient-validator";
import { supabase } from "@/lib/supabase"; // ya lo tenés configurado

/**
 * Servicio de pacientes - Responsabilidad única: Acceso a datos
 * Solo se encarga de obtener y buscar pacientes, sin procesar estadísticas
 */
// ...existing code...
const API_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export class PatientsService {
  static async getAllPatients(): Promise<Patient[]> {
    const res = await fetch(`${API_URL}/patients`, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener pacientes");
    const data = await res.json();
    return validatePatients(data); // sigue usando Zod
  }

  static async getPatientById(id: string): Promise<Patient | null> {
    const res = await fetch(`${API_URL}/patients/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    try {
      return validatePatient(data);
    } catch {
      return null;
    }
  }

  static async searchPatients(query: string): Promise<Patient[]> {
    const res = await fetch(
      `${API_URL}/patients?q=${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Error al buscar pacientes");
    const data = await res.json();
    return validatePatients(data);
  }
  static async getStats() {
    const res = await fetch(`${API_URL}/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudieron obtener las estadísticas");
    return res.json();
  }
  static async getAllPatientsFromSupabase(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    // Validá con Zod como ya hacés
    return validatePatients(data || []);
  }

  /**
   * Obtiene un paciente por ID desde Supabase
   */
  static async getPatientByIdFromSupabase(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      // Si no existe, devolvé null (no tires error)
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }
    try {
      return validatePatient(data);
    } catch {
      return null;
    }
  }
}
