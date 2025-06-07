//src/app/(dashboard)/patients/page.tsx
import CardWrapper from "@/components/ui/statsCardWrapper";
import PatientsViewContainer from "@/components/patients/patients-view-container";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Módulo Pacientes</h1>
        <p className="text-gray-600 mt-1">
          Gestiona toda la información de tus pacientes de manera eficiente
        </p>
      </div>

      {/* Stats Cards */}
      <CardWrapper />

      {/* Patients View Container with Toggle */}
      <PatientsViewContainer />
    </div>
  );
}
