"use client";
import { useState, useTransition } from "react";
import { updatePatientStatus } from "@/app/(dashboard)/patients/actions/update-status";
import { PatientStatus } from "@/lib/schema/patient.schema";

export function PatientStatusChanger({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: PatientStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newStatus = (form.elements.namedItem("status") as HTMLSelectElement)
      .value as "active" | "inactive" | "deceased";
    startTransition(async () => {
      const res = await updatePatientStatus(id, newStatus);
      if (res.success) {
        setStatus(newStatus);
        setError(null);
      } else {
        setError(res.error || "Error al actualizar estado");
      }
    });
  };
  return (
    <form onSubmit={handleStatusChange} className="flex gap-2 items-center">
      <select
        name="status"
        defaultValue={status}
        className="border rounded px-2 py-1"
        disabled={pending}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
        <option value="deceased">Fallecido</option>
      </select>
      <button type="submit" className="px-3 py-1" disabled={pending}>
        Cambiar Estado
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </form>
  );
}
