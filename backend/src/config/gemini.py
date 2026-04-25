import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

if not os.getenv('GEMINI_API_KEY'):
    raise ValueError('GEMINI_API_KEY is required in .env file')

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

MODEL_NAME = 'gemini-2.5-flash'

# Create the model instance
gemini_model = genai.GenerativeModel(MODEL_NAME)
