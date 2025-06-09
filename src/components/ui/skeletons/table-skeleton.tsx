// components/ui/skeletons/table-skeleton.tsx
import { BaseSkeleton } from "./base-skeleton";

interface TableSkeletonProps {
  rows?: number;
  showCounter?: boolean;
}

/**
 * Skeleton para vista de tabla
 * - Replica estructura exacta de la tabla real
 * - Diferentes intensidades para jerarquía visual
 */
export function TableSkeleton({
  rows = 5,
  showCounter = true,
}: TableSkeletonProps) {
  return (
    <div className="mt-6 overflow-x-auto">
      {/* Contador de resultados skeleton */}
      {showCounter && (
        <div className="mb-4">
          <BaseSkeleton className="h-4 w-32" intensity="light" />
        </div>
      )}

      {/* Header de tabla */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-3 py-2 mb-2 rounded-t-lg">
        <div className="flex gap-8">
          <BaseSkeleton className="h-3 w-16" intensity="medium" />
          <BaseSkeleton className="h-3 w-12" intensity="medium" />
          <BaseSkeleton className="h-3 w-14" intensity="medium" />
        </div>
      </div>

      {/* Filas de tabla */}
      <div className="bg-white divide-y divide-gray-100 rounded-b-lg border border-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`px-3 py-2 flex items-center gap-2 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
            }`}
          >
            {/* Avatar */}
            <BaseSkeleton
              className="w-8 h-8"
              rounded="full"
              intensity="light"
            />

            {/* Info del paciente */}
            <div className="flex-1 space-y-1">
              <BaseSkeleton className="h-4 w-32" intensity="medium" />
              <BaseSkeleton className="h-3 w-24" intensity="light" />
            </div>

            {/* Edad */}
            <BaseSkeleton className="h-4 w-12" intensity="light" />

            {/* Status badge */}
            <BaseSkeleton className="h-6 w-16 rounded-full" intensity="light" />
          </div>
        ))}
      </div>
    </div>
  );
}
