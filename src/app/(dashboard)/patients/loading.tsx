export default function Loading() {
  return (
    <div className="space-y-6 ml-2">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-md w-64 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-md w-96 animate-pulse" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse" />
            <div className="h-8 bg-gray-100 rounded w-16 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Table/Cards skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-60 animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
