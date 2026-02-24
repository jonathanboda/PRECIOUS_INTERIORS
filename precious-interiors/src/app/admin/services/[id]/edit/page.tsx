import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getServiceById } from '@/lib/queries/services'
import { ServiceForm } from '@/components/admin/forms/service-form'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const service = await getServiceById(id)
  if (!service) notFound()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/services" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Services
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit Service: {service.title}</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <ServiceForm service={service} />
      </div>
    </div>
  )
}
