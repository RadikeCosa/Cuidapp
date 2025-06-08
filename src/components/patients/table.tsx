// src/components/patients/table.tsx
import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { formatAge } from "@/lib/utils/dateUtils";
import type { Patient } from "@/lib/schema/patient.schema";

interface PatientsTableProps {
  patients: Patient[];
}

/**
 * ESTE ES UN SERVER COMPONENT
 * - Solo renderiza datos, sin interactividad
 * - Se ejecuta en el servidor
 * - Recibe datos como props
 * - Mejor performance y SEO
 */
export default function PatientsTable({ patients }: PatientsTableProps) {
  if (patients.length === 0) {
    return (
      <div className="mt-6 p-6 text-center text-gray-500">
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
    <div className="mt-6 overflow-x-auto">
      {/* Contador de resultados */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Mostrando <span className="font-medium">{patients.length}</span>{" "}
          pacientes
        </p>
      </div>

      <table className="w-full text-sm text-gray-800">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
            <th className="px-3 py-2 text-xs uppercase tracking-wide">
              Paciente
            </th>
            <th className="px-3 py-2 text-xs uppercase tracking-wide">Edad</th>
            <th className="px-3 py-2 text-xs uppercase tracking-wide">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className={`
                hover:bg-blue-50 transition-all duration-200 hover:shadow-sm
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
              `}
            >
              <td className="px-3 py-2">
                <Link
                  href={`/patients/${patient.id}`}
                  className="flex items-center gap-2 group"
                >
                  <div className="relative">
                    <Image
                      src={patient.image_url ?? "/placeholder.jpg"}
                      alt={`${patient.name}'s profile`}
                      width={32}
                      height={32}
                      className="rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors block truncate">
                      {patient.name}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      DNI: {patient.dni}
                    </span>
                  </div>
                </Link>
              </td>
              <td className="px-3 py-2">
                <span className="text-sm font-medium text-gray-700">
                  {formatAge(patient.date_of_birth)}
                </span>
              </td>
              <td className="px-3 py-2">
                <PatientStatus status={patient.status ?? "active"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
