import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getContactInfo } from '@/lib/queries/site-content'
import { ContactInfoForm } from '@/components/admin/forms/contact-info-form'

export default async function ContactContentPage() {
  const content = await getContactInfo()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/content" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Content
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Edit Contact Info</h1>
        <p className="text-neutral-600 mt-1">Update contact details and business hours</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <ContactInfoForm initialContent={content} />
      </div>
    </div>
  )
}
