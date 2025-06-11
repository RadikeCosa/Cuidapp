// components/ui/skeletons/patient-detail-patterns.tsx
import { Skeleton } from "./skeleton";

/**
 * Skeleton para el header de la página de detalle del paciente
 * Incluye el breadcrumb "Volver a Pacientes"
 */
export function SkeletonPatientDetailHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Skeleton className="h-4 w-4 mr-2" /> {/* Icono arrow */}
        <Skeleton className="h-4 w-32" /> {/* "Volver a Pacientes" */}
      </div>
    </div>
  );
}

/**
 * Skeleton para la tarjeta principal del paciente
 * Replica la estructura exacta de PatientInfoCard
 */
export function SkeletonPatientInfoCard() {
  return (
    <section
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      aria-label="Cargando información del paciente"
    >
      {/* Header con gradiente - simulamos el fondo azul */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 px-6 py-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Avatar principal */}
            <Skeleton className="h-20 w-20 rounded-full" />
            {/* Badge de status */}
            <div className="absolute -bottom-2 -right-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            {/* Nombre */}
            <Skeleton className="h-6 w-48" />
            {/* Edad */}
            <Skeleton className="h-4 w-20" />
            {/* Fecha nacimiento */}
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Información personal */}
        <div className="space-y-4 mb-6">
          {/* Dirección */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Teléfono */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" /> {/* Icono */}
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" /> {/* Icono */}
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Contacto de emergencia */}
        <div className="space-y-4 border-t border-gray-200 pt-4 mb-6">
          <Skeleton className="h-4 w-40" />{" "}
          {/* Título "Contacto de Emergencia" */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" /> {/* Nombre */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" /> {/* Icono teléfono */}
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        {/* Notas de contacto */}
        <div className="space-y-2 border-t border-gray-200 pt-4 mb-8">
          <Skeleton className="h-4 w-32" /> {/* Título */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Botones de acción */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Primera fila de botones */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <Skeleton className="h-9 w-36 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-34 rounded-md" />
            </div>
            {/* Segunda fila de botones */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <Skeleton className="h-9 w-16 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Skeleton className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton completo para toda la página de detalle
 * Combina header + card en un solo componente
 */
export function SkeletonPatientDetailPage() {
  return (
    <div className="p-6 w-sm">
      <SkeletonPatientDetailHeader />
      <SkeletonPatientInfoCard />
    </div>
  );
}
