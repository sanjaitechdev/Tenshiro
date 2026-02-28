const mysql = require('mysql2/promise');
require('dotenv').config();

// Updated domain-specific job portals with specialized platforms
const domainPortals = {
    1: [ // IT & Software
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Hirist', link: 'https://hirist.com' },
        { name: 'CutShort', link: 'https://cutshort.io' },
        { name: 'Wellfound', link: 'https://wellfound.com' },
        { name: 'Dice', link: 'https://dice.com' },
        { name: 'AngelList', link: 'https://angel.co' },
        { name: 'Stack Overflow Jobs', link: 'https://stackoverflow.com/jobs' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' }
    ],
    2: [ // Government & Competitive Exams
        { name: 'UPSC', link: 'https://upsc.gov.in' },
        { name: 'SSC', link: 'https://ssc.nic.in' },
        { name: 'TNPSC', link: 'https://tnpsc.gov.in' },
        { name: 'IBPS', link: 'https://ibps.in' },
        { name: 'RRB', link: 'https://rrbcdg.gov.in' },
        { name: 'DRDO', link: 'https://drdo.gov.in/careers' },
        { name: 'ISRO', link: 'https://isro.gov.in/careers' },
        { name: 'Indian Army', link: 'https://joinindianarmy.nic.in' },
        { name: 'Indian Navy', link: 'https://indiannavy.nic.in' },
        { name: 'Indian Air Force', link: 'https://indianairforce.nic.in' }
    ],
    3: [ // Commerce & Finance
        { name: 'eFinancialCareers', link: 'https://efinancialcareers.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Shine', link: 'https://shine.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Internshala', link: 'https://internshala.com' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' }
    ],
    4: [ // Core Engineering
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Shine', link: 'https://shine.com' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Foundit', link: 'https://foundit.in' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Internshala', link: 'https://internshala.com' }
    ],
    5: [ // Arts & Humanities
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Internshala', link: 'https://internshala.com' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Shine', link: 'https://shine.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' }
    ],
    6: [ // Management & MBA
        { name: 'IIMJobs', link: 'https://iimjobs.com' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Internshala', link: 'https://internshala.com' },
        { name: 'Wellfound', link: 'https://wellfound.com' }
    ],
    7: [ // Freelancing & Remote Careers
        { name: 'Upwork', link: 'https://upwork.com' },
        { name: 'Fiverr', link: 'https://fiverr.com' },
        { name: 'Freelancer', link: 'https://freelancer.com' },
        { name: 'Toptal', link: 'https://toptal.com' },
        { name: 'Guru', link: 'https://guru.com' },
        { name: 'PeoplePerHour', link: 'https://peopleperhour.com' },
        { name: 'FlexJobs', link: 'https://flexjobs.com' },
        { name: 'Remote OK', link: 'https://remoteok.com' },
        { name: 'We Work Remotely', link: 'https://weworkremotely.com' },
        { name: 'Truelancer', link: 'https://truelancer.com' }
    ],
    8: [ // Entrepreneurship & Startup
        { name: 'Wellfound', link: 'https://wellfound.com' },
        { name: 'AngelList', link: 'https://angel.co' },
        { name: 'Startup India', link: 'https://startupindia.gov.in' },
        { name: 'Y Combinator', link: 'https://ycombinator.com' },
        { name: 'Inc42', link: 'https://inc42.com/startup-jobs' },
        { name: 'YourStory', link: 'https://yourstory.com/jobs' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LetsVenture', link: 'https://letsventure.com' }
    ],
    9: [ // Higher Studies & Abroad
        { name: 'DAAD', link: 'https://daad.de' },
        { name: 'British Council', link: 'https://britishcouncil.org' },
        { name: 'Studyportals', link: 'https://studyportals.com' },
        { name: 'Shiksha', link: 'https://shiksha.com' },
        { name: 'Leverage Edu', link: 'https://leverageedu.com' },
        { name: 'IDP Education', link: 'https://idp.com' },
        { name: 'CollegeBoard', link: 'https://collegeboard.org' },
        { name: 'QS', link: 'https://topuniversities.com' },
        { name: 'Times Higher Education', link: 'https://timeshighereducation.com' },
        { name: 'EducationUSA', link: 'https://educationusa.state.gov' }
    ],
    10: [ // Emerging Technologies
        { name: 'Hirist', link: 'https://hirist.com' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Wellfound', link: 'https://wellfound.com' },
        { name: 'CutShort', link: 'https://cutshort.io' },
        { name: 'Dice', link: 'https://dice.com' },
        { name: 'AngelList', link: 'https://angel.co' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' }
    ],
    11: [ // Healthcare & Life Sciences
        { name: 'BioSpace', link: 'https://biospace.com' },
        { name: 'Health eCareers', link: 'https://healthecareers.com' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' }
    ],
    12: [ // Media & Creative
        { name: 'Behance', link: 'https://behance.net' },
        { name: 'Dribbble', link: 'https://dribbble.com/jobs' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Internshala', link: 'https://internshala.com' },
        { name: 'Upwork', link: 'https://upwork.com' },
        { name: 'Fiverr', link: 'https://fiverr.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' }
    ],
    13: [ // Law & Legal
        { name: 'Bar and Bench', link: 'https://barandbench.com/jobs' },
        { name: 'Legally India', link: 'https://legallyindia.com' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' }
    ],
    14: [ // Environment & Sustainability
        { name: 'GreenJobs', link: 'https://greenjobs.com' },
        { name: 'DevNetJobs', link: 'https://devnetjobs.org' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'WWF', link: 'https://wwf.org/careers' },
        { name: 'UNEP', link: 'https://unep.org/careers' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' }
    ],
    15: [ // Manufacturing & Industry
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Shine', link: 'https://shine.com' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Foundit', link: 'https://foundit.in' }
    ],
    16: [ // Aviation & Travel
        { name: 'AirlineJobs', link: 'https://airlinejobs.net' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Freshersworld', link: 'https://freshersworld.com' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Aviation Job Search', link: 'https://aviationjobsearch.com' }
    ],
    17: [ // Public Policy & NGO
        { name: 'DevNetJobs', link: 'https://devnetjobs.org' },
        { name: 'NGOBox', link: 'https://ngobox.org' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'UNICEF', link: 'https://unicef.org/careers' },
        { name: 'UNDP', link: 'https://undp.org/careers' },
        { name: 'WWF', link: 'https://wwf.org/careers' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' }
    ],
    18: [ // Sports & Fitness
        { name: 'WorkInSports', link: 'https://workinsports.com' },
        { name: 'LinkedIn', link: 'https://linkedin.com/jobs' },
        { name: 'Indeed', link: 'https://indeed.co.in' },
        { name: 'Naukri.com', link: 'https://naukri.com' },
        { name: 'Apna', link: 'https://apna.co' },
        { name: 'Glassdoor', link: 'https://glassdoor.co.in' },
        { name: 'TimesJobs', link: 'https://timesjobs.com' },
        { name: 'Monster India', link: 'https://monsterindia.com' },
        { name: 'Internshala', link: 'https://internshala.com' },
        { name: 'TeamWork Online', link: 'https://teamworkonline.com' }
    ]
};

// Realistic companies by domain
const companies = {
    1: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Uber', 'Airbnb', 'Spotify', 'Adobe', 'Salesforce', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'Cisco'],
    2: ['UPSC', 'SSC', 'TNPSC', 'IBPS', 'SBI', 'Indian Army', 'Indian Navy', 'Indian Air Force', 'DRDO', 'ISRO', 'RBI', 'NABARD', 'LIC', 'ONGC', 'Coal India'],
    3: ['Deloitte', 'PwC', 'EY', 'KPMG', 'Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Citibank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'SBI', 'Yes Bank', 'HSBC'],
    4: ['Tata Motors', 'L&T', 'BHEL', 'NTPC', 'Siemens', 'ABB', 'Schneider Electric', 'Bosch', 'Honeywell', 'GE', 'Thermax', 'Crompton Greaves', 'Havells', 'Voltas', 'Blue Star'],
    5: ['UNICEF', 'UNESCO', 'British Council', 'The Hindu', 'Times of India', 'NDTV', 'Teach For India', 'Akanksha Foundation', 'CRY', 'Pratham', 'Azim Premji Foundation', 'Goonj', 'Smile Foundation', 'HelpAge India', 'Magic Bus'],
    6: ['Tata Group', 'HUL', 'ITC', 'Reliance', 'Mahindra', 'Aditya Birla', 'Godrej', 'Wipro', 'Infosys', 'TCS', 'Nestle', 'P&G', 'Coca-Cola', 'PepsiCo', 'Mondelez'],
    7: ['Upwork', 'Fiverr', 'Toptal', 'Freelancer', 'Guru', 'PeoplePerHour', '99designs', 'Dribbble', 'Behance', 'Contently', 'Truelancer', 'Freelance India', 'Worknhire', 'Flexiple', 'Turing'],
    8: ['Y Combinator', 'Sequoia Capital', 'Accel', 'Matrix Partners', 'Blume Ventures', 'Kalaari Capital', 'CIIE', 'T-Hub', 'NSRCEL', 'Startup India', 'Venture Catalysts', 'Indian Angel Network', 'LetsVenture', 'Axilor Ventures', 'Chiratae Ventures'],
    9: ['Stanford University', 'MIT', 'Harvard', 'Oxford', 'Cambridge', 'ETH Zurich', 'NUS', 'IIT Bombay', 'IISc Bangalore', 'IIM Ahmedabad', 'TU Munich', 'EPFL', 'Imperial College', 'UCL', 'LSE'],
    10: ['NVIDIA', 'OpenAI', 'Anthropic', 'Google AI', 'Microsoft Research', 'IBM Research', 'Meta AI', 'DeepMind', 'Tesla', 'SpaceX', 'Databricks', 'Snowflake', 'Palantir', 'Scale AI', 'Hugging Face'],
    11: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Cipla', 'Dr. Reddy\'s', 'Biocon', 'Serum Institute', 'Sun Pharma', 'Lupin', 'Cadila', 'Glenmark', 'Torrent Pharma', 'Alkem Labs', 'Mankind Pharma', 'Zydus'],
    12: ['Zee Entertainment', 'Disney Star', 'Netflix', 'Amazon Prime', 'Sony Pictures', 'Viacom18', 'Red Chillies', 'Yash Raj Films', 'Dharma Productions', 'Balaji Telefilms', 'T-Series', 'Eros Now', 'ALTBalaji', 'MX Player', 'Hotstar'],
    13: ['AZB & Partners', 'Cyril Amarchand', 'Khaitan & Co', 'JSA', 'Trilegal', 'Luthra & Luthra', 'Shardul Amarchand', 'Economic Laws Practice', 'IndusLaw', 'Nishith Desai', 'S&R Associates', 'J Sagar Associates', 'Talwar Thakore', 'Phoenix Legal', 'Lakshmikumaran'],
    14: ['WWF India', 'Greenpeace', 'TERI', 'CSE', 'WRI India', 'The Nature Conservancy', 'CEEW', 'CPR', 'ATREE', 'ICLEI', 'SANDRP', 'Toxics Link', 'Chintan', 'Kalpavriksh', 'Watershed'],
    15: ['Tata Steel', 'JSW Steel', 'Hindalco', 'Vedanta', 'UltraTech Cement', 'ACC', 'Ambuja Cement', 'Grasim', 'Aditya Birla', 'Essar', 'Jindal Steel', 'SAIL', 'NMDC', 'Shree Cement', 'Dalmia Cement'],
    16: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Go First', 'AirAsia India', 'MakeMyTrip', 'Yatra', 'Thomas Cook', 'Cox & Kings', 'Cleartrip', 'Goibibo', 'EaseMyTrip', 'Ixigo', 'TripAdvisor'],
    17: ['NITI Aayog', 'PRS', 'UNICEF India', 'UNDP India', 'WHO India', 'Oxfam India', 'Save the Children', 'World Vision', 'ActionAid', 'Plan India', 'Care India', 'Helpage India', 'Smile Foundation', 'Goonj', 'Akshaya Patra'],
    18: ['Sports Authority of India', 'IPL', 'BCCI', 'Decathlon', 'Nike', 'Adidas', 'Puma', 'Cult.fit', 'HealthifyMe', 'Fittr', 'Gold\'s Gym', 'Talwalkars', 'Snap Fitness', 'Anytime Fitness', 'Fitness First']
};

function getRandomPortal(domainId) {
    const portals = domainPortals[domainId] || domainPortals[1];
    return portals[Math.floor(Math.random() * portals.length)];
}

function getRandomCompany(domainId) {
    const companyList = companies[domainId] || companies[1];
    return companyList[Math.floor(Math.random() * companyList.length)];
}

function generateJobsForRole(roleId, roleTitle, domainId) {
    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Noida', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi', 'Chandigarh', 'Indore', 'Coimbatore'];
    const jobs = [];

    // Generate 10 internships and 10 jobs per role (20 total)
    for (let i = 0; i < 20; i++) {
        const isInternship = i < 10;
        const portal = getRandomPortal(domainId);
        const company = getRandomCompany(domainId);
        const location = locations[Math.floor(Math.random() * locations.length)];

        jobs.push({
            title: isInternship ? `${roleTitle} Intern` : `${i < 15 ? 'Junior' : 'Senior'} ${roleTitle}`,
            company: company,
            type: isInternship ? 'internship' : 'job',
            location: location,
            salary: isInternship ? `₹${Math.floor(Math.random() * 30) + 20}k/month` : (i < 15 ? `₹${Math.floor(Math.random() * 6) + 4}-10 LPA` : `₹${Math.floor(Math.random() * 10) + 12}-25 LPA`),
            portal: portal.name,
            link: portal.link,
            description: `${isInternship ? 'Internship' : 'Full-time'} opportunity for ${roleTitle} at ${company}. Work on exciting projects and gain hands-on experience in ${roleTitle} domain.`,
            requirements: `Required skills for ${roleTitle}: ${isInternship ? 'Basic knowledge, willingness to learn. Students and freshers welcome.' : 'Experience preferred. Strong technical and communication skills.'}`
        });
    }

    return jobs;
}

async function seedJobsInternships() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log('🚀 Starting jobs/internships seeding with SPECIALIZED portals...\n');

        // Clear existing data
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');
        await connection.query('TRUNCATE TABLE user_job_applications');
        await connection.query('TRUNCATE TABLE jobs_internships');
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ Cleared existing jobs/internships data\n');

        // Get all roles
        const [roles] = await connection.query('SELECT id, title, domain_id FROM roles ORDER BY id');
        console.log(`📊 Found ${roles.length} roles across 18 domains\n`);

        let totalInserted = 0;
        const portalStats = {};
        const domainStats = {};

        // Generate jobs for each role
        for (const role of roles) {
            const jobs = generateJobsForRole(role.id, role.title, role.domain_id);

            for (const job of jobs) {
                const postedDate = new Date(2026, 1, Math.floor(Math.random() * 20) + 1);
                const deadline = new Date(postedDate);
                deadline.setDate(deadline.getDate() + 30 + Math.floor(Math.random() * 30));

                await connection.query(
                    `INSERT INTO jobs_internships 
          (role_id, title, company, type, location, salary_range, portal_name, portal_link, posted_date, deadline, description, requirements) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        role.id,
                        job.title,
                        job.company,
                        job.type,
                        job.location,
                        job.salary,
                        job.portal,
                        job.link,
                        postedDate.toISOString().split('T')[0],
                        deadline.toISOString().split('T')[0],
                        job.description,
                        job.requirements
                    ]
                );

                // Track portal and domain usage
                portalStats[job.portal] = (portalStats[job.portal] || 0) + 1;
                domainStats[role.domain_id] = (domainStats[role.domain_id] || 0) + 1;
                totalInserted++;
            }

            console.log(`✓ Added 4 opportunities for: ${role.title} (Domain ${role.domain_id})`);
        }

        console.log(`\n✅ Successfully inserted ${totalInserted} jobs/internships for ${roles.length} roles!`);
        console.log(`📈 Average: ${(totalInserted / roles.length).toFixed(1)} opportunities per role\n`);

        // Show summary
        const [typeSummary] = await connection.query(`
      SELECT type, COUNT(*) as count
      FROM jobs_internships
      GROUP BY type
    `);

        console.log('📊 Type Summary:');
        typeSummary.forEach(row => {
            console.log(`   ${row.type}: ${row.count}`);
        });

        console.log('\n📊 Top 15 Specialized Portals Used:');
        const sortedPortals = Object.entries(portalStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15);
        sortedPortals.forEach(([portal, count]) => {
            console.log(`   ${portal}: ${count} listings`);
        });

        console.log('\n📊 Domain Distribution:');
        Object.entries(domainStats)
            .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
            .forEach(([domain, count]) => {
                console.log(`   Domain ${domain}: ${count} opportunities`);
            });

    } catch (error) {
        console.error('❌ Error seeding jobs:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

// Run the seeder
seedJobsInternships()
    .then(() => {
        console.log('\n🎉 Jobs/Internships seeding completed with SPECIALIZED portals!');
        console.log('💡 Note: For real-time vacancy data, integrate with portal APIs or web scraping.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Seeding failed:', error);
        process.exit(1);
    });
