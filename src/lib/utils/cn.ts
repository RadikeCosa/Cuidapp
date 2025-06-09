// lib/utils/cn.ts
/**
 * Utility function para combinar clases de CSS
 * Versión simplificada de clsx/classnames
 */
export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ").trim();
}
