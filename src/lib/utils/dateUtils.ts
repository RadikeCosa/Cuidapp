/**
 * Verifica si una fecha en string ISO es válida.
 */
function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Convierte un string ISO en objeto Date válido o lanza un error.
 */
function parseDate(dateStr: string): Date {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error(`Fecha inválida: "${dateStr}"`);
  }
  return date;
}

/**
 * Formatea una fecha al estilo local sin hora.
 */
export function formatDateToLocal(
  dateStr: string,
  locale: string = "es-AR"
): string {
  try {
    const date = parseDate(dateStr);
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error(error);
    return "Fecha inválida";
  }
}

/**
 * Formatea una fecha al estilo local con hora.
 */
export function formatDateTimeToLocal(
  dateStr: string,
  locale: string = "es-AR"
): string {
  try {
    const date = parseDate(dateStr);
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error(error);
    return "Fecha inválida";
  }
}

/**
 * Calcula la edad a partir de la fecha de nacimiento.
 * Devuelve un objeto con años y meses para permitir formateos flexibles.
 */
export function calculateAge(
  birthDateStr: string
): { years: number; months: number } | null {
  try {
    const birthDate = parseDate(birthDateStr);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();

    if (days < 0) months--;
    if (months < 0) {
      years--;
      months += 12;
    }

    // Validación de rango razonable
    if (years < 0 || years > 150) {
      console.error("Edad fuera de rango:", years);
      return null;
    }

    return { years, months };
  } catch (error) {
    console.error("Error al calcular edad:", error);
    return null;
  }
}

/**
 * Formatea la edad en años o meses para mostrar al usuario.
 */
export function formatAge(birthDateStr: string): string {
  const age = calculateAge(birthDateStr);
  if (!age) return "Edad no disponible";

  const { years, months } = age;

  if (years === 0) {
    return `${months} mes${months !== 1 ? "es" : ""}`;
  }

  return `${years} año${years !== 1 ? "s" : ""}`;
}
