// src/app/(dashboard)/patients/page.tsx
import CardWrapper from "@/components/ui/statsCardWrapper";
import PatientsViewContainer from "@/components/patients/patients-view-container";
import { PatientsService } from "@/lib/services/patients-service";
import { Suspense } from "react";

/**
 * ESTE ES UN SERVER COMPONENT
 * - Se ejecuta en el servidor
 * - Puede hacer data fetching directamente
 * - Se renderiza antes de enviar al cliente
 * - Mejor SEO y performance inicial
 */
export default async function PatientsPage() {
  // Data fetching en Server Component - se ejecuta en el servidor
  const patients = await PatientsService.getAllPatients();
  const stats = await PatientsService.getPatientsStats();

  return (
    <div className="space-y-6 ml-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Módulo Pacientes</h1>
        <p className="text-gray-600 mt-1">
          Gestiona toda la información de tus pacientes de manera eficiente
        </p>
      </div>

      {/* Suspense boundaries para componentes que podrían tener loading states */}
      <Suspense
        fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg" />}
      >
        <CardWrapper stats={stats} />
      </Suspense>

      {/* 
        PatientsViewContainer recibe los datos como props
        Esto permite que el Server Component haga el fetch
        y el Client Component maneje solo la interactividad
      */}
      <PatientsViewContainer patients={patients} />
    </div>
  );
}

/**
 * VENTAJAS DE ESTE PATRÓN:
 *
 * 1. **Server-First**: Los datos se cargan en el servidor
 * 2. **Mejor SEO**: El HTML inicial incluye los datos
 * 3. **Menos JavaScript**: El cliente recibe menos código
 * 4. **Streaming**: Next.js puede hacer streaming del contenido
 * 5. **Preparado para Cache**: Fácil agregar ISR o cache strategies
 */
