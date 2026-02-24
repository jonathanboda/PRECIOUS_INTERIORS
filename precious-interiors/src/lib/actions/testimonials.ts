'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient()

  const projectImageUrl = formData.get('project_image_url') as string
  const insertData = {
    quote: formData.get('quote') as string,
    client_name: formData.get('client_name') as string,
    client_title: formData.get('client_title') as string,
    project_type: formData.get('project_type') as string,
    image_url: formData.get('image_url') as string,
    project_image_url: projectImageUrl || null,
    rating: parseInt(formData.get('rating') as string) || 5,
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }

  // @ts-expect-error - Supabase types issue
  const { error } = await supabase.from('testimonials').insert(insertData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient()

  const projectImageUrl = formData.get('project_image_url') as string
  const updateData = {
    quote: formData.get('quote') as string,
    client_name: formData.get('client_name') as string,
    client_title: formData.get('client_title') as string,
    project_type: formData.get('project_type') as string,
    image_url: formData.get('image_url') as string,
    project_image_url: projectImageUrl || null,
    rating: parseInt(formData.get('rating') as string) || 5,
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }

  const { error } = await supabase
    .from('testimonials')
    // @ts-expect-error - Supabase types issue
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('testimonials').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/testimonials')
  return { success: true }
}
