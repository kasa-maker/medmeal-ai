import json
import re
from io import BytesIO
from typing import List
from PIL import Image
from src.config.gemini import gemini_model

def analyze_meal_nutrition(image_bytes: bytes, health_conditions: List[str] = None) -> dict:
    try:
        if health_conditions is None:
            health_conditions = []

        # Open image from bytes
        image = Image.open(BytesIO(image_bytes))

        conditions_text = ''
        recommended_foods_instruction = ''

        if health_conditions:
            conditions_text = f"\n\nUser has the following health conditions: {', '.join(health_conditions)}. Provide specific health warnings if this meal may negatively impact these conditions."
            recommended_foods_instruction = f"\n\nBased on the user's health conditions ({', '.join(health_conditions)}), recommend 4-5 specific foods that would help them recover faster and manage their condition better. For each food, explain why it helps."

        prompt = f'''You are a nutrition analysis expert. Analyze this meal photo and provide detailed nutrition information.

Identify:
- All food items visible in the image
- Estimated total calories
- Macronutrient breakdown (protein, carbs, fats in grams)
- Any health warnings based on the ingredients{conditions_text}
{recommended_foods_instruction}

Return ONLY a valid JSON object in this exact format:
{{
  "items": ["Food item 1", "Food item 2", "Food item 3"],
  "totalCalories": 650,
  "macros": {{
    "protein": "35g",
    "carbs": "70g",
    "fats": "20g"
  }},
  "healthWarnings": [
    "Warning message 1",
    "Warning message 2"
  ],
  "recommendedFoods": [
    {{
      "name": "Food name",
      "description": "Why this food helps with the condition"
    }}
  ]
}}

If healthWarnings array is empty, the meal is generally healthy for the user.
If no health conditions are provided, recommendedFoods should be an empty array.

If you cannot identify the food clearly, return:
{{
  "items": [],
  "totalCalories": 0,
  "macros": {{
    "protein": "0g",
    "carbs": "0g",
    "fats": "0g"
  }},
  "healthWarnings": [],
  "recommendedFoods": [],
  "error": "Unable to identify food items clearly. Please provide a clearer image."
}}

Important:
- Provide realistic estimates based on visible portion sizes
- Be specific with health warnings (e.g., "High sodium - may increase blood pressure for hypertension patients")
- Recommend foods that are scientifically proven to help with the specific conditions
- Return ONLY the JSON object, no additional text or explanation.'''

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

        # Ensure recommendedFoods exists
        if 'recommendedFoods' not in result:
            result['recommendedFoods'] = []

        return result

    except Exception as error:
        print(f'Meal Nutrition Analysis Error: {error}')
        raise Exception(f'Failed to analyze meal: {str(error)}')
