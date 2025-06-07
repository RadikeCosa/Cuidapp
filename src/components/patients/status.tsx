// src/components/patients/status.tsx
import type { PatientStatus as PatientStatusType } from "@/lib/schema/patient.schema";

interface PatientStatusProps {
  status?: PatientStatusType;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  active: {
    label: "Activo",
    color: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-400",
  },
  inactive: {
    label: "Inactivo",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-400",
  },
  deceased: {
    label: "Fallecido",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    dot: "bg-gray-400",
  },
};

const sizeConfig = {
  sm: {
    container: "px-2 py-0.5 text-xs",
    dot: "w-1.5 h-1.5",
  },
  md: {
    container: "px-2.5 py-1 text-xs",
    dot: "w-2 h-2",
  },
  lg: {
    container: "px-3 py-1.5 text-sm",
    dot: "w-2.5 h-2.5",
  },
};

export default function PatientStatus({
  status = "active",
  size = "md",
}: PatientStatusProps) {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${config.color} ${sizeStyles.container}
    `}
    >
      <span className={`rounded-full ${config.dot} ${sizeStyles.dot}`} />
      {size !== "sm" && config.label}
    </span>
  );
}
