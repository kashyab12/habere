import os

import anthropic
from dotenv import load_dotenv

is_loaded = load_dotenv()
if not is_loaded:
    exit(-1)
api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=api_key)
msg = {
    "content": "What do you know about TickTick?",
    "role": "user"
}
message = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    temperature=0,
    messages=[msg]
)
print(message.content)
