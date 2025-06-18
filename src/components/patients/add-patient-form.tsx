"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addPatientAction } from "@/app/(dashboard)/patients/add-patient/actions/actions";

export function AddPatientForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(addPatientAction, {
    success: false,
  });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success && state.id) {
      router.push(`/patients/${state.id}`);
    }
  }, [state, router]);

  return (
    <form className="space-y-5" action={formAction}>
      {/* Feedback general de error */}
      {state?.error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {state.error}
        </div>
      )}
      {/* Feedback de éxito */}
      {state.success && !state.error && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
          Paciente guardado correctamente.
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: Juan Pérez"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="dni">
          DNI <span className="text-red-500">*</span>
        </label>
        <input
          id="dni"
          name="dni"
          type="text"
          required
          maxLength={8}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: 12345678"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="date_of_birth"
        >
          Fecha de nacimiento <span className="text-red-500">*</span>
        </label>
        <input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="gender">
          Género <span className="text-red-500">*</span>
        </label>
        <select
          id="gender"
          name="gender"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
          <option value="unknown">Prefiero no decirlo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="city">
          Ciudad <span className="text-red-500">*</span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: Córdoba"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: Av. Siempre Viva 123"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium mb-1"
          htmlFor="neighborhood"
        >
          Barrio
        </label>
        <input
          id="neighborhood"
          name="neighborhood"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: Centro"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phone">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: 3511234567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ej: paciente@email.com"
        />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
          disabled={pending}
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Guardando...
            </span>
          ) : (
            "Guardar paciente"
          )}
        </button>
      </div>
    </form>
  );
}
