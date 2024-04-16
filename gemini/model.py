import google.generativeai as genai

API_KEY = "AIzaSyCThmnZHNxGR_FrJ1w0heWE2bWQVNaMuWI"

safe = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]

class Model():
    def __init__(self):
        genai.configure(api_key=API_KEY)
        self.model = genai.GenerativeModel('gemini-pro',safety_settings=safe)
        
    def getMedicine(self, text):
        response = self.model.generate_content(f"Hey you are supposed to read the text and extract only the medicinename and provide it as medicine: the name you extracted and no other information apart from that Here is the text '{text}' and present the response as medicine:response")
        return response.text.split(":")
        
        
    
    

