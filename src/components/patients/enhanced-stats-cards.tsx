// src/components/ui/enhanced-stats-cards.tsx
import React from "react";
import {
  UserGroupIcon,
  MapPinIcon,
  CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

// Tipos para las diferentes tarjetas
type BaseCardProps = {
  className?: string;
};

// 1. TARJETA DE DISTRIBUCIÓN POR STATUS
type StatusDistributionCardProps = BaseCardProps & {
  data: {
    counts: Record<"active" | "inactive" | "deceased", number>;
    percentages: Record<"active" | "inactive" | "deceased", number>;
    total: number;
    dominant: "active" | "inactive" | "deceased";
  };
};

export function StatusDistributionCard({
  data,
  className = "",
}: StatusDistributionCardProps) {
  const statusLabels = {
    active: "Activos",
    inactive: "Inactivos",
    deceased: "Fallecidos",
  };

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    deceased: "bg-gray-100 text-gray-800",
  };

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <UserGroupIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Distribución por Estado
          </h3>
          <p className="text-xs text-gray-500">{data.total} pacientes total</p>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(data.counts).map(([status, count]) => {
          const percentage =
            data.percentages[status as keyof typeof data.percentages];
          const isDominant = status === data.dominant;

          return (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[status as keyof typeof statusColors]
                  }`}
                >
                  {statusLabels[status as keyof typeof statusLabels]}
                </span>
                {isDominant && (
                  <span className="text-xs text-blue-600 font-medium">
                    Mayoría
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{count}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. TARJETA GEOGRÁFICA
type GeographicCardProps = BaseCardProps & {
  data: {
    totalCities: number;
    topCities: Array<{ city: string; count: number }>;
    coverage: {
      withCity: number;
      total: number;
    };
  };
};

export function GeographicCard({ data, className = "" }: GeographicCardProps) {
  const coveragePercentage = Math.round(
    (data.coverage.withCity / data.coverage.total) * 100
  );

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <MapPinIcon className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Distribución Geográfica
          </h3>
          <p className="text-xs text-gray-500">
            {data.totalCities} ciudades • {coveragePercentage}% con ubicación
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {data.topCities.slice(0, 3).map(({ city, count }, index) => (
          <div key={city} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  index === 0
                    ? "bg-emerald-500"
                    : index === 1
                    ? "bg-emerald-400"
                    : "bg-emerald-300"
                }`}
              />
              <span className="text-sm text-gray-700 truncate">{city}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{count}</span>
          </div>
        ))}
      </div>

      {data.topCities.length > 3 && (
        <p className="text-xs text-gray-500">
          +{data.totalCities - 3} ciudades más
        </p>
      )}
    </div>
  );
}

// 3. TARJETA DEMOGRÁFICA
type DemographicCardProps = BaseCardProps & {
  data: {
    ageStats: {
      average: number;
      youngest: number;
      oldest: number;
    };
    dominantAgeGroup: string;
    totalWithAgeData: number;
  };
};

export function DemographicCard({
  data,
  className = "",
}: DemographicCardProps) {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <ChartBarIcon className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Perfil Demográfico
          </h3>
          <p className="text-xs text-gray-500">
            Grupo dominante: {data.dominantAgeGroup} años
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {data.ageStats.average}
          </div>
          <div className="text-xs text-gray-500">Promedio</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {data.ageStats.youngest}
          </div>
          <div className="text-xs text-gray-500">Más joven</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data.ageStats.oldest}
          </div>
          <div className="text-xs text-gray-500">Mayor</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Datos de edad disponibles para {data.totalWithAgeData} pacientes
        </p>
      </div>
    </div>
  );
}

// 4. TARJETA DE TENDENCIAS TEMPORALES
type TemporalTrendsCardProps = BaseCardProps & {
  data: {
    thisMonth: number;
    lastMonth: number;
    trend: "up" | "down" | "stable";
    changePercentage: number;
    averageMonthlyGrowth: number;
  };
};

export function TemporalTrendsCard({
  data,
  className = "",
}: TemporalTrendsCardProps) {
  const TrendIcon =
    data.trend === "up"
      ? ArrowTrendingUpIcon
      : data.trend === "down"
      ? ArrowTrendingDownIcon
      : MinusIcon;

  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    stable: "text-gray-600 bg-gray-50",
  };

  const trendLabels = {
    up: "Crecimiento",
    down: "Decrecimiento",
    stable: "Estable",
  };

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-50 rounded-lg">
          <CalendarIcon className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Tendencia Mensual
          </h3>
          <p className="text-xs text-gray-500">Pacientes nuevos este período</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {data.thisMonth}
          </div>
          <div className="text-sm text-gray-500">Este mes</div>
        </div>

        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            trendColors[data.trend]
          }`}
        >
          <TrendIcon className="h-4 w-4" />
          <span className="text-sm font-medium">
            {data.trend !== "stable" && `${data.changePercentage}%`}
          </span>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <span className="text-gray-500">Mes anterior:</span>
          <span className="font-semibold text-gray-900 ml-1">
            {data.lastMonth}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Promedio:</span>
          <span className="font-semibold text-gray-900 ml-1">
            {data.averageMonthlyGrowth}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-600">
          Tendencia:{" "}
          <span className="font-medium">{trendLabels[data.trend]}</span>
        </p>
      </div>
    </div>
  );
}

// COMPONENTE WRAPPER PRINCIPAL
type EnhancedStatsGridProps = {
  statusData: StatusDistributionCardProps["data"];
  geographicData: GeographicCardProps["data"];
  demographicData: DemographicCardProps["data"];
  temporalData: TemporalTrendsCardProps["data"];
  className?: string;
};

export function EnhancedStatsGrid({
  statusData,
  geographicData,
  demographicData,
  temporalData,
  className = "",
}: EnhancedStatsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${className}`}
    >
      <StatusDistributionCard data={statusData} />
      <GeographicCard data={geographicData} />
      <DemographicCard data={demographicData} />
      <TemporalTrendsCard data={temporalData} />
    </div>
  );
}

/**
 * CARACTERÍSTICAS DE ESTOS COMPONENTES:
 *
 * 1. **Diseño Moderno**: Cards con bordes sutiles y sombras suaves
 * 2. **Iconografía Consistente**: Heroicons con colores temáticos
 * 3. **Información Densa**: Múltiples métricas por tarjeta
 * 4. **Responsive**: Adaptable a diferentes tamaños de pantalla
 * 5. **Tipado Fuerte**: Props específicos para cada tipo de datos
 * 6. **Accesibilidad**: Colores con buen contraste y estructura semántica
 * 7. **Visual Hierarchy**: Uso de tamaños de fuente y colores para priorizar información
 */
