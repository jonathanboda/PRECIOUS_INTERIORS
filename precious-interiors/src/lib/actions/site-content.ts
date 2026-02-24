'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Safe JSON parse helper to prevent crashes from malformed JSON
function safeJsonParse<T>(json: string | null, defaultValue: T): T {
  if (!json) return defaultValue
  try {
    return JSON.parse(json) as T
  } catch {
    return defaultValue
  }
}

export async function updateSiteContent(sectionKey: string, content: Record<string, unknown>) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('site_content')
    // @ts-expect-error - Supabase types issue
    .upsert({
      section_key: sectionKey,
      content
    }, {
      onConflict: 'section_key'
    })

  if (error) {
    return { error: error.message }
  }

  // Revalidate relevant paths based on section
  revalidatePath('/', 'layout')
  if (sectionKey === 'contact_info') {
    revalidatePath('/contact')
  }
  revalidatePath(`/admin/content/${sectionKey.replace('_', '-')}`)

  return { success: true }
}

export async function updateHeroContent(formData: FormData) {
  const content = {
    logoUrl: formData.get('logoUrl') as string,
    label: formData.get('label') as string,
    headline1: formData.get('headline1') as string,
    headline2: formData.get('headline2') as string,
    headline3: formData.get('headline3') as string,
    subheading: formData.get('subheading') as string,
    ctaPrimary: { text: formData.get('ctaPrimaryText') as string },
    ctaSecondary: {
      text: formData.get('ctaSecondaryText') as string,
      href: formData.get('ctaSecondaryHref') as string,
    },
    videoUrl: formData.get('videoUrl') as string,
  }

  return updateSiteContent('hero', content)
}

export async function updateAboutContent(formData: FormData) {
  const valuesRaw = formData.get('values') as string
  const statsRaw = formData.get('stats') as string

  const content = {
    label: formData.get('label') as string,
    headline: {
      part1: formData.get('headlinePart1') as string,
      highlight: formData.get('headlineHighlight') as string,
    },
    description: (formData.get('description') as string).split('\n\n').filter(Boolean),
    experienceBadge: formData.get('experienceBadge') as string,
    images: {
      primary: formData.get('imagePrimary') as string,
      secondary: formData.get('imageSecondary') as string,
    },
    values: safeJsonParse(valuesRaw, []),
    stats: safeJsonParse(statsRaw, []),
    ctaButton: {
      text: formData.get('ctaButtonText') as string,
      href: formData.get('ctaButtonHref') as string,
    },
  }

  return updateSiteContent('about', content)
}

export async function updateContactInfo(formData: FormData) {
  const hoursRaw = formData.get('businessHours') as string

  const content = {
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    whatsappNumber: formData.get('whatsappNumber') as string,
    businessHours: safeJsonParse(hoursRaw, []),
  }

  return updateSiteContent('contact_info', content)
}

export async function updateFooterContent(formData: FormData) {
  const content = {
    tagline: formData.get('tagline') as string,
    companyLinks: safeJsonParse(formData.get('companyLinks') as string, []),
    servicesLinks: safeJsonParse(formData.get('servicesLinks') as string, []),
    socialLinks: safeJsonParse(formData.get('socialLinks') as string, []),
    newsletter: {
      title: formData.get('newsletterTitle') as string,
      description: formData.get('newsletterDescription') as string,
      placeholder: formData.get('newsletterPlaceholder') as string,
    },
    legalLinks: safeJsonParse(formData.get('legalLinks') as string, []),
  }

  return updateSiteContent('footer', content)
}

export async function updateProjectStats(formData: FormData) {
  const statsRaw = formData.get('stats') as string

  const content = {
    label: formData.get('label') as string,
    headline: {
      part1: formData.get('headlinePart1') as string,
      highlight: formData.get('headlineHighlight') as string,
    },
    stats: safeJsonParse(statsRaw, []),
    quote: formData.get('quote') as string,
  }

  return updateSiteContent('project_stats', content)
}

export async function updateServiceHighlights(formData: FormData) {
  const highlightsRaw = formData.get('highlights') as string

  const content = {
    highlights: highlightsRaw ? highlightsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [],
  }

  return updateSiteContent('service_highlights', content)
}

export async function updateStatsContent(formData: FormData) {
  const statsJson = formData.get('stats') as string
  const stats = safeJsonParse(statsJson, [])
  return updateSiteContent('stats', { stats })
}
