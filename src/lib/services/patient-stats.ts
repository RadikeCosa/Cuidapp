import { Patient } from "@/lib/schema/patient.schema";

// --- CONSTANTES Y HELPERS CLEAN CODE ---
const VALID_STATUSES = ["active", "inactive", "deceased"] as const;
type StatusKey = (typeof VALID_STATUSES)[number];
const VALID_GENDERS = ["male", "female", "other", "unknown"] as const;
type GenderKey = (typeof VALID_GENDERS)[number];

function initCounts<T extends string>(keys: readonly T[]): Record<T, number> {
  return keys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<T, number>);
}

function calcPercentages<T extends string>(
  counts: Record<T, number>,
  total: number
): Record<T, number> {
  return Object.entries(counts).reduce((acc, [k, v]) => {
    acc[k as T] = total ? Math.round(((v as number) / total) * 100) : 0;
    return acc;
  }, {} as Record<T, number>);
}

function getDominantKey<T extends string>(
  counts: Record<T, number>,
  fallback: T
): T {
  const dominant = Object.entries(counts).sort(
    (a, b) => (b[1] as number) - (a[1] as number)
  )[0];
  return (dominant?.[0] as T) ?? fallback;
}

function calculateAge(birthDate: string, today: Date): number {
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  ) {
    age--;
  }
  return age;
}

/**
 * Calcula estadísticas a partir de un array de pacientes.
 */
export function calculatePatientStats(patients: Patient[]) {
  if (!patients || patients.length === 0) {
    return {
      statusDistribution: {
        counts: initCounts(VALID_STATUSES),
        percentages: initCounts(VALID_STATUSES),
        total: 0,
        dominant: "active" as StatusKey,
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
        counts: initCounts(VALID_GENDERS),
        percentages: initCounts(VALID_GENDERS),
        total: 0,
        dominant: "unknown" as GenderKey,
      },
    };
  }

  const statusCounts = initCounts(VALID_STATUSES);
  const genderCounts = initCounts(VALID_GENDERS);
  const cities = {} as Record<string, number>;
  let sumAges = 0,
    youngest = Infinity,
    oldest = -Infinity,
    withAge = 0;
  const today = new Date();

  for (const p of patients) {
    // Status
    if (VALID_STATUSES.includes(p.status as StatusKey)) {
      statusCounts[p.status as StatusKey]++;
    }
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
      const age = calculateAge(p.date_of_birth, today);
      sumAges += age;
      youngest = Math.min(youngest, age);
      oldest = Math.max(oldest, age);
      withAge++;
    }
  }

  const total = patients.length;
  const dominant = getDominantKey(statusCounts, "active");
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
  const genderPercentages = calcPercentages(genderCounts, genderTotal);
  const dominantGender = getDominantKey(genderCounts, "unknown");

  return {
    statusDistribution: {
      counts: statusCounts,
      percentages: calcPercentages(statusCounts, total),
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
