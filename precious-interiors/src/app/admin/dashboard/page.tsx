import { FolderKanban, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react'
import { StatsCard } from '@/components/admin/stats-card'
import { getInquiryStats } from '@/lib/queries/inquiries'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const [inquiryStats, projectsCount] = await Promise.all([
    getInquiryStats(),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">
          Dashboard
        </h1>
        <p className="text-neutral-600 mt-1">
          Welcome to your admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Projects"
          value={projectsCount.count ?? 0}
          icon={FolderKanban}
        />
        <StatsCard
          title="Total Inquiries"
          value={inquiryStats.total}
          icon={MessageSquare}
        />
        <StatsCard
          title="New Inquiries"
          value={inquiryStats.new}
          icon={AlertCircle}
          className={inquiryStats.new > 0 ? 'border-orange-200 bg-orange-50' : ''}
        />
        <StatsCard
          title="Converted"
          value={inquiryStats.converted}
          icon={CheckCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/projects/new"
              className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <FolderKanban className="h-6 w-6 mx-auto text-primary-600 mb-2" />
              <span className="text-sm font-medium">Add Project</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <MessageSquare className="h-6 w-6 mx-auto text-primary-600 mb-2" />
              <span className="text-sm font-medium">View Inquiries</span>
            </Link>
            <Link
              href="/admin/content/hero"
              className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-sm font-medium">Edit Hero</span>
            </Link>
            <Link
              href="/admin/testimonials/new"
              className="p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <span className="text-sm font-medium">Add Testimonial</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            Content Sections
          </h2>
          <ul className="space-y-2">
            {[
              { name: 'Hero Section', href: '/admin/content/hero' },
              { name: 'About Section', href: '/admin/content/about' },
              { name: 'Contact Info', href: '/admin/content/contact' },
              { name: 'Footer', href: '/admin/content/footer' },
              { name: 'Project Stats', href: '/admin/content/stats' },
              { name: 'Service Highlights', href: '/admin/content/highlights' },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-md transition-colors"
                >
                  <span className="text-sm text-neutral-700">{item.name}</span>
                  <span className="text-xs text-primary-600">Edit →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
