import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Admin Login | Precious Interiors',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>
}) {
  const { redirectTo } = await searchParams
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
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
