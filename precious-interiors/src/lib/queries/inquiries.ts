import { createClient } from '@/lib/supabase/server'

export async function getInquiries() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getInquiryById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getInquiriesByStatus(status: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getInquiryStats() {
  const supabase = await createClient()
  const [total, newCount, contacted, inProgress, converted] = await Promise.all([
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'contacted'),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'converted'),
  ])

  return {
    total: total.count ?? 0,
    new: newCount.count ?? 0,
    contacted: contacted.count ?? 0,
    inProgress: inProgress.count ?? 0,
    converted: converted.count ?? 0,
  }
}
