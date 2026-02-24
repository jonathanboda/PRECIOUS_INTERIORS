'use client'

import { memo, useTransition } from 'react'
import { deleteProject } from '@/lib/actions/projects'

export const DeleteProjectButton = memo(function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this project?')) return

    startTransition(async () => {
      const result = await deleteProject(id)
      if (result?.error) {
        alert('Failed to delete project: ' + result.error)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
})
