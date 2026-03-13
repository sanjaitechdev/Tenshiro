const path = require('path');
const dotenv = require(path.join(__dirname, '../backend/node_modules/dotenv'));
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const assistantController = require('../backend/controllers/assistantController');

const mockReq = {
    body: {
        message: "How do I become a Frontend Developer?",
        history: [],
        language: "en"
    }
};

const mockRes = {
    json: (data) => {
        console.log("AI Response:", JSON.stringify(data, null, 2));
    },
    status: (code) => ({
        json: (data) => console.log(`Error ${code}:`, data)
    })
};

console.log("Testing PathPilot AI...");
assistantController.pathpilotChat(mockReq, mockRes);
