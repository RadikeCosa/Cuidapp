"use client";
import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface InlineEditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  variant?: "default" | "title" | "small";
  className?: string;
  renderValue?: (value: string) => React.ReactNode;
  type?: "text" | "date" | "select";
  options?: { label: string; value: string }[];
}

export default function InlineEditableField({
  value,
  onSave,
  placeholder = "Editar...",
  variant = "default",
  className = "",
  renderValue,
  type = "text",
  options = [],
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

  // Estilos basados en la variante
  const getTextStyles = () => {
    switch (variant) {
      case "title":
        return "text-lg font-bold text-gray-900 truncate cursor-default";
      case "small":
        return "text-xs text-gray-700 truncate cursor-default";
      default:
        return "text-sm text-gray-900 truncate cursor-default";
    }
  };

  const getInputStyles = () => {
    switch (variant) {
      case "title":
        return "border rounded px-2 py-1 text-lg font-bold flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500";
      case "small":
        return "border rounded px-2 py-1 text-xs flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500";
      default:
        return "border rounded px-2 py-1 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500";
    }
  };

  const getButtonSize = () => {
    switch (variant) {
      case "title":
        return "w-5 h-5";
      case "small":
        return "w-4 h-4";
      default:
        return "w-4 h-4";
    }
  };

  const getButtonPadding = () => {
    switch (variant) {
      case "title":
        return "p-1";
      case "small":
        return "p-0.5";
      default:
        return "p-1";
    }
  };

  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          {type === "select" ? (
            <select
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className={getInputStyles()}
              autoFocus
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={placeholder}
              className={getInputStyles()}
              autoFocus
            />
          )}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleCancel}
              className={`${getButtonPadding()} rounded text-red-600 hover:bg-red-100`}
              title="Cancelar"
            >
              <XMarkIcon className={getButtonSize()} />
            </button>
            <button
              onClick={handleSave}
              className={`${getButtonPadding()} rounded text-green-600 hover:bg-green-100`}
              title="Guardar"
            >
              <CheckIcon className={getButtonSize()} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {renderValue ? (
            <div className="flex-1">{renderValue(value)}</div>
          ) : (
            <span className={getTextStyles()} title={value}>
              {value || placeholder}
            </span>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className={`${getButtonPadding()} rounded text-blue-600 hover:bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2`}
            title="Editar"
          >
            <PencilIcon className={getButtonSize()} />
          </button>
        </>
      )}
    </div>
  );
}
