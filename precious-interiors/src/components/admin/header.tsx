'use client'

import { User } from '@supabase/supabase-js'
import { signOut } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { LogOut, Menu } from 'lucide-react'

interface AdminHeaderProps {
  user: User
  profile: {
    full_name: string | null
    role: string
  }
}

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'))
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-md"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium text-neutral-900">
            Admin Panel
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">
              {profile.full_name || user.email}
            </p>
            <p className="text-xs text-neutral-500 capitalize">
              {profile.role}
            </p>
          </div>

          <form action={signOut}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
