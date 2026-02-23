import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getStatsContent } from '@/lib/queries/site-content'
import { StatsForm } from '@/components/admin/forms/stats-form'

export default async function StatsContentPage() {
  const content = await getStatsContent()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/content" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Content
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit Project Stats</h1>
        <p className="text-neutral-600 mt-1">Update statistics and numbers displayed across the site</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <StatsForm initialContent={content} />
      </div>
    </div>
  )
}
