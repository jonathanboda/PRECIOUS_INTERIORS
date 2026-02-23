'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { createTestimonial, updateTestimonial } from '@/lib/actions/testimonials'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface Testimonial {
  id: string
  quote: string
  client_name: string
  client_title: string
  project_type: string
  image_url: string
  rating: number
  display_order: number
}

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const [imageUrl, setImageUrl] = useState(testimonial?.image_url || '')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      if (testimonial) return await updateTestimonial(testimonial.id, formData)
      return await createTestimonial(formData)
    },
    null
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">{state.error}</div>}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Client Name *</label>
        <input name="client_name" type="text" required defaultValue={testimonial?.client_name} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Client Title *</label>
        <input name="client_title" type="text" required defaultValue={testimonial?.client_title} placeholder="CEO, Company Name" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Project Type *</label>
        <input name="project_type" type="text" required defaultValue={testimonial?.project_type} placeholder="Luxury Villa" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Quote *</label>
        <textarea name="quote" required rows={4} defaultValue={testimonial?.quote} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Client Image *</label>
        <ImageUpload name="image_url" value={imageUrl} onChange={setImageUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Rating (1-5)</label>
          <select name="rating" defaultValue={testimonial?.rating || 5} className="w-full px-4 py-2 border border-neutral-300 rounded-md">
            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Display Order</label>
          <input name="display_order" type="number" defaultValue={testimonial?.display_order || 0} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : testimonial ? 'Update' : 'Create'} Testimonial</Button>
    </form>
  )
}
