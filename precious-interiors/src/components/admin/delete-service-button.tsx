'use client'

import { useTransition } from 'react'
import { deleteService } from '@/lib/actions/services'

export function DeleteServiceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this service?')) return
    startTransition(() => deleteService(id))
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {isPending ? '...' : 'Delete'}
    </button>
  )
}
