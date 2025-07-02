// app/(dashboard)/patients/page.tsx
import { Suspense } from "react";
import { StatsSection } from "@/components/patients/stats-section";
import { PatientsSection } from "@/components/patients/patients-section";
import {
  StatsGridSkeleton,
  PatientsListSkeleton,
} from "@/components/ui/skeletons/skeletons";

export default function PatientsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Suspense fallback={<PatientsListSkeleton />}>
        <PatientsSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsSection />
      </Suspense>
    </main>
  );
}
