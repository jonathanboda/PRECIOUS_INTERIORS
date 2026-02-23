import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminHeader } from '@/components/admin/header'

export const metadata = {
  title: 'Admin Panel | Precious Interiors',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/')
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
