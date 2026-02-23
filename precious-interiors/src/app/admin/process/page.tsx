import Link from 'next/link'
import { getProcessSteps } from '@/lib/queries/process'

export default async function ProcessPage() {
  const steps = await getProcessSteps()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Process Steps</h1>
        <p className="text-neutral-600 mt-1">Manage the design process timeline</p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">{step.title}</h3>
                  <p className="text-sm text-neutral-500">{step.subtitle}</p>
                  <p className="text-xs text-neutral-400 mt-1">{step.duration} • {step.cumulative_payment}% cumulative</p>
                </div>
              </div>
              <Link href={`/admin/process/${step.id}/edit`} className="text-sm text-primary-600 hover:text-primary-700">
                Edit
              </Link>
            </div>
            <div className="mt-4 pl-16">
              <p className="text-sm text-neutral-600">{step.description.slice(0, 150)}...</p>
              <p className="text-xs text-neutral-400 mt-2">{step.deliverables?.length || 0} deliverables</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
