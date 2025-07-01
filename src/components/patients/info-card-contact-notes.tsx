"use client";

import InlineEditableField from "../shared/inline-editable-field";
import { updateContactNotes } from "@/app/(dashboard)/patients/actions/update-contact-notes";
import { useRouter } from "next/navigation";

interface ContactNotesProps {
  contactNotes?: string;
  patientId: string;
}

export default function ContactNotes({
  contactNotes,
  patientId,
}: ContactNotesProps & { patientId: string }) {
  const router = useRouter();

  const handleSave = async (newValue: string) => {
    const result = await updateContactNotes(patientId, newValue);
    if (result.success) {
      console.log("Contact note updated successfully");
      router.refresh();
    } else {
      console.error("Error updating contact note:", result.error);
    }
  };

  return (
    <div className="space-y-2 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900">Notas de Contacto</h3>
      <div className="group">
        <InlineEditableField
          value={contactNotes || "No hay notas de contacto registradas"}
          onSave={handleSave}
          placeholder="Editar notas de contacto"
        />
      </div>
    </div>
  );
}
