import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import { formatGender } from "@/lib/utils/patient-utils";
import PatientStatus from "../shared/status";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

interface PatientInfoCardHeaderProps {
  patient: Patient;
}

export default function PatientInfoCardHeader({
  patient,
}: PatientInfoCardHeaderProps) {
  return (
    <div className="px-6 py-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src={patient.image_url ?? "/placeholder.jpg"}
            alt={`Foto de perfil de ${patient.name}`}
            width={80}
            height={80}
            className="rounded-full object-cover ring-4 ring-white/20"
          />
          <div className="absolute -bottom-2 -right-2">
            <PatientStatus status={patient.status} size="lg" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1
            className="text-l font-bold text-gray-900 mb-1 truncate"
            title={patient.name}
          >
            {patient.name}
          </h1>
          <p className="text-gray-700 text-sm">
            {formatAge(patient.date_of_birth)} ·{" "}
            {formatDateToLocal(patient.date_of_birth)}
          </p>
          <p className="text-gray-700 text-sm">
            DNI: {patient.dni || "Sin DNI"}
          </p>
          <p className="text-gray-700 text-xs">
            {formatGender(patient.gender)}
          </p>
        </div>
      </div>

      {/* Información de contacto básica */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Dirección</dt>
          <dd className="text-sm text-gray-900 truncate">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                [patient.address, patient.city].filter(Boolean).join(", ")
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              title={[patient.address, patient.city].filter(Boolean).join(", ")}
            >
              <MapPinIcon className="inline-block w-4 h-4 mr-1" />
              {[
                patient.address ?? "Sin dirección",
                patient.neighborhood,
                patient.city,
              ]
                .filter(Boolean)
                .join(", ")}
            </a>
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <dt className="sr-only">Teléfono</dt>
          <dd>
            {patient.phone ? (
              <a
                href={`tel:${patient.phone}`}
                className="inline-flex items-center text-blue-700 hover:underline text-sm font-mono"
              >
                <PhoneIcon className="inline-block w-4 h-4 mr-1" />
                {patient.phone}
              </a>
            ) : (
              <span className="text-gray-400 text-sm">Sin teléfono</span>
            )}
          </dd>
        </div>

        <div className="flex items-center gap-2">
          <dt className="sr-only">Correo electrónico</dt>
          <dd>
            {patient.email ? (
              <a
                href={`mailto:${patient.email}`}
                className="inline-flex items-center text-blue-700 hover:underline text-sm font-mono"
              >
                <AtSymbolIcon className="inline-block w-4 h-4 mr-1" />
                {patient.email}
              </a>
            ) : (
              <span className="text-gray-400 text-sm">Sin correo</span>
            )}
          </dd>
        </div>
      </div>
    </div>
  );
}
