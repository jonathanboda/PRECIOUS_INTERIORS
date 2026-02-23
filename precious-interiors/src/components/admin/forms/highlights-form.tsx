'use client'

import { useTransition, useState } from 'react'
import { updateServiceHighlights } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

export function HighlightsForm({ initialContent }: { initialContent: { highlights: string[] } | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateServiceHighlights(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  const defaultHighlights = initialContent?.highlights?.join('\n') || `Living Room Design
Bedroom & Master Suite
Kitchen & Dining
Bathroom Design
Home Office Setup
Kids Room Design
Pooja Room Design
Balcony & Terrace
Bespoke Furniture
Custom Wardrobes
Modular Kitchen
TV Unit & Entertainment
Home Renovation
Kitchen Remodeling
Bathroom Remodeling
3D Renders
Virtual Walkthrough
Floor Plans`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Service Highlights (one per line)</label>
        <textarea
          name="highlights"
          rows={12}
          defaultValue={defaultHighlights}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md font-mono text-sm"
        />
        <p className="mt-1 text-xs text-neutral-500">These items appear in the scrolling marquee on the homepage</p>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
