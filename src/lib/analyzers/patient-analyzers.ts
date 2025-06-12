// lib/analyzers/patient-analyzers.ts
import { Patient } from "@/lib/schema/patient.schema";
import { calculateAge } from "@/lib/utils/dateUtils";

// 🆕 Función utilitaria compartida para encontrar el elemento dominante
class AnalyzerUtils {
  static findDominantKey<T extends Record<string, number>>(
    distribution: T
  ): keyof T {
    return Object.entries(distribution).reduce((a, b) =>
      distribution[a[0] as keyof T] > distribution[b[0] as keyof T] ? a : b
    )[0] as keyof T;
  }
}

export class StatusAnalyzer {
  static analyzeDistribution(patients: Patient[]) {
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

    const dominant = AnalyzerUtils.findDominantKey(statusCounts);
    return {
      counts: statusCounts,
      percentages,
      total,
      dominant,
    };
  }
}

export class GeographicAnalyzer {
  static analyzeDistribution(patients: Patient[]) {
    // Distribución por ciudades
    const cityDistribution = patients.reduce((acc, patient) => {
      if (patient.city) {
        acc[patient.city] = (acc[patient.city] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Top ciudades
    const topCities = Object.entries(cityDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([city, count]) => ({ city, count }));

    // Distribución por barrios
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
      topCities,
      neighborhoodDistribution,
      coverage: {
        withCity: patients.filter((p) => p.city).length,
        withNeighborhood: patients.filter((p) => p.neighborhood).length,
        total: patients.length,
      },
    };
  }
}

export class DemographicAnalyzer {
  // ✨ SIMPLIFICADO: Usando consistentemente calculateAge de dateUtils
  static analyzeAgeStats(patients: Patient[]) {
    const ages = patients
      .map((p) => {
        if (!p.date_of_birth) return null;
        const ageData = calculateAge(p.date_of_birth);
        return ageData ? ageData.years : null;
      })
      .filter((age): age is number => age !== null && age > 0);

    if (ages.length === 0) {
      return { average: 0, youngest: 0, oldest: 0 };
    }

    return {
      average: Math.round(
        ages.reduce((sum, age) => sum + age, 0) / ages.length
      ),
      youngest: Math.min(...ages),
      oldest: Math.max(...ages),
    };
  }

  static analyzeAgeGroups(patients: Patient[]) {
    return patients.reduce((acc, patient) => {
      if (!patient.date_of_birth) return acc;

      const ageData = calculateAge(patient.date_of_birth);
      if (!ageData) return acc;

      const age = ageData.years;
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
  }

  static analyzeDemographics(patients: Patient[]) {
    const patientsWithAge = patients.filter((p) => p.date_of_birth);
    const ageStats = DemographicAnalyzer.analyzeAgeStats(patients);
    const ageGroups = DemographicAnalyzer.analyzeAgeGroups(patients);

    return {
      ageStats,
      ageGroups,
      totalWithAgeData: patientsWithAge.length,
      dominantAgeGroup: AnalyzerUtils.findDominantKey(ageGroups),
    };
  }
}

export class TemporalAnalyzer {
  static isCreatedThisMonth(createdAt: string): boolean {
    const now = new Date();
    const createdDate = new Date(createdAt);
    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  }

  static analyzeTrends(patients: Patient[]) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Pacientes este mes
    const thisMonth = patients.filter(
      (p) => p.createdAt && TemporalAnalyzer.isCreatedThisMonth(p.createdAt)
    ).length;

    // Pacientes mes pasado
    const lastMonth = patients.filter((p) => {
      if (!p.createdAt) return false;
      const createdDate = new Date(p.createdAt);
      const lastMonthDate = new Date(currentYear, currentMonth - 1);
      return (
        createdDate.getMonth() === lastMonthDate.getMonth() &&
        createdDate.getFullYear() === lastMonthDate.getFullYear()
      );
    }).length;

    // Distribución mensual (últimos 12 meses)
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

    // Tendencia
    let trend: "up" | "down" | "stable";
    if (thisMonth > lastMonth) {
      trend = "up";
    } else if (thisMonth < lastMonth) {
      trend = "down";
    } else {
      trend = "stable";
    }

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
}
