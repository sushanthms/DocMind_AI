import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
# environment variables are a standard mechanism provided by operating systems for giving configuration/secrets to programs.
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_cluster_name(documents):

    names = "\n".join(
        documents
    )

    prompt = f"""
These documents belong to the same category.

Documents:

{names}

Give a short category name.
Only return the category name.
"""

    response = client.models.generate_content( # generate_content() is a method provided by the Google GenAI SDK.
        model="gemini-3-flash-preview",
        contents=prompt
    )

    return response.text