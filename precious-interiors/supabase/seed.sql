-- Precious Interiors Seed Data
-- This file contains INSERT statements to populate all tables with existing content

-- ============================================================================
-- PROJECTS
-- ============================================================================
INSERT INTO projects (slug, title, location, room_type, style, image, year, duration, sqft, description, services, featured) VALUES
('serene-living-room', 'Serene Living Room', 'Whitefield, Bangalore', 'Living Spaces', 'Modern', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85', '2025', '45 days', '1200 sq.ft', 'A luxurious living space featuring floor-to-ceiling windows with panoramic city views and custom Italian furnishings. The design harmoniously blends contemporary aesthetics with functional comfort, creating an inviting atmosphere that reflects modern sophistication.', ARRAY['Full Interior Design', 'Custom Furniture', 'Lighting Design'], true),
('modern-living-space', 'Modern Living Space', 'Delhi, NCR', 'Living Spaces', 'Modern', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85', '2024', '2 weeks', '320 sq.ft', 'Contemporary living area with clean lines and natural light optimization. Every element was carefully selected to create a cohesive design that maximizes space while maintaining an open, airy feel throughout.', ARRAY['Space Planning', 'Furniture Selection', 'Decor'], true),
('minimalist-galley-kitchen', 'Minimalist Galley Kitchen', 'Bangalore, Karnataka', 'Kitchens', 'Modern', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', '2024', '2 weeks', '120 sq.ft', 'Efficient galley kitchen with premium appliances and smart storage solutions. The streamlined design maximizes every inch of space while incorporating high-end finishes and state-of-the-art functionality.', ARRAY['Kitchen Design', 'Custom Cabinetry', 'Appliance Selection'], true),
('french-provincial-bedroom', 'French Provincial Bedroom', 'Mumbai, Maharashtra', 'Bedrooms', 'French', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85', '2024', '3 weeks', '280 sq.ft', 'Elegant bedroom inspired by French countryside aesthetics with ornate details. Soft neutral tones, intricate moldings, and carefully curated antique pieces create a romantic sanctuary that transcends time.', ARRAY['Bedroom Design', 'Custom Headboard', 'Drapery'], true),
('luxury-master-suite', 'Luxury Master Suite', 'Hyderabad, Telangana', 'Bedrooms', 'Luxury', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85', '2024', '6 weeks', '450 sq.ft', 'Opulent master suite with walk-in closet and spa-inspired bathroom. Premium materials, bespoke furnishings, and meticulous attention to detail create an unparalleled retreat of comfort and sophistication.', ARRAY['Full Suite Design', 'Walk-in Wardrobe', 'Ensuite Design'], true),
('smart-home-office', 'Smart Home Office', 'Pune, Maharashtra', 'Offices', 'Smart', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85', '2024', '10 days', '150 sq.ft', 'Tech-integrated home office with ergonomic design and smart lighting. Seamlessly blending productivity with comfort, this workspace features automated controls and future-proof technology infrastructure.', ARRAY['Office Design', 'Tech Integration', 'Ergonomic Planning'], true),
('traditional-kitchen', 'Traditional Kitchen', 'Chennai, Tamil Nadu', 'Kitchens', 'Traditional', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', '2024', '4 weeks', '200 sq.ft', 'Warm traditional kitchen with wooden cabinets and classic brass fixtures. Heritage-inspired design elements meet modern functionality, creating a timeless cooking space that celebrates craftsmanship.', ARRAY['Kitchen Renovation', 'Custom Woodwork', 'Brass Fittings'], false),
('walk-in-wardrobe', 'Walk-in Wardrobe', 'Gurgaon, Haryana', 'Wardrobes', 'Modern', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=85', '2024', '2 weeks', '100 sq.ft', 'Custom walk-in wardrobe with island storage and LED lighting system. Thoughtful organization solutions and premium finishes transform this space into a personal boutique experience.', ARRAY['Wardrobe Design', 'Custom Storage', 'Lighting'], false),
('contemporary-living', 'Contemporary Living', 'Kolkata, West Bengal', 'Living Spaces', 'Modern', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85', '2023', '5 weeks', '400 sq.ft', 'Open-plan living with minimalist furniture and statement art pieces. The design philosophy embraces negative space and carefully curated elements to create a gallery-like living experience.', ARRAY['Interior Design', 'Art Curation', 'Furniture'], false),
('luxury-french-kitchen', 'Luxury French Kitchen', 'Jaipur, Rajasthan', 'Kitchens', 'French', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', '2023', '8 weeks', '350 sq.ft', 'Elegant kitchen with marble counters and classic French cabinetry. Every detail, from the intricate door profiles to the carefully selected hardware, speaks to timeless European elegance.', ARRAY['Kitchen Design', 'Marble Work', 'Custom Cabinets'], false),
('executive-office', 'Executive Office', 'Noida, UP', 'Offices', 'Luxury', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85', '2023', '3 weeks', '250 sq.ft', 'Premium executive office with leather furnishings and wood paneling. Commanding yet refined, this workspace conveys success while providing an environment conducive to focused decision-making.', ARRAY['Office Design', 'Custom Furniture', 'Wall Paneling'], false),
('smart-bedroom', 'Smart Bedroom', 'Ahmedabad, Gujarat', 'Bedrooms', 'Smart', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85', '2023', '4 weeks', '300 sq.ft', 'Automated bedroom with smart controls for lighting, blinds, and climate. Cutting-edge home automation seamlessly integrates with serene design aesthetics for the ultimate in modern comfort.', ARRAY['Smart Home Integration', 'Bedroom Design', 'Automation'], false);

-- ============================================================================
-- VIDEOS
-- ============================================================================
INSERT INTO videos (title, thumbnail, category, platform, url, duration) VALUES
-- Workplace Videos
('A Day at Precious Interiors', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85', 'workplace', 'youtube', 'https://youtube.com/watch?v=example1', '3:45'),
('Meet Our Design Team', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85', 'workplace', 'instagram', 'https://instagram.com/reel/example1', '1:00'),
('Behind the Scenes: Material Selection', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85', 'workplace', 'youtube', 'https://youtube.com/watch?v=example2', '5:20'),
-- Renovation Videos
('Living Room Transformation', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85', 'renovations', 'youtube', 'https://youtube.com/watch?v=example3', '8:15'),
('Kitchen Makeover Timelapse', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85', 'renovations', 'instagram', 'https://instagram.com/reel/example2', '0:45'),
('Bedroom Redesign Journey', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85', 'renovations', 'youtube', 'https://youtube.com/watch?v=example4', '6:30'),
('Office Space Renovation', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85', 'renovations', 'instagram', 'https://instagram.com/reel/example3', '1:15'),
-- Testimonial Videos
('The Sharma Family Experience', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85', 'testimonials', 'youtube', 'https://youtube.com/watch?v=example5', '4:00'),
('Client Review: Modern Villa Project', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85', 'testimonials', 'instagram', 'https://instagram.com/reel/example4', '0:55'),
('Why We Chose Precious Interiors', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85', 'testimonials', 'youtube', 'https://youtube.com/watch?v=example6', '3:20');

-- ============================================================================
-- SERVICES
-- ============================================================================
INSERT INTO services (title, description, features, image, sort_order) VALUES
('Strategic Planning', 'We begin every project with deep understanding. Through comprehensive consultation, we analyze your space, lifestyle, and aspirations to create a vision that''s uniquely yours.', ARRAY['Space Analysis', 'Lifestyle Assessment', 'Budget Planning'], '/images/our%20service/strategic%20plans.jpg', 1),
('Interior Design', 'Our design philosophy marries timeless elegance with contemporary sensibility. We craft cohesive visual narratives that transform spaces into artistic expressions.', ARRAY['Concept Development', 'Material Selection', '3D Visualization'], '/images/our%20service/interior%20designing.png', 2),
('Custom Furnishing', 'Beyond off-the-shelf solutions, we design bespoke furniture pieces that perfectly complement your space and reflect your personal aesthetic.', ARRAY['Bespoke Design', 'Artisan Craftsmanship', 'Premium Materials'], '/images/our%20service/custom%20furniture.webp', 3),
('Final Styling', 'The finishing touches transform a designed space into a living environment. We curate art, accessories, and textiles that bring warmth and personality.', ARRAY['Art Curation', 'Accessory Styling', 'Textile Selection'], '/images/our%20service/final%20styling.png', 4);

-- ============================================================================
-- TESTIMONIALS
-- ============================================================================
INSERT INTO testimonials (quote, client_name, client_title, project_type, image, rating) VALUES
('The Precious Interiors transformed our house into a sanctuary. Their understanding of light, space, and texture created an environment that feels both luxurious and deeply personal.', 'Victoria Sterling', 'CEO, Sterling Ventures', 'Manhattan Penthouse', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', 5),
('Working with this team was an extraordinary experience. They listened intently, challenged us thoughtfully, and delivered beyond our highest expectations.', 'Marcus Chen', 'Creative Director', 'Brooklyn Brownstone', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 5),
('The attention to craft and detail is remarkable. From custom millwork to the curated art collection, every element has been considered. This isn''t decoration—it''s architecture of atmosphere.', 'Isabelle Fontaine', 'Art Collector', 'Malibu Residence', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', 5);

-- ============================================================================
-- PROCESS STEPS
-- ============================================================================
INSERT INTO process_steps (step_number, title, subtitle, description, duration, cumulative_payment, payment_note, deliverables, image, sort_order) VALUES
('01', 'Discovery', 'Understanding Your Vision', 'We begin with a meaningful conversation about your aspirations. Our designers immerse themselves in understanding your lifestyle, preferences, and the way you envision your ideal space. This foundational stage sets the tone for everything that follows.', '5 Days', 5, 'Pay 5% booking amount to start the discovery phase', ARRAY['Comprehensive home visit & space assessment', 'Lifestyle & aesthetic questionnaire', 'Moodboard presentation', 'Preliminary scope & budget outline'], '/images/how-we-work/stage-1.jpg', 1),
('02', 'Design', 'Crafting the Concept', 'Where imagination meets precision. Our team develops comprehensive design concepts that translate your vision into tangible plans. Every detail is considered—from spatial flow to material textures—creating a blueprint for transformation.', '12 Days', 55, 'Pay 50% on Design Freeze to commence manufacturing', ARRAY['Detailed floor plans & elevations', 'Photorealistic 3D visualizations', 'Material & finish specifications', 'Complete furniture selections'], '/images/how-we-work/stage-2.jpeg', 2),
('03', 'Production', 'Bringing Dreams to Life', 'The art of execution. We coordinate master craftsmen, artisans, and trusted vendors to bring your design to reality. Our meticulous project management ensures every element meets our exacting standards of quality and timeline.', '23 Days', 95, 'Pay 40% during production milestones', ARRAY['Dedicated project management', 'Weekly progress documentation', 'Quality assurance inspections', 'Procurement & logistics coordination'], '/images/how-we-work/stage-3.webp', 3),
('04', 'Handover', 'The Final Unveiling', 'The moment of revelation. We orchestrate the finishing touches—styling, art placement, and final adjustments—before unveiling your transformed space. A home that tells your story, ready for the memories yet to come.', '5 Days', 100, 'Pay final 5% on project completion', ARRAY['Professional styling & staging', 'Architectural photography session', 'Maintenance & care guidelines', '30-day post-completion support'], '/images/how-we-work/stage-4.jpg', 4);

-- ============================================================================
-- SITE CONTENT (JSONB)
-- ============================================================================

-- Hero Section Content
INSERT INTO site_content (section_key, content) VALUES
('hero', '{
  "label": "Premium Interior Design",
  "headline": {
    "line1": "TRUST",
    "line2": "Makes Your Home",
    "line3": "BEAUTIFUL"
  },
  "subheading": "Where refined elegance meets purposeful design. We transform spaces into living narratives of sophistication.",
  "cta": {
    "primary": {
      "text": "Start Your Project",
      "action": "openModal"
    },
    "secondary": {
      "text": "View Projects",
      "href": "/projects"
    }
  },
  "video": "/hero section/7578545-uhd_3840_2160_30fps.mp4"
}'::jsonb);

-- About Section Content
INSERT INTO site_content (section_key, content) VALUES
('about', '{
  "label": "About Us",
  "headline": {
    "line1": "Where Vision",
    "line2": "Meets Artistry"
  },
  "description": [
    "At The Precious Interiors, we believe that exceptional design transcends the ordinary. Our philosophy centers on creating spaces that are not merely decorated, but thoughtfully crafted to embody your unique essence and aspirations.",
    "With over eight years of dedicated practice, we have honed our craft to deliver interiors that balance timeless elegance with contemporary sensibility."
  ],
  "values": [
    {
      "title": "Timeless Design",
      "description": "Creating spaces that transcend fleeting trends, focusing on enduring elegance."
    },
    {
      "title": "Bespoke Solutions",
      "description": "Every project uniquely tailored to your vision and lifestyle needs."
    },
    {
      "title": "Refined Craft",
      "description": "Meticulous attention to every detail, from concept to completion."
    }
  ],
  "stats": [
    { "value": 500, "suffix": "+", "label": "Projects Completed" },
    { "value": 8, "suffix": "", "label": "Years of Excellence" },
    { "value": 50, "suffix": "+", "label": "Design Awards" },
    { "value": 98, "suffix": "%", "label": "Client Satisfaction" }
  ],
  "images": {
    "main": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
    "secondary": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=85"
  },
  "cta": {
    "text": "Explore Our Work",
    "href": "/projects"
  }
}'::jsonb);

-- Why Choose Us Content
INSERT INTO site_content (section_key, content) VALUES
('why_choose_us', '{
  "label": "Why Us",
  "headline": "Why Choose The Precious Interiors",
  "features": [
    {
      "title": "Quality Materials",
      "description": "Only premium materials and finishes used",
      "image": "/choose%20us/quality.jpg"
    },
    {
      "title": "On-Time Delivery",
      "description": "Projects completed within promised timelines",
      "image": "/choose%20us/on-time-delivery.jpg"
    },
    {
      "title": "Affordable Pricing",
      "description": "Luxury designs at competitive prices",
      "image": "/choose%20us/affordable-pricing.jpg"
    },
    {
      "title": "5 Year Warranty",
      "description": "Comprehensive warranty on all work",
      "image": "/choose%20us/5-years.jpeg"
    }
  ]
}'::jsonb);

-- Contact Info Content
INSERT INTO site_content (section_key, content) VALUES
('contact_info', '{
  "label": "Get In Touch",
  "headline": {
    "line1": "Let''s Create",
    "line2": "Together"
  },
  "description": "Ready to transform your space into something extraordinary? We''d love to hear about your vision and discuss how we can bring it to life.",
  "phone": {
    "display": "+91 90100 91191",
    "href": "tel:+919010091191"
  },
  "email": {
    "display": "manikanta@thepreciousinteriors.com",
    "href": "mailto:manikanta@thepreciousinteriors.com"
  },
  "hours": {
    "weekdays": { "days": "Monday - Friday", "time": "9:00 AM - 6:00 PM" },
    "saturday": { "days": "Saturday", "time": "10:00 AM - 4:00 PM" },
    "sunday": { "days": "Sunday", "time": "By Appointment" }
  },
  "whatsapp": {
    "number": "+919010091191"
  },
  "form": {
    "title": "Start Your Project",
    "subtitle": "Fill out the form below and we''ll get back to you within 24 hours.",
    "projectTypes": ["Residential", "Commercial", "Hospitality", "Other"]
  }
}'::jsonb);

-- Footer Content
INSERT INTO site_content (section_key, content) VALUES
('footer', '{
  "brand": {
    "tagline": "Transforming spaces into extraordinary experiences since 2016. Where refined elegance meets purposeful design."
  },
  "links": {
    "company": [
      { "name": "Services", "href": "/services" },
      { "name": "Projects", "href": "/projects" },
      { "name": "Contact", "href": "/contact" }
    ],
    "services": [
      { "name": "Interior Design", "href": "/services" },
      { "name": "Space Planning", "href": "/services" },
      { "name": "Custom Furniture", "href": "/services" },
      { "name": "Art Curation", "href": "/services" }
    ]
  },
  "social": [
    { "name": "Instagram", "href": "https://instagram.com" },
    { "name": "LinkedIn", "href": "https://linkedin.com" },
    { "name": "Pinterest", "href": "https://pinterest.com" }
  ],
  "newsletter": {
    "title": "Newsletter",
    "description": "Subscribe for design inspiration and exclusive updates.",
    "placeholder": "Your email"
  },
  "contact": {
    "email": "manikanta@thepreciousinteriors.com",
    "phone": "+91 90100 91191"
  },
  "legal": {
    "copyright": "The Precious Interiors. All rights reserved.",
    "links": [
      { "name": "Privacy Policy", "href": "/privacy" },
      { "name": "Terms of Service", "href": "/terms" }
    ]
  }
}'::jsonb);

-- Service Highlights (Marquee Items)
INSERT INTO site_content (section_key, content) VALUES
('service_highlights', '{
  "items": [
    "Living Room Design",
    "Bedroom & Master Suite",
    "Kitchen & Dining",
    "Bathroom Design",
    "Home Office Setup",
    "Kids Room Design",
    "Pooja Room Design",
    "Balcony & Terrace",
    "Bespoke Furniture",
    "Custom Wardrobes",
    "Modular Kitchen",
    "TV Unit & Entertainment",
    "Home Renovation",
    "Kitchen Remodeling",
    "Bathroom Remodeling",
    "3D Renders",
    "Virtual Walkthrough",
    "Floor Plans"
  ]
}'::jsonb);

-- Project Stats Content
INSERT INTO site_content (section_key, content) VALUES
('project_stats', '{
  "label": "Our Track Record",
  "headline": {
    "text": "Numbers That",
    "highlight": "Speak"
  },
  "stats": [
    {
      "icon": "Award",
      "value": 500,
      "suffix": "+",
      "label": "Projects Completed",
      "description": "Spaces transformed"
    },
    {
      "icon": "Users",
      "value": 98,
      "suffix": "%",
      "label": "Client Satisfaction",
      "description": "Happy homeowners"
    },
    {
      "icon": "MapPin",
      "value": 25,
      "suffix": "+",
      "label": "Cities Served",
      "description": "Across the nation"
    },
    {
      "icon": "Calendar",
      "value": 8,
      "suffix": "+",
      "label": "Years Experience",
      "description": "Of excellence"
    }
  ],
  "quote": "Every project is a new opportunity to create something extraordinary."
}'::jsonb);
