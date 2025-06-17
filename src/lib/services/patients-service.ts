// lib/services/patients-service.ts
import { Patient } from "@/lib/schema/patient.schema";
import {
  validatePatients,
  validatePatient,
} from "@/lib/validators/patient-validator";
import { supabase } from "@/lib/supabase"; // ya lo tenés configurado

/**
 * Servicio de pacientes - Responsabilidad única: Acceso a datos
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
    const patientWithRelations = {
      ...patient,
      emergency_contact: emergency_contact || null,
      contact_notes:
        contact_notes_data && contact_notes_data.length > 0
          ? contact_notes_data.map((n) => n.note).join(" | ")
          : undefined,
    };

    // 5. Validar con Zod
    try {
      return validatePatient(patientWithRelations);
    } catch {
      return null;
    }
  }
  static async getStatsFromSupabase() {
    const { data: patients, error } = await supabase
      .from("patients")
      .select("*");

    if (error) throw new Error(error.message);
    if (!patients)
      return {
        statusDistribution: {
          counts: { active: 0, inactive: 0, deceased: 0 },
          percentages: { active: 0, inactive: 0, deceased: 0 },
          total: 0,
          dominant: "active" as "active",
        },
        geographicStats: {
          totalCities: 0,
          topCities: [],
          coverage: { withCity: 0, total: 0 },
        },
        demographicStats: {
          ageStats: { average: 0, youngest: 0, oldest: 0 },
          dominantAgeGroup: "N/A",
          totalWithAgeData: 0,
        },
        temporalTrends: {
          thisMonth: 0,
          lastMonth: 0,
          trend: "stable" as "stable",
          changePercentage: 0,
          averageMonthlyGrowth: 0,
        },
      };

    // Status
    const validStatuses = ["active", "inactive", "deceased"] as const;
    type StatusKey = (typeof validStatuses)[number];
    const statusCounts: Record<StatusKey, number> = {
      active: 0,
      inactive: 0,
      deceased: 0,
    };
    // Cities
    const cities = {} as Record<string, number>;
    // Age
    let sumAges = 0,
      youngest = Infinity,
      oldest = -Infinity,
      withAge = 0;
    const today = new Date();
    // Temporal
    let thisMonth = 0,
      lastMonth = 0;
    const months: Record<string, number> = {};

    for (const p of patients) {
      // Status
      if (validStatuses.includes(p.status as StatusKey)) {
        statusCounts[p.status as StatusKey]++;
      }
      // City
      if (p.city) cities[p.city] = (cities[p.city] || 0) + 1;
      // Age
      if (p.date_of_birth) {
        const birth = new Date(p.date_of_birth);
        const age =
          today.getFullYear() -
          birth.getFullYear() -
          (today <
          new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
            ? 1
            : 0);
        sumAges += age;
        youngest = Math.min(youngest, age);
        oldest = Math.max(oldest, age);
        withAge++;
      }
      // Temporal trends
      if (p.created_at) {
        const created = new Date(p.created_at);
        const key = `${created.getFullYear()}-${created.getMonth() + 1}`;
        months[key] = (months[key] || 0) + 1;
        if (
          created.getFullYear() === today.getFullYear() &&
          created.getMonth() === today.getMonth()
        )
          thisMonth++;
        if (
          created.getFullYear() === today.getFullYear() &&
          created.getMonth() === today.getMonth() - 1
        )
          lastMonth++;
      }
    }

    const total = patients.length;
    const dominantEntry = Object.entries(statusCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const dominant = (dominantEntry?.[0] as StatusKey) ?? "active";
    const topCities = Object.entries(cities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([city, count]) => ({ city, count }));
    const average = withAge ? Math.round(sumAges / withAge) : 0;
    let dominantAgeGroup = "N/A";
    if (average < 40) dominantAgeGroup = "0-39";
    else if (average < 65) dominantAgeGroup = "40-64";
    else if (average >= 65) dominantAgeGroup = "65+";
    // Temporal trends
    let trend: "up" | "down" | "stable" = "stable";
    let changePercentage = 0,
      averageMonthlyGrowth = 0;
    if (lastMonth > 0) {
      changePercentage = Math.round(
        ((thisMonth - lastMonth) / lastMonth) * 100
      );
      trend =
        thisMonth > lastMonth
          ? "up"
          : thisMonth < lastMonth
          ? "down"
          : "stable";
    }
    if (Object.keys(months).length > 1) {
      const totalMonths = Object.keys(months).length;
      averageMonthlyGrowth = Math.round(total / totalMonths);
    }

    return {
      statusDistribution: {
        counts: statusCounts,
        percentages: {
          active: total ? Math.round((statusCounts.active / total) * 100) : 0,
          inactive: total
            ? Math.round((statusCounts.inactive / total) * 100)
            : 0,
          deceased: total
            ? Math.round((statusCounts.deceased / total) * 100)
            : 0,
        },
        total,
        dominant,
      },
      geographicStats: {
        totalCities: Object.keys(cities).length,
        topCities,
        coverage: { withCity: Object.keys(cities).length, total },
      },
      demographicStats: {
        ageStats: {
          average,
          youngest: youngest === Infinity ? 0 : youngest,
          oldest: oldest === -Infinity ? 0 : oldest,
        },
        dominantAgeGroup,
        totalWithAgeData: withAge,
      },
      temporalTrends: {
        thisMonth,
        lastMonth,
        trend,
        changePercentage,
        averageMonthlyGrowth,
      },
    };
  }
}
