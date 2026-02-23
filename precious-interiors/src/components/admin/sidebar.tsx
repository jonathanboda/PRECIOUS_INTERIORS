'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  MessageSquare,
  FileEdit,
  Briefcase,
  FolderKanban,
  Quote,
  ListOrdered,
  Video,
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  {
    name: 'Content',
    href: '/admin/content',
    icon: FileEdit,
    children: [
      { name: 'Hero Section', href: '/admin/content/hero' },
      { name: 'About Section', href: '/admin/content/about' },
      { name: 'Contact Info', href: '/admin/content/contact' },
      { name: 'Footer', href: '/admin/content/footer' },
      { name: 'Stats', href: '/admin/content/stats' },
      { name: 'Highlights', href: '/admin/content/highlights' },
    ]
  },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { name: 'Process Steps', href: '/admin/process', icon: ListOrdered },
  { name: 'Videos', href: '/admin/videos', icon: Video },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-white hidden lg:block">
      <div className="flex h-16 items-center justify-center border-b border-neutral-800">
        <Link href="/admin" className="text-xl font-heading font-semibold">
          Precious Interiors
        </Link>
      </div>

      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>

                {item.children && isActive && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          className={cn(
                            'block px-3 py-1.5 rounded-md text-sm transition-colors',
                            pathname === child.href
                              ? 'text-primary-400'
                              : 'text-neutral-400 hover:text-white'
                          )}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          View Website →
        </Link>
      </div>
    </aside>
  )
}
