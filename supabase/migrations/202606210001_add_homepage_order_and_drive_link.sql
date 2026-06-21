-- Ensure role check helper functions exist
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.has_role(roles text[])
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT coalesce(public.current_user_role() = any(roles), false)
$$;

-- Add homepage_order column to posts
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS homepage_order integer NULL;
CREATE INDEX IF NOT EXISTS posts_homepage_order_idx ON public.posts(homepage_order);

-- Add sort_order column to achievements
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS achievements_sort_order_idx ON public.achievements(sort_order);

-- Ensure foreign key constraints on media_assets have ON DELETE SET NULL to prevent deletion violations
ALTER TABLE public.banners DROP CONSTRAINT IF EXISTS banners_image_id_fkey;
ALTER TABLE public.banners ADD CONSTRAINT banners_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_cover_image_id_fkey;
ALTER TABLE public.posts ADD CONSTRAINT posts_cover_image_id_fkey FOREIGN KEY (cover_image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_cover_image_id_fkey;
ALTER TABLE public.events ADD CONSTRAINT events_cover_image_id_fkey FOREIGN KEY (cover_image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.achievements DROP CONSTRAINT IF EXISTS achievements_image_id_fkey;
ALTER TABLE public.achievements ADD CONSTRAINT achievements_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.programs DROP CONSTRAINT IF EXISTS programs_image_id_fkey;
ALTER TABLE public.programs ADD CONSTRAINT programs_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.gallery_items DROP CONSTRAINT IF EXISTS gallery_items_image_id_fkey;
ALTER TABLE public.gallery_items ADD CONSTRAINT gallery_items_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.documents DROP CONSTRAINT IF EXISTS documents_file_id_fkey;
ALTER TABLE public.documents ADD CONSTRAINT documents_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

ALTER TABLE public.testimonials DROP CONSTRAINT IF EXISTS testimonials_image_id_fkey;
ALTER TABLE public.testimonials ADD CONSTRAINT testimonials_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.media_assets(id) ON DELETE SET NULL;

-- Ensure gallery_items table exists
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_id uuid references public.media_assets(id) on delete set null,
  album text,
  sort_order int not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure missing columns exist in case the table was created previously without them
ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Ensure gallery_items triggers and indexes exist
CREATE OR REPLACE TRIGGER gallery_items_set_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS gallery_featured_sort_idx ON public.gallery_items(is_featured, sort_order);

-- Ensure RLS and Policies exist on gallery_items
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_items' AND policyname = 'Public can read active gallery items') THEN
    CREATE POLICY "Public can read active gallery items" ON public.gallery_items FOR SELECT TO anon, authenticated USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery_items' AND policyname = 'Content editors manage gallery items') THEN
    CREATE POLICY "Content editors manage gallery items" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(array['super_admin', 'admin', 'editor'])) WITH CHECK (public.has_role(array['super_admin', 'admin', 'editor']));
  END IF;
END $$;

-- Clean up existing posts to prevent duplicate key conflicts
DELETE FROM public.posts;

-- Seed referenced media assets to satisfy foreign keys
INSERT INTO public.media_assets (id, bucket, path, alt_text, caption)
VALUES
  ('10000000-0000-0000-0000-000000000016', 'public-media', 'images/see results 2082.jpg', 'SEE board result', 'SEE topper batch'),
  ('10000000-0000-0000-0000-000000000008', 'public-media', 'images/montessori.jpg', 'Montessori classroom', 'Pre-school wing'),
  ('10000000-0000-0000-0000-000000000021', 'public-media', 'images/robotic club.png', 'Robotics hardware', 'Robotics and AI club'),
  ('10000000-0000-0000-0000-000000000020', 'public-media', 'images/eurekeans futsal.jpg', 'Modern play arena', 'Futsal ground'),
  ('10000000-0000-0000-0000-000000000023', 'public-media', 'images/student in science lab.JPG', 'Science practical', 'Labs session'),
  ('10000000-0000-0000-0000-000000000018', 'public-media', 'images/volleyball.jpg', 'Outdoor sports zone', 'Volleyball court')
ON CONFLICT (id) DO UPDATE SET
  path = EXCLUDED.path,
  alt_text = EXCLUDED.alt_text,
  caption = EXCLUDED.caption;

-- Seed default blogs and notices
INSERT INTO public.posts (id, type, slug, title, excerpt, body, cover_image_id, status, pinned, published_at, homepage_order)
VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'blog',
    'transforming-classroom-theory-pbl',
    'Transforming Classroom Theory into Real-Life Competence with PBL',
    'Project-Based Learning (PBL) forms the core of our educational module. Discover how students apply physics and science theories to hands-on solutions.',
    '"Project-Based Learning (PBL) forms the core of our educational module. Discover how students apply physics and science theories to hands-on solutions. At Eureka, we believe that education is not just about memorizing text books; it is about applying theories to solve real-world problems. Through PBL, students in secondary levels build working models, conduct experiments, and present their findings to the school community. This methodology not only fosters deep conceptual clarity but also builds team work, critical thinking, and leadership."',
    '10000000-0000-0000-0000-000000000021',
    'published',
    false,
    '2026-06-21 00:00:00+00',
    1
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'blog',
    'eastern-cultural-values-digital-classrooms',
    'Eastern Cultural Values and Modern Digital Classrooms',
    'Balancing smart boards and AI coding clubs with traditional eastern discipline and moral values prepares students to be responsible global citizens.',
    '"Balancing smart boards and AI coding clubs with traditional eastern discipline and moral values prepares students to be responsible global citizens. The transition into digital learning spaces is crucial, but it should not come at the cost of character development. Eureka provides regular yoga sessions, assembly discipline, and values education alongside coding, digital libraries, and smart boards to create a holistic growth environment."',
    '10000000-0000-0000-0000-000000000020',
    'published',
    false,
    '2026-06-20 00:00:00+00',
    2
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'blog',
    'early-childhood-montessori-sensory-learning',
    'Early Childhood Development: The Power of Montessori sensory learning',
    'Polite language, sensory exploration, and positive discipline. Explore how Eureka''s Montessori wing shapes young minds during their most critical formative years.',
    '"Polite language, sensory exploration, and positive discipline. Explore how Eureka''s Montessori wing shapes young minds during their most critical formative years. In the Montessori Wing, early childhood learning is focused on polite communication, practical life skills, motor coordination, and sensory development. Using structured play materials, children explore shapes, colors, and numbers under positive discipline guidelines, ensuring a joyful foundation for their education."',
    '10000000-0000-0000-0000-000000000008',
    'published',
    false,
    '2026-06-19 00:00:00+00',
    3
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    'notice',
    '100-pass-rate-see-board-results-2082',
    '100% Pass Rate in SEE Board Results 2082',
    'We congratulate our 106 candidates who achieved a 100% pass rate in the SEE examination, featuring 3 students with a perfect GPA 4.0.',
    '"We congratulate our 106 candidates who achieved a 100% pass rate in the SEE examination, featuring 3 students with a perfect GPA 4.0: Naman Gupta, Suyash Khatiwada, and Ishan Chhetri. The school administration and teachers congratulate all students for their consistent hard work and achievements."',
    '10000000-0000-0000-0000-000000000016',
    'published',
    false,
    '2026-06-12 00:00:00+00',
    NULL
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    'notice',
    'admission-open-grade-xi-xii',
    'Admission Open for Grade XI & XII (Science & Management)',
    'Form distribution has commenced at Front Desk Block A. Entrance exams are scheduled for 25th and 26th Chaitra.',
    '"Form distribution has commenced at Front Desk Block A. Entrance exams are scheduled for 25th and 26th Chaitra. Form submission guidelines, prospectus, and scholarships criteria can be obtained at the school front desk or via the online admissions inquiry portal. Admission is open for Science, Management, and Computer Science streams."',
    '10000000-0000-0000-0000-000000000023',
    'published',
    false,
    '2026-06-15 00:00:00+00',
    NULL
  ),
  (
    '20000000-0000-0000-0000-000000000006',
    'notice',
    'eureka-shines-hissan-sports-meet-2082',
    'Eureka Shines at the Hissan Sports Meet 2082',
    'Eureka clinched the 1st Position in multiple events at the Koshi Province Hissan Sports meet, showing top sportsmanship.',
    '"Eureka clinched the 1st Position in multiple events at the Koshi Province Hissan Sports meet, showing top sportsmanship. Our volleyball and table tennis teams achieved gold medals in provinces. The school management congratulates the students and coach team for their outstanding sports performance."',
    '10000000-0000-0000-0000-000000000018',
    'published',
    false,
    '2026-05-28 00:00:00+00',
    NULL
  );

-- Seed Banners including popup placement
INSERT INTO public.banners (id, title, subtitle, image_id, cta_label, cta_href, placement, sort_order, is_active)
VALUES
  ('b0000000-0000-0000-0000-000000000101', 'Admission Open for Grade XI & XII (Science & Management)', 'Entrance exams scheduled for 25th and 26th Chaitra. Visit Block A front desk.', '10000000-0000-0000-0000-000000000023', 'Apply Now', '/admission', 'popup', 1, true),
  ('b0000000-0000-0000-0000-000000000102', 'Eureka SEE Results 2082: 100% Pass Rate', 'Congratulations to our toppers Naman, Suyash, and Ishan for achieving GPA 4.0!', '10000000-0000-0000-0000-000000000016', 'View Toppers', '/hall-of-fame', 'popup', 2, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_id = EXCLUDED.image_id,
  cta_label = EXCLUDED.cta_label,
  cta_href = EXCLUDED.cta_href,
  placement = EXCLUDED.placement,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Seed life-at-eureka page block
INSERT INTO public.pages (id, slug, title, excerpt, body, status, published_at)
VALUES (
  'da000000-0000-0000-0000-000000000002',
  'life-at-eureka',
  'Life at Eureka',
  'Experience co-curricular activities, active sports facilities, and diverse student-run clubs at Eureka Residential Secondary School.',
  '{
    "sports": [
      {
        "title": "Table Tennis Arena",
        "category": "Indoor Sports",
        "tag": "Daily Matches",
        "desc": "Equipped with multiple professional tables, our indoor arena supports daily student challenges, coaching clinics, and terminal tournaments.",
        "image": "/images/table tennis.jpg",
        "details": ["Multiple pro tables", "Coaching guides", "Singles/Doubles matches", "Inter-House leagues"]
      },
      {
        "title": "Volleyball Court",
        "category": "Outdoor Athletics",
        "tag": "Tournament Ready",
        "desc": "A full-sized clay volleyball court hosts intense inter-house clashes and is the training ground for our HISSAN Sports Meet champions.",
        "image": "/images/volleyball.jpg",
        "details": ["Standard court size", "Clay play court", "Regular matches", "Annual championships"]
      },
      {
        "title": "Futsal Ground",
        "category": "Proposed Infrastructure",
        "tag": "Modern Turf",
        "desc": "Our planned modern turf futsal arena is designed to keep students fit, collaborative, and engaged in tactical team football.",
        "image": "/images/eurekeans futsal.jpg",
        "details": ["Planned turf field", "All-weather play", "Tactical sessions", "After-school tournaments"]
      },
      {
        "title": "Yoga & Mindfulness",
        "category": "Wellness & Focus",
        "tag": "Daily Morning",
        "desc": "To balance academic rigor, students practice daily yoga and meditation, improving flexibility, respiratory health, and cognitive concentration.",
        "image": "/images/yoga programmes.jpg",
        "details": ["Professional instructors", "Flexibility postures", "Guided breathing", "Morning routines"]
      }
    ],
    "clubs": [
      {
        "title": "Robotics & AI Club",
        "subtitle": "Coding & Engineering Hub",
        "desc": "Students learn Arduino coding, microcontrollers, sensor integration, and basic artificial intelligence to design autonomous models.",
        "image": "/images/robotic club.png",
        "icon": "Cpu",
        "colorClass": "bg-[#3eaea6]/10 text-[#3eaea6]",
        "borderColor": "hover:border-[#3eaea6]"
      },
      {
        "title": "Youth Forum & Debate",
        "subtitle": "Oratory & Social Forum",
        "desc": "Fosters public speaking, debate capability, structural thinking, and local social initiatives to create confident tomorrow-ready leaders.",
        "image": "/images/youth forum.jpg",
        "icon": "MessageSquare",
        "colorClass": "bg-[#ff7b3b]/10 text-[#ff7b3b]",
        "borderColor": "hover:border-[#ff7b3b]"
      },
      {
        "title": "Science Practical Circle",
        "subtitle": "Laboratory & Botany Field Research",
        "desc": "Hands-on chemical experiments, physics models, biology microscopic studies, and collection of local herbarium specimens.",
        "image": "/images/student in science  lab.JPG",
        "icon": "Microscope",
        "colorClass": "bg-[#10233f]/10 text-[#10233f]",
        "borderColor": "hover:border-[#10233f]"
      },
      {
        "title": "Arts & Culture Club",
        "subtitle": "Music, Dance & Fine Arts",
        "desc": "Dedicated to training students in traditional, folk, and modern dances, classical music, dramatic theatre, and annual celebrations.",
        "image": "/images/cultural programme.JPG",
        "icon": "Palette",
        "colorClass": "bg-[#ffb03b]/10 text-[#ffb03b]",
        "borderColor": "hover:border-[#ffb03b]"
      }
    ],
    "gallery": [
      { "src": "/images/plantation programme.jpg", "category": "Outreach", "title": "Eco Club Tree Plantation" },
      { "src": "/images/world evironment day.jpg", "category": "Exhibitions", "title": "Environment Day Projects" },
      { "src": "/images/christmas celebration.jpg", "category": "Celebrations", "title": "Christmas Winter Carnival" },
      { "src": "/images/see results 2082.jpg", "category": "Achievements", "title": "SEE Success Celebration" },
      { "src": "/images/alumnai students.JPG", "category": "Community", "title": "Alumni Interaction Panel" },
      { "src": "/images/arts.JPG", "category": "Exhibitions", "title": "Fine Arts & Craft Exhibition" },
      { "src": "/images/kids in library.jpg", "category": "Academics", "title": "Primary Reading Excursions" },
      { "src": "/images/kids singing.jpeg", "category": "Celebrations", "title": "Music Class Performance" }
    ],
    "videos": [
      {
        "title": "Eureka Campus Video Tour",
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        "title": "Holistic Sports and Futsal Match",
        "url": "https://drive.google.com/file/d/1Xy8y_q2S9G_g_L-z_Ww_G7_v9w_P9G_/view"
      }
    ]
  }'::jsonb,
  'published',
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;
