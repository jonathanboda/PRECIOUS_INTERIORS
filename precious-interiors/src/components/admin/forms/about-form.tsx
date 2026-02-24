'use client'

import { useTransition, useState } from 'react'
import { updateAboutContent } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

interface AboutContent {
  label?: string
  headline?: { part1: string; highlight: string }
  description?: string[]
  experienceBadge?: string
  images?: { primary: string; secondary: string }
  values?: { title: string; description: string }[]
  stats?: { value: number; suffix: string; label: string; description?: string }[]
  ctaButton?: { text: string; href: string }
}

export function AboutForm({ initialContent }: { initialContent: AboutContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState(initialContent?.values || [
    { title: 'Excellence', description: 'We strive for perfection in every detail' },
    { title: 'Innovation', description: 'Pushing boundaries in design thinking' },
    { title: 'Integrity', description: 'Honest and transparent in all we do' },
  ])
  const [stats, setStats] = useState(initialContent?.stats || [
    { value: 500, suffix: '+', label: 'Projects Completed', description: '' },
    { value: 8, suffix: '', label: 'Years of Excellence', description: '' },
    { value: 50, suffix: '+', label: 'Design Awards', description: '' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', description: '' },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('values', JSON.stringify(values))
    formData.set('stats', JSON.stringify(stats))
    startTransition(async () => {
      await updateAboutContent(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Label */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Section Label</label>
        <input
          name="label"
          type="text"
          defaultValue={initialContent?.label || 'About Us'}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md"
        />
      </div>

      {/* Headline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline Part 1</label>
          <input
            name="headlinePart1"
            type="text"
            defaultValue={initialContent?.headline?.part1 || 'Where Vision'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline Highlight</label>
          <input
            name="headlineHighlight"
            type="text"
            defaultValue={initialContent?.headline?.highlight || 'Meets Artistry'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Description (separate paragraphs with blank lines)</label>
        <textarea
          name="description"
          rows={6}
          defaultValue={initialContent?.description?.join('\n\n') || ''}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md"
        />
      </div>

      {/* Experience Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Experience Badge (e.g., "3", "8+", "10+")</label>
          <input
            name="experienceBadge"
            type="text"
            defaultValue={initialContent?.experienceBadge || '8+'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
            placeholder="e.g., 3 or 8+"
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Primary Image URL</label>
          <input
            name="imagePrimary"
            type="text"
            defaultValue={initialContent?.images?.primary || ''}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Secondary Image URL (optional)</label>
          <input
            name="imageSecondary"
            type="text"
            defaultValue={initialContent?.images?.secondary || ''}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

      {/* Core Values */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Core Values</label>
        <div className="space-y-3">
          {values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={value.title}
                onChange={(e) => {
                  const newValues = [...values]
                  newValues[index].title = e.target.value
                  setValues(newValues)
                }}
                placeholder="Value title"
                className="w-1/3 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="text"
                value={value.description}
                onChange={(e) => {
                  const newValues = [...values]
                  newValues[index].description = e.target.value
                  setValues(newValues)
                }}
                placeholder="Description"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setValues(values.filter((_, i) => i !== index))}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setValues([...values, { title: '', description: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Value
          </button>
        </div>
      </div>

      {/* Stats */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Statistics</label>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...stats]
                  newStats[index].value = parseInt(e.target.value) || 0
                  setStats(newStats)
                }}
                placeholder="Value"
                className="w-24 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="text"
                value={stat.suffix}
                onChange={(e) => {
                  const newStats = [...stats]
                  newStats[index].suffix = e.target.value
                  setStats(newStats)
                }}
                placeholder="Suffix (+, %, etc)"
                className="w-20 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...stats]
                  newStats[index].label = e.target.value
                  setStats(newStats)
                }}
                placeholder="Label"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setStats(stats.filter((_, i) => i !== index))}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setStats([...stats, { value: 0, suffix: '', label: '', description: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Stat
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">CTA Button Text</label>
          <input
            name="ctaButtonText"
            type="text"
            defaultValue={initialContent?.ctaButton?.text || 'Explore Our Work'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">CTA Button Link</label>
          <input
            name="ctaButtonHref"
            type="text"
            defaultValue={initialContent?.ctaButton?.href || '/projects'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
