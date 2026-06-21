insert into public.site_settings (key, value)
values
  ('school_identity', '{
    "name": "Eureka Residential Secondary School",
    "shortName": "Eureka",
    "motto": "In Pursuit of Excellence",
    "address": "Dharan-1, Laxmi Sadak, Sunsari",
    "province": "Koshi Province, Nepal",
    "phone": "+977-25-535533 / 578788",
    "email": "eurekadharan@gmail.com",
    "established": "2050 B.S. / 1994 A.D.",
    "students": "1,600+",
    "levels": "Montessori / Playgroup to Grade XII (+2)",
    "logo": "/images/logo.png",
    "heroImage": "/images/school building.jpg",
    "facebook_school": "https://www.facebook.com/share/1R4ZBMcV4L/?mibextid=wwXIfr",
    "facebook_montessori": "https://www.facebook.com/share/14d8ScrgzRt/?mibextid=wwXIfr",
    "facebook_plus_two": "https://www.facebook.com/share/1Gg59m8NY1/?mibextid=wwXIfr",
    "whatsapp": "https://wa.me/97725535533",
    "hero_prefix": "Eureka Residential Secondary School • Dharan-1",
    "hero_title": "Helping students pursue excellence with discipline and confidence",
    "hero_subtitle": "From Montessori to Grade XII, Eureka blends strong academics, Project-Based Learning, technology, culture, and character formation.",
    "office_hours": "Sunday - Friday: 9:00 AM - 4:00 PM"
  }'::jsonb),
  ('admission_strip', '{
    "label": "New Admission 2083 (2026/27)",
    "href": "/admission"
  }'::jsonb)
on conflict (key) do update set value = excluded.value;

insert into public.media_assets (bucket, path, alt_text, caption)
values
  ('public-media', 'images/school building.jpg', 'Eureka school building and buses', 'Campus and transport'),
  ('public-media', 'images/students with smart board.jpg', 'Students learning with smart board', 'Technology integration'),
  ('public-media', 'images/primary kids.jpg', 'Primary level students', 'Primary program'),
  ('public-media', 'images/pre primary.jpg', 'Pre-primary students', 'Pre-primary program'),
  ('public-media', 'images/secondary level.jpg', 'Secondary level students', 'Secondary program'),
  ('public-media', 'images/4 gpa.jpg', 'SEE GPA 4 achievers', 'SEE 2082 achievement'),
  ('public-media', 'images/see results 2082.jpg', 'SEE result poster 2082', 'SEE results 2082'),
  ('public-media', 'images/staffs.jpg', 'Eureka staff members', 'School team'),
  ('public-media', 'images/kids with cards.jpg', 'Kids learning with cards', 'Montessori activity'),
  ('public-media', 'images/kids in group.JPG', 'Kids posing in group', 'Primary banner'),
  ('public-media', 'images/student in assembly.jpg', 'Students in morning assembly', 'Discipline and assembly'),
  ('public-media', 'images/student in science  lab.JPG', 'Students performing chemistry experiments', 'Science practical'),
  ('public-media', 'images/seminar in ai.jpg', 'AI and computer science seminar', 'Computer lab stream'),
  ('public-media', 'images/Suva ratna.jpeg', 'Suva Ratna Rai portrait', 'Ms. Suva Ratna Rai'),
  ('public-media', 'images/Roshan atal.png', 'Roshan Atal portrait', 'Dr. Roshan Atal'),
  ('public-media', 'images/Narendra Shrestha SLC 2059- 74.3%.jpg', 'Narendra Shrestha portrait', 'Mr. Narendra Shrestha'),
  ('public-media', 'images/ganesh agrawal.jpeg', 'Ganesh Agrawal portrait', 'Dr. Ganesh Agrawal'),
  ('public-media', 'images/Dr . Benju Shrestha.jpg', 'Benju Shrestha portrait', 'Dr. Benju Shrestha'),
  ('public-media', 'images/aashish shrestha.jpeg', 'Ashish Shrestha portrait', 'Mr. Ashish Shrestha'),
  ('public-media', 'images/Yugesh Rai.jpg', 'Yugesh Chandra Rai portrait', 'Mr. Yugesh Chandra Rai'),
  ('public-media', 'images/safina shrestha.jpeg', 'Safina Shrestha portrait', 'Ms. Safina Shrestha'),
  ('public-media', 'images/Munal Kafle, SEE 2078 topper -3.75.jpg', 'Munal Kafle portrait', 'Mr. Munal Kafle'),
  ('public-media', 'images/Alzens Rai, SEE 2081 topper 3.84.jpg', 'Alzens Rai portrait', 'Mr. Alzens Rai')
on conflict (bucket, path) do nothing;

insert into public.programs (slug, title, level, summary, sort_order, is_active)
values
  ('montessori', 'Montessori Wing', 'PG / Pre-School / KG', 'Early childhood learning focused on polite language, positive discipline, sensory development, practical life skills, and joyful discovery.', 1, true),
  ('primary', 'Primary Level', 'KG to Grade 3', 'Foundational literacy, numeracy, creativity, socialization, projects, quizzes, visits, and activity-based learning.', 2, true),
  ('basic-level', 'Basic Level', 'Class IV to X', 'A disciplined academic program with science labs, computer science, math lab, digital library, weekly tests, counseling, and public speaking.', 3, true),
  ('grade-xi-xii', 'Grade XI-XII', '+2 Science, Management, Humanities', 'Pre-university preparation that strengthens conceptual clarity, research habits, leadership, communication, and career readiness.', 4, true)
on conflict (slug) do update set
  title = excluded.title,
  level = excluded.level,
  summary = excluded.summary,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.faq_items (question, answer, category, sort_order, is_active)
values
  ('How can I apply for admission at Eureka?', 'Submit an inquiry online or visit the Front Desk at Block A. The school team will guide you through form submission, entrance or interaction, document verification, and admission confirmation.', 'admission', 1, true),
  ('Which grades does Eureka offer?', 'Eureka offers Montessori / Playgroup through Grade XII, including +2 level streams such as Science, Management, Humanities, and Hotel Management where applicable.', 'programs', 2, true),
  ('What facilities are available?', 'Facilities include science laboratories, two computer labs, ICT room, smart boards, library hall, digital library, seminar halls, cafeteria, hostel, garden area, sanitation facilities, CCTV, transport, and a proposed futsal court.', 'facilities', 3, true),
  ('Where is Eureka located?', 'Eureka Residential Secondary School is located at Dharan-1, Laxmi Sadak, Sunsari, Koshi Province, Nepal.', 'contact', 4, true),
  ('What makes Eureka academic approach distinct?', 'The school emphasizes PBL, differentiated instruction, technology integration, CAS assessment, seminar-model classes, culture, discipline, and activity-based learning.', 'academics', 5, true);

insert into public.achievements (slug, title, category, summary, body, achievement_date, status, published_at)
values
  ('see-results-2082', 'SEE Results 2082', 'Academic Excellence', '106 SEE candidates achieved a 100% result, with Naman Gupta, Suyash Khatiwada, and Ishan Chhetri earning GPA 4.0.', '{"html":"<p>106 SEE candidates achieved a 100% result, with Naman Gupta, Suyash Khatiwada, and Ishan Chhetri earning GPA 4.0.</p>"}'::jsonb, '2026-06-01', 'published', now()),
  ('hissan-sports-meet-2082', 'Hissan Sports Meet 2082', 'Sports', 'Eureka students secured first position across multiple sports events and received trophies and medals.', '{"html":"<p>Eureka students secured first position across multiple sports events and received trophies and medals.</p>"}'::jsonb, '2026-05-01', 'published', now()),
  ('suva-ratna-rai', 'Ms. Suva Ratna Rai', 'Batch 2056', 'Registered Nurse, UK', to_jsonb('Suva Ratna Rai was the top performer of the 2056 B.S. SLC batch. She successfully completed her nursing studies and is currently working as a Registered Nurse in the United Kingdom, representing Eureka Residential Secondary School on a global stage.'::text), '1999-06-01', 'published', now()),
  ('roshan-atal', 'Dr. Roshan Atal', 'Batch 2058', 'Orthopedics, Kankai Hospital', to_jsonb('Roshan Atal topped the 2058 B.S. batch at Eureka. He pursued his medical career specializing in Orthopedic surgery and currently serves as a Consultant Orthopedic Surgeon at Kankai Hospital.'::text), '2001-06-01', 'published', now()),
  ('narendra-shrestha', 'Mr. Narendra Shrestha', 'Batch 2059', 'PhD Physics, Semiconductor Engineer, USA', to_jsonb('Narendra Shrestha achieved academic excellence in the 2059 B.S. batch. He obtained his PhD in Physics in the United States and works as a Senior Semiconductor Engineer in Silicon Valley, USA.'::text), '2002-06-01', 'published', now()),
  ('ganesh-agrawal', 'Dr. Ganesh Agrawal', 'Batch 2060', 'Ophthalmologist, Manjushree Eye Care', to_jsonb('Ganesh Agrawal was the topper of the 2060 B.S. SLC batch. He completed his specialization in Ophthalmology and is currently a practicing Ophthalmologist at Manjushree Eye Care, helping improve eye health in the region.'::text), '2003-06-01', 'published', now()),
  ('benju-shrestha', 'Dr. Benju Shrestha', 'Batch 2063', 'Dental Surgeon (MDS), Udayapur Hospital', to_jsonb('Benju Shrestha topped the 2063 B.S. SLC batch at Eureka. She went on to achieve her Master of Dental Surgery (MDS) and currently serves as a Dental Surgeon at Udayapur Hospital.'::text), '2006-06-01', 'published', now()),
  ('ashish-shrestha', 'Mr. Ashish Shrestha', 'Batch 2064', 'Under Secretary, Ministry of Energy, Water Resources', to_jsonb('Ashish Shrestha, the 2064 B.S. batch topper, joined the public civil services of Nepal. He currently serves as an Under Secretary at the Ministry of Energy, Water Resources, and Irrigation.'::text), '2007-06-01', 'published', now()),
  ('yugesh-chandra-rai', 'Mr. Yugesh Chandra Rai', 'Batch 2069', 'Software Engineer, Canada', to_jsonb('Yugesh Chandra Rai topped the 2069 B.S. batch at Eureka. He completed his computing education and moved to Canada, where he works as a Software Engineer at a leading technology firm.'::text), '2012-06-01', 'published', now()),
  ('safina-shrestha', 'Ms. Safina Shrestha', 'Batch 2073', 'BBA, Industrial & Systems Engineer, USA', to_jsonb('Safina Shrestha was the topper of the 2073 B.S. batch. She pursued higher studies in BBA and Industrial & Systems Engineering in the United States and works as a Systems Engineer.'::text), '2016-06-01', 'published', now()),
  ('munal-kafle', 'Mr. Munal Kafle', 'Batch 2078', 'Medical Student (MBBS)', to_jsonb('Munal Kafle achieved outstanding marks in the 2078 B.S. batch at Eureka. He is currently pursuing his MBBS degree on a prestigious medical scholarship in Nepal.'::text), '2021-06-01', 'published', now()),
  ('alzens-rai', 'Mr. Alzens Rai', 'Batch 2081', '+2 Student, Eureka', to_jsonb('Alzens Rai was the topper of the 2081 B.S. SEE batch. He continues his academic journey in the +2 Science stream at Eureka Residential Secondary School, maintaining his excellent performance.'::text), '2024-06-01', 'published', now())
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  body = excluded.body,
  status = excluded.status,
  published_at = excluded.published_at;

insert into public.documents (title, description, type, sort_order, is_public)
values
  ('Academic Calendar', 'Stay organized with key dates, exams, and school events.', 'calendar', 1, true),
  ('Admission Form', 'Begin the admission process for Montessori to Grade XII.', 'admission', 2, true),
  ('School Prospectus', 'Explore programs, values, facilities, and the Eureka journey.', 'prospectus', 3, true)
on conflict do nothing;
