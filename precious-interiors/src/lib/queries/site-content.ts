import { createClient } from '@/lib/supabase/server'
import type { Json } from '@/lib/types/database'

export async function getSiteContent<T = Json>(sectionKey: string): Promise<T | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section_key', sectionKey)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return (data as { content: Json } | null)?.content as T ?? null
}

export async function getHeroContent() {
  return getSiteContent<{
    label: string
    headline1: string
    headline2: string
    headline3: string
    subheading: string
    ctaPrimary: { text: string }
    ctaSecondary: { text: string; href: string }
    videoUrl: string
  }>('hero')
}

export async function getAboutContent() {
  return getSiteContent<{
    label: string
    headline: { part1: string; highlight: string }
    description: string[]
    experienceBadge: string
    images: { primary: string; secondary: string }
    values: { title: string; description: string }[]
    stats: { value: number; suffix: string; label: string }[]
    ctaButton: { text: string; href: string }
  }>('about')
}

export async function getContactInfo() {
  return getSiteContent<{
    phone: string
    email: string
    address: string
    whatsappNumber: string
    businessHours: { day: string; hours: string }[]
  }>('contact_info')
}

export async function getFooterContent() {
  return getSiteContent<{
    tagline: string
    companyLinks: { name: string; href: string }[]
    servicesLinks: { name: string; href: string }[]
    socialLinks: { platform: string; href: string }[]
    newsletter: { title: string; description: string; placeholder: string }
    legalLinks: { name: string; href: string }[]
  }>('footer')
}

export async function getWhyChooseUsContent() {
  return getSiteContent<{
    label: string
    headline: string
    features: { title: string; description: string; image: string }[]
  }>('why_choose_us')
}

export async function getProjectStatsContent() {
  return getSiteContent<{
    label: string
    headline: { part1: string; highlight: string }
    stats: { icon: string; value: number; suffix: string; label: string; description: string }[]
    quote: string
  }>('project_stats')
}

export async function getServiceHighlights() {
  return getSiteContent<{
    highlights: string[]
  }>('service_highlights')
}
