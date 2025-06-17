// src/components/patients/PatientTableRow.tsx
import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { formatAge } from "@/lib/utils/dateUtils";
import type { Patient } from "@/lib/schema/patient.schema";

interface PatientTableRowProps {
  patient: Patient;
  className?: string;
  showGender?: boolean; // <--- agrega esto
}

export default function PatientTableRow({
  patient,
  className = "",
}: PatientTableRowProps) {
  return (
    <tr
      className={`
        hover:bg-blue-50 transition-all duration-200 hover:shadow-sm
        ${className}
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
        <span className="text-sm text-gray-700">
          {patient.gender === "male"
            ? "Masculino"
            : patient.gender === "female"
            ? "Femenino"
            : patient.gender === "other"
            ? "Otro"
            : "Sin especificar"}
        </span>
      </td>
      <td className="px-3 py-2">
        <PatientStatus status={patient.status ?? "active"} />
      </td>
    </tr>
  );
}
