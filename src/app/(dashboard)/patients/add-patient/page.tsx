import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AddPatientForm } from "@/components/patients/add-patient-form";

export default function AddPatientsPage() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <div className="mb-6">
        <Link
          href="/patients"
          className="inline-flex items-center text-blue-500 hover:text-blue-800 font-medium"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver a Pacientes
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Agregar paciente</h1>
      <AddPatientForm />
    </div>
  );
}
