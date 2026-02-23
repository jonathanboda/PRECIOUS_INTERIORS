'use client'

import { useTransition, useState } from 'react'
import { updateStatsContent } from '@/lib/actions/site-content'
import { Button } from '@/components/ui/button'

interface StatItem {
  label: string
  value: string
  suffix?: string
  description?: string
}

interface StatsContent {
  stats: StatItem[]
}

export function StatsForm({ initialContent }: { initialContent: StatsContent | null }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState<StatItem[]>(initialContent?.stats || [
    { label: 'Projects Completed', value: '500', suffix: '+', description: 'Successfully delivered projects' },
    { label: 'Happy Clients', value: '350', suffix: '+', description: 'Satisfied homeowners and businesses' },
    { label: 'Years Experience', value: '14', suffix: '', description: 'Years in the industry' },
    { label: 'Design Awards', value: '25', suffix: '+', description: 'Industry recognitions received' },
    { label: 'Team Members', value: '40', suffix: '+', description: 'Skilled professionals' },
    { label: 'Cities Served', value: '12', suffix: '', description: 'Locations across the country' },
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('stats', JSON.stringify(stats))
    startTransition(async () => {
      await updateStatsContent(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    const newStats = [...stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setStats(newStats)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-neutral-700">Statistics</label>
          <button
            type="button"
            onClick={() => setStats([...stats, { label: '', value: '', suffix: '', description: '' }])}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Statistic
          </button>
        </div>

        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-neutral-600">Stat #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => setStats(stats.filter((_, i) => i !== index))}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-500 mb-1">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                    placeholder="e.g., Projects Completed"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs text-neutral-500 mb-1">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="e.g., 500"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-xs text-neutral-500 mb-1">Suffix</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                      placeholder="+, %, etc."
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs text-neutral-500 mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={stat.description || ''}
                  onChange={(e) => updateStat(index, 'description', e.target.value)}
                  placeholder="Brief description of this stat"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {stats.length === 0 && (
          <div className="text-center py-8 text-neutral-500">
            <p>No statistics added yet.</p>
            <button
              type="button"
              onClick={() => setStats([{ label: '', value: '', suffix: '', description: '' }])}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700"
            >
              Add your first statistic
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
        <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
        {saved && <span className="text-sm text-green-600">Changes saved!</span>}
      </div>
    </form>
  )
}
