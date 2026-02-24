'use client'

import { memo, useTransition } from 'react'
import { deleteTestimonial } from '@/lib/actions/testimonials'

export const DeleteTestimonialButton = memo(function DeleteTestimonialButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this testimonial?')) return
    startTransition(async () => {
      const result = await deleteTestimonial(id)
      if (result?.error) {
        alert('Failed to delete testimonial: ' + result.error)
      }
    })
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
})
