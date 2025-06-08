// src/components/patients/compact-cards.tsx
import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { formatAge } from "@/lib/utils/dateUtils";
import type { Patient } from "@/lib/schema/patient.schema";

interface PatientsCompactCardsProps {
  patients: Patient[];
}

/**
 * ESTE ES UN SERVER COMPONENT
 * - Solo renderiza datos, sin interactividad
 * - Se ejecuta en el servidor
 * - Recibe datos como props
 * - Mejor performance y SEO
 */
export default function PatientsCompactCards({
  patients,
}: PatientsCompactCardsProps) {
  if (patients.length === 0) {
    return (
      <div className="mt-6 p-8 text-center">
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay pacientes registrados
          </h3>
          <p className="text-gray-500">
            Agrega tu primer paciente para comenzar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Contador de resultados */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{patients.length}</span>{" "}
          pacientes
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {patients.map((patient, index) => (
          <Link
            key={patient.id}
            href={`/patients/${patient.id}`}
            className="group block"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 hover:-translate-y-1 relative overflow-hidden">
              {/* Contenido principal */}
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Avatar */}
                <div className="relative">
                  <Image
                    src={patient.image_url ?? "/placeholder.jpg"}
                    alt={`${patient.name}'s profile`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
                  />
                  {/* Badge de estado superpuesto */}
                  <div className="absolute -bottom-1 -right-1">
                    <PatientStatus
                      status={patient.status ?? "active"}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Información */}
                <div className="space-y-1 min-w-0 w-full">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate text-sm">
                    {patient.name}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">
                      {formatAge(patient.date_of_birth)}
                    </p>
                    <p className="text-xs text-gray-400">DNI: {patient.dni}</p>
                  </div>
                </div>
              </div>

              {/* Indicador hover */}
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
