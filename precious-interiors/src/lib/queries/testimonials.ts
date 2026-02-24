import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching testimonials:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching testimonial:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return null
  }
}
