export default function StatusChangerSkeleton() {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <span className="text-sm text-gray-500">Estado:</span>
      <div className="h-8 w-24 bg-gray-200 rounded"></div>
      <div className="h-8 w-20 bg-gray-200 rounded"></div>
    </div>
  );
}
