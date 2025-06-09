// components/ui/skeletons/stats-cards-skeleton.tsx
import { BaseSkeleton } from "./base-skeleton";

interface StatsCardsSkeletonProps {
  count?: number;
}

/**
 * Skeleton para las cards de estadísticas
 * - Replica exactamente el grid responsive
 * - Mantiene proporções y espaciado del contenido real
 */
export function StatsCardsSkeleton({ count = 4 }: StatsCardsSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Título de la stat */}
          <BaseSkeleton className="h-4 w-20 mb-2" intensity="light" />

          {/* Valor numérico */}
          <BaseSkeleton className="h-8 w-16" intensity="medium" />
        </div>
      ))}
    </div>
  );
}
