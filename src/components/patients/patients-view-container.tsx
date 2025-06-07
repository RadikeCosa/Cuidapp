// src/components/patients/patients-view-container.tsx
"use client";

import { useState } from "react";
import ViewToggle from "./view-toggle";
import PatientsTable from "./table";
import PatientsCompactCards from "./compact-cards";

type ViewType = "table" | "cards";

export default function PatientsViewContainer() {
  const [currentView, setCurrentView] = useState<ViewType>("table");

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="space-y-4">
      {/* Header con toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Pacientes
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Gestiona y visualiza la información de tus pacientes
          </p>
        </div>
        <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
      </div>

      {/* Renderizado condicional de vistas */}
      <div className="transition-all duration-300 ease-in-out">
        {currentView === "table" ? <PatientsTable /> : <PatientsCompactCards />}
      </div>
    </div>
  );
}
