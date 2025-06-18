// src/components/patients/table.tsx
import type { Patient } from "@/lib/schema/patient.schema";
import EmptyPatientsMessage from "./empty-patients-message";
import PatientTableRow from "./patient-table-row";

interface PatientsTableProps {
  patients: Patient[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  if (patients.length === 0) {
    return <EmptyPatientsMessage />;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full text-sm text-gray-800">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
            <th className="px-3 py-2 text-xs uppercase tracking-wide">
              Paciente
            </th>
            <th className="px-3 py-2 text-xs uppercase tracking-wide">Edad</th>
            <th className="px-3 py-2 text-xs uppercase tracking-wide">
              Género
            </th>
            <th className="px-3 py-2 text-xs uppercase tracking-wide">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {patients.map((patient, index) => (
            <PatientTableRow
              key={patient.id}
              patient={patient}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
