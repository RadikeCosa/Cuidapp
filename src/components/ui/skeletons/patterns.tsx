import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils/cn";

// Patrón: Avatar con badge opcional
export function SkeletonAvatar({
  size = "md",
  showBadge = false,
}: {
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const badgeSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="relative">
      <Skeleton className={cn(sizeClasses[size], "rounded-full")} />
      {showBadge && (
        <Skeleton
          className={cn(
            badgeSizes[size],
            "absolute -bottom-1 -right-1 rounded-full"
          )}
        />
      )}
    </div>
  );
}

// Patrón: Líneas de texto
export function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  if (lines === 1) {
    return <Skeleton className={cn("h-4", className)} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full", // Última línea más corta
            className
          )}
        />
      ))}
    </div>
  );
}

// Patrón: Stat Card
export function SkeletonStatCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-6 w-20 rounded-full" />
            <div className="text-right space-y-1">
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Patrón: Patient Card
export function SkeletonPatientCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex flex-col items-center text-center space-y-3">
        <SkeletonAvatar size="lg" showBadge />
        <div className="space-y-1 w-full">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
          <Skeleton className="h-3 w-20 mx-auto" />
        </div>
      </div>
    </div>
  );
}

// Patrón: Table Row
export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 p-3">
      <SkeletonAvatar showBadge />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}
