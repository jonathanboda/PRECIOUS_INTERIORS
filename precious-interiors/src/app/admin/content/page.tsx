import Link from 'next/link'
import { FileEdit, Home, Info, Phone, Layout, BarChart, Sparkles } from 'lucide-react'

const contentSections = [
  { name: 'Hero Section', href: '/admin/content/hero', icon: Home, description: 'Homepage hero text, images, and CTAs' },
  { name: 'About Section', href: '/admin/content/about', icon: Info, description: 'Company story, values, and stats' },
  { name: 'Contact Info', href: '/admin/content/contact', icon: Phone, description: 'Phone, email, address, business hours' },
  { name: 'Footer', href: '/admin/content/footer', icon: Layout, description: 'Footer links, social media, newsletter' },
  { name: 'Project Stats', href: '/admin/content/stats', icon: BarChart, description: 'Statistics and numbers displayed on site' },
  { name: 'Service Highlights', href: '/admin/content/highlights', icon: Sparkles, description: 'Scrolling service marquee items' },
]

export default function ContentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">
          Site Content
        </h1>
        <p className="text-neutral-600 mt-1">
          Edit content sections across your website
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.name}
              href={section.href}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-neutral-900">{section.name}</h2>
                  <p className="text-sm text-neutral-500 mt-1">{section.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
