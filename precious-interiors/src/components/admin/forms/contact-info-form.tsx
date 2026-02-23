'use client'

import { useTransition, useState } from 'react'
import { updateContactInfo } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

interface ContactContent {
  phone: string
  email: string
  whatsappNumber: string
  businessHours: { day: string; hours: string }[]
}

export function ContactInfoForm({ initialContent }: { initialContent: ContactContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [hours, setHours] = useState(initialContent?.businessHours || [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'By Appointment' },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('businessHours', JSON.stringify(hours))
    startTransition(async () => {
      await updateContactInfo(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
          <input name="phone" type="text" defaultValue={initialContent?.phone || '+91 90100 91191'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
          <input name="email" type="email" defaultValue={initialContent?.email || 'manikanta@thepreciousinteriors.com'} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp Number (with country code)</label>
        <input name="whatsappNumber" type="text" defaultValue={initialContent?.whatsappNumber || '919010091191'} placeholder="919010091191" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
        <p className="mt-1 text-xs text-neutral-500">Enter without + or spaces (e.g., 917989466819)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Business Hours</label>
        <div className="space-y-2">
          {hours.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item.day}
                onChange={(e) => {
                  const newHours = [...hours]
                  newHours[index].day = e.target.value
                  setHours(newHours)
                }}
                placeholder="Day(s)"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <input
                type="text"
                value={item.hours}
                onChange={(e) => {
                  const newHours = [...hours]
                  newHours[index].hours = e.target.value
                  setHours(newHours)
                }}
                placeholder="Hours"
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={() => setHours(hours.filter((_, i) => i !== index))}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setHours([...hours, { day: '', hours: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Hours
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
