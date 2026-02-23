'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(1, 'Phone is required'),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  source: z.enum(['contact_form', 'inquiry_modal', 'project_page', 'website']).default('website'),
})

export type InquiryFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitInquiry(
  prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    projectType: formData.get('projectType'),
    message: formData.get('message'),
    source: formData.get('source') ?? 'website',
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors below',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('inquiries').insert({
    name: validatedFields.data.name,
    email: validatedFields.data.email || null,
    phone: validatedFields.data.phone,
    project_type: validatedFields.data.projectType || null,
    message: validatedFields.data.message,
    source: validatedFields.data.source,
  })

  if (error) {
    console.error('Inquiry submission error:', error)
    return {
      success: false,
      message: 'Failed to submit inquiry. Please try again.',
    }
  }

  revalidatePath('/admin/inquiries')
  return {
    success: true,
    message: 'Thank you! We will get back to you shortly.',
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await createClient()

  const updateData: Record<string, unknown> = { status }
  if (status === 'contacted') {
    updateData.responded_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('inquiries')
    .update(updateData)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/inquiries')
  revalidatePath(`/admin/inquiries/${id}`)
  return { success: true }
}

export async function updateInquiryNotes(id: string, notes: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('inquiries')
    .update({ notes })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/inquiries')
  revalidatePath(`/admin/inquiries/${id}`)
  return { success: true }
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/inquiries')
  return { success: true }
}
