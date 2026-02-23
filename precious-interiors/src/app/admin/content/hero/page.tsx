import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getHeroContent } from '@/lib/queries/site-content'
import { HeroForm } from '@/components/admin/forms/hero-form'

export default async function HeroContentPage() {
  const content = await getHeroContent()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/content" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Content
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit Hero Section</h1>
        <p className="text-neutral-600 mt-1">Update the main homepage hero content</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <HeroForm initialContent={content} />
      </div>
    </div>
  )
}
