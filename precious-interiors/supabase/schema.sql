-- ============================================================================
-- Precious Interiors - Supabase Database Schema
-- ============================================================================
-- This schema defines the complete database structure for the Precious Interiors
-- CMS integration with Supabase. It includes tables for portfolio projects,
-- inquiries, services, testimonials, process steps, videos, site content, and
-- admin profiles.
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
-- Enable UUID generation for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to automatically update the updated_at timestamp
-- This ensures all records track when they were last modified
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE: projects
-- ============================================================================
-- Stores portfolio projects showcasing completed interior design work
-- Used for the portfolio/gallery section of the website

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    style VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    year VARCHAR(10) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    sqft VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    services TEXT[] NOT NULL DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints for valid room types
    CONSTRAINT projects_room_type_check CHECK (
        room_type IN ('Kitchens', 'Living Spaces', 'Wardrobes', 'Bedrooms', 'Offices')
    ),

    -- Constraints for valid styles
    CONSTRAINT projects_style_check CHECK (
        style IN ('Modern', 'French', 'Luxury', 'Smart', 'Traditional')
    )
);

-- Indexes for common query patterns
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_room_type ON projects(room_type);
CREATE INDEX idx_projects_style ON projects(style);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE projects IS 'Portfolio projects showcasing completed interior design work';

-- ============================================================================
-- TABLE: inquiries
-- ============================================================================
-- Stores form submissions from potential clients
-- Tracks the inquiry lifecycle from submission to conversion

CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    project_type VARCHAR(50),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'website',
    status VARCHAR(20) DEFAULT 'new',
    notes TEXT,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraint for valid source values
    CONSTRAINT inquiries_source_check CHECK (
        source IN ('contact_form', 'inquiry_modal', 'project_page', 'website')
    ),

    -- Constraint for valid status values
    CONSTRAINT inquiries_status_check CHECK (
        status IN ('new', 'contacted', 'in_progress', 'converted', 'closed')
    )
);

-- Indexes for common query patterns
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_source ON inquiries(source);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_email ON inquiries(email) WHERE email IS NOT NULL;

-- Trigger for updated_at
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE inquiries IS 'Form submissions from potential clients';

-- ============================================================================
-- TABLE: services
-- ============================================================================
-- Stores service offerings displayed on the services section
-- Ordered by display_order for consistent presentation

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR(10) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    sub_services TEXT[] DEFAULT '{}',
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX idx_services_display_order ON services(display_order);

-- Trigger for updated_at
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE services IS 'Service offerings displayed on the website';

-- ============================================================================
-- TABLE: testimonials
-- ============================================================================
-- Stores client testimonials for social proof
-- Includes rating and project type for filtering

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Rating must be between 1 and 5
    CONSTRAINT testimonials_rating_check CHECK (rating >= 1 AND rating <= 5)
);

-- Index for ordering
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

-- Trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE testimonials IS 'Client testimonials for social proof';

-- ============================================================================
-- TABLE: process_steps
-- ============================================================================
-- Stores the design process timeline steps
-- Shows clients what to expect during their project

CREATE TABLE process_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    cumulative_payment INTEGER NOT NULL,
    payment_note TEXT NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Cumulative payment must be a percentage between 0 and 100
    CONSTRAINT process_steps_cumulative_payment_check CHECK (
        cumulative_payment >= 0 AND cumulative_payment <= 100
    )
);

-- Index for ordering
CREATE INDEX idx_process_steps_display_order ON process_steps(display_order);

-- Trigger for updated_at
CREATE TRIGGER update_process_steps_updated_at
    BEFORE UPDATE ON process_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE process_steps IS 'Design process timeline steps';

-- ============================================================================
-- TABLE: videos
-- ============================================================================
-- Stores video gallery items from YouTube and Instagram
-- Categorized for filtering on the website

CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    duration VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraint for valid categories
    CONSTRAINT videos_category_check CHECK (
        category IN ('workplace', 'renovations', 'testimonials')
    ),

    -- Constraint for valid platforms
    CONSTRAINT videos_platform_check CHECK (
        platform IN ('youtube', 'instagram')
    )
);

-- Indexes for filtering
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_platform ON videos(platform);
CREATE INDEX idx_videos_created_at ON videos(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE videos IS 'Video gallery items from YouTube and Instagram';

-- ============================================================================
-- TABLE: site_content
-- ============================================================================
-- Flexible JSON storage for page sections and site-wide content
-- Allows updating content without schema changes

CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(100) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick key lookups
CREATE INDEX idx_site_content_section_key ON site_content(section_key);

-- GIN index for JSONB queries (allows efficient searching within JSON content)
CREATE INDEX idx_site_content_content ON site_content USING GIN (content);

-- Trigger for updated_at
CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON site_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE site_content IS 'Flexible JSON storage for page sections and site-wide content';

-- ============================================================================
-- TABLE: admin_profiles
-- ============================================================================
-- Stores admin user profiles linked to Supabase auth.users
-- Used for CMS access control

CREATE TABLE admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraint for valid roles
    CONSTRAINT admin_profiles_role_check CHECK (
        role IN ('admin', 'super_admin')
    )
);

-- Index for role-based queries
CREATE INDEX idx_admin_profiles_role ON admin_profiles(role);

-- Trigger for updated_at
CREATE TRIGGER update_admin_profiles_updated_at
    BEFORE UPDATE ON admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE admin_profiles IS 'Admin user profiles for CMS access control';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
-- Enable RLS on all tables to ensure proper access control
-- Policies define who can read/write to each table

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- projects: Public read, authenticated admin write
-- ----------------------------------------------------------------------------

-- Anyone can view projects (for portfolio display)
CREATE POLICY "projects_public_read"
    ON projects
    FOR SELECT
    TO public
    USING (true);

-- Only authenticated admins can insert projects
CREATE POLICY "projects_admin_insert"
    ON projects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- Only authenticated admins can update projects
CREATE POLICY "projects_admin_update"
    ON projects
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- Only authenticated admins can delete projects
CREATE POLICY "projects_admin_delete"
    ON projects
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- inquiries: Public insert (anon), admin read/update/delete
-- ----------------------------------------------------------------------------

-- Anyone can submit an inquiry (for contact forms)
CREATE POLICY "inquiries_public_insert"
    ON inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated admins can view inquiries
CREATE POLICY "inquiries_admin_read"
    ON inquiries
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- Only authenticated admins can update inquiries
CREATE POLICY "inquiries_admin_update"
    ON inquiries
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- Only authenticated admins can delete inquiries
CREATE POLICY "inquiries_admin_delete"
    ON inquiries
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- services: Public read, admin write
-- ----------------------------------------------------------------------------

CREATE POLICY "services_public_read"
    ON services
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "services_admin_insert"
    ON services
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "services_admin_update"
    ON services
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "services_admin_delete"
    ON services
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- testimonials: Public read, admin write
-- ----------------------------------------------------------------------------

CREATE POLICY "testimonials_public_read"
    ON testimonials
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "testimonials_admin_insert"
    ON testimonials
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "testimonials_admin_update"
    ON testimonials
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "testimonials_admin_delete"
    ON testimonials
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- process_steps: Public read, admin write
-- ----------------------------------------------------------------------------

CREATE POLICY "process_steps_public_read"
    ON process_steps
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "process_steps_admin_insert"
    ON process_steps
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "process_steps_admin_update"
    ON process_steps
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "process_steps_admin_delete"
    ON process_steps
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- videos: Public read, admin write
-- ----------------------------------------------------------------------------

CREATE POLICY "videos_public_read"
    ON videos
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "videos_admin_insert"
    ON videos
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "videos_admin_update"
    ON videos
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "videos_admin_delete"
    ON videos
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- site_content: Public read, admin write
-- ----------------------------------------------------------------------------

CREATE POLICY "site_content_public_read"
    ON site_content
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "site_content_admin_insert"
    ON site_content
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "site_content_admin_update"
    ON site_content
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

CREATE POLICY "site_content_admin_delete"
    ON site_content
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
        )
    );

-- ----------------------------------------------------------------------------
-- admin_profiles: Only own profile read, super_admin manage
-- ----------------------------------------------------------------------------

-- Admins can view their own profile
CREATE POLICY "admin_profiles_read_own"
    ON admin_profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Super admins can view all profiles
CREATE POLICY "admin_profiles_super_admin_read"
    ON admin_profiles
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'super_admin'
        )
    );

-- Super admins can insert new admin profiles
CREATE POLICY "admin_profiles_super_admin_insert"
    ON admin_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'super_admin'
        )
    );

-- Admins can update their own profile (except role)
CREATE POLICY "admin_profiles_update_own"
    ON admin_profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Super admins can update any profile
CREATE POLICY "admin_profiles_super_admin_update"
    ON admin_profiles
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'super_admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'super_admin'
        )
    );

-- Super admins can delete admin profiles (except themselves)
CREATE POLICY "admin_profiles_super_admin_delete"
    ON admin_profiles
    FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_profiles
            WHERE admin_profiles.id = auth.uid()
            AND admin_profiles.role = 'super_admin'
        )
        AND id != auth.uid()
    );

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
