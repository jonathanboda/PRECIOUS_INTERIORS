'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { createService, updateService } from '@/lib/actions/services'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface Service {
  id: string
  number: string
  icon: string
  title: string
  description: string
  image_url: string
  features: string[]
  sub_services: string[]
  display_order: number
}

export function ServiceForm({ service }: { service?: Service }) {
  const [imageUrl, setImageUrl] = useState(service?.image_url || '')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      if (service) return await updateService(service.id, formData)
      return await createService(formData)
    },
    null
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">{state.error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Number *</label>
          <input name="number" type="text" required defaultValue={service?.number || '01'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Icon *</label>
          <input name="icon" type="text" required defaultValue={service?.icon || 'Compass'} placeholder="Lucide icon name" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Display Order</label>
          <input name="display_order" type="number" defaultValue={service?.display_order || 0} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
        <input name="title" type="text" required defaultValue={service?.title} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Description *</label>
        <textarea name="description" required rows={3} defaultValue={service?.description} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Service Image *</label>
        <ImageUpload name="image_url" value={imageUrl} onChange={setImageUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Features (one per line)</label>
        <textarea name="features" rows={4} defaultValue={service?.features?.join('\n')} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" className="w-full px-4 py-2 border border-neutral-300 rounded-md font-mono text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Sub-services (one per line)</label>
        <textarea name="sub_services" rows={4} defaultValue={service?.sub_services?.join('\n')} placeholder="Sub-service 1&#10;Sub-service 2" className="w-full px-4 py-2 border border-neutral-300 rounded-md font-mono text-sm" />
      </div>

      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : service ? 'Update' : 'Create'} Service</Button>
    </form>
  )
}
