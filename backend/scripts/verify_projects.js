const API_URL = 'http://localhost:5000/api';

async function testProjects() {
    try {
        console.log('Testing with API_URL:', API_URL);

        // Helper for fetch post
        const post = async (url, data, headers = {}) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...headers },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`Request failed: ${res.status} ${txt}`);
            }
            return res.json();
        };

        // 1. Login
        let token;
        const testEmail = 'sqltestuser@example.com';

        try {
            console.log(`Attempting login with ${testEmail}...`);
            const data = await post(`${API_URL}/auth/login`, {
                email: testEmail,
                password: 'password123'
            });
            token = data.token;
            console.log('✅ Login successful');
        } catch (e) {
            console.error('Login failed:', e.message);
            return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // 2. Test Cases
        const testCases = [
            { name: 'Legal (Domain 13)', role: 'Legal Analyst', domainId: 13 },
            { name: 'Govt (Domain 2)', role: 'IAS Officer', domainId: 2 },
            { name: 'IT (Domain 1)', role: 'Frontend Developer', domainId: 1 },
            { name: 'Engineering (Domain 4)', role: 'Mechanical Design Engineer', domainId: 4 },
            { name: 'Management (Domain 6)', role: 'Product Manager', domainId: 6 },
            { name: 'Arts (Domain 5)', role: 'Graphic Designer', domainId: 5 }
        ];

        for (const test of testCases) {
            console.log(`\nTesting ${test.name}...`);
            try {
                const projects = await post(`${API_URL}/ai/project-suggestion`, {
                    role: test.role,
                    domainId: test.domainId
                }, headers);

                console.log(`Projects found: ${projects.length}`);
                if (projects.length > 0) {
                    console.log(`First Project: ${projects[0].title}`);
                    // console.log(`Description: ${projects[0].description}`);
                } else {
                    console.log('No projects returned (Correct for Govt/Some domains)');
                }
            } catch (err) {
                console.error(`❌ Error testing ${test.name}:`, err.message);
            }
        }

    } catch (err) {
        console.error('❌ Fatal Error:', err.message);
    }
}

testProjects();
