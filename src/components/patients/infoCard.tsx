import { formatDateToLocal, formatAge } from "@/lib/utils/dateUtils";
import PatientStatus from "./status";
import type { Patient } from "@/lib/schema/patient.schema";

interface PatientInfoCardProps {
  patient: Patient;
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <div className="rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col ">
      <div className="flex items-center  w-full justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
        <PatientStatus status={patient.status} />
      </div>
      <div className="flex flex-col  gap-3 w-full">
        <div className="flex flex-col  gap-1">
          {formatAge(patient.date_of_birth)}
        </div>
      </div>
    </div>
  );
}
