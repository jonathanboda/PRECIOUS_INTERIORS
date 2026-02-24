'use client'

import { memo, useTransition } from 'react'
import { deleteService } from '@/lib/actions/services'

export const DeleteServiceButton = memo(function DeleteServiceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this service?')) return
    startTransition(async () => {
      const result = await deleteService(id)
      if (result?.error) {
        alert('Failed to delete service: ' + result.error)
      }
    })
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
})
