// lib/services/patients-service.ts
import { Patient, PatientAnalytics } from "@/lib/schema/patient.schema";
import { patients } from "@/lib/data/placeholderdata";

/**
 * Servicio de pacientes mejorado con análisis avanzado
 * Abstrae la fuente de datos y proporciona insights analíticos
 */

// Simula delay de red para demostrar loading states
const simulateNetworkDelay = (ms: number = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class PatientsService {
  /**
   * Obtiene todos los pacientes
   * Futura implementación: fetch('/api/patients')
   */
  static async getAllPatients(): Promise<Patient[]> {
    await simulateNetworkDelay();

    // Simula posible error de red (5% probabilidad)
    if (Math.random() < 0.05) {
      throw new Error("Error de conexión con el servidor");
    }

    return patients;
  }

  /**
   * Obtiene un paciente por ID
   * Futura implementación: fetch(`/api/patients/${id}`)
   */
  static async getPatientById(id: string): Promise<Patient | null> {
    await simulateNetworkDelay();

    const patient = patients.find((p) => p.id === id);
    return patient || null;
  }

  /**
   * Obtiene estadísticas básicas de pacientes
   * Futura implementación: fetch('/api/patients/stats')
   */
  static async getPatientsStats() {
    await simulateNetworkDelay(100);

    return {
      total: patients.length,
      active: patients.filter((p) => p.status === "active").length,
      inactive: patients.filter((p) => p.status === "inactive").length,
      deceased: patients.filter((p) => p.status === "deceased").length,
    };
  }

  /**
   * NUEVO: Obtiene estadísticas de distribución por status
   * Análisis completo del pipeline de pacientes
   */
  static async getStatusDistribution(): Promise<StatusDistributionStats> {
    await simulateNetworkDelay(150);

    const statusCounts = {
      active: patients.filter((p) => p.status === "active").length,
      inactive: patients.filter((p) => p.status === "inactive").length,
      deceased: patients.filter((p) => p.status === "deceased").length,
    };

    const total = patients.length;
    const percentages = Object.entries(statusCounts).reduce(
      (acc, [status, count]) => {
        acc[status as keyof typeof statusCounts] =
          total > 0 ? Math.round((count / total) * 100) : 0;
        return acc;
      },
      {} as Record<keyof typeof statusCounts, number>
    );

    return {
      counts: statusCounts,
      percentages,
      total,
      dominant: Object.entries(statusCounts).reduce((a, b) =>
        statusCounts[a[0] as keyof typeof statusCounts] >
        statusCounts[b[0] as keyof typeof statusCounts]
          ? a
          : b
      )[0] as keyof typeof statusCounts,
    };
  }

  /**
   * NUEVO: Obtiene análisis geográfico de pacientes
   * Distribución por ciudades y barrios
   */
  static async getGeographicDistribution(): Promise<GeographicStats> {
    await simulateNetworkDelay(120);

    const cityDistribution = PatientAnalytics.groupByCity(patients);
    const topCities = Object.entries(cityDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const neighborhoodDistribution = patients.reduce((acc, patient) => {
      if (patient.neighborhood) {
        const key = `${patient.neighborhood}, ${patient.city}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCities: Object.keys(cityDistribution).length,
      cityDistribution,
      topCities: topCities.map(([city, count]) => ({ city, count })),
      neighborhoodDistribution,
      coverage: {
        withCity: patients.filter((p) => p.city).length,
        withNeighborhood: patients.filter((p) => p.neighborhood).length,
        total: patients.length,
      },
    };
  }

  /**
   * NUEVO: Obtiene análisis demográfico
   * Estadísticas de edad y distribución etaria
   */
  static async getDemographicStats(): Promise<DemographicStats> {
    await simulateNetworkDelay(180);

    const ageStats = PatientAnalytics.getAgeStats(patients);

    // Distribución por grupos etarios
    const ageGroups = patients.reduce((acc, patient) => {
      const age = PatientAnalytics.calculateAge(patient.date_of_birth);
      let group: string;

      if (age < 18) group = "0-17";
      else if (age < 30) group = "18-29";
      else if (age < 45) group = "30-44";
      else if (age < 60) group = "45-59";
      else if (age < 75) group = "60-74";
      else group = "75+";

      acc[group] = (acc[group] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      ageStats,
      ageGroups,
      totalWithAgeData: patients.filter((p) => p.date_of_birth).length,
      dominantAgeGroup: Object.entries(ageGroups).reduce((a, b) =>
        ageGroups[a[0]] > ageGroups[b[0]] ? a : b
      )[0],
    };
  }

  /**
   * NUEVO: Obtiene tendencias temporales
   * Análisis de crecimiento y patrones estacionales
   */
  static async getTemporalTrends(): Promise<TemporalTrendsStats> {
    await simulateNetworkDelay(200);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Pacientes creados este mes
    const thisMonth = patients.filter(
      (p) => p.createdAt && PatientAnalytics.isCreatedThisMonth(p.createdAt)
    ).length;

    // Pacientes creados el mes pasado
    const lastMonth = patients.filter((p) => {
      if (!p.createdAt) return false;
      const createdDate = new Date(p.createdAt);
      const lastMonthDate = new Date(currentYear, currentMonth - 1);
      return (
        createdDate.getMonth() === lastMonthDate.getMonth() &&
        createdDate.getFullYear() === lastMonthDate.getFullYear()
      );
    }).length;

    // Distribución por mes (últimos 12 meses)
    const monthlyDistribution: Record<string, number> = {};
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - i);
      const monthKey = date.toLocaleString("es-ES", {
        month: "short",
        year: "2-digit",
      });
      monthlyDistribution[monthKey] = patients.filter((p) => {
        if (!p.createdAt) return false;
        const createdDate = new Date(p.createdAt);
        return (
          createdDate.getMonth() === date.getMonth() &&
          createdDate.getFullYear() === date.getFullYear()
        );
      }).length;
    }

    // Cálculo de tendencia
    const trend =
      thisMonth > lastMonth ? "up" : thisMonth < lastMonth ? "down" : "stable";

    const changePercentage =
      lastMonth > 0
        ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100)
        : 0;

    return {
      thisMonth,
      lastMonth,
      trend,
      changePercentage: Math.abs(changePercentage),
      monthlyDistribution,
      averageMonthlyGrowth: Math.round(
        Object.values(monthlyDistribution).reduce((a, b) => a + b, 0) / 12
      ),
    };
  }

  /**
   * Busca pacientes por término
   * Futura implementación: fetch(`/api/patients/search?q=${query}`)
   */
  static async searchPatients(query: string): Promise<Patient[]> {
    await simulateNetworkDelay();

    if (!query.trim()) return patients;

    const lowercaseQuery = query.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowercaseQuery) ||
        patient.dni.includes(query) ||
        patient.city?.toLowerCase().includes(lowercaseQuery) ||
        patient.neighborhood?.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Tipos para mejor tipado
export type PatientsStats = Awaited<
  ReturnType<typeof PatientsService.getPatientsStats>
>;

export type StatusDistributionStats = {
  counts: Record<"active" | "inactive" | "deceased", number>;
  percentages: Record<"active" | "inactive" | "deceased", number>;
  total: number;
  dominant: "active" | "inactive" | "deceased";
};

export type GeographicStats = {
  totalCities: number;
  cityDistribution: Record<string, number>;
  topCities: Array<{ city: string; count: number }>;
  neighborhoodDistribution: Record<string, number>;
  coverage: {
    withCity: number;
    withNeighborhood: number;
    total: number;
  };
};

export type DemographicStats = {
  ageStats: {
    average: number;
    youngest: number;
    oldest: number;
  };
  ageGroups: Record<string, number>;
  totalWithAgeData: number;
  dominantAgeGroup: string;
};

export type TemporalTrendsStats = {
  thisMonth: number;
  lastMonth: number;
  trend: "up" | "down" | "stable";
  changePercentage: number;
  monthlyDistribution: Record<string, number>;
  averageMonthlyGrowth: number;
};

/**
 * VENTAJAS DE ESTA APROXIMACIÓN MEJORADA:
 *
 * 1. **Análisis Profundo**: Múltiples dimensiones de análisis
 * 2. **Tipado Fuerte**: Tipos específicos para cada tipo de estadística
 * 3. **Performance**: Cálculos optimizados con delays simulados
 * 4. **Escalabilidad**: Fácil agregar nuevos análisis
 * 5. **Mantenibilidad**: Separación clara de responsabilidades
 * 6. **Testabilidad**: Funciones puras en PatientAnalytics
 */
