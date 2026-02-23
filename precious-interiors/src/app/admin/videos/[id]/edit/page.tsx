import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getVideoById } from '@/lib/queries/videos'
import { VideoForm } from '@/components/admin/forms/video-form'

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)
  if (!video) notFound()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/videos" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Videos
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit Video</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 max-w-2xl">
        <VideoForm video={video} />
      </div>
    </div>
  )
}
