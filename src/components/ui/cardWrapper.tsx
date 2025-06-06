import { Card } from "./card";

export default function CardWrapper() {
  // Placeholder for data fetching (you'll add logic later)
  // const { activePatients, inactivePatients, oldestPatient, totalCarePlans } = await fetchCareData();
  // For now, using dummy data for structure
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Card title="Pacientes Activos" value={50} type="activePatients" />
      <Card title="Pacientes Inactivos" value={20} type="inactivePatients" />
      <Card title="Paciente Más Anciano" value="85 años" type="oldestPatient" />
      <Card title="Planes de Cuidado" value={75} type="totalCarePlans" />
    </div>
  );
}
