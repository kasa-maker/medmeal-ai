import json
import re
from typing import List, Optional
from src.config.gemini import gemini_model

def get_meal_recommendations(medicines: List[dict], condition: Optional[str] = None) -> dict:
    try:
        # Build medicine list string
        medicine_names = [med.get('name', '') for med in medicines if med.get('name')]
        medicine_list = ', '.join(medicine_names)

        condition_text = f"The patient has been diagnosed with {condition}." if condition else "Based on the prescribed medicines."

        prompt = f'''You are a medical nutrition expert. {condition_text}

The patient is taking the following medicines: {medicine_list}

Based on this medical information, provide personalized meal recommendations.

Return ONLY a valid JSON object in this exact format:
{{
  "condition": "{condition if condition else 'General Recovery'}",
  "recommendedFoods": [
    {{
      "name": "Food name",
      "emoji": "🥗",
      "reason": "Brief explanation of why this food helps with recovery or managing the condition"
    }}
  ],
  "foodsToAvoid": [
    {{
      "name": "Food name",
      "emoji": "🍔",
      "reason": "Brief explanation of why this food should be avoided"
    }}
  ]
}}

Provide 5-6 recommended foods and 4-5 foods to avoid.
Use appropriate food emojis for each item.
Be specific about why each food helps or harms based on the medical condition and medicines.

Important: Return ONLY the JSON object, no additional text or explanation.'''

        response = gemini_model.generate_content(prompt)
        response_text = response.text

        # Clean response text
        cleaned_text = re.sub(r'```json\s*|\s*```', '', response_text)
        cleaned_text = cleaned_text.strip()

        # Extract JSON
        json_match = re.search(r'\{[\s\S]*\}', cleaned_text)
        if not json_match:
            print(f'Failed to extract JSON from response: {response_text[:200]}')
            raise ValueError('Invalid response format from Gemini')

        result = json.loads(json_match.group(0))
        return result

    except Exception as error:
        print(f'Meal Recommendations Error: {error}')
        raise Exception(f'Failed to get meal recommendations: {str(error)}')
