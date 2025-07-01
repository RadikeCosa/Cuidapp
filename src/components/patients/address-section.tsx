"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import { Patient } from "@/lib/schema/patient.schema";
import InlineEditableField from "../shared/inline-editable-field";

interface AddressSectionProps {
  patient: Patient;
  onSaveAddress: (newValue: string) => void;
  onSaveNeighborhood: (newValue: string) => void;
  onSaveCity: (newValue: string) => void;
}

export default function AddressSection({
  patient,
  onSaveAddress,
  onSaveNeighborhood,
  onSaveCity,
}: AddressSectionProps) {
  const getGoogleMapsUrl = () => {
    const addressParts = [patient.address, patient.neighborhood, patient.city]
      .filter(Boolean)
      .join(", ");
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      addressParts
    )}`;
  };

  const renderAddressValue = (value: string) => {
    if (!value || value === "Sin dirección") {
      return <span className="text-sm text-gray-900">{value}</span>;
    }

    return (
      <a
        href={getGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-700 hover:underline"
        title="Ver en Google Maps"
      >
        {value}
      </a>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <dt className="sr-only">Dirección</dt>
      <dd className="text-sm text-gray-900 flex-1">
        <div className="flex items-start">
          <MapPinIcon className="inline-block w-4 h-4 mr-1 flex-shrink-0 mt-1" />
          <div className="flex flex-col gap-1 flex-1">
            <div className="group">
              <InlineEditableField
                value={patient.address || "Sin dirección"}
                onSave={onSaveAddress}
                placeholder="Editar dirección"
                renderValue={renderAddressValue}
              />
            </div>
            <div className="group">
              <InlineEditableField
                value={patient.neighborhood || "Sin barrio"}
                onSave={onSaveNeighborhood}
                placeholder="Editar barrio"
              />
            </div>
            <div className="group">
              <InlineEditableField
                value={patient.city || "Sin ciudad"}
                onSave={onSaveCity}
                placeholder="Editar ciudad"
              />
            </div>
          </div>
        </div>
      </dd>
    </div>
  );
}
