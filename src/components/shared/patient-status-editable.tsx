"use client";
import { useState } from "react";
import PatientStatus from "./status";
import { updatePatientStatus } from "@/app/(dashboard)/patients/actions/update-status";
import { useRouter } from "next/navigation";
import type { PatientStatus as PatientStatusType } from "@/lib/schema/patient.schema";

const statusOptions = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "deceased", label: "Fallecido" },
];

interface PatientStatusEditableProps {
  patientId: string;
  status: PatientStatusType;
  size?: "sm" | "md" | "lg";
}

export default function PatientStatusEditable({
  patientId,
  status,
  size = "md",
}: PatientStatusEditableProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const newStatus = e.target.value as PatientStatusType;
    const result = await updatePatientStatus(patientId, newStatus);
    setLoading(false);
    setEditing(false);
    if (result.success) {
      router.refresh();
    } else {
      alert("Error al actualizar el estado: " + result.error);
    }
  };

  return (
    <span className="relative">
      {editing ? (
        <select
          className="absolute left-0 top-0 z-10 rounded border px-2 py-1 text-xs shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={handleChange}
          onBlur={() => setEditing(false)}
          disabled={loading}
          autoFocus
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <span onClick={() => setEditing(true)} className="cursor-pointer group">
          <PatientStatus status={status} size={size} />
          <span className="absolute -right-2 -top-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            ✎
          </span>
        </span>
      )}
    </span>
  );
}
