'use client'

import { useTransition, useState } from 'react'
import { updateInquiryNotes } from '@/lib/actions/inquiries'
import { Button } from '@/components/ui/button'

export function InquiryNotesForm({
  id,
  initialNotes,
}: {
  id: string
  initialNotes: string
}) {
  const [notes, setNotes] = useState(initialNotes)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      await updateInquiryNotes(id, notes)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about this inquiry..."
        rows={4}
        className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      />
      <div className="mt-3 flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Notes'}
        </Button>
        {saved && (
          <span className="text-sm text-green-600">Saved!</span>
        )}
      </div>
    </form>
  )
}
