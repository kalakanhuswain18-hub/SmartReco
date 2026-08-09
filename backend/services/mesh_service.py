import os
from dotenv import load_dotenv
from meshapi import MeshAPI, ChatCompletionParams, ChatMessage

load_dotenv()

MESH_API_KEY = os.getenv("MESH_API_KEY")

if not MESH_API_KEY:
    raise RuntimeError("MESH_API_KEY is missing from .env")

client = MeshAPI(
    base_url="https://api.meshapi.ai",
    token=MESH_API_KEY
)

MODEL = "tencent/hy3"


def ask_mesh(prompt):
    response = client.chat.completions.create(
        ChatCompletionParams(
            model=MODEL,
            messages=[
                ChatMessage(
                    role="system",
                    content="You are SmartReco's AI recommendation assistant."
                ),
                ChatMessage(
                    role="user",
                    content=prompt
                )
            ],
            temperature=0.7,
            max_tokens=300
        )
    )

    content = response.choices[0].message.content

    print("MESH RAW CONTENT:", repr(content))

    return content or ""