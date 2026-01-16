import httpx
from groq import Groq

import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set in environment variables")




client = Groq(
    api_key=GROQ_API_KEY,
    
    # Dont use this for production not safe🚨🚨⚠️⚠️⚠️
    http_client=httpx.Client(verify=False)
              )

MODEL_NAME = "llama-3.3-70b-versatile"


def generate_response(prompt: str) -> str:
    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.5,
        max_completion_tokens=1024,
    )

    content = completion.choices[0].message.content
    return content if content is not None else ""
