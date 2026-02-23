'use client'

import { useTransition } from 'react'
import { deleteTestimonial } from '@/lib/actions/testimonials'

export function DeleteTestimonialButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this testimonial?')) return
    startTransition(() => deleteTestimonial(id))
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
