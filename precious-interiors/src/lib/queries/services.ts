import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type Service = Database['public']['Tables']['services']['Row']

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching services:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching service:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}
