import { createClient } from '@/lib/supabase/server'

export async function getProjects() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(count = 6) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .limit(count)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured projects:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching project:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getRelatedProjects(currentSlug: string, roomType: string, style: string, count = 3) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .neq('slug', currentSlug)
      .or(`room_type.eq.${roomType},style.eq.${style}`)
      .limit(count)

    if (error) {
      console.error('Error fetching related projects:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching related projects:', error)
    return []
  }
}

export async function getProjectsByFilter(roomType?: string, style?: string) {
  try {
    const supabase = await createClient()
    let query = supabase.from('projects').select('*')

    if (roomType) query = query.eq('room_type', roomType)
    if (style) query = query.eq('style', style)

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching filtered projects:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching filtered projects:', error)
    return []
  }
}
