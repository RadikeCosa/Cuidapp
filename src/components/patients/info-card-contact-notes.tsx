"use client";

import InlineEditableField from "../shared/inline-editable-field";

interface ContactNotesProps {
  contactNotes?: string;
}

export default function ContactNotes({ contactNotes }: ContactNotesProps) {
  const handleSave = (newValue: string) => {
    console.log("New contact notes:", newValue);
  };

  return (
    <div className="space-y-2 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900">Notas de Contacto</h3>
      <InlineEditableField
        value={contactNotes || "No hay notas de contacto registradas"}
        onSave={handleSave}
        placeholder="Editar notas de contacto"
      />
    </div>
  );
}
