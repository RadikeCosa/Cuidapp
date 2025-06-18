// components/patients/stats-section.tsx
import { EnhancedStatsGrid } from "@/components/patients/enhanced-stats-cards";
import { PatientsService } from "@/lib/services/patients-service";

export async function StatsSection() {
  const stats = await PatientsService.getStats();
  return (
    <div>
      <EnhancedStatsGrid
        statusData={stats.statusDistribution}
        geographicData={stats.geographicStats}
        demographicData={stats.demographicStats}
        genderData={stats.genderDistribution}
      />
    </div>
  );
}
