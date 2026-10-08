from google import genai
import os

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def get_answer_from_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3.8-flash", contents=prompt
    )
    return response.text