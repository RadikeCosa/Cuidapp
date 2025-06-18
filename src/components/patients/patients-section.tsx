// components/patients/patients-section.tsx
import PatientsViewContainer from "@/components/patients/patients-view-container";
import { PatientsService } from "@/lib/services/patients-service";

interface PatientsSectionProps {
  searchParams?: { page?: string };
}

export async function PatientsSection({ searchParams }: PatientsSectionProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = 12;

  const { patients, total } = await PatientsService.getAllPatients(page, limit);

  return (
    <PatientsViewContainer
      patients={patients}
      total={total}
      currentPage={page}
      limit={limit}
    />
  );
}
