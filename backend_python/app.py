from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GROQ_API_KEY") # Fallback to Groq if user has it
genai.configure(api_key=api_key)

@app.route('/api/ai/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    language = data.get('language', 'en')
    context = data.get('context', 'interview-preparation')

    if not message:
        return jsonify({"error": "No message provided"}), 400

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # System prompt for recruitment assistant
        system_prompt = f"""
        You are a highly intelligent Career and Interview Assistant named 'Kairos'.
        Your goal is to help candidates prepare for interviews in their local language.
        Current Language: {language}
        Task: {context}
        
        Rules:
        1. Always respond in the language specified ({language}).
        2. Be professional, encouraging, and highly technical when needed.
        3. Provide actionable advice, mock interview questions, and feedback.
        4. If the user asks for a mock interview, conduct it one question at a time.
        """
        
        response = model.generate_content([system_prompt, message])
        return jsonify({"response": response.text})
        
    except Exception as e:
        print(f"AI Error: {str(e)}")
        return jsonify({"error": "Failed to generate AI response", "details": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "python-ai-assistant"})

if __name__ == '__main__':
    app.run(port=5005, debug=True)
