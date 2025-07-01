import type { Patient } from "@/lib/schema/patient.schema";
import { PhoneIcon } from "@heroicons/react/24/outline";

interface EmergencyContactProps {
  emergencyContact?: Patient["emergency_contact"];
}

export default function EmergencyContact({
  emergencyContact,
}: EmergencyContactProps) {
  return (
    <div className="space-y-2 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900">
        Contacto de Emergencia
      </h3>
      {emergencyContact ? (
        <>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Nombre de contacto de emergencia</dt>
            <dd
              className="text-sm text-gray-900 truncate"
              title={emergencyContact.name}
            >
              {emergencyContact.name ?? "Sin nombre"}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Teléfono de emergencia</dt>
            <dd>
              {emergencyContact.phone ? (
                <a
                  href={`tel:${emergencyContact.phone}`}
                  className="inline-flex items-center text-blue-700 hover:underline text-sm font-mono"
                >
                  <PhoneIcon className="inline-block w-4 h-4 mr-1" />
                  {emergencyContact.phone}
                </a>
              ) : (
                <span className="text-gray-400 text-sm">Sin teléfono</span>
              )}
            </dd>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Nombre de contacto de emergencia</dt>
            <dd className="text-sm text-gray-400 italic">
              Sin nombre registrado
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Teléfono de emergencia</dt>
            <dd>
              <span className="inline-flex items-center text-gray-400 text-sm">
                <PhoneIcon className="inline-block w-4 h-4 mr-1" />
                Sin teléfono registrado
              </span>
            </dd>
          </div>
        </>
      )}
    </div>
  );
}
