export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          location: string
          room_type: string
          style: string
          image_url: string
          year: string
          duration: string
          sqft: string
          description: string
          services: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string
          project_type: string | null
          message: string
          source: string
          status: string
          notes: string | null
          responded_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['inquiries']['Row'], 'id' | 'created_at' | 'updated_at' | 'status'>
        Update: Partial<Database['public']['Tables']['inquiries']['Insert']>
      }
      services: {
        Row: {
          id: string
          number: string
          icon: string
          title: string
          description: string
          image_url: string
          features: string[]
          sub_services: string[]
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          client_name: string
          client_title: string
          project_type: string
          image_url: string
          rating: number
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      process_steps: {
        Row: {
          id: string
          number: string
          title: string
          subtitle: string
          description: string
          duration: string
          cumulative_payment: number
          payment_note: string
          deliverables: string[]
          image_url: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['process_steps']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['process_steps']['Insert']>
      }
      videos: {
        Row: {
          id: string
          title: string
          thumbnail_url: string
          category: string
          platform: string
          url: string
          duration: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['videos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['videos']['Insert']>
      }
      site_content: {
        Row: {
          id: string
          section_key: string
          content: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>
      }
      admin_profiles: {
        Row: {
          id: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['admin_profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['admin_profiles']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
