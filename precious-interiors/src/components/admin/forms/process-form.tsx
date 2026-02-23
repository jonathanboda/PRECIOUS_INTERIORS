'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { updateProcessStep } from '@/lib/actions/process'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface ProcessStep {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  duration: string
  cumulative_payment: number
  payment_note: string
  deliverables: string[]
  image_url: string
  display_order: number
}

export function ProcessStepForm({ step }: { step: ProcessStep }) {
  const [imageUrl, setImageUrl] = useState(step?.image_url || '')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      return await updateProcessStep(step.id, formData)
    },
    null
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">{state.error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Step Number</label>
          <input name="number" type="text" defaultValue={step.number} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Duration</label>
          <input name="duration" type="text" defaultValue={step.duration} placeholder="5 Days" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Display Order</label>
          <input name="display_order" type="number" defaultValue={step.display_order} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
          <input name="title" type="text" defaultValue={step.title} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Subtitle</label>
          <input name="subtitle" type="text" defaultValue={step.subtitle} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
        <textarea name="description" rows={3} defaultValue={step.description} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Cumulative Payment %</label>
          <input name="cumulative_payment" type="number" min="0" max="100" defaultValue={step.cumulative_payment} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Payment Note</label>
          <input name="payment_note" type="text" defaultValue={step.payment_note} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Step Image</label>
        <ImageUpload name="image_url" value={imageUrl} onChange={setImageUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Deliverables (one per line)</label>
        <textarea name="deliverables" rows={4} defaultValue={step.deliverables?.join('\n')} className="w-full px-4 py-2 border border-neutral-300 rounded-md font-mono text-sm" />
      </div>

      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Update Step'}</Button>
    </form>
  )
}
