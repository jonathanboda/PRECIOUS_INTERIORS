-- ============================================================================
-- Precious Interiors - Complete Database Setup
-- ============================================================================
-- Run this entire file in the Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function for updated_at
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
CREATE TABLE IF NOT EXISTS projects (
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = TRUE;

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: inquiries
-- ============================================================================
CREATE TABLE IF NOT EXISTS inquiries (
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON inquiries;
CREATE TRIGGER update_inquiries_updated_at
    BEFORE UPDATE ON inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: services
-- ============================================================================
CREATE TABLE IF NOT EXISTS services (
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

CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: testimonials
-- ============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: process_steps
-- ============================================================================
CREATE TABLE IF NOT EXISTS process_steps (
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_process_steps_display_order ON process_steps(display_order);

DROP TRIGGER IF EXISTS update_process_steps_updated_at ON process_steps;
CREATE TRIGGER update_process_steps_updated_at
    BEFORE UPDATE ON process_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: videos
-- ============================================================================
CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    duration VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

DROP TRIGGER IF EXISTS update_videos_updated_at ON videos;
CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: site_content
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(100) UNIQUE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_content_section_key ON site_content(section_key);

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON site_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TABLE: admin_profiles
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at
    BEFORE UPDATE ON admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public read policies
DROP POLICY IF EXISTS "projects_public_read" ON projects;
CREATE POLICY "projects_public_read" ON projects FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "services_public_read" ON services;
CREATE POLICY "services_public_read" ON services FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "process_steps_public_read" ON process_steps;
CREATE POLICY "process_steps_public_read" ON process_steps FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "videos_public_read" ON videos;
CREATE POLICY "videos_public_read" ON videos FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "site_content_public_read" ON site_content;
CREATE POLICY "site_content_public_read" ON site_content FOR SELECT TO public USING (true);

-- Public insert for inquiries
DROP POLICY IF EXISTS "inquiries_public_insert" ON inquiries;
CREATE POLICY "inquiries_public_insert" ON inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admin policies
DROP POLICY IF EXISTS "projects_admin_all" ON projects;
CREATE POLICY "projects_admin_all" ON projects FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "inquiries_admin_all" ON inquiries;
CREATE POLICY "inquiries_admin_all" ON inquiries FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "services_admin_all" ON services;
CREATE POLICY "services_admin_all" ON services FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "testimonials_admin_all" ON testimonials;
CREATE POLICY "testimonials_admin_all" ON testimonials FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "process_steps_admin_all" ON process_steps;
CREATE POLICY "process_steps_admin_all" ON process_steps FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "videos_admin_all" ON videos;
CREATE POLICY "videos_admin_all" ON videos FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "site_content_admin_all" ON site_content;
CREATE POLICY "site_content_admin_all" ON site_content FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "admin_profiles_read_own" ON admin_profiles;
CREATE POLICY "admin_profiles_read_own" ON admin_profiles FOR SELECT TO authenticated USING (id = auth.uid());

-- ============================================================================
-- SEED DATA: PROJECTS
-- ============================================================================
INSERT INTO projects (slug, title, location, room_type, style, image_url, year, duration, sqft, description, services, featured) VALUES
('serene-living-room', 'Serene Living Room', 'Whitefield, Bangalore', 'Living Spaces', 'Modern', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85', '2025', '45 days', '1200 sq.ft', 'A luxurious living space featuring floor-to-ceiling windows with panoramic city views and custom Italian furnishings.', ARRAY['Full Interior Design', 'Custom Furniture', 'Lighting Design'], true),
('modern-living-space', 'Modern Living Space', 'Delhi, NCR', 'Living Spaces', 'Modern', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85', '2024', '2 weeks', '320 sq.ft', 'Contemporary living area with clean lines and natural light optimization.', ARRAY['Space Planning', 'Furniture Selection', 'Decor'], true),
('minimalist-galley-kitchen', 'Minimalist Galley Kitchen', 'Bangalore, Karnataka', 'Kitchens', 'Modern', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', '2024', '2 weeks', '120 sq.ft', 'Efficient galley kitchen with premium appliances and smart storage solutions.', ARRAY['Kitchen Design', 'Custom Cabinetry', 'Appliance Selection'], true),
('french-provincial-bedroom', 'French Provincial Bedroom', 'Mumbai, Maharashtra', 'Bedrooms', 'French', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85', '2024', '3 weeks', '280 sq.ft', 'Elegant bedroom inspired by French countryside aesthetics with ornate details.', ARRAY['Bedroom Design', 'Custom Headboard', 'Drapery'], true),
('luxury-master-suite', 'Luxury Master Suite', 'Hyderabad, Telangana', 'Bedrooms', 'Luxury', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85', '2024', '6 weeks', '450 sq.ft', 'Opulent master suite with walk-in closet and spa-inspired bathroom.', ARRAY['Full Suite Design', 'Walk-in Wardrobe', 'Ensuite Design'], true),
('smart-home-office', 'Smart Home Office', 'Pune, Maharashtra', 'Offices', 'Smart', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85', '2024', '10 days', '150 sq.ft', 'Tech-integrated home office with ergonomic design and smart lighting.', ARRAY['Office Design', 'Tech Integration', 'Ergonomic Planning'], true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SEED DATA: TESTIMONIALS
-- ============================================================================
INSERT INTO testimonials (quote, client_name, client_title, project_type, image_url, rating, display_order) VALUES
('The Precious Interiors transformed our house into a sanctuary. Their understanding of light, space, and texture created an environment that feels both luxurious and deeply personal.', 'Victoria Sterling', 'CEO, Sterling Ventures', 'Manhattan Penthouse', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', 5, 1),
('Working with this team was an extraordinary experience. They listened intently, challenged us thoughtfully, and delivered beyond our highest expectations.', 'Marcus Chen', 'Creative Director', 'Brooklyn Brownstone', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 5, 2),
('The attention to craft and detail is remarkable. Every element has been considered. This is not decoration—it is architecture of atmosphere.', 'Isabelle Fontaine', 'Art Collector', 'Malibu Residence', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', 5, 3)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SEED DATA: SERVICES
-- ============================================================================
INSERT INTO services (number, icon, title, description, image_url, features, display_order) VALUES
('01', 'Compass', 'Strategic Planning', 'We begin every project with deep understanding. Through comprehensive consultation, we analyze your space, lifestyle, and aspirations.', '/images/our%20service/strategic%20plans.jpg', ARRAY['Space Analysis', 'Lifestyle Assessment', 'Budget Planning'], 1),
('02', 'Palette', 'Interior Design', 'Our design philosophy marries timeless elegance with contemporary sensibility. We craft cohesive visual narratives.', '/images/our%20service/interior%20designing.png', ARRAY['Concept Development', 'Material Selection', '3D Visualization'], 2),
('03', 'Sofa', 'Custom Furnishing', 'Beyond off-the-shelf solutions, we design bespoke furniture pieces that perfectly complement your space.', '/images/our%20service/custom%20furniture.webp', ARRAY['Bespoke Design', 'Artisan Craftsmanship', 'Premium Materials'], 3),
('04', 'Sparkles', 'Final Styling', 'The finishing touches transform a designed space into a living environment. We curate art, accessories, and textiles.', '/images/our%20service/final%20styling.png', ARRAY['Art Curation', 'Accessory Styling', 'Textile Selection'], 4)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SEED DATA: PROCESS STEPS
-- ============================================================================
INSERT INTO process_steps (number, title, subtitle, description, duration, cumulative_payment, payment_note, deliverables, image_url, display_order) VALUES
('01', 'Discovery', 'Understanding Your Vision', 'We begin with a meaningful conversation about your aspirations.', '5 Days', 5, 'Pay 5% booking amount to start the discovery phase', ARRAY['Comprehensive home visit', 'Lifestyle questionnaire', 'Moodboard presentation', 'Budget outline'], '/images/how-we-work/stage-1.jpg', 1),
('02', 'Design', 'Crafting the Concept', 'Where imagination meets precision. Our team develops comprehensive design concepts.', '12 Days', 55, 'Pay 50% on Design Freeze to commence manufacturing', ARRAY['Detailed floor plans', '3D visualizations', 'Material specifications', 'Furniture selections'], '/images/how-we-work/stage-2.jpeg', 2),
('03', 'Production', 'Bringing Dreams to Life', 'The art of execution. We coordinate master craftsmen and artisans.', '23 Days', 95, 'Pay 40% during production milestones', ARRAY['Project management', 'Weekly progress updates', 'Quality inspections', 'Logistics coordination'], '/images/how-we-work/stage-3.webp', 3),
('04', 'Handover', 'The Final Unveiling', 'The moment of revelation. We orchestrate the finishing touches.', '5 Days', 100, 'Pay final 5% on project completion', ARRAY['Professional styling', 'Photography session', 'Maintenance guidelines', '30-day support'], '/images/how-we-work/stage-4.jpg', 4)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SEED DATA: VIDEOS
-- ============================================================================
INSERT INTO videos (title, thumbnail_url, category, platform, url, duration) VALUES
('A Day at Precious Interiors', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85', 'workplace', 'youtube', 'https://youtube.com/watch?v=example1', '3:45'),
('Meet Our Design Team', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85', 'workplace', 'instagram', 'https://instagram.com/reel/example1', '1:00'),
('Living Room Transformation', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85', 'renovations', 'youtube', 'https://youtube.com/watch?v=example3', '8:15'),
('Kitchen Makeover Timelapse', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', 'renovations', 'instagram', 'https://instagram.com/reel/example2', '0:45'),
('The Sharma Family Experience', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85', 'testimonials', 'youtube', 'https://youtube.com/watch?v=example5', '4:00')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SEED DATA: SITE CONTENT
-- ============================================================================
INSERT INTO site_content (section_key, content) VALUES
('hero', '{"label": "Premium Interior Design", "headline": {"line1": "TRUST", "line2": "Makes Your Home", "line3": "BEAUTIFUL"}, "subheading": "Where refined elegance meets purposeful design.", "cta": {"primary": {"text": "Start Your Project", "action": "openModal"}, "secondary": {"text": "View Projects", "href": "/projects"}}}'::jsonb),
('about', '{"label": "About Us", "headline": {"line1": "Where Vision", "line2": "Meets Artistry"}, "description": ["At The Precious Interiors, we believe that exceptional design transcends the ordinary.", "With over eight years of dedicated practice, we have honed our craft."], "stats": [{"value": 500, "suffix": "+", "label": "Projects"}, {"value": 8, "label": "Years"}, {"value": 98, "suffix": "%", "label": "Satisfaction"}]}'::jsonb),
('contact_info', '{"phone": {"display": "+91 98765 43210", "href": "tel:+919876543210"}, "email": {"display": "hello@preciousinteriors.com", "href": "mailto:hello@preciousinteriors.com"}, "whatsapp": {"number": "+919876543210"}}'::jsonb)
ON CONFLICT (section_key) DO NOTHING;

-- ============================================================================
-- DONE!
-- ============================================================================
