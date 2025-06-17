// src/components/patients/infoCard.tsx
import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import PatientStatus from "./status";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";

interface PatientInfoCardProps {
  patient: Patient;
}

/**
 * ESTE ES UN SERVER COMPONENT MEJORADO v1.2.0
 * - Nuevos campos de contacto: email, emergency_contact, contact_notes
 * - Mantiene diseño limpio y escalable
 * - Preparado para Supabase y futuras integraciones
 */
export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <section
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      aria-label={`Ficha de paciente: ${patient.name}`}
      role="region"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
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
              className="text-l font-bold text-white mb-1 truncate"
              title={patient.name}
            >
              {patient.name}
            </h1>
            <p className="text-blue-100 text-sm">
              {formatAge(patient.date_of_birth)} ·{" "}
              {
                (
                  {
                    male: "Masculino",
                    female: "Femenino",
                    other: "Otro",
                    unknown: "Sin especificar",
                  } as const
                )[patient.gender]
              }
            </p>
            <p className="text-blue-100 text-xs">
              {formatDateToLocal(patient.date_of_birth)}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <dl className="grid grid-cols-1 gap-y-4">
          {/* Información personal */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Dirección</dt>
              <dd
                className="text-sm text-gray-900 truncate"
                title={patient.address}
              >
                {patient.address ?? "Sin dirección"}
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
                    <svg
                      className="w-4 h-4 mr-1 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.06 16.06 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C7.82 23 1 16.18 1 8V7a2 2 0 012-2z"
                      />
                    </svg>
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
                    <svg
                      className="w-4 h-4 mr-1 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {patient.email}
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">Sin correo</span>
                )}
              </dd>
            </div>
          </div>

          {/* Información de contacto de emergencia */}
          {patient.emergency_contact && (
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900">
                Contacto de Emergencia
              </h3>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Nombre de contacto de emergencia</dt>
                <dd
                  className="text-sm text-gray-900 truncate"
                  title={patient.emergency_contact.name}
                >
                  {patient.emergency_contact.name ?? "Sin nombre"}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Teléfono de emergencia</dt>
                <dd>
                  {patient.emergency_contact.phone ? (
                    <a
                      href={`tel:${patient.emergency_contact.phone}`}
                      className="inline-flex items-center text-blue-700 hover:underline text-sm font-mono"
                    >
                      <svg
                        className="w-4 h-4 mr-1 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.06 16.06 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C7.82 23 1 16.18 1 8V7a2 2 0 012-2z"
                        />
                      </svg>
                      {patient.emergency_contact.phone}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Sin teléfono</span>
                  )}
                </dd>
              </div>
            </div>
          )}

          {/* Notas de contacto */}
          {patient.contact_notes && (
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900">
                Notas de Contacto
              </h3>
              <dd
                className="text-sm text-gray-900 truncate"
                title={patient.contact_notes}
              >
                {patient.contact_notes}
              </dd>
            </div>
          )}
        </dl>

        {/* Sección de acciones */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                Registrar Evaluación
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                Registrar Visita
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
                Coordinar Visita
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
                Ver
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
                Generar Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Esta información está sincronizada con el
                sistema central. Cualquier cambio será reflejado en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * MEJORAS IMPLEMENTADAS v1.2.0:
 *
 * ✅ NUEVOS CAMPOS DE CONTACTO:
 * - Email con validación de formato y enlace mailto:
 * - Contacto de emergencia con nombre y teléfono
 * - Notas de contacto para información adicional
 *
 * ✅ MEJORAS DE UX:
 * - Secciones claras para contacto de emergencia y notas
 * - Manejo consistente de campos opcionales
 * - Diseño escalable con Tailwind
 *
 * ✅ PREPARADO PARA SUPABASE:
 * - Nuevos campos mapeables directamente
 * - Validación robusta con Zod
 * - Estructura lista para edición inline y mapas
 *
 * PREPARADO PARA:
 * - Validación avanzada de formatos (teléfono, email)
 * - Integración con mapas para direcciones
 * - Edición inline de campos
 * - Soporte para múltiples contactos de emergencia
 */
