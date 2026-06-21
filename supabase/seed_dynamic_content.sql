-- Eureka Dynamic Content Seed Script
-- Run this script in the Supabase SQL editor to populate all dynamic content tables.

-- Note: Seeding of admin users is removed for security before pushing to GitHub.


-- Clean up existing content data to prevent duplicate unique/ID mismatch conflicts
DELETE FROM public.banners;
DELETE FROM public.gallery_items;
DELETE FROM public.documents;
DELETE FROM public.achievements;
DELETE FROM public.posts;
DELETE FROM public.events;
DELETE FROM public.programs;
DELETE FROM public.faq_items;
DELETE FROM public.testimonials;
DELETE FROM public.media_assets;

-- 3. Seed site settings
INSERT INTO public.site_settings (key, value)
VALUES
  ('school_identity', '{
    "name": "Eureka Residential Secondary School",
    "shortName": "Eureka",
    "motto": "In Pursuit of Excellence",
    "address": "Dharan-1, Laxmi Sadak, Sunsari",
    "phone": "+977-25-535533 / 578788",
    "email": "eurekadharan@gmail.com",
    "established": "2050 B.S. / 1994 A.D.",
    "students": "1,600+",
    "levels": "Montessori / Playgroup to Grade XII (+2)"
  }'::jsonb),
  ('admission_strip', '{
    "label": "New Admission 2083 (2026/27)",
    "href": "/admission"
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 4. Seed media assets (UUIDs map to local public paths)
INSERT INTO public.media_assets (id, bucket, path, alt_text, caption)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'public-media', 'images/school building.jpg', 'Eureka school building', 'Main campus view'),
  ('10000000-0000-0000-0000-000000000002', 'public-media', 'images/yoga programmes.jpg', 'Yoga session', 'Morning wellness programs'),
  ('10000000-0000-0000-0000-000000000003', 'public-media', 'images/10+2 students groups.jpg', 'Secondary students', 'Pre-university streams'),
  ('10000000-0000-0000-0000-000000000004', 'public-media', 'images/staffs.jpg', 'School staffs', 'Educators team'),
  ('10000000-0000-0000-0000-000000000005', 'public-media', 'images/principal.jpg', 'Principal Mr. Kuran Chemjong', 'Principal portrait'),
  ('10000000-0000-0000-0000-000000000006', 'public-media', 'images/bijay kumar shrestha.png', 'Mr. Bijay Kumar Shrestha', 'Secondary coordinator'),
  ('10000000-0000-0000-0000-000000000007', 'public-media', 'images/bhuwan sanjel.jpeg', 'Mr. Bhuwan Sanjel', 'Basic coordinator'),
  ('10000000-0000-0000-0000-000000000008', 'public-media', 'images/montessori.jpg', 'Montessori classroom', 'Pre-school wing'),
  ('10000000-0000-0000-0000-000000000009', 'public-media', 'images/primary kids.jpg', 'Primary students', 'Primary wing'),
  ('10000000-0000-0000-0000-000000000010', 'public-media', 'images/secondary level.jpg', 'Secondary students', 'Basic level wing'),
  ('10000000-0000-0000-0000-000000000011', 'public-media', 'images/kids in digital screen.jpeg', 'Digital learning', 'Smart classrooms'),
  ('10000000-0000-0000-0000-000000000012', 'public-media', 'images/10+2 science.jpg', 'Science stream', 'Advanced laboratories'),
  ('10000000-0000-0000-0000-000000000013', 'public-media', 'images/10+2 management.jpg', 'Management stream', 'Commerce streams'),
  ('10000000-0000-0000-0000-000000000014', 'public-media', 'images/10+2 computer science.jpg', 'IT labs', 'Computer coding'),
  ('10000000-0000-0000-0000-000000000015', 'public-media', 'images/10+2 students.jpg', 'Students group', 'Eureka pride'),
  ('10000000-0000-0000-0000-000000000016', 'public-media', 'images/see results 2082.jpg', 'SEE board result', 'SEE topper batch'),
  ('10000000-0000-0000-0000-000000000017', 'public-media', 'images/4 gpa.jpg', 'GPA 4.0 achievers', 'Alumni toppers'),
  ('10000000-0000-0000-0000-000000000018', 'public-media', 'images/volleyball.jpg', 'Volleyball court', 'Outdoor sports zone'),
  ('10000000-0000-0000-0000-000000000019', 'public-media', 'images/table tennis.jpg', 'Table tennis', 'Indoor sports zone'),
  ('10000000-0000-0000-0000-000000000020', 'public-media', 'images/eurekeans futsal.jpg', 'Futsal ground', 'Modern play arena'),
  ('10000000-0000-0000-0000-000000000021', 'public-media', 'images/robotic club.png', 'Robotics hardware', 'Robotics and AI club'),
  ('10000000-0000-0000-0000-000000000022', 'public-media', 'images/youth forum.jpg', 'Youth debate', 'Speech and debates'),
  ('10000000-0000-0000-0000-000000000023', 'public-media', 'images/student in science lab.JPG', 'Science practical', 'Labs session'),
  ('10000000-0000-0000-0000-000000000024', 'public-media', 'images/cultural programme.JPG', 'Cultural program', 'Dance and music'),
  ('10000000-0000-0000-0000-000000000025', 'public-media', 'images/plantation programme.jpg', 'Plantation club', 'Eco environment drive'),
  ('10000000-0000-0000-0000-000000000026', 'public-media', 'images/world evironment day.jpg', 'Environment display', 'PBL showcases'),
  ('10000000-0000-0000-0000-000000000027', 'public-media', 'images/christmas celebration.jpg', 'Winter carnival', 'Social events'),
  ('10000000-0000-0000-0000-000000000028', 'public-media', 'images/alumnai students.JPG', 'Alumni panel', 'Career sessions'),
  ('10000000-0000-0000-0000-000000000029', 'public-media', 'images/arts.JPG', 'Arts display', 'Crafts exhibition'),
  ('10000000-0000-0000-0000-000000000030', 'public-media', 'images/kids in library.jpg', 'Library hours', 'Primary reading'),
  ('10000000-0000-0000-0000-000000000031', 'public-media', 'images/kids singing.jpeg', 'Music class', 'Vocal guidelines'),
  ('10000000-0000-0000-0000-000000000032', 'public-media', 'images/students in house dress.jpg', 'Students group', 'House dress sports'),
  ('10000000-0000-0000-0000-000000000050', 'public-media', 'images/kids with cards.jpg', 'Kids learning with cards', 'Montessori activity'),
  ('10000000-0000-0000-0000-000000000051', 'public-media', 'images/kids in group.JPG', 'Kids posing in group', 'Primary banner'),
  ('10000000-0000-0000-0000-000000000052', 'public-media', 'images/student in assembly.jpg', 'Students in morning assembly', 'Discipline and assembly'),
  ('10000000-0000-0000-0000-000000000053', 'public-media', 'images/student in science  lab.JPG', 'Students performing chemistry experiments', 'Science practical'),
  ('10000000-0000-0000-0000-000000000054', 'public-media', 'images/seminar in ai.jpg', 'AI and computer science seminar', 'Computer lab stream'),
  ('10000000-0000-0000-0000-000000000101', 'public-media', 'images/Suva ratna.jpeg', 'Suva Ratna Rai portrait', 'Ms. Suva Ratna Rai'),
  ('10000000-0000-0000-0000-000000000102', 'public-media', 'images/Roshan atal.png', 'Roshan Atal portrait', 'Dr. Roshan Atal'),
  ('10000000-0000-0000-0000-000000000103', 'public-media', 'images/Narendra Shrestha SLC 2059- 74.3%.jpg', 'Narendra Shrestha portrait', 'Mr. Narendra Shrestha'),
  ('10000000-0000-0000-0000-000000000104', 'public-media', 'images/ganesh agrawal.jpeg', 'Ganesh Agrawal portrait', 'Dr. Ganesh Agrawal'),
  ('10000000-0000-0000-0000-000000000105', 'public-media', 'images/Dr . Benju Shrestha.jpg', 'Benju Shrestha portrait', 'Dr. Benju Shrestha'),
  ('10000000-0000-0000-0000-000000000106', 'public-media', 'images/aashish shrestha.jpeg', 'Ashish Shrestha portrait', 'Mr. Ashish Shrestha'),
  ('10000000-0000-0000-0000-000000000107', 'public-media', 'images/Yugesh Rai.jpg', 'Yugesh Chandra Rai portrait', 'Mr. Yugesh Chandra Rai'),
  ('10000000-0000-0000-0000-000000000108', 'public-media', 'images/safina shrestha.jpeg', 'Safina Shrestha portrait', 'Ms. Safina Shrestha'),
  ('10000000-0000-0000-0000-000000000109', 'public-media', 'images/Munal Kafle, SEE 2078 topper -3.75.jpg', 'Munal Kafle portrait', 'Mr. Munal Kafle'),
  ('10000000-0000-0000-0000-000000000110', 'public-media', 'images/Alzens Rai, SEE 2081 topper 3.84.jpg', 'Alzens Rai portrait', 'Mr. Alzens Rai')
ON CONFLICT (bucket, path) DO UPDATE SET alt_text = EXCLUDED.alt_text, caption = EXCLUDED.caption;

-- 5. Seed Banners (for the Hero Carousel)
INSERT INTO public.banners (id, title, subtitle, image_id, cta_label, cta_href, placement, sort_order, is_active)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Eureka Residential Secondary School', 'Helping students pursue excellence with discipline and confidence', '10000000-0000-0000-0000-000000000001', 'Discover Us', '/about', 'home_hero', 1, true),
  ('b0000000-0000-0000-0000-000000000002', 'Holistic Development', 'Daily yoga and mindfulness to build concentration and mental health', '10000000-0000-0000-0000-000000000002', 'Admissions', '/admission', 'home_hero', 2, true),
  ('b0000000-0000-0000-0000-000000000003', '10+2 Secondary Streams', 'Excellent results and board performance in Science, Management, and Computer Science', '10000000-0000-0000-0000-000000000003', 'Explore Streams', '/programs#plus-two', 'home_hero', 3, true),
  ('b0000000-0000-0000-0000-000000000004', 'Dedicated Educators Team', 'Catering Montessori to Grade XII with project-based learning and care', '10000000-0000-0000-0000-000000000004', 'Meet Leadership', '/about', 'home_hero', 4, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  image_id = EXCLUDED.image_id,
  cta_label = EXCLUDED.cta_label,
  cta_href = EXCLUDED.cta_href,
  placement = EXCLUDED.placement,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 6. Seed Pages (dynamic page contents e.g. about page)
INSERT INTO public.pages (id, slug, title, excerpt, body, status, published_at, created_by)
VALUES (
  'da000000-0000-0000-0000-000000000001',
  'about',
  'About Us',
  'Established in 2050 B.S. / 1994 A.D., Eureka has spent over three decades establishing a celebrated history of academic excellence and disciplined campus culture.',
  '{
    "vision": "To be the leading educational institution in Eastern Nepal, nurturing confident, creative, and compassionate global citizens.",
    "mission": "To provide quality education through a disciplined environment, innovative pedagogy, and holistic development programs that prepare students for life.",
    "motto": "In Pursuit of Excellence",
    "history_paragraphs": [
      "Eureka Residential Secondary School was established in 2050 B.S. (1994 A.D.) in Dharan-1, Laxmi Sadak, Sunsari. Founded with a vision to deliver premium educational opportunities in Eastern Nepal, we have spent over 30 years cultivating an environment where academic rigor blends with strict positive discipline.",
      "What began as a localized primary school has expanded into one of the top 10 schools in the Purbanchal region and is widely recognized as one of the leading educational centers in Dharan. Our curriculum has evolved from traditional rote formats to a comprehensive Project-Based Learning (PBL) methodology, helping students learn via inquiry, design, and practical execution.",
      "Today, Eureka currently educates over 1,600 students from Montessori / Pre-KG through Grade XII (+2), including specialized streams in Science, Management, and Computer Science. We remain dedicated to nurturing responsible, creative, and confident citizens prepared to face global challenges."
    ],
    "principal": {
      "name": "Mr. Kuran Chemjong",
      "qualification": "Principal, B.Sc. (Physics, TU) | M.Ed. (ELT, KU)",
      "image_url": "/images/principal.jpg",
      "message_paragraphs": [
        "Education at Eureka is viewed as a journey of growth, creativity, and personal construction, grounded in strong academic foundations and supported by confidence, discipline, and moral values.",
        "Our school’s signature Project-Based Learning (PBL) methodology emphasizes activity-based learning, critical thinking, and real-life application. We want to ensure that education remains meaningful and engaging for every child, rather than being confined to textbook memorization. A disciplined environment, guided by clearly defined rules and conduct, creates a campus that is safe, secure, friendly, respectful, and highly enjoyable.",
        "To support this mission, our recent infrastructure enhancements include two modern computer labs, high-quality physics, chemistry, and biology laboratories, a dedicated ICT smart hall, and two spacious seminar halls. Combined with transport fleets, hygiene canteen facilities, and boarding hostels, we provide a complete ecosystem for student success.",
        "We are extremely proud of our dedicated teaching team and appreciate the vital support of our parents in building a strong foundation for each student''s success."
      ]
    },
    "coordinators": [
      {
        "name": "Mr. Bijay Kumar Shrestha",
        "role": "Secondary Level Coordinator",
        "qualification": "Secondary Coordinator | M.Sc. (Biology)",
        "image_url": "/images/bijay kumar shrestha.png",
        "level_label": "Secondary Level (Grade 9 - 12)",
        "message_paragraphs": [
          "Secondary level study at Eureka serves as the critical bridge for students transitioning into higher education and technical board exams. We actively update our curriculum to match modern standards, introducing coding and advanced computing modules for secondary students. Our students enjoy extensive practical periods inside our chemistry, biology, and physics laboratories to ground theoretical concepts in empirical observation.",
          "Through our continuous weekly test assessments, mock board evaluations, and focused counseling sessions, we guide secondary performers to achieve their maximum potential. We cooperate closely with educators to implement interactive seminars, project assignments, and co-curricular programs that mold students into competent academic aspirants."
        ]
      },
      {
        "name": "Mr. Bhuwan Sanjel",
        "role": "Basic Level Coordinator",
        "qualification": "Basic Level Coordinator | BA Sociology / MA English",
        "image_url": "/images/bhuwan sanjel.jpeg",
        "level_label": "Basic Level (Montessori - Grade 8)",
        "message_paragraphs": [
          "The basic level sets the bedrock of academic confidence, moral values, and socialization habits. At Eureka, we utilize a child-centric Montessori methodology in our pre-school wings to emphasize positive discipline and motor coordination. As students progress into basic levels, we introduce digital classrooms, interactive smart board halls, and logic puzzles inside our math laboratory to build conceptual clarity.",
          "We coordinate character development workshops, public speaking contests, and sports activities alongside co-curricular programs to support a well-rounded learning graph. We prioritize regular teacher training and parental interaction, creating a collaborative circle that guides every basic level child to grow in a safe, respect-driven environment."
        ]
      }
    ]
  }'::jsonb,
  'published',
  now(),
  'd8d8d8d8-d8d8-d8d8-d8d8-d8d8d8d8d8d8'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;

-- 7. Seed Programs (Wings and streams)
INSERT INTO public.programs (slug, title, level, summary, image_id, sort_order, is_active)
VALUES
  ('montessori', 'Montessori Wing', 'PG / Pre-School / KG', 'Early childhood learning focused on polite language, positive discipline, sensory development, practical life skills, and joyful discovery.', '10000000-0000-0000-0000-000000000050', 1, true),
  ('primary', 'Primary Level', 'KG to Grade 3', 'Foundational literacy, numeracy, creativity, socialization, projects, quizzes, visits, and activity-based learning.', '10000000-0000-0000-0000-000000000011', 2, true),
  ('basic-level', 'Basic Level', 'Class IV to X', 'A disciplined academic program with science labs, computer science, math lab, digital library, weekly tests, counseling, and public speaking.', '10000000-0000-0000-0000-000000000052', 3, true),
  ('secondary-level', 'Secondary Level', 'Grade IX and X', 'Intensive pre-board and board (SEE) preparation focusing on analytical skills, science practicals, and personality development.', '10000000-0000-0000-0000-000000000011', 4, true),
  ('science', '10+2 Science Stream', 'Grade XI & XII (Science)', 'Pre-professional science training specializing in physics, chemistry, biology, and mathematics with full laboratory support.', '10000000-0000-0000-0000-000000000053', 5, true),
  ('management', '10+2 Management Stream', 'Grade XI & XII (Management)', 'Business-oriented education focusing on accountancy, economics, business studies, and hotel management basics.', '10000000-0000-0000-0000-000000000003', 6, true),
  ('computer-science', '10+2 Computer Science Stream', 'Grade XI & XII (Computer Science)', 'Specialized IT stream focused on programming (C++, HTML/JS), data structure, database, and software engineering basics.', '10000000-0000-0000-0000-000000000054', 7, true),
  ('grade-xi-xii', 'Grade XI & XII (+2 Overview)', 'Science, Management, Humanities, & HM', 'Pre-university curriculum offering pathways in science, commerce, humanities, and computer applications.', '10000000-0000-0000-0000-000000000015', 8, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  level = EXCLUDED.level,
  summary = EXCLUDED.summary,
  image_id = EXCLUDED.image_id,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 8. Seed FAQ Items
INSERT INTO public.faq_items (id, question, answer, category, sort_order, is_active)
VALUES
  ('f0000000-0000-0000-0000-000000000001', 'How can I apply for admission at Eureka?', 'Submit an inquiry online or visit the Front Desk at Block A. The school team will guide you through form submission, entrance or interaction, document verification, and admission confirmation.', 'admission', 1, true),
  ('f0000000-0000-0000-0000-000000000002', 'Which grades does Eureka offer?', 'Eureka offers Montessori / Playgroup through Grade XII, including +2 level streams such as Science, Management, Humanities, and Hotel Management where applicable.', 'programs', 2, true),
  ('f0000000-0000-0000-0000-000000000003', 'What facilities are available?', 'Facilities include science laboratories, two computer labs, ICT room, smart boards, library hall, digital library, seminar halls, cafeteria, hostel, garden area, sanitation facilities, CCTV, transport, and a proposed futsal court.', 'facilities', 3, true),
  ('f0000000-0000-0000-0000-000000000004', 'Where is Eureka located?', 'Eureka Residential Secondary School is located at Dharan-1, Laxmi Sadak, Sunsari, Koshi Province, Nepal.', 'contact', 4, true),
  ('f0000000-0000-0000-0000-000000000005', 'What makes Eureka academic approach distinct?', 'The school emphasizes PBL, differentiated instruction, technology integration, CAS assessment, seminar-model classes, culture, discipline, and activity-based learning.', 'academics', 5, true)
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 9. Seed Achievements (Hall of Fame)
INSERT INTO public.achievements (id, slug, title, category, summary, body, image_id, achievement_date, status, published_at)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'see-results-2082', 'SEE Results 2082', 'Academic Excellence', '106 SEE candidates achieved a 100% result, with Naman Gupta, Suyash Khatiwada, and Ishan Chhetri earning GPA 4.0.', '{"html":"<p>106 SEE candidates achieved a 100% result, with Naman Gupta, Suyash Khatiwada, and Ishan Chhetri earning GPA 4.0.</p>"}'::jsonb, '10000000-0000-0000-0000-000000000016', '2026-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000002', 'hissan-sports-meet-2082', 'Hissan Sports Meet 2082', 'Sports', 'Eureka students secured first position across multiple sports events and received trophies and medals.', '{"html":"<p>Eureka students secured first position across multiple sports events and received trophies and medals.</p>"}'::jsonb, '10000000-0000-0000-0000-000000000018', '2026-05-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000101', 'suva-ratna-rai', 'Ms. Suva Ratna Rai', 'Batch 2056', 'Registered Nurse, UK', to_jsonb('Suva Ratna Rai was the top performer of the 2056 B.S. SLC batch. She successfully completed her nursing studies and is currently working as a Registered Nurse in the United Kingdom, representing Eureka Residential Secondary School on a global stage.'::text), '10000000-0000-0000-0000-000000000101', '1999-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000102', 'roshan-atal', 'Dr. Roshan Atal', 'Batch 2058', 'Orthopedics, Kankai Hospital', to_jsonb('Roshan Atal topped the 2058 B.S. batch at Eureka. He pursued his medical career specializing in Orthopedic surgery and currently serves as a Consultant Orthopedic Surgeon at Kankai Hospital.'::text), '10000000-0000-0000-0000-000000000102', '2001-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000103', 'narendra-shrestha', 'Mr. Narendra Shrestha', 'Batch 2059', 'PhD Physics, Semiconductor Engineer, USA', to_jsonb('Narendra Shrestha achieved academic excellence in the 2059 B.S. batch. He obtained his PhD in Physics in the United States and works as a Senior Semiconductor Engineer in Silicon Valley, USA.'::text), '10000000-0000-0000-0000-000000000103', '2002-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000104', 'ganesh-agrawal', 'Dr. Ganesh Agrawal', 'Batch 2060', 'Ophthalmologist, Manjushree Eye Care', to_jsonb('Ganesh Agrawal was the topper of the 2060 B.S. SLC batch. He completed his specialization in Ophthalmology and is currently a practicing Ophthalmologist at Manjushree Eye Care, helping improve eye health in the region.'::text), '10000000-0000-0000-0000-000000000104', '2003-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000105', 'benju-shrestha', 'Dr. Benju Shrestha', 'Batch 2063', 'Dental Surgeon (MDS), Udayapur Hospital', to_jsonb('Benju Shrestha topped the 2063 B.S. SLC batch at Eureka. She went on to achieve her Master of Dental Surgery (MDS) and currently serves as a Dental Surgeon at Udayapur Hospital.'::text), '10000000-0000-0000-0000-000000000105', '2006-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000106', 'ashish-shrestha', 'Mr. Ashish Shrestha', 'Batch 2064', 'Under Secretary, Ministry of Energy, Water Resources', to_jsonb('Ashish Shrestha, the 2064 B.S. batch topper, joined the public civil services of Nepal. He currently serves as an Under Secretary at the Ministry of Energy, Water Resources, and Irrigation.'::text), '10000000-0000-0000-0000-000000000106', '2007-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000107', 'yugesh-chandra-rai', 'Mr. Yugesh Chandra Rai', 'Batch 2069', 'Software Engineer, Canada', to_jsonb('Yugesh Chandra Rai topped the 2069 B.S. batch at Eureka. He completed his computing education and moved to Canada, where he works as a Software Engineer at a leading technology firm.'::text), '10000000-0000-0000-0000-000000000107', '2012-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000108', 'safina-shrestha', 'Ms. Safina Shrestha', 'Batch 2073', 'BBA, Industrial & Systems Engineer, USA', to_jsonb('Safina Shrestha was the topper of the 2073 B.S. batch. She pursued higher studies in BBA and Industrial & Systems Engineering in the United States and works as a Systems Engineer.'::text), '10000000-0000-0000-0000-000000000108', '2016-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000109', 'munal-kafle', 'Mr. Munal Kafle', 'Batch 2078', 'Medical Student (MBBS)', to_jsonb('Munal Kafle achieved outstanding marks in the 2078 B.S. batch at Eureka. He is currently pursuing his MBBS degree on a prestigious medical scholarship in Nepal.'::text), '10000000-0000-0000-0000-000000000109', '2021-06-01', 'published', now()),
  ('a0000000-0000-0000-0000-000000000110', 'alzens-rai', 'Mr. Alzens Rai', 'Batch 2081', '+2 Student, Eureka', to_jsonb('Alzens Rai was the topper of the 2081 B.S. SEE batch. He continues his academic journey in the +2 Science stream at Eureka Residential Secondary School, maintaining his excellent performance.'::text), '10000000-0000-0000-0000-000000000110', '2024-06-01', 'published', now())
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  summary = EXCLUDED.summary,
  body = EXCLUDED.body,
  image_id = EXCLUDED.image_id,
  achievement_date = EXCLUDED.achievement_date,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at;

-- 10. Seed Documents (Downloads)
INSERT INTO public.documents (id, title, description, file_id, type, sort_order, is_public)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Academic Calendar', 'Stay organized with key dates, exams, and school events.', '10000000-0000-0000-0000-000000000001', 'calendar', 1, true),
  ('d0000000-0000-0000-0000-000000000002', 'Admission Form', 'Begin the admission process for Montessori to Grade XII.', '10000000-0000-0000-0000-000000000009', 'admission', 2, true),
  ('d0000000-0000-0000-0000-000000000003', 'School Prospectus', 'Explore programs, values, facilities, and the Eureka journey.', '10000000-0000-0000-0000-000000000001', 'prospectus', 3, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  file_id = EXCLUDED.file_id,
  type = EXCLUDED.type,
  sort_order = EXCLUDED.sort_order,
  is_public = EXCLUDED.is_public;

-- 11. Seed Gallery Items
INSERT INTO public.gallery_items (id, title, image_id, album, sort_order, is_featured)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Campus and Transport', '10000000-0000-0000-0000-000000000001', 'Campus', 1, true),
  ('c0000000-0000-0000-0000-000000000002', 'Smart Learning', '10000000-0000-0000-0000-000000000011', 'Academics', 2, true),
  ('c0000000-0000-0000-0000-000000000003', 'Sports Life', '10000000-0000-0000-0000-000000000018', 'Sports', 3, true),
  ('c0000000-0000-0000-0000-000000000004', 'Yoga Programmes', '10000000-0000-0000-0000-000000000002', 'Wellness', 4, true),
  ('c0000000-0000-0000-0000-000000000005', 'Celebrations', '10000000-0000-0000-0000-000000000027', 'Events', 5, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  image_id = EXCLUDED.image_id,
  album = EXCLUDED.album,
  sort_order = EXCLUDED.sort_order,
  is_featured = EXCLUDED.is_featured;

-- 12. Seed Posts (Notices, Blogs)
INSERT INTO public.posts (id, slug, type, title, excerpt, body, cover_image_id, status, pinned, published_at, homepage_order)
VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'transforming-classroom-theory-pbl',
    'blog',
    'Transforming Classroom Theory into Real-Life Competence with PBL',
    'Project-Based Learning (PBL) forms the core of our educational module. Discover how students apply physics and science theories to hands-on solutions.',
    '"Project-Based Learning (PBL) forms the core of our educational module. Discover how students apply physics and science theories to hands-on solutions. At Eureka, we believe that education is not just about memorizing text books; it is about applying theories to solve real-world problems. Through PBL, students in secondary levels build working models, conduct experiments, and present their findings to the school community. This methodology not only fosters deep conceptual clarity but also builds team work, critical thinking, and leadership."',
    '10000000-0000-0000-0000-000000000021',
    'published',
    false,
    now(),
    1
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'eastern-cultural-values-digital-classrooms',
    'blog',
    'Eastern Cultural Values and Modern Digital Classrooms',
    'Balancing smart boards and AI coding clubs with traditional eastern discipline and moral values prepares students to be responsible global citizens.',
    '"Balancing smart boards and AI coding clubs with traditional eastern discipline and moral values prepares students to be responsible global citizens. The transition into digital learning spaces is crucial, but it should not come at the cost of character development. Eureka provides regular yoga sessions, assembly discipline, and values education alongside coding, digital libraries, and smart boards to create a holistic growth environment."',
    '10000000-0000-0000-0000-000000000020',
    'published',
    false,
    now(),
    2
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'early-childhood-montessori-sensory-learning',
    'blog',
    'Early Childhood Development: The Power of Montessori sensory learning',
    'Polite language, sensory exploration, and positive discipline. Explore how Eureka\'s Montessori wing shapes young minds during their most critical formative years.',
    '"Polite language, sensory exploration, and positive discipline. Explore how Eureka\'s Montessori wing shapes young minds during their most critical formative years. In the Montessori Wing, early childhood learning is focused on polite communication, practical life skills, motor coordination, and sensory development. Using structured play materials, children explore shapes, colors, and numbers under positive discipline guidelines, ensuring a joyful foundation for their education."',
    '10000000-0000-0000-0000-000000000008',
    'published',
    false,
    now(),
    3
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '100-pass-rate-see-board-results-2082',
    'notice',
    '100% Pass Rate in SEE Board Results 2082',
    'We congratulate our 106 candidates who achieved a 100% pass rate in the SEE examination, featuring 3 students with a perfect GPA 4.0.',
    '"We congratulate our 106 candidates who achieved a 100% pass rate in the SEE examination, featuring 3 students with a perfect GPA 4.0: Naman Gupta, Suyash Khatiwada, and Ishan Chhetri. The school administration and teachers congratulate all students for their consistent hard work and achievements."',
    '10000000-0000-0000-0000-000000000016',
    'published',
    false,
    now(),
    NULL
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    'admission-open-grade-xi-xii',
    'notice',
    'Admission Open for Grade XI & XII (Science & Management)',
    'Form distribution has commenced at Front Desk Block A. Entrance exams are scheduled for 25th and 26th Chaitra.',
    '"Form distribution has commenced at Front Desk Block A. Entrance exams are scheduled for 25th and 26th Chaitra. Form submission guidelines, prospectus, and scholarships criteria can be obtained at the school front desk or via the online admissions inquiry portal. Admission is open for Science, Management, and Computer Science streams."',
    '10000000-0000-0000-0000-000000000023',
    'published',
    false,
    now(),
    NULL
  ),
  (
    '20000000-0000-0000-0000-000000000006',
    'eureka-shines-hissan-sports-meet-2082',
    'notice',
    'Eureka Shines at the Hissan Sports Meet 2082',
    'Eureka clinched the 1st Position in multiple events at the Koshi Province Hissan Sports meet, showing top sportsmanship.',
    '"Eureka clinched the 1st Position in multiple events at the Koshi Province Hissan Sports meet, showing top sportsmanship. Our volleyball and table tennis teams achieved gold medals in provinces. The school management congratulates the students and coach team for their outstanding sports performance."',
    '10000000-0000-0000-0000-000000000018',
    'published',
    false,
    now(),
    NULL
  )
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body = EXCLUDED.body,
  cover_image_id = EXCLUDED.cover_image_id,
  status = EXCLUDED.status,
  pinned = EXCLUDED.pinned,
  published_at = EXCLUDED.published_at,
  homepage_order = EXCLUDED.homepage_order;
