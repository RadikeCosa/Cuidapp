// src/components/patients/PatientsCount.tsx
interface PatientsCountProps {
  count: number;
}

export default function PatientsCount({ count }: PatientsCountProps) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600">
        Mostrando <span className="font-medium">{count}</span> pacientes
      </p>
    </div>
  );
}
