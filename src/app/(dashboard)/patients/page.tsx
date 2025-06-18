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
    <main className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <section aria-label="Lista de pacientes">
        <Suspense fallback={<PatientsListSkeleton />}>
          <PatientsSection searchParams={searchParams} />
        </Suspense>
      </section>
      <section aria-label="Estadísticas de pacientes">
        <Suspense fallback={<StatsGridSkeleton />}>
          <StatsSection />
        </Suspense>
      </section>
    </main>
  );
}
