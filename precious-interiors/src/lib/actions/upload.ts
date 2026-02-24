'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File

  if (!file || file.size === 0) {
    return { error: 'No file provided' }
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type. Please upload JPEG, PNG, WebP, or GIF.' }
  }


  const supabase = await createClient()

  // Generate unique filename with fallback extension based on MIME type
  const extFromName = file.name.includes('.') ? file.name.split('.').pop() : null
  const extFromType: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  }
  const ext = extFromName || extFromType[file.type] || 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
  const path = `uploads/${filename}`

  // Convert File to ArrayBuffer then to Buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    return { error: 'Failed to upload image' }
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(path)

  return {
    success: true,
    url: urlData.publicUrl,
    path: data.path
  }
}

export async function deleteImage(path: string) {
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from('images')
    .remove([path])

  if (error) {
    console.error('Delete error:', error)
    return { error: 'Failed to delete image' }
  }

  return { success: true }
}
