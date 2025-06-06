import {
  UserGroupIcon,
  UserMinusIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

// Map of icons for different statistic types
const iconMap = {
  activePatients: UserGroupIcon, // For active patients
  inactivePatients: UserMinusIcon, // For inactive patients
  oldestPatient: UserIcon, // For oldest patient
  totalCarePlans: HeartIcon, // For total care plans or another metric
};

// Card component for displaying home care statistics
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string; // Flexible for numbers (counts) or strings (e.g., patient name or age)
  type:
    | "activePatients"
    | "inactivePatients"
    | "oldestPatient"
    | "totalCarePlans"; // Define allowed types
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
