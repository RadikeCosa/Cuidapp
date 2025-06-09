// components/patients/patients-view-container.tsx (con loading states)
"use client";

import { useState, useTransition } from "react";
import ViewToggle from "./view-toggle";
import PatientsTable from "./table";
import PatientsCompactCards from "./compact-cards";
import { ViewSpecificSkeleton } from "@/components/ui/skeletons/view-specific-skeletons";
import type { Patient } from "@/lib/schema/patient.schema";

type ViewType = "table" | "cards";

interface PatientsViewContainerProps {
  patients: Patient[];
}

/**
 * Container con loading states granulares
 * - Loading específico para cambios de vista
 * - Transiciones suaves entre estados
 */
export default function PatientsViewContainer({
  patients,
}: PatientsViewContainerProps) {
  const [currentView, setCurrentView] = useState<ViewType>("table");
  const [isPending, startTransition] = useTransition();

  const handleViewChange = (view: ViewType) => {
    if (view === currentView) return;

    startTransition(() => {
      setCurrentView(view);
    });
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
        <ViewToggle
          currentView={currentView}
          onViewChange={handleViewChange}
          disabled={isPending}
        />
      </div>

      {/* Contenido con loading state granular */}
      {isPending ? (
        <ViewSpecificSkeleton view={currentView} itemCount={patients.length} />
      ) : (
        <div className="transition-all duration-300 ease-in-out">
          {currentView === "table" ? (
            <PatientsTable patients={patients} />
          ) : (
            <PatientsCompactCards patients={patients} />
          )}
        </div>
      )}
    </div>
  );
}
