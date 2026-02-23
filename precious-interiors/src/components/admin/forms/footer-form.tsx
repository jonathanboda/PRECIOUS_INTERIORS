'use client'

import { useTransition, useState } from 'react'
import { updateFooterContent } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

interface FooterContent {
  companyDescription: string
  copyrightText: string
  socialLinks: { platform: string; url: string }[]
  quickLinks: { label: string; href: string }[]
  newsletterTitle: string
  newsletterDescription: string
}

export function FooterForm({ initialContent }: { initialContent: FooterContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [socialLinks, setSocialLinks] = useState(initialContent?.socialLinks || [
    { platform: 'Instagram', url: 'https://instagram.com/preciousinteriors' },
    { platform: 'Facebook', url: 'https://facebook.com/preciousinteriors' },
    { platform: 'Pinterest', url: 'https://pinterest.com/preciousinteriors' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/preciousinteriors' },
  ])
  const [quickLinks, setQuickLinks] = useState(initialContent?.quickLinks || [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('socialLinks', JSON.stringify(socialLinks))
    formData.set('quickLinks', JSON.stringify(quickLinks))
    startTransition(async () => {
      await updateFooterContent(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">General</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company Description</label>
            <textarea
              name="companyDescription"
              rows={3}
              defaultValue={initialContent?.companyDescription || 'Precious Interiors transforms spaces into stunning, functional environments that reflect your unique style and personality.'}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Copyright Text</label>
            <input
              name="copyrightText"
              type="text"
              defaultValue={initialContent?.copyrightText || '2024 Precious Interiors. All rights reserved.'}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Social Media Links</h3>
        <div className="space-y-2">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => {
                  const newLinks = [...socialLinks]
                  newLinks[index].platform = e.target.value
                  setSocialLinks(newLinks)
                }}
                placeholder="Platform (e.g., Instagram)"
                className="w-1/3 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...socialLinks]
                  newLinks[index].url = e.target.value
                  setSocialLinks(newLinks)
                }}
                placeholder="URL"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSocialLinks([...socialLinks, { platform: '', url: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Social Link
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Quick Links</h3>
        <div className="space-y-2">
          {quickLinks.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...quickLinks]
                  newLinks[index].label = e.target.value
                  setQuickLinks(newLinks)
                }}
                placeholder="Label"
                className="w-1/3 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => {
                  const newLinks = [...quickLinks]
                  newLinks[index].href = e.target.value
                  setQuickLinks(newLinks)
                }}
                placeholder="Link (e.g., /about)"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setQuickLinks(quickLinks.filter((_, i) => i !== index))}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setQuickLinks([...quickLinks, { label: '', href: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Quick Link
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Newsletter Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Newsletter Title</label>
            <input
              name="newsletterTitle"
              type="text"
              defaultValue={initialContent?.newsletterTitle || 'Stay Inspired'}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Newsletter Description</label>
            <textarea
              name="newsletterDescription"
              rows={2}
              defaultValue={initialContent?.newsletterDescription || 'Subscribe to our newsletter for design tips, trends, and exclusive offers.'}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
