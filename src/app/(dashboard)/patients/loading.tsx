// app/(dashboard)/patients/loading.tsx - LOADING PAGE DE NEXT.JS
import { StatsGridSkeleton } from "@/components/ui/skeletons/skeletons";
import { Skeleton } from "@/components/ui/skeletons/skeleton";

/**
 * Loading page que Next.js muestra automáticamente
 * mientras carga la página completa
 */
export default function PatientsLoadingPage() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Stats Section Skeleton */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <StatsGridSkeleton />
      </div>

      {/* Patients Section Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  );
}
