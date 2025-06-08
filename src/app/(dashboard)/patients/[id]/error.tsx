// src/app/(dashboard)/patients/[id]/error.tsx
"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">
              Error al cargar el paciente
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {error.message || "Ocurrió un error inesperado."}
            </p>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={reset}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Intentar nuevamente
              </button>
              <Link
                href="/patients"
                className="bg-white hover:bg-gray-50 text-red-800 border border-red-200 px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Volver a pacientes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
