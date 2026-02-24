import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Admin | Precious Interiors',
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      redirect('/admin/dashboard')
    }
  }

  // Show login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">
            Admin Login
          </h1>
          <p className="text-neutral-600 mt-2">
            Sign in to manage your website
          </p>
        </div>
        <LoginForm redirectTo="/admin/dashboard" />
      </div>
    </div>
  )
}
