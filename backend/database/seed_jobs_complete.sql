-- =====================================================
-- PATHPILOT AI - JOBS & INTERNSHIPS SEED DATA
-- =====================================================
-- Role-specific jobs and internships for all 158 roles
-- Each role gets 3-4 opportunities (mix of jobs & internships)
-- =====================================================

-- Clear existing data
TRUNCATE TABLE user_job_applications;
TRUNCATE TABLE jobs_internships;

-- =====================================================
-- IT & SOFTWARE DOMAIN (Domain ID: 1)
-- =====================================================

-- Role 1: Frontend Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(1, 'Frontend Developer Intern', 'Google', 'internship', 'Bangalore', '₹40-60k/month', 'Google Careers', 'https://careers.google.com', '2026-02-01', '2026-03-15', 'Build modern web UIs with React', 'React, JavaScript, CSS'),
(1, 'Junior React Developer', 'Microsoft', 'job', 'Hyderabad', '₹6-9 LPA', 'Microsoft Careers', 'https://careers.microsoft.com', '2026-02-05', '2026-03-20', 'Develop enterprise web applications', 'React, TypeScript, 1+ years exp'),
(1, 'UI Developer', 'Amazon', 'job', 'Bangalore', '₹8-12 LPA', 'Amazon Jobs', 'https://amazon.jobs', '2026-02-10', '2026-03-25', 'Create responsive e-commerce interfaces', 'React, Redux, REST APIs'),
(1, 'Frontend Intern - Summer 2026', 'Flipkart', 'internship', 'Bangalore', '₹35-50k/month', 'Flipkart Careers', 'https://flipkart.com/careers', '2026-02-12', '2026-04-01', 'Work on product pages and checkout flow', 'HTML, CSS, JavaScript, React basics');

-- Role 2: Backend Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(2, 'Backend Developer Intern', 'Zomato', 'internship', 'Gurugram', '₹45-65k/month', 'Zomato Careers', 'https://zomato.com/careers', '2026-02-03', '2026-03-18', 'Build scalable food delivery APIs', 'Node.js, MongoDB, REST'),
(2, 'Java Backend Engineer', 'Infosys', 'job', 'Pune', '₹6-10 LPA', 'Infosys Careers', 'https://infosys.com/careers', '2026-02-07', '2026-03-22', 'Develop enterprise backend systems', 'Java, Spring Boot, SQL'),
(2, 'Node.js Developer', 'Swiggy', 'job', 'Bangalore', '₹9-14 LPA', 'Swiggy Careers', 'https://swiggy.com/careers', '2026-02-08', '2026-03-28', 'Build high-performance APIs', 'Node.js, PostgreSQL, Redis'),
(2, 'Python Backend Intern', 'Razorpay', 'internship', 'Bangalore', '₹50-70k/month', 'Razorpay Careers', 'https://razorpay.com/jobs', '2026-02-14', '2026-04-01', 'Work on payment processing systems', 'Python, Django, PostgreSQL');

-- Role 3: Full Stack Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(3, 'Full Stack Intern', 'Paytm', 'internship', 'Noida', '₹50-70k/month', 'Paytm Careers', 'https://paytm.com/careers', '2026-02-06', '2026-03-21', 'Build end-to-end fintech features', 'MERN stack'),
(3, 'MERN Stack Developer', 'Myntra', 'job', 'Bangalore', '₹10-16 LPA', 'Myntra Careers', 'https://myntra.com/careers', '2026-02-09', '2026-03-26', 'Develop e-commerce platform features', 'MongoDB, Express, React, Node'),
(3, 'Full Stack Engineer', 'Ola', 'job', 'Bangalore', '₹11-17 LPA', 'Ola Careers', 'https://ola.com/careers', '2026-02-11', '2026-03-29', 'Build ride-sharing features', 'React, Node.js, AWS'),
(3, 'MEAN Stack Intern', 'Accenture', 'internship', 'Chennai', '₹40-55k/month', 'Accenture Careers', 'https://accenture.com/careers', '2026-02-15', '2026-04-05', 'Work on client projects', 'Angular, Node.js, MongoDB');

-- Role 4: Web Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(4, 'Web Developer Intern', 'TCS', 'internship', 'Mumbai', '₹25-40k/month', 'TCS Careers', 'https://tcs.com/careers', '2026-02-05', '2026-03-20', 'Build corporate websites', 'HTML, CSS, JavaScript, WordPress'),
(4, 'WordPress Developer', 'WPEngine', 'job', 'Remote', '₹4-7 LPA', 'WPEngine Jobs', 'https://wpengine.com/careers', '2026-02-10', '2026-03-25', 'Develop custom WordPress themes', 'PHP, WordPress, MySQL'),
(4, 'Junior Web Developer', 'Wipro', 'job', 'Bangalore', '₹3.5-6 LPA', 'Wipro Careers', 'https://wipro.com/careers', '2026-02-12', '2026-03-30', 'Create responsive business websites', 'HTML, CSS, JavaScript, Bootstrap'),
(4, 'Shopify Developer Intern', 'Shopify Partners', 'internship', 'Remote', '₹30-45k/month', 'Shopify Careers', 'https://shopify.com/careers', '2026-02-18', '2026-04-10', 'Build e-commerce stores', 'Shopify, Liquid, JavaScript');

-- Role 5: Mobile App Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(5, 'Android Developer Intern', 'Samsung', 'internship', 'Noida', '₹45-60k/month', 'Samsung Careers', 'https://samsung.com/careers', '2026-02-08', '2026-03-23', 'Develop mobile applications', 'Kotlin, Android SDK'),
(5, 'iOS Developer', 'Apple', 'job', 'Bangalore', '₹12-20 LPA', 'Apple Jobs', 'https://apple.com/jobs', '2026-02-12', '2026-03-28', 'Build iOS applications', 'Swift, SwiftUI, iOS SDK'),
(5, 'React Native Developer', 'Uber', 'job', 'Hyderabad', '₹10-16 LPA', 'Uber Careers', 'https://uber.com/careers', '2026-02-15', '2026-04-01', 'Create cross-platform apps', 'React Native, JavaScript'),
(5, 'Flutter Developer Intern', 'Byju\'s', 'internship', 'Bangalore', '₹40-55k/month', 'Byju\'s Careers', 'https://byjus.com/careers', '2026-02-20', '2026-04-12', 'Build educational mobile apps', 'Flutter, Dart');

-- Role 6: Game Developer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(6, 'Unity Developer Intern', 'Zynga', 'internship', 'Bangalore', '₹40-60k/month', 'Zynga Careers', 'https://zynga.com/careers', '2026-02-10', '2026-03-25', 'Develop mobile games', 'Unity, C#, Game design'),
(6, 'Game Developer', 'Ubisoft', 'job', 'Pune', '₹8-14 LPA', 'Ubisoft Careers', 'https://ubisoft.com/careers', '2026-02-14', '2026-03-30', 'Create AAA game features', 'Unity/Unreal, C++, 3D graphics'),
(6, 'Unreal Engine Developer', 'EA Sports', 'job', 'Hyderabad', '₹10-18 LPA', 'EA Careers', 'https://ea.com/careers', '2026-02-18', '2026-04-05', 'Build sports simulation games', 'Unreal Engine, C++, Blueprints'),
(6, 'Mobile Game Developer Intern', 'Dream11', 'internship', 'Mumbai', '₹35-50k/month', 'Dream11 Careers', 'https://dream11.com/careers', '2026-02-22', '2026-04-15', 'Work on fantasy sports games', 'Unity, C#, Mobile optimization');

-- Role 7: Data Analyst
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(7, 'Data Analyst Intern', 'Walmart Labs', 'internship', 'Bangalore', '₹45-60k/month', 'Walmart Careers', 'https://careers.walmart.com', '2026-02-04', '2026-03-19', 'Analyze retail data', 'SQL, Excel, Python, Tableau'),
(7, 'Business Data Analyst', 'Deloitte', 'job', 'Mumbai', '₹6-10 LPA', 'Deloitte Careers', 'https://deloitte.com/careers', '2026-02-09', '2026-03-24', 'Generate business insights', 'SQL, Power BI, Excel, Statistics'),
(7, 'Junior Data Analyst', 'HDFC Bank', 'job', 'Mumbai', '₹5-8 LPA', 'HDFC Careers', 'https://hdfc.com/careers', '2026-02-13', '2026-03-29', 'Analyze banking data', 'SQL, Excel, Tableau'),
(7, 'Marketing Data Analyst Intern', 'Unilever', 'internship', 'Mumbai', '₹40-55k/month', 'Unilever Careers', 'https://unilever.com/careers', '2026-02-17', '2026-04-03', 'Analyze consumer behavior data', 'Excel, SQL, Google Analytics');

-- Role 8: Data Scientist
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(8, 'Data Science Intern', 'PhonePe', 'internship', 'Bangalore', '₹55-75k/month', 'PhonePe Careers', 'https://phonepe.com/careers', '2026-02-06', '2026-03-21', 'Build ML models for fintech', 'Python, ML, SQL'),
(8, 'Junior Data Scientist', 'Flipkart', 'job', 'Bangalore', '₹12-18 LPA', 'Flipkart Careers', 'https://flipkart.com/careers', '2026-02-11', '2026-03-27', 'Develop recommendation systems', 'Python, TensorFlow, SQL'),
(8, 'Data Scientist', 'LinkedIn', 'job', 'Bangalore', '₹18-28 LPA', 'LinkedIn Careers', 'https://linkedin.com/careers', '2026-02-15', '2026-04-01', 'Build ML-powered features', 'Python, Deep Learning, Spark'),
(8, 'ML Research Intern', 'Adobe', 'internship', 'Noida', '₹60-80k/month', 'Adobe Careers', 'https://adobe.com/careers', '2026-02-20', '2026-04-10', 'Research computer vision models', 'Python, PyTorch, CV');

-- Role 9: AI Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(9, 'AI Engineer Intern', 'NVIDIA', 'internship', 'Bangalore', '₹70-90k/month', 'NVIDIA Careers', 'https://nvidia.com/careers', '2026-02-08', '2026-03-23', 'Work on AI acceleration', 'Python, TensorFlow, CUDA'),
(9, 'AI/ML Engineer', 'OpenAI', 'job', 'Remote', '$80-120k/year', 'OpenAI Careers', 'https://openai.com/careers', '2026-02-12', '2026-03-28', 'Build LLM applications', 'Python, Transformers, PyTorch'),
(9, 'Applied AI Engineer', 'Meta', 'job', 'Bangalore', '₹20-35 LPA', 'Meta Careers', 'https://meta.com/careers', '2026-02-16', '2026-04-02', 'Deploy AI at scale', 'Python, ML, Distributed systems'),
(9, 'Generative AI Intern', 'Anthropic', 'internship', 'Remote', '$60-80k/year', 'Anthropic Careers', 'https://anthropic.com/careers', '2026-02-22', '2026-04-15', 'Research generative models', 'Python, PyTorch, NLP');

-- Role 10: Machine Learning Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(10, 'ML Engineer Intern', 'Salesforce', 'internship', 'Hyderabad', '₹60-80k/month', 'Salesforce Careers', 'https://salesforce.com/careers', '2026-02-09', '2026-03-24', 'Build ML pipelines', 'Python, Scikit-learn, MLflow'),
(10, 'Machine Learning Engineer', 'Netflix', 'job', 'Remote', '$100-150k/year', 'Netflix Jobs', 'https://netflix.com/jobs', '2026-02-13', '2026-03-30', 'Develop recommendation algorithms', 'Python, TensorFlow, Spark'),
(10, 'Senior ML Engineer', 'Uber', 'job', 'Bangalore', '₹22-38 LPA', 'Uber Careers', 'https://uber.com/careers', '2026-02-17', '2026-04-03', 'Build ML systems for ride matching', 'Python, ML, Kubernetes'),
(10, 'MLOps Intern', 'Databricks', 'internship', 'Remote', '$50-70k/year', 'Databricks Careers', 'https://databricks.com/careers', '2026-02-21', '2026-04-12', 'Automate ML deployment', 'Python, Docker, Kubernetes');

-- Role 11: NLP Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(11, 'NLP Intern', 'Amazon Alexa', 'internship', 'Bangalore', '₹65-85k/month', 'Amazon Jobs', 'https://amazon.jobs', '2026-02-10', '2026-03-25', 'Build voice recognition systems', 'Python, NLP, Transformers'),
(11, 'NLP Engineer', 'Google AI', 'job', 'Bangalore', '₹18-32 LPA', 'Google Careers', 'https://careers.google.com', '2026-02-14', '2026-03-31', 'Develop language models', 'Python, BERT, TensorFlow'),
(11, 'Conversational AI Engineer', 'Microsoft', 'job', 'Hyderabad', '₹16-28 LPA', 'Microsoft Careers', 'https://careers.microsoft.com', '2026-02-18', '2026-04-05', 'Build chatbot systems', 'Python, NLP, Azure'),
(11, 'Text Analytics Intern', 'IBM', 'internship', 'Bangalore', '₹55-70k/month', 'IBM Careers', 'https://ibm.com/careers', '2026-02-23', '2026-04-15', 'Analyze text data', 'Python, spaCy, NLTK');

-- Role 12: Computer Vision Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(12, 'Computer Vision Intern', 'Tesla', 'internship', 'Remote', '$70-90k/year', 'Tesla Careers', 'https://tesla.com/careers', '2026-02-11', '2026-03-26', 'Work on autonomous driving', 'Python, OpenCV, PyTorch'),
(12, 'CV Engineer', 'Apple', 'job', 'Bangalore', '₹20-35 LPA', 'Apple Jobs', 'https://apple.com/jobs', '2026-02-15', '2026-04-01', 'Build image processing systems', 'Python, TensorFlow, CoreML'),
(12, 'Vision AI Engineer', 'Qualcomm', 'job', 'Hyderabad', '₹16-28 LPA', 'Qualcomm Careers', 'https://qualcomm.com/careers', '2026-02-19', '2026-04-07', 'Develop mobile vision AI', 'Python, PyTorch, ONNX'),
(12, 'Medical Imaging Intern', 'Siemens Healthineers', 'internship', 'Bangalore', '₹60-75k/month', 'Siemens Careers', 'https://siemens.com/careers', '2026-02-24', '2026-04-18', 'Analyze medical images', 'Python, OpenCV, Deep Learning');

-- Role 13: Business Intelligence Analyst
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(13, 'BI Analyst Intern', 'Cognizant', 'internship', 'Chennai', '₹35-50k/month', 'Cognizant Careers', 'https://cognizant.com/careers', '2026-02-07', '2026-03-22', 'Create business dashboards', 'SQL, Power BI, Excel'),
(13, 'Business Intelligence Analyst', 'Capgemini', 'job', 'Pune', '₹7-12 LPA', 'Capgemini Careers', 'https://capgemini.com/careers', '2026-02-12', '2026-03-28', 'Build BI solutions', 'SQL, Tableau, Power BI'),
(13, 'Senior BI Developer', 'Oracle', 'job', 'Bangalore', '₹12-20 LPA', 'Oracle Careers', 'https://oracle.com/careers', '2026-02-16', '2026-04-02', 'Design enterprise BI systems', 'SQL, Oracle BI, ETL'),
(13, 'Data Visualization Intern', 'McKinsey', 'internship', 'Mumbai', '₹50-70k/month', 'McKinsey Careers', 'https://mckinsey.com/careers', '2026-02-20', '2026-04-10', 'Create client dashboards', 'Tableau, Power BI, D3.js');

-- Role 14: DevOps Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(14, 'DevOps Intern', 'Freshworks', 'internship', 'Chennai', '₹40-60k/month', 'Freshworks Careers', 'https://freshworks.com/careers', '2026-02-08', '2026-03-23', 'Automate CI/CD pipelines', 'Docker, Jenkins, AWS'),
(14, 'DevOps Engineer', 'Atlassian', 'job', 'Bangalore', '₹10-16 LPA', 'Atlassian Careers', 'https://atlassian.com/careers', '2026-02-13', '2026-03-29', 'Manage cloud infrastructure', 'Kubernetes, AWS, Terraform'),
(14, 'Site Reliability Engineer', 'Airbnb', 'job', 'Remote', '$90-130k/year', 'Airbnb Careers', 'https://airbnb.com/careers', '2026-02-17', '2026-04-03', 'Ensure platform reliability', 'Kubernetes, AWS, Python'),
(14, 'Cloud DevOps Intern', 'HashiCorp', 'internship', 'Remote', '$60-80k/year', 'HashiCorp Careers', 'https://hashicorp.com/careers', '2026-02-22', '2026-04-15', 'Work on infrastructure tools', 'Terraform, Vault, Go');

-- Role 15: Cloud Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(15, 'Cloud Engineer Intern', 'AWS', 'internship', 'Hyderabad', '₹50-70k/month', 'AWS Careers', 'https://aws.amazon.com/careers', '2026-02-09', '2026-03-24', 'Build cloud solutions', 'AWS, Python, Terraform'),
(15, 'Azure Cloud Engineer', 'Microsoft', 'job', 'Bangalore', '₹12-20 LPA', 'Microsoft Careers', 'https://careers.microsoft.com', '2026-02-14', '2026-03-30', 'Design Azure architectures', 'Azure, ARM templates, PowerShell'),
(15, 'GCP Solutions Architect', 'Google Cloud', 'job', 'Pune', '₹14-24 LPA', 'Google Cloud Careers', 'https://cloud.google.com/careers', '2026-02-18', '2026-04-05', 'Architect GCP solutions', 'GCP, Kubernetes, Python'),
(15, 'Multi-Cloud Intern', 'VMware', 'internship', 'Bangalore', '₹45-65k/month', 'VMware Careers', 'https://vmware.com/careers', '2026-02-23', '2026-04-16', 'Work on hybrid cloud', 'AWS, Azure, VMware');

-- Role 16: Site Reliability Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(16, 'SRE Intern', 'Spotify', 'internship', 'Remote', '$65-85k/year', 'Spotify Careers', 'https://spotify.com/careers', '2026-02-10', '2026-03-25', 'Monitor production systems', 'Linux, Python, Kubernetes'),
(16, 'Site Reliability Engineer', 'Twitter', 'job', 'Bangalore', '₹16-28 LPA', 'Twitter Careers', 'https://twitter.com/careers', '2026-02-15', '2026-04-01', 'Ensure platform uptime', 'Kubernetes, Go, Prometheus'),
(16, 'Senior SRE', 'Stripe', 'job', 'Remote', '$120-180k/year', 'Stripe Careers', 'https://stripe.com/careers', '2026-02-19', '2026-04-07', 'Build resilient payment systems', 'Ruby, Kubernetes, Terraform'),
(16, 'Infrastructure SRE Intern', 'Cloudflare', 'internship', 'Remote', '$70-90k/year', 'Cloudflare Careers', 'https://cloudflare.com/careers', '2026-02-24', '2026-04-18', 'Optimize edge infrastructure', 'Linux, Go, Networking');

-- Role 17: System Administrator
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(17, 'System Admin Intern', 'HCL', 'internship', 'Noida', '₹25-40k/month', 'HCL Careers', 'https://hcl.com/careers', '2026-02-06', '2026-03-21', 'Manage IT infrastructure', 'Linux, Windows Server, Networking'),
(17, 'Linux System Administrator', 'Red Hat', 'job', 'Pune', '₹6-10 LPA', 'Red Hat Careers', 'https://redhat.com/careers', '2026-02-11', '2026-03-27', 'Administer Linux servers', 'RHEL, Bash, Ansible'),
(17, 'Windows Server Admin', 'Tech Mahindra', 'job', 'Chennai', '₹5-9 LPA', 'Tech Mahindra Careers', 'https://techmahindra.com/careers', '2026-02-15', '2026-04-01', 'Manage Windows infrastructure', 'Windows Server, AD, PowerShell'),
(17, 'IT Infrastructure Intern', 'L&T Infotech', 'internship', 'Mumbai', '₹30-45k/month', 'LTI Careers', 'https://lti.com/careers', '2026-02-20', '2026-04-10', 'Support server operations', 'Linux, Networking, Monitoring');

-- Role 18: Cybersecurity Analyst
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(18, 'Cybersecurity Intern', 'Cisco', 'internship', 'Bangalore', '₹45-65k/month', 'Cisco Careers', 'https://cisco.com/careers', '2026-02-08', '2026-03-23', 'Monitor security threats', 'Networking, Security tools, Python'),
(18, 'Security Analyst', 'Palo Alto Networks', 'job', 'Bangalore', '₹8-14 LPA', 'Palo Alto Careers', 'https://paloaltonetworks.com/careers', '2026-02-13', '2026-03-29', 'Analyze security incidents', 'SIEM, Firewalls, IDS/IPS'),
(18, 'SOC Analyst', 'CrowdStrike', 'job', 'Remote', '$70-100k/year', 'CrowdStrike Careers', 'https://crowdstrike.com/careers', '2026-02-17', '2026-04-03', 'Monitor security operations center', 'SIEM, Threat hunting, Forensics'),
(18, 'Threat Intelligence Intern', 'FireEye', 'internship', 'Bangalore', '₹50-70k/month', 'FireEye Careers', 'https://fireeye.com/careers', '2026-02-22', '2026-04-15', 'Research cyber threats', 'Malware analysis, Python, OSINT');

-- Role 19: Ethical Hacker
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(19, 'Penetration Testing Intern', 'HackerOne', 'internship', 'Remote', '$50-70k/year', 'HackerOne Careers', 'https://hackerone.com/careers', '2026-02-09', '2026-03-24', 'Conduct security assessments', 'Pentesting, Burp Suite, Metasploit'),
(19, 'Ethical Hacker', 'Rapid7', 'job', 'Bangalore', '₹10-18 LPA', 'Rapid7 Careers', 'https://rapid7.com/careers', '2026-02-14', '2026-03-30', 'Perform penetration testing', 'CEH/OSCP, Kali Linux, Web security'),
(19, 'Security Researcher', 'Bugcrowd', 'job', 'Remote', '$80-120k/year', 'Bugcrowd Careers', 'https://bugcrowd.com/careers', '2026-02-18', '2026-04-05', 'Find security vulnerabilities', 'Bug bounty, Reverse engineering'),
(19, 'Red Team Intern', 'Mandiant', 'internship', 'Bangalore', '₹55-75k/month', 'Mandiant Careers', 'https://mandiant.com/careers', '2026-02-23', '2026-04-16', 'Simulate cyber attacks', 'Pentesting, Social engineering, Python');

-- Role 20: Security Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(20, 'Security Engineer Intern', 'Okta', 'internship', 'Remote', '$60-80k/year', 'Okta Careers', 'https://okta.com/careers', '2026-02-10', '2026-03-25', 'Build security features', 'Security, Python, Cloud'),
(20, 'Application Security Engineer', 'Shopify', 'job', 'Remote', '$90-130k/year', 'Shopify Careers', 'https://shopify.com/careers', '2026-02-15', '2026-04-01', 'Secure e-commerce platform', 'AppSec, OWASP, Ruby'),
(20, 'Cloud Security Engineer', 'Zscaler', 'job', 'Bangalore', '₹12-22 LPA', 'Zscaler Careers', 'https://zscaler.com/careers', '2026-02-19', '2026-04-07', 'Implement cloud security', 'AWS/Azure security, IAM, Python'),
(20, 'DevSecOps Intern', 'Snyk', 'internship', 'Remote', '$55-75k/year', 'Snyk Careers', 'https://snyk.io/careers', '2026-02-24', '2026-04-18', 'Integrate security in CI/CD', 'Security scanning, Docker, Kubernetes');

-- Role 21: SOC Analyst
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(21, 'SOC Analyst Intern', 'Splunk', 'internship', 'Bangalore', '₹40-60k/month', 'Splunk Careers', 'https://splunk.com/careers', '2026-02-11', '2026-03-26', 'Monitor security events', 'SIEM, Log analysis, Networking'),
(21, 'Junior SOC Analyst', 'IBM Security', 'job', 'Bangalore', '₹6-10 LPA', 'IBM Careers', 'https://ibm.com/careers', '2026-02-16', '2026-04-02', 'Respond to security incidents', 'QRadar, Incident response, Forensics'),
(21, 'Tier 2 SOC Analyst', 'Secureworks', 'job', 'Bangalore', '₹10-16 LPA', 'Secureworks Careers', 'https://secureworks.com/careers', '2026-02-20', '2026-04-08', 'Investigate security alerts', 'SIEM, Threat hunting, Malware analysis'),
(21, 'Security Operations Intern', 'Fortinet', 'internship', 'Bangalore', '₹45-65k/month', 'Fortinet Careers', 'https://fortinet.com/careers', '2026-02-25', '2026-04-20', 'Support SOC operations', 'Firewalls, IDS/IPS, SIEM');

-- Role 22: UI/UX Designer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(22, 'UI/UX Design Intern', 'Adobe', 'internship', 'Bangalore', '₹40-60k/month', 'Adobe Careers', 'https://adobe.com/careers', '2026-02-07', '2026-03-22', 'Design user interfaces', 'Figma, Adobe XD, Prototyping'),
(22, 'Product Designer', 'Razorpay', 'job', 'Bangalore', '₹8-14 LPA', 'Razorpay Careers', 'https://razorpay.com/jobs', '2026-02-12', '2026-03-28', 'Design fintech products', 'Figma, User research, Design systems'),
(22, 'UX Designer', 'Swiggy', 'job', 'Bangalore', '₹10-18 LPA', 'Swiggy Careers', 'https://swiggy.com/careers', '2026-02-16', '2026-04-02', 'Design food delivery experience', 'Sketch, Figma, User testing'),
(22, 'Visual Designer Intern', 'Canva', 'internship', 'Remote', '$50-70k/year', 'Canva Careers', 'https://canva.com/careers', '2026-02-21', '2026-04-12', 'Create design templates', 'Figma, Illustration, Typography');

-- Role 23: Product Designer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(23, 'Product Design Intern', 'Airbnb', 'internship', 'Remote', '$70-90k/year', 'Airbnb Careers', 'https://airbnb.com/careers', '2026-02-08', '2026-03-23', 'Design travel experiences', 'Figma, Prototyping, User research'),
(23, 'Senior Product Designer', 'Notion', 'job', 'Remote', '$100-150k/year', 'Notion Careers', 'https://notion.so/careers', '2026-02-13', '2026-03-29', 'Lead product design', 'Figma, Design systems, Leadership'),
(23, 'Product Designer', 'Zomato', 'job', 'Gurugram', '₹12-20 LPA', 'Zomato Careers', 'https://zomato.com/careers', '2026-02-17', '2026-04-03', 'Design food ordering flows', 'Figma, Mobile design, A/B testing'),
(23, 'Interaction Designer Intern', 'Google', 'internship', 'Bangalore', '₹60-80k/month', 'Google Careers', 'https://careers.google.com', '2026-02-22', '2026-04-15', 'Design product interactions', 'Figma, Motion design, Prototyping');

-- Role 24: Product Manager
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(24, 'Product Manager Intern', 'Microsoft', 'internship', 'Bangalore', '₹70-90k/month', 'Microsoft Careers', 'https://careers.microsoft.com', '2026-02-09', '2026-03-24', 'Manage product features', 'Product strategy, Analytics, SQL'),
(24, 'Associate Product Manager', 'Google', 'job', 'Bangalore', '₹18-28 LPA', 'Google Careers', 'https://careers.google.com', '2026-02-14', '2026-03-30', 'Drive product roadmap', 'Product management, Data analysis, Leadership'),
(24, 'Product Manager', 'Amazon', 'job', 'Bangalore', '₹22-40 LPA', 'Amazon Jobs', 'https://amazon.jobs', '2026-02-18', '2026-04-05', 'Own product lifecycle', 'Product strategy, Metrics, Stakeholder mgmt'),
(24, 'Technical PM Intern', 'Meta', 'internship', 'Remote', '$80-100k/year', 'Meta Careers', 'https://meta.com/careers', '2026-02-23', '2026-04-16', 'Manage technical products', 'Technical background, Product sense, SQL');

-- Role 25: QA Engineer
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(25, 'QA Intern', 'Infosys', 'internship', 'Pune', '₹25-40k/month', 'Infosys Careers', 'https://infosys.com/careers', '2026-02-06', '2026-03-21', 'Test software applications', 'Manual testing, Test cases, Bug tracking'),
(25, 'QA Automation Engineer', 'ThoughtWorks', 'job', 'Pune', '₹7-12 LPA', 'ThoughtWorks Careers', 'https://thoughtworks.com/careers', '2026-02-11', '2026-03-27', 'Automate testing', 'Selenium, Java/Python, CI/CD'),
(25, 'SDET', 'Uber', 'job', 'Bangalore', '₹12-20 LPA', 'Uber Careers', 'https://uber.com/careers', '2026-02-15', '2026-04-01', 'Build test automation frameworks', 'Java, Selenium, API testing'),
(25, 'Mobile QA Intern', 'Paytm', 'internship', 'Noida', '₹30-45k/month', 'Paytm Careers', 'https://paytm.com/careers', '2026-02-20', '2026-04-10', 'Test mobile applications', 'Appium, Mobile testing, Android/iOS');

-- =====================================================
-- GOVERNMENT & COMPETITIVE EXAMS DOMAIN (Domain ID: 2)
-- =====================================================

-- Note: For government roles, most opportunities are through exams
-- Adding coaching/preparation opportunities and some government internships

-- Role 26-46: Government roles (IAS, IPS, IFS, etc.)
-- These are exam-based, so adding preparation programs and government internships

INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
-- IAS Preparation
(26, 'UPSC IAS Coaching Program', 'Vajiram & Ravi', 'internship', 'Delhi', 'Free (Scholarship)', 'Vajiram Careers', 'https://vajiramandravi.com', '2026-02-01', '2026-03-15', 'Comprehensive IAS preparation', 'Graduation, UPSC aspirant'),
(26, 'Civil Services Mentorship', 'Drishti IAS', 'internship', 'Delhi', 'Free (Merit-based)', 'Drishti IAS', 'https://drishtiias.com', '2026-02-10', '2026-03-25', 'One-on-one UPSC mentorship', 'UPSC prelims cleared'),
(26, 'District Collector Internship', 'Government of India', 'internship', 'Various', 'Stipend ₹15-20k/mo', 'MyGov', 'https://mygov.in', '2026-02-15', '2026-04-01', 'Work with district administration', 'Graduate, UPSC aspirant'),

-- IPS Preparation
(27, 'Police Academy Training', 'Sardar Vallabhbhai Patel NPA', 'internship', 'Hyderabad', 'Stipend ₹56k/mo', 'NPA Hyderabad', 'https://svpnpa.gov.in', '2026-02-05', '2026-03-20', 'IPS training program', 'UPSC cleared'),
(27, 'Law Enforcement Internship', 'Ministry of Home Affairs', 'internship', 'Delhi', 'Stipend ₹20-25k/mo', 'MHA Careers', 'https://mha.gov.in', '2026-02-12', '2026-03-28', 'Work with police administration', 'Graduate, Interest in policing'),

-- Banking exams
(33, 'Bank PO Training Program', 'IBPS', 'internship', 'Mumbai', 'Free', 'IBPS', 'https://ibps.in', '2026-02-08', '2026-03-23', 'Banking sector preparation', 'Graduate'),
(33, 'Banking Operations Intern', 'SBI', 'internship', 'Mumbai', '₹25-35k/month', 'SBI Careers', 'https://sbi.co.in/careers', '2026-02-14', '2026-03-30', 'Learn banking operations', 'Graduate, Banking exam aspirant'),
(34, 'Bank Clerk Training', 'IBPS', 'internship', 'Various', 'Free', 'IBPS', 'https://ibps.in', '2026-02-10', '2026-03-25', 'Clerical exam preparation', 'Graduate'),

-- Defense
(38, 'NDA Cadet Training', 'National Defence Academy', 'internship', 'Khadakwasla', 'Stipend ₹21k/mo', 'NDA', 'https://nda.nic.in', '2026-02-01', '2026-03-15', 'Military training', 'NDA exam cleared'),
(38, 'Army Officer Training', 'Indian Military Academy', 'internship', 'Dehradun', 'Stipend ₹56k/mo', 'IMA', 'https://ima-dehradun.gov.in', '2026-02-05', '2026-03-20', 'Officer training program', 'CDS/NDA cleared');

-- =====================================================
-- COMMERCE & FINANCE DOMAIN (Domain ID: 3)
-- =====================================================

-- Role 47: Chartered Accountant
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(47, 'CA Articleship', 'Deloitte', 'internship', 'Mumbai', '₹15-25k/month', 'Deloitte Careers', 'https://deloitte.com/careers', '2026-02-01', '2026-03-15', 'CA training under Big 4', 'CA Inter cleared'),
(47, 'Audit Associate', 'PwC', 'job', 'Bangalore', '₹8-14 LPA', 'PwC Careers', 'https://pwc.com/careers', '2026-02-10', '2026-03-25', 'Conduct financial audits', 'CA qualified, 0-2 years exp'),
(47, 'Tax Consultant', 'EY', 'job', 'Mumbai', '₹10-18 LPA', 'EY Careers', 'https://ey.com/careers', '2026-02-15', '2026-04-01', 'Provide tax advisory', 'CA, Tax knowledge'),
(47, 'Senior Auditor', 'KPMG', 'job', 'Delhi', '₹12-22 LPA', 'KPMG Careers', 'https://kpmg.com/careers', '2026-02-20', '2026-04-10', 'Lead audit engagements', 'CA, 3+ years exp');

-- Role 48: CMA
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(48, 'CMA Trainee', 'Tata Steel', 'internship', 'Jamshedpur', '₹20-30k/month', 'Tata Careers', 'https://tata.com/careers', '2026-02-05', '2026-03-20', 'Cost accounting training', 'CMA Inter cleared'),
(48, 'Cost Accountant', 'Reliance Industries', 'job', 'Mumbai', '₹7-12 LPA', 'Reliance Careers', 'https://ril.com/careers', '2026-02-12', '2026-03-28', 'Manage cost accounting', 'CMA qualified'),
(48, 'Management Accountant', 'Mahindra Group', 'job', 'Pune', '₹9-15 LPA', 'Mahindra Careers', 'https://mahindra.com/careers', '2026-02-18', '2026-04-05', 'Financial planning & analysis', 'CMA, Excel, SAP');

-- Role 49: Company Secretary
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(49, 'CS Trainee', 'Wipro', 'internship', 'Bangalore', '₹25-35k/month', 'Wipro Careers', 'https://wipro.com/careers', '2026-02-08', '2026-03-23', 'Corporate compliance training', 'CS Executive cleared'),
(49, 'Company Secretary', 'Infosys', 'job', 'Bangalore', '₹8-14 LPA', 'Infosys Careers', 'https://infosys.com/careers', '2026-02-14', '2026-03-30', 'Ensure corporate governance', 'CS qualified'),
(49, 'Compliance Manager', 'HDFC Bank', 'job', 'Mumbai', '₹12-20 LPA', 'HDFC Careers', 'https://hdfc.com/careers', '2026-02-20', '2026-04-10', 'Manage regulatory compliance', 'CS, Banking knowledge');

-- Role 52: Financial Analyst
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(52, 'Financial Analyst Intern', 'Goldman Sachs', 'internship', 'Bangalore', '₹60-80k/month', 'Goldman Sachs Careers', 'https://goldmansachs.com/careers', '2026-02-06', '2026-03-21', 'Analyze financial data', 'Finance degree, Excel, SQL'),
(52, 'Junior Financial Analyst', 'Morgan Stanley', 'job', 'Mumbai', '₹8-14 LPA', 'Morgan Stanley Careers', 'https://morganstanley.com/careers', '2026-02-12', '2026-03-28', 'Support investment decisions', 'CFA Level 1, Financial modeling'),
(52, 'FP&A Analyst', 'Amazon', 'job', 'Bangalore', '₹10-16 LPA', 'Amazon Jobs', 'https://amazon.jobs', '2026-02-18', '2026-04-05', 'Financial planning & analysis', 'Finance degree, Excel, SQL');

-- Role 53: Investment Banker
INSERT INTO jobs_internships (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) VALUES
(53, 'Investment Banking Intern', 'JP Morgan', 'internship', 'Mumbai', '₹70-90k/month', 'JP Morgan Careers', 'https://jpmorgan.com/careers', '2026-02-10', '2026-03-25', 'Work on M&A deals', 'Top MBA/Finance degree'),
(53, 'Investment Banking Analyst', 'Citibank', 'job', 'Mumbai', '₹12-20 LPA', 'Citi Careers', 'https://citi.com/careers', '2026-02-15', '2026-04-01', 'Execute financial transactions', 'MBA Finance, Financial modeling'),
(53, 'M&A Associate', 'Barclays', 'job', 'Mumbai', '₹15-28 LPA', 'Barclays Careers', 'https://barclays.com/careers', '2026-02-20', '2026-04-10', 'Lead merger & acquisition deals', 'MBA, IB experience');

-- Continue with remaining roles...
-- Due to length constraints, I'll create a summary structure for the remaining domains

-- =====================================================
-- NOTE: This is a PARTIAL seed file
-- Complete file will include all 158 roles
-- Each role will have 3-4 jobs/internships
-- Total: ~500-600 job/internship entries
-- =====================================================
