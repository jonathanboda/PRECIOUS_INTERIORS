import Link from 'next/link'
import { getTestimonials } from '@/lib/queries/testimonials'
import { Button } from '@/components/ui/button'
import { Plus, Star } from 'lucide-react'
import { DeleteTestimonialButton } from '@/components/admin/delete-testimonial-button'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Testimonials</h1>
          <p className="text-neutral-600 mt-1">Manage client testimonials</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button><Plus className="h-4 w-4 mr-2" />Add Testimonial</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 relative rounded-full overflow-hidden">
                <img src={testimonial.image_url || '/images/placeholder.jpg'} alt={testimonial.client_name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">{testimonial.client_name}</p>
                <p className="text-sm text-neutral-500">{testimonial.client_title}</p>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-neutral-600 line-clamp-3 mb-4">"{testimonial.quote}"</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-400">{testimonial.project_type}</span>
              <div className="space-x-2">
                <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="text-sm text-primary-600 hover:text-primary-700">Edit</Link>
                <DeleteTestimonialButton id={testimonial.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
