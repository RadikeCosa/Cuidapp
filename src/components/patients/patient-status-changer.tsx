"use client";
import { useState } from "react";
import { updatePatientStatus } from "@/app/(dashboard)/patients/actions/update-status";
import { PatientStatus } from "@/lib/schema/patient.schema";
import { useRouter } from "next/navigation";

export function PatientStatusChanger({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: PatientStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function action(formData: FormData) {
    setSuccess(false);
    setError(null);
    const newStatus = formData.get("status") as PatientStatus;
    const res = await updatePatientStatus(id, newStatus);
    if (res.success) {
      setSuccess(true);
      setStatus(newStatus);
      router.refresh();
    } else {
      setError(res.error || "Error al actualizar estado");
    }
  }

  return (
    <form action={action} className="flex items-center gap-2">
      <label htmlFor="status" className="text-sm">
        Estado:
      </label>
      <select
        name="status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as PatientStatus)}
        className="border px-2 py-1 rounded text-sm"
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
        <option value="deceased">Fallecido</option>
      </select>
      <button
        type="submit"
        className="px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Cambiar
      </button>
      <span className="text-xs ml-2 min-w-[80px]">
        {success ? (
          <span className="text-green-600">¡Guardado!</span>
        ) : error ? (
          <span className="text-red-600">{error}</span>
        ) : null}
      </span>
    </form>
  );
}
