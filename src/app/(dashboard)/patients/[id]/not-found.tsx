// src/app/(dashboard)/patients/[id]/not-found.tsx
/**
 * Página de 404 específica para pacientes
 * Se muestra automáticamente cuando se llama notFound()
 */
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Paciente no encontrado
        </h1>

        <p className="text-gray-600 mb-6">
          El paciente que buscas no existe o ha sido eliminado.
        </p>

        <Link
          href="/patients"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Volver a la lista de pacientes
        </Link>
      </div>
    </div>
  );
}
