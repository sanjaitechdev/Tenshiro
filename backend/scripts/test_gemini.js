require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log("Testing Gemini API Key...");
    const key = process.env.GEMINI_API_KEY;
    console.log(`Key found: ${key ? key.substring(0, 5) + '...' : 'NO'}`);

    if (!key) {
        console.error("No API key found in .env");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Hello, are you working?";

        console.log("Sending request...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Success!");
        console.log("Response:", text);
    } catch (error) {
        console.error("Error testing Gemini API:");
        console.error(error.message);
        if (error.status) console.error("Status:", error.status);
        if (error.statusText) console.error("Status Text:", error.statusText);
        if (error.errorDetails) console.error("Details:", JSON.stringify(error.errorDetails, null, 2));
    }
}

testGemini();
