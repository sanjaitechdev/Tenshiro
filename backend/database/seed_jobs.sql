-- Sample Jobs and Internships Data
-- Note: role_id values should match existing roles in your database

-- Frontend Developer Jobs
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(1, 'Frontend Developer Intern', 'Google', 'internship', 'Bangalore, India', '₹40,000 - ₹60,000/month', 'Google Careers', 'https://careers.google.com', '2026-02-01', '2026-03-15', 'Work on cutting-edge web applications using React and modern frameworks.', 'Strong knowledge of HTML, CSS, JavaScript, React'),
(1, 'Junior Frontend Developer', 'Microsoft', 'job', 'Hyderabad, India', '₹8-12 LPA', 'Microsoft Careers', 'https://careers.microsoft.com', '2026-02-05', '2026-03-20', 'Build responsive and accessible web interfaces for enterprise applications.', 'Experience with React, TypeScript, and modern CSS frameworks'),
(1, 'React Developer', 'Amazon', 'job', 'Bangalore, India', '₹10-15 LPA', 'Amazon Jobs', 'https://amazon.jobs', '2026-02-10', '2026-03-25', 'Develop scalable frontend solutions for e-commerce platform.', '2+ years React experience, Redux, REST APIs'),
(1, 'UI Developer Intern', 'Flipkart', 'internship', 'Bangalore, India', '₹35,000 - ₹50,000/month', 'Flipkart Careers', 'https://flipkart.com/careers', '2026-02-12', '2026-03-30', 'Create beautiful and performant user interfaces.', 'HTML, CSS, JavaScript, basic React knowledge');

-- Backend Developer Jobs
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(2, 'Backend Developer Intern', 'Zomato', 'internship', 'Gurugram, India', '₹45,000 - ₹65,000/month', 'Zomato Careers', 'https://zomato.com/careers', '2026-02-03', '2026-03-18', 'Build scalable backend services for food delivery platform.', 'Node.js, Express, MongoDB/MySQL'),
(2, 'Java Backend Developer', 'Infosys', 'job', 'Pune, India', '₹6-9 LPA', 'Infosys Careers', 'https://infosys.com/careers', '2026-02-07', '2026-03-22', 'Develop enterprise-grade backend systems.', 'Java, Spring Boot, Microservices, SQL'),
(2, 'Node.js Developer', 'Swiggy', 'job', 'Bangalore, India', '₹9-14 LPA', 'Swiggy Careers', 'https://swiggy.com/careers', '2026-02-08', '2026-03-28', 'Build high-performance APIs and backend services.', 'Node.js, Express, PostgreSQL, Redis'),
(2, 'Python Backend Engineer', 'Razorpay', 'job', 'Bangalore, India', '₹12-18 LPA', 'Razorpay Careers', 'https://razorpay.com/jobs', '2026-02-14', '2026-04-01', 'Develop payment processing systems and APIs.', 'Python, Django/Flask, PostgreSQL, AWS');

-- Full Stack Developer Jobs
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(3, 'Full Stack Intern', 'Paytm', 'internship', 'Noida, India', '₹50,000 - ₹70,000/month', 'Paytm Careers', 'https://paytm.com/careers', '2026-02-06', '2026-03-21', 'Work on end-to-end features for fintech platform.', 'React, Node.js, MongoDB, REST APIs'),
(3, 'MERN Stack Developer', 'Myntra', 'job', 'Bangalore, India', '₹10-16 LPA', 'Myntra Careers', 'https://myntra.com/careers', '2026-02-09', '2026-03-26', 'Build full-stack e-commerce features.', 'MongoDB, Express, React, Node.js, 2+ years experience'),
(3, 'Full Stack Engineer', 'Ola', 'job', 'Bangalore, India', '₹11-17 LPA', 'Ola Careers', 'https://ola.com/careers', '2026-02-11', '2026-03-29', 'Develop ride-sharing platform features.', 'React, Node.js, PostgreSQL, AWS, Docker');

-- Data Scientist Jobs
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(4, 'Data Science Intern', 'Walmart Labs', 'internship', 'Bangalore, India', '₹55,000 - ₹75,000/month', 'Walmart Careers', 'https://careers.walmart.com', '2026-02-04', '2026-03-19', 'Apply ML models to retail analytics.', 'Python, Pandas, Scikit-learn, Statistics'),
(4, 'Junior Data Scientist', 'PhonePe', 'job', 'Bangalore, India', '₹12-18 LPA', 'PhonePe Careers', 'https://phonepe.com/careers', '2026-02-13', '2026-03-31', 'Build predictive models for fintech products.', 'Python, ML, SQL, TensorFlow/PyTorch'),
(4, 'ML Engineer', 'CRED', 'job', 'Bangalore, India', '₹15-25 LPA', 'CRED Careers', 'https://cred.club/careers', '2026-02-15', '2026-04-05', 'Develop ML-powered credit scoring systems.', 'Python, Deep Learning, NLP, AWS/GCP');

-- DevOps Engineer Jobs
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(5, 'DevOps Intern', 'Freshworks', 'internship', 'Chennai, India', '₹40,000 - ₹60,000/month', 'Freshworks Careers', 'https://freshworks.com/careers', '2026-02-02', '2026-03-17', 'Automate deployment pipelines and infrastructure.', 'Linux, Docker, Jenkins, Basic AWS'),
(5, 'DevOps Engineer', 'Atlassian', 'job', 'Bangalore, India', '₹10-16 LPA', 'Atlassian Careers', 'https://atlassian.com/careers', '2026-02-16', '2026-04-02', 'Manage cloud infrastructure and CI/CD pipelines.', 'Kubernetes, Docker, AWS/Azure, Terraform');
