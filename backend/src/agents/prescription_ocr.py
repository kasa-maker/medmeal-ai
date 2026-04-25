import json
import re
from io import BytesIO
from PIL import Image
from src.config.gemini import gemini_model

def analyze_prescription(image_bytes: bytes) -> dict:
    try:
        # Open image from bytes
        image = Image.open(BytesIO(image_bytes))

        prompt = '''You are a medical prescription OCR expert. Analyze this prescription image and extract all medicine information.

Extract the following details for each medicine:
- Medicine name (generic or brand name)
- Dosage (e.g., 500mg, 10ml, 1 tablet)
- Frequency (e.g., once daily, twice daily, three times daily, every 8 hours)
- Timing (e.g., morning, evening, night, before meals, after meals, with food)
- Duration (e.g., 7 days, 2 weeks, 1 month)

Return ONLY a valid JSON object in this exact format:
{
  "medicines": [
    {
      "name": "Medicine Name",
      "dosage": "dosage amount",
      "frequency": "frequency description",
      "timing": "timing description",
      "duration": "duration description"
    }
  ]
}

If you cannot read the prescription clearly, return:
{
  "medicines": [],
  "error": "Unable to read prescription clearly. Please provide a clearer image."
}

Important: Return ONLY the JSON object, no additional text or explanation.'''

        response = gemini_model.generate_content([prompt, image])
        response_text = response.text

        # Clean response text - remove markdown code blocks if present
        cleaned_text = re.sub(r'```json\s*|\s*```', '', response_text)
        cleaned_text = cleaned_text.strip()

        # Extract JSON from response
        json_match = re.search(r'\{[\s\S]*\}', cleaned_text)
        if not json_match:
            print(f'Failed to extract JSON from response: {response_text[:200]}')
            raise ValueError('Invalid response format from Gemini')

        result = json.loads(json_match.group(0))
        return result

    except Exception as error:
        print(f'Prescription OCR Error: {error}')
        raise Exception(f'Failed to analyze prescription: {str(error)}')
