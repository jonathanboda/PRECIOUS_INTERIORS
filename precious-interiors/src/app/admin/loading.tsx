export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-neutral-200 rounded mb-2" />
      <div className="h-4 w-32 bg-neutral-200 rounded mb-8" />
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-neutral-100 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
