-- Migration to add homepage_order to posts table and seed default blogs and notices
-- Add homepage_order column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS homepage_order integer NULL;

-- Create index for homepage_order
CREATE INDEX IF NOT EXISTS posts_homepage_order_idx ON public.posts(homepage_order);

-- Clean up existing posts to prevent duplicate key conflicts
DELETE FROM public.posts;

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
    'Polite language, sensory exploration, and positive discipline. Explore how Eureka\'s Montessori wing shapes young minds during their most critical formative years.',
    '"Polite language, sensory exploration, and positive discipline. Explore how Eureka\'s Montessori wing shapes young minds during their most critical formative years. In the Montessori Wing, early childhood learning is focused on polite communication, practical life skills, motor coordination, and sensory development. Using structured play materials, children explore shapes, colors, and numbers under positive discipline guidelines, ensuring a joyful foundation for their education."',
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
