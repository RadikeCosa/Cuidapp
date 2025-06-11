// components/patients/stats-section.tsx
import { EnhancedStatsGrid } from "@/components/patients/enhanced-stats-cards";
import { PatientsService } from "@/lib/services/patients-service";

export async function StatsSection() {
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
