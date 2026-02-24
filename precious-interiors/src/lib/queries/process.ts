import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type ProcessStep = Database['public']['Tables']['process_steps']['Row']

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching process steps:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching process steps:', error)
    return []
  }
}

export async function getProcessStepById(id: string): Promise<ProcessStep | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching process step:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching process step:', error)
    return null
  }
}
