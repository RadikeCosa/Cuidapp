"use client";
import { useFormState } from "react-dom";
import { addPatientAction } from "@/app/(dashboard)/patients/add-patient/actions/actions";

export function AddPatientForm() {
  const [state, formAction] = useFormState(addPatientAction, {
    success: false,
  });

  return (
    <form className="space-y-5" action={formAction}>
      {state?.error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
          {state.error}
        </div>
      )}
      {/* ...resto del formulario... */}
    </form>
  );
}
