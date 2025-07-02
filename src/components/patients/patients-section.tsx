// src/components/patients/patients-section.tsx
import { PatientsService } from "@/lib/services/patients-service";
import PatientsTable from "./table";
import Pagination from "./pagination";

interface PatientsSectionProps {
  searchParams?: Promise<{ page?: string }>;
}

export async function PatientsSection({ searchParams }: PatientsSectionProps) {
  // Await searchParams antes de acceder a sus propiedades
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const limit = 6;

  const { patients, total } = await PatientsService.getAllPatients(
    currentPage,
    limit
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <PatientsTable patients={patients} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
