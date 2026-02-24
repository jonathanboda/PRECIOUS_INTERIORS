import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProcessStepById } from '@/lib/queries/process'
import { ProcessStepForm } from '@/components/admin/forms/process-form'

export default async function EditProcessStepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const step = await getProcessStepById(id)
  if (!step) notFound()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/process" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Process Steps
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit: {step.title}</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <ProcessStepForm step={step} />
      </div>
    </div>
  )
}
