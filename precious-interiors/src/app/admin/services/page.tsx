import Link from 'next/link'
import { getServices } from '@/lib/queries/services'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DeleteServiceButton } from '@/components/admin/delete-service-button'

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Services</h1>
          <p className="text-neutral-600 mt-1">Manage service offerings</p>
        </div>
        <Link href="/admin/services/new">
          <Button><Plus className="h-4 w-4 mr-2" />Add Service</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Features</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 text-sm text-neutral-500">{service.display_order}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 relative rounded overflow-hidden">
                      <img src={service.image_url || '/images/placeholder.jpg'} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{service.title}</p>
                      <p className="text-sm text-neutral-500 truncate max-w-xs">{service.description.slice(0, 60)}...</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-500">{service.features?.length || 0} features</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link href={`/admin/services/${service.id}/edit`} className="text-sm text-primary-600 hover:text-primary-700">Edit</Link>
                  <DeleteServiceButton id={service.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
