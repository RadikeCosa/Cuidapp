// components/ui/skeletons/base-skeleton.tsx
import { cn } from "@/lib/utils/cn";

interface BaseSkeletonProps {
  className?: string;
  animated?: boolean;
  intensity?: "light" | "medium" | "strong";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

/**
 * Componente skeleton base reutilizable
 * - Configuración flexible via props
 * - Diferentes intensidades de gris para jerarquía visual
 * - Animación opcional para performance
 */
export function BaseSkeleton({
  className,
  animated = true,
  intensity = "medium",
  rounded = "md",
}: BaseSkeletonProps) {
  const intensityClasses = {
    light: "bg-gray-100",
    medium: "bg-gray-200",
    strong: "bg-gray-300",
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        intensityClasses[intensity],
        roundedClasses[rounded],
        animated && "animate-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}
