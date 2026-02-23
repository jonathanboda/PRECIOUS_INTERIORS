import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TestimonialForm } from '@/components/admin/forms/testimonial-form'

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/testimonials" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to Testimonials
        </Link>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Add New Testimonial</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 max-w-2xl">
        <TestimonialForm />
      </div>
    </div>
  )
}
