'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  location: z.string().min(1, 'Location is required'),
  room_type: z.enum(['Kitchens', 'Living Spaces', 'Wardrobes', 'Bedrooms', 'Offices']),
  style: z.enum(['Modern', 'French', 'Luxury', 'Smart', 'Traditional']),
  image_url: z.string().min(1, 'Image is required'),
  year: z.string().min(1),
  duration: z.string().min(1),
  sqft: z.string().min(1),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  services: z.array(z.string()),
  featured: z.boolean().default(false),
})

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const servicesRaw = formData.get('services') as string
  const services = servicesRaw ? servicesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

  const validated = projectSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    location: formData.get('location'),
    room_type: formData.get('room_type'),
    style: formData.get('style'),
    image_url: formData.get('image_url'),
    year: formData.get('year'),
    duration: formData.get('duration'),
    sqft: formData.get('sqft'),
    description: formData.get('description'),
    services,
    featured: formData.get('featured') === 'true',
  })

  if (!validated.success) {
    return { error: 'Validation failed', details: validated.error.flatten() }
  }

  // @ts-expect-error - Supabase types issue
  const { error } = await supabase.from('projects').insert(validated.data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()

  const servicesRaw = formData.get('services') as string
  const services = servicesRaw ? servicesRaw.split(',').map(s => s.trim()).filter(Boolean) : []

  const validated = projectSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    location: formData.get('location'),
    room_type: formData.get('room_type'),
    style: formData.get('style'),
    image_url: formData.get('image_url'),
    year: formData.get('year'),
    duration: formData.get('duration'),
    sqft: formData.get('sqft'),
    description: formData.get('description'),
    services,
    featured: formData.get('featured') === 'true',
  })

  if (!validated.success) {
    return { error: 'Validation failed', details: validated.error.flatten() }
  }

  const { error } = await supabase
    .from('projects')
    // @ts-expect-error - Supabase types issue
    .update(validated.data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/projects')
  revalidatePath(`/projects/${validated.data.slug}`)
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/projects')
  revalidatePath('/admin/projects')
  return { success: true }
}
