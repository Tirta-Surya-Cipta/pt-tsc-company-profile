export default function Loading() {
  return (
    <div className="p-6 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Stats/Controls Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="h-10 w-full sm:w-64 bg-slate-200 rounded-lg"></div>
        <div className="h-10 w-full sm:w-32 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 p-4">
          <div className="h-4 w-full bg-slate-200 rounded"></div>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
                <div>
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}