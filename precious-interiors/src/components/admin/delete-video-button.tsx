'use client'

import { useTransition } from 'react'
import { deleteVideo } from '@/lib/actions/videos'

export function DeleteVideoButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Delete this video?')) return
    startTransition(() => deleteVideo(id))
  }

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50">
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
