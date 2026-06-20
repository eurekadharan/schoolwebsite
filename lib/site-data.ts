export const school = {
  name: "Eureka Residential Secondary School",
  shortName: "Eureka",
  motto: "In Pursuit of Excellence",
  established: "2050 B.S. / 1994 A.D.",
  address: "Dharan-1, Laxmi Sadak, Sunsari",
  province: "Koshi Province, Nepal",
  phone: "+977-25-535533 / 578788",
  email: "eurekadharan@gmail.com",
  students: "1,600+",
  levels: "Montessori / Playgroup to Grade XII (+2)",
  logo: "/images/eureka-logo.png",
  heroImage: "/images/school building.jpg"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  {
    label: "Our Programs",
    href: "/programs",
    children: [
      { label: "Montessori Wing", href: "/programs/montessori" },
      { label: "Primary Level", href: "/programs/primary" },
      { label: "Basic Level", href: "/programs/basic-level" },
      { label: "Secondary Level", href: "/programs/secondary-level" },
      { label: "+2 Science", href: "/programs/science" },
      { label: "+2 Management", href: "/programs/management" },
      { label: "+2 Computer Science", href: "/programs/computer-science" },
      { label: "+2 Streams Overview", href: "/programs/grade-xi-xii" }
    ]
  },
  { label: "Admission", href: "/admission" },
  { label: "Facilities", href: "/facilities" },
  { label: "Life at Eureka", href: "/life-at-eureka" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "News & Notices", href: "/news" },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" }
];

export const programs = [
  {
    slug: "montessori",
    title: "Montessori Wing",
    level: "PG / Pre-School / KG",
    image: "/images/kids with cards.jpg",
    bannerImage: "/images/kids with cards.jpg",
    summary: "Early childhood learning focused on polite language, positive discipline, sensory development, practical life skills, and joyful discovery.",
    duration: "3-4 Years",
    eligibility: "Age 2.5 years and above",
    curriculum: ["Practical Life Exercises", "Sensory Education", "Language & Literacy", "Mathematics & Numbers", "Creative Arts & Expression"],
    details: "The Montessori Wing at Eureka provides a highly supportive, activity-rich environment designed for early development. Children learn polite manners, coordination, and fundamental language skills through structured play and individual instruction. Special activities include Colour Day, National Topi Day, Montessori Friendship Day, and hands-on hand-writing workshops."
  },
  {
    slug: "primary",
    title: "Primary Level",
    level: "KG to Grade 3",
    image: "/images/kids in digital screen.jpeg",
    bannerImage: "/images/kids in group.JPG",
    summary: "Foundational literacy, numeracy, creativity, socialization, projects, quizzes, visits, and activity-based learning.",
    duration: "4 Years (KG, Grade 1, 2, 3)",
    eligibility: "Successful completion of Montessori or equivalent",
    curriculum: ["English & English Grammar", "Nepali & Nepali Grammar", "Mathematics & Arithmetic", "Science & Environment", "Drawing, Arts & Craft"],
    details: "At this stage, Eureka focuses on forming strong reading, writing, and calculations habits. The program balances books with field trips (e.g. farm visits, temple visits, and excursions), quarterly sports meets, English and Nepali public speaking sessions, and handwriting contests to ensure children build social confidence and academic stability."
  },
  {
    slug: "basic-level",
    title: "Basic Level",
    level: "Class IV to X",
    image: "/images/student in assembly.jpg",
    bannerImage: "/images/student in assembly.jpg",
    summary: "A disciplined academic program with science labs, computer science, math lab, digital library, weekly tests, counseling, and public speaking.",
    duration: "7 Years (Grade 4 to 10)",
    eligibility: "Completion of Primary Grade 3",
    curriculum: ["English Literature & Language", "Nepali Literature & Language", "Compulsory Mathematics & Opt. Mathematics", "Science (Physics, Chemistry, Biology)", "Social Studies & History", "Computer Science (Grade 9-10)"],
    details: "Our basic level curriculum blends rigorous learning with interactive activities. Students gain access to practical Science Labs, a dedicated Math Lab, and both General and Digital libraries. Weekly tests and terminal examinations keep track of progress, and specialized classes in public speaking, yoga, and meditation bolster students' mental and physical health."
  },
  {
    slug: "secondary-level",
    title: "Secondary Level",
    level: "Grade IX and X",
    image: "/images/kids in digital screen.jpeg",
    bannerImage: "/images/student in science  lab.JPG",
    summary: "Intensive pre-board and board (SEE) preparation focusing on analytical skills, science practicals, and personality development.",
    duration: "2 Years (Grade 9 & 10)",
    eligibility: "Completion of Basic Grade 8",
    curriculum: ["English & Communication", "Nepali", "Mathematics & Optional Math", "Science with Labs", "Social Studies & Current Affairs", "Computer Science & IT Coding"],
    details: "The secondary level at Eureka is designed to pave the way for success in the Secondary Education Examination (SEE). Features include practical laboratory experiments in Physics, Chemistry, and Biology, advanced computer science projects, personality development workshops, challenge sessions for top performers, and extra coaching for students requiring additional assistance."
  },
  {
    slug: "science",
    title: "10+2 Science Stream",
    level: "Grade XI & XII (Science)",
    image: "/images/student in science  lab.JPG",
    bannerImage: "/images/student in science  lab.JPG",
    summary: "Pre-professional science training specializing in physics, chemistry, biology, and mathematics with full laboratory support.",
    duration: "2 Years",
    eligibility: "SEE GPA 2.4+ with B+ in Science & Mathematics",
    curriculum: ["Physics & Practical Lab", "Chemistry & Practical Lab", "Biology (Botany & Zoology) OR Mathematics", "English Communication", "Nepali (Grade XI)", "Computer Science (Optional)"],
    details: "Eureka's +2 Science stream offers premium preparation for engineering, medicine, and applied research careers. Our experienced faculties (including Mr. Kuran Chemjong in Physics and Mr. Bijay Kumar Shrestha in Biology) guide students through hands-on experimentations, seminar-model classes, and weekly mock exams. Students benefit from the modern hostel facility and school bus coverage."
  },
  {
    slug: "management",
    title: "10+2 Management Stream",
    level: "Grade XI & XII (Management)",
    image: "/images/10+2 students groups.jpg",
    bannerImage: "/images/10+2 students groups.jpg",
    summary: "Business-oriented education focusing on accountancy, economics, business studies, and hotel management basics.",
    duration: "2 Years",
    eligibility: "SEE GPA 2.0+ with C+ in Mathematics & English",
    curriculum: ["Accountancy & Practical Audit", "Economics & Financial Theories", "Business Studies & Marketing", "English & Business Writing", "Nepali (Grade XI)", "Hotel Management (Optional)"],
    details: "Designed to prepare future entrepreneurs, bankers, and corporate executives. The Management program combines core commerce theories with practical excursions, banking workshops, and business plan competitions. Experienced faculties provide detailed study guides, case study analyses, and career counseling to shape confident corporate leaders."
  },
  {
    slug: "computer-science",
    title: "10+2 Computer Science Stream",
    level: "Grade XI & XII (Computer Science)",
    image: "/images/seminar in ai.jpg",
    bannerImage: "/images/seminar in ai.jpg",
    summary: "Specialized IT stream focused on programming (C++, HTML/JS), data structure, database, and software engineering basics.",
    duration: "2 Years",
    eligibility: "SEE GPA 2.0+ with C+ in Mathematics & Computer Science",
    curriculum: ["Computer Science Theory & Coding", "Mathematics & Statistical Computations", "Accountancy or Physics", "English & Technical Writing", "Nepali (Grade XI)"],
    details: "The IT and Computer Science stream at Eureka provides a rigorous foundation in software development and database design. Students spend significant time in our two modern, internet-equipped computer labs learning coding, web technologies, and software engineering concepts. A dedicated Roboflics & AI Club provides extracurricular exposure in AI, hardware hacks, and coding competitions."
  },
  {
    slug: "grade-xi-xii",
    title: "Grade XI & XII (+2 Overview)",
    level: "Science, Management, Humanities, & HM",
    image: "/images/10+2 students.jpg",
    bannerImage: "/images/students with smart board.jpg",
    summary: "Pre-university curriculum offering pathways in science, commerce, humanities, and computer applications.",
    duration: "2 Years",
    eligibility: "SEE Graduate or equivalent",
    curriculum: ["Stream specific subjects", "English & Nepalese Studies", "Social Values & Leadership", "Creative Writing & Seminars"],
    details: "Grade XI and XII (under NEB) at Eureka Residential Secondary School serves as a crucial bridge between school and university. Led by Coordinator Mr. Rajat Sampang, the program focuses on research-oriented study habits, regular terminal assessments (four major exams per year), self-discipline, and career-oriented counselling with external experts."
  }
];

export const aboutTabs = [
  {
    title: "Our Programs",
    body: "Eureka offers learning from Montessori and Playgroup to Grade XII, blending strong academics with PBL, differentiated instruction, CAS assessment, and seminar-model classes.",
    ctas: [
      { label: "Learn More", href: "/programs" },
      { label: "Get Started", href: "/admission" }
    ]
  },
  {
    title: "Eureka Life",
    body: "Students grow through readers, health, music, scout, robotics and AI, maths, science, dance, art, coding, speaker, and quiz clubs.",
    ctas: [
      { label: "Explore Life", href: "/life-at-eureka" },
      { label: "View Gallery", href: "/gallery" }
    ]
  },
  {
    title: "News & Notices",
    body: "Stay updated with admission schedules, SEE results, academic events, club activities, celebrations, and important school announcements.",
    ctas: [
      { label: "Read Notices", href: "/notices" },
      { label: "Latest News", href: "/news" }
    ]
  }
];

export const stats = [
  { value: "30+", label: "YEARS OF EXCELLENCE" },
  { value: "1600+", label: "STUDENTS" },
  { value: "100%", label: "SEE RESULT" },
  { value: "Top 10", label: "SCHOOLS IN EASTERN NEPAL" }
];

export const whyEureka = [
  "Project-Based Learning for real-life application.",
  "Differentiated instruction for individual student growth.",
  "Smart Boards, ICT room, CCTV, and digital learning spaces.",
  "Strong culture, discipline, values, and character formation.",
  "Science labs, two computer labs, library, seminar halls, hostel, and transport.",
  "Regular games, yoga, meditation, public speaking, and personality development."
];

export const galleryItems = [
  {
    title: "Campus and Transport",
    image: "/images/school building.jpg",
    href: "/gallery"
  },
  {
    title: "Smart Learning",
    image: "/images/students with smart board.jpg",
    href: "/gallery"
  },
  {
    title: "Assembly and Discipline",
    image: "/images/student in assembly.jpg",
    href: "/gallery"
  },
  {
    title: "Sports Life",
    image: "/images/volleyball.jpg",
    href: "/gallery"
  },
  {
    title: "Yoga Programmes",
    image: "/images/yoga programmes.jpg",
    href: "/gallery"
  },
  {
    title: "Celebrations",
    image: "/images/christmas celebration.jpg",
    href: "/gallery"
  }
];

export const testimonials = [
  {
    name: "Principal's Desk",
    role: "School Leadership",
    image: "/images/staffs.jpg",
    quote: "Education at Eureka is a journey of growth, creativity, confidence, discipline, and moral values."
  },
  {
    name: "SEE Batch 2082",
    role: "Students",
    image: "/images/4 gpa.jpg",
    quote: "A 100% SEE result with three GPA 4.0 achievers reflects consistent academic discipline."
  },
  {
    name: "Eureka Students",
    role: "Learners",
    image: "/images/kids with pictures.jpg",
    quote: "Clubs, sports, labs, field visits, and celebrations help students learn by doing."
  }
];

export const documents = [
  {
    title: "Academic Calendar",
    description: "Stay organized with key dates, exams, and school events.",
    href: "/downloads",
    icon: "calendar"
  },
  {
    title: "Admission Form",
    description: "Begin the admission process for Montessori to Grade XII.",
    href: "/admission",
    icon: "file"
  },
  {
    title: "School Prospectus",
    description: "Explore programs, values, facilities, and the Eureka journey.",
    href: "/downloads",
    icon: "book"
  }
];

export const faqs = [
  {
    question: "How can I apply for admission at Eureka?",
    answer: "You can submit an inquiry online or visit the Front Desk at Block A. The school team will guide you through form submission, entrance or interaction, document verification, and admission confirmation."
  },
  {
    question: "Which grades does Eureka offer?",
    answer: "Eureka offers Montessori / Playgroup through Grade XII, including +2 level streams such as Science, Management, Humanities, and Hotel Management where applicable."
  },
  {
    question: "What facilities are available?",
    answer: "Facilities include science laboratories, two computer labs, ICT room, smart boards, library hall, digital library, seminar halls, cafeteria, hostel, garden area, sanitation facilities, CCTV, transport, and a proposed futsal court."
  },
  {
    question: "Where is Eureka located?",
    answer: "Eureka Residential Secondary School is located at Dharan-1, Laxmi Sadak, Sunsari, Koshi Province, Nepal."
  },
  {
    question: "What makes Eureka's academic approach distinct?",
    answer: "The school emphasizes PBL, differentiated instruction, technology integration, CAS assessment, seminar-model classes, culture, discipline, and activity-based learning."
  }
];

export const adminModules = [
  { label: "Banners", href: "/admin/banners", icon: "image", count: 4 },
  { label: "Pages", href: "/admin/pages", icon: "file", count: 12 },
  { label: "Posts", href: "/admin/posts", icon: "newspaper", count: 18 },
  { label: "Notices", href: "/admin/notices", icon: "shield", count: 7 },
  { label: "Events", href: "/admin/events", icon: "calendar", count: 9 },
  { label: "Achievements", href: "/admin/achievements", icon: "trophy", count: 6 },
  { label: "Media", href: "/admin/media", icon: "image", count: 33 },
  { label: "Downloads", href: "/admin/downloads", icon: "book", count: 5 }
];

export const adminFormModules = [
  { label: "Admissions", href: "/admin/forms/admissions", icon: "graduation", count: 14 },
  { label: "Contacts", href: "/admin/forms/contacts", icon: "phone", count: 8 },
  { label: "Inquiries", href: "/admin/forms/inquiries", icon: "heart", count: 21 }
];

export const pageSummaries = [
  {
    slug: "about",
    title: "About Eureka",
    eyebrow: "About Eureka",
    image: "/images/school building.jpg",
    description: "Established in 2050 B.S. / 1994 A.D., Eureka Residential Secondary School has grown into one of the leading schools in Dharan, serving students from Montessori to Grade XII."
  },
  {
    slug: "programs",
    title: "Our Programs",
    eyebrow: "Learning Pathways",
    image: "/images/primary kids.jpg",
    description: "Explore Montessori, Primary, Basic, Secondary, and Grade XI-XII programs built on discipline, PBL, technology, and holistic development."
  },
  {
    slug: "admission",
    title: "Admission",
    eyebrow: "Start Your Journey",
    image: "/images/school details.jpg",
    description: "Find admission details, entrance schedules, required documents, and the inquiry form for joining Eureka Residential Secondary School."
  },
  {
    slug: "life-at-eureka",
    title: "Life at Eureka",
    eyebrow: "Beyond Academics",
    image: "/images/yoga programmes.jpg",
    description: "Student life at Eureka includes clubs, sports, yoga, field visits, cultural events, environmental programs, and leadership activities."
  },
  {
    slug: "gallery",
    title: "Gallery",
    eyebrow: "Moments at Eureka",
    image: "/images/students in house dress.jpg",
    description: "Browse campus life, celebrations, programs, student activities, sports, and achievement moments captured across the school year."
  },
  {
    slug: "results",
    title: "Results",
    eyebrow: "Academic Excellence",
    image: "/images/see results 2082.jpg",
    description: "Eureka celebrates a 100% SEE result for Batch 2082 and three GPA 4.0 achievers: Naman Gupta, Suyash Khatiwada, and Ishan Chhetri."
  },
  {
    slug: "downloads",
    title: "Downloads",
    eyebrow: "Resources",
    image: "/images/students in temple.jpg",
    description: "Access school documents including the academic calendar, admission form, prospectus, notices, and policies."
  },
  {
    slug: "contact",
    title: "Contact",
    eyebrow: "Get In Touch",
    image: "/images/staffs.jpg",
    description: "Reach the Eureka administration team for admission, inquiry, transport, hostel, programs, or general school information."
  },
  {
    slug: "news",
    title: "News & Notices",
    eyebrow: "Latest Updates",
    image: "/images/world evironment day.jpg",
    description: "Read the latest Eureka news, notices, event updates, admission information, achievements, and student activity announcements."
  },
  {
    slug: "notices",
    title: "Notices",
    eyebrow: "Important Updates",
    image: "/images/school details.jpg",
    description: "Important notices for admission, exams, events, holidays, forms, and school operations."
  },
  {
    slug: "events",
    title: "Events",
    eyebrow: "School Calendar",
    image: "/images/christmas celebration.jpg",
    description: "Explore upcoming and past events including celebrations, camps, competitions, environment programs, and academic activities."
  },
  {
    slug: "achievements",
    title: "Achievements",
    eyebrow: "Eureka Pride",
    image: "/images/4 gpa.jpg",
    description: "Celebrate academic, sports, arts, and co-curricular achievements from Eureka students and alumni."
  },
  {
    slug: "hall-of-fame",
    title: "Hall of Fame",
    eyebrow: "Alumni Pride",
    image: "/images/4 gpa.jpg",
    description: "Honoring our outstanding SLC & SEE toppers and alumni excelling in diverse professional fields worldwide."
  },
  {
    slug: "facilities",
    title: "Our Facilities",
    eyebrow: "Campus Amenities",
    image: "/images/school building.jpg",
    description: "Explore Eureka's extensive classroom, academic, laboratory, residential, and sporting infrastructures."
  }
];

export const iconHighlights = [
  { icon: "microscope", label: "Science Labs" },
  { icon: "home", label: "Hostel Facility" },
  { icon: "users", label: "Active Clubs" },
  { icon: "medal", label: "SEE Excellence" },
  { icon: "sparkles", label: "PBL Module" },
  { icon: "map", label: "Dharan-1" },
  { icon: "award", label: "30+ Years" }
];

export const newsNotices = [
  {
    title: "100% Pass Rate in SEE Board Results 2082",
    date: "June 12, 2026",
    type: "news",
    excerpt: "We congratulate our 106 candidates who achieved a 100% pass rate in the SEE examination, featuring 3 students with a perfect GPA 4.0."
  },
  {
    title: "Admission Open for Grade XI & XII (Science & Management)",
    date: "June 15, 2026",
    type: "notice",
    excerpt: "Form distribution has commenced at Front Desk Block A. Entrance exams are scheduled for 25th and 26th Chaitra."
  },
  {
    title: "Eureka Shines at the Hissan Sports Meet 2082",
    date: "May 28, 2026",
    type: "news",
    excerpt: "Eureka clinched the 1st Position in multiple events at the Koshi Province Hissan Sports meet, showing top sportsmanship."
  }
];

export const insightsBlogs = [
  {
    title: "Transforming Classroom Theory into Real-Life Competence with PBL",
    readTime: "5 min read",
    author: "Mr. Kuran Chemjong",
    excerpt: "Project-Based Learning (PBL) forms the core of our educational module. Discover how students apply physics and science theories to hands-on solutions."
  },
  {
    title: "Eastern Cultural Values and Modern Digital Classrooms",
    readTime: "4 min read",
    author: "Mr. Bhuwan Sanjel",
    excerpt: "Balancing smart boards and AI coding clubs with traditional eastern discipline and moral values prepares students to be responsible global citizens."
  },
  {
    title: "Early Childhood Development: The Power of Montessori sensory learning",
    readTime: "6 min read",
    author: "Mrs. Indu Rai",
    excerpt: "Polite language, sensory exploration, and positive discipline. Explore how Eureka's Montessori wing shapes young minds during their most critical formative years."
  }
];

export function getPageSummary(slug: string) {
  return pageSummaries.find((page) => page.slug === slug);
}
