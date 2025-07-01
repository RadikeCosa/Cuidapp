"use client";
import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
            className="border rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="p-1 rounded text-green-600 hover:bg-green-100"
            title="Guardar"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded text-red-600 hover:bg-red-100"
            title="Cancelar"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <span
            className="text-sm text-gray-900 truncate cursor-default"
            title={value}
          >
            {value || placeholder}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded text-blue-600 hover:bg-blue-100"
            title="Editar"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
