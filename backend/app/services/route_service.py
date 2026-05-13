import json
import os

from google import genai
from google.genai import types

from app.models.schemas import TripRequest

SYSTEM_PROMPT = """You are a travel route planner. Return ONLY valid JSON matching this schema exactly — no markdown, no explanation, no extra keys:

{
  "title": str,
  "days": [
    {
      "day": int,
      "date": "YYYY-MM-DD",
      "stops": [
        {
          "id": "stop_XXX",
          "name": str,
          "type": str,
          "lat": float,
          "lng": float,
          "duration_minutes": int,
          "notes": str,
          "booking_url": str
        }
      ]
    }
  ],
  "total_budget_estimate": float,
  "currency": "USD"
}

Rules:
- Each stop must have a unique id in the format "stop_001", "stop_002", etc.
- Use real coordinates for each location.
- "type" should be one of: landmark, museum, food, nature, shopping, entertainment, transport.
- "booking_url" can be empty string if not applicable.
- "total_budget_estimate" should reflect a realistic estimate for the given budget range.
- Generate one Day object per calendar day between start_date and end_date (inclusive).
"""


async def generate_route(request: TripRequest) -> dict:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    user_prompt = (
        f"Plan a trip to {request.destination} "
        f"from {request.start_date} to {request.end_date}. "
        f"Budget: ${request.budget:.0f}. "
        f"Interests: {', '.join(request.interests)}."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            temperature=0.7,
            max_output_tokens=2000,
            thinking_config=types.ThinkingConfig(thinking_budget=0),
        ),
    )

    text = response.text
    if not text:
        raise ValueError("Empty response from Gemini")

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Gemini returned invalid JSON: {e}") from e
