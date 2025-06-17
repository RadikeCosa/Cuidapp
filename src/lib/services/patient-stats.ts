import { Patient } from "@/lib/schema/patient.schema";

/**
 * Calcula estadísticas a partir de un array de pacientes.
 */
export function calculatePatientStats(patients: Patient[]) {
  if (!patients || patients.length === 0) {
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
  }

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
    if (p.createdAt) {
      const created = new Date(p.createdAt);
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
    changePercentage = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);
    trend =
      thisMonth > lastMonth ? "up" : thisMonth < lastMonth ? "down" : "stable";
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
        inactive: total ? Math.round((statusCounts.inactive / total) * 100) : 0,
        deceased: total ? Math.round((statusCounts.deceased / total) * 100) : 0,
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
