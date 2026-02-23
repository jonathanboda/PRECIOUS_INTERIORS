'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteInquiry } from '@/lib/actions/inquiries'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeleteInquiryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    startTransition(async () => {
      await deleteInquiry(id)
      router.push('/admin/inquiries')
    })
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}
