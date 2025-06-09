// src/app/(dashboard)/patients/[id]/page.tsx
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PatientInfoCard from "@/components/patients/infoCard";
import { PatientsService } from "@/lib/services/patients-service";
import { notFound } from "next/navigation";

// Update the interface to match Next.js PageProps
interface PatientDetailPageProps {
  params: { id: string | string[] }; // Allow string or string[] for dynamic params
}

/**
 * ESTE ES UN SERVER COMPONENT
 * - Data fetching en el servidor
 * - Mejor SEO con contenido pre-renderizado
 * - Manejo automático de errores con error.tsx
 * - Loading automático con loading.tsx
 */
export default async function PatientDetailPage({
  params,
}: PatientDetailPageProps) {
  // Handle the case where params.id might be a string array
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Data fetching en Server Component
  const patient = await PatientsService.getPatientById(id);

  // Next.js maneja automáticamente el 404
  if (!patient) {
    notFound();
  }

  return (
    <div className="p-6 w-sm">
      <div className="mb-6">
        <Link
          href="/patients"
          className="inline-flex items-center text-blue-500 hover:text-blue-800 mb-4 font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver a Pacientes
        </Link>
      </div>

      {/* PatientInfoCard ahora es un Server Component */}
      <PatientInfoCard patient={patient} />
    </div>
  );
}
