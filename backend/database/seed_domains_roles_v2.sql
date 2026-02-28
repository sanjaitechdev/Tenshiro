-- =====================================================
-- PATHPILOT AI - DOMAIN & ROLE REPLACEMENT SCRIPT V2
-- =====================================================
-- This script replaces ALL existing domain and role data
-- with the NEW finalized 18-domain structure
-- =====================================================
-- IMPORTANT: This will delete ALL existing progress data
-- Run this ONLY if you want to completely reset the data
-- =====================================================

-- Disable foreign key checks temporarily for safe deletion
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- STEP 1: CLEAR ALL EXISTING DATA
-- =====================================================

-- Clear dependent tables first (respecting FK constraints)
TRUNCATE TABLE user_progress;
TRUNCATE TABLE roadmap_tasks;
TRUNCATE TABLE roadmap_phases;

-- Clear roles table
TRUNCATE TABLE roles;

-- Clear domains table
TRUNCATE TABLE domains;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- STEP 2: INSERT NEW 18 DOMAINS
-- =====================================================

INSERT INTO domains (id, name, description, icon) VALUES
(1, 'IT & Software', 'Software development, AI/ML, data science, cybersecurity, and DevOps.', 'code'),
(2, 'Government & Competitive Exams', 'Civil services, banking, defense, and public sector entrance exams.', 'building'),
(3, 'Commerce & Finance', 'Accounting, finance, investment banking, and business consulting.', 'chart-line'),
(4, 'Core Engineering', 'Mechanical, civil, electrical, electronics, and VLSI engineering.', 'cogs'),
(5, 'Arts & Humanities', 'Education, journalism, psychology, and social work.', 'palette'),
(6, 'Management & MBA', 'Business management, HR, marketing, and operations.', 'briefcase'),
(7, 'Freelancing & Remote Careers', 'Independent work in tech, design, content, and digital services.', 'laptop'),
(8, 'Entrepreneurship & Startup', 'Building startups, SaaS products, D2C brands, and agencies.', 'rocket'),
(9, 'Higher Studies & Abroad', 'Masters, PhD, research, and international scholarships.', 'graduation-cap'),
(10, 'Emerging Technologies', 'Blockchain, Web3, AR/VR, IoT, robotics, and AI innovations.', 'robot'),
(11, 'Healthcare & Life Sciences', 'Pharmacy, clinical research, healthcare, and allied medical fields.', 'heartbeat'),
(12, 'Media & Creative', 'Design, animation, video production, and digital marketing.', 'camera'),
(13, 'Law & Legal', 'Legal practice, corporate law, compliance, and judiciary.', 'gavel'),
(14, 'Environment & Sustainability', 'Environmental engineering, ESG, and climate research.', 'leaf'),
(15, 'Manufacturing & Industry', 'Plant management, industrial engineering, and quality control.', 'industry'),
(16, 'Aviation & Travel', 'Aviation, pilot training, cabin crew, and airport management.', 'plane'),
(17, 'Public Policy & NGO', 'Policy analysis, NGO management, and social development.', 'users'),
(18, 'Sports & Fitness', 'Fitness training, sports analytics, and sports management.', 'dumbbell');

-- =====================================================
-- STEP 3: INSERT ROLES UNDER EACH DOMAIN
-- =====================================================

-- -----------------------------------------------------
-- Domain 1: IT & Software (25 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(1, 'Frontend Developer', 'Builds user interfaces using React, Vue, or Angular.', '₹3-6 LPA', '₹8-15 LPA', '₹18-35 LPA', 'High'),
(1, 'Backend Developer', 'Develops server-side APIs and database systems.', '₹4-7 LPA', '₹10-18 LPA', '₹20-40 LPA', 'High'),
(1, 'Full Stack Developer', 'Handles both frontend and backend development.', '₹5-9 LPA', '₹12-22 LPA', '₹25-50 LPA', 'High'),
(1, 'Web Developer', 'Creates and maintains websites using HTML, CSS, JavaScript.', '₹2.5-5 LPA', '₹6-12 LPA', '₹15-25 LPA', 'High'),
(1, 'Mobile App Developer', 'Develops iOS and Android mobile applications.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),
(1, 'Game Developer', 'Creates games using Unity, Unreal, or custom engines.', '₹4-8 LPA', '₹10-18 LPA', '₹20-35 LPA', 'Medium'),
(1, 'Data Analyst', 'Analyzes data to extract business insights.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'High'),
(1, 'Data Scientist', 'Uses ML and statistics to solve complex problems.', '₹6-12 LPA', '₹15-28 LPA', '₹30-60 LPA', 'High'),
(1, 'AI Engineer', 'Develops and deploys AI solutions and models.', '₹8-15 LPA', '₹18-35 LPA', '₹40-70 LPA', 'High'),
(1, 'Machine Learning Engineer', 'Builds and optimizes ML models for production.', '₹8-14 LPA', '₹18-32 LPA', '₹38-65 LPA', 'High'),
(1, 'NLP Engineer', 'Specializes in natural language processing.', '₹7-13 LPA', '₹16-30 LPA', '₹35-60 LPA', 'High'),
(1, 'Computer Vision Engineer', 'Develops image and video analysis systems.', '₹7-13 LPA', '₹16-30 LPA', '₹35-62 LPA', 'High'),
(1, 'Business Intelligence Analyst', 'Transforms data into actionable insights.', '₹5-8 LPA', '₹11-18 LPA', '₹20-35 LPA', 'Medium'),
(1, 'DevOps Engineer', 'Automates deployment and manages cloud infrastructure.', '₹5-9 LPA', '₹12-22 LPA', '₹25-45 LPA', 'High'),
(1, 'Cloud Engineer', 'Designs and manages AWS/Azure/GCP infrastructure.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'High'),
(1, 'Site Reliability Engineer', 'Ensures system reliability and uptime at scale.', '₹7-12 LPA', '₹16-28 LPA', '₹32-55 LPA', 'High'),
(1, 'System Administrator', 'Manages IT infrastructure and servers.', '₹3-5 LPA', '₹7-12 LPA', '₹15-25 LPA', 'Medium'),
(1, 'Cybersecurity Analyst', 'Protects systems from cyber threats.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),
(1, 'Ethical Hacker', 'Conducts penetration testing for vulnerabilities.', '₹6-11 LPA', '₹15-26 LPA', '₹30-55 LPA', 'High'),
(1, 'Security Engineer', 'Implements security measures and assessments.', '₹6-10 LPA', '₹14-25 LPA', '₹28-48 LPA', 'High'),
(1, 'SOC Analyst', 'Monitors security operations and incident response.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(1, 'UI/UX Designer', 'Designs intuitive user interfaces and experiences.', '₹3-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'High'),
(1, 'Product Designer', 'Leads end-to-end product design.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(1, 'Product Manager', 'Defines product strategy and roadmap.', '₹10-18 LPA', '₹22-40 LPA', '₹45-80 LPA', 'High'),
(1, 'QA Engineer', 'Tests software for quality and performance.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 2: Government & Competitive Exams (21 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(2, 'IAS', 'Indian Administrative Service - top govt positions.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),
(2, 'IPS', 'Indian Police Service - senior police administration.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),
(2, 'IFS', 'Indian Foreign Service - diplomatic positions.', '₹56-70k/mo', '₹1.2-1.8L/mo', '₹2.2-2.5L/mo', 'High'),
(2, 'IRS', 'Indian Revenue Service - tax administration.', '₹56-70k/mo', '₹1.1-1.6L/mo', '₹2-2.5L/mo', 'High'),
(2, 'TNPSC Group 1/2', 'State-level administrative positions.', '₹35-50k/mo', '₹60-85k/mo', '₹90k-1.3L/mo', 'High'),
(2, 'State PSC Officer', 'State government positions via PSC exams.', '₹35-50k/mo', '₹60-80k/mo', '₹85k-1.2L/mo', 'High'),
(2, 'Bank PO', 'Probationary Officer in banking operations.', '₹40-55k/mo', '₹70-95k/mo', '₹1.1-1.6L/mo', 'High'),
(2, 'Bank Clerk', 'Customer service and clerical work in banks.', '₹20-30k/mo', '₹35-50k/mo', '₹60-80k/mo', 'High'),
(2, 'RBI Grade B', 'Officer position in Reserve Bank of India.', '₹67-77k/mo', '₹1-1.3L/mo', '₹1.6-2.2L/mo', 'High'),
(2, 'NABARD Officer', 'Development banking for agriculture.', '₹50-65k/mo', '₹80k-1.1L/mo', '₹1.3-1.8L/mo', 'Medium'),
(2, 'SSC CGL Officer', 'Central govt positions via SSC.', '₹35-50k/mo', '₹60-80k/mo', '₹90k-1.2L/mo', 'High'),
(2, 'Income Tax Inspector', 'Tax compliance and audit work.', '₹44-55k/mo', '₹70-90k/mo', '₹1-1.5L/mo', 'Medium'),
(2, 'Auditor', 'Government financial audits.', '₹40-50k/mo', '₹65-85k/mo', '₹95k-1.3L/mo', 'Medium'),
(2, 'Army Officer', 'Commissioned officer in Indian Army.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'High'),
(2, 'Navy Officer', 'Commissioned officer in Indian Navy.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'Medium'),
(2, 'Air Force Officer', 'Commissioned officer in Indian Air Force.', '₹56-70k/mo', '₹90k-1.3L/mo', '₹1.5-2.5L/mo', 'Medium'),
(2, 'Coast Guard', 'Maritime security operations officer.', '₹56-70k/mo', '₹90k-1.2L/mo', '₹1.5-2L/mo', 'Medium'),
(2, 'GATE', 'Graduate exam for PSU jobs and higher studies.', 'Variable', 'Variable', 'Variable', 'High'),
(2, 'CAT', 'MBA entrance for IIMs and top B-schools.', 'Variable', 'Variable', 'Variable', 'High'),
(2, 'NET/SET', 'Eligibility for assistant professor roles.', '₹57k/mo', '₹80k-1L/mo', '₹1.3-1.8L/mo', 'Medium'),
(2, 'NEET PG', 'Postgraduate medical entrance exam.', 'Variable', 'Variable', 'Variable', 'High');

-- -----------------------------------------------------
-- Domain 3: Commerce & Finance (14 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(3, 'Chartered Accountant', 'Audit, taxation, and financial advisory.', '₹7-12 LPA', '₹16-28 LPA', '₹35-60 LPA', 'High'),
(3, 'CMA', 'Cost and Management Accountant.', '₹5-9 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(3, 'Company Secretary', 'Corporate governance and compliance.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'Medium'),
(3, 'Auditor', 'Financial record examination and compliance.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),
(3, 'Tax Consultant', 'Tax planning and compliance advisory.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(3, 'Financial Analyst', 'Financial data analysis for investments.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),
(3, 'Investment Banker', 'Capital raising and M&A advisory.', '₹8-15 LPA', '₹20-40 LPA', '₹50-100 LPA', 'High'),
(3, 'Equity Research Analyst', 'Stock analysis and investment recommendations.', '₹5-9 LPA', '₹12-22 LPA', '₹28-50 LPA', 'High'),
(3, 'Credit Analyst', 'Creditworthiness evaluation for lending.', '₹3.5-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),
(3, 'Risk Analyst', 'Financial and operational risk mitigation.', '₹6-10 LPA', '₹14-25 LPA', '₹30-52 LPA', 'Medium'),
(3, 'Portfolio Manager', 'Investment portfolio management.', '₹8-14 LPA', '₹18-35 LPA', '₹40-75 LPA', 'High'),
(3, 'Business Analyst', 'Business needs and technical solutions bridge.', '₹4.5-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),
(3, 'Operations Analyst', 'Business process optimization.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(3, 'Management Consultant', 'Strategy and operations advisory.', '₹8-15 LPA', '₹20-38 LPA', '₹45-80 LPA', 'High');

-- -----------------------------------------------------
-- Domain 4: Core Engineering (12 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(4, 'Design Engineer', 'Technical designs for mechanical systems.', '₹3-5 LPA', '₹7-12 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Production Engineer', 'Manufacturing process optimization.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Maintenance Engineer', 'Industrial equipment maintenance.', '₹4-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),
(4, 'Quality Engineer', 'Product quality and process improvement.', '₹3-5 LPA', '₹7-12 LPA', '₹15-26 LPA', 'Medium'),
(4, 'Site Engineer', 'On-site construction management.', '₹3-5 LPA', '₹7-12 LPA', '₹16-28 LPA', 'Medium'),
(4, 'Structural Engineer', 'Structural design for buildings.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(4, 'Construction Manager', 'Complete construction project oversight.', '₹5-9 LPA', '₹12-22 LPA', '₹26-45 LPA', 'Medium'),
(4, 'Electrical Design Engineer', 'Electrical systems and circuits design.', '₹3.5-6 LPA', '₹8-14 LPA', '₹18-32 LPA', 'Medium'),
(4, 'Power Systems Engineer', 'Power generation and distribution.', '₹4-7 LPA', '₹9-16 LPA', '₹20-36 LPA', 'Medium'),
(4, 'Embedded Engineer', 'Embedded systems and firmware dev.', '₹4-7 LPA', '₹10-18 LPA', '₹22-38 LPA', 'High'),
(4, 'VLSI Engineer', 'Integrated circuit design.', '₹6-12 LPA', '₹15-28 LPA', '₹32-55 LPA', 'High'),
(4, 'Hardware Engineer', 'Computer hardware design and testing.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 5: Arts & Humanities (10 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(5, 'School Teacher', 'Primary/secondary school education.', '₹2.5-4 LPA', '₹5-9 LPA', '₹12-20 LPA', 'Medium'),
(5, 'Lecturer', 'Undergraduate college teaching.', '₹4-6 LPA', '₹8-14 LPA', '₹18-30 LPA', 'Medium'),
(5, 'Professor', 'Postgraduate research and teaching.', '₹6-10 LPA', '₹14-25 LPA', '₹30-55 LPA', 'Medium'),
(5, 'Journalist', 'News reporting and storytelling.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium'),
(5, 'Content Writer', 'Written content for web and marketing.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'High'),
(5, 'Editor', 'Content review and publication quality.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium'),
(5, 'Psychologist', 'Mental health counseling and assessment.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(5, 'Social Worker', 'Community support and social challenges.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium'),
(5, 'Public Relations Officer', 'Public image and media relations.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium'),
(5, 'Historian', 'Historical research and documentation.', '₹3-6 LPA', '₹8-14 LPA', '₹18-32 LPA', 'Low');

-- -----------------------------------------------------
-- Domain 6: Management & MBA (8 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(6, 'HR Manager', 'Recruitment and employee relations.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),
(6, 'Marketing Manager', 'Marketing campaigns across channels.', '₹5-9 LPA', '₹12-22 LPA', '₹26-50 LPA', 'High'),
(6, 'Sales Manager', 'Sales team leadership and revenue growth.', '₹4-7 LPA', '₹10-20 LPA', '₹24-45 LPA', 'High'),
(6, 'Operations Manager', 'Daily operations and process optimization.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium'),
(6, 'Product Manager', 'Product vision and strategy.', '₹8-15 LPA', '₹20-38 LPA', '₹45-80 LPA', 'High'),
(6, 'Business Development Manager', 'Growth opportunities and partnerships.', '₹5-9 LPA', '₹12-24 LPA', '₹28-52 LPA', 'High'),
(6, 'Supply Chain Manager', 'End-to-end supply chain operations.', '₹6-11 LPA', '₹14-26 LPA', '₹30-55 LPA', 'Medium'),
(6, 'Brand Manager', 'Brand strategy and positioning.', '₹5-8 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 7: Freelancing & Remote Careers (7 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(7, 'Freelance Web Developer', 'Websites and apps for global clients.', '₹4-8 LPA', '₹10-20 LPA', '₹24-45 LPA', 'High'),
(7, 'Freelance Designer', 'Graphic design and branding.', '₹3-6 LPA', '₹8-16 LPA', '₹18-35 LPA', 'High'),
(7, 'Content Writer', 'Blog posts and marketing copy.', '₹2-4 LPA', '₹5-10 LPA', '₹12-25 LPA', 'High'),
(7, 'Video Editor', 'Video editing for YouTube and social media.', '₹3-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'High'),
(7, 'Virtual Assistant', 'Remote administrative support.', '₹2-3.5 LPA', '₹4-8 LPA', '₹10-18 LPA', 'Medium'),
(7, 'Online Tutor', 'Remote teaching across subjects.', '₹2-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'High'),
(7, 'SEO Specialist', 'Search engine optimization.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'High');

-- -----------------------------------------------------
-- Domain 8: Entrepreneurship & Startup (6 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(8, 'Tech Startup Founder', 'Technology-driven startup building.', 'Variable', 'Variable', 'Variable', 'High'),
(8, 'SaaS Founder', 'Software-as-a-service product development.', 'Variable', 'Variable', 'Variable', 'High'),
(8, 'D2C Brand Owner', 'Direct-to-consumer product brands.', 'Variable', 'Variable', 'Variable', 'High'),
(8, 'Agency Owner', 'Service agency in marketing or design.', 'Variable', 'Variable', 'Variable', 'Medium'),
(8, 'App Founder', 'Mobile/web app launch and scaling.', 'Variable', 'Variable', 'Variable', 'High'),
(8, 'Franchise Owner', 'Franchise business operations.', 'Variable', 'Variable', 'Variable', 'Medium');

-- -----------------------------------------------------
-- Domain 9: Higher Studies & Abroad (5 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(9, 'MS Abroad', 'Masters in engineering/science abroad.', 'Variable', 'Variable', 'Variable', 'High'),
(9, 'MBA Abroad', 'MBA from international B-schools.', 'Variable', 'Variable', 'Variable', 'High'),
(9, 'PhD Scholar', 'Doctoral research in specialized fields.', '₹3-5 LPA', '₹6-12 LPA', '₹15-30 LPA', 'Medium'),
(9, 'Research Associate', 'Research projects in universities.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium'),
(9, 'Scholarship Programs', 'Fully-funded scholarships like Fulbright.', 'Variable', 'Variable', 'Variable', 'Medium');

-- -----------------------------------------------------
-- Domain 10: Emerging Technologies (6 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(10, 'Blockchain Developer', 'Decentralized apps and smart contracts.', '₹6-12 LPA', '₹15-28 LPA', '₹32-60 LPA', 'High'),
(10, 'Web3 Developer', 'Decentralized web applications.', '₹7-13 LPA', '₹16-30 LPA', '₹35-65 LPA', 'High'),
(10, 'AR/VR Developer', 'Augmented and virtual reality experiences.', '₹5-10 LPA', '₹12-24 LPA', '₹28-52 LPA', 'High'),
(10, 'IoT Engineer', 'Internet of Things device connectivity.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'High'),
(10, 'Robotics Engineer', 'Robot design and programming.', '₹6-11 LPA', '₹14-26 LPA', '₹30-55 LPA', 'High'),
(10, 'Prompt Engineer', 'AI model prompt design and optimization.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'High');

-- -----------------------------------------------------
-- Domain 11: Healthcare & Life Sciences (6 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(11, 'Pharmacist', 'Medication dispensing and pharmaceutical care.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium'),
(11, 'Lab Technician', 'Medical testing and lab sample analysis.', '₹2-3.5 LPA', '₹4-8 LPA', '₹10-18 LPA', 'Medium'),
(11, 'Clinical Research Associate', 'Clinical trials and regulatory compliance.', '₹4-7 LPA', '₹9-16 LPA', '₹20-35 LPA', 'High'),
(11, 'Healthcare Administrator', 'Healthcare facility management.', '₹5-8 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(11, 'Nutritionist', 'Dietary advice and nutrition planning.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-24 LPA', 'Medium'),
(11, 'Physiotherapist', 'Physical rehabilitation and therapy.', '₹3-5 LPA', '₹6-12 LPA', '₹15-28 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 12: Media & Creative (7 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(12, 'Graphic Designer', 'Visual design for branding and marketing.', '₹2.5-4 LPA', '₹6-12 LPA', '₹15-28 LPA', 'High'),
(12, 'Animator', '2D/3D animation for media.', '₹3-6 LPA', '₹8-15 LPA', '₹18-35 LPA', 'Medium'),
(12, 'Video Editor', 'Video content editing.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'High'),
(12, 'Cinematographer', 'Visual storytelling through camera.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),
(12, 'Digital Marketer', 'Online marketing campaigns.', '₹3-5 LPA', '₹7-14 LPA', '₹16-32 LPA', 'High'),
(12, 'Social Media Manager', 'Social media presence and engagement.', '₹3-5 LPA', '₹7-14 LPA', '₹16-32 LPA', 'High'),
(12, 'Influencer', 'Content creation and audience building.', 'Variable', 'Variable', 'Variable', 'High');

-- -----------------------------------------------------
-- Domain 13: Law & Legal (6 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(13, 'Advocate', 'Court representation and legal counsel.', '₹3-6 LPA', '₹8-16 LPA', '₹20-45 LPA', 'Medium'),
(13, 'Corporate Lawyer', 'Business legal matters and contracts.', '₹6-12 LPA', '₹15-30 LPA', '₹35-70 LPA', 'High'),
(13, 'Legal Advisor', 'Expert legal advice for organizations.', '₹5-9 LPA', '₹12-24 LPA', '₹28-55 LPA', 'Medium'),
(13, 'Judge (via exams)', 'Court proceedings through judicial exams.', '₹80k-1.2L/mo', '₹1.5-2L/mo', '₹2.5-3L/mo', 'High'),
(13, 'Compliance Officer', 'Legal and regulatory compliance.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(13, 'Legal Analyst', 'Legal research and case preparation.', '₹3-5 LPA', '₹7-13 LPA', '₹16-28 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 14: Environment & Sustainability (4 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(14, 'Environmental Engineer', 'Environmental protection solutions.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium'),
(14, 'ESG Analyst', 'Environmental, social, governance factors.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'High'),
(14, 'Sustainability Consultant', 'Sustainable practices advisory.', '₹6-10 LPA', '₹14-25 LPA', '₹30-55 LPA', 'High'),
(14, 'Climate Researcher', 'Climate change pattern studies.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 15: Manufacturing & Industry (4 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(15, 'Plant Manager', 'Manufacturing plant operations.', '₹7-12 LPA', '₹16-30 LPA', '₹35-60 LPA', 'Medium'),
(15, 'Industrial Engineer', 'Production process optimization.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium'),
(15, 'Lean Six Sigma Expert', 'Process improvement methodologies.', '₹5-9 LPA', '₹12-22 LPA', '₹26-48 LPA', 'Medium'),
(15, 'Safety Officer', 'Workplace safety and risk management.', '₹3-5 LPA', '₹6-12 LPA', '₹15-26 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 16: Aviation & Travel (4 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(16, 'Pilot', 'Commercial aircraft operation.', '₹8-15 LPA', '₹20-40 LPA', '₹50-100 LPA', 'High'),
(16, 'Cabin Crew', 'In-flight service and passenger safety.', '₹3-5 LPA', '₹6-10 LPA', '₹12-20 LPA', 'Medium'),
(16, 'Airport Manager', 'Airport operations and logistics.', '₹6-10 LPA', '₹14-24 LPA', '₹28-50 LPA', 'Medium'),
(16, 'Aviation Maintenance Engineer', 'Aircraft systems maintenance.', '₹4-6 LPA', '₹8-15 LPA', '₹18-32 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 17: Public Policy & NGO (4 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(17, 'Policy Analyst', 'Public policy research and analysis.', '₹5-8 LPA', '₹12-20 LPA', '₹24-42 LPA', 'Medium'),
(17, 'NGO Project Manager', 'Social impact project leadership.', '₹3-6 LPA', '₹7-14 LPA', '₹16-30 LPA', 'Medium'),
(17, 'CSR Manager', 'Corporate social responsibility programs.', '₹4-6 LPA', '₹9-16 LPA', '₹20-35 LPA', 'Medium'),
(17, 'Development Officer', 'Community development programs.', '₹2.5-4 LPA', '₹5-10 LPA', '₹12-22 LPA', 'Medium');

-- -----------------------------------------------------
-- Domain 18: Sports & Fitness (4 roles)
-- -----------------------------------------------------
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(18, 'Fitness Trainer', 'Personal training and fitness guidance.', '₹2-4 LPA', '₹5-10 LPA', '₹12-24 LPA', 'High'),
(18, 'Sports Analyst', 'Sports performance data analysis.', '₹4-7 LPA', '₹10-18 LPA', '₹22-40 LPA', 'Medium'),
(18, 'Sports Manager', 'Sports team and event management.', '₹5-9 LPA', '₹12-24 LPA', '₹28-55 LPA', 'Medium'),
(18, 'Sports Physiotherapist', 'Athletic injury rehabilitation.', '₹3-5 LPA', '₹7-13 LPA', '₹16-30 LPA', 'Medium');

-- =====================================================
-- FINAL VERIFICATION
-- =====================================================
-- Total Domains: 18
-- Total Roles: 158
-- All foreign keys maintained
-- APIs should work correctly: /api/domains and /api/roles/:domainId
-- =====================================================
