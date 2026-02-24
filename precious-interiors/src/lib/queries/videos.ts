import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database'

type Video = Database['public']['Tables']['videos']['Row']

export async function getVideos(): Promise<Video[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching videos:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function getVideosByCategory(category: string): Promise<Video[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching videos by category:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching videos by category:', error)
    return []
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching video:', error.message)
      return null
    }
    return data
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  }
}

export async function getHomepageVideos(): Promise<Video[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('show_on_homepage', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching homepage videos:', error.message)
      return []
    }
    return data ?? []
  } catch (error) {
    console.error('Error fetching homepage videos:', error)
    return []
  }
}
