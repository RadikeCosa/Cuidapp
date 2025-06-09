// src/components/patients/view-toggle.tsx
"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

type ViewType = "table" | "cards";

interface ViewToggleProps {
  onViewChange: (view: ViewType) => void;
  currentView: ViewType;
  disabled?: boolean;
}

export default function ViewToggle({
  onViewChange,
  currentView,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => onViewChange("table")}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            currentView === "table"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
      >
        <List size={16} />
        <span className="hidden sm:inline">Lista</span>
      </button>
      <button
        onClick={() => onViewChange("cards")}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            currentView === "cards"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
      >
        <LayoutGrid size={16} />
        <span className="hidden sm:inline">Tarjetas</span>
      </button>
    </div>
  );
}
