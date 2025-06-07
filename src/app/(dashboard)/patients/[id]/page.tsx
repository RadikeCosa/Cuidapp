import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PatientStatus from "@/components/patients/status";
import { getPatientById } from "@/lib/data/placeholderdata";
import { formatDateToLocal, formatAge } from "@/lib/utils/dateUtils";
import PatientInfoCard from "@/components/patients/infoCard";

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const patient = getPatientById(params.id);

  if (!patient) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Paciente no encontrado
        </h1>
        <Link
          href="/patients"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          ← Volver a la lista de pacientes
        </Link>
      </div>
    );
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

      <PatientInfoCard patient={patient} />
    </div>
  );
}
