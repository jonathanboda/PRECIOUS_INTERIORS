import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getInquiryById } from '@/lib/queries/inquiries'
import { InquiryStatusSelect } from '@/components/admin/inquiry-status-select'
import { InquiryNotesForm } from '@/components/admin/inquiry-notes-form'
import { DeleteInquiryButton } from '@/components/admin/delete-inquiry-button'
import { format } from 'date-fns'
import { ArrowLeft, Phone, Mail, Calendar } from 'lucide-react'

export default async function InquiryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const inquiry = await getInquiryById(params.id)

  if (!inquiry) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Inquiries
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">
            Inquiry from {inquiry.name}
          </h1>
          <DeleteInquiryButton id={inquiry.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Message</h2>
            <p className="text-neutral-700 whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Notes</h2>
            <InquiryNotesForm id={inquiry.id} initialNotes={inquiry.notes || ''} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-neutral-500">Status</dt>
                <dd className="mt-1">
                  <InquiryStatusSelect id={inquiry.id} currentStatus={inquiry.status} />
                </dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-500">Project Type</dt>
                <dd className="text-sm text-neutral-900">{inquiry.project_type || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-500">Source</dt>
                <dd className="text-sm text-neutral-900 capitalize">{inquiry.source.replace('_', ' ')}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Contact</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-neutral-400 mr-2" />
                <a href={`tel:${inquiry.phone}`} className="text-primary-600 hover:underline">
                  {inquiry.phone}
                </a>
              </li>
              {inquiry.email && (
                <li className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                  <a href={`mailto:${inquiry.email}`} className="text-primary-600 hover:underline">
                    {inquiry.email}
                  </a>
                </li>
              )}
              <li className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-neutral-400 mr-2" />
                <span className="text-neutral-700">
                  {format(new Date(inquiry.created_at), 'PPP p')}
                </span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <a
                href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Open in WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
