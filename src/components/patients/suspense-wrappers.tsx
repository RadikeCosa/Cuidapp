// components/patients/suspense-wrappers.tsx
import { Suspense } from "react";
import {
  SkeletonStatCard,
  SkeletonTableRow,
  SkeletonPatientCard,
} from "@/components/ui/skeletons/patterns";
import { Skeleton } from "@/components/ui/skeletons/skeleton";

// Loading para Stats Grid
export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonStatCard key={i} />
      ))}
    </div>
  );
}

// Loading para Table View
export function TableViewSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Counter */}
      <Skeleton className="h-4 w-32" />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="flex gap-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Table Body */}
        <div className="bg-white divide-y divide-gray-100">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading para Cards View
export function CardsViewSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Counter */}
      <Skeleton className="h-4 w-32" />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonPatientCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Loading para View Toggle (transición entre vistas)
export function ViewTransitionSkeleton({
  view,
  itemCount,
}: {
  view: "table" | "cards";
  itemCount: number;
}) {
  return (
    <div className="transition-opacity duration-200 ease-in-out">
      {view === "table" ? (
        <TableViewSkeleton rows={Math.min(itemCount, 10)} />
      ) : (
        <CardsViewSkeleton count={Math.min(itemCount, 12)} />
      )}
    </div>
  );
}

// Wrapper con Suspense para componentes async
export function SuspenseWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
