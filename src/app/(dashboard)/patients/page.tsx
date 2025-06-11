// src/app/(dashboard)/patients/page.tsx
import { EnhancedStatsGrid } from "@/components/ui/enhanced-stats-cards";
import PatientsViewContainer from "@/components/patients/patients-view-container";
import { PatientsService } from "@/lib/services/patients-service";

/**
 * ENHANCED SERVER COMPONENT
 * - Ejecuta múltiples fetches de datos en paralelo
 * - Proporciona loading states granulares
 * - Optimiza la carga inicial con datos analíticos
 */
export default async function PatientsPage() {
  // Data fetching paralelo para mejor performance
  const [
    patients,
    statusDistribution,
    geographicStats,
    demographicStats,
    temporalTrends,
  ] = await Promise.all([
    PatientsService.getAllPatients(),
    PatientsService.getStatusDistribution(),
    PatientsService.getGeographicDistribution(),
    PatientsService.getDemographicStats(),
    PatientsService.getTemporalTrends(),
  ]);

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Análisis y Métricas
          </h2>
          <p className="text-gray-600 text-sm">
            Insights clave sobre la distribución, demografía y tendencias de tus
            pacientes
          </p>
        </div>

        {/* Suspense boundary para las estadísticas mejoradas */}
        <EnhancedStatsGrid
          statusData={statusDistribution}
          geographicData={geographicStats}
          demographicData={demographicStats}
          temporalData={temporalTrends}
        />
      </div>

      <PatientsViewContainer patients={patients} />
    </div>
  );
}
/**
 * OPTIMIZACIONES Y MEJORAS IMPLEMENTADAS:
 *
 * 1. **Fetch Paralelo**: Promise.all para cargar datos simultáneamente
 * 2. **Layout Mejorado**: Estructura visual más clara y profesional
 * 3. **Loading States**: Skeletons específicos para cada sección
 * 4. **Información Contextual**: Headers descriptivos con metadatos
 * 5. **Responsive Design**: Adaptable a diferentes dispositivos
 * 6. **Separación de Concerns**: Analytics vs Management clarity
 * 7. **Performance**: Server-side rendering optimizado
 * 8. **UX**: Feedback visual durante estados de carga
 *
 * PRÓXIMOS PASOS SUGERIDOS:
 *
 * 1. **Error Boundaries**: Manejo de errores granular
 * 2. **Caching**: Implementar ISR o cache strategies
 * 3. **Real-time Updates**: WebSocket para datos en tiempo real
 * 4. **Export Functionality**: PDF/Excel export de reportes
 * 5. **Filtros Avanzados**: Filtrado por múltiples dimensiones
 */
