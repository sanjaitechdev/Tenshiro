-- =====================================================
-- PATHPILOT AI - DOMAIN & ROLE SEED DATA
-- =====================================================
-- This script replaces all existing domain and role data
-- with the finalized 18-domain structure
-- =====================================================

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data
TRUNCATE TABLE user_progress;
TRUNCATE TABLE roadmap_tasks;
TRUNCATE TABLE roadmap_phases;
TRUNCATE TABLE roles;
TRUNCATE TABLE domains;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- INSERT DOMAINS (18 Total)
-- =====================================================

INSERT INTO domains (id, name, description, icon) VALUES
(1, 'IT & Software', 'Software development, web and mobile applications, quality assurance, and product management.', 'code'),
(2, 'Government & Competitive Exams', 'Civil services, banking exams, defense, and competitive entrance tests for public sector careers.', 'building'),
(3, 'Commerce & Finance', 'Accounting, finance, investment banking, consulting, and business analysis.', 'chart-line'),
(4, 'Core Engineering', 'Mechanical, civil, electrical, electronics, and hardware engineering disciplines.', 'cogs'),
(5, 'Arts & Humanities', 'Education, journalism, psychology, social work, and public relations.', 'palette'),
(6, 'Management & MBA', 'Business administration, HR, marketing, operations, and strategic management.', 'briefcase'),
(7, 'Freelancing & Remote Careers', 'Independent work opportunities in tech, design, content, and digital services.', 'laptop'),
(8, 'Entrepreneurship & Startup', 'Building and scaling startups, SaaS products, D2C brands, and agencies.', 'rocket'),
(9, 'Higher Studies & Abroad', 'Masters, PhD, research programs, and international scholarship opportunities.', 'graduation-cap'),
(10, 'Emerging Technologies', 'AI, blockchain, Web3, AR/VR, IoT, robotics, and cutting-edge tech innovations.', 'robot'),
(11, 'Healthcare & Life Sciences', 'Pharmacy, clinical research, healthcare administration, and allied medical fields.', 'heartbeat'),
(12, 'Media & Creative', 'Graphic design, animation, video production, digital marketing, and content creation.', 'camera'),
(13, 'Law & Legal', 'Legal practice, corporate law, compliance, judiciary, and legal advisory services.', 'gavel'),
(14, 'Environment & Sustainability', 'Environmental engineering, ESG analysis, climate research, and sustainability consulting.', 'leaf'),
(15, 'Manufacturing & Industry', 'Plant management, industrial engineering, quality control, and operational excellence.', 'industry'),
(16, 'Aviation & Travel', 'Pilot training, cabin crew, airport management, and aviation maintenance.', 'plane'),
(17, 'Public Policy & NGO', 'Policy analysis, NGO management, CSR, and social development programs.', 'users'),
(18, 'Sports & Fitness', 'Fitness training, sports analytics, sports management, and physiotherapy.', 'dumbbell');

-- =====================================================
-- INSERT ROLES - IT & Software (25 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (10)
(1, 'Frontend Developer', 'Develops user-facing web interfaces using modern frameworks like React, Vue, or Angular.', '₹3-6 LPA', '₹8-15 LPA', '₹18-35 LPA', 'High'),
(1, 'Backend Developer', 'Builds server-side logic, APIs, and database management systems.', '₹4-7 LPA', '₹10-18 LPA', '₹20-40 LPA', 'High'),
(1, 'Web Developer', 'Creates and maintains websites using HTML, CSS, JavaScript, and CMS platforms.', '₹2.5-5 LPA', '₹6-12 LPA', '₹15-25 LPA', 'High'),
(1, 'Mobile App Developer', 'Develops native or cross-platform mobile applications for iOS and Android.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),
(1, 'QA Engineer', 'Tests software applications to ensure quality, functionality, and performance.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(1, 'Data Analyst', 'Analyzes data to extract insights and support business decision-making.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'High'),
(1, 'UI/UX Designer', 'Designs intuitive and visually appealing user interfaces and experiences.', '₹3-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'High'),
(1, 'DevOps Engineer', 'Automates deployment pipelines and manages cloud infrastructure.', '₹5-9 LPA', '₹12-22 LPA', '₹25-45 LPA', 'High'),
(1, 'System Administrator', 'Manages and maintains IT infrastructure, servers, and networks.', '₹3-5 LPA', '₹7-12 LPA', '₹15-25 LPA', 'Medium'),
(1, 'Cybersecurity Analyst', 'Protects systems and networks from cyber threats and vulnerabilities.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),

-- Mid Level (8)
(1, 'Full Stack Developer', 'Handles both frontend and backend development for complete web solutions.', '₹5-9 LPA', '₹12-22 LPA', '₹25-50 LPA', 'High'),
(1, 'Data Scientist', 'Uses statistical methods and machine learning to solve complex business problems.', '₹6-12 LPA', '₹15-28 LPA', '₹30-60 LPA', 'High'),
(1, 'Cloud Engineer', 'Designs and manages scalable cloud infrastructure on AWS, Azure, or GCP.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'High'),
(1, 'Product Designer', 'Leads end-to-end product design from research to final implementation.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(1, 'Security Engineer', 'Implements security measures and conducts vulnerability assessments.', '₹6-10 LPA', '₹14-25 LPA', '₹28-48 LPA', 'High'),
(1, 'Game Developer', 'Creates interactive gaming experiences using Unity, Unreal, or custom engines.', '₹4-8 LPA', '₹10-18 LPA', '₹20-35 LPA', 'Medium'),
(1, 'Business Intelligence Analyst', 'Transforms data into actionable insights using BI tools and dashboards.', '₹5-8 LPA', '₹11-18 LPA', '₹20-35 LPA', 'Medium'),
(1, 'Site Reliability Engineer', 'Ensures system reliability, uptime, and performance at scale.', '₹7-12 LPA', '₹16-28 LPA', '₹32-55 LPA', 'High'),

-- Senior Level (4)
(1, 'Product Manager', 'Defines product strategy, roadmap, and coordinates cross-functional teams.', '₹10-18 LPA', '₹22-40 LPA', '₹45-80 LPA', 'High'),
(1, 'Ethical Hacker', 'Conducts penetration testing to identify and fix security vulnerabilities.', '₹6-11 LPA', '₹15-26 LPA', '₹30-55 LPA', 'High'),
(1, 'SOC Analyst', 'Monitors security operations center and responds to security incidents.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(1, 'AI Engineer', 'Develops and deploys artificial intelligence solutions and models.', '₹8-15 LPA', '₹18-35 LPA', '₹40-70 LPA', 'High'),

-- Specialist/Emerging (3)
(1, 'Machine Learning Engineer', 'Builds and optimizes ML models for production environments.', '₹8-14 LPA', '₹18-32 LPA', '₹38-65 LPA', 'High'),
(1, 'NLP Engineer', 'Specializes in natural language processing and conversational AI.', '₹7-13 LPA', '₹16-30 LPA', '₹35-60 LPA', 'High'),
(1, 'Computer Vision Engineer', 'Develops image and video analysis systems using deep learning.', '₹7-13 LPA', '₹16-30 LPA', '₹35-62 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Government & Competitive Exams (21 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (10)
(2, 'Bank Clerk', 'Handles customer transactions and clerical work in public sector banks.', '₹20-30k/mo', '₹35-50k/mo', '₹60-80k/mo', 'High'),
(2, 'SSC CGL Officer', 'Central government positions through Staff Selection Commission exam.', '₹35-50k/mo', '₹60-80k/mo', '₹90k-1.2L/mo', 'High'),
(2, 'Income Tax Inspector', 'Assesses tax compliance and conducts audits for the Income Tax Department.', '₹44-55k/mo', '₹70-90k/mo', '₹1-1.5L/mo', 'Medium'),
(2, 'Auditor', 'Conducts financial audits for government departments and organizations.', '₹40-50k/mo', '₹65-85k/mo', '₹95k-1.3L/mo', 'Medium'),
(2, 'TNPSC Group 1/2', 'State-level administrative positions through Tamil Nadu Public Service Commission.', '₹35-50k/mo', '₹60-85k/mo', '₹90k-1.3L/mo', 'High'),
(2, 'State PSC Officer', 'Various state government positions through Public Service Commission exams.', '₹35-50k/mo', '₹60-80k/mo', '₹85k-1.2L/mo', 'High'),
(2, 'Coast Guard', 'Maritime security and search-and-rescue operations officer.', '₹56-70k/mo', '₹90k-1.2L/mo', '₹1.5-2L/mo', 'Medium'),
(2, 'GATE', 'Graduate Aptitude Test for PSU jobs and higher studies in engineering.', 'Variable', 'Variable', 'Variable', 'High'),
(2, 'CAT', 'Common Admission Test for IIM and top B-school MBA programs.', 'Variable', 'Variable', 'Variable', 'High'),
(2, 'NET/SET', 'National Eligibility Test for assistant professor and research positions.', '₹57k/mo', '₹80k-1L/mo', '₹1.3-1.8L/mo', 'Medium'),

-- Mid Level (6)
(2, 'Bank PO', 'Probationary Officer managing banking operations and customer relations.', '₹40-55k/mo', '₹70-95k/mo', '₹1.1-1.6L/mo', 'High'),
(2, 'RBI Grade B', 'Officer-level position in Reserve Bank of India with policy-making roles.', '₹67-77k/mo', '₹1-1.3L/mo', '₹1.6-2.2L/mo', 'High'),
(2, 'NABARD Officer', 'Development banking officer for agriculture and rural development.', '₹50-65k/mo', '₹80k-1.1L/mo', '₹1.3-1.8L/mo', 'Medium'),
(2, 'Army Officer', 'Commissioned officer in Indian Army through NDA, CDS, or technical entry.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'High'),
(2, 'Navy Officer', 'Commissioned officer in Indian Navy with technical and executive roles.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'Medium'),
(2, 'Air Force Officer', 'Commissioned officer in Indian Air Force with flying and ground duties.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'Medium'),

-- Senior Level (3)
(2, 'IAS', 'Indian Administrative Service - top administrative positions in government.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),
(2, 'IPS', 'Indian Police Service - senior police administration and law enforcement.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),
(2, 'IFS', 'Indian Foreign Service - diplomatic and consular positions abroad.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),

-- Specialist (2)
(2, 'IRS', 'Indian Revenue Service - tax administration and revenue collection.', '₹56-70k/mo', '₹1.1-1.6L/mo', '₹2-2.5L/mo', 'High'),
(2, 'NEET PG', 'National Eligibility cum Entrance Test for postgraduate medical courses.', 'Variable', 'Variable', 'Variable', 'High');

-- =====================================================
-- INSERT ROLES - Commerce & Finance (14 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (6)
(3, 'Auditor', 'Examines financial records for accuracy and compliance with regulations.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),
(3, 'Tax Consultant', 'Advises clients on tax planning, compliance, and optimization strategies.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(3, 'Financial Analyst', 'Analyzes financial data to guide investment and business decisions.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),
(3, 'Credit Analyst', 'Evaluates creditworthiness of individuals and businesses for lending.', '₹3.5-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),
(3, 'Operations Analyst', 'Optimizes business processes and operational efficiency.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(3, 'Business Analyst', 'Bridges business needs with technical solutions through requirement analysis.', '₹4.5-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),

-- Mid Level (5)
(3, 'Chartered Accountant', 'Provides audit, taxation, and financial advisory services.', '₹7-12 LPA', '₹16-28 LPA', '₹35-60 LPA', 'High'),
(3, 'CMA', 'Cost and Management Accountant specializing in cost optimization.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(3, 'Company Secretary', 'Ensures corporate governance and regulatory compliance.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'Medium'),
(3, 'Investment Banker', 'Facilitates capital raising, M&A, and financial advisory for corporations.', '₹8-15 LPA', '₹20-40 LPA', '₹50-100 LPA', 'High'),
(3, 'Equity Research Analyst', 'Analyzes stocks and provides investment recommendations.', '₹5-9 LPA', '₹12-22 LPA', '₹28-50 LPA', 'High'),

-- Senior Level (2)
(3, 'Risk Analyst', 'Identifies and mitigates financial and operational risks.', '₹6-10 LPA', '₹14-25 LPA', '₹30-52 LPA', 'Medium'),
(3, 'Portfolio Manager', 'Manages investment portfolios to maximize returns for clients.', '₹8-14 LPA', '₹18-35 LPA', '₹40-75 LPA', 'High'),

-- Specialist (1)
(3, 'Management Consultant', 'Advises organizations on strategy, operations, and transformation.', '₹8-15 LPA', '₹20-38 LPA', '₹45-80 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Core Engineering (12 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (5)
(4, 'Design Engineer', 'Creates technical designs and drawings for mechanical and product systems.', '₹3-5 LPA', '₹7-12 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Production Engineer', 'Oversees manufacturing processes and production line optimization.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Quality Engineer', 'Ensures product quality through testing and process improvements.', '₹3-5 LPA', '₹7-12 LPA', '₹15-26 LPA', 'Medium'),
(4, 'Site Engineer', 'Manages on-site construction activities and project execution.', '₹3-5 LPA', '₹7-12 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Electrical Design Engineer', 'Designs electrical systems, circuits, and power distribution networks.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-32 LPA', 'Medium'),

-- Mid Level (4)
(4, 'Maintenance Engineer', 'Maintains and troubleshoots industrial equipment and machinery.', '₹4-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),
(4, 'Structural Engineer', 'Analyzes and designs structural components for buildings and infrastructure.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(4, 'Power Systems Engineer', 'Designs and manages electrical power generation and distribution systems.', '₹4-7 LPA', '₹9-16 LPA', '₹20-36 LPA', 'Medium'),
(4, 'Embedded Engineer', 'Develops embedded systems and firmware for electronic devices.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),

-- Senior Level (2)
(4, 'Construction Manager', 'Oversees entire construction projects from planning to completion.', '₹5-9 LPA', '₹12-22 LPA', '₹26-45 LPA', 'Medium'),
(4, 'VLSI Engineer', 'Designs integrated circuits and semiconductor chips.', '₹6-12 LPA', '₹15-28 LPA', '₹32-55 LPA', 'High'),

-- Specialist (1)
(4, 'Hardware Engineer', 'Designs and tests computer hardware components and systems.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium');

-- =====================================================
-- INSERT ROLES - Arts & Humanities (10 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (5)
(5, 'Content Writer', 'Creates engaging written content for websites, blogs, and marketing.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'High'),
(5, 'School Teacher', 'Educates students in primary or secondary schools across subjects.', '₹2.5-4 LPA', '₹5-9 LPA', '₹12-20 LPA', 'Medium'),
(5, 'Journalist', 'Reports news and stories across print, digital, and broadcast media.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium'),
(5, 'Social Worker', 'Supports individuals and communities facing social challenges.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium'),
(5, 'Public Relations Officer', 'Manages public image and media relations for organizations.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),

-- Mid Level (3)
(5, 'Editor', 'Reviews and refines written content for publication and quality.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),
(5, 'Psychologist', 'Provides mental health counseling and psychological assessments.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(5, 'Lecturer', 'Teaches undergraduate students in colleges and universities.', '₹4-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),

-- Senior Level (1)
(5, 'Professor', 'Conducts research and teaches at postgraduate and doctoral levels.', '₹6-10 LPA', '₹14-25 LPA', '₹30-55 LPA', 'Medium'),

-- Specialist (1)
(5, 'Historian', 'Researches and documents historical events, cultures, and societies.', '₹3-6 LPA', '₹8-14 LPA', '₹18-32 LPA', 'Low');

-- =====================================================
-- INSERT ROLES - Management & MBA (8 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (3)
(6, 'HR Manager', 'Manages recruitment, employee relations, and organizational development.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),
(6, 'Sales Manager', 'Leads sales teams and drives revenue growth strategies.', '₹4-7 LPA', '₹10-20 LPA', '₹24-45 LPA', 'High'),
(6, 'Brand Manager', 'Develops and executes brand strategy and positioning.', '₹5-8 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium'),

-- Mid Level (3)
(6, 'Marketing Manager', 'Plans and executes marketing campaigns across channels.', '₹5-9 LPA', '₹12-22 LPA', '₹26-50 LPA', 'High'),
(6, 'Operations Manager', 'Oversees daily business operations and process optimization.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium'),
(6, 'Business Development Manager', 'Identifies growth opportunities and builds strategic partnerships.', '₹5-9 LPA', '₹12-24 LPA', '₹28-52 LPA', 'High'),

-- Senior Level (1)
(6, 'Supply Chain Manager', 'Manages end-to-end supply chain operations and logistics.', '₹6-11 LPA', '₹14-26 LPA', '₹30-55 LPA', 'Medium'),

-- Specialist (1)
(6, 'Product Manager', 'Defines product vision, strategy, and roadmap execution.', '₹8-15 LPA', '₹20-38 LPA', '₹45-80 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Freelancing & Remote Careers (7 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (4)
(7, 'Content Writer', 'Creates blog posts, articles, and marketing copy for global clients.', '₹2-4 LPA', '₹5-10 LPA', '₹12-25 LPA', 'High'),
(7, 'Virtual Assistant', 'Provides administrative support remotely for businesses and entrepreneurs.', '₹2-3.5 LPA', '₹4-8 LPA', '₹10-18 LPA', 'Medium'),
(7, 'Online Tutor', 'Teaches students remotely across various subjects and competitive exams.', '₹2-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'High'),
(7, 'SEO Specialist', 'Optimizes websites for search engines to improve organic traffic.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'High'),

-- Mid Level (2)
(7, 'Freelance Web Developer', 'Builds websites and web applications for clients worldwide.', '₹4-8 LPA', '₹10-20 LPA', '₹24-45 LPA', 'High'),
(7, 'Freelance Designer', 'Creates graphic designs, branding, and visual content for clients.', '₹3-6 LPA', '₹8-16 LPA', '₹18-35 LPA', 'High'),

-- Senior Level (1)
(7, 'Video Editor', 'Edits videos for YouTube, social media, and commercial projects.', '₹3-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Entrepreneurship & Startup (6 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(8, 'Franchise Owner', 'Operates a franchise business under an established brand.', 'Variable', 'Variable', 'Variable', 'Medium'),
(8, 'Agency Owner', 'Runs a service agency in marketing, design, or consulting.', 'Variable', 'Variable', 'Variable', 'Medium'),

-- Mid Level (2)
(8, 'D2C Brand Owner', 'Builds and scales direct-to-consumer product brands.', 'Variable', 'Variable', 'Variable', 'High'),
(8, 'App Founder', 'Creates and launches mobile or web applications as a business.', 'Variable', 'Variable', 'Variable', 'High'),

-- Senior Level (1)
(8, 'SaaS Founder', 'Develops and scales software-as-a-service products.', 'Variable', 'Variable', 'Variable', 'High'),

-- Specialist (1)
(8, 'Tech Startup Founder', 'Builds technology-driven startups solving real-world problems.', 'Variable', 'Variable', 'Variable', 'High');

-- =====================================================
-- INSERT ROLES - Higher Studies & Abroad (5 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(9, 'MS Abroad', 'Pursue Masters degree in engineering, science, or business abroad.', 'Variable', 'Variable', 'Variable', 'High'),
(9, 'Scholarship Programs', 'Apply for fully-funded scholarships like Fulbright, Chevening, DAAD.', 'Variable', 'Variable', 'Variable', 'Medium'),

-- Mid Level (2)
(9, 'MBA Abroad', 'Pursue MBA from top international business schools.', 'Variable', 'Variable', 'Variable', 'High'),
(9, 'Research Associate', 'Work on research projects in universities and research institutions.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium'),

-- Senior Level (1)
(9, 'PhD Scholar', 'Conduct doctoral research in specialized academic fields.', '₹3-5 LPA', '₹6-12 LPA', '₹15-30 LPA', 'Medium');

-- =====================================================
-- INSERT ROLES - Emerging Technologies (6 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(10, 'IoT Engineer', 'Develops Internet of Things solutions connecting devices and sensors.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),
(10, 'Prompt Engineer', 'Designs effective prompts for AI models and language systems.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'High'),

-- Mid Level (2)
(10, 'Blockchain Developer', 'Builds decentralized applications and smart contracts.', '₹6-12 LPA', '₹15-28 LPA', '₹32-60 LPA', 'High'),
(10, 'AR/VR Developer', 'Creates augmented and virtual reality experiences and applications.', '₹5-10 LPA', '₹12-24 LPA', '₹28-52 LPA', 'High'),

-- Senior Level (1)
(10, 'Robotics Engineer', 'Designs and programs robots for industrial and consumer applications.', '₹6-11 LPA', '₹14-26 LPA', '₹30-55 LPA', 'High'),

-- Specialist (1)
(10, 'Web3 Developer', 'Develops decentralized web applications using blockchain technology.', '₹7-13 LPA', '₹16-30 LPA', '₹35-65 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Healthcare & Life Sciences (6 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (3)
(11, 'Pharmacist', 'Dispenses medications and provides pharmaceutical care to patients.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium'),
(11, 'Lab Technician', 'Conducts medical tests and analyzes laboratory samples.', '₹2-3.5 LPA', '₹4-8 LPA', '₹10-18 LPA', 'Medium'),
(11, 'Nutritionist', 'Provides dietary advice and creates nutrition plans for health management.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-24 LPA', 'Medium'),

-- Mid Level (2)
(11, 'Clinical Research Associate', 'Manages clinical trials and ensures regulatory compliance.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'High'),
(11, 'Physiotherapist', 'Provides physical rehabilitation and therapy for injury recovery.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium'),

-- Senior Level (1)
(11, 'Healthcare Administrator', 'Manages healthcare facilities, operations, and patient services.', '₹5-8 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium');

-- =====================================================
-- INSERT ROLES - Media & Creative (7 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (4)
(12, 'Graphic Designer', 'Creates visual designs for branding, marketing, and digital media.', '₹2.5-4 LPA', '₹6-12 LPA', '₹15-28 LPA', 'High'),
(12, 'Video Editor', 'Edits video content for films, YouTube, and commercial projects.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'High'),
(12, 'Social Media Manager', 'Manages social media presence and engagement for brands.', '₹3-5 LPA', '₹7-14 LPA', '₹16-32 LPA', 'High'),
(12, 'Digital Marketer', 'Executes online marketing campaigns across digital channels.', '₹3-5 LPA', '₹7-14 LPA', '₹16-32 LPA', 'High'),

-- Mid Level (2)
(12, 'Animator', 'Creates 2D/3D animations for films, games, and advertisements.', '₹3-6 LPA', '₹8-15 LPA', '₹18-35 LPA', 'Medium'),
(12, 'Cinematographer', 'Captures visual storytelling through camera work and lighting.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),

-- Specialist (1)
(12, 'Influencer', 'Creates content and builds audience on social media platforms.', 'Variable', 'Variable', 'Variable', 'High');

-- =====================================================
-- INSERT ROLES - Law & Legal (6 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (3)
(13, 'Legal Analyst', 'Researches legal issues and assists in case preparation.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(13, 'Compliance Officer', 'Ensures organizational adherence to legal and regulatory requirements.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(13, 'Advocate', 'Represents clients in courts and provides legal counsel.', '₹3-6 LPA', '₹8-16 LPA', '₹20-45 LPA', 'Medium'),

-- Mid Level (2)
(13, 'Corporate Lawyer', 'Handles legal matters for businesses including contracts and compliance.', '₹6-12 LPA', '₹15-30 LPA', '₹35-70 LPA', 'High'),
(13, 'Legal Advisor', 'Provides expert legal advice to organizations and individuals.', '₹5-9 LPA', '₹12-24 LPA', '₹28-55 LPA', 'Medium'),

-- Senior Level (1)
(13, 'Judge (via exams)', 'Presides over court proceedings through judicial service examinations.', '₹80k-1.2L/mo', '₹1.5-2L/mo', '₹2.5-3L/mo', 'High');

-- =====================================================
-- INSERT ROLES - Environment & Sustainability (4 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(14, 'Environmental Engineer', 'Designs solutions for environmental protection and pollution control.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium'),
(14, 'Climate Researcher', 'Studies climate change patterns and environmental impacts.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),

-- Mid Level (1)
(14, 'ESG Analyst', 'Evaluates environmental, social, and governance factors for investments.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'High'),

-- Senior Level (1)
(14, 'Sustainability Consultant', 'Advises organizations on sustainable practices and green initiatives.', '₹6-10 LPA', '₹14-25 LPA', '₹30-55 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Manufacturing & Industry (4 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(15, 'Industrial Engineer', 'Optimizes production processes and manufacturing efficiency.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium'),
(15, 'Safety Officer', 'Ensures workplace safety compliance and risk management.', '₹3-5 LPA', '₹6-12 LPA', '₹15-26 LPA', 'Medium'),

-- Mid Level (1)
(15, 'Lean Six Sigma Expert', 'Implements process improvement methodologies for quality and efficiency.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium'),

-- Senior Level (1)
(15, 'Plant Manager', 'Oversees entire manufacturing plant operations and production.', '₹7-12 LPA', '₹16-30 LPA', '₹35-60 LPA', 'Medium');

-- =====================================================
-- INSERT ROLES - Aviation & Travel (4 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(16, 'Cabin Crew', 'Provides in-flight service and ensures passenger safety.', '₹3-5 LPA', '₹6-10 LPA', '₹12-20 LPA', 'Medium'),
(16, 'Aviation Maintenance Engineer', 'Maintains and repairs aircraft systems and components.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),

-- Mid Level (1)
(16, 'Airport Manager', 'Manages airport operations, logistics, and customer services.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'Medium'),

-- Senior Level (1)
(16, 'Pilot', 'Operates aircraft for commercial airlines or private aviation.', '₹8-15 LPA', '₹20-40 LPA', '₹50-100 LPA', 'High');

-- =====================================================
-- INSERT ROLES - Public Policy & NGO (4 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(17, 'Development Officer', 'Implements development programs in rural and urban communities.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium'),
(17, 'CSR Manager', 'Manages corporate social responsibility initiatives and programs.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),

-- Mid Level (1)
(17, 'NGO Project Manager', 'Leads social impact projects and manages NGO operations.', '₹3-6 LPA', '₹7-14 LPA', '₹16-30 LPA', 'Medium'),

-- Senior Level (1)
(17, 'Policy Analyst', 'Researches and analyzes public policies for government and think tanks.', '₹5-8 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium');

-- =====================================================
-- INSERT ROLES - Sports & Fitness (4 roles)
-- =====================================================

INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
-- Entry Level (2)
(18, 'Fitness Trainer', 'Provides personal training and fitness guidance to clients.', '₹2-4 LPA', '₹5-10 LPA', '₹12-24 LPA', 'High'),
(18, 'Sports Physiotherapist', 'Provides injury rehabilitation and physical therapy for athletes.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium'),

-- Mid Level (1)
(18, 'Sports Analyst', 'Analyzes sports performance data and provides strategic insights.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),

-- Senior Level (1)
(18, 'Sports Manager', 'Manages sports teams, events, and athlete careers.', '₹5-9 LPA', '₹12-24 LPA', '₹28-55 LPA', 'Medium');

-- =====================================================
-- END OF SEED DATA
-- Total: 18 Domains, 167 Roles
-- =====================================================
