// Domain-specific learning platforms mapping
const domainPlatforms = {
    1: { // IT & Software
        free: ['freeCodeCamp', 'W3Schools', 'Coursera (Free audit)', 'edX (Free audit)', 'Khan Academy', 'GeeksforGeeks', 'Codecademy (Free tier)', 'Google Digital Garage', 'Microsoft Learn', 'Udemy (Free courses)'],
        paid: ['Udacity', 'Pluralsight', 'Simplilearn', 'LinkedIn Learning', 'Intellipaat']
    },
    2: { // Government & Competitive Exams
        free: ['Unacademy (Free classes)', 'BYJU\'S Exam Prep (Free content)', 'Testbook (Free tests)', 'Adda247 (Free YouTube)', 'Khan Academy', 'StudyIQ', 'Drishti IAS (Free videos)', 'Insights IAS', 'Vision IAS (Free materials)', 'PIB'],
        paid: ['Unacademy Plus', 'BYJU\'S', 'Testbook Pass', 'Adda247 App', 'Next IAS']
    },
    3: { // Commerce & Finance
        free: ['Investopedia', 'Khan Academy', 'Coursera (Free audit)', 'edX', 'NPTEL', 'Swayam', 'Alison', 'Udemy (Free)', 'YouTube', 'OpenLearn'],
        paid: ['Zerodha Varsity', 'Wall Street Prep', 'Udemy', 'Coursera Plus', 'IMS Proschool']
    },
    4: { // Core Engineering
        free: ['MIT OpenCourseWare', 'NPTEL', 'Swayam', 'Learn Engineering', 'Engineering Explained', 'OpenLearn', 'Khan Academy', 'Coursera (Free audit)', 'edX', 'FutureLearn'],
        paid: ['Skill-Lync', 'UpGrad', 'NIIT', 'Edureka', 'Udemy']
    },
    5: { // Arts & Humanities
        free: ['Open Yale Courses', 'MIT OpenCourseWare', 'Swayam', 'Khan Academy', 'TED', 'FutureLearn', 'Coursera', 'edX', 'OpenLearn', 'YouTube'],
        paid: ['Skillshare', 'MasterClass', 'Udemy', 'Coursera Plus', 'Great Courses']
    },
    6: { // Management & MBA
        free: ['Harvard Online (Free resources)', 'IIMBx', 'Swayam', 'NPTEL', 'OpenLearn', 'Alison', 'Coursera', 'edX', 'FutureLearn', 'HubSpot Academy'],
        paid: ['UpGrad', 'ISB', 'NMIMS', 'Symbiosis', 'LinkedIn Learning']
    },
    7: { // Freelancing & Remote Careers
        free: ['Fiverr', 'Upwork', 'Toptal', 'PeoplePerHour', 'Guru', 'Freelancer', 'We Work Remotely', 'Remote OK', 'AngelList', 'Internshala'],
        paid: ['Skillshare', 'Udemy', 'LinkedIn Premium', 'SolidGigs', 'FlexJobs']
    },
    8: { // Entrepreneurship & Startup
        free: ['Startup India', 'Y Combinator (Startup School free)', 'Google for Startups', 'HubSpot Academy', 'Coursera', 'edX', 'FutureLearn', 'Swayam', 'NASSCOM', 'MSME India'],
        paid: ['UpGrad', 'Udemy', 'MasterClass', 'LinkedIn Learning', 'Skillshare']
    },
    9: { // Higher Studies & Abroad
        free: ['DAAD', 'EducationUSA', 'British Council', 'Study in Canada', 'Campus France', 'QS', 'Times Higher Education', 'Common App', 'Coursera (Free audit)', 'edX'],
        paid: ['IDP Education', 'Magoosh', 'Kaplan', 'Leap Scholar', 'Yocket']
    },
    10: { // Emerging Technologies
        free: ['Google AI', 'DeepLearning.AI (Free resources)', 'Hugging Face', 'Kaggle', 'IBM SkillsBuild', 'Microsoft Learn', 'OpenAI', 'NVIDIA Developer', 'AWS Training', 'Oracle University'],
        paid: ['Udacity', 'Simplilearn', 'UpGrad', 'Coursera Plus', 'Edureka']
    },
    11: { // Healthcare & Life Sciences
        free: ['WHO', 'CDC', 'Medscape', 'OpenWHO', 'Coursera', 'edX', 'FutureLearn', 'Khan Academy', 'NIH', 'Alison'],
        paid: ['UpGrad', 'Udemy', 'Simplilearn', 'Coursera Plus', 'Harvard Online']
    },
    12: { // Media & Creative
        free: ['Canva Design School', 'YouTube Creator Academy', 'Google Digital Garage', 'HubSpot Academy', 'OpenLearn', 'Coursera', 'edX', 'Khan Academy', 'Pixar in a Box', 'BBC Academy'],
        paid: ['Skillshare', 'MasterClass', 'Udemy', 'LinkedIn Learning', 'Domestika']
    },
    13: { // Law & Legal
        free: ['NALSAR', 'Harvard Law School', 'Legal Information Institute', 'Indian Kanoon', 'Bar Council of India', 'Coursera', 'edX', 'FutureLearn', 'NPTEL', 'Swayam'],
        paid: ['LawSikho', 'Bar and Bench', 'Udemy', 'Coursera Plus', 'UpGrad']
    },
    14: { // Environment & Sustainability
        free: ['UNEP', 'UN Climate Change', 'WWF', 'National Geographic', 'Coursera (Free audit)', 'edX', 'FutureLearn', 'Swayam', 'NPTEL', 'OpenLearn'],
        paid: ['UpGrad', 'Udemy', 'Coursera Plus', 'Simplilearn', 'LinkedIn Learning']
    },
    15: { // Manufacturing & Industry
        free: ['MIT OpenCourseWare', 'NPTEL', 'Swayam', 'Alison', 'Coursera', 'edX', 'FutureLearn', 'OpenLearn', 'Autodesk University', 'Siemens Learning'],
        paid: ['Skill-Lync', 'Udemy', 'UpGrad', 'Simplilearn', 'LinkedIn Learning']
    },
    16: { // Aviation & Travel
        free: ['IATA (Free resources)', 'ICAO', 'DGCA', 'Coursera', 'edX', 'FutureLearn', 'OpenLearn', 'Khan Academy', 'UNWTO', 'Alison'],
        paid: ['IATA Training', 'CAE', 'Udemy', 'UpGrad', 'Simplilearn']
    },
    17: { // Public Policy & NGO
        free: ['UNDP', 'World Bank', 'NITI Aayog', 'PRS Legislative Research', 'Coursera', 'edX', 'FutureLearn', 'OpenLearn', 'Swayam', 'Alison'],
        paid: ['UpGrad', 'Udemy', 'Coursera Plus', 'LinkedIn Learning', 'ISB']
    },
    18: { // Sports & Fitness
        free: ['IOC', 'WHO', 'Khan Academy', 'Coursera', 'edX', 'FutureLearn', 'Alison', 'OpenLearn', 'Nike Training Club', 'YouTube'],
        paid: ['ISSA', 'ACE Fitness', 'Udemy', 'UpGrad', 'LinkedIn Learning']
    }
};

module.exports = domainPlatforms;
