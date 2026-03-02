const axios = require('axios');

async function testLogin() {
    try {
        console.log('Sending login request to http://localhost:5000/api/auth/login...');
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'sanjaibtechit.official@gmail.com',
            password: 'Sanjai@2005'
        });
        console.log('Response Status:', res.status);
        console.log('Response Data:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('Login Error:');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error(err.message);
        }
    }
}

testLogin();
