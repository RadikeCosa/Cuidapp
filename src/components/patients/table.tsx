// src/components/patients/table.tsx
import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { formatAge } from "@/lib/utils/dateUtils";
import { patients } from "@/lib/data/placeholderdata";

export default function PatientsTable() {
  if (patients.length === 0) {
    return (
      <div className="mt-6 p-6 text-center text-gray-500">
        <p>No hay pacientes registrados</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
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
