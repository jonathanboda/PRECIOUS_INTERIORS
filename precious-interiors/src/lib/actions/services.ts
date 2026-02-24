'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient()

  const featuresRaw = formData.get('features') as string
  const subServicesRaw = formData.get('sub_services') as string

  const updateData = {
    number: formData.get('number') as string,
    icon: formData.get('icon') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: formData.get('image_url') as string,
    features: featuresRaw ? featuresRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    sub_services: subServicesRaw ? subServicesRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }

  const { error } = await supabase
    .from('services')
    // @ts-expect-error - Supabase types issue
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function createService(formData: FormData) {
  const supabase = await createClient()

  const featuresRaw = formData.get('features') as string
  const subServicesRaw = formData.get('sub_services') as string

  const insertData = {
    number: formData.get('number') as string,
    icon: formData.get('icon') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: formData.get('image_url') as string,
    features: featuresRaw ? featuresRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    sub_services: subServicesRaw ? subServicesRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }

  // @ts-expect-error - Supabase types issue
  const { error } = await supabase.from('services').insert(insertData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  redirect('/admin/services')
}

export async function deleteService(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('services').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/services')
  revalidatePath('/admin/services')
  return { success: true }
}
