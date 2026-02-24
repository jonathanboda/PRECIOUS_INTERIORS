import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Admin Panel | Precious Interiors',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isLoginPage = pathname === '/admin' || pathname === '/admin/'

  // For login page, just render children without admin shell
  if (isLoginPage) {
    return <>{children}</>
  }

  // For other admin pages, render with admin shell
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // This shouldn't happen due to middleware, but just in case
  if (!user) {
    return <>{children}</>
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader user={user} profile={profile} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
