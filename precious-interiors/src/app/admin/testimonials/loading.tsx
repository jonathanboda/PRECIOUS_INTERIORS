export default function ProjectsLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-32 bg-neutral-200 rounded mb-2" />
          <div className="h-4 w-48 bg-neutral-200 rounded" />
        </div>
        <div className="h-10 w-32 bg-neutral-200 rounded" />
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-neutral-200">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-neutral-200 rounded" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 p-4 border-b border-neutral-100">
            <div className="h-12 w-16 bg-neutral-100 rounded" />
            <div className="h-4 w-full bg-neutral-100 rounded" />
            <div className="h-4 w-20 bg-neutral-100 rounded" />
            <div className="h-4 w-16 bg-neutral-100 rounded" />
            <div className="h-4 w-12 bg-neutral-100 rounded" />
            <div className="h-4 w-16 bg-neutral-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
