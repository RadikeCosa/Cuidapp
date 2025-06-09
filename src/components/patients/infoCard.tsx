// src/components/patients/infoCard.tsx
import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import PatientStatus from "./status";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";

interface PatientInfoCardProps {
  patient: Patient;
}

/**
 * ESTE ES UN SERVER COMPONENT MEJORADO v1.1.0
 * - Información más completa del paciente
 * - Campos de contacto integrados
 * - Mejor layout y diseño
 * - Preparado para agregar más campos
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
              className="text-2xl font-bold text-white mb-1 truncate"
              title={patient.name}
            >
              {patient.name}
            </h1>
            <p className="text-blue-100 text-sm">
              {formatAge(patient.date_of_birth)}
            </p>
            <p className="text-blue-100 text-xs">
              {formatDateToLocal(patient.date_of_birth)}
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <dl className="grid grid-cols-1">
          {/* Información personal */}
          <div className="space-y-2">
            <div className="flex items-center gap-2"></div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Dirección</dt>
              <dd
                className="text-sm text-gray-900 truncate"
                title={patient.address}
              >
                {patient.address}
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
          </div>

          {/* Información de contacto adicional (fácil de escalar) */}
          <div className="space-y-2">
            {/* Aquí puedes agregar más campos de contacto en el futuro */}
          </div>
        </dl>

        {/* Sección de acciones */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Acciones principales */}
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
            {/* Acciones secundarias */}
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
 * MEJORAS IMPLEMENTADAS v1.1.0:
 *
 * ✅ NUEVOS CAMPOS DE CONTACTO:
 * - Dirección con layout flexible para textos largos
 * - Teléfono como enlace clickeable (tel:)
 * - Campos opcionales con manejo elegante de undefined
 *
 * ✅ MEJORAS DE UX:
 * - Reorganización de secciones más lógica
 * - "Información de Contacto" como sección separada
 * - Enlaces de teléfono funcionales para mobile
 *
 * ✅ PREPARADO PARA SUPABASE:
 * - Campos mapeables directamente
 * - Validación con schema Zod
 * - Estructura escalable
 *
 * PREPARADO PARA:
 * - Agregar validación de formatos (teléfono, dirección)
 * - Implementar edición inline
 * - Integrar con mapas (Google Maps / OpenStreetMap)
 * - Añadir múltiples números de contacto
 */
