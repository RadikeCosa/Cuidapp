import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PatientStatus from "@/components/patients/status";
import { getPatientById } from "@/lib/data/placeholderdata";

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
      {/* Header con navegación */}
      <div className="mb-6">
        <Link
          href="/patients"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver a Pacientes
        </Link>
      </div>

      {/* Card principal */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 mb-2 w-full justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <PatientStatus status={patient.status ?? "active"} />
        </div>
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-base text-gray-600 font-medium tracking-wide">
            DNI:{" "}
            <span className="text-gray-900 font-semibold">{patient.dni}</span>
          </span>
          <span className="text-base text-gray-600 font-medium tracking-wide">
            Nacimiento:{" "}
            <span className="text-gray-900 font-semibold">
              {patient.date_of_birth}
            </span>
          </span>
          <span className="text-sm text-gray-400 mt-2">
            Creado: {patient.createdAt ?? "No disponible"}
          </span>
        </div>
      </div>
    </div>
  );
}
