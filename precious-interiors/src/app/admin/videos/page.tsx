import Link from 'next/link'
import { getVideos } from '@/lib/queries/videos'
import { Button } from '@/components/ui/button'
import { Plus, Youtube, Instagram } from 'lucide-react'
import { DeleteVideoButton } from '@/components/admin/delete-video-button'

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Videos</h1>
          <p className="text-neutral-600 mt-1">Manage video gallery</p>
        </div>
        <Link href="/admin/videos/new">
          <Button><Plus className="h-4 w-4 mr-2" />Add Video</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <div className="aspect-video relative">
              <img src={video.thumbnail_url || '/images/placeholder.jpg'} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                {video.platform === 'youtube' ? <Youtube className="h-4 w-4 text-red-600" /> : <Instagram className="h-4 w-4 text-pink-600" />}
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium text-neutral-900 truncate">{video.title}</p>
              <p className="text-sm text-neutral-500 capitalize">{video.category} {video.duration && `• ${video.duration}`}</p>
              <div className="mt-3 flex justify-between">
                <a href={video.url} target="_blank" className="text-sm text-primary-600 hover:text-primary-700">View</a>
                <div className="space-x-2">
                  <Link href={`/admin/videos/${video.id}/edit`} className="text-sm text-primary-600 hover:text-primary-700">Edit</Link>
                  <DeleteVideoButton id={video.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
