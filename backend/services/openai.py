import os
from openai import OpenAI

class OpenAiApi:
    def __init__(self):
        self.client = OpenAI()
        self.model = os.environ.get('OPEN_AI_MODEL', '')
        if not self.model:
            raise ValueError("OpenAI model is missing. Please provide a value for OPEN_AI_MODEL.")

    def generateScript(self, brandDetails):
        prompt = f"""
        You are a narrator for a 15 second advertisement.
        The name of your company is {brandDetails['brandName']}. A brief descripton of your company: {brandDetails['description']}.
        The products that your company offers are {','.join(brandDetails['products'])}.
        Finally, the advertisement should carry energy and voice of {brandDetails['voice']}.
        Generate a script to advertise for the company and the product. The script should be short enough to be read aloud in 12 seconds at a natural pace — this leaves headroom so the full audio fits within 15 seconds without being cut off. Use a hook in the beginning, and call to action at the end of the script.
        """ 

        response = self.client.responses.create(
            model=self.model,
            input=prompt
        )

        return response.output_text
