// src/lib/utils/patientUtils.ts
export const formatGender = (gender: string): string => {
  const genderMap = {
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
    unknown: "Sin especificar",
  } as const;

  return genderMap[gender as keyof typeof genderMap] || "Sin especificar";
};
