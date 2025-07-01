"use client";
import type { Patient } from "@/lib/schema/patient.schema";
import InlineEditableField from "../shared/inline-editable-field";
import { updateEmergencyContact } from "@/app/(dashboard)/patients/actions/update-emergency-contact";
import { useRouter } from "next/navigation";

interface EmergencyContactProps {
  emergencyContact?: Patient["emergency_contact"];
}

export default function EmergencyContact({
  emergencyContact,
  patientId,
}: EmergencyContactProps & { patientId: string }) {
  const router = useRouter();

  const handleSaveName = async (newName: string) => {
    if (!patientId) {
      console.error("Error: patientId is undefined");
      return;
    }
    console.log("Updating emergency contact name:", { patientId, newName });
    const result = await updateEmergencyContact(
      patientId,
      newName,
      emergencyContact?.phone || ""
    );
    if (result.success) {
      console.log("Emergency contact name updated successfully");
      router.refresh();
    } else {
      console.error("Error updating emergency contact name:", result.error);
    }
  };

  const handleSavePhone = async (newPhone: string) => {
    if (!patientId) {
      console.error("Error: patientId is undefined");
      return;
    }
    console.log("Updating emergency contact phone:", { patientId, newPhone });
    const result = await updateEmergencyContact(
      patientId,
      emergencyContact?.name || "",
      newPhone
    );
    if (result.success) {
      console.log("Emergency contact phone updated successfully");
      router.refresh();
    } else {
      console.error("Error updating emergency contact phone:", result.error);
    }
  };

  return (
    <div className="space-y-2 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900">
        Contacto de Emergencia
      </h3>
      <div className="flex items-center gap-2">
        <dt className="sr-only">Nombre de contacto de emergencia</dt>
        <InlineEditableField
          value={emergencyContact?.name || "Sin nombre"}
          onSave={handleSaveName}
          placeholder="Editar nombre"
        />
      </div>
      <div className="flex items-center gap-2">
        <dt className="sr-only">Teléfono de emergencia</dt>
        <InlineEditableField
          value={emergencyContact?.phone || "Sin teléfono"}
          onSave={handleSavePhone}
          placeholder="Editar teléfono"
        />
      </div>
    </div>
  );
}
