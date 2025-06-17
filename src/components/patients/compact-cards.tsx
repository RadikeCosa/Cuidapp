// src/components/patients/compact-cards.tsx
import Image from "next/image";
import Link from "next/link";
import PatientStatus from "@/components/patients/status";
import { formatAge } from "@/lib/utils/dateUtils";
import type { Patient } from "@/lib/schema/patient.schema";
import EmptyPatientsMessage from "./empty-patients-message";

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
    return <EmptyPatientsMessage />;
  }

  return (
    <div className="mt-6">
      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {patients.map((patient) => (
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
                      {formatAge(patient.date_of_birth)} ·{" "}
                      {patient.gender === "male"
                        ? "Masculino"
                        : patient.gender === "female"
                        ? "Femenino"
                        : patient.gender === "other"
                        ? "Otro"
                        : "Sin especificar"}
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
