"use client";
import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import { formatGender } from "@/lib/utils/patient-utils";
import PatientStatusEditable from "../shared/patient-status-editable";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";
import { PhoneIcon, AtSymbolIcon } from "@heroicons/react/24/outline";
import InlineEditableField from "../shared/inline-editable-field";
import { useRouter } from "next/navigation";
import { updatePatientFieldAction } from "@/app/(dashboard)/patients/actions/update-patient-data";
import AddressSection from "./info-card-address-section";

interface PatientInfoCardHeaderProps {
  patient: Patient;
}

export default function PatientInfoCardHeader({
  patient,
}: PatientInfoCardHeaderProps) {
  const router = useRouter();

  // Handler genérico para actualizar cualquier campo
  const handleFieldSave = async (
    field: string,
    value: string,
    label: string
  ) => {
    const result = await updatePatientFieldAction(patient.id, field, value);
    if (result.success) {
      router.refresh();
    } else {
      alert(`Error al actualizar ${label}: ${result.error}`);
    }
  };
  return (
    <div className="px-6 py-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src={patient.image_url ?? "/placeholder.jpg"}
            alt={`Foto de perfil de ${patient.name}`}
            width={80}
            height={80}
            className="rounded-full object-cover ring-4 ring-white/20"
          />
          <div className="absolute -bottom-2 -right-2">
            <PatientStatusEditable
              patientId={patient.id}
              status={patient.status}
              size="lg"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1 group">
            <InlineEditableField
              value={patient.name}
              onSave={(val) => handleFieldSave("name", val, "nombre")}
              placeholder="Editar nombre"
              variant="title"
            />
          </div>
          <p className="text-gray-700 text-sm">
            {formatAge(patient.date_of_birth)} ·{" "}
            {formatDateToLocal(patient.date_of_birth)}
          </p>
          <div className="group">
            <div className="flex items-center text-gray-700 text-sm">
              <span className="mr-2">DNI:</span>
              <InlineEditableField
                value={patient.dni || "Sin DNI"}
                onSave={(val) => handleFieldSave("dni", val, "DNI")}
                placeholder="Editar DNI"
                variant="small"
              />
            </div>
          </div>
          <p className="text-gray-700 text-xs">
            {formatGender(patient.gender)}
          </p>
        </div>
      </div>

      {/* Información de contacto básica */}
      <div className="space-y-2 mt-4">
        <AddressSection
          patient={patient}
          onSaveAddress={(val) => handleFieldSave("address", val, "dirección")}
          onSaveNeighborhood={(val) =>
            handleFieldSave("neighborhood", val, "barrio")
          }
          onSaveCity={(val) => handleFieldSave("city", val, "ciudad")}
        />

        <div className="group">
          <dt className="sr-only">Teléfono</dt>
          <dd className="flex items-center">
            <PhoneIcon className="inline-block w-4 h-4 mr-1 flex-shrink-0" />
            <InlineEditableField
              value={patient.phone || "Sin teléfono"}
              onSave={(val) => handleFieldSave("phone", val, "teléfono")}
              placeholder="Editar teléfono"
            />
          </dd>
        </div>

        <div className="group">
          <dt className="sr-only">Correo electrónico</dt>
          <dd className="flex items-center">
            <AtSymbolIcon className="inline-block w-4 h-4 mr-1 flex-shrink-0" />
            <InlineEditableField
              value={patient.email || "Sin correo"}
              onSave={(val) => handleFieldSave("email", val, "correo")}
              placeholder="Editar correo"
            />
          </dd>
        </div>
      </div>
    </div>
  );
}
