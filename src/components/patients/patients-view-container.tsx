// src/components/patients/patients-view-container.tsx
"use client";

import { useState } from "react";
import ViewToggle from "./view-toggle";
import PatientsTable from "./table";
import PatientsCompactCards from "./compact-cards";
import type { Patient } from "@/lib/schema/patient.schema";

type ViewType = "table" | "cards";

interface PatientsViewContainerProps {
  patients: Patient[];
}

/**
 * ESTE ES UN CLIENT COMPONENT
 * - Solo maneja la interactividad del toggle
 * - Recibe datos como props desde el Server Component
 * - Mínimo JavaScript enviado al cliente
 * - Los datos ya están renderizados en el servidor
 */
export default function PatientsViewContainer({
  patients,
}: PatientsViewContainerProps) {
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

      {/* 
        Renderizado condicional de vistas
        Los componentes Table y Cards ahora son Server Components
        que reciben los datos como props
      */}
      <div className="transition-all duration-300 ease-in-out">
        {currentView === "table" ? (
          <PatientsTable patients={patients} />
        ) : (
          <PatientsCompactCards patients={patients} />
        )}
      </div>
    </div>
  );
}

/**
 * CAMBIOS CLAVE:
 *
 * 1. **Props en lugar de imports**: Los datos vienen como props
 * 2. **Responsabilidad única**: Solo maneja el estado del toggle
 * 3. **Composición**: Los componentes de vista son independientes
 * 4. **Preparado para Server Actions**: Fácil agregar mutaciones
 *
 * VENTAJAS:
 *
 * 1. **Menos JavaScript**: Solo la lógica de interacción va al cliente
 * 2. **Mejor Performance**: Los datos se renderizan en el servidor
 * 3. **SEO Friendly**: El contenido inicial está en el HTML
 * 4. **Hidratación Optimizada**: Menos trabajo en el cliente
 */
