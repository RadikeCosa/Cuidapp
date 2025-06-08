// src/app/(dashboard)/patients/error.tsx
"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Boundary automático de Next.js
 * Se muestra cuando hay un error en el Server Component
 */
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="space-y-6 ml-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Módulo Pacientes</h1>
        <p className="text-gray-600 mt-1">
          Gestiona toda la información de tus pacientes de manera eficiente
        </p>
      </div>

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
              Error al cargar los datos
            </h3>
            <p className="mt-1 text-sm text-red-700">
              {error.message ||
                "Ocurrió un error inesperado al cargar la información de los pacientes."}
            </p>
            <div className="mt-4">
              <button
                onClick={reset}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
