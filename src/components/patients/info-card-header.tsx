"use client";

import { formatAge, formatDateToLocal } from "@/lib/utils/dateUtils";
import { formatGender } from "@/lib/utils/patient-utils";
import PatientStatus from "../shared/status";
import type { Patient } from "@/lib/schema/patient.schema";
import Image from "next/image";
import { PhoneIcon, AtSymbolIcon } from "@heroicons/react/24/outline";
import InlineEditableField from "../shared/inline-editable-field";
import { useRouter } from "next/navigation";
import {
  updatePatientName,
  updatePatientDni,
  updatePatientPhone,
  updatePatientEmail,
  updatePatientAddress,
  updatePatientCity,
  updatePatientNeighborhood,
} from "@/app/(dashboard)/patients/actions/update-patient-data";
import AddressSection from "./address-section";

interface PatientInfoCardHeaderProps {
  patient: Patient;
}

export default function PatientInfoCardHeader({
  patient,
}: PatientInfoCardHeaderProps) {
  const router = useRouter();

  const handleSaveName = async (newValue: string) => {
    const result = await updatePatientName(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient name:", result.error);
      alert(`Error al actualizar el nombre: ${result.error}`);
    }
  };

  const handleSaveDni = async (newValue: string) => {
    const result = await updatePatientDni(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient DNI:", result.error);
      alert(`Error al actualizar el DNI: ${result.error}`);
    }
  };

  const handleSavePhone = async (newValue: string) => {
    const result = await updatePatientPhone(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient phone:", result.error);
      alert(`Error al actualizar el teléfono: ${result.error}`);
    }
  };

  const handleSaveEmail = async (newValue: string) => {
    const result = await updatePatientEmail(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient email:", result.error);
      alert(`Error al actualizar el correo: ${result.error}`);
    }
  };

  const handleSaveAddress = async (newValue: string) => {
    const result = await updatePatientAddress(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient address:", result.error);
      alert(`Error al actualizar la dirección: ${result.error}`);
    }
  };

  const handleSaveCity = async (newValue: string) => {
    const result = await updatePatientCity(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient city:", result.error);
      alert(`Error al actualizar la ciudad: ${result.error}`);
    }
  };

  const handleSaveNeighborhood = async (newValue: string) => {
    const result = await updatePatientNeighborhood(patient.id, newValue);
    if (result.success) {
      router.refresh();
    } else {
      console.error("Error updating patient neighborhood:", result.error);
      alert(`Error al actualizar el barrio: ${result.error}`);
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
            <PatientStatus status={patient.status} size="lg" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1 group">
            <InlineEditableField
              value={patient.name}
              onSave={handleSaveName}
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
                onSave={handleSaveDni}
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
          onSaveAddress={handleSaveAddress}
          onSaveNeighborhood={handleSaveNeighborhood}
          onSaveCity={handleSaveCity}
        />

        <div className="group">
          <dt className="sr-only">Teléfono</dt>
          <dd className="flex items-center">
            <PhoneIcon className="inline-block w-4 h-4 mr-1 flex-shrink-0" />
            <InlineEditableField
              value={patient.phone || "Sin teléfono"}
              onSave={handleSavePhone}
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
              onSave={handleSaveEmail}
              placeholder="Editar correo"
            />
          </dd>
        </div>
      </div>
    </div>
  );
}
