// src/app/(dashboard)/patients/[id]/page.tsx

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PatientStatus from "@/components/patients/status";
import { getPatientById } from "@/lib/data/placeholderdata";

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  // Obtenemos el paciente usando la función helper
  const patient = getPatientById(params.id);

  // Early return si no encontramos el paciente
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header con navegación */}
      <div className="mb-6">
        <Link
          href="/patients"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver a Pacientes
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
          <PatientStatus status={patient.status ?? "active"} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda - Datos actuales */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Datos Actuales
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Nombre
                </label>
                <p className="text-lg text-gray-900">{patient.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  DNI
                </label>
                <p className="text-lg text-gray-900">{patient.dni}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Fecha de Nacimiento
                </label>
                <p className="text-lg text-gray-900">{patient.date_of_birth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Fecha de Creación
                </label>
                <p className="text-lg text-gray-900">
                  {patient.createdAt ?? "No disponible"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Estado
                </label>
                <div className="mt-1">
                  <PatientStatus status={patient.status ?? "active"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
