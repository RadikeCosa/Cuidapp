// src/components/patients/table.tsx

import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { patients } from "@/lib/data/placeholderdata";

export default function PatientsTable() {
  // Early return si no hay pacientes
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
          <tr className="bg-gray-100 text-left font-medium">
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">DNI</th>
            <th className="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t last:border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/patients/${patient.id}`}
                  className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                >
                  <Image
                    src={patient.image_url ?? "/placeholder.jpg"}
                    alt={`${patient.name}'s profile picture`}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900 hover:text-blue-600">
                    {patient.name}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3">
                <span className="text-gray-600">{patient.dni}</span>
              </td>
              <td className="px-4 py-3">
                <PatientStatus status={patient.status ?? "active"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
