'use client'

import { useTransition, useState } from 'react'
import { updateAboutContent } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

interface AboutContent {
  sectionLabel: string
  headline: string
  description: string
  mission: string
  vision: string
  values: { title: string; description: string }[]
  yearsExperience: number
  teamMembers: number
}

export function AboutForm({ initialContent }: { initialContent: AboutContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState(initialContent?.values || [
    { title: 'Excellence', description: 'We strive for perfection in every detail' },
    { title: 'Innovation', description: 'Pushing boundaries in design thinking' },
    { title: 'Integrity', description: 'Honest and transparent in all we do' },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('values', JSON.stringify(values))
    startTransition(async () => {
      await updateAboutContent(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Section Label</label>
          <input
            name="sectionLabel"
            type="text"
            defaultValue={initialContent?.sectionLabel || 'About Us'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Headline</label>
          <input
            name="headline"
            type="text"
            defaultValue={initialContent?.headline || 'Crafting Beautiful Spaces Since 2010'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialContent?.description || 'We are a team of passionate designers dedicated to transforming spaces into stunning, functional environments that reflect your unique style and personality.'}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Mission Statement</label>
          <textarea
            name="mission"
            rows={3}
            defaultValue={initialContent?.mission || 'To create inspiring interior spaces that enhance the quality of life for our clients.'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Vision Statement</label>
          <textarea
            name="vision"
            rows={3}
            defaultValue={initialContent?.vision || 'To be the leading interior design firm known for innovation, quality, and client satisfaction.'}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Years of Experience</label>
          <input
            name="yearsExperience"
            type="number"
            defaultValue={initialContent?.yearsExperience || 14}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Team Members</label>
          <input
            name="teamMembers"
            type="number"
            defaultValue={initialContent?.teamMembers || 25}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>

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

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
