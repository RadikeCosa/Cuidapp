"use client";
import React, { useState, useRef } from "react";

type EditableFieldProps = {
  value: string;
  type?: "text" | "email" | "tel";
  label?: string;
  placeholder?: string;
  onSave?: (newValue: string) => Promise<void> | void;
  validate?: (value: string) => string | null; // retorna mensaje de error o null
  className?: string;
};

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  type = "text",
  label,
  placeholder,
  onSave,
  validate,
  className = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cuando cambia la prop value desde afuera, actualiza el inputValue si no está editando
  React.useEffect(() => {
    if (!editing) setInputValue(value);
  }, [value, editing]);

  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCancel = () => {
    setInputValue(value);
    setError(null);
    setEditing(false);
  };

  const handleSave = async () => {
    const validationError = validate?.(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSave?.(inputValue);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1200);
      setEditing(false);
    } catch (e: any) {
      setError(e?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {label && (
        <label className="block text-xs mb-1 text-gray-500">{label}</label>
      )}
      {!editing ? (
        <div
          className="flex items-center min-h-[2.5rem] cursor-pointer rounded px-2 hover:bg-gray-100 transition"
          tabIndex={0}
          role="button"
          aria-label={`Editar ${label || "campo"}`}
          onClick={handleEdit}
          onKeyDown={(e) => (e.key === "Enter" ? handleEdit() : undefined)}
        >
          <span className="flex-1 text-gray-800">
            {value || <span className="text-gray-400">{placeholder}</span>}
          </span>
          {/* Lápiz visible solo en hover */}
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              width={18}
              height={18}
              fill="none"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                d="M14.7 2.3a1 1 0 0 1 1.4 1.4l-9.1 9.1-2 2a1 1 0 0 0-.3.6l-.3 2.3a.5.5 0 0 0 .6.6l2.3-.3a1 1 0 0 0 .6-.3l2-2 9.1-9.1a1 1 0 0 0-1.4-1.4l-9.1 9.1-2 2"
                stroke="#888"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          {success && <span className="ml-2 text-green-500 text-xs">✓</span>}
        </div>
      ) : (
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            ref={inputRef}
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-blue-400"
            placeholder={placeholder}
            aria-label={label}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button
            type="submit"
            className="px-2 py-1 text-blue-600 hover:underline disabled:opacity-50"
            disabled={loading}
            aria-label="Guardar"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="px-2 py-1 text-gray-500 hover:underline"
            onClick={handleCancel}
            disabled={loading}
            aria-label="Cancelar"
          >
            Cancelar
          </button>
        </form>
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default EditableField;
