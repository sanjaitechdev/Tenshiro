const db = require('../config/db');

const newDomains = [
    // IT & Tech (Icon: code)
    { name: "Cybersecurity", icon: "code", description: "Protect digital assets and networks from cyber threats. As a cybersecurity expert, you will design secure systems, monitor for breaches, and implement protocols to safeguard sensitive information in an increasingly digital world." },
    { name: "Cloud Computing", icon: "code", description: "Design and manage scalable cloud infrastructure using platforms like AWS, Azure, and Google Cloud. Help businesses migrate to the cloud, optimize costs, and ensure high availability of their applications." },
    { name: "Data Science", icon: "code", description: "Extract actionable insights from vast amounts of data. Use statistical methods and machine learning algorithms to predict trends, optimize processes, and drive data-driven decision-making for organizations." },
    { name: "DevOps Engineering", icon: "code", description: "Bridge the gap between development and operations. Automate CI/CD pipelines, manage infrastructure as code, and ensure smooth, reliable software deployment cycles." },
    { name: "UI/UX Design", icon: "palette", description: "Create intuitive and visually appealing user interfaces. Focus on user experience research, wireframing, and prototyping to build products that are both functional and delightful to use." },
    { name: "Game Development", icon: "code", description: "Build immersive gaming experiences for PC, console, and mobile. Work on game physics, graphics programming, and gameplay mechanics to bring creative visions to life." },
    { name: "Blockchain Development", icon: "robot", description: "Develop decentralized applications and smart contracts. Work with distributed ledger technologies to create transparent, secure, and tamper-proof systems for finance and beyond." },

    // Engineering (Icon: cogs)
    { name: "Civil Engineering", icon: "cogs", description: "Design and oversee the construction of infrastructure like roads, bridges, and buildings. Ensure projects are safe, sustainable, and completed on time and within budget." },
    { name: "Chemical Engineering", icon: "cogs", description: "Transform raw materials into useful products like medicines, fuel, and food. Optimize chemical processes for efficiency, safety, and environmental sustainability." },
    { name: "Aerospace Engineering", icon: "cogs", description: "Design and test aircraft, spacecraft, and satellites. Push the boundaries of flight and exploration, working on aerodynamics, propulsion systems, and avionics." },
    { name: "Biomedical Engineering", icon: "cogs", description: "Combine engineering principles with medical sciences to design healthcare equipment and devices. Innovate in fields like prosthetics, medical imaging, and biomaterials." },
    { name: "Automobile Engineering", icon: "cogs", description: "Design and manufacture vehicles, focusing on performance, safety, and sustainability. Work on electric vehicles, autonomous driving systems, and advanced aesthetics." },

    // Healthcare (Icon: heartbeat - need to add)
    { name: "Medicine & Surgery", icon: "briefcase", description: "Diagnose and treat illnesses to improve patient health.From general practice to specialized surgery, this noble profession offers the chance to save lives and enhance well-being." },
    { name: "Nursing", icon: "briefcase", description: "Provide compassionate care and support to patients. Collaborate with doctors to administer treatments, monitor patient health, and educate families on care plans." },
    { name: "Pharmacy", icon: "briefcase", description: "Expertly manage medication therapies. Ensure the safe dispensing of drugs, counsel patients on usage, and research new pharmaceutical solutions." },
    { name: "Psychology", icon: "briefcase", description: "Understand human behavior and mental processes. Help individuals overcome challenges, manage mental health disorders, and improve their overall quality of life." },

    // Finance & Business (Icon: chart-line)
    { name: "Investment Banking", icon: "chart-line", description: "Advise companies on mergers, acquisitions, and capital raising. Analyze financial markets to help clients make strategic investment decisions and maximize returns." },
    { name: "Digital Marketing", icon: "chart-line", description: "Promote brands and products through digital channels. Utilize SEO, social media, and content marketing to reach target audiences and drive business growth." },
    { name: "Human Resources", icon: "chart-line", description: "Manage an organization's most valuable asset: its people. Oversee recruitment, employee relations, training, and benefits to foster a positive and productive workplace culture." },
    { name: "Supply Chain Management", icon: "chart-line", description: "Optimize the flow of goods and services. Manage logistics, procurement, and inventory to ensure products reach customers efficiently and cost-effectively." },

    // Arts & Humanities (Icon: palette)
    { name: "Journalism & Mass Comm", icon: "palette", description: "Report news and stories to the public. Use various media platforms to inform, educate, and entertain audiences while upholding ethical standards." },
    { name: "Legal Studies", icon: "briefcase", description: "Interpret and apply the law to uphold justice. Represent clients in legal disputes, draft legal documents, and advise on compliance with regulations." },
    { name: "Architecture", icon: "building", description: "Design functional and aesthetic spaces. Blend art and engineering to create structures that are safe, sustainable, and visually inspiring." },
    { name: "Fashion Design", icon: "palette", description: "Create clothing and accessories that set trends. Combine creativity with technical skills to design collections that reflect cultural and individual identities." },
    { name: "Animation & VFX", icon: "palette", description: "Create stunning visuals for movies, games, and ads. Use computer graphics to bring characters and worlds to life through animation and visual effects." },

    // Science & Research (Icon: robot)
    { name: "Biotechnology", icon: "robot", description: "Harness biological systems to develop new products. Work in areas like genetic engineering, agriculture, and medicine to solve global challenges." },
    { name: "Environmental Science", icon: "building", description: "Study the environment and find solutions to ecological problems. Work on conservation, pollution control, and sustainable resource management." },
    { name: "Astrophysics", icon: "robot", description: "Explore the mysteries of the universe. Study celestial bodies, physics, and cosmology to understand the origins and future of our galaxy." },

    // Others (Icon: briefcase)
    { name: "Hospitality Management", icon: "briefcase", description: "Manage hotels, resorts, and events. Ensure guest satisfaction and efficient operations in the dynamic tourism and service industry." },
    { name: "Education & Teaching", icon: "briefcase", description: "Shape the future by educating the next generation. Develop curriculums, mentor students, and foster a love for learning in diverse subjects." },
    { name: "Sports Management", icon: "briefcase", description: "Manage the business side of sports. Oversee teams, events, and athletes, handling marketing, finance, and operations in the sports world." },
    { name: "Event Management", icon: "briefcase", description: "Plan and execute memorable events. Coordinate logistics, vendors, and schedules to ensure weddings, conferences, and parties run smoothly." },
    { name: "Social Work", icon: "briefcase", description: "Support individuals and communities in need. Address social issues, provide resources, and advocate for vulnerability populations to improve societal well-being." }
];

async function insertDomains() {
    try {
        // First delete existing (optional, but cleaner for this task to avoid dups if run twice)
        // actually let's just insert and ignore duplicates on name if possible, or usually just insert.
        // Let's truncate table to be clean since we have a defined list now.
        // await db.query('TRUNCATE TABLE domains'); 
        // User asked for "min 30 max 50". We already have 7. Let's just add these.
        // But duplicates might be an issue. Let's check if name exists.

        for (const domain of newDomains) {
            const [exists] = await db.query('SELECT id FROM domains WHERE name = ?', [domain.name]);
            if (exists.length === 0) {
                await db.query('INSERT INTO domains (name, description, icon) VALUES (?, ?, ?)',
                    [domain.name, domain.description, domain.icon]);
                console.log(`Inserted: ${domain.name}`);
            } else {
                console.log(`Skipped (already exists): ${domain.name}`);
            }
        }

        console.log("Domain insertion complete.");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

insertDomains();
