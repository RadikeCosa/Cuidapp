// components/patients/patients-view-container.tsx - VERSIÓN OPTIMIZADA
"use client";

import { useState, useTransition, Suspense } from "react";
import ViewToggle from "./view-toggle";
import PatientsTable from "./table";
import PatientsCompactCards from "./compact-cards";
import { ViewTransitionSkeleton } from "./suspense-wrappers";
import type { Patient } from "@/lib/schema/patient.schema";

type ViewType = "table" | "cards";

interface PatientsViewContainerProps {
  patients: Patient[];
}

// Componente que renderiza la vista actual con Suspense
function PatientsView({
  patients,
  view,
}: {
  patients: Patient[];
  view: ViewType;
}) {
  if (view === "table") {
    return <PatientsTable patients={patients} />;
  }
  return <PatientsCompactCards patients={patients} />;
}

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
      {/* Header fijo - no afectado por transitions */}
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

      {/* Contenido con Suspense y transiciones suaves */}
      <div className="min-h-[400px]">
        {" "}
        {/* Altura mínima para evitar layout shifts */}
        <Suspense
          fallback={
            <ViewTransitionSkeleton
              view={currentView}
              itemCount={patients.length}
            />
          }
        >
          <div
            className={`transition-all duration-300 ease-in-out ${
              isPending ? "opacity-50" : "opacity-100"
            }`}
          >
            <PatientsView patients={patients} view={currentView} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
