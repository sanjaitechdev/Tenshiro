const db = require('../config/db');

const updates = [
    {
        name: "IT & Software",
        description: "Dive into the fast-paced world of technology with careers in software development, data science, and IT operations. This domain offers high-growth opportunities, allowing you to build innovative solutions, work with cutting-edge technologies, and solve complex problems in a global market."
    },
    {
        name: "Government Jobs",
        description: "Secure a stable and prestigious career in the public sector through exams like UPSC, SSC, and Banking. Serving the nation offers immense job security, respectable social standing, and a clear path for career progression, making it a highly sought-after choice for many aspirants."
    },
    {
        name: "Commerce & Finance",
        description: "Explore the dynamic fields of accounting, investment banking, and financial analysis. This sector is the backbone of the global economy, offering lucrative roles for those with a knack for numbers, strategic planning, and understanding market trends."
    },
    {
        name: "Core Engineering",
        description: "Build the physical world with careers in Mechanical, Electrical, Civil, and other engineering disciplines. From designing infrastructure to developing advanced machinery, this domain is perfect for innovators who want to leave a tangible impact on society through engineering marvels."
    },
    {
        name: "Arts & Science",
        description: "Pursue your passion in liberal arts, pure sciences, and humanities, fostering creativity and critical thinking. Whether it's research, literature, or social sciences, this domain offers diverse career paths that contribute significantly to culture, education, and human understanding."
    },
    {
        name: "Management & MBA",
        description: "Lead organizations to success with careers in business administration, HR, marketing, and operations. This domain equips you with leadership skills, strategic vision, and the ability to manage teams, making you a vital asset in any corporate structure."
    },
    {
        name: "Emerging Technologies",
        description: "Stay ahead of the curve by specializing in AI, Blockchain, IoT, and Robotics. As these technologies redefine industries, professionals in this field are in high demand to drive the future of innovation and digital transformation."
    }
];

async function updateDomains() {
    try {
        for (const update of updates) {
            await db.query('UPDATE domains SET description = ? WHERE name = ?', [update.description, update.name]);
            console.log(`Updated: ${update.name}`);
        }
        console.log("All domains updated successfully.");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateDomains();
