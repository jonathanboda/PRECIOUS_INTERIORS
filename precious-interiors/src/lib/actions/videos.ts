'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVideo(formData: FormData) {
  const supabase = await createClient()

  const insertData = {
    title: formData.get('title') as string,
    thumbnail_url: formData.get('thumbnail_url') as string,
    category: formData.get('category') as string,
    platform: formData.get('platform') as string,
    url: formData.get('url') as string,
    duration: formData.get('duration') as string || null,
  }

  const { error } = await supabase.from('videos').insert(insertData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/gallery')
  revalidatePath('/admin/videos')
  redirect('/admin/videos')
}

export async function updateVideo(id: string, formData: FormData) {
  const supabase = await createClient()

  const updateData = {
    title: formData.get('title') as string,
    thumbnail_url: formData.get('thumbnail_url') as string,
    category: formData.get('category') as string,
    platform: formData.get('platform') as string,
    url: formData.get('url') as string,
    duration: formData.get('duration') as string || null,
  }

  const { error } = await supabase
    .from('videos')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/gallery')
  revalidatePath('/admin/videos')
  redirect('/admin/videos')
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('videos').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/gallery')
  revalidatePath('/admin/videos')
  return { success: true }
}
