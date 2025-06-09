// components/ui/skeletons/cards-skeleton.tsx
import { BaseSkeleton } from "./base-skeleton";

interface CardsSkeletonProps {
  count?: number;
  showCounter?: boolean;
}

/**
 * Skeleton para vista de cards compactas
 * - Grid responsive idéntico al componente real
 * - Estructura interna que replica cada card
 */
export function CardsSkeleton({
  count = 8,
  showCounter = true,
}: CardsSkeletonProps) {
  return (
    <div className="mt-6">
      {/* Contador de resultados skeleton */}
      {showCounter && (
        <div className="mb-4">
          <BaseSkeleton className="h-4 w-32" intensity="light" />
        </div>
      )}

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Avatar con badge */}
              <div className="relative">
                <BaseSkeleton
                  className="w-12 h-12"
                  rounded="full"
                  intensity="light"
                />
                {/* Badge de estado */}
                <div className="absolute -bottom-1 -right-1">
                  <BaseSkeleton
                    className="w-4 h-4"
                    rounded="full"
                    intensity="medium"
                  />
                </div>
              </div>

              {/* Información */}
              <div className="space-y-1 w-full">
                <BaseSkeleton className="h-4 w-24 mx-auto" intensity="medium" />
                <BaseSkeleton className="h-3 w-16 mx-auto" intensity="light" />
                <BaseSkeleton className="h-3 w-20 mx-auto" intensity="light" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
