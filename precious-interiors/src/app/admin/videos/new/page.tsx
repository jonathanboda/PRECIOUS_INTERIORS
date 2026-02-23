import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VideoForm } from '@/components/admin/forms/video-form'

export default function NewVideoPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/videos" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Videos
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Add New Video</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 max-w-2xl">
        <VideoForm />
      </div>
    </div>
  )
}
