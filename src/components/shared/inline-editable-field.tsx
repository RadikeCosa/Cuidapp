"use client";
import { useState } from "react";

interface InlineEditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
}

export default function InlineEditableField({
  value,
  onSave,
  placeholder = "Editar...",
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    console.log("Saving value:", currentValue);
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder={placeholder}
            className="border rounded px-2 py-1 text-sm w-full"
          />
          <button
            onClick={handleSave}
            className="text-green-500 hover:underline text-sm"
          >
            Confirmar
          </button>
          <button
            onClick={handleCancel}
            className="text-red-500 hover:underline text-sm"
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <span className="text-sm text-gray-900 truncate" title={value}>
            {value || placeholder}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:underline text-sm"
          >
            ✏️
          </button>
        </>
      )}
    </div>
  );
}
