const db = require('../config/db');

// Keyword mappings to make titles more natural
const domainKeywords = {
    "IT & Software": ["Software", "Application", "Web", "System", "Full Stack", "Backend", "Frontend"],
    "Cybersecurity": ["Security", "Cyber", "Network Security", "InfoSec", "Threat", "Vulnerability"],
    "Cloud Computing": ["Cloud", "AWS", "Azure", "DevOps", "Infrastructure", "Platform"],
    "Data Science": ["Data", "Machine Learning", "AI", "Big Data", "Analytics", "Statistical"],
    "DevOps Engineering": ["DevOps", "SRE", "Build", "Release", "Automation", "CI/CD"],
    "UI/UX Design": ["UI", "UX", "Product", "Visual", "User Research", "Interaction"],
    "Game Development": ["Game", "Unity", "Unreal", "Gameplay", "Graphics", "Level"],
    "Blockchain Development": ["Blockchain", "Smart Contract", "Crypto", "Web3", "Solidity", "DApp"],

    "Civil Engineering": ["Civil", "Structural", "Site", "Construction", "Highway", "Geotechnical"],
    "Chemical Engineering": ["Chemical", "Process", "Petrochemical", "Plant", "Safety", "Quality"],
    "Aerospace Engineering": ["Aerospace", "Aeronautical", "Avionics", "Propulsion", "Flight", "Systems"],
    "Biomedical Engineering": ["Biomedical", "Clinical", "R&D", "Medical Device", "Bioinformatics", "Tissue"],
    "Automobile Engineering": ["Automobile", "Automotive", "Vehicle", "Design", "Testing", "Manufacturing"],

    "Medicine & Surgery": ["General", "Surgical", "Clinical", "Medical", "Resident", "Consultant"],
    "Nursing": ["Nursing", "Clinical", "Registered", "Ward", "Critical Care", "Pediatric"],
    "Pharmacy": ["Pharmacy", "Clinical", "Retail", "Hospital", "Research", "Formulation"],
    "Psychology": ["Psychology", "Clinical", "Counseling", "Behavioral", "Industrial", "Child"],

    "Investment Banking": ["Investment", "Equity", "Risk", "Financial", "M&A", "Portfolio"],
    "Digital Marketing": ["SEO", "Content", "Social Media", "PPC", "Growth", "Brand"],
    "Human Resources": ["HR", "Recruitment", "Talent", "Learning", "Employee Relations", "Payroll"],
    "Supply Chain Management": ["Supply Chain", "Logistics", "Procurement", "Inventory", "Operations", "Warehouse"],

    "Journalism & Mass Comm": ["News", "Editorial", "Content", "Broadcast", "Digital", "Reporting"],
    "Legal Studies": ["Legal", "Corporate", "Litigation", "Compliance", "Contract", "IP"],
    "Architecture": ["Architectural", "Interior", "Landscape", "Urban", "Design", "Project"],
    "Fashion Design": ["Fashion", "Textile", "Merchandising", "Pattern", "Apparel", "Creative"],
    "Animation & VFX": ["Animation", "VFX", "3D", "Motion Graphics", "Character", "Compositing"],

    "Biotechnology": ["Biotech", "Lab", "Research", "Genetics", "Molecular", "Microbiology"],
    "Environmental Science": ["Environmental", "Sustainability", "Ecological", "Climate", "Conservation", "Waste Management"],
    "Astrophysics": ["Astrophysics", "Space", "Research", "Data", "Observatory", "Theoretical"],

    "Hospitality Management": ["Hotel", "Event", "Guest Relations", "Operations", "F&B", "Front Office"],
    "Education & Teaching": ["Teaching", "Curriculum", "Special Ed", "Academic", "Training", "Faculty"],
    "Sports Management": ["Sports", "Team", "Event", "Athlete", "Marketing", "Operations"],
    "Event Management": ["Event", "Wedding", "Corporate", "Venue", "Production", "Coordinator"],
    "Social Work": ["Social", "Community", "Case", "Outreach", "Program", "Support"]
};

// Generic fallbacks combined if no mapping
const levels = ["Intern", "Trainee", "Junior", "Associate", "", "Senior", "Lead", "Principal", "Chief", "Head of"];
const roles = ["Engineer", "Analyst", "Consultant", "Specialist", "Manager", "Director", "Officer", "Technician", "Architect", "Administrator", "Coordinator", "Executive"];

// Helper to pick random element
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random salary
const genSalary = (base) => {
    const min = base * 0.8;
    const max = base * 1.2;
    const val = Math.floor(Math.random() * (max - min) + min);
    return `₹${val} LPA`;
};

async function populateRoles() {
    try {
        // CLEANUP
        console.log("Clearing existing roles and dependent data...");
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE TABLE roadmap_tasks');
        await db.query('TRUNCATE TABLE roadmap_phases');
        await db.query('TRUNCATE TABLE roles');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');

        const [domains] = await db.query('SELECT id, name FROM domains');
        console.log(`Found ${domains.length} domains. Generating roles...`);

        const allRoles = [];

        for (const domain of domains) {
            // Determine count: 35 to 50
            const count = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
            const keywords = domainKeywords[domain.name] || [domain.name.split(' ')[0], domain.name];

            // To ensure uniqueness, we verify generated titles
            const generatedTitles = new Set();
            let attempts = 0;

            while (generatedTitles.size < count && attempts < 200) {
                attempts++;

                const level = pick(levels);
                const keyword = pick(keywords);
                const roleBase = pick(roles);

                const title = level ? `${level} ${keyword} ${roleBase}` : `${keyword} ${roleBase}`;

                if (!generatedTitles.has(title)) {
                    generatedTitles.add(title);

                    const demand = Math.random() > 0.4 ? 'High' : (Math.random() > 0.5 ? 'Medium' : 'Low');

                    // Simple logic for salary vs level
                    let baseFresher = 3;
                    let baseSenior = 8;
                    let progression = "Junior Role -> Senior Role -> Lead Role";

                    if (level.includes("Intern")) {
                        baseFresher = 1; baseSenior = 0;
                        progression = "Intern -> Junior Developer -> Senior Developer";
                    } else if (level.includes("Junior") || level === "" || level === "Associate") {
                        baseFresher = 3; baseSenior = 8;
                        progression = `Senior ${keyword} ${roleBase} -> Lead ${keyword} ${roleBase} -> Manager`;
                    } else if (level.includes("Senior")) {
                        baseFresher = 6; baseSenior = 15;
                        progression = `Lead ${keyword} ${roleBase} -> Engineering Manager -> CTO`;
                    } else if (level.includes("Lead") || level.includes("Principal")) {
                        baseFresher = 12; baseSenior = 25;
                        progression = `Engineering Manager -> Director of Engineering -> VP of Engineering`;
                    } else if (level.includes("Head") || level.includes("Chief")) {
                        baseFresher = 20; baseSenior = 40;
                        progression = `Director -> VP -> C-Level Executive`;
                    }

                    const baseMid = baseSenior > 0 ? (baseFresher + baseSenior) / 2 : baseFresher * 1.5;

                    // Add noise
                    const salFresher = genSalary(baseFresher);
                    const salMid = genSalary(baseMid);
                    const salSenior = level.includes("Intern") ? "N/A" : genSalary(baseSenior);

                    const description = `As a ${title}, you will be responsible for driving ${keyword} initiatives and optimizing ${roleBase.toLowerCase()} processes. This role requires a deep understanding of standard industry practices, offering opportunities to work on high-impact projects that shape the future of the ${domain.name} domain. You will collaborate with cross-functional teams to deliver scalable solutions while continuously enhancing your skills in a dynamic environment.`;

                    allRoles.push([
                        domain.id,
                        title,
                        description,
                        salFresher,
                        salSenior,
                        demand,
                        salMid,
                        progression
                    ]);
                }
            }
            console.log(`Generated ${generatedTitles.size} roles for ${domain.name}`);
        }

        // Batch Insert
        const chunkSize = 500;
        for (let i = 0; i < allRoles.length; i += chunkSize) {
            const chunk = allRoles.slice(i, i + chunkSize);
            await db.query('INSERT INTO roles (domain_id, title, description, salary_fresher, salary_senior, demand_indicator, salary_mid, future_growth) VALUES ?', [chunk]);
            console.log(`Inserted chunk ${i / chunkSize + 1}`);
        }

        console.log("All roles populated successfully.");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

populateRoles();
