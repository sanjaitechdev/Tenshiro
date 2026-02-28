const db = require('../config/db');

// Domain-Specific Roadmap Templates
const roadmapTemplates = {
    // IT & Software
    "Frontend": [
        { title: "HTML, CSS & Git", description: "Learn the building blocks of the web.", tasks: ["HTML5 Semantic Elements", "CSS Flexbox & Grid", "Git Basics & GitHub"] },
        { title: "JavaScript Fundamentals", description: "Master the language of the web.", tasks: ["ES6+ Syntax", "DOM Manipulation", "Fetch API & Async/Await"] },
        { title: "React & Modern UI", description: "Build dynamic user interfaces.", tasks: ["Components & Props", "Hooks (useState, useEffect)", "State Management (Redux/Context)", "Tailwind CSS"] },
        { title: "Advanced Frontend", description: "Performance, testing, and deployment.", tasks: ["Next.js & SSR", "TypeScript", "Jest/Testing Library", "Deployment (Vercel/Netlify)"] }
    ],
    "Backend": [
        { title: "Server-Side Basics", description: "Understand how servers and HTTP work.", tasks: ["Node.js & Express / Python Django", "REST API Design", "HTTP Methods & Status Codes"] },
        { title: "Databases", description: "Storing and managing data.", tasks: ["SQL (PostgreSQL/MySQL)", "NoSQL (MongoDB)", "ORM (Sequelize/Mongoose)"] },
        { title: "Authentication & Security", description: "Securing your application.", tasks: ["JWT & OAuth", "Hashing Passwords", "Rate Limiting & CORS"] },
        { title: "Scalability & DevOps", description: "Deploying and scaling applications.", tasks: ["Docker & Containers", "CI/CD Pipelines", "Cloud Basics (AWS/Azure)"] }
    ],
    "Full Stack": [
        { title: "Frontend Foundation", description: "Building the user interface.", tasks: ["HTML, CSS, JS", "React.js Basics"] },
        { title: "Backend & APIs", description: "Server-side logic and database.", tasks: ["Node.js/Express", "RESTful APIs", "SQL Database"] },
        { title: "Integration & Auth", description: "Connecting front and back.", tasks: ["JWT Auth", "Axios/Fetch", "State Management"] },
        { title: "DevOps & Deployment", description: "Shipping your code.", tasks: ["Docker", "CI/CD", "AWS EC2/S3"] }
    ],
    "Data Science": [
        { title: "Mathematics & Statistics", description: "Core concepts for data analysis.", tasks: ["Linear Algebra", "Calculus", "Probability & Statistics"] },
        { title: "Python for Data Science", description: "Programming tools.", tasks: ["NumPy & Pandas", "Matplotlib & Seaborn", "Jupyter Notebooks"] },
        { title: "Machine Learning", description: "Building predictive models.", tasks: ["Scikit-Learn", "Regression & Classification", "Clustering"] },
        { title: "Deep Learning & AI", description: "Neural networks and advanced AI.", tasks: ["TensorFlow/PyTorch", "NLP Basics", "Computer Vision"] }
    ],
    "DevOps": [
        { title: "Linux & Scripting", description: "OS and automation.", tasks: ["Bash Scripting", "Linux Commands", "Cron Jobs"] },
        { title: "Networking & Security", description: "Infrastructure basics.", tasks: ["DNS, HTTP, SSL", "Firewalls & VPNs"] },
        { title: "Containerization", description: "Packaging applications.", tasks: ["Docker", "Kubernetes (K8s)"] },
        { title: "CI/CD & Cloud", description: "Automated delivery.", tasks: ["Jenkins/GitHub Actions", "AWS/Azure/GCP", "Terraform"] }
    ],

    // Engineering
    "Civil": [
        { title: "Engineering Mechanics", description: "Foundational physics.", tasks: ["Statics & Dynamics", "Strength of Materials"] },
        { title: "Structural Analysis", description: "Analyzing structures.", tasks: ["Structural Theory", "Concrete Technology", "Steel Design"] },
        { title: "CAD & Design", description: "Digital design tools.", tasks: ["AutoCAD 2D/3D", "Revit Structure", "STAAD.Pro"] },
        { title: "Project Management", description: "Managing construction projects.", tasks: ["Estimation & Costing", "Construction Safety", "Site Management"] }
    ],
    "Mechanical": [
        { title: "Thermodynamics", description: "Heat and energy systems.", tasks: ["Laws of Thermodynamics", "Heat Transfer", "Fluid Mechanics"] },
        { title: "Design & Manufacturing", description: "Product design.", tasks: ["SolidWorks/CATIA", "Manufacturing Processes", "GD&T"] },
        { title: "Automotive Systems", description: "Vehicle mechanics.", tasks: ["IC Engines", "Transmission Systems", "Vehicle Dynamics"] },
        { title: "Mechatronics", description: "Integrating electronics.", tasks: ["Sensors & Actuators", "PLC Programming", "Robotics Basics"] }
    ],

    // Healthcare
    "Medical": [
        { title: "Anatomy & Physiology", description: "Human body systems.", tasks: ["Skeletal System", "Muscular System", "Nervous System"] },
        { title: "Clinical Practice", description: "Patient care skills.", tasks: ["Patient Assessment", "First Aid & BLS", "Medical Ethics"] },
        { title: "Specialization", description: "Advanced medical focus.", tasks: ["Internal Medicine", "Surgery Basics", "Pediatrics"] },
        { title: "Healthcare Technology", description: "Modern medical tools.", tasks: ["EHR Systems", "Medical Imaging", "Telemedicine"] }
    ],

    // Global Fallback
    "General": [
        { title: "Foundations", description: "Core concepts and basics.", tasks: ["Introduction to Domain", "Key Terminology", "Industry Standards"] },
        { title: "Intermediate Skills", description: "Building proficiency.", tasks: ["Core Tools & Technologies", "Practical Application", "Case Studies"] },
        { title: "Advanced Topics", description: "Mastering complex subjects.", tasks: ["Specialized Techniques", "Optimization", "Innovation Trends"] },
        { title: "Professional Development", description: "Career readiness.", tasks: ["Portfolio Building", "Interview Prep", "Networking"] }
    ]
};

async function populateRoadmaps() {
    try {
        console.log("Cleaning old roadmap data...");
        // Roadmap tables are already cleared in populate_roles.js, but let's be safe if running standalone
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE TABLE roadmap_tasks');
        await db.query('TRUNCATE TABLE roadmap_phases');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');

        const [roles] = await db.query('SELECT id, title, domain_id FROM roles');
        console.log(`Found ${roles.length} roles. Generating roadmaps...`);

        // Get domain names for context
        const [domains] = await db.query('SELECT id, name FROM domains');
        const domainMap = {};
        domains.forEach(d => domainMap[d.id] = d.name);

        let totalPhases = 0;

        for (const role of roles) {
            let template = roadmapTemplates["General"];
            const roleTitle = role.title.toLowerCase();
            const domainName = domainMap[role.domain_id] || "";

            // Smart Matching Strategy
            if (roleTitle.includes("frontend") || roleTitle.includes("react") || roleTitle.includes("web")) template = roadmapTemplates["Frontend"];
            else if (roleTitle.includes("backend") || roleTitle.includes("node") || roleTitle.includes("java") || roleTitle.includes("api")) template = roadmapTemplates["Backend"];
            else if (roleTitle.includes("full stack") || roleTitle.includes("software")) template = roadmapTemplates["Full Stack"];
            else if (roleTitle.includes("data") || roleTitle.includes("machine learning") || roleTitle.includes("ai")) template = roadmapTemplates["Data Science"];
            else if (roleTitle.includes("devops") || roleTitle.includes("cloud")) template = roadmapTemplates["DevOps"];
            else if (domainName.includes("Civil")) template = roadmapTemplates["Civil"];
            else if (domainName.includes("Mechanical") || domainName.includes("Automobile")) template = roadmapTemplates["Mechanical"];
            else if (domainName.includes("Medicine") || domainName.includes("Nursing")) template = roadmapTemplates["Medical"];

            // Insert Phases & Tasks
            for (let i = 0; i < template.length; i++) {
                const phase = template[i];
                const res = await db.query(
                    'INSERT INTO roadmap_phases (role_id, title, description, phase_order) VALUES (?, ?, ?, ?)',
                    [role.id, phase.title, phase.description, i + 1]
                );

                const phaseId = res[0].insertId;
                totalPhases++;

                for (let j = 0; j < phase.tasks.length; j++) {
                    await db.query(
                        'INSERT INTO roadmap_tasks (phase_id, title) VALUES (?, ?)',
                        [phaseId, phase.tasks[j]]
                    );
                }
            }
        }

        console.log(`Successfully generated roadmaps for ${roles.length} roles.`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

populateRoadmaps();
