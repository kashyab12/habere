import os

import anthropic
from dotenv import load_dotenv

is_loaded = load_dotenv()
if not is_loaded:
    exit(-1)
api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=api_key)
msg = {
    "content": "Lose weight by the end of the year",
    "role": "user"
}

system_prompt = (
    f"You are the assistant of an extremely productive human being who's main priority is to get stuff done. "
    f"Accordingly, you need to help your boss on defining their goals in terms of a step by step plan "
    f"and assist with scheduling as well. Your boss will send you a goal of theirs along with a deadline. "
    f"You need to make sure your boss accomplishes their goals. Given a set of goals, order them based on their "
    f"impact and give a step by step plan of what needs to be done to accomplish the goal by the given deadline. "
    f"This step by step plan should include deadlines as well, and depending on the deadline make the goals on a weekly "
    f"or monthly manner. Make sure the plan follows the S.M.A.R.T system to some extent, mainly try to make "
    f"the action items quantifiable so that it encourages confidence on achievement. Present the plan in a JSON format."
)

message = client.messages.create(
    model="claude-3-sonnet-20240229",
    system=system_prompt,
    max_tokens=1000,
    temperature=0,
    messages=[msg]
)
print(message.content)
