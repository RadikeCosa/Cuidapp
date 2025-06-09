// components/ui/skeletons/patients-page-skeleton.tsx
import { BaseSkeleton } from "./base-skeleton";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";
import { TableSkeleton } from "./table-skeleton";

/**
 * Skeleton completo para la página de pacientes
 * - Jerarquía de carga: header → stats → contenido
 * - Transiciones escalonadas para mejor UX
 */
export function PatientsPageSkeleton() {
  return (
    <div className="space-y-6 ml-2">
      {/* Header skeleton */}
      <div className="space-y-2">
        <BaseSkeleton className="h-8 w-64" intensity="strong" />
        <BaseSkeleton className="h-4 w-96" intensity="light" />
      </div>

      {/* Stats cards skeleton con delay para efecto escalonado */}
      <div style={{ animationDelay: "150ms" }}>
        <StatsCardsSkeleton />
      </div>

      {/* Lista de pacientes skeleton */}
      <div style={{ animationDelay: "300ms" }} className="space-y-4">
        {/* Header de sección */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BaseSkeleton className="h-6 w-40" intensity="medium" />
            <BaseSkeleton className="h-4 w-60" intensity="light" />
          </div>
          <BaseSkeleton className="h-10 w-32 rounded-lg" intensity="light" />
        </div>

        {/* Contenido principal - por defecto tabla */}
        <TableSkeleton />
      </div>
    </div>
  );
}
