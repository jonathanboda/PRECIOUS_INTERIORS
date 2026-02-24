'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  FileEdit,
  Briefcase,
  FolderKanban,
  Quote,
  ListOrdered,
  Video,
  X,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
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
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Listen for toggle event from header
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggle-admin-sidebar', handleToggle)
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle)
  }, [])

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-800">
        <Link href="/admin/dashboard" className="text-xl font-heading font-semibold text-white">
          Precious Interiors
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-6 px-3 flex-1 overflow-y-auto">
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
                  <Icon className="h-5 w-5 flex-shrink-0" />
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

      <div className="p-4 border-t border-neutral-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          View Website →
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-white hidden lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 text-white flex flex-col lg:hidden',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
