// src/components/patients/status.tsx

export default function PatientStatus({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === "active"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "active" ? "Activo" : "No Activo"}
    </span>
  );
}
