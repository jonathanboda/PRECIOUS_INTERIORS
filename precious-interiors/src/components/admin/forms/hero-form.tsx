'use client'

import { useTransition, useState } from 'react'
import { updateHeroContent } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface HeroContent {
  label: string
  headline1: string
  headline2: string
  headline3: string
  subheading: string
  ctaPrimary: { text: string }
  ctaSecondary: { text: string; href: string }
  videoUrl: string
  logoUrl?: string
}

export function HeroForm({ initialContent }: { initialContent: HeroContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [logoUrl, setLogoUrl] = useState(initialContent?.logoUrl || '')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateHeroContent(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Logo</label>
        <ImageUpload name="logoUrl" value={logoUrl} onChange={setLogoUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Section Label</label>
        <input name="label" type="text" defaultValue={initialContent?.label || 'Premium Interior Design'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline Line 1</label>
          <input name="headline1" type="text" defaultValue={initialContent?.headline1 || 'TRUST'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline Line 2</label>
          <input name="headline2" type="text" defaultValue={initialContent?.headline2 || 'Makes Your Home'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline Line 3</label>
          <input name="headline3" type="text" defaultValue={initialContent?.headline3 || 'BEAUTIFUL'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Subheading</label>
        <textarea name="subheading" rows={2} defaultValue={initialContent?.subheading} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Primary CTA Text</label>
          <input name="ctaPrimaryText" type="text" defaultValue={initialContent?.ctaPrimary?.text || 'Start Your Project'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Secondary CTA Text</label>
          <input name="ctaSecondaryText" type="text" defaultValue={initialContent?.ctaSecondary?.text || 'View Projects'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Secondary CTA Link</label>
        <input name="ctaSecondaryHref" type="text" defaultValue={initialContent?.ctaSecondary?.href || '/projects'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Background Video URL</label>
        <input name="videoUrl" type="text" defaultValue={initialContent?.videoUrl} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
