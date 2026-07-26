export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-40 bg-slate-200 rounded-lg" />
          <div className="h-4 w-72 bg-slate-100 rounded mt-2" />
        </div>
        <div className="h-10 w-36 bg-slate-200 rounded-lg" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            <div className="h-36 bg-slate-100" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/3 bg-slate-100 rounded" />
              <div className="flex gap-2 pt-3 mt-3 border-t border-gray-100">
                <div className="h-7 w-16 bg-slate-100 rounded-lg" />
                <div className="h-7 w-18 bg-slate-100 rounded-lg ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
