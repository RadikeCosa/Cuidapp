//src/components/ui/cardWrapper.tsx

import { Card } from "./statsCard";
import { PatientsStats } from "@/lib/services/patients-service";

interface CardWrapperProps {
  stats: PatientsStats;
}

export default function CardWrapper({ stats }: CardWrapperProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Card
        title="Pacientes Activos"
        value={stats.active}
        type="activePatients"
      />
      <Card
        title="Pacientes Inactivos"
        value={stats.inactive}
        type="inactivePatients"
      />
      <Card title="Paciente Más Anciano" value="85 años" type="oldestPatient" />
      <Card
        title="Paciente Activo mas Antiguo"
        value="1 año"
        type="longestPatient"
      />
    </div>
  );
}
