// src/components/patients/patients-section.tsx
import { PatientsService } from "@/lib/services/patients-service";
import PatientsTable from "./table";
import PatientsCount from "./patient-count";
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Lista de Pacientes
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Gestiona y visualiza la información de tus pacientes
        </p>
      </div>

      {/* Contador */}
      <PatientsCount count={patients.length} />

      {/* Tabla */}
      <PatientsTable patients={patients} />

      {/* Paginación */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
