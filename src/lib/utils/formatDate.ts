// src/lib/utils/formatDate.ts

/**
 * Formatea una fecha ISO string a formato local legible
 * @param dateStr - Fecha en formato ISO string
 * @param locale - Locale para el formateo (default: 'es-AR')
 * @returns Fecha formateada como string
 */
export default function formatDateToLocal(
  dateStr: string,
  locale: string = "es-AR"
): string {
  try {
    const date = new Date(dateStr);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "Fecha inválida";
  }
}

/**
 * Formatea una fecha a formato completo con hora
 * @param dateStr - Fecha en formato ISO string
 * @param locale - Locale para el formateo (default: 'es-AR')
 * @returns Fecha y hora formateada como string
 */
export function formatDateTimeToLocal(
  dateStr: string,
  locale: string = "es-AR"
): string {
  try {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error("Error al formatear fecha y hora:", error);
    return "Fecha inválida";
  }
}
