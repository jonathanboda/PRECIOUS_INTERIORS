import { createClient } from '@/lib/supabase/server'

export async function getProcessSteps() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('process_steps')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getProcessStepById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('process_steps')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
