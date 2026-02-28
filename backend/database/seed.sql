-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate tables
TRUNCATE TABLE user_progress;
TRUNCATE TABLE roadmap_tasks;
TRUNCATE TABLE roadmap_phases;
TRUNCATE TABLE roles;
TRUNCATE TABLE domains;
TRUNCATE TABLE users;

-- Domains
INSERT INTO domains (id, name, description, icon) VALUES
(1, 'IT & Software', 'Software development, data science, and IT operations.', 'code'),
(2, 'Government Jobs', 'Public sector careers including UPSC, SSC, and Banking.', 'building'),
(3, 'Commerce & Finance', 'Accounting, finance, investment, and banking.', 'chart-line'),
(4, 'Core Engineering', 'Mechanical, Electrical, Civil, and other engineering disciplines.', 'cogs'),
(5, 'Arts & Science', 'Liberal arts, pure sciences, and humanities.', 'palette'),
(6, 'Management & MBA', 'Business administration, HR, marketing, and operations.', 'briefcase'),
(7, 'Emerging Technologies', 'AI, Blockchain, IoT, and Robotics.', 'robot');

-- Roles (IT & Software)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(1, 'Full Stack Developer', 'Build web applications using frontend and backend technologies.', '₹5-8 LPA', '₹12-20 LPA', '₹30+ LPA', 'High'),
(1, 'Data Scientist', 'Analyze complex data to help make better business decisions.', '₹6-10 LPA', '₹15-25 LPA', '₹35+ LPA', 'High'),
(1, 'DevOps Engineer', 'Streamline development and deployment processes.', '₹5-9 LPA', '₹14-22 LPA', '₹30+ LPA', 'High'),
(1, 'Cybersecurity Analyst', 'Protect computer systems and networks from threats.', '₹5-8 LPA', '₹12-20 LPA', '₹28+ LPA', 'High'),
(1, 'Mobile App Developer', 'Create applications for mobile devices (iOS/Android).', '₹4-7 LPA', '₹10-18 LPA', '₹25+ LPA', 'High');

-- Roles (Government Jobs)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(2, 'IAS Officer', 'Administrative roles in the Indian government.', '₹56k/mo', '₹1L+/mo', '₹2.5L/mo', 'High'),
(2, 'Bank PO', 'Probationary Officer in public sector banks.', '₹40-50k/mo', '₹60-80k/mo', '₹1L+/mo', 'High'),
(2, 'SSC CGL Officer', 'Staff Selection Commission roles in central govt.', '₹40-70k/mo', '₹70-90k/mo', '₹1L+/mo', 'Medium'),
(2, 'Railway Engineer (IES)', 'Engineering services in Indian Railways.', '₹56k/mo', '₹1L+/mo', '₹2L+/mo', 'Medium'),
(2, 'PSU Engineer', 'Engineering roles in Public Sector Undertakings.', '₹6-12 LPA', '₹15-20 LPA', '₹25+ LPA', 'High');

-- Roles (Commerce & Finance)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(3, 'Chartered Accountant', 'Audit and financial management.', '₹7-10 LPA', '₹15-25 LPA', '₹35+ LPA', 'High'),
(3, 'Investment Banker', 'Raise capital and financial advisory.', '₹10-15 LPA', '₹25-40 LPA', '₹50+ LPA', 'High'),
(3, 'Financial Analyst', 'Analyze financial data and trends.', '₹4-7 LPA', '₹10-18 LPA', '₹25+ LPA', 'Medium'),
(3, 'Risk Manager', 'Identify and mitigate financial risks.', '₹5-8 LPA', '₹12-20 LPA', '₹30+ LPA', 'Medium'),
(3, 'Tax Consultant', 'Advise on tax planning and compliance.', '₹4-6 LPA', '₹8-15 LPA', '₹20+ LPA', 'Medium');

-- Roles (Core Engineering)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(4, 'Mechanical Design Engineer', 'Design mechanical systems and products.', '₹3-5 LPA', '₹8-12 LPA', '₹18+ LPA', 'Medium'),
(4, 'VLSI Engineer', 'Design integrated circuits and semiconductors.', '₹6-12 LPA', '₹15-25 LPA', '₹35+ LPA', 'High'),
(4, 'Civil Site Engineer', 'Oversee construction projects.', '₹3-5 LPA', '₹6-10 LPA', '₹15+ LPA', 'Medium'),
(4, 'Automotive Engineer', 'Design and test vehicles.', '₹4-6 LPA', '₹8-15 LPA', '₹20+ LPA', 'Medium'),
(4, 'Robotics Engineer', 'Design and build robots.', '₹5-9 LPA', '₹12-20 LPA', '₹30+ LPA', 'High');

-- Roles (Arts & Science)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(5, 'Psychologist', 'Study human behavior and mental processes.', '₹3-5 LPA', '₹6-10 LPA', '₹15+ LPA', 'Medium'),
(5, 'Content Writer', 'Create engaging content for various media.', '₹3-5 LPA', '₹6-10 LPA', '₹15+ LPA', 'Medium'),
(5, 'Graphic Designer', 'Create visual concepts and designs.', '₹3-5 LPA', '₹6-10 LPA', '₹15+ LPA', 'Medium'),
(5, 'Professor/Lecturer', 'Teach and conduct research in academia.', '₹4-7 LPA', '₹8-15 LPA', '₹20+ LPA', 'Medium'),
(5, 'Biotechnologist', 'Apply biological processes to products.', '₹3-6 LPA', '₹8-12 LPA', '₹18+ LPA', 'High');

-- Roles (Management & MBA)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(6, 'Product Manager', 'Oversee product development and strategy.', '₹10-15 LPA', '₹20-35 LPA', '₹50+ LPA', 'High'),
(6, 'HR Manager', 'Manage recruitment and employee relations.', '₹4-6 LPA', '₹8-15 LPA', '₹20+ LPA', 'Medium'),
(6, 'Digital Marketing Manager', 'Plan and execute digital marketing campaigns.', '₹4-7 LPA', '₹10-18 LPA', '₹25+ LPA', 'High'),
(6, 'Operations Manager', 'Oversee daily business operations.', '₹5-8 LPA', '₹12-20 LPA', '₹30+ LPA', 'Medium'),
(6, 'Business Analyst', 'Analyze business processes and requirements.', '₹5-8 LPA', '₹12-20 LPA', '₹25+ LPA', 'High');

-- Roles (Emerging Technologies)
INSERT INTO roles (domain_id, title, description, salary_fresher, salary_mid, salary_senior, demand_indicator) VALUES
(7, 'AI/ML Engineer', 'Build and deploy machine learning models.', '₹8-12 LPA', '₹20-30 LPA', '₹50+ LPA', 'High'),
(7, 'Blockchain Developer', 'Develop decentralized applications.', '₹6-10 LPA', '₹15-25 LPA', '₹40+ LPA', 'High'),
(7, 'IoT Solutions Architect', 'Design Internet of Things systems.', '₹6-10 LPA', '₹15-25 LPA', '₹35+ LPA', 'High'),
(7, 'AR/VR Developer', 'Create augmented and virtual reality experiences.', '₹5-9 LPA', '₹12-20 LPA', '₹30+ LPA', 'High'),
(7, 'Quantum Computing Researcher', 'Research quantum algorithms and systems.', '₹10-15 LPA', '₹25-40 LPA', '₹60+ LPA', 'High');

-- Roadmap Phases (Sample for Full Stack Developer)
INSERT INTO roadmap_phases (role_id, phase_order, title, description) VALUES
(1, 1, 'Frontend Basics', 'HTML, CSS, JavaScript fundamentals.'),
(1, 2, 'Frontend Frameworks', 'React, state management, and routing.'),
(1, 3, 'Backend Development', 'Node.js, Express, and Databases.'),
(1, 4, 'Full Stack Integration', 'Connecting frontend and backend, Auth, Deployment.');

-- Roadmap Tasks (Sample for Full Stack Developer - Phase 1)
INSERT INTO roadmap_tasks (phase_id, title, description, resource_link, is_project) VALUES
(1, 'Learn HTML5', 'Semantic tags, forms, and structure.', 'https://developer.mozilla.org/en-US/docs/Web/HTML', 0),
(1, 'Learn CSS3', 'Flexbox, Grid, and Responsive Design.', 'https://web.dev/learn/css/', 0),
(1, 'JavaScript Basics', 'ES6+, DOM manipulation, fetch API.', 'https://javascript.info/', 0),
(1, 'Build a Portfolio Site', 'Create a personal portfolio using HTML/CSS/JS.', NULL, 1);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
