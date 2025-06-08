// src/app/(dashboard)/patients/[id]/loading.tsx
export default function PatientDetailLoading() {
  return (
    <div className="p-6 w-sm">
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
      </div>

      <div className="rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-6 bg-gray-100 rounded w-20 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-28 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
