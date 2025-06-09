// components/ui/skeletons/view-specific-skeleton.tsx
import { TableSkeleton } from "./table-skeleton";
import { CardsSkeleton } from "./card-skeleton";

interface ViewSpecificSkeletonProps {
  view: "table" | "cards";
  itemCount?: number;
}

/**
 * Skeleton que cambia según la vista seleccionada
 * - Transición suave entre diferentes tipos de skeleton
 * - Mantiene el mismo timing de animación
 */
export function ViewSpecificSkeleton({
  view,
  itemCount = view === "table" ? 5 : 8,
}: ViewSpecificSkeletonProps) {
  return (
    <div className="transition-all duration-300 ease-in-out">
      {view === "table" ? (
        <TableSkeleton rows={itemCount} />
      ) : (
        <CardsSkeleton count={itemCount} />
      )}
    </div>
  );
}
