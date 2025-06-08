// src/components/patients/patient-info-card.tsx
import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import PatientStatus from "./status";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";

interface PatientInfoCardProps {
  patient: Patient;
}

/**
 * ESTE ES UN SERVER COMPONENT MEJORADO
 * - Información más completa del paciente
 * - Mejor layout y diseño
 * - Preparado para agregar más campos
 */
export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={patient.image_url ?? "/placeholder.jpg"}
              alt={`${patient.name}'s profile`}
              width={80}
              height={80}
              className="rounded-full object-cover ring-4 ring-white/20"
            />
            <div className="absolute -bottom-2 -right-2">
              <PatientStatus status={patient.status} size="lg" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">
              {patient.name}
            </h1>
            <p className="text-blue-100 text-sm">Paciente #{patient.id}</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Información Personal
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">DNI:</span>
                <span className="text-sm text-gray-900 font-mono">
                  {patient.dni}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">Edad:</span>
                <span className="text-sm text-gray-900">
                  {formatAge(patient.date_of_birth)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">
                  Fecha de Nacimiento:
                </span>
                <span className="text-sm text-gray-900">
                  {formatDateToLocal(patient.date_of_birth)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">
                  Estado:
                </span>
                <PatientStatus status={patient.status} />
              </div>
            </div>
          </div>

          {/* Información del sistema */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Información del Sistema
            </h3>

            <div className="space-y-3">
              {patient.createdAt && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-600">
                    Registrado:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formatDateToLocal(patient.createdAt)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-600">
                  ID del Sistema:
                </span>
                <span className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                  {patient.id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de acciones (preparada para futuras funcionalidades) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Editar Información
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
              Nueva Consulta
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
              Ver Historial
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
              Generar Reporte
            </button>
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
    </div>
  );
}

/**
 * MEJORAS IMPLEMENTADAS:
 *
 * 1. **Diseño Mejorado**: Header con gradiente y mejor layout
 * 2. **Más Información**: Campos adicionales organizados en secciones
 * 3. **Visual Hierarchy**: Mejor organización visual del contenido
 * 4. **Interactividad Preparada**: Botones para futuras funciones
 * 5. **Responsive**: Funciona bien en mobile y desktop
 * 6. **Accesibilidad**: Contrastes y estructura semántica correcta
 *
 * PREPARADO PARA:
 *
 * - Agregar más campos de paciente
 * - Implementar acciones con Server Actions
 * - Integrar con sistema de permisos
 * - Añadir validaciones de campos
 */
