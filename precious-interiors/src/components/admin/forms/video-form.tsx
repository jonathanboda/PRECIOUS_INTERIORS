'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { createVideo, updateVideo } from '@/lib/actions/videos'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/admin/image-upload'

interface Video {
  id: string
  title: string
  thumbnail_url: string
  category: string
  platform: string
  url: string
  duration: string | null
}

export function VideoForm({ video }: { video?: Video }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(video?.thumbnail_url || '')
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      if (video) return await updateVideo(video.id, formData)
      return await createVideo(formData)
    },
    null
  )

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">{state.error}</div>}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Title *</label>
        <input name="title" type="text" required defaultValue={video?.title} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Thumbnail Image *</label>
        <ImageUpload name="thumbnail_url" value={thumbnailUrl} onChange={setThumbnailUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Video URL *</label>
        <input name="url" type="url" required defaultValue={video?.url} className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Platform *</label>
          <select name="platform" required defaultValue={video?.platform || 'youtube'} className="w-full px-4 py-2 border border-neutral-300 rounded-md">
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Category *</label>
          <select name="category" required defaultValue={video?.category || 'workplace'} className="w-full px-4 py-2 border border-neutral-300 rounded-md">
            <option value="workplace">Workplace</option>
            <option value="renovations">Renovations</option>
            <option value="testimonials">Testimonials</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Duration</label>
        <input name="duration" type="text" defaultValue={video?.duration || ''} placeholder="2:30" className="w-full px-4 py-2 border border-neutral-300 rounded-md" />
      </div>

      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : video ? 'Update' : 'Create'} Video</Button>
    </form>
  )
}
