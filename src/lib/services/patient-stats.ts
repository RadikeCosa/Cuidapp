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
      genderDistribution: {
        counts: { male: 0, female: 0, other: 0, unknown: 0 },
        percentages: { male: 0, female: 0, other: 0, unknown: 0 },
        total: 0,
        dominant: "unknown" as "unknown",
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
  // Gender
  const validGenders = ["male", "female", "other", "unknown"] as const;
  type GenderKey = (typeof validGenders)[number];
  const genderCounts: Record<GenderKey, number> = {
    male: 0,
    female: 0,
    other: 0,
    unknown: 0,
  };
  // Cities
  const cities = {} as Record<string, number>;
  // Age
  let sumAges = 0,
    youngest = Infinity,
    oldest = -Infinity,
    withAge = 0;
  const today = new Date();

  for (const p of patients) {
    // Status
    if (validStatuses.includes(p.status as StatusKey)) {
      statusCounts[p.status as StatusKey]++;
    }
    // Gender
    // Gender
    let gender: GenderKey = "unknown";
    const genderValue = (p.gender || "").toString().toLowerCase();
    if (["male", "m", "masculino"].includes(genderValue)) gender = "male";
    else if (["female", "f", "femenino"].includes(genderValue))
      gender = "female";
    else if (["other", "otro"].includes(genderValue)) gender = "other";
    genderCounts[gender]++;
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

  // Gender stats
  const genderTotal = Object.values(genderCounts).reduce((a, b) => a + b, 0);
  const genderPercentages: Record<GenderKey, number> = {
    male: genderTotal ? Math.round((genderCounts.male / genderTotal) * 100) : 0,
    female: genderTotal
      ? Math.round((genderCounts.female / genderTotal) * 100)
      : 0,
    other: genderTotal
      ? Math.round((genderCounts.other / genderTotal) * 100)
      : 0,
    unknown: genderTotal
      ? Math.round((genderCounts.unknown / genderTotal) * 100)
      : 0,
  };
  const dominantGenderEntry = Object.entries(genderCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const dominantGender = (dominantGenderEntry?.[0] as GenderKey) ?? "unknown";

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
    genderDistribution: {
      counts: genderCounts,
      percentages: genderPercentages,
      total: genderTotal,
      dominant: dominantGender,
    },
  };
}
