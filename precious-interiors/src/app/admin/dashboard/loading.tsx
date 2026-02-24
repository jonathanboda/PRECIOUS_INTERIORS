export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-32 bg-neutral-200 rounded mb-2" />
        <div className="h-4 w-48 bg-neutral-200 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="h-4 w-20 bg-neutral-200 rounded mb-2" />
            <div className="h-8 w-12 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="h-6 w-32 bg-neutral-200 rounded mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-neutral-100 rounded" />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="h-6 w-40 bg-neutral-200 rounded mb-4" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-neutral-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
