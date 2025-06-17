// src/components/patients/EmptyPatientsMessage.tsx
export default function EmptyPatientsMessage() {
  return (
    <div className="mt-6 p-6 text-center text-gray-500">
      <div className="rounded-lg bg-gray-50 p-6">
        <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay pacientes registrados
        </h3>
        <p className="text-gray-500">Agrega tu primer paciente para comenzar</p>
      </div>
    </div>
  );
}
