import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAboutContent } from '@/lib/queries/site-content'
import { AboutForm } from '@/components/admin/forms/about-form'

export default async function AboutContentPage() {
  const content = await getAboutContent()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/content" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Content
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit About Section</h1>
        <p className="text-neutral-600 mt-1">Update company story, values, and statistics</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <AboutForm initialContent={content} />
      </div>
    </div>
  )
}
