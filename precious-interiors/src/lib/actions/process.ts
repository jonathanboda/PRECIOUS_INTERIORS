'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProcessStep(id: string, formData: FormData) {
  const supabase = await createClient()

  const deliverablesRaw = formData.get('deliverables') as string

  const updateData = {
    number: formData.get('number') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    description: formData.get('description') as string,
    duration: formData.get('duration') as string,
    cumulative_payment: parseInt(formData.get('cumulative_payment') as string) || 0,
    payment_note: formData.get('payment_note') as string,
    deliverables: deliverablesRaw ? deliverablesRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
    image_url: formData.get('image_url') as string,
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }

  const { error } = await supabase
    .from('process_steps')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/process')
  redirect('/admin/process')
}
