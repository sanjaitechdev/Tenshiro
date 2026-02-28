require('dotenv').config();
const { OpenAI } = require('openai');

async function testGroq() {
    const groq = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });

    try {
        console.log("Testing Groq connection...");
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: "Hello CareerNavigator, are you ready?" }],
            max_tokens: 50
        });
        console.log("Response:", completion.choices[0].message.content);
        console.log("✅ Groq API is functioning correctly!");
    } catch (err) {
        console.error("❌ Groq API Test Failed:", err.message);
    }
}

testGroq();
