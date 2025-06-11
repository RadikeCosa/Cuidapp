// components/ui/skeletons/skeleton.tsx - ÚNICO COMPONENTE BASE
import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}
