// loading.tsx (actualizado)
import { PatientsPageSkeleton } from "@/components/ui/skeletons/patient-page-skeleton";

/**
 * Loading page mejorado
 * - Skeleton preciso que replica el contenido final
 * - Mejor experiencia de usuario con transiciones suaves
 */
export default function Loading() {
  return <PatientsPageSkeleton />;
}
