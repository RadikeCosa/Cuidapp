// app/(dashboard)/patients/page.tsx - VERSIÓN OPTIMIZADA CON SUSPENSE
import { Suspense } from "react";
import { EnhancedStatsGrid } from "@/components/ui/enhanced-stats-cards";
import PatientsViewContainer from "@/components/patients/patients-view-container";
import {
  StatsGridSkeleton,
  SuspenseWrapper,
} from "@/components/patients/suspense-wrappers";
import { PatientsService } from "@/lib/services/patients-service";

// Componente async para las estadísticas
async function StatsSection() {
  const [
    statusDistribution,
    geographicStats,
    demographicStats,
    temporalTrends,
  ] = await Promise.all([
    PatientsService.getStatusDistribution(),
    PatientsService.getGeographicDistribution(),
    PatientsService.getDemographicStats(),
    PatientsService.getTemporalTrends(),
  ]);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Análisis y Métricas
        </h2>
        <p className="text-gray-600 text-sm">
          Insights clave sobre la distribución, demografía y tendencias de tus
          pacientes
        </p>
      </div>

      <EnhancedStatsGrid
        statusData={statusDistribution}
        geographicData={geographicStats}
        demographicData={demographicStats}
        temporalData={temporalTrends}
      />
    </div>
  );
}

// Componente async para la lista de pacientes
async function PatientsSection() {
  const patients = await PatientsService.getAllPatients();

  return <PatientsViewContainer patients={patients} />;
}

// Página principal con Suspense boundaries
export default function PatientsPage() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Estadísticas con loading independiente */}
      <SuspenseWrapper fallback={<StatsGridSkeleton />}>
        <StatsSection />
      </SuspenseWrapper>

      {/* Lista de pacientes con loading independiente */}
      <SuspenseWrapper
        fallback={
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-60 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        }
      >
        <PatientsSection />
      </SuspenseWrapper>
    </div>
  );
}

// Configuración de Next.js para optimización
export const dynamic = "force-dynamic"; // Para datos en tiempo real
export const fetchCache = "force-no-store"; // Evita cache en desarrollo
